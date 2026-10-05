import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, MapPin, BookOpen, MessageSquare, 
  LogOut, Plus, Trash2, Edit2, Search, CheckCircle2, AlertCircle, Building2, Map, Navigation, Shield 
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'people' | 'locations' | 'courses' | 'messages'
  const [stats, setStats] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // People Management State
  const [people, setPeople] = useState([]);
  const [peopleCategoryFilter, setPeopleCategoryFilter] = useState('all');
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [personForm, setPersonForm] = useState({
    category: 'instructor',
    name_bn: '',
    slug: '',
    designation: '',
    photo_url: '',
    phone: '',
    email: '',
    bio: '',
    division_id: '',
    district_id: '',
    upazila_id: '',
    education: '',
    experience: '',
    expertise: '',
    courses_taught: '',
    course_name: '',
    batch: '',
    achievements: '',
    workplace_media: '',
    published_works: '',
    department: '',
    responsibilities: ''
  });

  // Location Management State
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [showUpazilaModal, setShowUpazilaModal] = useState(false);
  const [upazilaForm, setUpazilaForm] = useState({
    district_id: '',
    name_bn: '',
    slug: '',
    description: '',
    postal_code: ''
  });

  // Courses Management State
  const [courses, setCourses] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title_bn: '',
    slug: '',
    description: '',
    duration: '৬ মাস',
    batch_info: 'ব্যাচ-০১',
    instructor_id: '',
    division_id: '',
    district_id: '',
    upazila_id: '',
    syllabus: '',
    fee: 'বিনামূল্যে',
    image_url: ''
  });

  // Contacts State
  const [contacts, setContacts] = useState([]);

  // Toast / feedback message
  const [feedback, setFeedback] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('bait_admin_token');

  // Verify auth
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const storedUser = localStorage.getItem('bait_admin_user');
    if (storedUser) {
      try { setAdminUser(JSON.parse(storedUser)); } catch (e) {}
    }

    fetchDashboardData();
  }, [token]);

  const fetchDashboardData = () => {
    setLoading(true);
    const headers = { 'Authorization': `Bearer ${token}` };

    Promise.all([
      fetch('/api/admin/stats', { headers }).then(r => r.json()),
      fetch('/api/people').then(r => r.json()),
      fetch('/api/courses').then(r => r.json()),
      fetch('/api/dropdown-data').then(r => r.json()),
      fetch('/api/admin/contacts', { headers }).then(r => r.json())
    ]).then(([statsData, peopleData, coursesData, dropData, contactsData]) => {
      if (statsData.counts) setStats(statsData);
      setPeople(peopleData);
      setCourses(coursesData);
      if (dropData.divisions) setDivisions(dropData.divisions);
      if (dropData.districts) setDistricts(dropData.districts);
      if (dropData.upazilas) setUpazilas(dropData.upazilas);
      if (Array.isArray(contactsData)) setContacts(contactsData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  const showToast = (text, type = 'success') => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('bait_admin_token');
    localStorage.removeItem('bait_admin_user');
    navigate('/admin/login');
  };

  // 1. Submit New Person
  const handleSavePerson = async (e) => {
    e.preventDefault();
    if (!personForm.name_bn || !personForm.designation) {
      alert('নাম এবং পদবি পূরণ করা আবশ্যক।');
      return;
    }

    const payload = {
      ...personForm,
      slug: personForm.slug || personForm.name_bn.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4),
      division_id: personForm.division_id ? parseInt(personForm.division_id) : null,
      district_id: personForm.district_id ? parseInt(personForm.district_id) : null,
      upazila_id: personForm.upazila_id ? parseInt(personForm.upazila_id) : null,
    };

    try {
      const res = await fetch('/api/admin/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showToast('নতুন ব্যক্তি সফলভাবে ডাটাবেসে যোগ করা হয়েছে!');
        setShowPersonModal(false);
        fetchDashboardData();
        // Reset form
        setPersonForm({
          category: 'instructor',
          name_bn: '',
          slug: '',
          designation: '',
          photo_url: '',
          phone: '',
          email: '',
          bio: '',
          division_id: '',
          district_id: '',
          upazila_id: '',
          education: '',
          experience: '',
          expertise: '',
          courses_taught: '',
          course_name: '',
          batch: '',
          achievements: '',
          workplace_media: '',
          published_works: '',
          department: '',
          responsibilities: ''
        });
      } else {
        alert(data.error || 'সংরক্ষণ ব্যর্থ হয়েছে।');
      }
    } catch (err) {
      console.error(err);
      alert('সার্ভার এরর');
    }
  };

  // 2. Delete Person
  const handleDeletePerson = async (id, name) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে "${name}"-কে মুছে ফেলতে চান?`)) return;

    try {
      const res = await fetch(`/api/admin/people/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('সফলভাবে মুছে ফেলা হয়েছে।');
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Save New Upazila
  const handleSaveUpazila = async (e) => {
    e.preventDefault();
    if (!upazilaForm.name_bn || !upazilaForm.district_id) {
      alert('উপজেলার নাম এবং জেলা নির্বাচন করা আবশ্যক।');
      return;
    }

    const payload = {
      ...upazilaForm,
      district_id: parseInt(upazilaForm.district_id),
      slug: upazilaForm.slug || upazilaForm.name_bn.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4)
    };

    try {
      const res = await fetch('/api/admin/upazilas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast('নতুন উপজেলা সফলভাবে ডাটাবেসে যোগ করা হয়েছে!');
        setShowUpazilaModal(false);
        fetchDashboardData();
        setUpazilaForm({ district_id: '', name_bn: '', slug: '', description: '', postal_code: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Save New Course
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.title_bn) {
      alert('কোর্সের শিরোনাম প্রদান করুন।');
      return;
    }

    const payload = {
      ...courseForm,
      slug: courseForm.slug || courseForm.title_bn.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4),
      instructor_id: courseForm.instructor_id ? parseInt(courseForm.instructor_id) : null,
      division_id: courseForm.division_id ? parseInt(courseForm.division_id) : null,
      district_id: courseForm.district_id ? parseInt(courseForm.district_id) : null,
      upazila_id: courseForm.upazila_id ? parseInt(courseForm.upazila_id) : null,
    };

    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showToast('নতুন কোর্স সফলভাবে যোগ করা হয়েছে!');
        setShowCourseModal(false);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered people list
  const filteredPeople = people.filter(p => 
    peopleCategoryFilter === 'all' || p.category === peopleCategoryFilter
  );

  // Form cascading district & upazila
  const formDistricts = districts.filter(d => 
    !personForm.division_id || d.division_id === parseInt(personForm.division_id)
  );
  const formUpazilas = upazilas.filter(u => 
    !personForm.district_id || u.district_id === parseInt(personForm.district_id)
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="logo-badge" style={{ width: '38px', height: '38px', fontSize: '1rem' }}>
            BAIT
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>BAIT অ্যাডমিন</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>নিয়ন্ত্রণ প্যানেল</div>
          </div>
        </div>

        <ul className="admin-nav">
          <li className="admin-nav-item">
            <button 
              type="button" 
              className={`admin-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              <LayoutDashboard size={18} />
              <span>ড্যাশবোর্ড ওভারভিউ</span>
            </button>
          </li>
          <li className="admin-nav-item">
            <button 
              type="button" 
              className={`admin-nav-link ${activeTab === 'people' ? 'active' : ''}`}
              onClick={() => setActiveTab('people')}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              <Users size={18} />
              <span>ব্যক্তিবর্গ ব্যবস্থাপনা</span>
            </button>
          </li>
          <li className="admin-nav-item">
            <button 
              type="button" 
              className={`admin-nav-link ${activeTab === 'locations' ? 'active' : ''}`}
              onClick={() => setActiveTab('locations')}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              <MapPin size={18} />
              <span>এলাকা ব্যবস্থাপনা</span>
            </button>
          </li>
          <li className="admin-nav-item">
            <button 
              type="button" 
              className={`admin-nav-link ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              <BookOpen size={18} />
              <span>কোর্স ব্যবস্থাপনা</span>
            </button>
          </li>
          <li className="admin-nav-item">
            <button 
              type="button" 
              className={`admin-nav-link ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              <MessageSquare size={18} />
              <span>বার্তা ইনবক্স</span>
              {contacts.length > 0 && (
                <span style={{ marginLeft: 'auto', background: '#059669', fontSize: '0.72rem', padding: '2px 6px', borderRadius: '10px' }}>
                  {contacts.length}
                </span>
              )}
            </button>
          </li>
        </ul>

        <div style={{ padding: '20px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            type="button" 
            onClick={handleLogout}
            className="admin-nav-link" 
            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#f87171' }}
          >
            <LogOut size={18} />
            <span>লগআউট</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>
              প্রশাসক: {adminUser?.name || 'প্রধান অ্যাডমিন'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" target="_blank" className="btn btn-outline-white" style={{ color: 'var(--primary)', borderColor: 'var(--primary)', padding: '6px 14px', fontSize: '0.85rem' }}>
              ওয়েবসাইট দেখুন ↗
            </Link>
          </div>
        </header>

        {/* Feedback Alert Toast */}
        {feedback && (
          <div style={{ margin: '16px 28px 0 28px', background: feedback.type === 'success' ? '#d1fae5' : '#fee2e2', color: feedback.type === 'success' ? '#065f46' : '#991b1b', padding: '12px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Dynamic Content Body */}
        <div className="admin-content">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>তথ্য প্রস্তুত হচ্ছে...</div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div>
                  <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '24px' }}>
                    ড্যাশবোর্ড সামগ্রিক পরিসংখ্যান
                  </h1>

                  {/* 8 Statistic Boxes */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px', marginBottom: '36px' }}>
                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><Building2 size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.divisions || 8}</div>
                        <div className="admin-stat-label">মোট বিভাগ</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><Map size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.districts || 64}</div>
                        <div className="admin-stat-label">মোট জেলা</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><Navigation size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.upazilas || upazilas.length}</div>
                        <div className="admin-stat-label">মোট উপজেলা</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><Users size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.employees || 0}</div>
                        <div className="admin-stat-label">সদর দপ্তর কর্মচারী</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><BookOpen size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.instructors || 0}</div>
                        <div className="admin-stat-label">মোট প্রশিক্ষক</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><Users size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.students || 0}</div>
                        <div className="admin-stat-label">মোট শিক্ষার্থী</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><MessageSquare size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.journalists || 0}</div>
                        <div className="admin-stat-label">মোট সাংবাদিক</div>
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div className="admin-stat-icon"><BookOpen size={24} /></div>
                      <div>
                        <div className="admin-stat-num">{stats?.counts?.courses || 0}</div>
                        <div className="admin-stat-label">মোট কোর্স</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="details-card-box">
                      <h3 className="details-card-title">সাম্প্রতিক যোগাযোগ বার্তা</h3>
                      {contacts.length === 0 ? (
                        <p style={{ color: '#94a3b8' }}>কোনো নতুন বার্তা নেই।</p>
                      ) : (
                        contacts.slice(0, 4).map(c => (
                          <div key={c.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px' }}>
                            <div style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{c.name} ({c.phone || c.email})</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>বিষয়: {c.subject || 'সাধারণ বার্তা'}</div>
                            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>{c.message}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="details-card-box">
                      <h3 className="details-card-title">সাম্প্রতিক যুক্ত ব্যক্তিবর্গ</h3>
                      {people.slice(0, 4).map(p => (
                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '8px' }}>
                          <div>
                            <div style={{ fontWeight: 600 }}>{p.name_bn}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>{p.designation} ({p.category})</div>
                          </div>
                          <Link to={`/${p.category === 'employee' ? 'employee' : p.category}/${p.slug}`} target="_blank" style={{ fontSize: '0.82rem', color: 'var(--accent)' }}>
                            প্রোফাইল ↗
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PEOPLE MANAGEMENT */}
              {activeTab === 'people' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>
                      ব্যক্তিবর্গ ব্যবস্থাপনা (People Management)
                    </h1>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setShowPersonModal(true)}
                    >
                      <Plus size={18} />
                      <span>নতুন ব্যক্তি যোগ করুন</span>
                    </button>
                  </div>

                  {/* Filter tabs for people */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    {['all', 'instructor', 'student', 'journalist', 'employee'].map(cat => (
                      <button 
                        key={cat}
                        type="button"
                        className={`badge-tag ${peopleCategoryFilter === cat ? 'badge-teal' : ''}`}
                        style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)', fontSize: '0.9rem' }}
                        onClick={() => setPeopleCategoryFilter(cat)}
                      >
                        {cat === 'all' ? 'সকল' : cat === 'instructor' ? 'প্রশিক্ষক' : cat === 'student' ? 'শিক্ষার্থী' : cat === 'journalist' ? 'সাংবাদিক' : 'কর্মকর্তা'}
                      </button>
                    ))}
                  </div>

                  {/* People Table */}
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                      <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                          <th style={{ padding: '12px 16px' }}>ছবি ও নাম</th>
                          <th style={{ padding: '12px 16px' }}>বিভাগ / ক্যাটাগরি</th>
                          <th style={{ padding: '12px 16px' }}>পদবি / কোর্স</th>
                          <th style={{ padding: '12px 16px' }}>এলাকা (উপজেলা, জেলা)</th>
                          <th style={{ padding: '12px 16px', textAlign: 'right' }}>অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPeople.map(p => (
                          <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={p.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} alt={p.name_bn} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                              <strong>{p.name_bn}</strong>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="badge-tag badge-blue">
                                {p.category === 'instructor' ? 'প্রশিক্ষক' : p.category === 'student' ? 'শিক্ষার্থী' : p.category === 'journalist' ? 'সাংবাদিক' : 'কর্মকর্তা'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }}>{p.designation || p.course_name}</td>
                            <td style={{ padding: '12px 16px', color: '#64748b' }}>
                              {p.upazila_name ? `${p.upazila_name}, ` : ''}{p.district_name || 'সদর দপ্তর'}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                              <button 
                                type="button" 
                                onClick={() => handleDeletePerson(p.id, p.name_bn)}
                                style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                title="মুছে ফেলুন"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: LOCATIONS MANAGEMENT */}
              {activeTab === 'locations' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>
                      প্রশাসনিক এলাকা ব্যবস্থাপনা (Locations)
                    </h1>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setShowUpazilaModal(true)}
                    >
                      <Plus size={18} />
                      <span>নতুন উপজেলা যোগ করুন</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {/* Divisions */}
                    <div className="details-card-box">
                      <h3 className="details-card-title">বিভাগসমূহ (৮টি)</h3>
                      <ul style={{ listStyle: 'none' }}>
                        {divisions.map(d => (
                          <li key={d.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <strong>{d.name_bn}</strong>
                            <Link to={`/bibhag/${d.slug}`} target="_blank" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>পেজ দেখুন ↗</Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Upazilas overview */}
                    <div className="details-card-box">
                      <h3 className="details-card-title">সক্রিয় উপজেলাসমূহ ({upazilas.length}টি)</h3>
                      <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                        <ul style={{ listStyle: 'none' }}>
                          {upazilas.map(u => (
                            <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                              <span><strong>{u.name_bn}</strong> ({districts.find(d => d.id === u.district_id)?.name_bn || 'জেলা'})</span>
                              <Link to={`/upojela/${u.slug}`} target="_blank" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>পেজ দেখুন ↗</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: COURSES MANAGEMENT */}
              {activeTab === 'courses' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>
                      কোর্স ব্যবস্থাপনা (Course Management)
                    </h1>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setShowCourseModal(true)}
                    >
                      <Plus size={18} />
                      <span>নতুন কোর্স তৈরি করুন</span>
                    </button>
                  </div>

                  <div className="entity-grid">
                    {courses.map(c => (
                      <div key={c.id} className="standard-card">
                        <span className="badge-tag badge-teal" style={{ width: 'fit-content', marginBottom: '8px' }}>{c.duration}</span>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{c.title_bn}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px', flexGrow: 1 }}>{c.description}</p>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px' }}>
                          প্রশিক্ষক: {c.instructor_name || 'অ্যাসাইন করা হয়নি'}<br />
                          এলাকা: {c.upazila_name ? `${c.upazila_name}, ${c.district_name}` : 'জাতীয়'}
                        </div>
                        <Link to={`/course/${c.slug}`} target="_blank" className="card-btn">
                          <span>ওয়েবসাইটে দেখুন ↗</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: MESSAGES INBOX */}
              {activeTab === 'messages' && (
                <div>
                  <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
                    যোগাযোগ বার্তা ইনবক্স ({contacts.length})
                  </h1>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {contacts.length === 0 ? (
                      <div style={{ background: '#fff', border: '1px solid var(--border)', padding: '40px', textAlign: 'center', borderRadius: '8px', color: '#94a3b8' }}>
                        কোনো বার্তা নেই।
                      </div>
                    ) : (
                      contacts.map(msg => (
                        <div key={msg.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{msg.name}</strong>
                              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                ফোন: {msg.phone || 'দেওয়া হয়নি'} | ইমেইল: {msg.email || 'দেওয়া হয়নি'}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{msg.created_at}</span>
                          </div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', margin: '8px 0 4px 0', color: 'var(--accent)' }}>
                            বিষয়: {msg.subject || 'সাধারণ বার্তা'}
                          </div>
                          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', background: '#f8fafc', padding: '12px', borderRadius: '6px' }}>
                            {msg.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* MODAL 1: ADD NEW PERSON (Cascading Location Driven) */}
      {showPersonModal && (
        <div className="search-modal-backdrop" onClick={() => setShowPersonModal(false)}>
          <div className="search-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
              নতুন ব্যক্তি যোগ করুন (Employee / Instructor / Student / Journalist)
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              নতুন ব্যক্তি যুক্ত করলে বিভাগ, জেলা ও উপজেলার হায়ারার্কি অনুযায়ী স্বয়ংক্রিয়ভাবে সংশ্লিষ্ট পেজে প্রদর্শিত হবে।
            </p>

            <form onSubmit={handleSavePerson}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">ক্যাটাগরি *</label>
                  <select 
                    className="form-control"
                    value={personForm.category}
                    onChange={e => setPersonForm({ ...personForm, category: e.target.value })}
                  >
                    <option value="instructor">প্রশিক্ষক (Instructor)</option>
                    <option value="student">শিক্ষার্থী (Student)</option>
                    <option value="journalist">সাংবাদিক (Journalist)</option>
                    <option value="employee">সদর দপ্তর কর্মচারী (HQ Employee)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">পূর্ণ বাংলা নাম *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="যেমন: মোঃ আব্দুর রহমান" 
                    value={personForm.name_bn}
                    onChange={e => setPersonForm({ ...personForm, name_bn: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">পদবি / কোর্সের পদবি *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="যেমন: সিনিয়র প্রশিক্ষক / প্রশিক্ষণার্থী / বিশেষ প্রতিনিধি" 
                    value={personForm.designation}
                    onChange={e => setPersonForm({ ...personForm, designation: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ছবির লিংক (URL)</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    placeholder="https://..." 
                    value={personForm.photo_url}
                    onChange={e => setPersonForm({ ...personForm, photo_url: e.target.value })}
                  />
                </div>
              </div>

              {/* Administrative Hierarchy Dropdowns */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '18px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>
                  প্রশাসনিক এলাকা নির্বাচন (হায়ারার্কি):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div>
                    <label className="form-label">বিভাগ</label>
                    <select 
                      className="form-control"
                      value={personForm.division_id}
                      onChange={e => setPersonForm({ ...personForm, division_id: e.target.value, district_id: '', upazila_id: '' })}
                    >
                      <option value="">-- বিভাগ নির্বাচন --</option>
                      {divisions.map(d => (
                        <option key={d.id} value={d.id}>{d.name_bn}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">জেলা</label>
                    <select 
                      className="form-control"
                      value={personForm.district_id}
                      onChange={e => setPersonForm({ ...personForm, district_id: e.target.value, upazila_id: '' })}
                      disabled={!personForm.division_id}
                    >
                      <option value="">-- জেলা নির্বাচন --</option>
                      {formDistricts.map(d => (
                        <option key={d.id} value={d.id}>{d.name_bn}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">উপজেলা</label>
                    <select 
                      className="form-control"
                      value={personForm.upazila_id}
                      onChange={e => setPersonForm({ ...personForm, upazila_id: e.target.value })}
                      disabled={!personForm.district_id}
                    >
                      <option value="">-- উপজেলা নির্বাচন --</option>
                      {formUpazilas.map(u => (
                        <option key={u.id} value={u.id}>{u.name_bn}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Specific fields depending on category */}
              {personForm.category === 'instructor' && (
                <div className="form-group">
                  <label className="form-label">কোন কোন বিষয় বা কোর্স পরিচালনা করেন</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="যেমন: ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট, রিয়্যাক্ট" 
                    value={personForm.courses_taught}
                    onChange={e => setPersonForm({ ...personForm, courses_taught: e.target.value })}
                  />
                </div>
              )}

              {personForm.category === 'student' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">কোর্স নাম</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="যেমন: আধুনিক ওয়েব ডেভেলপমেন্ট" 
                      value={personForm.course_name}
                      onChange={e => setPersonForm({ ...personForm, course_name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ব্যাচ</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="যেমন: ব্যাচ-০১ (২০২৬)" 
                      value={personForm.batch}
                      onChange={e => setPersonForm({ ...personForm, batch: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {personForm.category === 'journalist' && (
                <div className="form-group">
                  <label className="form-label">কর্মক্ষেত্র ও মিডিয়া নাম</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="যেমন: দৈনিক প্রথম আলো ও BAIT নিউজ নেটওয়ার্ক" 
                    value={personForm.workplace_media}
                    onChange={e => setPersonForm({ ...personForm, workplace_media: e.target.value })}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="যেমন: বিএসসি ইন সিএসই, ৫ বছরের অভিজ্ঞতা" 
                  value={personForm.education}
                  onChange={e => setPersonForm({ ...personForm, education: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">সংক্ষিপ্ত পরিচিতি (Bio)</label>
                <textarea 
                  rows={3} 
                  className="form-control" 
                  placeholder="পরিচিতি লিখুন..." 
                  value={personForm.bio}
                  onChange={e => setPersonForm({ ...personForm, bio: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-outline-white" style={{ color: '#475569', borderColor: '#cbd5e1' }} onClick={() => setShowPersonModal(false)}>
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary">
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW UPAZILA */}
      {showUpazilaModal && (
        <div className="search-modal-backdrop" onClick={() => setShowUpazilaModal(false)}>
          <div className="search-modal-box" onClick={e => e.stopPropagation()} style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              নতুন উপজেলা তৈরি করুন
            </h2>
            <form onSubmit={handleSaveUpazila}>
              <div className="form-group">
                <label className="form-label">জেলা নির্বাচন *</label>
                <select 
                  className="form-control"
                  value={upazilaForm.district_id}
                  onChange={e => setUpazilaForm({ ...upazilaForm, district_id: e.target.value })}
                  required
                >
                  <option value="">-- জেলা বাছুন --</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name_bn} ({divisions.find(div => div.id === d.division_id)?.name_bn})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">উপজেলার বাংলা নাম *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="যেমন: টঙ্গী / রূপগঞ্জ" 
                  value={upazilaForm.name_bn}
                  onChange={e => setUpazilaForm({ ...upazilaForm, name_bn: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">পোস্ট কোড</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="যেমন: ১৭১১" 
                  value={upazilaForm.postal_code}
                  onChange={e => setUpazilaForm({ ...upazilaForm, postal_code: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">সংক্ষিপ্ত পরিচিতি</label>
                <textarea 
                  rows={2} 
                  className="form-control" 
                  placeholder="উপজেলার বিবরণ..." 
                  value={upazilaForm.description}
                  onChange={e => setUpazilaForm({ ...upazilaForm, description: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline-white" style={{ color: '#475569', borderColor: '#cbd5e1' }} onClick={() => setShowUpazilaModal(false)}>
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary">
                  উপজেলা সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW COURSE */}
      {showCourseModal && (
        <div className="search-modal-backdrop" onClick={() => setShowCourseModal(false)}>
          <div className="search-modal-box" onClick={e => e.stopPropagation()} style={{ padding: '24px', maxHeight: '85vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              নতুন কোর্স তৈরি করুন
            </h2>
            <form onSubmit={handleSaveCourse}>
              <div className="form-group">
                <label className="form-label">কোর্সের বাংলা শিরোনাম *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="যেমন: পাইথন ও এআই ফান্ডামেন্টালস" 
                  value={courseForm.title_bn}
                  onChange={e => setCourseForm({ ...courseForm, title_bn: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">কোর্স সময়কাল</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="যেমন: ৪ মাস" 
                    value={courseForm.duration}
                    onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ব্যাচ বিবরণ</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="যেমন: ব্যাচ-০১" 
                    value={courseForm.batch_info}
                    onChange={e => setCourseForm({ ...courseForm, batch_info: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">কোর্স প্রশিক্ষক নির্বাচন</label>
                <select 
                  className="form-control"
                  value={courseForm.instructor_id}
                  onChange={e => setCourseForm({ ...courseForm, instructor_id: e.target.value })}
                >
                  <option value="">-- প্রশিক্ষক নির্বাচন --</option>
                  {people.filter(p => p.category === 'instructor').map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name_bn} ({inst.designation})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">কোর্সের বিবরণ</label>
                <textarea 
                  rows={3} 
                  className="form-control" 
                  placeholder="কোর্সের বিস্তারিত..." 
                  value={courseForm.description}
                  onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">সিলেবাস মডিউলসমূহ (পাইপ '|' চিহ্ন দিয়ে আলাদা করুন)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="মডিউল ১ | মডিউল ২ | মডিউল ৩" 
                  value={courseForm.syllabus}
                  onChange={e => setCourseForm({ ...courseForm, syllabus: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline-white" style={{ color: '#475569', borderColor: '#cbd5e1' }} onClick={() => setShowCourseModal(false)}>
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary">
                  কোর্স সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
