import React from 'react';
import { Award, Download, ExternalLink, CheckCircle } from 'lucide-react';

export default function CertificateCard({ certificate }) {
  if (!certificate) return null;

  return (
    <div className="student-card certificate-card" style={{ borderTop: '4px solid #006a4e' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Award size={26} />
        </div>
        <div>
          <span className="badge-tag badge-teal" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={12} />
            <span>ভেরিফায়েড সনদপত্র</span>
          </span>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
            আইডি: {certificate.id}
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '8px' }}>
        {certificate.courseName}
      </h3>

      <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.84rem', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>প্রদানের তারিখ:</span>
          <strong>{certificate.issueDate}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: 'var(--text-muted)' }}>গ্রেড:</span>
          <strong style={{ color: 'var(--primary)' }}>{certificate.grade}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>প্রশিক্ষক:</span>
          <span>{certificate.instructor}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <a 
          href={certificate.credentialUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ExternalLink size={15} />
          <span>অনলাইন যাচাই</span>
        </a>
        <button
          type="button"
          onClick={() => alert(`সনদপত্র ${certificate.id} ডাউনলোড শুরু হয়েছে...`)}
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={15} />
          <span>ডাউনলোড (PDF)</span>
        </button>
      </div>
    </div>
  );
}
