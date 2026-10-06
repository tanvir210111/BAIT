import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import StatsSection from './StatsSection';

export default function AboutSection() {
  return (
    <section className="home-heading-section">
      <div className="container">
        <div className="home-heading-box">
          {/* Top Badge */}
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 28px', borderRadius: '9999px', background: 'rgba(0, 106, 78, 0.08)', border: '1.5px solid rgba(0, 106, 78, 0.3)', marginBottom: '26px', boxShadow: '0 4px 14px rgba(0, 106, 78, 0.08)' }}>
            <Sparkles size={20} color="var(--accent-red)" />
            <span style={{ color: 'var(--primary-dark)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.2px' }}>
              বাংলার আলো আইটি (BAIT) • আলোকিত হোক প্রতিটি প্রান্তর
            </span>
          </div>

          {/* Main Punchy Heading */}
          <h1 className="home-heading-title">
            প্রযুক্তির আলোয় আলোকিত হোক বাংলাদেশ — <br />
            <span style={{ color: 'var(--accent-red)', position: 'relative' }}>
              বাংলার আলো আইটি
            </span>-র সাথে গড়ুন আগামীর ক্যারিয়ার
          </h1>

          {/* Inspiring Subtitle Description */}
          <p className="home-heading-desc">
            তৃণমূল থেকে জাতীয় পর্যায়ে প্রতিটি তরুণের হাতে পৌঁছে যাক আধুনিক তথ্যপ্রযুক্তি, সফটওয়্যার ডেভেলপমেন্ট ও কর্মমুখী শিক্ষা। ডিজিটাল সক্ষমতা ও প্রযুক্তি সেবা বিস্তারে নিবেদিত জাতীয় প্ল্যাটফর্ম — <strong>বাংলার আলো আইটি (BAIT)</strong>।
          </p>

          {/* 3 Showcase Highlight Feature Cards */}
          <StatsSection />

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginTop: '38px', flexWrap: 'wrap' }}>
            <Link 
              to="/course" 
              className="slider-float-btn slider-float-green"
            >
              <span className="btn-inner-content" style={{ padding: '13px 30px' }}>
                <span>আমাদের কোর্সসমূহ দেখুন</span>
                <ArrowRight size={18} className="icon-arrow" />
              </span>
            </Link>
            <a 
              href="#services" 
              className="slider-float-btn slider-float-secondary"
              style={{ border: '1.5px solid var(--border)' }}
            >
              <span className="btn-inner-content" style={{ padding: '13px 28px' }}>
                <span>আমাদের সেবাসমূহ দেখুন</span>
                <ChevronRight size={18} className="icon-arrow" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
