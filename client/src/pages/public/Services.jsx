import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Layers, 
  Search, 
  X, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  Code,
  Smartphone,
  GraduationCap,
  Server,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { 
  serviceCategories, 
  baitServices, 
  serviceWorkflowSteps, 
  whyChooseBaitPoints 
} from '../../constants/servicesData';

// Helper to render relevant icon
const renderServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Code':
      return <Code size={20} />;
    case 'Smartphone':
      return <Smartphone size={20} />;
    case 'GraduationCap':
      return <GraduationCap size={20} />;
    case 'Layers':
      return <Layers size={20} />;
    case 'Server':
      return <Server size={20} />;
    case 'ShieldCheck':
      return <ShieldCheck size={20} />;
    default:
      return <Layers size={20} />;
  }
};

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Drag-to-scroll category strip handlers
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const [isDragActive, setIsDragActive] = useState(false);

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
    if (hasDragged.current) return;
    setSelectedCategory(catId);
  };

  // Filter services
  const filteredServices = useMemo(() => {
    let result = [...baitServices];

    // 1. Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((s) => {
        const title = (s.title || '').toLowerCase();
        const desc = (s.desc || '').toLowerCase();
        const badge = (s.badge || '').toLowerCase();
        const features = (s.features || []).join(' ').toLowerCase();
        return title.includes(query) || desc.includes(query) || badge.includes(query) || features.includes(query);
      });
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="services-page-wrapper">
      {/* 1. Compact Hero Section */}
      <section className="services-hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div className="courses-breadcrumb">
            <Link to="/" className="courses-breadcrumb-item">
              <Home size={14} />
              <span>হোম</span>
            </Link>
            <span className="courses-breadcrumb-separator">/</span>
            <span className="courses-breadcrumb-current">আমাদের সেবাসমূহ</span>
          </div>

          <br />

          {/* Badge */}
          <div className="courses-hero-badge">
            <Layers size={15} />
            <span>আইটি সল্যুশন ও ডিজিটাল রূপান্তর</span>
          </div>

          {/* Heading */}
          <h1 className="courses-hero-title">BAIT-এর সেবাসমূহ</h1>

          {/* Subtitle */}
          <p className="courses-hero-subtitle">
            প্রযুক্তি শিক্ষা, ডিজিটাল দক্ষতা ও পেশাগত উন্নয়নে আপনার নির্ভরযোগ্য সহযোগী।
          </p>
        </div>
      </section>

      {/* 2. Main Discovery Area */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Category Filter & Search Toolbar */}
        <div className="courses-animated-toolbar" id="services-toolbar">
          {/* Left & Middle: Fixed Filter Button + Scrollable Categories */}
          <div className="courses-filter-and-categories">
            {/* Fixed Filter Button */}
            <div className="courses-fixed-filter-wrap">
              <button
                type="button"
                className={`courses-fixed-filter-btn ${hasActiveFilters ? 'has-active' : ''}`}
                onClick={handleResetFilters}
                title={hasActiveFilters ? 'ফিল্টার রিসেট করুন' : 'সেবা ফিল্টার'}
                aria-label="সেবা ফিল্টার"
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
              aria-label="সেবা ক্যাটাগরি ফিল্টার"
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
                {serviceCategories.map((cat) => {
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
              placeholder="সেবা খুঁজুন..."
              className="toolbar-search-input"
              aria-label="সেবা সার্চ"
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

        {/* 3. Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="courses-state-box">
            <h3 className="courses-state-title">কোনো সেবা পাওয়া যায়নি</h3>
            <p className="courses-state-desc">
              আপনার দেওয়া অনুসন্ধান বা ফিল্টারের সাথে সামঞ্জস্যপূর্ণ কোনো সেবা পাওয়া যায়নি। অনুগ্রহ করে ফিল্টার রিসেট করুন।
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="card-float-btn card-float-details"
              style={{ padding: '2px', borderRadius: '9999px', display: 'inline-flex' }}
            >
              <span className="card-btn-inner" style={{ padding: '10px 24px', borderRadius: '9999px', fontSize: '0.95rem' }}>
                <RotateCcw size={15} />
                <span>ফিল্টার রিসেট করুন</span>
              </span>
            </button>
          </div>
        ) : (
          <div className="services-catalogue-grid">
            {filteredServices.map((service) => (
              <div key={service.id} className="service-catalogue-card">
                {/* Card Top Image & Badges */}
                <div className="service-catalogue-img-wrap">
                  <img 
                    src={service.image_url} 
                    alt={service.title} 
                    className="service-catalogue-img"
                    loading="lazy"
                  />
                  <div className="service-catalogue-overlay" />
                  
                  {/* Floating Tag */}
                  <span className="service-catalogue-badge">
                    {service.badge}
                  </span>

                  {/* Icon badge */}
                  <div className="service-catalogue-icon-wrap">
                    {renderServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="service-catalogue-body">
                  <h3 className="service-catalogue-title">
                    {service.title}
                  </h3>

                  <p className="service-catalogue-desc">
                    {service.desc}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="service-catalogue-features">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="service-catalogue-feature-item">
                        <Check size={15} className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action CTA Button */}
                  <div className="service-catalogue-footer">
                    <Link 
                      to="/jogajog" 
                      className="service-catalogue-btn"
                    >
                      <span className="service-catalogue-btn-inner">
                        <span>পরামর্শ ও কোটেশন নিন</span>
                        <ArrowRight size={15} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Supporting Section: How We Work (আমাদের কাজের ধাপসমূহ) with Green BG & Red Borders */}
      <section className="services-workflow-section">
        <div className="container">
          <div className="services-section-header">
            <span className="services-subbadge">সুশৃঙ্খল কর্মপদ্ধতি</span>
            <h2 className="services-section-heading">আমরা যেভাবে কাজ করি</h2>
            <p className="services-section-subtext">
              পরিকল্পনা থেকে সফল লাইভ ডেপ্লয়মেন্ট পর্যন্ত প্রতিটি ধাপ আন্তর্জাতিক মান ও স্বচ্ছতার সাথে সম্পন্ন করা হয়।
            </p>
          </div>

          <div className="services-workflow-grid">
            {serviceWorkflowSteps.map((stepItem, idx) => (
              <div key={idx} className="services-workflow-card">
                <div className="workflow-step-badge">{stepItem.step}</div>
                <h3 className="workflow-card-title">{stepItem.title}</h3>
                <p className="workflow-card-desc">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* 5. Supporting Section: Why Choose BAIT (কেন BAIT সেবা বেছে নেবেন?) */}
        <section className="services-why-section">
          <div className="services-section-header">
            <span className="services-subbadge">আমাদের বিশেষত্ব</span>
            <h2 className="services-section-heading">কেন BAIT সেবা বেছে নেবেন?</h2>
            <p className="services-section-subtext">
              দক্ষ প্রযুক্তিবিদ দল ও টেকসই সফটওয়্যার সমাধান দিয়ে আমরা গড়ে তুলি দীর্ঘমেয়াদী বিশ্বাস ও সফলতা।
            </p>
          </div>

          <div className="services-why-grid">
            {whyChooseBaitPoints.map((point, idx) => (
              <div key={idx} className="services-why-card">
                <div className="why-icon-wrap">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="why-card-title">{point.title}</h3>
                  <p className="why-card-desc">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Supporting Action Banner */}
        <section className="services-cta-banner">
          <div className="services-cta-content">
            <h2 className="services-cta-title">আপনার প্রতিষ্ঠান বা ব্যবসার ডিজিটাল রূপান্তর শুরু হোক আজ</h2>
            <p className="services-cta-desc">
              সফটওয়্যার তৈরি, ওয়েবসাইট বা ক্লাউড অটোমেশনের যে কোনো বিষয়ে আমাদের বিশেষজ্ঞ টিমের সাথে সরাসরি আলোচনা করুন।
            </p>
            <div className="services-cta-buttons">
              <Link to="/jogajog" className="services-cta-primary-btn">
                <span className="services-cta-btn-inner">
                  <span>পরামর্শের জন্য যোগাযোগ করুন</span>
                  <PhoneCall size={16} />
                </span>
              </Link>
              <Link to="/course" className="services-cta-secondary-btn">
                <span className="services-cta-btn-inner">
                  <span>আমাদের কোর্সসমূহ দেখুন</span>
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
