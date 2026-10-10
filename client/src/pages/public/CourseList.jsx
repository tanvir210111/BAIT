import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  GraduationCap, 
  Search, 
  X, 
  RotateCcw, 
  AlertCircle, 
  SearchX, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { coursesAPI } from '../../services/api';
import CourseCard from '../../components/course/CourseCard';

// Real Course Categories in BAIT curriculum
const courseCategories = [
  { id: 'all', name: 'সকল কোর্স' },
  { id: 'web', name: 'ওয়েব ডেভেলপমেন্ট' },
  { id: 'app', name: 'মোবাইল অ্যাপস' },
  { id: 'design', name: 'গ্রাফিক ও ইউআই/ইউএক্স' },
  { id: 'data', name: 'ডেটা ও এআই' },
  { id: 'security', name: 'সাইবার সিকিউরিটি' },
  { id: 'marketing', name: 'ডিজিটাল মার্কেটিং' },
];

// Mapping each specific course slug to its exact primary category
const courseCategoryMap = {
  // Web Development (3)
  'web-development': 'web',
  'fullstack-freelancing-kushtia': 'web',
  'frontend-app-dev-rangpur': 'web',
  'full-stack-web-development-mern': 'web',

  // Mobile App (1)
  'mobile-app-development': 'app',
  'mobile-app-development-flutter-dart': 'app',

  // Graphic Design & UI/UX (2)
  'graphic-design-ui-ux': 'design',
  'graphic-digital-art-barishal': 'design',
  'professional-graphic-ui-ux-design': 'design',

  // Data & AI (1)
  'python-data-analytics-bogura': 'data',
  'python-data-analytics-machine-learning': 'data',

  // Cyber Security (2)
  'cyber-security': 'security',
  'cloud-security-sylhet': 'security',

  // Digital Marketing (1)
  'digital-marketing-seo-mymensingh': 'marketing',
};

const getCourseCategory = (course) => {
  if (course && course.slug && courseCategoryMap[course.slug]) {
    return courseCategoryMap[course.slug];
  }
  const title = (course?.title_bn || '').toLowerCase();
  if (title.includes('মার্কেটিং') || title.includes('এসইও')) return 'marketing';
  if (title.includes('সিকিউরিটি') || title.includes('হ্যাকিং') || title.includes('ডিফেন্স')) return 'security';
  if (title.includes('পাইথন') || title.includes('ডেটা')) return 'data';
  if (title.includes('গ্রাফিক') || title.includes('ডিজাইন') || title.includes('আর্ট')) return 'design';
  if (title.includes('মোবাইল') || title.includes('flutter')) return 'app';
  if (title.includes('ওয়েব') || title.includes('ফুলস্ট্যাক') || title.includes('ফ্রন্টএন্ড')) return 'web';
  return 'other';
};

// Bengali number helper for counts and pagination
const toBnNumber = (num) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (w) => bnDigits[+w]);
};

// Skeleton Card for loading state
function CourseCardSkeleton() {
  return (
    <div className="course-card-skeleton">
      <div className="skeleton-img skeleton-shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-shimmer" style={{ height: '22px', width: '85%' }} />
        <div className="skeleton-line skeleton-shimmer" style={{ height: '18px', width: '60%' }} />
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <div className="skeleton-line skeleton-shimmer" style={{ height: '28px', flex: 1 }} />
          <div className="skeleton-line skeleton-shimmer" style={{ height: '28px', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div className="skeleton-line skeleton-shimmer" style={{ height: '26px', width: '90px' }} />
          <div className="skeleton-line skeleton-shimmer" style={{ height: '22px', width: '65px' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
          <div className="skeleton-line skeleton-shimmer" style={{ height: '38px', flex: 1.25, borderRadius: '9px' }} />
          <div className="skeleton-line skeleton-shimmer" style={{ height: '38px', flex: 0.95, borderRadius: '9px' }} />
        </div>
      </div>
    </div>
  );
}

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Drag & Swipe state for category row (টেনে বামে-ডানে নেয়ার জন্য)
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasDragged = useRef(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    setError(null);
    coursesAPI.getAll()
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load courses:', err);
        setError('কোর্সের তথ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses by search query and category
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // 1. Search Query Filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((course) => {
        const title = (course.title_bn || '').toLowerCase();
        const desc = (course.description || '').toLowerCase();
        const batch = (course.batch_info || '').toLowerCase();
        const syllabus = (course.syllabus || '').toLowerCase();
        const instructor = (course.instructor_name || '').toLowerCase();
        return (
          title.includes(query) ||
          desc.includes(query) ||
          batch.includes(query) ||
          syllabus.includes(query) ||
          instructor.includes(query)
        );
      });
    }

    // 2. Category Filter (Accurate 1-to-1 matching without duplicate count)
    if (selectedCategory !== 'all') {
      result = result.filter((course) => {
        return getCourseCategory(course) === selectedCategory;
      });
    }

    return result;
  }, [courses, searchQuery, selectedCategory]);

  // Reset page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Client-side pagination calculations
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const toolbarEl = document.getElementById('courses-toolbar');
    if (toolbarEl) {
      toolbarEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mouse Drag / Swipe Handlers (টেনে বামে বা ডানে স্ক্রোল করার জন্য)
  const onMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
    setIsDragActive(true);
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    setIsDragActive(false);
  };

  const onMouseUp = () => {
    isDragging.current = false;
    setIsDragActive(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const onCategoryClick = (catId) => {
    if (hasDragged.current) return; // Dragging was occurring, ignore click
    setSelectedCategory(catId);
  };

  return (
    <div className="courses-page-wrapper">
      {/* 1. Hero Section */}
      <section className="courses-hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div className="courses-breadcrumb">
            <Link to="/" className="courses-breadcrumb-item">
              <Home size={14} />
              <span>হোম</span>
            </Link>
            <span className="courses-breadcrumb-separator">/</span>
            <span className="courses-breadcrumb-current">কোর্স</span>
          </div>

          <br />

          {/* Badge */}
          <div className="courses-hero-badge">
            <GraduationCap size={15} />
            <span>আইটি ক্যারিয়ার ও দক্ষতা উন্নয়ন</span>
          </div>

          {/* Heading */}
          <h1 className="courses-hero-title">BAIT প্রশিক্ষণ ও কোর্সসমূহ</h1>

          {/* Subtitle */}
          <p className="courses-hero-subtitle">
            আধুনিক প্রযুক্তিতে দক্ষতা অর্জন করুন অভিজ্ঞ প্রশিক্ষক ও বাস্তবমুখী প্রজেক্টের মাধ্যমে।
          </p>
        </div>
      </section>

      {/* 2. Main Content & Discovery Area */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Category Filter & Search Toolbar (স্থির থাকবে, ইউজার টেনে সরাতে পারবে) */}
        <div className="courses-animated-toolbar" id="courses-toolbar">
          {/* Left & Middle: Fixed Filter Button + Scrollable Category Strip */}
          <div className="courses-filter-and-categories">
            {/* Fixed Filter Button - স্থির থাকবে, ইউজার ক্যাটাগরি স্লাইড করলেও এটি স্লাইড হবে না */}
            <div className="courses-fixed-filter-wrap">
              <button
                type="button"
                className={`courses-fixed-filter-btn ${hasActiveFilters ? 'has-active' : ''}`}
                onClick={handleResetFilters}
                title={hasActiveFilters ? 'ফিল্টার রিসেট করুন' : 'কোর্স ফিল্টার'}
                aria-label="কোর্স ফিল্টার"
              >
                <span className="fixed-filter-inner">
                  <SlidersHorizontal size={15} />
                  <span>ফিল্টার</span>
                </span>
              </button>
              <div className="fixed-filter-divider" />
            </div>

            {/* Draggable / Scrollable Category Strip */}
            <div 
              className="category-scroll-container" 
              aria-label="কোর্স ক্যাটাগরি ফিল্টার"
            >
              <div 
                ref={scrollRef}
                className={`category-scroll-track ${isDragActive ? 'is-dragging' : ''}`}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                role="tablist"
              >
                {courseCategories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cat-pill-btn ${isActive ? 'active' : ''}`}
                      onClick={() => onCategoryClick(cat.id)}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <span className="cat-pill-inner">
                        <span>{cat.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Stationary Fixed Search Input */}
          <div className="courses-toolbar-search-wrap">
            <Search size={18} className="toolbar-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="কোর্স খুঁজুন..."
              className="toolbar-search-input"
              aria-label="কোর্স সার্চ"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="toolbar-search-clear"
                title="অনুসন্ধান মুছুন"
                aria-label="অনুসন্ধান মুছুন"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>


        {/* 3. States & Course Cards Grid */}
        {loading ? (
          /* Loading Skeleton State */
          <div className="compact-courses-grid">
            {Array.from({ length: 8 }).map((_, idx) => (
              <CourseCardSkeleton key={idx} />
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="courses-state-box">
            <AlertCircle size={48} className="courses-state-icon courses-state-icon-error" />
            <h3 className="courses-state-title">তথ্য লোড করতে ব্যর্থ হয়েছে</h3>
            <p className="courses-state-desc">{error}</p>
            <button
              type="button"
              onClick={fetchCourses}
              className="card-float-btn card-float-details"
              style={{ padding: '2px', display: 'inline-flex' }}
            >
              <span className="card-btn-inner" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
                <RotateCcw size={15} />
                <span>পুনরায় চেষ্টা করুন</span>
              </span>
            </button>
          </div>
        ) : totalItems === 0 ? (
          /* Empty State */
          <div className="courses-state-box">
            <SearchX size={52} className="courses-state-icon" />
            <h3 className="courses-state-title">কোনো কোর্স খুঁজে পাওয়া যায়নি</h3>
            <p className="courses-state-desc">
              {hasActiveFilters
                ? 'আপনার দেওয়া অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো কোর্স পাওয়া যায়নি। অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।'
                : 'বর্তমানে কোনো কোর্স উপলব্ধ নেই। শীঘ্রই নতুন কোর্স যুক্ত করা হবে।'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="card-float-btn card-float-details"
                style={{ padding: '2px', display: 'inline-flex' }}
              >
                <span className="card-btn-inner" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
                  <RotateCcw size={15} />
                  <span>সকল ফিল্টার রিসেট করুন</span>
                </span>
              </button>
            )}
          </div>
        ) : (
          /* Courses Cards Grid */
          <>
            <div className="compact-courses-grid">
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* 4. Pagination */}
            {totalPages > 1 && (
              <div className="courses-pagination-wrap" aria-label="পৃষ্ঠা পরিবর্তন">
                <button
                  type="button"
                  className="pagination-nav-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="পূর্ববর্তী পৃষ্ঠা"
                >
                  <span className="pagination-btn-inner">
                    <ChevronLeft size={16} />
                    <span>পূর্ববর্তী</span>
                  </span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`পৃষ্ঠা ${toBnNumber(pageNum)}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    <span className="pagination-btn-inner">
                      <span>{toBnNumber(pageNum)}</span>
                    </span>
                  </button>
                ))}

                <button
                  type="button"
                  className="pagination-nav-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="পরবর্তী পৃষ্ঠা"
                >
                  <span className="pagination-btn-inner">
                    <span>পরবর্তী</span>
                    <ChevronRight size={16} />
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
