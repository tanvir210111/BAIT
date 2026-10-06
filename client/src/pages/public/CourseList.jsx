import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Filter } from 'lucide-react';
import { coursesAPI } from '../../services/api';
import CourseCard from '../../components/course/CourseCard';
import Loading from '../../components/common/Loading';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    coursesAPI.getAll()
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const courseCategories = [
    { id: 'all', name: 'সকল কোর্স' },
    { id: 'web', name: 'ওয়েব ডেভেলপমেন্ট' },
    { id: 'app', name: 'মোবাইল অ্যাপস' },
    { id: 'design', name: 'গ্রাফিক ও ইউআই/ইউএক্স' },
    { id: 'data', name: 'ডেটা ও এআই' },
  ];

  const filteredCourses = courses.filter(course => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      (course.title_bn && course.title_bn.toLowerCase().includes(query)) ||
      (course.description && course.description.toLowerCase().includes(query)) ||
      (course.batch_info && course.batch_info.toLowerCase().includes(query));
    
    if (!matchesSearch) return false;
    if (selectedCategory === 'all') return true;
    
    const text = ((course.title_bn || '') + ' ' + (course.description || '')).toLowerCase();
    if (selectedCategory === 'web') return text.includes('ওয়েব') || text.includes('web');
    if (selectedCategory === 'app') return text.includes('অ্যাপ') || text.includes('flutter') || text.includes('mobile');
    if (selectedCategory === 'design') return text.includes('গ্রাফিক') || text.includes('ডিজাইন');
    if (selectedCategory === 'data') return text.includes('ডেটা') || text.includes('পাইথন');
    return true;
  });

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>কোর্স</span>
          </div>
          <h1 className="page-banner-title">BAIT প্রশিক্ষণ ও কোর্সসমূহ</h1>
          <p className="page-banner-subtitle">
            আন্তর্জাতিক মানের কর্মমুখী আইসিটি ও কারিগরি প্রশিক্ষণ।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {courseCategories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`badge-tag ${selectedCategory === cat.id ? 'badge-teal' : ''}`}
                style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)', fontSize: '0.88rem' }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px', flexGrow: 1, maxWidth: '360px' }}>
            <input 
              type="text"
              placeholder="কোর্স খুঁজুন..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', height: '42px', fontSize: '0.9rem' }}
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          </div>
        </div>

        {loading ? (
          <Loading text="কোর্স লোড হচ্ছে..." />
        ) : filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            কোনো কোর্স খুঁজে পাওয়া যায়নি।
          </div>
        ) : (
          <div className="compact-courses-grid">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
