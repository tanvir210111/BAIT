import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  PlayCircle, CheckCircle, FileText, Download, 
  ArrowLeft, ExternalLink, Video, Clock, BookOpen 
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';

export default function CourseLearning() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const lessons = [
    { id: 1, title: 'ক্লাস ০১: কোর্স ওরিয়েন্টেশন ও প্রফেশনাল ডেভেলপমেন্ট এনভায়রনমেন্ট সেটআপ', duration: '১ ঘণ্টা ৪৫ মিনিট', videoId: 'demo1', completed: true },
    { id: 2, title: 'ক্লাস ০২: আধুনিক জাভাস্ক্রিপ্ট (ES6+): অ্যারো ফাংশন, ডি-স্ট্রাকচারিং ও মডিউলস', duration: '২ ঘণ্টা ১০ মিনিট', videoId: 'demo2', completed: true },
    { id: 3, title: 'ক্লাস ০৩: অ্যাসিঙ্ক জাভাস্ক্রিপ্ট: প্রমিজ, ফেচ ও অ্যাসিনক্রোনাস প্রোগ্রামিং', duration: '১ ঘণ্টা ৫৫ মিনিট', videoId: 'demo3', completed: true },
    { id: 4, title: 'ক্লাস ০৪: রিঅ্যাক্ট বেসিকস: কম্পোনেন্ট, জেএসএক্স ও প্রপস পাসিং', duration: '২ ঘণ্টা ০৫ মিনিট', videoId: 'demo4', completed: true },
    { id: 5, title: 'ক্লাস ০৫: স্টেট ম্যানেজমেন্ট: useState, useEffect ও সাইড এফেক্টস', duration: '২ ঘণ্টা ১৫ মিনিট', videoId: 'demo5', completed: false },
    { id: 6, title: 'ক্লাস ০৬: রিঅ্যাক্ট রাউটার v7 ও রেসপনসিভ ড্যাশবোর্ড স্ট্রাকচার', duration: '১ ঘণ্টা ৫০ মিনিট', videoId: 'demo6', completed: false },
    { id: 7, title: 'ক্লাস ০৭: নোডজেএস ও এক্সপ্রেস রেস্ট এপিআই (REST API) ডিজাইন', duration: '২ ঘণ্টা ২০ মিনিট', videoId: 'demo7', completed: false }
  ];

  useEffect(() => {
    studentService.getCourseDetails(id)
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading text="ক্লাস রুম লোড হচ্ছে..." fullPage />;
  }

  const activeLesson = lessons[activeLessonIndex] || lessons[0];

  return (
    <div className="student-page">
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <Link to="/student/courses" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.86rem' }}>
          <ArrowLeft size={16} />
          <span>কোর্স তালিকায় ফিরুন</span>
        </Link>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-dark)', margin: 0 }}>
            {course?.title || 'কোর্স লার্নিং ক্লাসরুম'}
          </h1>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            প্রশিক্ষক: {course?.instructor} • ব্যাচ: {course?.batch}
          </span>
        </div>
      </div>

      {/* 2 Column Player Layout */}
      <div className="student-learning-grid">
        {/* Left: Video Area & Class Resources */}
        <div>
          {/* Mock Video Player Box */}
          <div className="student-video-player-box">
            <div className="video-player-placeholder">
              <PlayCircle size={64} color="#ffffff" strokeWidth={1.5} />
              <div style={{ marginTop: '12px', color: '#ffffff', fontWeight: 700, fontSize: '1.1rem' }}>
                {activeLesson.title}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem', marginTop: '4px' }}>
                এইচডি ভিডিও লেকচার প্লেয়ার • সময়কাল: {activeLesson.duration}
              </div>
            </div>
          </div>

          {/* Active Lesson Info */}
          <div className="student-card" style={{ marginTop: '20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span className="badge-tag badge-teal" style={{ marginBottom: '8px' }}>
                  লেকচার নম্বর {toBengaliNumber(activeLesson.id)}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                  {activeLesson.title}
                </h2>
              </div>
              <button 
                type="button" 
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.88rem' }}
                onClick={() => alert('এই লেকচারটি সম্পন্ন হিসেবে চিহ্নিত করা হলো!')}
              >
                <CheckCircle size={16} />
                <span>সম্পন্ন হিসেবে মার্ক করুন</span>
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '12px' }}>
                ক্লাস রিসোর্স ও প্রজেক্ট ফাইলস
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline" 
                  style={{ fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={15} />
                  <span>ক্লাসের গিটহাব কোড রিপোজিটরি</span>
                </a>
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  style={{ fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => alert('লেকচার স্লাইড PDF ডাউনলোড হচ্ছে...')}
                >
                  <Download size={15} />
                  <span>লেকচার স্লাইড (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Lesson Playlist */}
        <div className="student-card" style={{ padding: '20px', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
              ক্লাস সূচি ও লেকচার লিস্ট
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {toBengaliNumber(lessons.length)} টি লেকচার
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lessons.map((lesson, idx) => {
              const isActive = idx === activeLessonIndex;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`student-lesson-item ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(0, 106, 78, 0.08)' : '#f8fafc',
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    {lesson.completed ? (
                      <CheckCircle size={18} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <PlayCircle size={18} color={isActive ? 'var(--primary)' : '#94a3b8'} style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary-dark)' : 'var(--text-main)', lineHeight: '1.4' }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
