import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, ArrowRight } from 'lucide-react';

export default function InstructorCard({
  name,
  designation,
  bio,
  photoUrl,
  slug
}) {
  if (!name) return null;

  return (
    <div className="details-card-box">
      <h3 className="details-card-title" style={{ fontSize: '1.2rem' }}>
        <UserCheck size={20} color="var(--primary)" />
        <span>কোর্স প্রশিক্ষক</span>
      </h3>
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <img 
          src={photoUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'} 
          alt={name}
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto', border: '3px solid var(--border)' }} 
        />
        <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>
          {name}
        </h4>
        <div style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '12px' }}>
          {designation || 'প্রশিক্ষক'}
        </div>
        {bio && (
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
            {bio.substring(0, 110)}...
          </p>
        )}
        {slug && (
          <Link to={`/instructor/${slug}`} className="card-btn" style={{ width: '100%' }}>
            <span>প্রশিক্ষক প্রোফাইল</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
