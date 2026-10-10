import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase } from 'lucide-react';

/**
 * Toggle pill between Student and Client authentication modes
 */
export default function AuthRoleSwitcher({ userType = 'student', isSignup = false }) {
  const isStudent = userType === 'student';
  const studentTarget = isSignup ? '/student/signup' : '/student/login';
  const clientTarget = isSignup ? '/client/signup' : '/client/login';

  return (
    <div className="auth-role-switcher" role="tablist" aria-label="ব্যবহারকারীর ধরন নির্বাচন করুন">
      <Link 
        to={studentTarget}
        className={`auth-role-tab ${isStudent ? 'active' : ''}`}
        role="tab"
        aria-selected={isStudent}
        title="শিক্ষার্থী লগইন ও রেজিস্ট্রেশন"
      >
        <span className="auth-role-tab-inner">
          <GraduationCap size={16} />
          <span>শিক্ষার্থী</span>
        </span>
      </Link>

      <Link 
        to={clientTarget}
        className={`auth-role-tab ${!isStudent ? 'active' : ''}`}
        role="tab"
        aria-selected={!isStudent}
        title="ক্লায়েন্ট লগইন ও রেজিস্ট্রেশন"
      >
        <span className="auth-role-tab-inner">
          <Briefcase size={15} />
          <span>ক্লায়েন্ট</span>
        </span>
      </Link>
    </div>
  );
}
