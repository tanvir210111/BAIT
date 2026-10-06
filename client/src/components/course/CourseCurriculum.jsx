import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CourseCurriculum({ syllabus = [] }) {
  if (!syllabus || syllabus.length === 0) return null;

  return (
    <div className="details-card-box">
      <h2 className="details-card-title">
        <CheckCircle2 size={22} color="var(--accent-emerald)" />
        <span>কী কী শেখানো হবে (কোর্স কারিকুলাম ও সিলেবাস)</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
        শিল্প কারখানার চাহিদা ও কর্মসংস্থানের সুযোগ বিবেচনায় প্রণীত পূর্ণাঙ্গ সিলেবাস:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {syllabus.map((item, idx) => {
          const title = typeof item === 'string' ? item : item.title || '';
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#f1f5f9', padding: '12px 16px', borderRadius: '6px' }}>
              <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                {idx + 1}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 500 }}>
                {title.trim()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
