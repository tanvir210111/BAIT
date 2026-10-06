import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';

/**
 * Isolated Component: Preserved for future activation.
 * Removed from current public flow per project requirements.
 */
export default function DivisionDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/divisions/${slug}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>বিভাগের তথ্য লোড হচ্ছে...</div>;
  }

  if (!data || !data.division) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>বিভাগ পাওয়া যায়নি</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>হোমে ফিরুন</Link>
      </div>
    );
  }

  const { division, districts, instructors, students, journalists } = data;

  return (
    <div>
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>{division.name_bn}</span>
          </div>
          <h1 className="page-banner-title">{division.name_bn}</h1>
          <p className="page-banner-subtitle">
            {division.description}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>মোট জেলা</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{districts?.length || 0} টি</div>
          </div>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>সদর দপ্তর</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{division.headquarters || 'বিভাগীয় শহর'}</div>
          </div>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>BAIT প্রশিক্ষক</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>{instructors?.length || 0} জন</div>
          </div>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>সক্রিয় শিক্ষার্থী</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{students?.length || 0} জন</div>
          </div>
        </div>

        <div className="details-card-box">
          <h2 className="details-card-title">
            <Building2 size={22} color="var(--primary)" />
            <span>বিভাগের পরিচিতি ও BAIT-এর কার্যক্রম</span>
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '16px' }}>
            {division.description} BAIT এই বিভাগের প্রতিটি জেলার প্রত্যন্ত অঞ্চলে তথ্যপ্রযুক্তি অবকাঠামো সম্প্রসারণে কাজ করে চলেছে।
          </p>
        </div>

        <div style={{ marginTop: '50px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
            {division.name_bn}-এর অধীনস্থ জেলাসমূহ ({districts?.length || 0}টি)
          </h2>
          <div className="entity-grid">
            {districts?.map(dist => (
              <div key={dist.id} className="standard-card">
                <div className="standard-card-header">
                  <span className="badge-tag badge-blue">জেলা</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>উপজেলা: {dist.total_upazilas || 0} টি</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: '8px 0', color: 'var(--primary-dark)' }}>
                  {dist.name_bn} জেলা
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', flexGrow: 1 }}>
                  {dist.description?.substring(0, 85)}...
                </p>
                <Link to={`/jela/${dist.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
