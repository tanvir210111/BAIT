import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import RegisterForm from '../../components/auth/RegisterForm';

export default function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setError(null);
    setLoading(true);

    try {
      const data = await authService.register(formData);
      if (data?.token) {
        navigate('/student/dashboard');
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
    <div className="auth-clean-card card-wide">
      {/* Brand Header */}
      <div className="auth-card-header">
        <Link to="/" className="auth-logo-center" title="BAIT হোমপেজে ফিরে যান">
          <div className="auth-logo-badge">
            BAIT
          </div>
          <span className="auth-brand-name">Banglar Alo IT</span>
          <span className="auth-brand-tagline">IT Training & Technology Academy</span>
        </Link>

        <h1 className="auth-title-text">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="auth-subtitle-text">BAIT-এর সাথে আপনার শেখার যাত্রা শুরু করুন</p>
      </div>

      {/* Registration Form */}
      <RegisterForm 
        onSubmit={handleRegister}
        loading={loading}
        error={error}
      />
    </div>
  );
}
