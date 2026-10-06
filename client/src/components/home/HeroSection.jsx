import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Sparkles, Users, Clock, GraduationCap } from 'lucide-react';

export default function HeroSection({ courses = [] }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderCourses = courses.slice(0, 5);

  // Top Course Slider Auto-play
  useEffect(() => {
    if (sliderCourses.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % sliderCourses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderCourses.length]);

  const nextSlide = () => {
    if (sliderCourses.length === 0) return;
    setActiveSlide(prev => (prev + 1) % sliderCourses.length);
  };

  const prevSlide = () => {
    if (sliderCourses.length === 0) return;
    setActiveSlide(prev => (prev - 1 + sliderCourses.length) % sliderCourses.length);
  };

  return (
    <section className="course-slider-section">
      <div className="course-slider-overlay"></div>
      <div className="container slider-container">
        {sliderCourses.length > 0 ? (
          <div>
            <div className="slider-outer-wrapper">
              {/* Left Arrow Button OUTSIDE the glass */}
              <button 
                type="button" 
                className="slider-arrow-btn slider-arrow-prev" 
                onClick={prevSlide}
                aria-label="পূর্ববর্তী কোর্স"
              >
                <ChevronLeft size={26} />
              </button>

              {/* Floating Glass Card */}
              <div className="slider-glass-card">
                <div className="slider-slide-wrap">
                  {/* Left: Course Info */}
                  <div className="slider-slide-content">
                    <div className="slider-badge-row">
                      <span className="glass-badge glass-badge-red" style={{ fontSize: '0.86rem', padding: '5px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, borderRadius: '9999px', boxShadow: '0 2px 8px rgba(244, 42, 65, 0.4)' }}>
                        <Sparkles size={15} />
                        <span>জনপ্রিয় কোর্স (Popular Course)</span>
                      </span>
                    </div>

                    <h2 className="slider-title">
                      {sliderCourses[activeSlide].title_bn}
                    </h2>

                    <p className="slider-desc">
                      {sliderCourses[activeSlide].description}
                    </p>

                    <div className="slider-meta-row">
                      {sliderCourses[activeSlide].instructor_name && (
                        <div className="slider-meta-item">
                          <Users size={18} />
                          <span>প্রশিক্ষক: {sliderCourses[activeSlide].instructor_name}</span>
                        </div>
                      )}
                      <div className="slider-meta-item">
                        <Clock size={18} />
                        <span>{sliderCourses[activeSlide].duration} ব্যবহারিক ক্লাস</span>
                      </div>
                    </div>

                    <div className="slider-actions">
                      <Link 
                        to={`/course/${sliderCourses[activeSlide].slug}`} 
                        className="slider-float-btn slider-float-primary"
                      >
                        <span className="btn-inner-content">
                          <span>কোর্সের বিস্তারিত দেখুন</span>
                          <ArrowRight size={18} className="icon-arrow" />
                        </span>
                      </Link>
                      <Link 
                        to="/signup" 
                        className="slider-float-btn slider-float-secondary"
                      >
                        <span className="btn-inner-content">
                          <span>ভর্তি হন</span>
                          <GraduationCap size={18} className="icon-cap" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Course Big Image */}
                  <div className="slider-img-wrap">
                    <img 
                      src={sliderCourses[activeSlide].image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80'} 
                      alt={sliderCourses[activeSlide].title_bn} 
                      className="slider-img"
                    />
                    <div className="slider-img-badge">
                      BAIT সার্টিফাইড প্রফেশনাল কোর্স
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Arrow Button OUTSIDE the glass */}
              <button 
                type="button" 
                className="slider-arrow-btn slider-arrow-next" 
                onClick={nextSlide}
                aria-label="পরবর্তী কোর্স"
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* Slider Indicators (Dots) */}
            <div className="slider-dots">
              {sliderCourses.map((c, idx) => (
                <button 
                  key={c.id || idx}
                  type="button"
                  className={`slider-dot ${idx === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`স্লাইড ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#fff' }}>কোর্স লোড হচ্ছে...</div>
        )}
      </div>
    </section>
  );
}
