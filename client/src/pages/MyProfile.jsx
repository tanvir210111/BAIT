import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Award, BookOpen, LayoutDashboard, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bait_admin_token');
    if (!token) {
      navigate('/signin');
      return;
    }

    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          navigate('/signin');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bait_admin_token');
    localStorage.removeItem('bait_admin_user');
    navigate('/');
  };

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>প্রোফাইল তথ্য লোড হচ্ছে...</div>;
  }

  if (!user) return null;

  const roleTitle = 
    user.category === 'admin' || user.role === 'superadmin' ? 'প্রধান প্রশাসক (Admin)' :
    user.category === 'instructor' ? 'কোর্স প্রশিক্ষক' :
    user.category === 'student' ? 'শিক্ষার্থী' :
    user.category === 'journalist' ? 'সাংবাদিক প্রতিনিধি' : 'সদর দপ্তর কর্মকর্তা';

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>আমার প্রোফাইল</span>
          </div>
          <h1 className="page-banner-title">ব্যবহারকারী প্রোফাইল</h1>
          <p className="page-banner-subtitle">
            স্বাগতম, {user.name} ({roleTitle})
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="profile-view-wrap">
          {/* Left Column: Avatar & Quick Actions */}
          <div className="profile-sidebar">
            <img 
              src={user.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
              alt={user.name} 
              className="profile-large-avatar" 
            />
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>
              {user.name}
            </h2>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '16px' }}>
              {roleTitle}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              {user.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#64748b' }}>
                  <Mail size={16} color="var(--primary)" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#64748b' }}>
                  <Phone size={16} color="var(--primary)" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <button 
                type="button" 
                onClick={handleLogout}
                className="btn btn-outline-white" 
                style={{ width: '100%', color: '#b91c1c', borderColor: '#fca5a5' }}
              >
                <LogOut size={16} />
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Info & Profile Shortcuts */}
          <div>
            {/* Quick Actions */}
            <div className="details-card-box">
              <h3 className="details-card-title">
                <ShieldCheck size={22} color="var(--primary)" />
                <span>অ্যাকাউন্ট বিবরণ ও লিংকসমূহ</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {(user.category === 'admin' || user.role === 'superadmin') && (
                  <Link 
                    to="/admin" 
                    className="standard-card"
                    style={{ background: '#f8fafc', padding: '18px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <LayoutDashboard size={20} color="var(--primary)" />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>অ্যাডমিন নিয়ন্ত্রণ প্যানেল</strong>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '12px' }}>
                      বিভাগ, জেলা, উপজেলা, ব্যক্তিবর্গ ও কোর্স পরিচালনা করুন।
                    </p>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>প্যানেলে যান →</span>
                  </Link>
                )}

                {user.slug && (
                  <Link 
                    to={`/${user.category === 'employee' ? 'employee' : user.category}/${user.slug}`} 
                    className="standard-card"
                    style={{ background: '#f8fafc', padding: '18px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <User size={20} color="var(--accent)" />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>পাবলিক প্রোফাইল পেজ</strong>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '12px' }}>
                      ওয়েবসাইটে সাধারণ দর্শনার্থীরা আপনার প্রোফাইল যেভাবে দেখতে পান।
                    </p>
                    <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.88rem' }}>পাবলিক পেজ দেখুন →</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Profile Information Table */}
            <div className="details-card-box">
              <h3 className="details-card-title">ব্যক্তিগত ও প্রাতিষ্ঠানিক তথ্য</h3>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>পূর্ণ নাম:</td>
                    <td><strong>{user.name}</strong></td>
                  </tr>
                  <tr>
                    <td>অ্যাকাউন্ট টাইপ:</td>
                    <td>{roleTitle}</td>
                  </tr>
                  {user.designation && (
                    <tr>
                      <td>পদবি:</td>
                      <td>{user.designation}</td>
                    </tr>
                  )}
                  {user.division_name && (
                    <tr>
                      <td>বিভাগ:</td>
                      <td>{user.division_name}</td>
                    </tr>
                  )}
                  {user.district_name && (
                    <tr>
                      <td>জেলা:</td>
                      <td>{user.district_name}</td>
                    </tr>
                  )}
                  {user.upazila_name && (
                    <tr>
                      <td>উপজেলা:</td>
                      <td><strong>{user.upazila_name}</strong></td>
                    </tr>
                  )}
                  {user.course_name && (
                    <tr>
                      <td>কোর্স ও ব্যাচ:</td>
                      <td>{user.course_name} ({user.batch})</td>
                    </tr>
                  )}
                  {user.courses_taught && (
                    <tr>
                      <td>পরিচালিত বিষয়:</td>
                      <td>{user.courses_taught}</td>
                    </tr>
                  )}
                  {user.bio && (
                    <tr>
                      <td>পরিচিতি:</td>
                      <td>{user.bio}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
