import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  ArrowRight, 
  Loader2, 
  Mail, 
  Lock, 
  GraduationCap, 
  Briefcase,
  Globe,
  ChevronDown
} from 'lucide-react';
import PasswordInput from './PasswordInput';

export default function LoginForm({ 
  onSubmit, 
  loading, 
  error,
  userType = 'student'
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});

  const isStudent = userType === 'student';

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'ই-মেইল বা ফোন নম্বর প্রদান করুন';
    }
    if (!password.trim()) {
      errors.password = 'পাসওয়ার্ড প্রদান করুন';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit({ username, password, rememberMe, userType });
    }
  };

  const signupRoute = isStudent ? '/student/signup' : '/client/signup';
  const alternateRoleRoute = isStudent ? '/client/login' : '/student/login';
  const alternateRoleText = isStudent ? 'ক্লায়েন্ট হিসেবে লগইন করতে চান?' : 'শিক্ষার্থী হিসেবে লগইন করতে চান?';
  const signupActionText = isStudent 
    ? 'শিক্ষার্থী হিসেবে নিবন্ধন করুন' 
    : 'ক্লায়েন্ট হিসেবে নিবন্ধন করুন';

  return (
    <form onSubmit={handleSubmit} className="auth-form-root" noValidate>

      {/* API / Server Error Alert */}
      {error && (
        <div className="auth-alert-box" role="alert" aria-live="assertive">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Email or Phone */}
      <div className="auth-input-group">
        <div className="auth-input-wrapper has-leading-icon">
          <Mail size={17} className="auth-leading-icon" />
          <input 
            id="username"
            name="username"
            type="text"
            className={`auth-input-field ${fieldErrors.username ? 'has-error' : ''}`}
            placeholder="ইমেইল বা ফোন নম্বর"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              if (fieldErrors.username) setFieldErrors(prev => ({ ...prev, username: null }));
            }}
            required
            autoComplete="username"
            aria-label="ইমেইল বা ফোন নম্বর"
            aria-invalid={!!fieldErrors.username}
            aria-describedby={fieldErrors.username ? 'username-error' : undefined}
          />
        </div>
        {fieldErrors.username && (
          <div id="username-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.username}</span>
          </div>
        )}
      </div>

      {/* 2. Password */}
      <div className="auth-input-group">
        <PasswordInput 
          id="password"
          name="password"
          icon={Lock}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: null }));
          }}
          hasError={!!fieldErrors.password}
          placeholder="পাসওয়ার্ড"
          aria-describedby={fieldErrors.password ? 'password-error' : undefined}
          required
        />
        {fieldErrors.password && (
          <div id="password-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.password}</span>
          </div>
        )}
      </div>

      {/* Remember me & Forgot password */}
      <div className="auth-actions-row">
        <label className="auth-remember-checkbox">
          <input 
            type="checkbox" 
            checked={rememberMe} 
            onChange={e => setRememberMe(e.target.checked)} 
          />
          <span>আমাকে মনে রাখুন</span>
        </label>
        <a 
          href="#forgot-password" 
          className="auth-forgot-link"
          onClick={(e) => {
            e.preventDefault();
            alert('পাসওয়ার্ড রিকভারির জন্য অনুগ্রহ করে একাডেমি সাপোর্ট অথবা হেল্পডেস্কে (01711006214) যোগাযোগ করুন।');
          }}
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </a>
      </div>

      {/* Primary Submit Button: লগইন করুন → */}
      <button 
        type="submit" 
        className="auth-float-btn auth-pill-primary-btn"
        disabled={loading}
      >
        <span className="auth-btn-inner">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>যাচাই করা হচ্ছে...</span>
            </>
          ) : (
            <>
              <span>লগইন করুন</span>
              <ArrowRight size={17} className="auth-btn-arrow" />
            </>
          )}
        </span>
      </button>

      {/* Divider: অথবা */}
      <div className="auth-card-divider">
        <span>অথবা</span>
      </div>

      {/* Social Login Buttons: Google & Facebook */}
      <div className="auth-social-buttons-grid">
        <button 
          type="button" 
          className="auth-social-btn google-btn"
          onClick={() => alert('Google ওয়ান-ট্যাপ লগইন শিঘ্রই যুক্ত হবে।')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Google</span>
        </button>

        <button 
          type="button" 
          className="auth-social-btn facebook-btn"
          onClick={() => alert('Facebook সোশ্যাল লগইন শিঘ্রই যুক্ত হবে।')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>
      </div>

      {/* Switch to Signup Link */}
      <div className="auth-bottom-switch">
        <span className="auth-switch-prompt">অ্যাকাউন্ট নেই?</span>
        <Link to={signupRoute} className="auth-bottom-switch-link auth-switch-action-highlight">
          {signupActionText}
        </Link>
      </div>

      {/* Bottom Role Banner Card */}
      <div className="auth-role-banner-wrap">
        <Link to={alternateRoleRoute} className="auth-role-card-banner">
          <div className="role-banner-avatar">
            {isStudent ? <Briefcase size={16} /> : <GraduationCap size={16} />}
          </div>
          <span className="role-banner-text">{alternateRoleText}</span>
          <ArrowRight size={15} className="role-banner-arrow" />
        </Link>
      </div>
    </form>
  );
}
