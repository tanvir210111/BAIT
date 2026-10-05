import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

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

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import DivisionList from './pages/DivisionList';
import DivisionDetails from './pages/DivisionDetails';
import DistrictList from './pages/DistrictList';
import DistrictDetails from './pages/DistrictDetails';
import UpazilaList from './pages/UpazilaList';
import UpazilaDetails from './pages/UpazilaDetails';
import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import InstructorsDirectory from './pages/InstructorsDirectory';
import StudentsDirectory from './pages/StudentsDirectory';
import JournalistsDirectory from './pages/JournalistsDirectory';
import PersonProfile from './pages/PersonProfile';
import Contact from './pages/Contact';

// Profile & Auth Pages
import SignIn from './pages/SignIn';
import MyProfile from './pages/MyProfile';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function AppLayout() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  // Hide public header/footer on admin dashboard (keep on admin/login if needed or clean)
  const isAdminDashboard = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminDashboard && (
        <Header onOpenSearch={() => setSearchModalOpen(true)} />
      )}

      <main style={{ flexGrow: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home onOpenSearch={() => setSearchModalOpen(true)} />} />
          <Route path="/amader-somporke" element={<About />} />
          
          {/* Administrative Hierarchy Pages */}
          <Route path="/bibhag" element={<DivisionList />} />
          <Route path="/bibhag/:slug" element={<DivisionDetails />} />
          <Route path="/jela" element={<DistrictList />} />
          <Route path="/jela/:slug" element={<DistrictDetails />} />
          <Route path="/upojela" element={<UpazilaList />} />
          <Route path="/upojela/:slug" element={<UpazilaDetails />} />

          {/* Courses */}
          <Route path="/course" element={<CourseList />} />
          <Route path="/course/:slug" element={<CourseDetails />} />

          {/* People Directories & Profile Pages */}
          <Route path="/instructor" element={<InstructorsDirectory />} />
          <Route path="/instructor/:slug" element={<PersonProfile category="instructor" />} />
          
          <Route path="/student" element={<StudentsDirectory />} />
          <Route path="/student/:slug" element={<PersonProfile category="student" />} />

          <Route path="/journalist" element={<JournalistsDirectory />} />
          <Route path="/journalist/:slug" element={<PersonProfile category="journalist" />} />

          <Route path="/employee/:slug" element={<PersonProfile category="employee" />} />

          {/* Contact */}
          <Route path="/jogajog" element={<Contact />} />

          {/* Profile & Auth */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/my-profile" element={<MyProfile />} />

          {/* Admin Panel */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
              <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>৪০৪</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।
              </p>
              <a href="/" className="btn btn-primary">হোমপেজে ফিরে যান</a>
            </div>
          } />
        </Routes>
      </main>

      {!isAdminDashboard && <Footer />}

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}
