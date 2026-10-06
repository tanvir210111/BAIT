import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Award, CheckCircle, Clock, FileText } from 'lucide-react';
import { studentService } from '../../services/studentService';
import CourseProgressCard from '../../components/student/CourseProgressCard';
import Loading from '../../components/common/Loading';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    studentService.getCourses()
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="কোর্স লোড হচ্ছে..." fullPage />;
  }

  const filteredCourses = courses.filter(c => {
    if (filter === 'active') return c.status === 'চলমান';
    if (filter === 'completed') return c.status === 'সমাপ্ত';
    return true;
  });

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">আমার কোর্সসমূহ (My Courses)</h1>
          <p className="student-page-subtitle">
            আপনার নিবন্ধিত সকল লাইভ ও প্রজেক্ট-বেজড কোর্স তালিকা।
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className={`badge-tag ${filter === 'all' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('all')}
          >
            সকল ({courses.length})
          </button>
          <button
            type="button"
            className={`badge-tag ${filter === 'active' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('active')}
          >
            চলমান
          </button>
          <button
            type="button"
            className={`badge-tag ${filter === 'completed' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('completed')}
          >
            সমাপ্ত
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredCourses.map(course => (
          <CourseProgressCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
