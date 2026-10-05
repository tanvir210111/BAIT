import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, Map, Navigation, ArrowRight, BookOpen, Users, 
  Award, ShieldCheck, Newspaper, Sparkles, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function Home({ onOpenSearch }) {
  const [stats, setStats] = useState(null);
  const [hqEmployees, setHqEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Hierarchical quick selector states
  const [selectedDiv, setSelectedDiv] = useState('');
  const [selectedDist, setSelectedDist] = useState('');
  const [selectedUpa, setSelectedUpa] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stats
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    // Fetch HQ employees
    fetch('/api/people?category=employee')
      .then(res => res.json())
      .then(data => setHqEmployees(data.slice(0, 4)))
      .catch(err => console.error(err));

    // Fetch featured courses (4 courses)
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.slice(0, 4)))
      .catch(err => console.error(err));

    // Fetch dropdown data for interactive locator
    fetch('/api/dropdown-data')
      .then(res => res.json())
      .then(data => {
        if (data.divisions) setDivisions(data.divisions);
        if (data.districts) setDistricts(data.districts);
        if (data.upazilas) setUpazilas(data.upazilas);
      })
      .catch(err => console.error(err));
  }, []);

  const availableDistricts = districts.filter(d => 
    !selectedDiv || d.division_id === parseInt(selectedDiv)
  );

  const availableUpazilas = upazilas.filter(u => 
    !selectedDist || u.district_id === parseInt(selectedDist)
  );

  const handleQuickLocate = (e) => {
    e.preventDefault();
    if (selectedUpa) {
      const upaObj = upazilas.find(u => u.id === parseInt(selectedUpa));
      if (upaObj) navigate(`/upojela/${upaObj.slug}`);
    } else if (selectedDist) {
      const distObj = districts.find(d => d.id === parseInt(selectedDist));
      if (distObj) navigate(`/jela/${distObj.slug}`);
    } else if (selectedDiv) {
      const divObj = divisions.find(d => d.id === parseInt(selectedDiv));
      if (divObj) navigate(`/bibhag/${divObj.slug}`);
    }
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট অব টেকনোলজি</span>
          </div>
          <h1 className="hero-title">
            বাংলাদেশের প্রতিটি মানুষের কাছে জ্ঞান, দক্ষতা ও তথ্য পৌঁছে দেওয়ার লক্ষ্যে BAIT
          </h1>
          <p className="hero-desc">
            প্রশাসনিক কাঠামো অনুযায়ী ৮টি বিভাগ, ৬৪টি জেলা ও সকল উপজেলার তৃণমূল মানুষের তথ্যপ্রযুক্তি প্রশিক্ষণ, দক্ষতা উন্নয়ন এবং সাংবাদিকতার সমন্বিত জাতীয় প্ল্যাটফর্ম।
          </p>
          <div className="hero-buttons">
            <Link to="/amader-somporke" className="btn btn-primary">
              <span>আমাদের সম্পর্কে জানুন</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#quick-locator" className="btn btn-outline-white">
              <span>এলাকা নির্বাচন করুন</span>
              <Navigation size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Homepage 3 Main Cards (বিভাগ, জেলা, উপজেলা) */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div className="main-three-cards-grid">
          {/* Card 1: বিভাগ */}
          <Link to="/bibhag" className="main-admin-card">
            <div className="card-icon-bubble bubble-division">
              <Building2 size={32} />
            </div>
            <h2 className="main-card-title">বিভাগ</h2>
            <p className="main-card-desc">
              বাংলাদেশের সকল বিভাগের প্রশাসনিক ও প্রশিক্ষণ সংক্রান্ত তথ্য দেখুন।
            </p>
            <div className="card-btn">
              <span>বিভাগ দেখুন</span>
              <ChevronRight size={18} />
            </div>
          </Link>

          {/* Card 2: জেলা */}
          <Link to="/jela" className="main-admin-card">
            <div className="card-icon-bubble bubble-district">
              <Map size={32} />
            </div>
            <h2 className="main-card-title">জেলা</h2>
            <p className="main-card-desc">
              বাংলাদেশের সকল জেলার তথ্য, সংশ্লিষ্ট উপজেলা ও স্থানীয় কার্যক্রম দেখুন।
            </p>
            <div className="card-btn">
              <span>জেলা দেখুন</span>
              <ChevronRight size={18} />
            </div>
          </Link>

          {/* Card 3: উপজেলা */}
          <Link to="/upojela" className="main-admin-card">
            <div className="card-icon-bubble bubble-upazila">
              <Navigation size={32} />
            </div>
            <h2 className="main-card-title">উপজেলা</h2>
            <p className="main-card-desc">
              বাংলাদেশের সকল উপজেলার তৃণমূল তথ্য, প্রশিক্ষক, শিক্ষার্থী ও সাংবাদিক দেখুন।
            </p>
            <div className="card-btn">
              <span>উপজেলা দেখুন</span>
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Interactive Administrative Quick Locator */}
      <section id="quick-locator" className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">প্রশাসনিক অনুসন্ধান</span>
            <h2 className="section-title">সহজেই আপনার এলাকা নির্বাচন করুন</h2>
            <p className="section-subtitle">
              বিভাগ থেকে জেলা এবং উপজেলা নির্বাচন করে সরাসরি ঐ এলাকার তথ্য, প্রশিক্ষক ও কোর্সের পাতায় পৌঁছান।
            </p>
          </div>

          <form onSubmit={handleQuickLocate} style={{ maxWidth: '900px', margin: '0 auto', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">১. বিভাগ নির্বাচন করুন</label>
              <select 
                className="form-control"
                value={selectedDiv}
                onChange={e => {
                  setSelectedDiv(e.target.value);
                  setSelectedDist('');
                  setSelectedUpa('');
                }}
              >
                <option value="">-- সকল বিভাগ --</option>
                {divisions.map(d => (
                  <option key={d.id} value={d.id}>{d.name_bn}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">২. জেলা নির্বাচন করুন</label>
              <select 
                className="form-control"
                value={selectedDist}
                onChange={e => {
                  setSelectedDist(e.target.value);
                  setSelectedUpa('');
                }}
                disabled={!selectedDiv}
              >
                <option value="">-- জেলা নির্বাচন করুন --</option>
                {availableDistricts.map(d => (
                  <option key={d.id} value={d.id}>{d.name_bn}</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">৩. উপজেলা নির্বাচন করুন</label>
              <select 
                className="form-control"
                value={selectedUpa}
                onChange={e => setSelectedUpa(e.target.value)}
                disabled={!selectedDist}
              >
                <option value="">-- উপজেলা নির্বাচন করুন --</option>
                {availableUpazilas.map(u => (
                  <option key={u.id} value={u.id}>{u.name_bn}</option>
                ))}
              </select>
            </div>

            <div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', height: '44px' }}
                disabled={!selectedDiv && !selectedDist && !selectedUpa}
              >
                <span>এলাকা দেখুন</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. HQ Headquarters Section (BAIT সদর দপ্তর) */}
      <section className="section hq-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">কেন্দ্রীয় প্রশাসন</span>
            <h2 className="section-title">BAIT সদর দপ্তর</h2>
            <p className="section-subtitle">
              কেন্দ্রীয় পরিচালনা পর্ষদ ও প্রশাসনের নিষ্ঠাবান কর্মকর্তাদের পরিচিতি ও দায়িত্ব।
            </p>
          </div>

          <div className="employee-grid">
            {hqEmployees.map(emp => (
              <div key={emp.id} className="employee-card">
                <div className="employee-photo-wrap">
                  <img src={emp.photo_url} alt={emp.name_bn} className="employee-photo" />
                </div>
                <div className="employee-info">
                  <span className="employee-dept-badge">{emp.department || 'সদর দপ্তর'}</span>
                  <h3 className="employee-name">{emp.name_bn}</h3>
                  <div className="employee-designation">{emp.designation}</div>
                  <p className="employee-desc">{emp.bio?.substring(0, 95)}...</p>
                  <Link to={`/employee/${emp.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Course Highlights */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">দক্ষতা ও প্রযুক্তি শিক্ষা</span>
            <h2 className="section-title">BAIT কোর্স ও প্রশিক্ষণ</h2>
            <p className="section-subtitle">
              উপজেলা ও জেলা পর্যায়ের শিক্ষার্থীদের জন্য আন্তর্জাতিক মানের ব্যবহারিক আইসিটি কোর্স।
            </p>
          </div>

          <div className="entity-grid">
            {courses.map(course => (
              <div key={course.id} className="standard-card">
                {course.image_url && (
                  <img 
                    src={course.image_url} 
                    alt={course.title_bn} 
                    style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} 
                  />
                )}
                <div className="standard-card-header">
                  <span className="badge-tag badge-teal">{course.duration}</span>
                  <span className="badge-tag badge-amber">{course.batch_info}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{course.title_bn}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', flexGrow: 1 }}>
                  {course.description?.substring(0, 110)}...
                </p>
                {course.instructor_name && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '14px', fontWeight: 600 }}>
                    প্রশিক্ষক: {course.instructor_name}
                  </div>
                )}
                <Link to={`/course/${course.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/course" className="btn btn-primary">
              <span>সকল কোর্স দেখুন</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Live Statistics Counter Bar */}
      {stats && (
        <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #064e4e 100%)', color: '#fff' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#a7f3d0' }}>৮</div>
                <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>মোট বিভাগ</div>
              </div>
              <div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#a7f3d0' }}>{stats.districts}</div>
                <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>মোট জেলা</div>
              </div>
              <div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#a7f3d0' }}>{stats.upazilas}+</div>
                <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>উপজেলা নেটওয়ার্ক</div>
              </div>
              <div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#a7f3d0' }}>{stats.instructors}</div>
                <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>মোট প্রশিক্ষক</div>
              </div>
              <div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#a7f3d0' }}>{stats.students}</div>
                <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>মোট শিক্ষার্থী</div>
              </div>
              <div>
                <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#a7f3d0' }}>{stats.journalists}</div>
                <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>সাংবাদিক ফোরাম</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
