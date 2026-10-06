import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, MapPin, CheckCircle2 } from 'lucide-react';
import { coursesAPI } from '../../services/api';
import CourseCurriculum from '../../components/course/CourseCurriculum';
import InstructorCard from '../../components/course/InstructorCard';
import Loading from '../../components/common/Loading';

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
    return <Loading text="কোর্সের তথ্য লোড হচ্ছে..." fullPage />;
  }

  if (!data || !data.course) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>কোর্সটি পাওয়া যায়নি</h2>
        <Link to="/course" className="btn btn-primary" style={{ marginTop: '20px' }}>কোর্সের তালিকায় ফিরুন</Link>
      </div>
    );
  }

  const { course, students, instructor } = data;

  // Syllabus can be array of modules or string separated by '|'
  let syllabusModules = [];
  if (Array.isArray(course.curriculum)) {
    syllabusModules = course.curriculum.map(c => c.title || c);
  } else if (course.syllabus) {
    syllabusModules = course.syllabus.split('|');
  } else {
    syllabusModules = [
      'মডিউল ১: ফান্ডামেন্টালস ও টুলস সেটআপ',
      'মডিউল ২: কোর কনসেপ্ট ও হ্যান্ডস-অন কোডিং',
      'মডিউল ৩: অ্যাডভান্সড আর্কিটেকচার ও ডেটাবেস',
      'মডিউল ৪: লাইভ ক্লাউড ডেপ্লয়মেন্ট ও ক্যাপস্টোন প্রজেক্ট'
    ];
  }

  const instructorName = course.instructor_name || instructor?.name_bn;
  const instructorSlug = course.instructor_slug || instructor?.slug;
  const instructorDesignation = course.instructor_designation || instructor?.designation;
  const instructorPhoto = course.instructor_photo || instructor?.photo_url;
  const instructorBio = course.instructor_bio || instructor?.bio;

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
            সময়কাল: {course.duration} {course.batch_info ? `• ${course.batch_info}` : ''} • কোর্স ফি: {course.fee || 'বৃত্তিপ্রাপ্ত সাশ্রয়ী ফি'}
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
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <strong>কোর্স সময়কাল:</strong> {course.duration}
                </div>
                <div>
                  <strong>ব্যাচ সূচি:</strong> {course.batch_info || 'নতুন ব্যাচ চলমান'}
                </div>
                <div>
                  <strong>কোর্স লেভেল:</strong> {course.level || 'বিগিনার হতে অ্যাডভান্সড'}
                </div>
                <div>
                  <strong>প্রশিক্ষণ মাধ্যম:</strong> ব্যবহারিক ল্যাব ও লাইভ প্রকল্প
                </div>
              </div>
            </div>

            {/* Syllabus Section */}
            <CourseCurriculum syllabus={syllabusModules} />

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
            {/* Enroll Card */}
            <div className="details-card-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>
                কোর্সে ভর্তি সংক্রান্ত তথ্য
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#065f46', marginBottom: '16px' }}>
                সীমিত আসনে নতুন ব্যাচে ভর্তি চলছে। লাইভ ও ল্যাব প্রজেক্টের সাথে ক্যারিয়ার নিশ্চিত করুন।
              </p>
              <Link 
                to="/signup" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', height: '46px', fontSize: '1rem', fontWeight: 700 }}
              >
                এখনই ভর্তি হন (Enroll Now)
              </Link>
            </div>

            {/* Instructor Card */}
            {instructorName && (
              <InstructorCard
                name={instructorName}
                slug={instructorSlug}
                designation={instructorDesignation}
                photoUrl={instructorPhoto}
                bio={instructorBio}
              />
            )}

            {/* Location / Lab Info */}
            <div className="details-card-box">
              <h3 className="details-card-title" style={{ fontSize: '1.2rem' }}>
                <MapPin size={20} color="var(--primary)" />
                <span>প্রশিক্ষণ ক্যাম্পাস ও ল্যাব</span>
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                ৩১/১ শরীফ কমপ্লেক্স, দৈনিক বাংলার আলো নিউজ পত্রিকা অফিস, ৬ষ্ঠ তলা, পুরানা পল্টন, ঢাকা।
              </p>
              <div style={{ marginTop: '12px', fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 600 }}>
                দেশব্যাপী লাইভ অনলাইন জুম ল্যাব সুবিধা উপলব্ধ।
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
