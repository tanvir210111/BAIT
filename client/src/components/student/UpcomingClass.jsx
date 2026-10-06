import React from 'react';
import { Video, Clock, Calendar, ExternalLink } from 'lucide-react';

export default function UpcomingClass({ liveClass }) {
  if (!liveClass) return null;

  return (
    <div className="student-card upcoming-class-card" style={{ borderLeft: '4px solid var(--accent-red)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span className="badge-tag badge-red" style={{ fontSize: '0.78rem' }}>
          {liveClass.status === 'upcoming' ? 'আসন্ন লাইভ ক্লাস' : 'রেকর্ডেড ক্লাস'}
        </span>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
          {liveClass.platform}
        </span>
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
        {liveClass.topic}
      </h3>

      <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        {liveClass.courseTitle}
      </div>

      <div style={{ display: 'flex', gap: '16px', fontSize: '0.84rem', color: '#475569', marginBottom: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={15} color="var(--primary)" />
          <span>{liveClass.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={15} color="var(--accent-red)" />
          <span>{liveClass.time}</span>
        </div>
      </div>

      {liveClass.status === 'upcoming' ? (
        <a 
          href={liveClass.joinUrl} 
          target="_blank" 
          rel="noreferrer"
          className="btn"
          style={{
            background: 'var(--accent-red)',
            color: '#fff',
            width: '100%',
            justifyContent: 'center',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px',
            fontWeight: 700,
            borderRadius: '8px',
            textDecoration: 'none'
          }}
        >
          <Video size={17} />
          <span>লাইভ ক্লাসে যুক্ত হন (Join Live)</span>
        </a>
      ) : (
        <a 
          href={liveClass.recordingUrl} 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ExternalLink size={16} />
          <span>রেকর্ডিং দেখুন</span>
        </a>
      )}
    </div>
  );
}
