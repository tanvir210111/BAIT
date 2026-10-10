import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, BookOpen, Save, CheckCircle2, ShieldCheck, Camera } from 'lucide-react';
import { authService } from '../../services/authService';

export default function StudentProfile() {
  const user = authService.getUser();
  const [savedMsg, setSavedMsg] = useState(false);

  const [formData, setFormData] = useState({
    nameBangla: 'তানভীর হোসেন',
    studentId: 'BAIT-2024-ST001',
    email: 'tanvir.kapasia@gmail.com',
    phone: '০১৭১১-০০৬২১৪',
    semester: 'সেমিস্টার ৩',
    department: 'সফটওয়্যার ইঞ্জিনিয়ারিং ও ইন্টারেক্টিভ মিডিয়া',
    bloodGroup: 'বি পজিটিভ (B+)',
    address: 'কাপাসিয়া, গাজীপুর, ঢাকা',
    bio: 'সফটওয়্যার ইঞ্জিনিয়ারিংয়ের প্রতিশ্রুতিশীল শিক্ষার্থী। আধুনিক ফুল-স্ট্যাক ওয়েব প্রযুক্তি, ইউআই/ইউএক্স আর্কিটেকচার এবং ব্যবহারবান্ধব ডিজিটাল পণ্য তৈরিতে আগ্রহী।'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <User size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">আমার প্রোফাইল ও ব্যক্তিগত তথ্য (Profile)</h1>
          </div>
          <p className="utopia-page-subtitle">
            বিএআইটি একাডেমির ভেরিফাইড শিক্ষার্থী অ্যাকাউন্ট, যোগাযোগের ঠিকানা ও অ্যাকাডেমিক বিবরণী।
          </p>
        </div>
      </div>

      {savedMsg && (
        <div className="utopia-alert-banner success">
          <CheckCircle2 size={18} />
          <span>প্রোফাইল পরিবর্তন সফলভাবে সংরক্ষণ করা হয়েছে!</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Column: Avatar & Meta Card */}
        <div className="utopia-card" style={{ textAlign: 'center', padding: '1.75rem' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 1rem auto' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="তানভীর হোসেন"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0d1b2a' }}
            />
            <button
              type="button"
              className="utopia-btn-sm"
              style={{ position: 'absolute', bottom: 0, right: 0, borderRadius: '50%', padding: '6px', width: '30px', height: '30px', justifyContent: 'center' }}
              title="ছবি পরিবর্তন করুন"
            >
              <Camera size={14} />
            </button>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
            {formData.nameBangla}
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
            আইডি: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>{formData.studentId}</code>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '0.76rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            <ShieldCheck size={14} /> ভেরিফাইড শিক্ষার্থী
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={15} color="#0284c7" />
              <span>{formData.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={15} color="#0284c7" />
              <span>{formData.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={15} color="#0284c7" />
              <span>{formData.address}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="utopia-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            অ্যাকাডেমিক ও ব্যক্তিগত বিবরণ
          </h3>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  শিক্ষার্থীর পূর্ণ নাম *
                </label>
                <input 
                  type="text"
                  required
                  value={formData.nameBangla}
                  onChange={(e) => setFormData({ ...formData, nameBangla: e.target.value })}
                  className="utopia-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  শিক্ষার্থী আইডি নম্বর
                </label>
                <input 
                  type="text"
                  disabled
                  value={formData.studentId}
                  className="utopia-input"
                  style={{ background: '#f8fafc', color: '#64748b' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  ইমেইল ঠিকানা *
                </label>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="utopia-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  মোবাইল নম্বর *
                </label>
                <input 
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="utopia-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  রক্তের গ্রুপ (Blood Group)
                </label>
                <input 
                  type="text"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="utopia-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  ঠিকানা
                </label>
                <input 
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="utopia-input"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                সংক্ষিপ্ত পরিচিতি ও বায়ো
              </label>
              <textarea 
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="utopia-input"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                type="submit" 
                className="utopia-btn-primary"
              >
                <Save size={16} />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
