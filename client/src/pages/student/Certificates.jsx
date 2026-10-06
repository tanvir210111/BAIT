import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Search, ShieldCheck } from 'lucide-react';
import { studentService } from '../../services/studentService';
import CertificateCard from '../../components/student/CertificateCard';
import Loading from '../../components/common/Loading';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  useEffect(() => {
    studentService.getCertificates()
      .then(data => {
        setCertificates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verifyId.trim()) return;

    const found = certificates.find(c => c.id.toLowerCase() === verifyId.trim().toLowerCase());
    if (found) {
      setVerifyResult({ found: true, cert: found });
    } else {
      setVerifyResult({ found: false, message: 'প্রদত্ত আইডিযুক্ত কোনো ভেরিফায়েড সনদপত্র পাওয়া যায়নি।' });
    }
  };

  if (loading) {
    return <Loading text="সার্টিফিকেট লোড হচ্ছে..." fullPage />;
  }

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">সার্টিফিকেট ও সনদপত্র (Certificates)</h1>
          <p className="student-page-subtitle">
            BAIT কর্তৃক ইস্যুকৃত আন্তর্জাতিক মানসম্পন্ন ভেরিফায়েড সার্টিফিকেট।
          </p>
        </div>
      </div>

      {/* Verified Certificates Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {certificates.map(cert => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>

      {/* Online Verification Box */}
      <div className="student-card" style={{ padding: '24px', background: '#f8fafc', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <ShieldCheck size={24} color="var(--primary)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
            অনলাইন সনদপত্র যাচাইকরণ (Verify Certificate ID)
          </h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          যেকোনো নিয়োগকারী বা শিক্ষার্থী সার্টিফিকেটের ইউনিক আইডি টাইপ করে সত্যতা যাচাই করতে পারবেন।
        </p>

        <form onSubmit={handleVerify} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input 
            type="text"
            className="form-control"
            placeholder="যেমন: BAIT-CERT-2026-902"
            value={verifyId}
            onChange={e => setVerifyId(e.target.value)}
            style={{ maxWidth: '340px' }}
          />
          <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Search size={16} />
            <span>যাচাই করুন</span>
          </button>
        </form>

        {verifyResult && (
          <div style={{ marginTop: '16px', padding: '14px', borderRadius: '8px', background: verifyResult.found ? '#ecfdf5' : '#fee2e2', border: `1px solid ${verifyResult.found ? '#a7f3d0' : '#fecaca'}`, color: verifyResult.found ? '#065f46' : '#991b1b', fontSize: '0.9rem' }}>
            {verifyResult.found ? (
              <div>
                <strong>✓ সনদপত্রটি শতভাগ আসল ও ভেরিফায়েড!</strong><br />
                কোর্স: {verifyResult.cert.courseName} | শিক্ষার্থী আইডি: BAIT-2026-ST001 | গ্রেড: {verifyResult.cert.grade}
              </div>
            ) : (
              <div>✕ {verifyResult.message}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
