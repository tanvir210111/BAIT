import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Map, ArrowRight, Filter } from 'lucide-react';

/**
 * Isolated Component: Preserved for future activation.
 * Removed from current public flow per project requirements.
 */
export default function DistrictList() {
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedDiv, setSelectedDiv] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const divParam = searchParams.get('division_id');
    if (divParam) setSelectedDiv(divParam);

    Promise.all([
      fetch('/api/districts').then(r => r.json()),
      fetch('/api/divisions').then(r => r.json())
    ]).then(([distData, divData]) => {
      setDistricts(distData);
      setDivisions(divData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [searchParams]);

  const filteredDistricts = districts.filter(dist => {
    const matchesDiv = !selectedDiv || dist.division_id === parseInt(selectedDiv);
    const matchesSearch = !searchTerm || dist.name_bn.includes(searchTerm) || dist.slug.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  return (
    <div>
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>জেলা</span>
          </div>
          <h1 className="page-banner-title">বাংলাদেশের সকল জেলা</h1>
          <p className="page-banner-subtitle">
            বাংলাদেশের ৬৪টি জেলার পূর্ণাঙ্গ প্রশাসনিক তালিকা, আওতাধীন উপজেলা এবং BAIT-এর প্রশিক্ষণ কেন্দ্রসমূহ।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '18px 24px', marginBottom: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={16} /> বিভাগ ফিল্টার:
            </span>
            <button 
              type="button"
              className={`badge-tag ${!selectedDiv ? 'badge-teal' : ''}`}
              style={{ cursor: 'pointer', padding: '6px 12px', border: '1px solid var(--border)' }}
              onClick={() => setSelectedDiv('')}
            >
              সকল ({districts.length})
            </button>
            {divisions.map(d => (
              <button 
                key={d.id}
                type="button"
                className={`badge-tag ${selectedDiv === String(d.id) ? 'badge-teal' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 12px', border: '1px solid var(--border)' }}
                onClick={() => setSelectedDiv(String(d.id))}
              >
                {d.name_bn}
              </button>
            ))}
          </div>

          <div style={{ minWidth: '220px' }}>
            <input 
              type="text"
              placeholder="জেলা খুঁজুন..."
              className="dropdown-search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ padding: '8px 12px' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>তথ্য লোড হচ্ছে...</div>
        ) : (
          <div>
            <div style={{ marginBottom: '18px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              মোট জেলা প্রদর্শিত: <strong>{filteredDistricts.length}</strong> টি
            </div>

            <div className="entity-grid">
              {filteredDistricts.map(dist => (
                <div key={dist.id} className="standard-card">
                  <div className="standard-card-header">
                    <span className="badge-tag badge-blue">জেলা</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{dist.division_name} বিভাগ</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: '8px 0', color: 'var(--primary-dark)' }}>
                    {dist.name_bn} জেলা
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', flexGrow: 1 }}>
                    {dist.description?.substring(0, 95)}...
                  </p>
                  <div className="stat-pills">
                    <div className="stat-pill">
                      উপজেলা: <strong>{dist.total_upazilas || 0} টি</strong>
                    </div>
                  </div>
                  <Link to={`/jela/${dist.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
