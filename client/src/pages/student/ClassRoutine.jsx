import React, { useState } from 'react';
import { Calendar, Clock, Video, UserCheck, Download, ExternalLink, Search, CheckCircle2 } from 'lucide-react';

export default function ClassRoutine() {
  const [selectedDay, setSelectedDay] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [joiningClass, setJoiningClass] = useState(null);

  const daysList = [
    { key: 'all', label: 'সকল দিন' },
    { key: 'সোমবার', label: 'সোমবার' },
    { key: 'মঙ্গলবার', label: 'মঙ্গলবার' },
    { key: 'বুধবার', label: 'বুধবার' },
    { key: 'বৃহস্পতিবার', label: 'বৃহস্পতিবার' },
    { key: 'শুক্রবার', label: 'শুক্রবার' },
    { key: 'শনিবার', label: 'শনিবার' }
  ];

  const routineItems = [
    {
      id: 1,
      day: 'সোমবার',
      time: 'সকাল ৯:০০ - ১০:৩০',
      courseCode: 'ART101',
      course: 'গ্রাফিক ফান্ডামেন্টালস',
      instructor: 'প্রফেসর স্মিথ',
      room: 'ডিজাইন স্টুডিও এ',
      type: 'স্টুডিও প্র্যাকটিক্যাল ল্যাব',
      zoomLink: 'https://zoom.us/j/bait-art101',
      passcode: 'BAIT2024'
    },
    {
      id: 2,
      day: 'সোমবার',
      time: 'সকাল ১১:০০ - ১২:৩০',
      courseCode: 'UXD301',
      course: 'ইউজার এক্সপেরিয়েন্স রিসার্চ',
      instructor: 'প্রফেসর ডেভিস',
      room: 'ডিজাইন ল্যাব ২',
      type: 'ইন্টারঅ্যাক্টিভ লেকচার',
      zoomLink: 'https://zoom.us/j/bait-uxd301',
      passcode: 'BAIT2024'
    },
    {
      id: 3,
      day: 'মঙ্গলবার',
      time: 'দুপুর ১:৩০ - ৩:০০',
      courseCode: 'ITD201',
      course: 'অ্যাডভান্সড ওয়েব ডিজাইন',
      instructor: 'ড. জনসন',
      room: 'কম্পিউটার ল্যাব ৩',
      type: 'হ্যান্ডস-অন কোডিং সেশন',
      zoomLink: 'https://zoom.us/j/bait-itd201',
      passcode: 'BAIT2024'
    },
    {
      id: 4,
      day: 'বুধবার',
      time: 'সকাল ৯:০০ - ১০:৩০',
      courseCode: 'ART101',
      course: 'গ্রাফিক ফান্ডামেন্টালস',
      instructor: 'প্রফেসর স্মিথ',
      room: 'ডিজাইন স্টুডিও এ',
      type: 'রিভিউ ও ফিডব্যাক সেশন',
      zoomLink: 'https://zoom.us/j/bait-art101',
      passcode: 'BAIT2024'
    },
    {
      id: 5,
      day: 'বুধবার',
      time: 'দুপুর ২:০০ - ৫:০০',
      courseCode: 'ANI301',
      course: 'থ্রিডি অ্যানিমেশন টেকনিকস',
      instructor: 'ড. মার্টিনেজ',
      room: 'অ্যানিমেশন স্টুডিও',
      type: 'প্র্যাকটিক্যাল রেন্ডারিং ল্যাব',
      zoomLink: 'https://zoom.us/j/bait-ani301',
      passcode: 'BAIT2024'
    },
    {
      id: 6,
      day: 'বৃহস্পতিবার',
      time: 'দুপুর ১:৩০ - ৩:০০',
      courseCode: 'ITD201',
      course: 'অ্যাডভান্সড ওয়েব ডিজাইন',
      instructor: 'ড. জনসন',
      room: 'কম্পিউটার ল্যাব ৩',
      type: 'লাইভ প্রজেক্ট ডেভেলপমেন্ট',
      zoomLink: 'https://zoom.us/j/bait-itd201',
      passcode: 'BAIT2024'
    },
    {
      id: 7,
      day: 'শুক্রবার',
      time: 'বিকাল ৪:০০ - ৬:০০',
      courseCode: 'DEV-SOLVE',
      course: 'প্রবলেম সলভিং ও কোড রিভিউ',
      instructor: 'সিনিয়র মেন্টর টিম',
      room: 'ডিসকর্ড ভয়েস ও ভিডিও রুম',
      type: 'সরাসরি ডাউট সলভ ক্লিনিক',
      zoomLink: 'https://discord.gg/bait-community',
      passcode: 'কোন পাসকোড প্রয়োজন নেই'
    },
    {
      id: 8,
      day: 'শনিবার',
      time: 'সকাল ১১:০০ - ১২:৩০',
      courseCode: 'UXD301',
      course: 'ইউজার এক্সপেরিয়েন্স রিসার্চ',
      instructor: 'প্রফেসর ডেভিস',
      room: 'ডিজাইন ল্যাব ২',
      type: 'কেস স্টাডি ওয়ার্কশপ',
      zoomLink: 'https://zoom.us/j/bait-uxd301',
      passcode: 'BAIT2024'
    }
  ];

  const filteredRoutine = routineItems.filter(item => {
    const matchDay = selectedDay === 'all' || item.day === selectedDay;
    const matchSearch = item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDay && matchSearch;
  });

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleJoinClass = (item) => {
    setJoiningClass(item);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Calendar size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">সাপ্তাহিক ক্লাস রুটিন (সময়সূচি)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টার ৩ এর সকল লাইভ ক্লাস, ল্যাব সেশন এবং সমস্যা সমাধান সেশনের সময়সূচি।
          </p>
        </div>

        <button 
          type="button" 
          className="utopia-btn-primary"
          onClick={handleDownloadPdf}
        >
          <Download size={16} />
          <span>রুটিন পিডিএফ ডাউনলোড করুন</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="utopia-alert-banner success">
          <CheckCircle2 size={18} />
          <span>সাপ্তাহিক ক্লাস রুটিন PDF ফাইল ডাউনলোড শুরু হয়েছে!</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="utopia-filter-card">
        <div className="utopia-day-pills">
          {daysList.map(day => (
            <button
              key={day.key}
              type="button"
              className={`utopia-day-pill ${selectedDay === day.key ? 'active' : ''}`}
              onClick={() => setSelectedDay(day.key)}
            >
              {day.label}
            </button>
          ))}
        </div>

        <div className="utopia-table-search">
          <Search size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="কোর্স বা প্রশিক্ষক খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Routine Table Card */}
      <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="utopia-table-container">
          <table className="utopia-exam-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>বার / দিন</th>
                <th style={{ width: '160px' }}>সময়</th>
                <th>কোর্স ও কোড</th>
                <th>প্রশিক্ষক</th>
                <th>রুম / মাধ্যম</th>
                <th>সেশনের ধরন</th>
                <th style={{ textAlign: 'center', width: '140px' }}>লাইভ লিংক</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutine.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    এই দিনে কোনো নির্ধারিত ক্লাস খুঁজে পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredRoutine.map(item => (
                  <tr key={item.id}>
                    <td>
                      <span className="utopia-day-badge">
                        {item.day}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#334155' }}>
                        <Clock size={14} color="#0284c7" />
                        <span>{item.time}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ color: '#0f172a', fontSize: '0.86rem' }}>{item.course}</strong>
                        <span style={{ fontSize: '0.74rem', color: '#64748b' }}>কোড: {item.courseCode}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
                        <UserCheck size={15} color="#64748b" />
                        <span>{item.instructor}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {item.room}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => handleJoinClass(item)}
                        className="utopia-btn-sm"
                      >
                        <Video size={13} />
                        <span>যুক্ত হোন</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Join Class Modal */}
      {joiningClass && (
        <div className="utopia-modal-backdrop" onClick={() => setJoiningClass(null)}>
          <div className="utopia-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <Video size={20} color="#0284c7" />
                <h3>লাইভ ক্লাসে সংযুক্ত হোন</h3>
              </div>
              <button 
                type="button" 
                className="utopia-modal-close"
                onClick={() => setJoiningClass(null)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              <div style={{ marginBottom: '1.2rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem' }}>{joiningClass.course}</h4>
                <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span><strong>প্রশিক্ষক:</strong> {joiningClass.instructor}</span>
                  <span><strong>সময়:</strong> {joiningClass.day}, {joiningClass.time}</span>
                  <span><strong>রুম:</strong> {joiningClass.room}</span>
                  <span><strong>পাসকোড:</strong> <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{joiningClass.passcode}</code></span>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569' }}>
                ক্লাস শুরু হওয়ার ৫ মিনিট পূর্বে রুম সক্রিয় হয়। মাইক্রোফোন ও ক্যামেরা চেক করে রাখুন।
              </p>
            </div>

            <div className="utopia-modal-footer">
              <button 
                type="button" 
                className="utopia-btn-secondary" 
                onClick={() => setJoiningClass(null)}
              >
                বন্ধ করুন
              </button>
              <a 
                href={joiningClass.zoomLink} 
                target="_blank" 
                rel="noreferrer"
                className="utopia-btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <span>লাইভ রুমে প্রবেশ করুন</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
