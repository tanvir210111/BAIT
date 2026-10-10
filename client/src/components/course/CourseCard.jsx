import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Award, ArrowRight } from 'lucide-react';

export const pricingMap = {
  'web-development': { current: '৳৪,৯১৪', original: '৳৭,৮০০', discount: '৩৭% ছাড়', numericCurrent: 4914 },
  'graphic-design-ui-ux': { current: '৳৩,৪৫০', original: '৳৬,৯০০', discount: '৫০% ছাড়', numericCurrent: 3450 },
  'cyber-security': { current: '৳৫,৯৯৯', original: '৳৯,৯৯৯', discount: '৪০% ছাড়', numericCurrent: 5999 },
  'mobile-app-development': { current: '৳৫,৫০০', original: '৳১০,০০০', discount: '৪৫% ছাড়', numericCurrent: 5500 },
  'full-stack-web-development-mern': { current: '৳৬,৫০০', original: '৳১২,০০০', discount: '৪৫% ছাড়', numericCurrent: 6500 },
  'fullstack-freelancing-kushtia': { current: '৳৬,৫০০', original: '৳১২,০০০', discount: '৪৫% ছাড়', numericCurrent: 6500 },
  'professional-graphic-ui-ux-design': { current: '৳৫,৫০০', original: '৳১০,০০০', discount: '৪৫% ছাড়', numericCurrent: 5500 },
  'graphic-digital-art-barishal': { current: '৳৩,৪৫০', original: '৳৬,৯০০', discount: '৫০% ছাড়', numericCurrent: 3450 },
  'python-data-analytics-machine-learning': { current: '৳৭,৫০০', original: '৳১৪,০০০', discount: '৪৬% ছাড়', numericCurrent: 7500 },
  'python-data-analytics-bogura': { current: '৳৭,৫০০', original: '৳১৪,০০০', discount: '৪৬% ছাড়', numericCurrent: 7500 },
  'cloud-security-sylhet': { current: '৳৫,৯৯৯', original: '৳৯,৯৯৯', discount: '৪০% ছাড়', numericCurrent: 5999 },
  'mobile-app-development-flutter-dart': { current: '৳৭,০০০', original: '৳১৩,০০০', discount: '৪৬% ছাড়', numericCurrent: 7000 },
  'frontend-app-dev-rangpur': { current: '৳৫,৫০০', original: '৳১০,০০০', discount: '৪৫% ছাড়', numericCurrent: 5500 },
  'digital-marketing-seo-mymensingh': { current: '৳৪,৫০০', original: '৳৮,০০০', discount: '৪৪% ছাড়', numericCurrent: 4500 },
};

export function getCoursePricing(course) {
  if (course && course.slug && pricingMap[course.slug]) {
    return pricingMap[course.slug];
  }
  return { current: '৳৪,৯১৪', original: '৳৭,৮০০', discount: '৩৭% ছাড়', numericCurrent: 4914 };
}

export function getCourseNumericPrice(course) {
  const p = getCoursePricing(course);
  return p?.numericCurrent || 4914;
}

export default function CourseCard({ course }) {
  if (!course) return null;
  const priceInfo = getCoursePricing(course);

  return (
    <div className="compact-course-card">
      <Link to={`/course/${course.slug}`} className="compact-course-img-wrap">
        <img 
          src={course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'} 
          alt={course.title_bn} 
          className="compact-course-img"
        />
        {/* Batch Number badge on TOP-LEFT of the picture */}
        <span className="compact-course-batch-badge">
          {course.batch_info ? course.batch_info.split('(')[0].trim() : 'ব্যাচ-০১'}
        </span>
      </Link>

      <div className="compact-course-info">
        <Link to={`/course/${course.slug}`} className="compact-course-title-link">
          <h3 className="compact-course-title">
            {course.title_bn}
          </h3>
        </Link>

        {/* Small Info Micro-Boxes after Course Name */}
        <div className="compact-course-tags-row">
          <span className="course-micro-box">
            <Laptop size={13} />
            <span>লাইভ প্রজেক্ট</span>
          </span>
          <span className="course-micro-box course-micro-box-accent">
            <Award size={13} />
            <span>সার্টিফিকেট</span>
          </span>
        </div>

        {/* Pricing & Ticket Discount Row */}
        <div className="compact-course-pricing-row">
          <div className="course-price-wrap">
            <span className="course-current-price">{priceInfo.current}</span>
            <span className="course-original-price">{priceInfo.original}</span>
          </div>
          <div className="course-discount-ticket">
            <span className="ticket-text">{priceInfo.discount}</span>
          </div>
        </div>

        {/* Action Buttons: বিস্তারিত দেখুন & ভর্তি হন */}
        <div className="compact-course-actions">
          <Link to={`/course/${course.slug}`} className="card-float-btn card-float-details">
            <span className="card-btn-inner">
              <span>বিস্তারিত দেখুন</span>
              <ArrowRight size={14} />
            </span>
          </Link>
          <Link to="/signup" className="card-float-btn card-float-enroll">
            <span className="card-btn-inner">
              <span>ভর্তি হন</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
