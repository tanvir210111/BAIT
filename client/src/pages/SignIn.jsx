import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, AlertCircle, Shield, GraduationCap, BookOpen } from 'lucide-react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('ইউজারনেম / ই-মেইল এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('bait_admin_token', data.token);
        localStorage.setItem('bait_admin_user', JSON.stringify(data.user));

        if (data.user.category === 'admin' || data.user.role === 'superadmin') {
          navigate('/admin');
        } else {
          navigate('/my-profile');
        }
      } else {
        setError(data.error || 'ভুল তথ্য প্রদান করা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error(err);
      setError('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f8fafc' }}>
      <div style={{ width: '100%', maxWidth: '460px', background: '#fff', border: '1px solid var(--border)', borderRadius: '14px', padding: '36px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="logo-badge" style={{ margin: '0 auto 14px auto', width: '54px', height: '54px', fontSize: '1.3rem' }}>
            BAIT
          </div>
          <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
            প্রোফাইল সাইন ইন
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            আপনার BAIT প্রোফাইল, কোর্স ও ড্যাশবোর্ডে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '12px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">ইউজারনেম / ই-মেইল ঠিকানা</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                className="form-control"
                placeholder="যেমন: admin অথবা rahim.ahmed@bait.org.bd"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                style={{ paddingLeft: '38px' }}
              />
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">পাসওয়ার্ড</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '38px' }}
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          {/* Quick Demo Access Helpers */}
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '22px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
              সহজে টেস্ট করার ডেমো অ্যাকাউন্টসমূহ (ক্লিক করুন):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                type="button" 
                onClick={() => handleQuickFill('admin', 'bait@2026')}
                style={{ textAlign: 'left', background: '#fff', border: '1px solid var(--border)', padding: '6px 10px', borderRadius: '4px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Shield size={14} color="var(--primary)" />
                <strong>প্রধান প্রশাসক (Admin)</strong> - <code>admin</code>
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickFill('rahim.ahmed@bait.org.bd', 'bait@2026')}
                style={{ textAlign: 'left', background: '#fff', border: '1px solid var(--border)', padding: '6px 10px', borderRadius: '4px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <BookOpen size={14} color="var(--accent)" />
                <strong>প্রশিক্ষক প্রোফাইল</strong> - <code>মোঃ আব্দুর রহিম</code>
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickFill('tanvir.kapasia@gmail.com', 'bait@2026')}
                style={{ textAlign: 'left', background: '#fff', border: '1px solid var(--border)', padding: '6px 10px', borderRadius: '4px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <GraduationCap size={14} color="var(--accent-emerald)" />
                <strong>শিক্ষার্থী প্রোফাইল</strong> - <code>তানভীর হোসেন</code>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', height: '46px' }}
          >
            <span>{loading ? 'যাচাই করা হচ্ছে...' : 'সাইন ইন করুন'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}>
            ← হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
