import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  ArrowRight, 
  Loader2, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Lock, 
  GraduationCap, 
  Briefcase,
  Globe,
  ChevronDown
} from 'lucide-react';
import PasswordInput from './PasswordInput';

export default function RegisterForm({ 
  onSubmit, 
  loading, 
  error,
  userType = 'student'
}) {
  const [formData, setFormData] = useState({
    name_bn: '',
    organization_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    agreeTerms: true
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const isStudent = userType === 'student';

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
      errors.name_bn = 'আপনার নাম প্রদান করুন';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.phone = 'ফোন নম্বর অথবা ইমেইল প্রদান করা আবশ্যক';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'সঠিক ইমেইল ঠিকানা প্রদান করুন';
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
      onSubmit({ ...formData, userType });
    }
  };

  const loginRoute = isStudent ? '/student/login' : '/client/login';
  const alternateRoleRoute = isStudent ? '/client/signup' : '/student/signup';
  const alternateRoleText = isStudent ? 'ক্লায়েন্ট হিসেবে নিবন্ধন করতে চান?' : 'শিক্ষার্থী হিসেবে নিবন্ধন করতে চান?';

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
        <div className="auth-input-wrapper has-leading-icon">
          <User size={16} className="auth-leading-icon" />
          <input 
            type="text"
            id="name_bn"
            name="name_bn"
            className={`auth-input-field ${fieldErrors.name_bn ? 'has-error' : ''}`}
            placeholder="আপনার নাম"
            value={formData.name_bn}
            onChange={handleChange}
            required
            autoComplete="name"
            aria-label="আপনার নাম"
            aria-invalid={!!fieldErrors.name_bn}
          />
        </div>
        {fieldErrors.name_bn && (
          <div id="name-error" className="auth-field-error" role="alert">
            <AlertCircle size={12} />
            <span>{fieldErrors.name_bn}</span>
          </div>
        )}
      </div>

      {/* 2. Organization Name (For Client Signup) */}
      {!isStudent && (
        <div className="auth-input-group">
          <div className="auth-input-wrapper has-leading-icon">
            <Building2 size={16} className="auth-leading-icon" />
            <input 
              type="text"
              id="organization_name"
              name="organization_name"
              className="auth-input-field"
              placeholder="প্রতিষ্ঠানের নাম (যদি থাকে)"
              value={formData.organization_name}
              onChange={handleChange}
              autoComplete="organization"
              aria-label="প্রতিষ্ঠানের নাম"
            />
          </div>
        </div>
      )}

      {/* 3. Email */}
      <div className="auth-input-group">
        <div className="auth-input-wrapper has-leading-icon">
          <Mail size={16} className="auth-leading-icon" />
          <input 
            type="email"
            id="email"
            name="email"
            className={`auth-input-field ${fieldErrors.email ? 'has-error' : ''}`}
            placeholder="ইমেইল"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            aria-label="ইমেইল"
            aria-invalid={!!fieldErrors.email}
          />
        </div>
        {fieldErrors.email && (
          <div id="email-error" className="auth-field-error" role="alert">
            <AlertCircle size={12} />
            <span>{fieldErrors.email}</span>
          </div>
        )}
      </div>

      {/* 4. Phone */}
      <div className="auth-input-group">
        <div className="auth-input-wrapper has-leading-icon">
          <Phone size={16} className="auth-leading-icon" />
          <input 
            type="tel"
            id="phone"
            name="phone"
            className={`auth-input-field ${fieldErrors.phone ? 'has-error' : ''}`}
            placeholder="ফোন নম্বর"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            aria-label="ফোন নম্বর"
            aria-invalid={!!fieldErrors.phone}
          />
        </div>
        {fieldErrors.phone && (
          <div id="phone-error" className="auth-field-error" role="alert">
            <AlertCircle size={12} />
            <span>{fieldErrors.phone}</span>
          </div>
        )}
      </div>

      {/* 5. Password */}
      <div className="auth-input-group">
        <PasswordInput 
          id="reg_password"
          name="password"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          hasError={!!fieldErrors.password}
          placeholder="পাসওয়ার্ড"
          required
        />
        {fieldErrors.password && (
          <div id="reg-pass-error" className="auth-field-error" role="alert">
            <AlertCircle size={12} />
            <span>{fieldErrors.password}</span>
          </div>
        )}
      </div>

      {/* 6. Confirm Password */}
      <div className="auth-input-group">
        <PasswordInput 
          id="reg_confirm_password"
          name="confirm_password"
          icon={Lock}
          value={formData.confirm_password}
          onChange={handleChange}
          hasError={!!fieldErrors.confirm_password}
          placeholder="পাসওয়ার্ড পুনরায় লিখুন"
          required
        />
        {fieldErrors.confirm_password && (
          <div id="reg-conf-error" className="auth-field-error" role="alert">
            <AlertCircle size={12} />
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
          আমি{' '}
          <Link to="/terms-conditions" target="_blank">শর্তাবলী</Link>{' '}
          এবং{' '}
          <Link to="/privacy-policy" target="_blank">গোপনীয়তা নীতিতে</Link>{' '}
          সম্মত
        </span>
      </label>
      {fieldErrors.agreeTerms && (
        <div className="auth-field-error" style={{ marginTop: '-10px', marginBottom: '12px' }} role="alert">
          <AlertCircle size={13} />
          <span>{fieldErrors.agreeTerms}</span>
        </div>
      )}

      {/* Primary Submit Button: অ্যাকাউন্ট তৈরি করুন → */}
      <button 
        type="submit" 
        className="auth-float-btn auth-pill-primary-btn"
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



      {/* Switch to Login */}
      <div className="auth-bottom-switch">
        <span className="auth-switch-prompt">ইতিমধ্যে অ্যাকাউন্ট আছে?</span>
        <Link to={loginRoute} className="auth-bottom-switch-link auth-switch-action-highlight">
          লগইন করুন
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
