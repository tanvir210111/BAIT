import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import LoginForm from '../../components/auth/LoginForm';

export default function SignIn() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('ই-মেইল বা মোবাইল নম্বর এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await authService.login(credentials);
      if (data?.token) {
        navigate('/student/dashboard');
      } else {
        setError(data?.error || 'ভুল তথ্য প্রদান করা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error(err);
      setError(err?.data?.error || 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-clean-card">
      {/* Brand Header */}
      <div className="auth-card-header">
        <Link to="/" className="auth-logo-center" title="BAIT হোমপেজে ফিরে যান">
          <div className="auth-logo-badge">
            BAIT
          </div>
          <span className="auth-brand-name">Banglar Alo IT</span>
          <span className="auth-brand-tagline">IT Training & Technology Academy</span>
        </Link>

        <h1 className="auth-title-text">সাইন ইন করুন</h1>
        <p className="auth-subtitle-text">আপনার BAIT অ্যাকাউন্টে প্রবেশ করুন</p>
      </div>

      {/* Login Form */}
      <LoginForm 
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
}
