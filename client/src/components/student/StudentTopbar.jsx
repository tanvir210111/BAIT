import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  MessageSquare, 
  Bell, 
  User, 
  Check, 
  ExternalLink, 
  Settings as SettingsIcon,
  LogOut,
  X,
  BookOpen,
  Calendar,
  FileCheck
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function StudentTopbar({ onToggleMobileSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showMsgDropdown, setShowMsgDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'আজকের লাইভ ক্লাস শুরু রাত ৯:০০ টায়',
      desc: 'মডিউল ১৪: রেড্যাক্স টুলকিট ও আরটিকে কোয়েরি ক্লাসে যথাসময়ে যুক্ত হতে নির্দেশ দেওয়া হলো।',
      time: '১০ মিনিট আগে',
      unread: true,
      link: '/student/live-classes'
    },
    {
      id: 2,
      title: 'অ্যাসাইনমেন্ট ০৮ এর ফলাফল প্রকাশিত হয়েছে',
      desc: 'আপনার প্রাপ্ত নম্বর: ৪৮/৫০ (A+)। ফিডব্যাক দেখতে ফলাফল ট্যাবে প্রবেশ করুন।',
      time: '১ ঘণ্টা আগে',
      unread: true,
      link: '/student/results'
    },
    {
      id: 3,
      title: 'মিড-টার্ম কুইজ পরীক্ষার সময়সূচি',
      desc: '১২ই জানুয়ারি ২০২৪ তারিখে রিঅ্যাক্ট ও ফ্রন্টএন্ড মূল্যায়ন পরীক্ষা অনুষ্ঠিত হবে।',
      time: '১ দিন আগে',
      unread: false,
      link: '/student/exams'
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'প্রকৌশলী তানভীর আহমেদ (প্রধান মেন্টর)',
      text: 'আপনার অ্যাসাইনমেন্ট ০৮ এর কোড রিভিউ সম্পন্ন হয়েছে। অনেক দারুণ হয়েছে!',
      time: '১৫ মিনিট আগে',
      unread: true
    },
    {
      id: 2,
      sender: 'বিএআইটি সাপোর্ট টিম',
      text: 'সেমিস্টার ফি ভেরিফাই করা হয়েছে। আপনি ইনভয়েস ডাউনলোড করতে পারেন।',
      time: '২ ঘণ্টা আগে',
      unread: false
    }
  ]);

  const user = authService.getUser();
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const msgRef = useRef(null);
  const profileRef = useRef(null);

  // Close popovers on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
      if (msgRef.current && !msgRef.current.contains(event.target)) {
        setShowMsgDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(false);
      navigate(`/student/courses?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const userName = user?.name || 'তানভীর হোসেন';
  const avatarUrl = user?.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
  const unreadNotifCount = notifications.filter(n => n.unread).length;
  const unreadMsgCount = messages.filter(m => m.unread).length;

  return (
    <>
      <header className="utopia-topbar">
        <div className="utopia-topbar-left">
          {/* Mobile Sidebar Hamburger */}
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="utopia-hamburger-btn"
            aria-label="Menu toggle"
          >
            <Menu size={20} />
          </button>

          {/* Quick Global Search Bar */}
          <div className="utopia-search-form" onClick={() => setShowSearchModal(true)}>
            <Search size={16} className="utopia-search-icon" />
            <input
              type="text"
              readOnly
              placeholder="অনুসন্ধান করুন (কোর্স, রুটিন, পরীক্ষা, বাড়ির কাজ)..."
              className="utopia-search-input"
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.72rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', color: '#64748b' }}>
              Ctrl+K
            </span>
          </div>
        </div>

        <div className="utopia-topbar-right">
          {/* Messages Dropdown */}
          <div className="utopia-topbar-dropdown-wrapper" ref={msgRef}>
            <button
              type="button"
              className="utopia-icon-btn" 
              title="বার্তা ও মেন্টর চ্যাট"
              onClick={() => {
                setShowMsgDropdown(prev => !prev);
                setShowNotifDropdown(false);
                setShowProfileDropdown(false);
              }}
            >
              <MessageSquare size={19} />
              {unreadMsgCount > 0 && <span className="utopia-badge-dot" />}
            </button>

            {showMsgDropdown && (
              <div className="utopia-popover-menu">
                <div className="utopia-popover-header">
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      মেন্টর বার্তা
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {unreadMsgCount} টি নতুন বার্তা
                    </span>
                  </div>
                  <Link 
                    to="/student/support" 
                    onClick={() => setShowMsgDropdown(false)}
                    style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}
                  >
                    সব দেখুন
                  </Link>
                </div>

                <div className="utopia-popover-list">
                  {messages.map(msg => (
                    <div key={msg.id} className={`utopia-popover-item ${msg.unread ? 'unread' : ''}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                        <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>{msg.sender}</strong>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{msg.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="utopia-popover-footer">
                  <Link 
                    to="/student/support" 
                    onClick={() => setShowMsgDropdown(false)}
                    className="utopia-popover-footer-btn"
                  >
                    লাইভ ডাউট সলভ রুমে প্রবেশ করুন &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="utopia-topbar-dropdown-wrapper" ref={notifRef}>
            <button
              type="button"
              className="utopia-icon-btn" 
              title="নোটিফিকেশন"
              onClick={() => {
                setShowNotifDropdown(prev => !prev);
                setShowMsgDropdown(false);
                setShowProfileDropdown(false);
              }}
            >
              <Bell size={20} />
              {unreadNotifCount > 0 && <span className="utopia-badge-dot" />}
            </button>

            {showNotifDropdown && (
              <div className="utopia-popover-menu">
                <div className="utopia-popover-header">
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      নোটিশ বোর্ড
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {unreadNotifCount} টি নতুন নোটিফিকেশন
                    </span>
                  </div>
                  {unreadNotifCount > 0 && (
                    <button 
                      type="button" 
                      onClick={markAllNotifsRead}
                      style={{ background: 'none', border: 'none', color: '#059669', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Check size={14} /> সব পড়া হয়েছে
                    </button>
                  )}
                </div>

                <div className="utopia-popover-list">
                  {notifications.map(n => (
                    <Link
                      key={n.id}
                      to={n.link}
                      onClick={() => setShowNotifDropdown(false)}
                      className={`utopia-popover-item ${n.unread ? 'unread' : ''}`}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                        <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>{n.title}</strong>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                        {n.desc}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="utopia-popover-footer">
                  <Link 
                    to="/student/notifications" 
                    onClick={() => setShowNotifDropdown(false)}
                    className="utopia-popover-footer-btn"
                  >
                    সকল নোটিফিকেশন দেখুন &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Menu */}
          <div className="utopia-topbar-dropdown-wrapper" ref={profileRef}>
            <button 
              type="button"
              className="utopia-avatar-btn" 
              onClick={() => {
                setShowProfileDropdown(prev => !prev);
                setShowNotifDropdown(false);
                setShowMsgDropdown(false);
              }}
              title={`শিক্ষার্থী: ${userName}`}
            >
              <img 
                src={avatarUrl} 
                alt={userName} 
                className="utopia-avatar-img"
              />
            </button>

            {showProfileDropdown && (
              <div className="utopia-profile-popover">
                <div className="utopia-profile-info-header">
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>{userName}</div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b' }}>আইডি: BAIT-2024-ST001</div>
                  <div style={{ fontSize: '0.72rem', color: '#059669', background: '#dcfce7', padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginTop: '4px', fontWeight: 600 }}>
                    নিয়মিত শিক্ষার্থী • সেমিস্টার ৩
                  </div>
                </div>

                <div className="utopia-profile-links">
                  <Link 
                    to="/student/profile" 
                    onClick={() => setShowProfileDropdown(false)} 
                    className="utopia-profile-link-item"
                  >
                    <User size={16} /> আমার প্রোফাইল
                  </Link>
                  <Link 
                    to="/student/settings" 
                    onClick={() => setShowProfileDropdown(false)} 
                    className="utopia-profile-link-item"
                  >
                    <SettingsIcon size={16} /> অ্যাকাউন্ট সেটিংস
                  </Link>
                  <button 
                    type="button" 
                    onClick={handleLogout} 
                    className="utopia-profile-link-item logout"
                  >
                    <LogOut size={16} /> লগআউট করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="utopia-modal-backdrop" onClick={() => setShowSearchModal(false)}>
          <div className="utopia-modal-box" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                <Search size={18} color="#64748b" />
                <input
                  type="text"
                  autoFocus
                  placeholder="কী খুঁজতে চান? (যেমন: গ্রাফিক, পরীক্ষা, রিঅ্যাক্ট, ফি...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit(e);
                  }}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: '1rem',
                    color: '#0f172a',
                    fontWeight: 500,
                    padding: '8px 0'
                  }}
                />
                <button 
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                দ্রুত নেভিগেশন লিংক
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Link
                  to="/student/class-routine"
                  onClick={() => setShowSearchModal(false)}
                  className="quick-search-result-item"
                >
                  <Calendar size={16} color="#3b82f6" />
                  <div>
                    <strong>ক্লাস রুটিন</strong>
                    <p>সাপ্তাহিক ক্লাসের সময়সূচি ও লাইভ জুম লিংক</p>
                  </div>
                </Link>
                <Link
                  to="/student/quizzes"
                  onClick={() => setShowSearchModal(false)}
                  className="quick-search-result-item"
                >
                  <BookOpen size={16} color="#0284c7" />
                  <div>
                    <strong>কুইজ পোর্টাল</strong>
                    <p>অনলাইন কুইজ টেস্ট, প্র্যাকটিস ও ফলাফল</p>
                  </div>
                </Link>
                <Link
                  to="/student/exams"
                  onClick={() => setShowSearchModal(false)}
                  className="quick-search-result-item"
                >
                  <FileCheck size={16} color="#8b5cf6" />
                  <div>
                    <strong>এক্সাম</strong>
                    <p>মিড-টার্ম ও ফাইনাল পরীক্ষার তারিখ ও সিলেবাস</p>
                  </div>
                </Link>
                <Link
                  to="/student/assignments"
                  onClick={() => setShowSearchModal(false)}
                  className="quick-search-result-item"
                >
                  <BookOpen size={16} color="#f59e0b" />
                  <div>
                    <strong>অ্যাসাইনমেন্ট</strong>
                    <p>অ্যাসাইনমেন্ট জমা দেওয়ার পোর্টাল ও প্রাপ্ত নম্বর</p>
                  </div>
                </Link>
                <Link
                  to="/student/projects"
                  onClick={() => setShowSearchModal(false)}
                  className="quick-search-result-item"
                >
                  <BookOpen size={16} color="#059669" />
                  <div>
                    <strong>প্রজেক্ট ও পোর্টফোলিও</strong>
                    <p>ক্যাপস্টোন প্রজেক্ট, গিটহাব রিপোজিটরি ও লাইভ ডেমো</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
