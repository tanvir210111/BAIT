import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight, Filter, MapPin } from 'lucide-react';

/**
 * Isolated Component: Preserved for future activation.
 * Removed from current public flow per project requirements.
 */
export default function JournalistsDirectory() {
  const [journalists, setJournalists] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDiv, setSelectedDiv] = useState('');
  const [selectedDist, setSelectedDist] = useState('');
  const [selectedUpa, setSelectedUpa] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/people?category=journalist').then(r => r.json()),
      fetch('/api/dropdown-data').then(r => r.json())
    ]).then(([peopleData, dropData]) => {
      setJournalists(peopleData);
      if (dropData.divisions) setDivisions(dropData.divisions);
      if (dropData.districts) setDistricts(dropData.districts);
      if (dropData.upazilas) setUpazilas(dropData.upazilas);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const availableDistricts = districts.filter(d => 
    !selectedDiv || d.division_id === parseInt(selectedDiv)
  );

  const availableUpazilas = upazilas.filter(u => 
    !selectedDist || u.district_id === parseInt(selectedDist)
  );

  const filteredJournalists = journalists.filter(j => {
    if (selectedUpa && j.upazila_id !== parseInt(selectedUpa)) return false;
    if (selectedDist && j.district_id !== parseInt(selectedDist)) return false;
    if (selectedDiv && j.division_id !== parseInt(selectedDiv)) return false;
    return true;
  });

  const selectedDivName = divisions.find(d => d.id === parseInt(selectedDiv))?.name_bn;
  const selectedDistName = districts.find(d => d.id === parseInt(selectedDist))?.name_bn;
  const selectedUpaName = upazilas.find(u => u.id === parseInt(selectedUpa))?.name_bn;

  return (
    <div>
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>সাংবাদিক</span>
          </div>
          <h1 className="page-banner-title">BAIT সাংবাদিক ফোরাম</h1>
          <p className="page-banner-subtitle">
            বিভাগ → জেলা → উপজেলা ভিত্তিক স্থানীয় সাংবাদিক ও প্রতিনিধিদের নেটওয়ার্ক।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '36px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--primary-dark)', fontWeight: 700, fontSize: '1.05rem' }}>
            <Filter size={18} color="var(--primary)" />
            <span>সাংবাদিক প্রতিনিধি অনুসন্ধান (বিভাগ → জেলা → উপজেলা)</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label className="form-label">বিভাগ</label>
              <select 
                className="form-control"
                value={selectedDiv}
                onChange={e => {
                  setSelectedDiv(e.target.value);
                  setSelectedDist('');
                  setSelectedUpa('');
                }}
              >
                <option value="">-- সকল বিভাগ --</option>
                {divisions.map(d => (
                  <option key={d.id} value={d.id}>{d.name_bn}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">জেলা</label>
              <select 
                className="form-control"
                value={selectedDist}
                onChange={e => {
                  setSelectedDist(e.target.value);
                  setSelectedUpa('');
                }}
                disabled={!selectedDiv}
              >
                <option value="">-- সকল জেলা --</option>
                {availableDistricts.map(d => (
                  <option key={d.id} value={d.id}>{d.name_bn}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">উপজেলা</label>
              <select 
                className="form-control"
                value={selectedUpa}
                onChange={e => setSelectedUpa(e.target.value)}
                disabled={!selectedDist}
              >
                <option value="">-- সকল উপজেলা --</option>
                {availableUpazilas.map(u => (
                  <option key={u.id} value={u.id}>{u.name_bn}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
                type="button" 
                className="btn btn-outline-white" 
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', width: '100%', height: '44px' }}
                onClick={() => {
                  setSelectedDiv('');
                  setSelectedDist('');
                  setSelectedUpa('');
                }}
              >
                ফিল্টার রিসেট
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)' }}>
            {selectedUpaName 
              ? `${selectedUpaName} উপজেলার সাংবাদিক প্রতিনিধি`
              : selectedDistName 
                ? `${selectedDistName} জেলার সাংবাদিক প্রতিনিধি`
                : selectedDivName 
                  ? `${selectedDivName}-এর সাংবাদিক প্রতিনিধি` 
                  : 'সকল সাংবাদিক প্রতিনিধি'} 
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
              ({filteredJournalists.length} জন)
            </span>
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>তথ্য লোড হচ্ছে...</div>
        ) : filteredJournalists.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid var(--border)', padding: '40px', borderRadius: '10px', textAlign: 'center', color: '#64748b' }}>
            নির্বাচিত এলাকায় এই মুহূর্তে কোনো সাংবাদিকের তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="entity-grid">
            {filteredJournalists.map(jr => (
              <div key={jr.id} className="person-card">
                <div className="person-header">
                  <img src={jr.photo_url} alt={jr.name_bn} className="person-avatar" />
                  <div className="person-meta">
                    <div className="person-name">{jr.name_bn}</div>
                    <div className="person-role">{jr.designation}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{jr.workplace_media}</div>
                  </div>
                </div>

                <div className="person-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 600 }}>
                    <MapPin size={14} />
                    <span>{jr.upazila_name ? `${jr.upazila_name}, ` : ''}{jr.district_name}, {jr.division_name}</span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    {jr.bio?.substring(0, 95)}...
                  </p>
                </div>

                <div className="person-footer">
                  <Link to={`/journalist/${jr.slug}`} className="card-btn" style={{ width: '100%' }}>
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
