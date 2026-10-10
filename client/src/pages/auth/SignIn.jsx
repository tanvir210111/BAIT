import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';
import { authService } from '../../services/authService';
import LoginForm from '../../components/auth/LoginForm';
import AuthVisual3D from '../../components/auth/AuthVisual3D';

export default function SignIn({ userType: propUserType }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine userType from props or current route
  const isClientRoute = location.pathname.includes('/client');
  const userType = propUserType || (isClientRoute ? 'client' : 'student');
  const isStudent = userType === 'student';

  const handleLogin = async (credentials) => {
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('ই-মেইল বা মোবাইল নম্বর এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await authService.login(credentials);
      if (data?.token && data?.user) {
        // Save auth data
        localStorage.setItem('bait_admin_token', data.token);
        localStorage.setItem('bait_admin_user', JSON.stringify(data.user));

        // Role-based redirection
        if (data.user.role === 'student' || data.user.category === 'student' || userType === 'student') {
          navigate('/student/dashboard');
        } else if (data.user.role === 'client' || data.user.category === 'client' || userType === 'client') {
          navigate('/client/dashboard');
        } else if (data.user.role === 'admin' || data.user.category === 'admin' || data.user.role === 'superadmin') {
          navigate('/my-profile');
        } else {
          navigate('/client/dashboard');
        }
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
    <div className="auth-split-wrapper">
      {/* LEFT SIDE — Floating White Authentication Form Card */}
      <div className="auth-form-column">
        {/* Top bar with BAIT Brand + Language Selector */}
        <div className="auth-card-top-bar">
          <Link to="/" className="auth-brand-row" title="BAIT হোমপেজে ফিরে যান">
            <div className="auth-logo-badge">BAIT</div>
            <span className="auth-brand-title">বাংলার আলো আইটি</span>
          </Link>
          <div className="auth-lang-selector" title="ভাষা নির্বাচন">
            <Globe size={14} />
            <span>বাংলা</span>
            <ChevronDown size={12} />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="auth-card-titles">
          <h1 className="auth-title-text">
            {isStudent ? 'শিক্ষার্থী লগইন' : 'ক্লায়েন্ট লগইন'}
          </h1>
          <p className="auth-subtitle-text">
            {isStudent 
              ? 'আপনার শেখার যাত্রা চালিয়ে যেতে অ্যাকাউন্ট লগইন করুন।' 
              : 'আপনার অ্যাকাউন্টে প্রবেশ করে BAIT-এর সেবা ও প্রজেক্টের সাথে যুক্ত থাকুন।'}
          </p>
        </div>

        {/* Login Form with inputs & role switcher */}
        <LoginForm 
          onSubmit={handleLogin}
          loading={loading}
          error={error}
          userType={userType}
        />
      </div>

      {/* RIGHT SIDE — Photorealistic 3D Animated Visual Stage */}
      <div className="auth-visual-column">
        <AuthVisual3D userType={userType} isSignup={false} />
      </div>
    </div>
  );
}
