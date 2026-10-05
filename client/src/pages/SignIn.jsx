import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, AlertCircle, GraduationCap, UserPlus } from 'lucide-react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('ই-মেইল / মোবাইল নম্বর এবং পাসওয়ার্ড প্রদান করুন।');
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
        navigate('/my-profile');
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
      <div style={{ width: '100%', maxWidth: '460px', background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="logo-badge" style={{ margin: '0 auto 14px auto', width: '52px', height: '52px', fontSize: '1.25rem' }}>
            BAIT
          </div>
          <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
            শিক্ষার্থী লগইন
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            আপনার শিক্ষার্থী প্রোফাইল ও কোর্সের তথ্যে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '12px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">ই-মেইল অথবা মোবাইল নম্বর</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                className="form-control"
                placeholder="যেমন: tanvir.kapasia@gmail.com বা ০১৭১..."
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
              টেস্ট ডেমো শিক্ষার্থী লগইন (ক্লিক করুন):
            </div>
            <button 
              type="button" 
              onClick={() => handleQuickFill('tanvir.kapasia@gmail.com', 'bait@2026')}
              style={{ width: '100%', textAlign: 'left', background: '#fff', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <GraduationCap size={16} color="var(--primary)" />
              <div>
                <strong>শিক্ষার্থী:</strong> তানভীর হোসেন (<code>tanvir.kapasia@gmail.com</code>)
              </div>
            </button>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', height: '46px', fontSize: '1rem', fontWeight: 600 }}
          >
            <span>{loading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Link to Student Registration Panel */}
        <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)', background: 'rgba(0, 106, 78, 0.04)', borderRadius: '12px', padding: '18px 16px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '10px' }}>
            আপনার কি শিক্ষার্থী অ্যাকাউন্ট নেই?
          </div>
          <Link 
            to="/signup" 
            style={{ 
              color: '#ffffff', 
              background: 'var(--accent-red)', 
              fontWeight: 700, 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              boxShadow: '0 3px 12px rgba(244, 42, 65, 0.35)',
              transition: 'var(--transition)'
            }}
          >
            <UserPlus size={17} />
            <span>নতুন শিক্ষার্থী নিবন্ধন করুন</span>
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            ← হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
