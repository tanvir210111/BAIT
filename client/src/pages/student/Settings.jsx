import React, { useState } from 'react';
import { Lock, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';
import PasswordInput from '../../components/auth/PasswordInput';

export default function Settings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  const [notificationSettings, setNotificationSettings] = useState({
    classReminders: true,
    assignmentAlerts: true,
    examNotices: true,
    smsAlerts: false
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('পাসওয়ার্ড দুটি মেলেনি।');
      return;
    }

    setSuccessMsg('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">সেটিংস ও নিরাপত্তা (Account Settings)</h1>
          <p className="student-page-subtitle">
            আপনার পাসওয়ার্ড পরিবর্তন এবং নোটিফিকেশন অগ্রাধিকার নির্ধারণ।
          </p>
        </div>
      </div>

      {successMsg && (
        <div style={{ padding: '12px 16px', background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Password Change Box */}
        <div className="student-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Lock size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
              পাসওয়ার্ড পরিবর্তন করুন
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label className="form-label">বর্তমান পাসওয়ার্ড</label>
              <PasswordInput 
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)</label>
              <PasswordInput 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
              <PasswordInput 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', height: '44px', fontWeight: 700, marginTop: '8px' }}
            >
              পাসওয়ার্ড আপডেট করুন
            </button>
          </form>
        </div>

        {/* Notifications & Security Preferences */}
        <div className="student-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Bell size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
              নোটিফিকেশন প্রেফারেন্স
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--primary-dark)' }}>লাইভ ক্লাস রিমাইন্ডার</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ক্লাস শুরুর ১৫ মিনিট আগে ইমেইল ও নোটিফিকেশন পান</div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.classReminders}
                onChange={e => setNotificationSettings({ ...notificationSettings, classReminders: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--primary-dark)' }}>অ্যাসাইনমেন্ট গ্রেডিং অ্যালার্ট</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>প্রশিক্ষক নম্বর প্রদান করলে তাৎক্ষণিক নোটিফিকেশন</div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.assignmentAlerts}
                onChange={e => setNotificationSettings({ ...notificationSettings, assignmentAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div>
                <strong style={{ fontSize: '0.92rem', color: 'var(--primary-dark)' }}>জরুরি এসএমএস অ্যালার্ট</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>মোবাইল এসএমএস এর মাধ্যমে জরুরি নোটিশ গ্রহণ করুন</div>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.smsAlerts}
                onChange={e => setNotificationSettings({ ...notificationSettings, smsAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '28px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
              <Shield size={16} color="var(--primary)" />
              <span>ডিভাইস ও সেশন তথ্য</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              বর্তমান সেশন: ব্রাউজার সক্রিয় (Windows Desktop Client)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
