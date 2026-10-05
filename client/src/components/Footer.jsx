import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Globe, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-grid">
          {/* Column 1: BAIT Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="logo-badge" style={{ background: '#059669', width: '40px', height: '40px', fontSize: '1.1rem' }}>
                BAIT
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>BAIT</h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: '1.7', marginBottom: '20px' }}>
              বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট অব টেকনোলজি (BAIT) তৃণমূল পর্যায় পর্যন্ত তথ্যপ্রযুক্তি শিক্ষা, কর্মমুখী দক্ষতা উন্নয়ন ও সাংবাদিকতা নেটওয়ার্ক সম্প্রসারণে নিবেদিত একটি জাতীয় প্ল্যাটফর্ম।
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', padding: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }} title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', padding: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }} title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#94a3b8', padding: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }} title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="/" style={{ color: '#94a3b8', padding: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }} title="BAIT">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: দ্রুত লিংক */}
          <div>
            <h4 className="footer-col-title">দ্রুত লিংক</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">হোম</Link></li>
              <li><Link to="/amader-somporke" className="footer-link">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/bibhag" className="footer-link">বিভাগসমূহ (৮টি)</Link></li>
              <li><Link to="/jela" className="footer-link">জেলাসমূহ (৬৪টি)</Link></li>
              <li><Link to="/upojela" className="footer-link">উপজেলাসমূহ</Link></li>
              <li><Link to="/course" className="footer-link">কোর্সসমূহ</Link></li>
              <li><Link to="/instructor" className="footer-link">প্রশিক্ষক তালিকা</Link></li>
              <li><Link to="/student" className="footer-link">শিক্ষার্থীবৃন্দ</Link></li>
              <li><Link to="/journalist" className="footer-link">সাংবাদিক ফোরাম</Link></li>
            </ul>
          </div>

          {/* Column 3: গুরুত্বপূর্ণ লিংক */}
          <div>
            <h4 className="footer-col-title">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="footer-links">
              <li><Link to="/amader-somporke" className="footer-link">লক্ষ্য ও ভিশন</Link></li>
              <li><Link to="/jogajog" className="footer-link">যোগাযোগ ও সহায়তা</Link></li>
              <li><Link to="/admin/login" className="footer-link"><ShieldCheck size={14} /> কর্মকর্তা লগইন</Link></li>
              <li><span className="footer-link">গোপনীয়তা নীতি</span></li>
              <li><span className="footer-link">ব্যবহারের শর্তাবলি</span></li>
              <li><span className="footer-link">সচরাচর জিজ্ঞাসা (FAQ)</span></li>
            </ul>
          </div>

          {/* Column 4: প্রধান কার্যালয় */}
          <div>
            <h4 className="footer-col-title">BAIT সদর দপ্তর</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '10px', color: '#94a3b8', fontSize: '0.92rem' }}>
                <MapPin size={20} style={{ flexShrink: 0, color: '#10b981', marginTop: '3px' }} />
                <span>BAIT টাওয়ার, প্লট-৭/এ, মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: '#94a3b8', fontSize: '0.92rem' }}>
                <Phone size={18} style={{ flexShrink: 0, color: '#10b981' }} />
                <span>+৮৮০ ২-৯৮৭৬৫৪৩, +৮৮০ ১৭০০ ০০১১২২</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: '#94a3b8', fontSize: '0.92rem' }}>
                <Mail size={18} style={{ flexShrink: 0, color: '#10b981' }} />
                <span>info@bait.org.bd</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', color: '#94a3b8', fontSize: '0.92rem' }}>
                <Clock size={18} style={{ flexShrink: 0, color: '#10b981' }} />
                <span>রবি - বৃহঃ: সকাল ৯টা - বিকাল ৫টা</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p>© ২০২৬ BAIT. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
