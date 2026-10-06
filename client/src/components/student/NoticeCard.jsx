import React from 'react';
import { Bell, Clock } from 'lucide-react';

export default function NoticeCard({ notice }) {
  if (!notice) return null;

  return (
    <div className={`student-card notice-card ${notice.unread ? 'notice-unread' : ''}`}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div 
          style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            background: notice.unread ? 'rgba(0, 106, 78, 0.12)' : '#f1f5f9', 
            color: notice.unread ? 'var(--primary)' : '#64748b',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Bell size={18} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
              {notice.title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#94a3b8' }}>
              <Clock size={12} />
              <span>{notice.time}</span>
            </div>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {notice.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
