import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from 'lucide-react';

/**
 * Isolated Component: Preserved for future activation.
 * Removed from current public flow per project requirements.
 */
export default function UpazilaDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/upazilas/${slug}`)
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
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>উপজেলার তথ্য লোড হচ্ছে...</div>;
  }

  if (!data || !data.upazila) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>উপজেলা পাওয়া যায়নি</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>হোমে ফিরুন</Link>
      </div>
    );
  }

  const { upazila } = data;

  return (
    <div>
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>{upazila.name_bn}</span>
          </div>
          <h1 className="page-banner-title">{upazila.name_bn} উপজেলা</h1>
          <p className="page-banner-subtitle">
            {upazila.district_name} জেলা • {upazila.division_name} বিভাগ
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        <div className="details-card-box">
          <h2 className="details-card-title">
            <Navigation size={22} color="var(--primary)" />
            <span>উপজেলা পরিচিতি</span>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '18px' }}>
            {upazila.description || `${upazila.name_bn} উপজেলা ${upazila.district_name} জেলার অধীনে অবস্থিত একটি সমৃদ্ধ জনপদ।`}
          </p>
          <table className="info-table">
            <tbody>
              <tr>
                <td>উপজেলার নাম:</td>
                <td><strong>{upazila.name_bn}</strong></td>
              </tr>
              <tr>
                <td>জেলা:</td>
                <td>{upazila.district_name} জেলা</td>
              </tr>
              <tr>
                <td>বিভাগ:</td>
                <td>{upazila.division_name} বিভাগ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
