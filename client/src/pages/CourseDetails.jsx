import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, MapPin, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { coursesAPI } from '../services/api';

export default function CourseDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    coursesAPI.getBySlug(slug)
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>কোর্সের তথ্য লোড হচ্ছে...</div>;
  }

  if (!data || !data.course) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>কোর্সটি পাওয়া যায়নি</h2>
        <Link to="/course" className="btn btn-primary" style={{ marginTop: '20px' }}>কোর্সের তালিকায় ফিরুন</Link>
      </div>
    );
  }

  const { course, students } = data;

  const syllabusModules = course.syllabus ? course.syllabus.split('|') : [];

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <Link to="/course">কোর্স</Link>
            <span>/</span>
            <span>{course.title_bn}</span>
          </div>
          <h1 className="page-banner-title">{course.title_bn}</h1>
          <p className="page-banner-subtitle">
            সময়কাল: {course.duration} • {course.batch_info} • কোর্স ফি: {course.fee || 'বিনামূল্যে'}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="details-content-grid">
          {/* Main Left Column */}
          <div>
            {/* Course Overview */}
            <div className="details-card-box">
              <h2 className="details-card-title">
                <BookOpen size={22} color="var(--primary)" />
                <span>কোর্স সম্পর্কে</span>
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '20px' }}>
                {course.description}
              </p>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <strong>কোর্স সময়কাল:</strong> {course.duration}
                </div>
                <div>
                  <strong>ব্যাচ সূচি:</strong> {course.batch_info}
                </div>
                <div>
                  <strong>কোর্স ফি:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{course.fee || 'বিনামূল্যে (বৃত্তিপ্রাপ্ত)'}</span>
                </div>
                <div>
                  <strong>প্রশিক্ষণ মাধ্যম:</strong> ব্যবহারিক ল্যাব ও প্রকল্পভিত্তিক
                </div>
              </div>
            </div>

            {/* Syllabus Section */}
            <div className="details-card-box">
              <h2 className="details-card-title">
                <CheckCircle2 size={22} color="var(--accent-emerald)" />
                <span>কী কী শেখানো হবে (কোর্স কারিকুলাম ও সিলেবাস)</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                শিল্প কারখানার চাহিদা ও কর্মসংস্থানের সুযোগ বিবেচনায় প্রণীত পূর্ণাঙ্গ সিলেবাস:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {syllabusModules.map((mod, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#f1f5f9', padding: '12px 16px', borderRadius: '6px' }}>
                    <div style={{ background: 'var(--primary)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 500 }}>
                      {mod.trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Students */}
            {students?.length > 0 && (
              <div className="details-card-box">
                <h2 className="details-card-title">
                  <span>এই কোর্সের অধ্যয়নরত শিক্ষার্থীবৃন্দ ({students.length} জন)</span>
                </h2>
                <div className="entity-grid">
                  {students.map(st => (
                    <div key={st.id} className="person-card">
                      <div className="person-header">
                        <img src={st.photo_url} alt={st.name_bn} className="person-avatar" />
                        <div className="person-meta">
                          <div className="person-name">{st.name_bn}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{st.batch}</div>
                        </div>
                      </div>
                      <div className="person-footer">
                        <Link to={`/student/${st.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.82rem', marginLeft: 'auto' }}>
                          প্রোফাইল দেখুন →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Right Column: Instructor & Location */}
          <div>
            {/* Instructor Card */}
            {course.instructor_name && (
              <div className="details-card-box">
                <h3 className="details-card-title" style={{ fontSize: '1.2rem' }}>
                  <UserCheck size={20} color="var(--primary)" />
                  <span>কোর্স প্রশিক্ষক</span>
                </h3>
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <img 
                    src={course.instructor_photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'} 
                    alt={course.instructor_name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto', border: '3px solid var(--border)' }} 
                  />
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>
                    {course.instructor_name}
                  </h4>
                  <div style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '12px' }}>
                    {course.instructor_designation}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>
                    {course.instructor_bio?.substring(0, 110)}...
                  </p>
                  <Link to={`/instructor/${course.instructor_slug}`} className="card-btn" style={{ width: '100%' }}>
                    <span>প্রশিক্ষক প্রোফাইল</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )}

            {/* Location Card */}
            <div className="details-card-box">
              <h3 className="details-card-title" style={{ fontSize: '1.2rem' }}>
                <MapPin size={20} color="var(--primary)" />
                <span>সংশ্লিষ্ট এলাকা ও ল্যাব</span>
              </h3>
              <table className="info-table">
                <tbody>
                  {course.division_name && (
                    <tr>
                      <td>বিভাগ:</td>
                      <td>
                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                          {course.division_name}
                        </span>
                      </td>
                    </tr>
                  )}
                  {course.district_name && (
                    <tr>
                      <td>জেলা:</td>
                      <td>
                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                          {course.district_name}
                        </span>
                      </td>
                    </tr>
                  )}
                  {course.upazila_name && (
                    <tr>
                      <td>উপজেলা:</td>
                      <td>
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                          {course.upazila_name}
                        </span>
                      </td>
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
