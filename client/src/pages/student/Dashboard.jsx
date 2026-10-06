import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Video, Award, Clock, FileText, 
  Calendar, CheckCircle, ArrowRight, UserCheck, AlertCircle 
} from 'lucide-react';
import { studentService } from '../../services/studentService';
import CourseProgressCard from '../../components/student/CourseProgressCard';
import UpcomingClass from '../../components/student/UpcomingClass';
import NoticeCard from '../../components/student/NoticeCard';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      studentService.getProfile(),
      studentService.getCourses(),
      studentService.getLiveClasses(),
      studentService.getAssignments(),
      studentService.getNotifications()
    ]).then(([prof, crs, live, assign, notifs]) => {
      setProfile(prof);
      setCourses(crs);
      setLiveClasses(live);
      setAssignments(assign);
      setNotices(notifs);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading text="ড্যাশবোর্ড লোড হচ্ছে..." fullPage />;
  }

  const upcomingClass = liveClasses.find(c => c.status === 'upcoming') || liveClasses[0];
  const pendingAssignments = assignments.filter(a => a.status === 'pending');

  return (
    <div className="student-page">
      {/* Welcome Banner */}
      <div className="student-dashboard-hero">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge-tag badge-teal" style={{ fontSize: '0.8rem' }}>
              আইডি: {profile?.student_id || 'BAIT-ST001'}
            </span>
            <span className="badge-tag badge-red" style={{ fontSize: '0.8rem' }}>
              {profile?.batch || 'ব্যাচ-০১'}
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '6px' }}>
            স্বাগতম, {profile?.name_bn || 'শিক্ষার্থী'}!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            আপনার আজকের ক্লাস শিডিউল ও অ্যাকাডেমিক অগ্রগতি একনজরে দেখে নিন।
          </p>
        </div>

        <div className="dashboard-hero-cta">
          <Link to="/student/live-classes" className="btn" style={{ background: 'var(--accent-red)', color: '#fff', fontWeight: 700, gap: '8px', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
            <Video size={18} />
            <span>আজকের লাইভ ক্লাস</span>
          </Link>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="student-stats-grid">
        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(0, 106, 78, 0.1)', color: 'var(--primary)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <div className="stat-card-title">নিবন্ধিত কোর্স</div>
            <div className="stat-card-value">{toBengaliNumber(courses.length)} টি</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-card-title">সম্পন্ন লেকচার</div>
            <div className="stat-card-value">{toBengaliNumber(courses[0]?.completedLessons || 49)} টি</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(244, 42, 65, 0.1)', color: 'var(--accent-red)' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-card-title">বাকি অ্যাসাইনমেন্ট</div>
            <div className="stat-card-value">{toBengaliNumber(pendingAssignments.length)} টি</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-card-title">সার্টিফিকেট অর্জন</div>
            <div className="stat-card-value">১ টি</div>
          </div>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="student-dashboard-grid">
        {/* Left Column: Progress & Active Classes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Active Course */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
                চলমান কোর্স অগ্রগতি
              </h2>
              <Link to="/student/courses" style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600 }}>
                সকল কোর্স →
              </Link>
            </div>
            {courses.length > 0 && <CourseProgressCard course={courses[0]} />}
          </div>

          {/* Upcoming Live Class */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '14px' }}>
              আসন্ন লাইভ ক্লাস
            </h2>
            <UpcomingClass liveClass={upcomingClass} />
          </div>

          {/* Pending / Recent Assignments */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
                সাম্প্রতিক অ্যাসাইনমেন্ট
              </h2>
              <Link to="/student/assignments" style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600 }}>
                সব অ্যাসাইনমেন্ট →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {assignments.slice(0, 2).map(a => (
                <div key={a.id} className="student-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--primary-dark)' }}>{a.title}</strong>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
                      ডেডলাইন: {a.deadline} • মোট নম্বর: {toBengaliNumber(a.totalMarks)}
                    </div>
                  </div>
                  <span className={`badge-tag ${a.status === 'graded' ? 'badge-teal' : 'badge-amber'}`} style={{ fontSize: '0.78rem' }}>
                    {a.status === 'graded' ? 'মূল্যায়িত' : 'জমা বাকি'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Shortcuts & Notices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Action Grid */}
          <div className="student-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '16px' }}>
              দ্রুত লিঙ্কসমূহ
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Link to="/student/class-routine" className="student-quick-link-btn">
                <Calendar size={18} color="var(--primary)" />
                <span>ক্লাস রুটিন</span>
              </Link>
              <Link to="/student/results" className="student-quick-link-btn">
                <Award size={18} color="var(--accent-red)" />
                <span>ফলাফল</span>
              </Link>
              <Link to="/student/payments" className="student-quick-link-btn">
                <Clock size={18} color="var(--primary-light)" />
                <span>ফি হিস্ট্রি</span>
              </Link>
              <Link to="/student/support" className="student-quick-link-btn">
                <UserCheck size={18} color="#d97706" />
                <span>হেল্প সাপোর্ট</span>
              </Link>
            </div>
          </div>

          {/* Notice Board */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>
                নোটিশ বোর্ড
              </h2>
              <Link to="/student/notifications" style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: 600 }}>
                সকল নোটিশ →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notices.slice(0, 3).map(n => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          </div>

          {/* Mentor Support Banner */}
          <div className="student-card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#065f46', marginBottom: '6px' }}>
              লাইভ মেন্টর সাপোর্ট
            </h4>
            <p style={{ fontSize: '0.86rem', color: '#047857', marginBottom: '14px', lineHeight: '1.5' }}>
              ক্লাস বুঝতে অসুবিধা হলে বা কোডে এরর থাকলে প্রতিদিন বিকাল ৪টা হতে রাত ৮টা পর্যন্ত সাপোর্ট ইনস্ট্রাক্টরের সাথে কথা বলুন।
            </p>
            <Link to="/student/support" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}>
              সাপোর্ট টিকিট খুলুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
