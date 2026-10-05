import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, MapPin, UserCheck, ArrowRight } from 'lucide-react';
import { coursesAPI } from '../services/api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesAPI.getAll()
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>কোর্স</span>
          </div>
          <h1 className="page-banner-title">BAIT প্রশিক্ষণ ও কোর্সসমূহ</h1>
          <p className="page-banner-subtitle">
            তৃণমূল পর্যায় থেকে আন্তর্জাতিক মানে পৌঁছানোর কর্মমুখী আইসিটি ও কারিগরি প্রশিক্ষণ।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>কোর্স লোড হচ্ছে...</div>
        ) : (
          <div className="entity-grid">
            {courses.map(course => (
              <div key={course.id} className="standard-card">
                {course.image_url && (
                  <img 
                    src={course.image_url} 
                    alt={course.title_bn} 
                    style={{ height: '190px', width: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '14px' }} 
                  />
                )}
                
                <div className="standard-card-header">
                  <span className="badge-tag badge-teal">{course.duration}</span>
                  <span className="badge-tag badge-amber">{course.batch_info}</span>
                </div>

                <h2 style={{ fontSize: '1.35rem', margin: '8px 0', color: 'var(--primary-dark)' }}>
                  {course.title_bn}
                </h2>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', flexGrow: 1 }}>
                  {course.description}
                </p>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)', marginBottom: '16px', fontSize: '0.86rem' }}>
                  {course.instructor_name && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--primary)', fontWeight: 600 }}>
                      <UserCheck size={16} />
                      <span>প্রশিক্ষক: {course.instructor_name}</span>
                    </div>
                  )}
                  {course.upazila_name && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                      <MapPin size={16} />
                      <span>স্থান: {course.upazila_name}, {course.district_name}</span>
                    </div>
                  )}
                </div>

                <Link to={`/course/${course.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                  <span>কোর্সের বিস্তারিত দেখুন</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
