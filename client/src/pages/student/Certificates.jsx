import React, { useState } from 'react';
import { Award, Download, CheckCircle2, ShieldCheck, QrCode, ExternalLink, Calendar, User } from 'lucide-react';

export default function Certificates() {
  const [previewCert, setPreviewCert] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const certificatesList = [
    {
      id: 'BAIT-CERT-2024-8901',
      title: 'সার্টিফিকেট অব এক্সিলেন্স: গ্রাফিক ফান্ডামেন্টালস (ART101)',
      issueDate: '২৮ জানুয়ারি ২০২৪',
      grade: 'গ্রেড A+ (সিজিপিএ ৪.০০)',
      instructor: 'প্রফেসর স্মিথ',
      credentialId: 'BAIT-CERT-ART101-2024',
      skills: 'টাইপোগ্রাফি, গ্রিড আর্কিটেকচার, লেআউট কম্পোজিশন, ব্র্যান্ড আইডেন্টিটি'
    },
    {
      id: 'BAIT-CERT-2023-7412',
      title: 'ফাউন্ডেশন সার্টিফিকেট: কম্পিউটার সায়েন্স বেসিকস (CS100)',
      issueDate: '১৫ ডিসেম্বর ২০২৩',
      grade: 'গ্রেড A (সিজিপিএ ৩.৮৫)',
      instructor: 'প্রকৌশলী তানভীর আহমেদ',
      credentialId: 'BAIT-CERT-CS100-2023',
      skills: 'অ্যালগরিদম বেসিকস, ডেটা স্ট্রাকচার, গিট ও ভার্সন কন্ট্রোল'
    }
  ];

  const handleDownloadCert = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Award size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">সার্টিফিকেট ও অ্যাকাডেমিক সনদপত্র</h1>
          </div>
          <p className="utopia-page-subtitle">
            বিএআইটি একাডেমির ভেরিফাইড কোর্স সমাপনী সনদপত্র, ডিজিটাল ব্যাজ এবং অফিসিয়াল ভেরিফিকেশন আইডি।
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="utopia-alert-banner success">
          <CheckCircle2 size={18} />
          <span>সার্টিফিকেট PDF ফাইল ডাউনলোড সফলভাবে সম্পন্ন হয়েছে!</span>
        </div>
      )}

      {/* 2-Column Aligned Certificates Grid */}
      <div className="utopia-cards-grid-2">
        {certificatesList.map(cert => (
          <div key={cert.id} className="utopia-portal-card">
            {/* Top Body */}
            <div className="utopia-portal-card-body">
              <div className="utopia-portal-card-header">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#059669', background: '#dcfce7', padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> সরকারি ও প্রাতিষ্ঠানিক ভেরিফাইড
                </span>
                <span style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600 }}>
                  {cert.credentialId}
                </span>
              </div>

              <h3 className="utopia-portal-card-title">
                {cert.title}
              </h3>

              <div className="utopia-course-divider" style={{ margin: '8px 0 10px' }} />

              <div className="utopia-portal-card-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#64748b" /> ইস্যুর তারিখ: <strong>{cert.issueDate}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} color="#64748b" /> মূল্যায়ন: <strong style={{ color: '#059669' }}>{cert.grade}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="#64748b" /> প্রধান প্রশিক্ষক: <strong>{cert.instructor}</strong>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', color: '#64748b', marginBottom: '8px', border: '1px solid #edf2f7' }}>
                অর্জিত দক্ষতা: {cert.skills}
              </div>
            </div>

            {/* Bottom Footer Aligned Across Both Cards */}
            <div className="utopia-portal-card-footer">
              <button
                type="button"
                onClick={() => setPreviewCert(cert)}
                className="utopia-btn-outline-sm"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                প্রিভিউ দেখুন
              </button>
              <button
                type="button"
                onClick={handleDownloadCert}
                className="utopia-btn-primary"
                style={{ flex: 1, justifyContent: 'center', background: '#059669' }}
              >
                <Download size={15} /> ডাউনলোড (PDF)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal Preview */}
      {previewCert && (
        <div className="utopia-modal-backdrop" onClick={() => setPreviewCert(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                সনদপত্র অফিসিয়াল প্রিভিউ
              </h3>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '28px', background: '#fafaf9', border: '8px solid #f5f5f4', margin: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', letterSpacing: '2px', color: '#78716c', fontWeight: 700 }}>
                BANGLAR ALO IT ACADEMY (BAIT)
              </div>
              <h2 style={{ fontSize: '1.4rem', color: '#1c1917', fontWeight: 800, margin: '14px 0 6px' }}>
                সার্টিফিকেট অব কমপ্লিশন
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#57534e' }}>
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,
              </p>
              <h3 style={{ fontSize: '1.25rem', color: '#0284c7', fontWeight: 800, margin: '10px 0' }}>
                তানভীর আহমেদ
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#57534e', lineHeight: '1.6' }}>
                সফলতার সাথে <strong>{previewCert.title}</strong> সম্পন্ন করেছেন এবং কোর্স মূল্যায়নে <strong>{previewCert.grade}</strong> অর্জন করেছেন।
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '28px', borderTop: '1px dashed #d6d3d1', paddingTop: '18px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#292524' }}>{previewCert.instructor}</div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>প্রধান প্রশিক্ষক ও মেন্টর</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#292524' }}>বিএআইটি পরীক্ষা বোর্ড</div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>অ্যাকাডেমিক ডিরেক্টর</div>
                </div>
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.74rem', color: '#a8a29e' }}>
                ভেরিফিকেশন আইডি: {previewCert.id} • কিউআর ভেরিফাইড
              </div>
            </div>

            <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="utopia-btn-secondary"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={handleDownloadCert}
                className="utopia-btn-primary"
                style={{ background: '#059669' }}
              >
                ডাউনলোড করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
