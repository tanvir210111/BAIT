import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, ChevronDown, LayoutDashboard, Shield } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth state on render and route change
  useEffect(() => {
    const token = localStorage.getItem('bait_admin_token');
    const storedUser = localStorage.getItem('bait_admin_user');
    if (token && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bait_admin_token');
    localStorage.removeItem('bait_admin_user');
    setCurrentUser(null);
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="site-header">
      {/* Top Notice Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div>
            <span>বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট অব টেকনোলজি (BAIT) — তৃণমূল পর্যায়ে জ্ঞান ও দক্ষতার বিকাশ</span>
          </div>
          <div className="top-bar-links">
            <span>হটলাইন: +৮৮০ ১৭০০ ০০১১২২</span>
            <span>|</span>
            <Link to="/jogajog" style={{ color: '#a7f3d0' }}>সহায়তা কেন্দ্র</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo-area">
          <div className="logo-badge">BAIT</div>
          <div className="brand-names">
            <span className="brand-title">BAIT</span>
            <span className="brand-subtitle">বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট</span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                হোম
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/amader-somporke" className={`nav-link ${location.pathname === '/amader-somporke' ? 'active' : ''}`}>
                আমাদের সম্পর্কে
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jogajog" className={`nav-link ${location.pathname === '/jogajog' ? 'active' : ''}`}>
                যোগাযোগ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Nav Actions (Search & Sign In / Profile) */}
        <div className="nav-actions">
          <button 
            type="button" 
            className="search-trigger-btn"
            onClick={onOpenSearch}
            title="গ্লোবাল সার্চ"
          >
            <Search size={16} />
            <span>অনুসন্ধান</span>
          </button>

          {/* Profile / Sign In Option */}
          {currentUser ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                className="btn-admin"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{ background: 'var(--primary)', color: '#fff', cursor: 'pointer', border: 'none' }}
              >
                <User size={16} />
                <span>{currentUser.name?.split(' ')[0] || 'প্রোফাইল'}</span>
                <ChevronDown size={14} />
              </button>

              {userDropdownOpen && (
                <div className="nav-dropdown show" style={{ right: 0, left: 'auto', width: '220px' }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-dark)' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {currentUser.role === 'superadmin' || currentUser.category === 'admin' ? 'প্রশাসক' : currentUser.designation || 'ব্যবহারকারী'}
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none' }}>
                    <li>
                      <Link 
                        to="/my-profile" 
                        className="dropdown-item"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <User size={15} style={{ marginRight: '8px' }} />
                        <span>আমার প্রোফাইল</span>
                      </Link>
                    </li>

                    {(currentUser.role === 'superadmin' || currentUser.category === 'admin') && (
                      <li>
                        <Link 
                          to="/admin" 
                          className="dropdown-item"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <LayoutDashboard size={15} style={{ marginRight: '8px' }} />
                          <span>নিয়ন্ত্রণ প্যানেল</span>
                        </Link>
                      </li>
                    )}

                    <li style={{ borderTop: '1px solid var(--border)', marginTop: '4px', paddingTop: '4px' }}>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="dropdown-item"
                        style={{ width: '100%', background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', textAlign: 'left' }}
                      >
                        <LogOut size={15} style={{ marginRight: '8px' }} />
                        <span>সাইন আউট</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="btn-admin" title="প্রোফাইল সাইন ইন">
              <User size={16} />
              <span>সাইন ইন</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button 
            type="button" 
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}
