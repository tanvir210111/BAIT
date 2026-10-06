import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

/**
 * Isolated Component: Preserved for future activation.
 * Removed from current public flow per project requirements.
 */
export default function UpazilaList() {
  const [upazilas, setUpazilas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/upazilas')
      .then(res => res.json())
      .then(data => {
        setUpazilas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredUpazilas = upazilas.filter(u => 
    u.name_bn.includes(searchTerm) ||
    u.district_name.includes(searchTerm) ||
    u.division_name.includes(searchTerm) ||
    u.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>উপজেলা</span>
          </div>
          <h1 className="page-banner-title">বাংলাদেশের উপজেলা নেটওয়ার্ক</h1>
          <p className="page-banner-subtitle">
            তৃণমূল পর্যায়ের উপজেলাসমূহের তালিকা ও স্থানীয় প্রশিক্ষণ কেন্দ্র।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={20} color="var(--primary)" />
          <input 
            type="text"
            placeholder="উপজেলা, জেলা বা বিভাগ দিয়ে খুঁজুন..."
            className="search-main-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>তথ্য লোড হচ্ছে...</div>
        ) : (
          <div>
            <div style={{ marginBottom: '18px', color: 'var(--text-muted)' }}>
              মোট উপজেলা প্রদর্শিত: <strong>{filteredUpazilas.length}</strong> টি
            </div>

            <div className="entity-grid">
              {filteredUpazilas.map(u => (
                <div key={u.id} className="standard-card">
                  <div className="standard-card-header">
                    <span className="badge-tag badge-amber">{u.district_name} জেলা</span>
                    <span className="badge-tag badge-teal">{u.division_name} বিভাগ</span>
                  </div>

                  <h2 style={{ fontSize: '1.35rem', margin: '10px 0 6px 0', color: 'var(--primary-dark)' }}>
                    {u.name_bn} উপজেলা
                  </h2>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', flexGrow: 1 }}>
                    {u.description || `${u.district_name} জেলার একটি উপজেলা।`}
                  </p>

                  <Link to={`/upojela/${u.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
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
