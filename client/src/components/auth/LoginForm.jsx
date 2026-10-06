import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import PasswordInput from './PasswordInput';

export default function LoginForm({ onSubmit, loading, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = 'ই-মেইল বা মোবাইল নম্বর প্রদান করুন';
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
      onSubmit({ username, password, rememberMe });
    }
  };

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
        <label className="auth-input-label" htmlFor="username">
          <span>ই-মেইল বা মোবাইল নম্বর</span>
        </label>
        <div className="auth-input-wrapper">
          <input 
            id="username"
            name="username"
            type="text"
            className={`auth-input-field ${fieldErrors.username ? 'has-error' : ''}`}
            placeholder="ই-মেইল বা মোবাইল নম্বর লিখুন"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              if (fieldErrors.username) setFieldErrors(prev => ({ ...prev, username: null }));
            }}
            required
            autoComplete="username"
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
        <div className="auth-input-label">
          <label htmlFor="password">পাসওয়ার্ড</label>
        </div>
        <PasswordInput 
          id="password"
          name="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: null }));
          }}
          hasError={!!fieldErrors.password}
          placeholder="আপনার পাসওয়ার্ড লিখুন"
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
            alert('পাসওয়ার্ড রিকভারির জন্য অনুগ্রহ করে একাডেমি সাপোর্ট অথবা হেল্পডেস্কে যোগাযোগ করুন।');
          }}
        >
          পাসওয়ার্ড ভুলে গেছেন?
        </a>
      </div>

      {/* Primary Submit Button: সাইন ইন → */}
      <button 
        type="submit" 
        className="auth-float-btn"
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
              <span>সাইন ইন</span>
              <ArrowRight size={17} className="auth-btn-arrow" />
            </>
          )}
        </span>
      </button>

      {/* Divider */}
      <div className="auth-card-divider">
        <span>অথবা</span>
      </div>

      {/* Registration Navigation */}
      <div className="auth-bottom-switch">
        <span>BAIT-এ নতুন?</span>
        <Link to="/signup" className="auth-bottom-switch-link">
          অ্যাকাউন্ট তৈরি করুন
        </Link>
      </div>
    </form>
  );
}
