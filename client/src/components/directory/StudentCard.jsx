import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function StudentCard({ student }) {
  if (!student) return null;

  return (
    <div className="person-card">
      <div className="person-header">
        <img 
          src={student.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
          alt={student.name_bn} 
          className="person-avatar" 
        />
        <div className="person-meta">
          <div className="person-name">{student.name_bn}</div>
          <div className="person-role">{student.course_name}</div>
          {student.batch && (
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{student.batch}</div>
          )}
        </div>
      </div>

      <div className="person-body">
        {(student.upazila_name || student.district_name || student.division_name) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 600 }}>
            <MapPin size={14} />
            <span>
              {student.upazila_name ? `${student.upazila_name}, ` : ''}
              {student.district_name ? `${student.district_name}, ` : ''}
              {student.division_name || ''}
            </span>
          </div>
        )}
        {student.achievements && (
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {student.achievements}
          </p>
        )}
      </div>

      <div className="person-footer">
        <Link to={`/student/${student.slug}`} className="card-btn" style={{ width: '100%' }}>
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
