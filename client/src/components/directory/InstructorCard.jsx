import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function InstructorCard({ instructor }) {
  if (!instructor) return null;

  return (
    <div className="person-card">
      <div className="person-header">
        <img 
          src={instructor.photo_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'} 
          alt={instructor.name_bn} 
          className="person-avatar" 
          style={{ width: '68px', height: '68px' }} 
        />
        <div className="person-meta">
          <div className="person-name">{instructor.name_bn}</div>
          <div className="person-role">{instructor.designation || 'আইসিটি প্রশিক্ষক'}</div>
        </div>
      </div>

      <div className="person-body">
        {(instructor.upazila_name || instructor.district_name || instructor.division_name) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 600 }}>
            <MapPin size={14} />
            <span>
              {instructor.upazila_name ? `${instructor.upazila_name}, ` : ''}
              {instructor.district_name ? `${instructor.district_name}, ` : ''}
              {instructor.division_name || ''}
            </span>
          </div>
        )}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: 500 }}>
          <strong>বিষয়:</strong> {instructor.courses_taught || 'আইসিটি ও সফটওয়্যার স্কিল'}
        </div>
        {instructor.bio && (
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {instructor.bio.substring(0, 95)}...
          </p>
        )}
      </div>

      <div className="person-footer">
        <Link to={`/instructor/${instructor.slug}`} className="card-btn" style={{ width: '100%' }}>
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
