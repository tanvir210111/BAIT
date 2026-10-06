import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, ExternalLink, User } from 'lucide-react';
import { authService } from '../../services/authService';

export default function StudentTopbar({ onToggleSidebar }) {
  const user = authService.getUser();

  return (
    <header className="student-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="student-hamburger-btn"
          aria-label="মেনু খুলুন"
        >
          <Menu size={22} />
        </button>

        <div className="student-topbar-welcome">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>স্বাগতম,</span>
          <strong style={{ color: 'var(--primary-dark)', fontSize: '1rem', marginLeft: '4px' }}>
            {user?.name || 'শিক্ষার্থী'}
          </strong>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Quick link to main website */}
        <Link 
          to="/" 
          className="student-topbar-action-link"
          title="মূল ওয়েবসাইট দেখুন"
        >
          <ExternalLink size={16} />
          <span className="hide-on-mobile">মূল ওয়েবসাইট</span>
        </Link>

        {/* Notifications */}
        <Link 
          to="/student/notifications" 
          className="student-topbar-icon-btn"
          title="নোটিফিকেশন"
        >
          <Bell size={18} />
          <span className="student-notification-dot" />
        </Link>

        {/* Profile Pill */}
        <Link 
          to="/student/profile" 
          className="student-topbar-profile"
        >
          {user?.photo_url ? (
            <img 
              src={user.photo_url} 
              alt={user.name} 
              className="student-topbar-avatar" 
            />
          ) : (
            <div className="student-topbar-avatar-placeholder">
              <User size={16} />
            </div>
          )}
          <div className="hide-on-mobile" style={{ textAlign: 'left', lineHeight: '1.2' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
              {user?.name?.split(' ')[0] || 'প্রোফাইল'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {user?.batch ? user.batch.split('(')[0].trim() : 'শিক্ষার্থী'}
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
