import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({
  value,
  onChange,
  placeholder = 'আপনার পাসওয়ার্ড লিখুন',
  required = true,
  name = 'password',
  id = 'password',
  hasError = false,
  autoComplete = 'current-password',
  disabled = false,
  'aria-describedby': ariaDescribedby
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-input-wrapper">
      <input 
        type={showPassword ? 'text' : 'password'}
        name={name}
        id={id}
        className={`auth-input-field auth-input-pwd ${hasError ? 'has-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedby}
      />
      <button
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
        className="auth-toggle-pwd-btn"
        aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
        title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
        tabIndex="-1"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
