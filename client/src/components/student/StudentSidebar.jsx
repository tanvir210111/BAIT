import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Calendar,
  FileText,
  FileQuestion,
  Award,
  CreditCard,
  Bell,
  HelpCircle,
  User,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function StudentSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', nameBn: 'ড্যাশবোর্ড', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', nameBn: 'আমার কোর্সসমূহ', path: '/student/courses', icon: BookOpen },
    { name: 'Live Classes', nameBn: 'লাইভ ক্লাসেস', path: '/student/live-classes', icon: Video },
    { name: 'Class Routine', nameBn: 'ক্লাস রুটিন', path: '/student/class-routine', icon: Calendar },
    { name: 'Assignments', nameBn: 'অ্যাসাইনমেন্ট', path: '/student/assignments', icon: FileText },
    { name: 'Exams', nameBn: 'পরীক্ষা ও কুইজ', path: '/student/exams', icon: FileQuestion },
    { name: 'Results', nameBn: 'ফলাফল ও গ্রেডশিট', path: '/student/results', icon: Award },
    { name: 'Certificates', nameBn: 'সার্টিফিকেট', path: '/student/certificates', icon: Award },
    { name: 'Payments', nameBn: 'ফি ও পেমেন্ট হিস্ট্রি', path: '/student/payments', icon: CreditCard },
    { name: 'Notifications', nameBn: 'নোটিফিকেশন', path: '/student/notifications', icon: Bell },
    { name: 'Support', nameBn: 'হেল্প ও সাপোর্ট', path: '/student/support', icon: HelpCircle },
    { name: 'Profile', nameBn: 'প্রোফাইল', path: '/student/profile', icon: User },
    { name: 'Settings', nameBn: 'সেটিংস', path: '/student/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="student-sidebar-backdrop" 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex: 998,
            backdropFilter: 'blur(3px)'
          }}
        />
      )}

      <aside className={`student-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Logo & Close button for mobile */}
        <div className="student-sidebar-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-badge" style={{ width: '38px', height: '38px', fontSize: '1.05rem' }}>
              BAIT
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '0.5px' }}>
                BAIT ACADEMY
              </div>
              <div style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>
                Student Panel
              </div>
            </div>
          </div>

          <button 
            type="button" 
            className="student-sidebar-close-btn"
            onClick={onClose}
            aria-label="মেনু বন্ধ করুন"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="student-sidebar-nav">
          <ul className="student-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) => 
                      `student-nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={18} className="student-nav-icon" />
                    <span>{item.nameBn}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout bottom area */}
        <div className="student-sidebar-footer">
          <button
            type="button"
            onClick={handleLogout}
            className="student-logout-btn"
          >
            <LogOut size={18} />
            <span>লগআউট (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
