import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';

/**
 * Isolated Component: Preserved for future activation.
 * Removed from current public flow per project requirements.
 */
export default function DivisionList() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/divisions')
      .then(res => res.json())
      .then(data => {
        setDivisions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>বিভাগ</span>
          </div>
          <h1 className="page-banner-title">বাংলাদেশের সকল বিভাগ</h1>
          <p className="page-banner-subtitle">
            বাংলাদেশের ৮টি প্রশাসনিক বিভাগের তথ্য, আওতাধীন জেলা ও BAIT-এর সক্রিয় কার্যক্রম।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>তথ্য লোড হচ্ছে...</div>
        ) : (
          <div className="entity-grid">
            {divisions.map(div => (
              <div key={div.id} className="standard-card">
                <div className="standard-card-header">
                  <div className="card-icon-bubble bubble-division" style={{ width: '44px', height: '44px', marginBottom: 0 }}>
                    <Building2 size={24} />
                  </div>
                  <span className="badge-tag badge-teal">বিভাগ</span>
                </div>
                
                <h2 style={{ fontSize: '1.4rem', margin: '12px 0 8px 0', color: 'var(--primary-dark)' }}>
                  {div.name_bn}
                </h2>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '16px', flexGrow: 1 }}>
                  {div.description}
                </p>

                <div className="stat-pills">
                  <div className="stat-pill">
                    জেলার সংখ্যা: <strong>{div.total_districts} টি</strong>
                  </div>
                  {div.area_sq_km && (
                    <div className="stat-pill">
                      আয়তন: <strong>{div.area_sq_km} বর্গ কিমি</strong>
                    </div>
                  )}
                </div>

                <Link to={`/bibhag/${div.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
