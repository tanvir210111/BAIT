import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  HelpCircle,
  FileSpreadsheet,
  BookMarked,
  FolderGit2,
  TrendingUp,
  BookOpen,
  Video,
  FolderDown,
  Library,
  CalendarCheck,
  Award,
  DollarSign,
  Megaphone,
  Settings,
  Bell,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Headphones
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function StudentSidebar({ 
  isOpen, 
  onClose, 
  isCollapsed, 
  onToggleCollapse 
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  // Sections matching the exact order requested by user:
  // ড্যাশবোর্ড -> অ্যাকাডেমিক (ক্লাস রুটিন, কুইজ, এক্সাম, অ্যাসাইনমেন্ট, প্রজেক্ট, রেজাল্ট, আমার কোর্স, লেকচার, রিসোর্স, লাইব্রেরি, এটেন্ডেন্স, সার্টিফিকেট) -> প্রশাসনিক (পেমেন্ট, নোটিশ) -> সেটিংস
  const menuSections = [
    {
      heading: null, // Top standalone Dashboard
      items: [
        { 
          id: 'dashboard', 
          name: 'ড্যাশবোর্ড', 
          path: '/student/dashboard', 
          icon: LayoutDashboard 
        }
      ]
    },
    {
      heading: 'অ্যাকাডেমিক',
      items: [
        { 
          id: 'schedule', 
          name: 'ক্লাস রুটিন', 
          path: '/student/class-routine', 
          icon: Calendar 
        },
        { 
          id: 'quizzes', 
          name: 'কুইজ', 
          path: '/student/quizzes', 
          icon: HelpCircle 
        },
        { 
          id: 'exams', 
          name: 'এক্সাম', 
          path: '/student/exams', 
          icon: FileSpreadsheet 
        },
        { 
          id: 'assignments', 
          name: 'অ্যাসাইনমেন্ট', 
          path: '/student/assignments', 
          icon: BookMarked 
        },
        { 
          id: 'projects', 
          name: 'প্রজেক্ট', 
          path: '/student/projects', 
          icon: FolderGit2 
        },
        { 
          id: 'results', 
          name: 'রেজাল্ট', 
          path: '/student/results', 
          icon: TrendingUp 
        },
        { 
          id: 'enrolled-courses', 
          name: 'আমার কোর্স', 
          path: '/student/courses', 
          icon: BookOpen 
        },
        { 
          id: 'lectures', 
          name: 'লেকচার', 
          path: '/student/lectures', 
          icon: Video 
        },
        { 
          id: 'resources', 
          name: 'রিসোর্স', 
          path: '/student/resources', 
          icon: FolderDown 
        },
        { 
          id: 'libraries', 
          name: 'লাইব্রেরি', 
          path: '/student/library', 
          icon: Library 
        },
        { 
          id: 'attendance', 
          name: 'এটেন্ডেন্স', 
          path: '/student/attendance', 
          icon: CalendarCheck 
        },
        { 
          id: 'certificates', 
          name: 'সার্টিফিকেট', 
          path: '/student/certificates', 
          icon: Award 
        }
      ]
    },
    {
      heading: 'প্রশাসনিক',
      items: [
        { 
          id: 'finance', 
          name: 'পেমেন্ট', 
          path: '/student/payments', 
          icon: DollarSign 
        },
        { 
          id: 'announcements', 
          name: 'নোটিশ', 
          path: '/student/notifications', 
          icon: Megaphone 
        }
      ]
    },
    {
      heading: 'সেটিংস',
      items: [
        { 
          id: 'profile', 
          name: 'আমার প্রোফাইল', 
          path: '/student/profile', 
          icon: User 
        },
        { 
          id: 'account-settings', 
          name: 'অ্যাকাউন্ট সেটিংস', 
          path: '/student/settings', 
          icon: Settings 
        },
        { 
          id: 'support-helpdesk', 
          name: 'সাপোর্ট হেল্পডেস্ক', 
          path: '/student/support', 
          icon: Headphones 
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div 
          className="search-modal-backdrop" 
          onClick={onClose}
          style={{ zIndex: 998 }}
        />
      )}

      <aside className={`utopia-sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Brand Header */}
        <div className="utopia-sidebar-brand">
          <NavLink to="/student/dashboard" className="utopia-brand-link">
            {/* Utopia Polygon Logo */}
            <div className="utopia-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 5L10 3V19L4 21V5Z" fill="#FFFFFF" />
                <path d="M14 3L20 5V21L14 19V3Z" fill="#FFFFFF" fillOpacity="0.85" />
              </svg>
            </div>
            {!isCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="utopia-brand-text">BAIT</span>
                <span style={{ fontSize: '0.66rem', color: '#94a3b8', fontWeight: 600 }}>
                  শিক্ষার্থী পোর্টাল
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button 
            type="button" 
            className="utopia-sidebar-collapse-toggle"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'মেনু প্রসারিত করুন' : 'মেনু সংকুচিত করুন'}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          {/* Mobile Drawer Close Button */}
          <button 
            type="button" 
            className="utopia-sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="utopia-sidebar-nav">
          {menuSections.map((section, secIndex) => (
            <div key={secIndex} className="utopia-nav-section">
              {section.heading && !isCollapsed && (
                <div className="utopia-nav-heading">
                  {section.heading}
                </div>
              )}
              {section.heading && isCollapsed && (
                <div className="utopia-nav-divider" />
              )}

              <div className="utopia-nav-group">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = location.pathname === item.path || 
                    (item.path === '/student/dashboard' && location.pathname === '/student');

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => {
                        if (onClose) onClose();
                      }}
                      className={({ isActive }) => 
                        `utopia-nav-item ${isActive || isCurrent ? 'active' : ''}`
                      }
                      title={isCollapsed ? item.name : undefined}
                    >
                      <Icon size={18} className="utopia-nav-icon" />
                      {!isCollapsed && (
                        <span className="utopia-nav-label">{item.name}</span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Settings Section: Logout Button */}
          <div className="utopia-nav-section" style={{ marginTop: 'auto', paddingTop: '1rem', paddingBottom: '1rem' }}>
            <button
              type="button"
              onClick={handleLogout}
              className="utopia-nav-item utopia-logout-item"
              title={isCollapsed ? 'লগআউট' : undefined}
            >
              <LogOut size={18} className="utopia-nav-icon" />
              {!isCollapsed && (
                <span className="utopia-nav-label">লগআউট করুন</span>
              )}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
