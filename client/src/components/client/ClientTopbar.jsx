import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Plus, 
  Bell, 
  Globe, 
  ChevronDown, 
  ShieldCheck,
  Building2 
} from 'lucide-react';
import ROUTES from '../../constants/routes';

export default function ClientTopbar({ onToggleSidebar }) {
  let clientUser = {
    name: 'মোহাম্মদ তানজিম হাসান',
    company: 'প্রাইম টেক লজিস্টিকস লিমিটেড'
  };

  try {
    const raw = localStorage.getItem('bait_admin_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.name_bn || parsed.name) clientUser.name = parsed.name_bn || parsed.name;
      if (parsed.organization_name) clientUser.company = parsed.organization_name;
    }
  } catch {
    // fallback
  }

  return (
    <header className="client-topbar">
      <div className="client-topbar-left">
        <button 
          type="button" 
          onClick={onToggleSidebar} 
          className="client-toggle-sidebar-btn"
          aria-label="Toggle Navigation"
        >
          <Menu size={22} />
        </button>

        <div className="client-search-box">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="প্রজেক্ট, ইনভয়েস বা সার্ভিস খুঁজুন..." 
          />
        </div>
      </div>

      <div className="client-topbar-right">
        {/* Quick CTA button */}
        <Link to={ROUTES.CLIENT.REQUEST_PROJECT} className="client-cta-req-btn">
          <Plus size={16} />
          <span>নতুন প্রজেক্ট রিকোয়েস্ট</span>
        </Link>

        {/* Notifications */}
        <button 
          type="button" 
          className="client-icon-btn" 
          title="বিজ্ঞপ্তি"
          aria-label="বিজ্ঞপ্তি"
        >
          <Bell size={18} />
          <span className="client-notification-dot" />
        </button>

        {/* User Company Chip */}
        <div className="client-topbar-profile" title={clientUser.company}>
          <div className="client-user-avatar" style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}>
            <Building2 size={16} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--client-text)' }}>
              {clientUser.name}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
              {clientUser.company}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
