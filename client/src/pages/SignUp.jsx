import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, Lock, GraduationCap, 
  MapPin, ArrowRight, AlertCircle, CheckCircle2, BookOpen 
} from 'lucide-react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name_bn: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    course_name: '',
    education: '',
    division_id: '',
    district_id: '',
    upazila_id: '',
    bio: ''
  });

  const [courses, setCourses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load dropdown data for courses & administrative hierarchy
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCourses(data);
      })
      .catch(err => console.error(err));

    fetch('/api/dropdown-data')
      .then(res => res.json())
      .then(data => {
        if (data.divisions) setDivisions(data.divisions);
        if (data.districts) setDistricts(data.districts);
        if (data.upazilas) setUpazilas(data.upazilas);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter cascading districts and upazilas
  const availableDistricts = districts.filter(d => 
    !formData.division_id || d.division_id === parseInt(formData.division_id)
  );

  const availableUpazilas = upazilas.filter(u => 
    !formData.district_id || u.district_id === parseInt(formData.district_id)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name_bn.trim()) {
      setError('অনুগ্রহ করে আপনার পূর্ণ নাম বাংলায় লিখুন।');
      return;
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      setError('মোবাইল নম্বর অথবা ই-মেইল ঠিকানা প্রদান করা আবশ্যক।');
      return;
    }

    if (formData.password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('পাসওয়ার্ড দুটি মেলেনি। অনুগ্রহ করে যাচাই করে পুনরায় লিখুন।');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('bait_admin_token', data.token);
        localStorage.setItem('bait_admin_user', JSON.stringify(data.user));
        navigate('/my-profile');
      } else {
        setError(data.error || 'নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error(err);
      setError('সার্ভারে সমস্যা দেখা দিয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '85vh', background: '#f8fafc', padding: '50px 20px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="logo-badge" style={{ margin: '0 auto 12px auto', width: '50px', height: '50px', fontSize: '1.2rem' }}>
            BAIT
          </div>
          <h1 style={{ fontSize: '1.7rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            শিক্ষার্থী নিবন্ধন (Student Registration)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            বাংলার আলো আইটি (BAIT)-এর প্রশিক্ষণার্থী হিসেবে আপনার অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Information */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="var(--primary)" />
              <span>১. ব্যক্তিগত তথ্য</span>
            </h3>

            <div className="form-group">
              <label className="form-label">পূর্ণ নাম (বাংলায়) *</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="যেমন: তানভীর হাসান"
                value={formData.name_bn}
                onChange={e => setFormData({ ...formData, name_bn: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">মোবাইল নম্বর *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="tel" 
                    className="form-control"
                    placeholder="০১৭xxxxxxxx"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Phone size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ই-মেইল ঠিকানা</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    className="form-control"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ paddingLeft: '38px' }}
                  />
                  <Mail size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Course & Academic Info */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--primary)" />
              <span>২. কোর্স ও শিক্ষাগত যোগ্যতা</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">কাঙ্ক্ষিত কোর্স নির্বাচন করুন</label>
                <select 
                  className="form-control"
                  value={formData.course_name}
                  onChange={e => setFormData({ ...formData, course_name: e.target.value })}
                >
                  <option value="">-- কোর্স নির্বাচন করুন --</option>
                  {courses.length > 0 ? (
                    courses.map(c => (
                      <option key={c.id} value={c.title_bn}>{c.title_bn}</option>
                    ))
                  ) : (
                    <>
                      <option value="আইসিটি ও কম্পিউটার ফান্ডামেন্টালস">আইসিটি ও কম্পিউটার ফান্ডামেন্টালস</option>
                      <option value="ওয়েব ডিজাইন ও ডেভেলপমেন্ট">ওয়েব ডিজাইন ও ডেভেলপমেন্ট</option>
                      <option value="ডিজিটাল মার্কেটিং ও ফ্রিল্যান্সিং">ডিজিটাল মার্কেটিং ও ফ্রিল্যান্সিং</option>
                      <option value="সাংবাদিকতা ও তৃণমূল প্রতিবেদন">সাংবাদিকতা ও তৃণমূল প্রতিবেদন</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">সর্বশেষ শিক্ষাগত যোগ্যতা</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="যেমন: এইচএসসি / ডিগ্রি / স্নাতক"
                  value={formData.education}
                  onChange={e => setFormData({ ...formData, education: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Administrative Location */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="var(--primary)" />
              <span>৩. আপনার এলাকা (বিভাগ, জেলা ও উপজেলা)</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">বিভাগ</label>
                <select 
                  className="form-control"
                  value={formData.division_id}
                  onChange={e => {
                    setFormData({ 
                      ...formData, 
                      division_id: e.target.value,
                      district_id: '',
                      upazila_id: ''
                    });
                  }}
                >
                  <option value="">-- বিভাগ --</option>
                  {divisions.map(d => (
                    <option key={d.id} value={d.id}>{d.name_bn}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">জেলা</label>
                <select 
                  className="form-control"
                  value={formData.district_id}
                  onChange={e => {
                    setFormData({ 
                      ...formData, 
                      district_id: e.target.value,
                      upazila_id: ''
                    });
                  }}
                  disabled={!formData.division_id}
                >
                  <option value="">-- জেলা --</option>
                  {availableDistricts.map(d => (
                    <option key={d.id} value={d.id}>{d.name_bn}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">উপজেলা</label>
                <select 
                  className="form-control"
                  value={formData.upazila_id}
                  onChange={e => setFormData({ ...formData, upazila_id: e.target.value })}
                  disabled={!formData.district_id}
                >
                  <option value="">-- উপজেলা --</option>
                  {availableUpazilas.map(u => (
                    <option key={u.id} value={u.id}>{u.name_bn}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Security Password */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} color="var(--primary)" />
              <span>৪. পাসওয়ার্ড নির্ধারণ করুন</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Lock size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">কনফার্ম পাসওয়ার্ড *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.confirm_password}
                    onChange={e => setFormData({ ...formData, confirm_password: e.target.value })}
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <CheckCircle2 size={17} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', height: '48px', fontSize: '1.05rem', fontWeight: 600 }}
          >
            <span>{loading ? 'নিবন্ধন সম্পন্ন হচ্ছে...' : 'নিবন্ধন সম্পন্ন করুন'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Existing account sign in link */}
        <div style={{ textAlign: 'center', marginTop: '26px', paddingTop: '20px', borderTop: '1px solid var(--border)', fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>ইতিমধ্যে শিক্ষার্থী অ্যাকাউন্ট আছে? </span>
          <Link to="/signin" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
            সাইন ইন করুন →
          </Link>
        </div>

      </div>
    </div>
  );
}
