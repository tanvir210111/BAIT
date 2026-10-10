import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  PlayCircle, CheckCircle2, FileText, Download, 
  ExternalLink, Video, Clock, BookOpen, Check 
} from 'lucide-react';

export default function CourseLearning() {
  const { id } = useParams();
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [markedDone, setMarkedDone] = useState(false);

  const lessons = [
    { id: 1, title: 'মডিউল ০১: কোর্স ওরিয়েন্টেশন ও ডেভেলপমেন্ট এনভায়রনমেন্ট সেটআপ', duration: '১ ঘণ্টা ৪৫ মিনিট', completed: true },
    { id: 2, title: 'মডিউল ০২: মডার্ন জাভাস্ক্রিপ্ট (ES6+): অ্যারো ফাংশন, ডি-স্ট্রাকচারিং ও মডিউলস', duration: '২ ঘণ্টা ১০ মিনিট', completed: true },
    { id: 3, title: 'মডিউল ০৩: অ্যাসিঙ্ক জাভাস্ক্রিপ্ট: প্রমিজ, অ্যাসিঙ্ক/অ্যাওয়েট ও এপিআই ফেচিং', duration: '১ ঘণ্টা ৫৫ মিনিট', completed: true },
    { id: 4, title: 'মডিউল ০৪: রিঅ্যাক্ট কোর: জেএসএক্স, কম্পোনেন্ট, প্রপস পাসিং ও স্টেট', duration: '২ ঘণ্টা ০৫ মিনিট', completed: true },
    { id: 5, title: 'মডিউল ০৫: অ্যাডভান্সড হুকস: useState, useEffect, useRef ও কাস্টম হুকস', duration: '২ ঘণ্টা ১৫ মিনিট', completed: false },
    { id: 6, title: 'মডিউল ০৬: রিঅ্যাক্ট রাউটার v7 ও রেসপনসিভ ড্যাশবোর্ড আর্কিটেকচার', duration: '১ ঘণ্টা ৫০ মিনিট', completed: false },
    { id: 7, title: 'মডিউল ০৭: রেড্যাক্স টুলকিট (RTK) ও গ্লোবাল স্টেট ম্যানেজমেন্ট', duration: '২ ঘণ্টা ২০ মিনিট', completed: false }
  ];

  const activeLesson = lessons[activeLessonIndex] || lessons[0];

  const handleMarkComplete = () => {
    setMarkedDone(true);
    setTimeout(() => setMarkedDone(false), 2500);
  };

  return (
    <div className="utopia-page-container">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0d1b2a 0%, #1e3a8a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            boxShadow: '0 4px 10px rgba(13, 27, 42, 0.12)',
            flexShrink: 0
          }}>
            <Video size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>
              গ্রাফিক ফান্ডামেন্টালস ও ফুল-স্ট্যাক ক্লাসরুম (ART101)
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              প্রশিক্ষক: প্রফেসর স্মিথ এবং প্রকৌশলী তানভীর আহমেদ • সেমিস্টার ৩
            </span>
          </div>
        </div>

        <button 
          type="button" 
          onClick={handleMarkComplete}
          className="utopia-btn-primary"
        >
          <CheckCircle2 size={16} />
          <span>{markedDone ? 'সম্পন্ন হিসেবে চিহ্নিত!' : 'ক্লাস সম্পন্ন মার্ক করুন'}</span>
        </button>
      </div>

      {/* 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Column: Video Player & Resources */}
        <div>
          <div style={{ 
            background: '#0d1b2a', 
            borderRadius: '12px', 
            height: '420px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#ffffff',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <PlayCircle size={68} color="#ffffff" strokeWidth={1.5} style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }} />
            <h3 style={{ margin: '1rem 0 6px 0', fontSize: '1.15rem', color: '#ffffff' }}>
              {activeLesson.title}
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              এইচডি ভিডিও রেকর্ডিং • সময়কাল: {activeLesson.duration}
            </span>
          </div>

          <div className="utopia-card" style={{ marginTop: '1.25rem', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#0f172a' }}>
              ক্লাস রিসোর্স ও প্র্যাকটিস সোর্স কোড
            </h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: '#64748b' }}>
              এই মডিউলের প্রয়োজনীয় সোর্স কোড, ফিগমা ডিজাইন ফাইল এবং লেকচার নোটস:
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="utopia-btn-outline-sm"
              >
                <ExternalLink size={14} />
                <span>গিটহাব সোর্স কোড রিপোজিটরি</span>
              </a>
              <button 
                type="button" 
                className="utopia-btn-outline-sm"
                onClick={() => alert('লেকচার স্লাইড PDF ডাউনলোড শুরু হয়েছে!')}
              >
                <Download size={14} />
                <span>লেকচার স্লাইড (পিডিএফ)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Playlist Syllabus */}
        <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #edf2f7', background: '#f8fafc' }}>
            <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
              কোর্স সিলেবাস ({lessons.length}টি মডিউল)
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
              ৪টি মডিউল সম্পন্ন (৫৭%)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {lessons.map((lesson, idx) => {
              const isActive = idx === activeLessonIndex;
              return (
                <div 
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  style={{
                    padding: '0.9rem 1.2rem',
                    borderBottom: '1px solid #f1f5f9',
                    background: isActive ? '#f0fdf4' : '#ffffff',
                    borderLeft: isActive ? '3px solid #059669' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <div style={{ marginTop: '2px' }}>
                    {lesson.completed ? (
                      <Check size={16} color="#059669" />
                    ) : (
                      <PlayCircle size={16} color={isActive ? '#059669' : '#94a3b8'} />
                    )}
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.82rem', color: isActive ? '#059669' : '#0f172a', display: 'block', lineHeight: 1.4 }}>
                      {lesson.title}
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      {lesson.duration}
                    </span>
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
