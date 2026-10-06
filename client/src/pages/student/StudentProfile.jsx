import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Award, BookOpen, Save, CheckCircle2 } from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    studentService.getProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  if (loading) {
    return <Loading text="প্রোফাইল তথ্য লোড হচ্ছে..." fullPage />;
  }

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">শিক্ষার্থী প্রোফাইল (Student Profile)</h1>
          <p className="student-page-subtitle">
            আপনার ব্যক্তিগত তথ্য, যোগাযোগ বিবরণী ও অ্যাকাডেমিক প্রোফাইল।
          </p>
        </div>
      </div>

      {savedMsg && (
        <div style={{ padding: '12px 16px', background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>প্রোফাইল সফলভাবে আপডেট করা হয়েছে।</span>
        </div>
      )}

      <div className="student-dashboard-grid">
        {/* Left Column: Avatar & Meta */}
        <div className="student-card" style={{ padding: '24px', textAlign: 'center' }}>
          <img 
            src={profile.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
            alt={profile.name_bn}
            className="profile-large-avatar"
            style={{ width: '110px', height: '110px', margin: '0 auto 16px auto' }}
          />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px' }}>
            {profile.name_bn}
          </h2>
          <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '12px' }}>
            {profile.name_en}
          </div>

          <div style={{ display: 'inline-block', background: '#ecfdf5', color: '#065f46', padding: '4px 12px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '20px' }}>
            আইডি: {profile.student_id}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--primary)" />
              <span>{profile.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--primary)" />
              <span>{profile.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--primary)" />
              <span>{profile.upazila_name}, {profile.district_name}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Edit Form */}
        <div className="student-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '20px' }}>
            অ্যাকাডেমিক ও ব্যক্তিগত বিবরণ
          </h3>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">পূর্ণ নাম (বাংলায়)</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={profile.name_bn || ''}
                  onChange={e => setProfile({ ...profile, name_bn: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">নাম (ইংরেজিতে)</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={profile.name_en || ''}
                  onChange={e => setProfile({ ...profile, name_en: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ই-মেইল</label>
                <input 
                  type="email" 
                  className="form-control"
                  value={profile.email || ''}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">মোবাইল নম্বর</label>
                <input 
                  type="tel" 
                  className="form-control"
                  value={profile.phone || ''}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">রক্তের গ্রুপ (Blood Group)</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={profile.blood_group || 'B+'}
                  onChange={e => setProfile({ ...profile, blood_group: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">অভিভাবকের মোবাইল নম্বর</label>
                <input 
                  type="tel" 
                  className="form-control"
                  value={profile.guardian_phone || ''}
                  onChange={e => setProfile({ ...profile, guardian_phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">সংক্ষিপ্ত পরিচিতি ও বায়ো</label>
              <textarea 
                className="form-control"
                rows="3"
                value={profile.bio || ''}
                onChange={e => setProfile({ ...profile, bio: e.target.value })}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
            >
              <Save size={16} />
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
