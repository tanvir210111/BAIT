import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';
import { toBengaliNumber } from '../../utils/formatDate';

export default function CourseProgressCard({ course }) {
  if (!course) return null;

  return (
    <div className="student-card course-progress-card">
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {course.coverImage && (
          <img 
            src={course.coverImage} 
            alt={course.title} 
            style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span className="badge-tag badge-teal" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
              {course.batch}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {course.status}
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '4px' }}>
            {course.title}
          </h3>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
            বর্তমান টপিক: {course.currentTopic}
          </p>

          {/* Progress Bar */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px', fontWeight: 600 }}>
              <span>কোর্স অগ্রগতি</span>
              <span style={{ color: 'var(--primary)' }}>{toBengaliNumber(course.progress)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${course.progress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
                  borderRadius: '999px',
                  transition: 'width 0.4s ease'
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              সম্পন্ন: {toBengaliNumber(course.completedLessons)} / {toBengaliNumber(course.totalLessons)} ক্লাস
            </span>
            <Link 
              to={`/student/courses/${course.id}`}
              className="btn btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <PlayCircle size={15} />
              <span>পড়া চালিয়ে যান</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
