import React, { useState } from 'react';
import { Save, CheckCircle2, Building2, Mail, Phone, Lock, User } from 'lucide-react';

export default function ClientSettings() {
  const [formData, setFormData] = useState({
    name: 'মোহাম্মদ তানজিম হাসান',
    company: 'প্রাইম টেক লজিস্টিকস লিমিটেড',
    email: 'client@primetech.com.bd',
    phone: '০১৭১২-৩৪৫৬৭৮',
    address: 'বাড়ি ১২, রোড ০৭, ধানমন্ডি, ঢাকা'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="client-page">
      <div style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--client-text)', margin: '0 0 6px 0' }}>
          ক্লায়েন্ট প্রোফাইল ও সেটিংস
        </h1>
        <p style={{ color: 'var(--client-text-muted)', margin: '0 0 1.5rem 0', fontSize: '0.92rem' }}>
          আপনার প্রতিষ্ঠানের বিবরণ, যোগাযোগ কর্মকর্তা এবং সিকিউরিটি সেটিংস আপডেট করুন।
        </p>

        {saved && (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 16px', borderRadius: '10px', color: '#065f46', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="#10b981" />
            <span>প্রোফাইল তথ্য সফলভাবে সেভ করা হয়েছে!</span>
          </div>
        )}

        <div className="client-card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                যোগাযোগ কর্মকর্তার নাম
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                প্রতিষ্ঠানের নাম
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  অফিসিয়াল ইমেইল
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  ফোন নম্বর
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                অফিসের ঠিকানা
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--client-primary)',
                color: '#fff',
                border: 'none',
                padding: '11px 22px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'flex-start',
                marginTop: '8px'
              }}
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
