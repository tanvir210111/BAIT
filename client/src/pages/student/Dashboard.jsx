import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Users,
  CheckCircle2,
  FileQuestion,
  Headphones,
  UploadCloud,
  X,
  Send,
  Sparkles,
  Check,
  Flame,
  Video,
  Radio,
  Zap,
  Target
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function Dashboard() {
  const user = authService.getUser();
  const studentName = user?.name ? user.name.split(' ')[0] : 'তানভীর';

  // Sort state for Exam Board
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(12);
  const [activeMenuRow, setActiveMenuRow] = useState(null);

  // Modals state
  const [showClubModal, setShowClubModal] = useState(false);
  const [clubJoinSuccess, setClubJoinSuccess] = useState(false);
  const [selectedHwModal, setSelectedHwModal] = useState(null);
  const [hwRepoUrl, setHwRepoUrl] = useState('');
  const [hwSubmittedSuccess, setHwSubmittedSuccess] = useState(false);
  const [activeExamModal, setActiveExamModal] = useState(null);
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [doubtText, setDoubtText] = useState('');
  const [doubtSent, setDoubtSent] = useState(false);

  // Enrolled Courses (Pastel cards in Bengali)
  const enrolledCourses = [
    {
      id: 1,
      title: 'গ্রাফিক ফান্ডামেন্টালস - ART101',
      instructor: 'প্রফেসর স্মিথ',
      daysBangla: 'সোমবার ও বুধবার',
      time: 'সকাল ৯:০০ - ১০:৩০',
      location: 'ডিজাইন স্টুডিও এ',
      cardTheme: 'theme-purple',
      link: '/student/courses/1'
    },
    {
      id: 2,
      title: 'অ্যাডভান্সড ওয়েব ডিজাইন - ITD201',
      instructor: 'ড. জনসন',
      daysBangla: 'মঙ্গলবার ও বৃহস্পতিবার',
      time: 'দুপুর ১:৩০ - ৩:০০',
      location: 'কম্পিউটার ল্যাব ৩',
      cardTheme: 'theme-yellow',
      link: '/student/courses/2'
    },
    {
      id: 3,
      title: 'ইউজার এক্সপেরিয়েন্স রিসার্চ - UXD301',
      instructor: 'প্রফেসর ডেভিস',
      daysBangla: 'সোমবার ও শনিবার',
      time: 'সকাল ১১:০০ - ১২:৩০',
      location: 'ডিজাইন ল্যাব ২',
      cardTheme: 'theme-cyan',
      link: '/student/courses/3'
    },
    {
      id: 4,
      title: 'থ্রিডি অ্যানিমেশন টেকনিকস - ANI301',
      instructor: 'ড. মার্টিনেজ',
      daysBangla: 'বুধবার',
      time: 'দুপুর ২:০০ - ৫:০০',
      location: 'অ্যানিমেশন স্টুডিও',
      cardTheme: 'theme-green',
      link: '/student/courses/4'
    }
  ];

  // Exam Board Items in Bengali
  const [examItems, setExamItems] = useState([
    {
      id: 1,
      name: 'গ্রাফিক ডিজাইন ফান্ডামেন্টালস কুইজ',
      course: 'ART101',
      date: '২৫ জানুয়ারি ২০২৪',
      dateRaw: '2024-01-25',
      time: 'সকাল ১০:০০',
      location: 'ডিজাইন স্টুডিও এ',
      statusBangla: 'সম্পন্ন হয়েছে',
      statusType: 'completed',
      totalMarks: 50,
      obtainedMarks: 46
    },
    {
      id: 2,
      name: 'ডিজিটাল ইলাস্ট্রেশন প্র্যাকটিক্যাল',
      course: 'ART103',
      date: '৫ ফেব্রুয়ারি ২০২৪',
      dateRaw: '2024-02-05',
      time: 'দুপুর ০২:০০',
      location: 'কম্পিউটার ল্যাব ২',
      statusBangla: 'সম্পন্ন হয়েছে',
      statusType: 'completed',
      totalMarks: 50,
      obtainedMarks: 48
    },
    {
      id: 3,
      name: 'ইউআই/ইউএক্স ডিজাইন প্রিন্সিপালস',
      course: 'UXD301',
      date: '১০ মার্চ ২০২৪',
      dateRaw: '2024-03-10',
      time: 'দুপুর ০১:০০',
      location: 'ডিজাইন ল্যাব ১',
      statusBangla: 'আসন্ন পরীক্ষা',
      statusType: 'upcoming',
      totalMarks: 50,
      obtainedMarks: null
    },
    {
      id: 4,
      name: 'ডিজাইন হিস্ট্রি থিওরি ও এসে',
      course: 'ART101',
      date: '২ এপ্রিল ২০২৪',
      dateRaw: '2024-04-02',
      time: 'সকাল ০৯:৪৫',
      location: 'লেকচার হল বি',
      statusBangla: 'আসন্ন পরীক্ষা',
      statusType: 'upcoming',
      totalMarks: 40,
      obtainedMarks: null
    },
    {
      id: 5,
      name: 'প্রোডাক্ট ডিজাইন প্রোটোটাইপ ইভ্যালুয়েশন',
      course: 'ITD201',
      date: '১৫ মে ২০২৪',
      dateRaw: '2024-05-15',
      time: 'সকাল ১১:১৫',
      location: 'প্রোটোটাইপ ল্যাব',
      statusBangla: 'আসন্ন পরীক্ষা',
      statusType: 'upcoming',
      totalMarks: 60,
      obtainedMarks: null
    },
    {
      id: 6,
      name: 'কালার থিওরি ও অ্যাপলিকেশন',
      course: 'ART103',
      date: '৮ জুন ২০২৪',
      dateRaw: '2024-06-08',
      time: 'দুপুর ০২:১৫',
      location: 'ডিজাইন স্টুডিও বি',
      statusBangla: 'আসন্ন পরীক্ষা',
      statusType: 'upcoming',
      totalMarks: 30,
      obtainedMarks: null
    },
    {
      id: 7,
      name: 'ভিজ্যুয়াল কমিউনিকেশন ফাইনাল',
      course: 'ART202',
      date: '২০ নভেম্বর ২০২৪',
      dateRaw: '2024-11-20',
      time: 'দুপুর ০২:০০',
      location: 'ডিজাইন স্টুডিও বি',
      statusBangla: 'আসন্ন পরীক্ষা',
      statusType: 'upcoming',
      totalMarks: 50,
      obtainedMarks: null
    }
  ]);

  // Homeworks / Assignments list in Bengali
  const [homeworkItems, setHomeworkItems] = useState([
    {
      id: 1,
      courseTitle: 'গ্রাফিক ফান্ডামেন্টালস',
      assignmentTitle: 'অ্যাসাইনমেন্ট: ব্র্যান্ড ডিজাইন প্রজেক্ট ১',
      dueDateBangla: 'জমার তারিখ: ১০ই ফেব্রুয়ারি ২০২৪',
      statusBangla: 'জমা দেওয়া হয়নি',
      badgeClass: 'badge-homework-orange',
      progressPercent: 30,
      progressColor: '#f97316'
    },
    {
      id: 2,
      courseTitle: 'অ্যাডভান্সড ওয়েব ডিজাইন',
      assignmentTitle: 'অ্যাসাইনমেন্ট: রেসপনসিভ ই-কমার্স ওয়েবসাইট',
      dueDateBangla: 'জমার তারিখ: ৫ই মার্চ ২০২৪',
      statusBangla: 'সম্পন্ন হয়েছে',
      badgeClass: 'badge-homework-green',
      progressPercent: 100,
      progressColor: '#22c55e'
    },
    {
      id: 3,
      courseTitle: 'ইউজার এক্সপেরিয়েন্স রিসার্চ',
      assignmentTitle: 'অ্যাসাইনমেন্ট: ইউজেবিলিটি টেস্টিং রিপোর্ট',
      dueDateBangla: 'জমার তারিখ: ১৫ই এপ্রিল ২০২৪',
      statusBangla: 'কাজ চলছে',
      badgeClass: 'badge-homework-purple',
      progressPercent: 65,
      progressColor: '#a855f7'
    },
    {
      id: 4,
      courseTitle: 'ডিজিটাল ফটোগ্রাফি',
      assignmentTitle: 'অ্যাসাইনমেন্ট: ফটো জার্নালিজম প্রজেক্ট',
      dueDateBangla: 'জমার তারিখ: ৮ই এপ্রিল ২০২৪',
      statusBangla: 'শুরু হয়নি',
      badgeClass: 'badge-homework-red',
      progressPercent: 0,
      progressColor: '#ef4444'
    },
    {
      id: 5,
      courseTitle: 'থ্রিডি অ্যানিমেশন',
      assignmentTitle: 'অ্যাসাইনমেন্ট: ক্যারেক্টার ওয়াক-সাইকেল অ্যানিমেশন',
      dueDateBangla: 'জমার তারিখ: ২০শে মে ২০২৪',
      statusBangla: 'জমা দেওয়া হয়নি',
      badgeClass: 'badge-homework-orange',
      progressPercent: 20,
      progressColor: '#f97316'
    }
  ]);

  // Calendar dates representation for January 2024
  const calendarDays = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, '', '', '', '', ''
  ];

  // Calendar Events lookup in Bengali
  const calendarEventMap = {
    12: 'আজ: গ্রাফিক ফান্ডামেন্টালস লাইভ ক্লাস (সকাল ৯:০০) • ডিজাইন স্টুডিও এ',
    19: 'ইভেন্ট: বিএআইটি টেক হ্যাকাথন ওরিয়েন্টেশন কর্মশালা (বিকাল ৩:০০)',
    20: 'ইভেন্ট: ওয়েব ডিজাইন ইন্টারঅ্যাক্টিভ প্রজেক্ট ল্যাব সাবমিশন (রাত ১১:৫৯)',
    25: 'পরীক্ষা: গ্রাফিক ডিজাইন ফান্ডামেন্টালস মিড-টার্ম (সকাল ১০:০০)'
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedExams = [...examItems].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'date') {
      aVal = a.dateRaw;
      bVal = b.dateRaw;
    }
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleHwSubmit = (e) => {
    e.preventDefault();
    if (!hwRepoUrl) return;

    setHomeworkItems(prev => prev.map(hw => {
      if (hw.id === selectedHwModal.id) {
        return {
          ...hw,
          statusBangla: 'সম্পন্ন হয়েছে',
          badgeClass: 'badge-homework-green',
          progressPercent: 100,
          progressColor: '#22c55e'
        };
      }
      return hw;
    }));

    setHwSubmittedSuccess(true);
    setTimeout(() => {
      setHwSubmittedSuccess(false);
      setSelectedHwModal(null);
      setHwRepoUrl('');
    }, 1200);
  };

  const handleSendDoubt = (e) => {
    e.preventDefault();
    if (!doubtText) return;
    setDoubtSent(true);
    setTimeout(() => {
      setDoubtSent(false);
      setShowDoubtModal(false);
      setDoubtText('');
    }, 1500);
  };

  return (
    <div className="utopia-dashboard-layout">
      {/* ============================================================
          MAIN CONTENT COLUMN (LEFT ~72%)
          ============================================================ */}
      <div className="utopia-main-column">

        {/* TOP WELCOME GREETING & DATE IN BENGALI */}
        <div className="utopia-greeting-bar">
          <div className="utopia-greeting-text">
            <span className="utopia-wave-emoji" role="img" aria-label="wave">👋</span>
            <h1 className="utopia-greeting-heading">
              স্বাগতম, {studentName}!
            </h1>
          </div>
          <div className="utopia-greeting-date">
            ১০ই আগস্ট, ২০২৬, শনিবার
          </div>
        </div>

        {/* CLUB HERO BANNER IN BENGALI */}
        <section className="utopia-banner-card">
          <div className="utopia-banner-content">
            <h2 className="utopia-banner-title">
              সক্রিয় হোন – আজই বিএআইটি টেক ক্লাবে যুক্ত হোন!
            </h2>
            <p className="utopia-banner-desc">
              আপনার পছন্দের বিষয় নিয়ে কাজ করুন এবং সহপাঠীদের সাথে পরিচিত হোন। কোডিং, রোবোটিক্স, ইউআই/ইউএক্স বা অ্যানিমেশন—সবার জন্যই ক্লাব রয়েছে। নিজের কমিউনিটি খুঁজে নিন!
            </p>
            <button
              type="button"
              className="utopia-banner-btn"
              onClick={() => setShowClubModal(true)}
            >
              <span>আরও জানুন</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Banner Vector Illustration matching screenshot */}
          <div className="utopia-banner-graphic">
            <svg viewBox="0 0 320 180" className="utopia-banner-svg" fill="none">
              <circle cx="230" cy="90" r="70" fill="#FFF2E8" />
              <circle cx="110" cy="120" r="35" fill="#E8F4FF" />

              <rect x="70" y="35" width="46" height="26" rx="13" fill="#E2EDFF" />
              <circle cx="85" cy="48" r="2.5" fill="#5B93E8" />
              <circle cx="93" cy="48" r="2.5" fill="#5B93E8" />
              <circle cx="101" cy="48" r="2.5" fill="#5B93E8" />

              <rect x="135" y="42" width="34" height="26" rx="8" fill="#FFF9DF" />
              <path d="M152 49V59M147 54H157" stroke="#E5A122" strokeWidth="2" strokeLinecap="round" />

              <g transform="translate(180, 20)">
                <rect x="0" y="0" width="76" height="52" rx="14" fill="#FF8C42" />
                <path d="M22 52L16 62L32 52H22Z" fill="#FF8C42" />
                <path d="M28 26C28 22 34 20 38 25C42 20 48 22 48 26C48 32 38 38 38 38C38 38 28 32 28 26Z" fill="#FFFFFF" />
              </g>

              {/* Student 1 */}
              <g transform="translate(130, 75)">
                <path d="M15 50C15 35 25 28 38 28C51 28 61 35 61 50V75H15V50Z" fill="#EAE5F8" />
                <rect x="33" y="18" width="10" height="12" fill="#F8B195" rx="3" />
                <ellipse cx="38" cy="14" rx="11" ry="13" fill="#F8B195" />
                <path d="M26 12C26 3 34 -2 46 0C50 7 50 14 48 18C44 14 30 16 26 12Z" fill="#6C5B7B" />
              </g>

              {/* Student 2 */}
              <g transform="translate(195, 75)">
                <path d="M15 50C15 35 25 28 38 28C51 28 61 35 61 50V75H15V50Z" fill="#D35400" />
                <rect x="33" y="18" width="10" height="12" fill="#FAD7A0" rx="3" />
                <ellipse cx="38" cy="14" rx="11" ry="13" fill="#FAD7A0" />
                <path d="M26 10C26 2 36 -2 48 2C50 8 48 15 45 18C40 14 30 14 26 10Z" fill="#873600" />
              </g>
            </svg>
          </div>
        </section>

        {/* ENROLLED COURSES SECTION IN BENGALI */}
        <section className="utopia-section">
          <div className="utopia-section-header">
            <div className="utopia-section-title-wrap">
              <BookOpen size={18} className="utopia-section-icon" />
              <h2 className="utopia-section-title">এনরোল করা কোর্সসমূহ</h2>
            </div>
            <Link to="/student/courses" className="utopia-view-all-link">
              <span>সব দেখুন</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="utopia-courses-grid">
            {enrolledCourses.map((course) => (
              <Link
                to={course.link}
                key={course.id}
                className={`utopia-course-card ${course.cardTheme}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3 className="utopia-course-title">
                  {course.title}
                </h3>
                <div className="utopia-course-divider" />

                <div className="utopia-course-details">
                  <div className="utopia-course-line">
                    <User size={15} className="utopia-line-icon" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="utopia-course-line">
                    <Calendar size={15} className="utopia-line-icon" />
                    <span>{course.daysBangla}</span>
                  </div>
                  <div className="utopia-course-line">
                    <Clock size={15} className="utopia-line-icon" />
                    <span>{course.time}</span>
                  </div>
                  <div className="utopia-course-line">
                    <MapPin size={15} className="utopia-line-icon" />
                    <span>{course.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* EXAM BOARD SECTION IN BENGALI */}
        <section className="utopia-section">
          <div className="utopia-section-header">
            <div className="utopia-section-title-wrap">
              <GraduationCap size={19} className="utopia-section-icon" />
              <h2 className="utopia-section-title">এক্সাম ও মূল্যায়ন</h2>
            </div>
            <Link to="/student/exams" className="utopia-view-all-link">
              <span>সব দেখুন</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="utopia-table-container">
            <table className="utopia-exam-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} className="sortable-th">
                    পরীক্ষার নাম <span className="sort-arrows">⇅</span>
                  </th>
                  <th onClick={() => handleSort('course')} className="sortable-th">
                    কোর্স <span className="sort-arrows">⇅</span>
                  </th>
                  <th onClick={() => handleSort('date')} className="sortable-th">
                    তারিখ <span className="sort-arrows">⇅</span>
                  </th>
                  <th onClick={() => handleSort('time')} className="sortable-th">
                    সময় <span className="sort-arrows">⇅</span>
                  </th>
                  <th onClick={() => handleSort('location')} className="sortable-th">
                    স্থান <span className="sort-arrows">⇅</span>
                  </th>
                  <th onClick={() => handleSort('statusBangla')} className="sortable-th">
                    অবস্থা <span className="sort-arrows">⇅</span>
                  </th>
                  <th style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {sortedExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="cell-exam-name">{exam.name}</td>
                    <td className="cell-course">{exam.course}</td>
                    <td className="cell-date">{exam.date}</td>
                    <td className="cell-time">{exam.time}</td>
                    <td className="cell-location">{exam.location}</td>
                    <td className="cell-status">
                      <span className={`utopia-status-badge badge-${exam.statusType}`}>
                        {exam.statusBangla}
                      </span>
                    </td>
                    <td className="cell-actions">
                      <div className="utopia-row-menu-wrap">
                        <button
                          type="button"
                          className="utopia-row-menu-btn"
                          onClick={() => setActiveMenuRow(activeMenuRow === exam.id ? null : exam.id)}
                          aria-label="Actions"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {activeMenuRow === exam.id && (
                          <div className="utopia-dropdown-menu">
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => {
                                setActiveExamModal(exam);
                                setActiveMenuRow(null);
                              }}
                            >
                              সিলেবাস দেখুন
                            </button>
                            <Link
                              to="/student/exams"
                              className="dropdown-item"
                              onClick={() => setActiveMenuRow(null)}
                            >
                              পরীক্ষা হলে যান
                            </Link>
                            <Link
                              to="/student/class-routine"
                              className="dropdown-item"
                              onClick={() => setActiveMenuRow(null)}
                            >
                              রুটিন দেখুন
                            </Link>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      {/* ============================================================
          SIDEBAR RIGHT COLUMN (RIGHT ~28%)
          ============================================================ */}
      <div className="utopia-right-column">

        {/* 1. ENHANCED SEMESTER PROGRESS & CGPA */}
        <div className="utopia-widget-card" style={{ padding: '1rem 1.25rem', background: '#ffffff', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.86rem', color: '#1e293b', fontWeight: 700 }}>
              কুইজ ও এক্সাম <strong style={{ color: '#0284c7' }}>৮</strong> / ৮
            </span>
            <span style={{ fontSize: '0.74rem', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
              Result: ৯২% (A+)
            </span>
          </div>
          <div className="utopia-progress-bar-bg" style={{ marginBottom: '8px' }}>
            <div
              className="utopia-progress-bar-fill"
              style={{ width: `${(3 / 8) * 100}%`, background: '#0284c7' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
            <span>৩৭.৫% শিক্ষাবর্ষ সম্পন্ন</span>
            <span>৪৫ / ১২০ ক্রেডিট অর্জিত</span>
          </div>
        </div>

        {/* 2. TODAY'S NEXT LIVE CLASS COUNTDOWN & JOIN */}
        <div className="utopia-widget-card" style={{ padding: '1.15rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }} />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f87171', letterSpacing: '0.5px' }}>
                আজকের লাইভ ক্লাস
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.12)', color: '#93c5fd', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
              রাত ৯:০০ টা
            </span>
          </div>

          <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0', lineHeight: 1.35 }}>
            গ্রাফিক ফান্ডামেন্টালস: কালার থিওরি মাস্টারক্লাস
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '12px' }}>
            <User size={13} color="#94a3b8" />
            <span>প্রশিক্ষক: প্রফেসর স্মিথ • জুম রুম ০১</span>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>
              <Clock size={13} />
              <span>শুরু হতে বাকি: <strong>৩৫ মিনিট</strong></span>
            </div>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>অনলাইন সেশন</span>
          </div>

          <Link
            to="/student/attendance"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '9px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Video size={15} />
            <span>সরাসরি ক্লাসে যুক্ত হন</span>
          </Link>
        </div>

        {/* 3. STUDY STREAK & WEEKLY LEARNING GOALS */}
        <div className="utopia-widget-card" style={{ padding: '1.15rem', background: '#ffffff', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                <Flame size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  লার্নিং স্ট্রিক
                </h4>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>ধারাবাহিক পড়াশোনা</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
              <span>🔥 ৭ দিন টানা সক্রিয়</span>
            </div>
          </div>

          {/* Weekly Day Dots */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #edf2f7' }}>
            {[
              { day: 'সোম', active: true },
              { day: 'মঙ্গল', active: true },
              { day: 'বুধ', active: true },
              { day: 'বৃহ', active: true },
              { day: 'শুক্র', active: true },
              { day: 'শনি', active: true },
              { day: 'রবি', active: false }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '0.66rem', color: '#64748b', fontWeight: 500 }}>{item.day}</span>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: item.active ? '#dcfce7' : '#f1f5f9',
                  color: item.active ? '#15803d' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.62rem',
                  fontWeight: 800
                }}>
                  {item.active ? '✓' : '•'}
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Hours Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#475569', marginBottom: '4px' }}>
              <span>এই সপ্তাহে: <strong>১৮.৫ ঘণ্টা</strong></span>
              <span style={{ fontWeight: 700, color: '#0284c7' }}>টার্গেট: ২০ ঘণ্টা (৯২%)</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: '#0284c7', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        {/* 4. UPCOMING DEADLINES & EXAMS LIST */}
        <div className="utopia-widget-card" style={{ padding: '1.15rem', background: '#ffffff', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="#0284c7" /> আসন্ন জরুরি তারিখ
            </h4>
            <Link to="/student/class-routine" style={{ fontSize: '0.72rem', color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>
              সব দেখুন
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #0284c7' }}>
              <div style={{ textAlign: 'center', minWidth: '32px' }}>
                <div style={{ fontSize: '0.66rem', color: '#64748b', fontWeight: 600 }}>জানু</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>১৫</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  রিঅ্যাক্ট বেসিক্স অনলাইন কুইজ
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>ITD201 • দুপুর ০২:০০</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
              <div style={{ textAlign: 'center', minWidth: '32px' }}>
                <div style={{ fontSize: '0.66rem', color: '#64748b', fontWeight: 600 }}>ফেব্রু</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>১০</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  অ্যাসাইনমেন্ট ০১ জমার শেষ দিন
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>ART101 • রাত ১১:৫৯</div>
              </div>
            </div>
          </div>
        </div>

        {/* HOMEWORKS WIDGET IN BENGALI */}
        <div className="utopia-widget-card utopia-homeworks-widget">
          <div className="utopia-section-header" style={{ marginBottom: '1rem' }}>
            <div className="utopia-section-title-wrap">
              <ClipboardList size={18} className="utopia-section-icon" />
              <h2 className="utopia-section-title">অ্যাসাইনমেন্ট</h2>
            </div>
            <Link to="/student/assignments" className="utopia-view-all-link">
              <span>সব দেখুন</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          <div className="utopia-homeworks-list">
            {homeworkItems.map((hw) => (
              <div
                key={hw.id}
                className="utopia-hw-card"
                onClick={() => setSelectedHwModal(hw)}
                style={{ cursor: 'pointer', transition: 'border-color 0.15s ease' }}
              >
                <div className="utopia-hw-top">
                  <h4 className="utopia-hw-title">{hw.courseTitle}</h4>
                  <span className={`utopia-hw-badge ${hw.badgeClass}`}>
                    {hw.statusBangla}
                  </span>
                </div>

                <div className="utopia-hw-assignment">
                  {hw.assignmentTitle}
                </div>

                <div className="utopia-hw-due">
                  {hw.dueDateBangla}
                </div>

                {/* Progress bar line with end-dot indicator matching screenshot */}
                <div className="utopia-hw-progress-track">
                  <div
                    className="utopia-hw-progress-fill"
                    style={{
                      width: `${Math.max(hw.progressPercent, 12)}%`,
                      backgroundColor: hw.progressColor
                    }}
                  >
                    <span
                      className="utopia-hw-dot"
                      style={{ backgroundColor: hw.progressColor }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FLOATING QUICK DOUBT ACTION BUTTON */}
      <button
        type="button"
        className="utopia-floating-help-btn"
        onClick={() => setShowDoubtModal(true)}
        title="মেন্টর হেল্পডেস্ক"
      >
        <Headphones size={20} />
        <span>মেন্টর সহায়তা</span>
      </button>

      {/* QUICK DOUBT SOLVE MODAL */}
      {showDoubtModal && (
        <div className="utopia-modal-backdrop" onClick={() => setShowDoubtModal(false)}>
          <div className="utopia-modal-box" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <Headphones size={18} color="#0284c7" />
                <h3>মেন্টর ডাউট সলভ হেল্পডেস্ক</h3>
              </div>
              <button
                type="button"
                className="utopia-modal-close"
                onClick={() => setShowDoubtModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              {!doubtSent ? (
                <form onSubmit={handleSendDoubt} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>
                    কোনো কোডিং বাগ বা অ্যাসাইনমেন্টে সমস্যা হচ্ছে? নিচে লিখুন, মেন্টর লাইভ রুমে সমাধান করে দেবেন:
                  </p>
                  <textarea
                    rows={3}
                    required
                    placeholder="আপনার প্রশ্ন বা সমস্যা এখানে লিখুন..."
                    value={doubtText}
                    onChange={(e) => setDoubtText(e.target.value)}
                    className="utopia-input"
                  />
                  <div className="utopia-modal-footer" style={{ padding: '0.5rem 0 0 0', background: 'transparent' }}>
                    <button
                      type="button"
                      onClick={() => setShowDoubtModal(false)}
                      className="utopia-btn-secondary"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="utopia-btn-primary"
                    >
                      <Send size={14} />
                      <span>প্রশ্ন পাঠান</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={44} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>প্রশ্ন পাঠানো হয়েছে!</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.82rem' }}>
                    মেন্টর টিম শীঘ্রই আপনার সাথে ডিসকর্ড বা গুগল মিট ভয়েস রুমে যোগাযোগ করবে।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QUICK HOMEWORK SUBMIT MODAL */}
      {selectedHwModal && (
        <div className="utopia-modal-backdrop" onClick={() => setSelectedHwModal(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <UploadCloud size={18} color="#0284c7" />
                <h3>অ্যাসাইনমেন্ট জমা দিন</h3>
              </div>
              <button
                type="button"
                className="utopia-modal-close"
                onClick={() => setSelectedHwModal(null)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              {!hwSubmittedSuccess ? (
                <form onSubmit={handleHwSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>{selectedHwModal.assignmentTitle}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{selectedHwModal.courseTitle} • {selectedHwModal.dueDateBangla}</span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      গিটহাব রিপো বা লাইভ প্রিভিউ ইউআরএল *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/my-profile/project"
                      value={hwRepoUrl}
                      onChange={(e) => setHwRepoUrl(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div className="utopia-modal-footer" style={{ padding: '0.5rem 0 0 0', background: 'transparent' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedHwModal(null)}
                      className="utopia-btn-secondary"
                    >
                      বন্ধ করুন
                    </button>
                    <button
                      type="submit"
                      className="utopia-btn-primary"
                    >
                      <UploadCloud size={15} />
                      <span>জমা দিন (Submit)</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={44} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>অ্যাসাইনমেন্ট সফলভাবে জমা নেওয়া হয়েছে!</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.82rem' }}>
                    ড্যাশবোর্ডে স্ট্যাটাস 'সম্পন্ন হয়েছে' হিসেবে চিহ্নিত করা হয়েছে।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EXAM SYLLABUS MODAL */}
      {activeExamModal && (
        <div className="utopia-modal-backdrop" onClick={() => setActiveExamModal(null)}>
          <div className="utopia-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <GraduationCap size={18} color="#0d1b2a" />
                <h3>{activeExamModal.name}</h3>
              </div>
              <button
                type="button"
                className="utopia-modal-close"
                onClick={() => setActiveExamModal(null)}
              >
                &times;
              </button>
            </div>
            <div className="utopia-modal-body">
              <p style={{ margin: '0 0 8px 0', fontSize: '0.86rem', color: '#64748b' }}>
                কোর্স: <strong>{activeExamModal.course}</strong> • তারিখ: <strong>{activeExamModal.date}</strong> ({activeExamModal.time})
              </p>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
                এই পরীক্ষার মোট নম্বর <strong>{activeExamModal.totalMarks}</strong>। পরীক্ষার স্থান: <strong>{activeExamModal.location}</strong>। পরীক্ষার প্রয়োজনীয় প্রস্তুতি ও সিলেবাস পর্যালোচনা করতে পরীক্ষা বোর্ড ট্যাবে প্রবেশ করুন।
              </div>
            </div>
            <div className="utopia-modal-footer">
              <Link
                to="/student/exams"
                className="utopia-btn-primary"
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveExamModal(null)}
              >
                পরীক্ষা বোর্ডে যান &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CLUB POPUP MODAL */}
      {showClubModal && (
        <div className="utopia-modal-backdrop" onClick={() => setShowClubModal(false)}>
          <div className="utopia-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <Users size={20} color="#0d1b2a" />
                <h3>বিএআইটি শিক্ষার্থী টেক ক্লাবস</h3>
              </div>
              <button
                type="button"
                className="utopia-modal-close"
                onClick={() => setShowClubModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="utopia-modal-body">
              {!clubJoinSuccess ? (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: '#475569' }}>
                    আপনার পছন্দের ক্লাবে যুক্ত হয়ে দক্ষতা বাড়ান এবং সাপ্তাহিক কোডিং চ্যালেঞ্জ ও হ্যাকাথনে অংশ নিন!
                  </p>
                  <div className="utopia-modal-clubs-grid">
                    <div className="modal-club-item">
                      <strong>🎨 ডিজাইন ও ক্রিয়েটিভ আর্টস ক্লাব</strong>
                      <span>ইউআই/ইউএক্স, থ্রিডি মডেলিং ও গ্রাফিক কর্মশালা।</span>
                    </div>
                    <div className="modal-club-item">
                      <strong>💻 ওয়েব ও সফটওয়্যার ডেভেলপারস গিল্ড</strong>
                      <span>ফ্রন্টএন্ড, ফুলস্ট্যাক ও প্রোগ্রামিং প্রজেক্ট।</span>
                    </div>
                    <div className="modal-club-item">
                      <strong>🤖 এআই ও মেশিন লার্নিং সার্কেল</strong>
                      <span>পাইথন, কম্পিউটার ভিশন ও ডেটা সায়েন্স প্রজেক্ট।</span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={46} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>ক্লাব সদস্যপদ নিশ্চিত হয়েছে!</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.84rem' }}>
                    আপনাকে বিএআইটি টেক ক্লাবের অফিশিয়াল কমিউনিটিতে আমন্ত্রণ লিংক পাঠানো হয়েছে।
                  </p>
                </div>
              )}
            </div>
            <div className="utopia-modal-footer">
              {!clubJoinSuccess ? (
                <button
                  type="button"
                  className="utopia-banner-btn"
                  onClick={() => {
                    setClubJoinSuccess(true);
                    setTimeout(() => {
                      setClubJoinSuccess(false);
                      setShowClubModal(false);
                    }, 1500);
                  }}
                >
                  যুক্ত হোন (বিনামূল্যে)
                </button>
              ) : (
                <button
                  type="button"
                  className="utopia-btn-primary"
                  onClick={() => setShowClubModal(false)}
                >
                  বন্ধ করুন
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
