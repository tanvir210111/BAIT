import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('bait@2026');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('bait_admin_token', data.token);
        localStorage.setItem('bait_admin_user', JSON.stringify(data.admin));
        if (onLoginSuccess) onLoginSuccess(data.admin);
        navigate('/admin');
      } else {
        setError(data.error || 'লগইন ব্যর্থ হয়েছে। সঠিক তথ্য প্রদান করুন।');
      }
    } catch (err) {
      console.error(err);
      setError('সার্ভার এর সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '440px', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '36px', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="logo-badge" style={{ margin: '0 auto 14px auto', width: '56px', height: '56px', fontSize: '1.4rem' }}>
            BAIT
          </div>
          <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>অ্যাডমিন লগইন</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>BAIT কেন্দ্রীয় নিয়ন্ত্রণ প্যানেল</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '6px', marginBottom: '18px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">ব্যবহারকারী নাম (Username)</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                required
                style={{ paddingLeft: '38px' }}
              />
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">পাসওয়ার্ড (Password)</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ paddingLeft: '38px' }}
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#64748b', marginBottom: '20px', border: '1px dashed var(--border)' }}>
            <strong>ডেমো অ্যাডমিন তথ্য:</strong><br />
            ইউজারনেম: <code>admin</code><br />
            পাসওয়ার্ড: <code>bait@2026</code>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', height: '46px' }}
          >
            <span>{loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}>
            ← ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
