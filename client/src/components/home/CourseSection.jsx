import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Filter, Search, ChevronRight } from 'lucide-react';
import CourseCard from '../course/CourseCard';

export default function CourseSection({ courses = [] }) {
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courseCategories = [
    { id: 'all', name: 'সকল কোর্স' },
    { id: 'web', name: 'ওয়েব ডেভেলপমেন্ট' },
    { id: 'app', name: 'মোবাইল অ্যাপস' },
    { id: 'design', name: 'গ্রাফিক ও ইউআই/ইউএক্স' },
    { id: 'security', name: 'সাইবার সিকিউরিটি' },
    { id: 'data', name: 'ডেটা ও মার্কেটিং' },
  ];

  const filteredCourses = courses.filter(course => {
    const query = courseSearch.trim().toLowerCase();
    const matchesSearch = !query || 
      (course.title_bn && course.title_bn.toLowerCase().includes(query)) ||
      (course.description && course.description.toLowerCase().includes(query)) ||
      (course.batch_info && course.batch_info.toLowerCase().includes(query));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'all') return true;
    
    const text = ((course.title_bn || '') + ' ' + (course.description || '')).toLowerCase();

    if (selectedCategory === 'web') {
      return text.includes('ওয়েব') || text.includes('ফ্রন্টএন্ড') || text.includes('ফুলস্ট্যাক') || text.includes('web');
    }
    if (selectedCategory === 'app') {
      return text.includes('অ্যাপ') || text.includes('flutter') || text.includes('mobile');
    }
    if (selectedCategory === 'design') {
      return text.includes('গ্রাফিক') || text.includes('ডিজাইন') || text.includes('ইউআই') || text.includes('art');
    }
    if (selectedCategory === 'security') {
      return text.includes('সিকিউরিটি') || text.includes('হ্যাকিং') || text.includes('security');
    }
    if (selectedCategory === 'data') {
      return text.includes('ডেটা') || text.includes('পাইথন') || text.includes('মার্কেটিং') || text.includes('data');
    }
    return true;
  });

  return (
    <section className="courses-glass-section" id="courses">
      <div className="glass-bg-mesh"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* 3 Items in One Straight Line: Filter (Left) | Title (Center) | Search (Right) */}
        <div className="course-unified-bar">
          {/* 1. Left: Filter Box */}
          <div className="course-filter-select-wrap">
            <Filter size={18} className="course-filter-icon" />
            <select 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              className="course-filter-select"
              aria-label="কোর্স ফিল্টার"
            >
              {courseCategories.map(cat => (
                <option key={cat.id} value={cat.id} style={{ background: '#003325', color: '#ffffff' }}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Center: Course Title with Top Badge centered over the text */}
          <h2 className="course-section-title">
            <GraduationCap size={44} strokeWidth={2.3} className="course-title-icon" />
            <span className="course-title-text-group">
              <span className="glass-badge course-top-badge">
                কর্মমুখী আইটি শিক্ষা ও ক্যারিয়ার গঠন
              </span>
              <span className="course-title-text">আমাদের কোর্সসমূহ</span>
            </span>
          </h2>

          {/* 3. Right: Search Box */}
          <div className="course-search-wrap">
            <Search size={18} className="course-search-icon" />
            <input 
              type="text" 
              value={courseSearch}
              onChange={e => setCourseSearch(e.target.value)}
              placeholder="কোর্স খুঁজুন..."
              className="course-search-input"
              aria-label="কোর্স সার্চ"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="compact-courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.slice(0, 8).map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0', color: '#cbd5e1', fontSize: '1.05rem' }}>
              কোনো কোর্স খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে খুঁজুন।
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '45px' }}>
          <Link 
            to="/course" 
            className="slider-float-btn slider-float-primary"
            style={{ borderRadius: '16px', textDecoration: 'none' }}
          >
            <span className="btn-inner-content" style={{ padding: '14px 38px', fontSize: '1.05rem', fontWeight: 700, gap: '8px' }}>
              <span>সকল কোর্স দেখুন</span>
              <ChevronRight size={20} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
