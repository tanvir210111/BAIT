import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';
import { authService } from '../../services/authService';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthVisual3D from '../../components/auth/AuthVisual3D';

export default function SignUp({ userType: propUserType }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine userType from props or current route
  const isClientRoute = location.pathname.includes('/client');
  const userType = propUserType || (isClientRoute ? 'client' : 'student');
  const isStudent = userType === 'student';

  const handleRegister = async (formData) => {
    setError(null);
    setLoading(true);

    try {
      const data = await authService.register(formData);
      if (data?.token && data?.user) {
        // Save auth data
        localStorage.setItem('bait_admin_token', data.token);
        localStorage.setItem('bait_admin_user', JSON.stringify(data.user));

        // Role-based redirection
        if (data.user.role === 'student' || data.user.category === 'student' || userType === 'student') {
          navigate('/student/dashboard');
        } else {
          navigate('/client/dashboard');
        }
      } else {
        setError(data?.error || 'নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error(err);
      setError(err?.data?.error || 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-wrapper signup-split">
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
            {isStudent ? 'শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন' : 'ক্লায়েন্ট অ্যাকাউন্ট তৈরি করুন'}
          </h1>
          <p className="auth-subtitle-text">
            {isStudent 
              ? 'BAIT-এর সাথে নতুন দক্ষতা শেখা ও নিজের ভবিষ্যৎ গড়ে তোলার যাত্রা শুরু করুন।' 
              : 'BAIT-এর সেবাগুলো সম্পর্কে জানুন এবং আপনার প্রয়োজন অনুযায়ী আমাদের সাথে যুক্ত হন।'}
          </p>
        </div>

        {/* Registration Form with inputs & role switcher */}
        <RegisterForm 
          onSubmit={handleRegister}
          loading={loading}
          error={error}
          userType={userType}
        />
      </div>

      {/* RIGHT SIDE — Photorealistic 3D Animated Visual Stage */}
      <div className="auth-visual-column">
        <AuthVisual3D userType={userType} isSignup={true} />
      </div>
    </div>
  );
}
