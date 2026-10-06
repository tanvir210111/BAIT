import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import PasswordInput from './PasswordInput';

export default function RegisterForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    name_bn: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    agreeTerms: true
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name_bn.trim()) {
      errors.name_bn = 'পূর্ণ নাম প্রদান করুন';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.phone = 'মোবাইল নম্বর অথবা ই-মেইল প্রদান করা আবশ্যক';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'সঠিক ই-মেইল ঠিকানা প্রদান করুন';
    }
    if (!formData.password) {
      errors.password = 'পাসওয়ার্ড প্রদান করুন';
    } else if (formData.password.length < 6) {
      errors.password = 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে';
    }
    if (!formData.confirm_password) {
      errors.confirm_password = 'পাসওয়ার্ড পুনরায় লিখুন';
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = 'পাসওয়ার্ড দুটি মেলেনি';
    }
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'শর্তাবলী গ্রহণ করা আবশ্যক';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-root" noValidate>
      {/* Global API / Server Error */}
      {error && (
        <div className="auth-alert-box" role="alert" aria-live="assertive">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Full Name */}
      <div className="auth-input-group">
        <label className="auth-input-label" htmlFor="name_bn">
          <span>পূর্ণ নাম</span>
        </label>
        <div className="auth-input-wrapper">
          <input 
            type="text"
            id="name_bn"
            name="name_bn"
            className={`auth-input-field ${fieldErrors.name_bn ? 'has-error' : ''}`}
            placeholder="আপনার পূর্ণ নাম লিখুন"
            value={formData.name_bn}
            onChange={handleChange}
            required
            autoComplete="name"
            aria-invalid={!!fieldErrors.name_bn}
            aria-describedby={fieldErrors.name_bn ? 'name-error' : undefined}
          />
        </div>
        {fieldErrors.name_bn && (
          <div id="name-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.name_bn}</span>
          </div>
        )}
      </div>

      {/* 2. Email */}
      <div className="auth-input-group">
        <label className="auth-input-label" htmlFor="email">
          <span>ই-মেইল</span>
        </label>
        <div className="auth-input-wrapper">
          <input 
            type="email"
            id="email"
            name="email"
            className={`auth-input-field ${fieldErrors.email ? 'has-error' : ''}`}
            placeholder="student@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
        </div>
        {fieldErrors.email && (
          <div id="email-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.email}</span>
          </div>
        )}
      </div>

      {/* 3. Phone */}
      <div className="auth-input-group">
        <label className="auth-input-label" htmlFor="phone">
          <span>মোবাইল নম্বর</span>
        </label>
        <div className="auth-input-wrapper">
          <input 
            type="tel"
            id="phone"
            name="phone"
            className={`auth-input-field ${fieldErrors.phone ? 'has-error' : ''}`}
            placeholder="০১৭১১০০০০০০"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
          />
        </div>
        {fieldErrors.phone && (
          <div id="phone-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.phone}</span>
          </div>
        )}
      </div>



      {/* 5. Password */}
      <div className="auth-input-group">
        <label className="auth-input-label" htmlFor="reg_password">
          <span>পাসওয়ার্ড</span>
        </label>
        <PasswordInput 
          id="reg_password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          hasError={!!fieldErrors.password}
          placeholder="পাসওয়ার্ড লিখুন (কমপক্ষে ৬ অক্ষর)"
          aria-describedby={fieldErrors.password ? 'reg-pass-error' : undefined}
          required
        />
        {fieldErrors.password && (
          <div id="reg-pass-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.password}</span>
          </div>
        )}
      </div>

      {/* 6. Confirm Password */}
      <div className="auth-input-group">
        <label className="auth-input-label" htmlFor="reg_confirm_password">
          <span>পাসওয়ার্ড নিশ্চিত করুন</span>
        </label>
        <PasswordInput 
          id="reg_confirm_password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          hasError={!!fieldErrors.confirm_password}
          placeholder="পুনরায় পাসওয়ার্ড লিখুন"
          aria-describedby={fieldErrors.confirm_password ? 'reg-conf-error' : undefined}
          required
        />
        {fieldErrors.confirm_password && (
          <div id="reg-conf-error" className="auth-field-error" role="alert">
            <AlertCircle size={13} />
            <span>{fieldErrors.confirm_password}</span>
          </div>
        )}
      </div>

      {/* Terms checkbox */}
      <label className="auth-terms-checkbox">
        <input 
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
        />
        <span>
          আমি BAIT-এর{' '}
          <Link to="/terms-conditions" target="_blank">Terms &amp; Conditions</Link>{' '}
          এবং{' '}
          <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>{' '}
          গ্রহণ করছি।
        </span>
      </label>
      {fieldErrors.agreeTerms && (
        <div className="auth-field-error" style={{ marginTop: '-10px', marginBottom: '12px' }} role="alert">
          <AlertCircle size={13} />
          <span>{fieldErrors.agreeTerms}</span>
        </div>
      )}

      {/* Button: অ্যাকাউন্ট তৈরি করুন → */}
      <button 
        type="submit" 
        className="auth-float-btn"
        disabled={loading}
      >
        <span className="auth-btn-inner">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
            </>
          ) : (
            <>
              <span>অ্যাকাউন্ট তৈরি করুন</span>
              <ArrowRight size={17} className="auth-btn-arrow" />
            </>
          )}
        </span>
      </button>

      {/* Divider */}
      <div className="auth-card-divider">
        <span>অথবা</span>
      </div>

      {/* Bottom Switch to Sign In */}
      <div className="auth-bottom-switch">
        <span>আগেই অ্যাকাউন্ট আছে?</span>
        <Link to="/signin" className="auth-bottom-switch-link">
          সাইন ইন করুন
        </Link>
      </div>
    </form>
  );
}
