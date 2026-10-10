import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Video, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  User, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function LiveClasses() {
  const [markedToday, setMarkedToday] = useState(false);
  const [activeTab, setActiveTab] = useState('attendance');

  const attendanceLog = [
    { date: '১২ জানুয়ারি ২০২৪ (আজ)', course: 'গ্রাফিক ফান্ডামেন্টালস - ART101', status: 'উপস্থিত', time: 'সকাল ৯:০৫', location: 'ডিজাইন স্টুডিও এ' },
    { date: '১০ জানুয়ারি ২০২৪', course: 'থ্রিডি অ্যানিমেশন টেকনিকস - ANI301', status: 'উপস্থিত', time: 'দুপুর ২:০০', location: 'অ্যানিমেশন স্টুডিও' },
    { date: '০৯ জানুয়ারি ২০২৪', course: 'অ্যাডভান্সড ওয়েব ডিজাইন - ITD201', status: 'উপস্থিত', time: 'দুপুর ১:৩২', location: 'কম্পিউটার ল্যাব ৩' },
    { date: '০৮ জানুয়ারি ২০২৪', course: 'ইউজার এক্সপেরিয়েন্স রিসার্চ - UXD301', status: 'উপস্থিত', time: 'সকাল ১১:০০', location: 'ডিজাইন ল্যাব ২' },
    { date: '০৫ জানুয়ারি ২০২৪', course: 'প্রবলেম সলভিং ওয়ার্কশপ', status: 'উপস্থিত', time: 'বিকাল ৪:১০', location: 'ডিসকর্ড ভয়েস রুম' },
    { date: '০৩ জানুয়ারি ২০২৪', course: 'গ্রাফিক ফান্ডামেন্টালস - ART101', status: 'বিলম্বিত', time: 'সকাল ৯:২৫', location: 'ডিজাইন স্টুডিও এ' },
    { date: '০২ জানুয়ারি ২০২৪', course: 'অ্যাডভান্সড ওয়েব ডিজাইন - ITD201', status: 'উপস্থিত', time: 'দুপুর ১:৩০', location: 'কম্পিউটার ল্যাব ৩' }
  ];

  const liveSchedule = [
    {
      id: 1,
      title: 'গ্রাফিক ফান্ডামেন্টালস (কালার থিওরি মাস্টারক্লাস)',
      instructor: 'প্রফেসর স্মিথ',
      time: 'সোমবার, সকাল ৯:০০ - ১০:৩০',
      status: 'upcoming',
      room: 'ডিজাইন স্টুডিও এ (জুম রুম ১)',
      link: 'https://zoom.us/j/bait-art101'
    },
    {
      id: 2,
      title: 'অ্যাডভান্সড ওয়েব ডিজাইন (রিঅ্যাক্ট কাস্টম হুকস ও কনটেক্সট)',
      instructor: 'ড. জনসন',
      time: 'মঙ্গলবার, দুপুর ১:৩০ - ৩:০০',
      status: 'upcoming',
      room: 'কম্পিউটার ল্যাব ৩ (জুম রুম ২)',
      link: 'https://zoom.us/j/bait-itd201'
    },
    {
      id: 3,
      title: 'থ্রিডি অ্যানিমেশন টেকনিকস (ক্যারেক্টার রিগিং ও বোনস)',
      instructor: 'ড. মার্টিনেজ',
      time: 'বুধবার, দুপুর ২:০০ - ৫:০০',
      status: 'upcoming',
      room: 'অ্যানিমেশন স্টুডিও (জুম রুম ৩)',
      link: 'https://zoom.us/j/bait-ani301'
    }
  ];

  const handlePunchIn = () => {
    setMarkedToday(true);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CalendarCheck size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">এটেন্ডেন্স ও লাইভ ক্লাসেস (হাজিরা ট্র্যাকার)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টার ৩ এর সকল ক্লাসের হাজিরা রিপোর্ট, ডিজিটাল পাঞ্চ-ইন এবং সরাসরি লাইভ ক্লাস সেশন।
          </p>
        </div>

        <div>
          {!markedToday ? (
            <button
              type="button"
              onClick={handlePunchIn}
              className="utopia-btn-primary"
            >
              <CheckCircle2 size={16} />
              <span>আজকের হাজিরা দিন (Punch-In)</span>
            </button>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} />
              <span>আজকের উপস্থিতি নিশ্চিত হয়েছে!</span>
            </div>
          )}
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            সামগ্রিক হাজিরা শতাংশ (Attendance)
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', margin: '4px 0' }}>
            ৯২.৪%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> নিরাপদ অঞ্চল (ন্যূনতম ৭৫% প্রয়োজন)
          </div>
        </div>

        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            উপস্থিত থাকা মোট ক্লাস
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
            ৩৬ <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ ৩৯টি ক্লাস</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            ৩টি ক্লাসে ছুটির আবেদন অনুমোদিত হয়েছে
          </div>
        </div>

        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            বর্তমান সেমিস্টার স্ট্যাটাস
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7', margin: '6px 0' }}>
            নিয়মিত শিক্ষার্থী
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            পরীক্ষার প্রবেশপত্র পাওয়ার জন্য মনোনীত
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="utopia-filter-card" style={{ justifyContent: 'flex-start', gap: '8px' }}>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          হাজিরা লগ (সাম্প্রতিক উপস্থিতি)
        </button>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          আসন্ন লাইভ ক্লাসেস
        </button>
      </div>

      {activeTab === 'attendance' ? (
        /* Attendance Table */
        <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="utopia-table-container">
            <table className="utopia-exam-table">
              <thead>
                <tr>
                  <th>তারিখ</th>
                  <th>কোর্সের নাম</th>
                  <th>হাজিরা রেকর্ড সময়</th>
                  <th>স্থান</th>
                  <th style={{ textAlign: 'center' }}>হাজিরার অবস্থা</th>
                </tr>
              </thead>
              <tbody>
                {attendanceLog.map((log, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong style={{ color: '#0f172a', fontSize: '0.84rem' }}>{log.date}</strong>
                    </td>
                    <td>
                      <span style={{ color: '#334155', fontSize: '0.84rem' }}>{log.course}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.82rem' }}>
                        <Clock size={13} />
                        <span>{log.time}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: '#475569' }}>
                        {log.location}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge-status ${log.status === 'উপস্থিত' ? 'badge-completed' : 'badge-upcoming'}`}>
                        {log.status === 'উপস্থিত' ? '✓ উপস্থিত' : '⚠ বিলম্বিত'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Live Classes Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {liveSchedule.map(cls => (
            <div key={cls.id} className="utopia-card">
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#0f172a' }}>{cls.title}</h3>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="#0284c7" />
                  <span><strong>প্রশিক্ষক:</strong> {cls.instructor}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#0284c7" />
                  <span><strong>সময়:</strong> {cls.time}</span>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', color: '#475569', marginBottom: '1rem' }}>
                {cls.room}
              </div>

              <a 
                href={cls.link}
                target="_blank"
                rel="noreferrer"
                className="utopia-btn-primary"
                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
              >
                <Video size={16} />
                <span>জুম রুমে প্রবেশ করুন</span>
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
