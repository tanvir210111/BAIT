import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Filter, MapPin, Award } from 'lucide-react';

export default function InstructorsDirectory() {
  const [instructors, setInstructors] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedDiv, setSelectedDiv] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/people?category=instructor').then(r => r.json()),
      fetch('/api/divisions').then(r => r.json())
    ]).then(([instData, divData]) => {
      setInstructors(instData);
      setDivisions(divData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filteredInstructors = instructors.filter(inst => 
    !selectedDiv || inst.division_id === parseInt(selectedDiv)
  );

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>প্রশিক্ষক</span>
          </div>
          <h1 className="page-banner-title">BAIT প্রশিক্ষকমণ্ডলী</h1>
          <p className="page-banner-subtitle">
            বাংলাদেশের বিভিন্ন বিভাগ, জেলা ও উপজেলায় কর্মরত অভিজ্ঞ ও দক্ষ আইসিটি ট্রেইনারবৃন্দ।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Division Filter Buttons */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={16} /> বিভাগ:
          </span>
          <button 
            type="button"
            className={`badge-tag ${!selectedDiv ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 12px', border: '1px solid var(--border)' }}
            onClick={() => setSelectedDiv('')}
          >
            সকল ({instructors.length})
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>তথ্য লোড হচ্ছে...</div>
        ) : (
          <div className="entity-grid">
            {filteredInstructors.map(inst => (
              <div key={inst.id} className="person-card">
                <div className="person-header">
                  <img src={inst.photo_url} alt={inst.name_bn} className="person-avatar" style={{ width: '68px', height: '68px' }} />
                  <div className="person-meta">
                    <div className="person-name">{inst.name_bn}</div>
                    <div className="person-role">{inst.designation}</div>
                  </div>
                </div>

                <div className="person-body">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 600 }}>
                    <MapPin size={14} />
                    <span>{inst.upazila_name ? `${inst.upazila_name}, ` : ''}{inst.district_name}, {inst.division_name}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: 500 }}>
                    <strong>বিষয়:</strong> {inst.courses_taught || 'আইসিটি ও সফটওয়্যার স্কিল'}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    {inst.bio?.substring(0, 95)}...
                  </p>
                </div>

                <div className="person-footer">
                  <Link to={`/instructor/${inst.slug}`} className="card-btn" style={{ width: '100%' }}>
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
