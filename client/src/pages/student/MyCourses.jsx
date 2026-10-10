import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Calendar, Clock, MapPin, User, Search } from 'lucide-react';

export default function MyCourses() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const enrolledCoursesList = [
    {
      id: 1,
      code: 'ART101',
      title: 'গ্রাফিক ফান্ডামেন্টালস - ART101',
      instructor: 'প্রফেসর স্মিথ',
      daysBangla: 'সোমবার ও বুধবার',
      time: 'সকাল ৯:০০ - ১০:৩০',
      location: 'ডিজাইন স্টুডিও এ',
      cardTheme: 'theme-purple',
      progress: 68,
      lessons: '৩৬টির মধ্যে ২৪টি মডিউল সম্পন্ন',
      status: 'active',
      desc: 'ভিজ্যুয়াল ব্যালেন্স, কালার থিওরি, টাইপোগ্রাফি হায়ারার্কি ও আধুনিক লেআউট ডিজাইন।'
    },
    {
      id: 2,
      code: 'ITD201',
      title: 'অ্যাডভান্সড ওয়েব ডিজাইন - ITD201',
      instructor: 'ড. জনসন',
      daysBangla: 'মঙ্গলবার ও বৃহস্পতিবার',
      time: 'দুপুর ১:৩০ - ৩:০০',
      location: 'কম্পিউটার ল্যাব ৩',
      cardTheme: 'theme-yellow',
      progress: 82,
      lessons: '৪০টির মধ্যে ৩২টি মডিউল সম্পন্ন',
      status: 'active',
      desc: 'আধুনিক সিএসএস আর্কিটেকচার, রেসপনসিভ গ্রিড, রিঅ্যাক্ট স্টেট ও লাইভ ওয়েব অ্যাপ্লিকেশন।'
    },
    {
      id: 3,
      code: 'UXD301',
      title: 'ইউজার এক্সপেরিয়েন্স রিসার্চ - UXD301',
      instructor: 'প্রফেসর ডেভিস',
      daysBangla: 'সোমবার ও শনিবার',
      time: 'সকাল ১১:০০ - ১২:৩০',
      location: 'ডিজাইন ল্যাব ২',
      cardTheme: 'theme-cyan',
      progress: 55,
      lessons: '৩২টির মধ্যে ১৮টি মডিউল সম্পন্ন',
      status: 'active',
      desc: 'গুণগত ব্যবহারকারী গবেষণা, ফিগমা ডিজাইন সিস্টেম ও ইউজার ইন্টারফেস মূল্যায়ন।'
    },
    {
      id: 4,
      code: 'ANI301',
      title: 'থ্রিডি অ্যানিমেশন টেকনিকস - ANI301',
      instructor: 'ড. মার্টিনেজ',
      daysBangla: 'বুধবার',
      time: 'দুপুর ২:০০ - ৫:০০',
      location: 'অ্যানিমেশন স্টুডিও',
      cardTheme: 'theme-green',
      progress: 40,
      lessons: '৩০টির মধ্যে ১২টি মডিউল সম্পন্ন',
      status: 'active',
      desc: 'ক্যারেক্টার ওয়াক-সাইকেল অ্যানিমেশন, ফিজিক্স রেন্ডারিং, কার্ভ এডিটর ও দৃশ্য পরিচালনা।'
    }
  ];

  const filteredCourses = enrolledCoursesList.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BookOpen size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">আমার কোর্স (ভর্তিকৃত কোর্সসমূহ)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টার ৩ এ আপনার নিবন্ধিত ৪টি মূল অ্যাকাডেমিক বিষয় ও লেকচার মডিউল।
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="utopia-filter-card">
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className={`utopia-day-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            সকল কোর্স ({enrolledCoursesList.length})
          </button>
          <button
            type="button"
            className={`utopia-day-pill ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            চলমান কোর্সসমূহ
          </button>
        </div>

        <div className="utopia-table-search">
          <Search size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="কোর্স বা প্রশিক্ষক খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="utopia-courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className={`utopia-course-card ${course.cardTheme}`}>
            {/* Top Body Content */}
            <div className="utopia-course-card-body">
              <h3 className="utopia-course-title">
                {course.title}
              </h3>

              <div className="utopia-course-divider" />

              <p className="utopia-course-desc">
                {course.desc}
              </p>

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
            </div>

            {/* Bottom Footer Content (Pinned horizontally) */}
            <div className="utopia-course-card-footer">
              <div>
                <div className="utopia-course-progress-header">
                  <span>অগ্রগতি: {course.progress}%</span>
                  <span>{course.lessons}</span>
                </div>
                <div className="utopia-course-progress-track">
                  <div 
                    className="utopia-course-progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <Link
                to={`/student/courses/${course.id}`}
                className="utopia-course-btn"
              >
                <PlayCircle size={15} />
                <span>কোর্স প্ল্যান ও ভিডিও লেকচারে যান</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
