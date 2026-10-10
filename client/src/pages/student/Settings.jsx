import React, { useState } from 'react';
import { Lock, Bell, Shield, Save, CheckCircle2, Key } from 'lucide-react';

export default function Settings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [notificationSettings, setNotificationSettings] = useState({
    classReminders: true,
    assignmentAlerts: true,
    examNotices: true,
    smsAlerts: false
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMsg('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('নতুন পাসওয়ার্ড দুটি মেলেনি।');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Lock size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">অ্যাকাউন্ট সেটিংস ও নিরাপত্তা (Settings)</h1>
          </div>
          <p className="utopia-page-subtitle">
            পাসওয়ার্ড পরিবর্তন, নোটিফিকেশন অগ্রাধিকার এবং লগইন সেশন নিয়ন্ত্রণ।
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="utopia-alert-banner success">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="utopia-alert-banner error" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
          <span>{errorMsg}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Password Change Box */}
        <div className="utopia-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <Key size={18} color="#0d1b2a" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              পাসওয়ার্ড পরিবর্তন করুন
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                বর্তমান পাসওয়ার্ড *
              </label>
              <input 
                type="password"
                required
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="utopia-input"
                placeholder="পুরাতন পাসওয়ার্ড লিখুন"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *
              </label>
              <input 
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="utopia-input"
                placeholder="নতুন শক্তিশালী পাসওয়ার্ড দিন"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                নতুন পাসওয়ার্ড নিশ্চিত করুন *
              </label>
              <input 
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="utopia-input"
                placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
              />
            </div>

            <button 
              type="submit" 
              className="utopia-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              <Save size={16} />
              <span>পাসওয়ার্ড আপডেট করুন</span>
            </button>
          </form>
        </div>

        {/* Notifications & Security Preferences */}
        <div className="utopia-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
            <Bell size={18} color="#0d1b2a" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              নোটিফিকেশন অগ্রাধিকার
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#0f172a' }}>লাইভ ক্লাস রিমাইন্ডার</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>ক্লাস শুরুর ১৫ মিনিট পূর্বে পুশ নোটিফিকেশন পান</div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.classReminders}
                onChange={e => setNotificationSettings({ ...notificationSettings, classReminders: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#0d1b2a' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#0f172a' }}>অ্যাসাইনমেন্ট নম্বর অ্যালার্ট</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>প্রশিক্ষক মূল্যায়ন করার সাথে সাথে ফলাফল নোটিফিকেশন</div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.assignmentAlerts}
                onChange={e => setNotificationSettings({ ...notificationSettings, assignmentAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#0d1b2a' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <strong style={{ fontSize: '0.86rem', color: '#0f172a' }}>জরুরি এসএমএস অ্যালার্ট</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>ক্যাম্পাস ছুটি বা পরীক্ষার সময় পরিবর্তনের এসএমএস পাবেন</div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.smsAlerts}
                onChange={e => setNotificationSettings({ ...notificationSettings, smsAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#0d1b2a' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '1.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: 700, fontSize: '0.84rem', marginBottom: '4px' }}>
              <Shield size={15} color="#059669" />
              <span>সক্রিয় সেশন নিরাপত্তা</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
              ডিভাইস: উইন্ডোজ ডেস্কটপ ব্রাউজার • অবস্থান: ঢাকা, বাংলাদেশ (আইপি ভেরিফাইড)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
