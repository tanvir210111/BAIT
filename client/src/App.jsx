import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AuthLayout from './layouts/AuthLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import CourseList from './pages/public/CourseList';
import CourseDetails from './pages/public/CourseDetails';
import InstructorsDirectory from './pages/public/InstructorsDirectory';
import StudentsDirectory from './pages/public/StudentsDirectory';
import PersonProfile from './pages/public/PersonProfile';
import Contact from './pages/public/Contact';
import PolicyPage from './pages/public/PolicyPage';
import MyProfile from './pages/public/MyProfile';

// Auth Pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// Student Panel Pages
import Dashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import CourseLearning from './pages/student/CourseLearning';
import LiveClasses from './pages/student/LiveClasses';
import ClassRoutine from './pages/student/ClassRoutine';
import Assignments from './pages/student/Assignments';
import Exams from './pages/student/Exams';
import Results from './pages/student/Results';
import Certificates from './pages/student/Certificates';
import Payments from './pages/student/Payments';
import Notifications from './pages/student/Notifications';
import Support from './pages/student/Support';
import StudentProfile from './pages/student/StudentProfile';
import Settings from './pages/student/Settings';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ========================================================
            1. MAIN PUBLIC WEBSITE ROUTES (wrapped in PublicLayout)
            Note: No Support Chat on Public Website
            ======================================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/amader-somporke" element={<About />} />
          <Route path="/about" element={<About />} />

          {/* Courses */}
          <Route path="/course" element={<CourseList />} />
          <Route path="/course/:slug" element={<CourseDetails />} />

          {/* Directories & Profiles */}
          <Route path="/instructor" element={<InstructorsDirectory />} />
          <Route path="/team" element={<InstructorsDirectory />} />
          <Route path="/instructor/:slug" element={<PersonProfile category="instructor" />} />
          <Route path="/student" element={<StudentsDirectory />} />
          <Route path="/student/:slug" element={<PersonProfile category="student" />} />
          <Route path="/student-profile/:slug" element={<PersonProfile category="student" />} />
          <Route path="/employee/:slug" element={<PersonProfile category="employee" />} />

          {/* Contact */}
          <Route path="/jogajog" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />

          {/* Policy Pages */}
          <Route path="/refund-policy" element={<PolicyPage type="refund" />} />
          <Route path="/privacy-policy" element={<PolicyPage type="privacy" />} />
          <Route path="/terms-conditions" element={<PolicyPage type="terms" />} />

          {/* User Profile */}
          <Route path="/my-profile" element={<MyProfile />} />

          {/* 404 Fallback within Public Layout */}
          <Route path="*" element={
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
              <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>৪০৪</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।
              </p>
              <a href="/" className="btn btn-primary">হোমপেজে ফিরে যান</a>
            </div>
          } />
        </Route>

        {/* ========================================================
            2. STANDALONE AUTHENTICATION ROUTES (wrapped in AuthLayout)
            Clean, minimal full-viewport UI without Public Header/Footer
            ======================================================== */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
        </Route>

        {/* ========================================================
            2. STUDENT PANEL ROUTES (wrapped in StudentLayout)
            Support belongs ONLY inside the Student Panel
            ======================================================== */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="courses/:id" element={<CourseLearning />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="class-routine" element={<ClassRoutine />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="exams" element={<Exams />} />
          <Route path="results" element={<Results />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
