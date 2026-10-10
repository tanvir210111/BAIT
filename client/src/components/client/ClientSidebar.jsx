import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  Receipt, 
  Boxes, 
  Headphones, 
  Settings, 
  LogOut, 
  X,
  ExternalLink
} from 'lucide-react';
import ROUTES from '../../constants/routes';

export default function ClientSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  // Try to read client user info
  let clientUser = {
    name: 'মোহাম্মদ তানজিম হাসান',
    company: 'প্রাইম টেক লজিস্টিকস',
    tier: 'এন্টারপ্রাইজ পার্টনার'
  };

  try {
    const rawUser = localStorage.getItem('bait_admin_user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      if (parsed.name_bn || parsed.name) {
        clientUser.name = parsed.name_bn || parsed.name;
      }
      if (parsed.organization_name) {
        clientUser.company = parsed.organization_name;
      }
    }
  } catch {
    // fallback
  }

  const handleLogout = () => {
    localStorage.removeItem('bait_admin_token');
    localStorage.removeItem('bait_admin_user');
    navigate('/client/login');
  };

  const navLinks = [
    { to: ROUTES.CLIENT.DASHBOARD, label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { to: ROUTES.CLIENT.PROJECTS, label: 'চলমান প্রজেক্টসমূহ', icon: FolderKanban },
    { to: ROUTES.CLIENT.REQUEST_PROJECT, label: 'নতুন প্রজেক্ট রিকোয়েস্ট', icon: PlusCircle },
    { to: ROUTES.CLIENT.INVOICES, label: 'ইনভয়েস ও বিলিং', icon: Receipt },
    { to: ROUTES.CLIENT.SERVICES, label: 'আইটি সার্ভিস ক্যাটালগ', icon: Boxes },
    { to: ROUTES.CLIENT.SUPPORT, label: 'ডেডিকেটেড সাপোর্ট', icon: Headphones },
    { to: ROUTES.CLIENT.SETTINGS, label: 'অ্যাকাউন্ট সেটিংস', icon: Settings },
  ];

  return (
    <aside className={`client-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="client-sidebar-brand">
        <Link to="/" title="হোমপেজে ফিরে যান">
          <div className="client-brand-badge">BAIT</div>
          <div className="client-brand-title-wrap">
            <span className="client-brand-title">বাংলার আলো আইটি</span>
            <span className="client-portal-tag">ক্লায়েন্ট পোর্টাল</span>
          </div>
        </Link>
        {onClose && (
          <button 
            type="button" 
            onClick={onClose} 
            className="client-sidebar-close-btn" 
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: isOpen ? 'block' : 'none' }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="client-sidebar-nav">
        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `client-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="client-sidebar-footer">
        <div className="client-user-mini-card">
          <div className="client-user-avatar">
            {clientUser.name.charAt(0)}
          </div>
          <div className="client-user-info">
            <span className="client-user-name" title={clientUser.name}>{clientUser.name}</span>
            <span className="client-user-tier">{clientUser.company}</span>
          </div>
        </div>

        <button type="button" onClick={handleLogout} className="client-logout-btn">
          <LogOut size={18} />
          <span>লগআউট করুন</span>
        </button>
      </div>
    </aside>
  );
}
