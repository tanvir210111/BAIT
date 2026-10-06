import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-grid">
          {/* Column 1: BAIT Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div className="logo-badge" style={{ background: '#006a4e', border: '2.5px solid var(--accent-red)', width: '46px', height: '46px', fontSize: '1.25rem' }}>
                BAIT
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800 }}>BAIT</h3>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '1.04rem', lineHeight: '1.8', marginBottom: '22px' }}>
              বাংলার আলো আইটি (BAIT) তৃণমূল পর্যায় পর্যন্ত তথ্যপ্রযুক্তি শিক্ষা, কর্মমুখী দক্ষতা উন্নয়ন ও আধুনিক সফটওয়্যার নেটওয়ার্ক সম্প্রসারণে নিবেদিত একটি জাতীয় প্ল্যাটফর্ম।
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'nowrap' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="/" className="footer-social-btn" title="Official Website">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: দ্রুত লিংক */}
          <div>
            <h4 className="footer-col-title" style={{ color: '#ffffff', borderBottom: '2px solid var(--accent-red)', paddingBottom: '6px', display: 'inline-block' }}>দ্রুত লিংক</h4>
            <ul className="footer-links">
              <li><Link to="/amader-somporke" className="footer-link">লক্ষ্য ও ভিশন</Link></li>
              <li><Link to="/course" className="footer-link">কোর্সসমূহ</Link></li>
              <li><Link to="/instructor" className="footer-link">প্রশিক্ষকমণ্ডলী</Link></li>
              <li><Link to="/refund-policy" className="footer-link">রিফান্ড পলিসি</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">প্রাইভেসী পলিসি</Link></li>
              <li><Link to="/terms-conditions" className="footer-link">টার্মস এবং শর্তাবলী</Link></li>
            </ul>
          </div>

          {/* Column 3: প্রধান কার্যালয় */}
          <div>
            <h4 className="footer-col-title" style={{ color: '#ffffff', borderBottom: '2px solid var(--accent-red)', paddingBottom: '6px', display: 'inline-block' }}>BAIT সদর দপ্তর</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '12px', color: '#cbd5e1', fontSize: '1.04rem', lineHeight: '1.65' }}>
                <MapPin size={22} style={{ flexShrink: 0, color: 'var(--accent-red)', marginTop: '2px' }} />
                <span>৩১/১ শরীফ কমপ্লেক্স, দৈনিক বাংলার আলো নিউজ পত্রিকা অফিস, ৬ষ্ঠ তলা, পুরানা পল্টন, ঢাকা।</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#cbd5e1', fontSize: '1.04rem' }}>
                <Phone size={20} style={{ flexShrink: 0, color: '#a7f3d0' }} />
                <span>হটলাইন: 01711006214</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#cbd5e1', fontSize: '1.04rem' }}>
                <Mail size={20} style={{ flexShrink: 0, color: '#a7f3d0' }} />
                <span>supportbait@gmail.com</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: '#cbd5e1', fontSize: '1.04rem' }}>
                <Clock size={20} style={{ flexShrink: 0, color: '#a7f3d0' }} />
                <span>শনি - বৃহঃ দুপুর ১২টা - রাত ৮টা</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p style={{ fontSize: '0.96rem', margin: 0 }}>© ২০২৬ BAIT (বাংলার আলো আইটি). সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
