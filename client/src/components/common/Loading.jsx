import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({ text = 'লোড হচ্ছে...', fullPage = false }) {
  if (fullPage) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
        <Loader2 size={36} className="spin-animation" color="var(--primary)" />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', fontWeight: 500 }}>{text}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <Loader2 size={24} className="spin-animation" color="var(--primary)" />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{text}</span>
    </div>
  );
}
