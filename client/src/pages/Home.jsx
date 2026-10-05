import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Users, 
  Award, ShieldCheck, Newspaper, Sparkles, CheckCircle2, ChevronRight,
  ChevronLeft, Code, Laptop, Server, Shield, Database, Smartphone, 
  Headphones, Layers, Clock, GraduationCap, Check, Search, Filter, Ticket,
  HelpCircle, ChevronDown, PhoneCall, MapPin, Mail
} from 'lucide-react';
import { coursesAPI, peopleAPI } from '../services/api';

export default function Home({ onOpenSearch }) {
  const [courses, setCourses] = useState([]);
  const [hqEmployees, setHqEmployees] = useState([]);

  // Slider State
  const [activeSlide, setActiveSlide] = useState(0);

  // Course search & category filter state
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Service search & category filter state
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');

  // FAQ state
  const [openFaqId, setOpenFaqId] = useState(null);
  const [faqCategory, setFaqCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      category: 'admission',
      question: 'BAIT-এ কোর্সে কীভাবে ভর্তি হওয়া যাবে?',
      answer: 'আপনি সরাসরি আমাদের কোর্সের তালিকা থেকে কাঙ্ক্ষিত কোর্স সিলেক্ট করে "ভর্তি হন" বাটনে ক্লিক করে অনলাইনে ফর্ম পূরণ করতে পারেন। এছাড়াও সরাসরি আমাদের ঢাকা সদর দপ্তর অথবা যেকোনো হেল্পলাইনে যোগাযোগ করে সরাসরি ভর্তি হওয়া সম্ভব।'
    },
    {
      id: 2,
      category: 'classes',
      question: 'অনলাইন এবং অফলাইন উভয় মাধ্যমে ক্লাস করার সুযোগ আছে কি?',
      answer: 'হ্যাঁ, BAIT-এর প্রতিটি কোর্স হাইব্রিড মডেলে পরিচালিত হয়। আপনি সরাসরি আমাদের অত্যাধুনিক কম্পিউটার ল্যাবে বসে অফলাইনে ক্লাস করতে পারেন অথবা সারা বাংলাদেশ থেকে আমাদের লাইভ জুমে ইন্টারেক্টিভ অনলাইন ব্যাচে যুক্ত হতে পারেন। প্রতিটি ক্লাসের এইচডি ভিডিও রেকর্ডিং শিক্ষার্থী পোর্টালে ২৪/৭ সংরক্ষিত থাকে।'
    },
    {
      id: 3,
      category: 'certificate',
      question: 'কোর্স সম্পন্ন করার পর কি ভেরিফায়েড সার্টিফিকেট দেওয়া হয়?',
      answer: 'হ্যাঁ, প্রতিটি কোর্সের ফাইনাল প্রজেক্ট সফলভাবে জমা দেওয়ার পর BAIT কর্তৃক কিউআর কোড যুক্ত আন্তর্জাতিক মানের ভেরিফায়েড সার্টিফিকেট প্রদান করা হয়। এই সনদটি লিঙ্কডইন বা রেজ্যুমিতে যুক্ত করা যায় এবং দেশ-বিদেশের যেকোনো আইটি প্রতিষ্ঠানে গ্রহণযোগ্য।'
    },
    {
      id: 4,
      category: 'career',
      question: 'কোর্স শেষে কি ইন্টার্নশিপ অথবা চাকরির সুযোগ রয়েছে?',
      answer: 'অবশ্যই! কোর্সের শীর্ষ সফল শিক্ষার্থীদের BAIT সফটওয়্যার টিম ও সহযোগী আইটি কোম্পানিতে পেইড ইন্টার্নশিপ ও চাকরির সুযোগ দেওয়া হয়। এছাড়া আমাদের ক্যারিয়ার ডেভেলপমেন্ট উইং সিভি তৈরি, গিটহাব পোর্টফোলিও রিভিউ এবং মক ইন্টারভিউ সেশনের মাধ্যমে নিশ্চিত সহায়তা প্রদান করে।'
    },
    {
      id: 5,
      category: 'admission',
      question: 'কোর্স ফি কি কিস্তিতে পরিশোধের সুযোগ রয়েছে?',
      answer: 'শিক্ষার্থীদের আর্থিক সুবিধার্থে কোর্স ফি সহজ ২ থেকে ৩টি কিস্তিতে পরিশোধের সুযোগ রয়েছে। এছাড়া বিশেষ ক্যাম্পেইনে মেধাবী ও আর্থিক অসচ্ছল শিক্ষার্থীদের জন্য সর্বোচ্চ ৫০% পর্যন্ত স্কলারশিপ বা ছাড় দেওয়া হয়।'
    },
    {
      id: 6,
      category: 'classes',
      question: 'পূর্বে কোনো আইটি বা প্রোগ্রামিং ব্যাকগ্রাউন্ড না থাকলেও কি কোর্স করা সম্ভব?',
      answer: 'একদম সম্ভব! আমাদের সকল কোর্সের কারিকুলাম একদম প্রাথমিক (Beginner Level) পর্যায় থেকে শুরু করে বাস্তবভিত্তিক প্রজেক্টের মাধ্যমে অ্যাডভান্সড লেভেল পর্যন্ত ধাপে ধাপে শেখানো হয়। যেকোনো শিক্ষাগত ব্যাকগ্রাউন্ডের শিক্ষার্থী এটি সহজে আয়ত্ত করতে পারবেন।'
    },
    {
      id: 7,
      category: 'career',
      question: 'ক্লাসের বাইরে কোনো প্রবলেম বা সমস্যায় পড়লে কি সাপোর্ট পাওয়া যায়?',
      answer: 'হ্যাঁ, আমাদের সার্বক্ষণিক ডেডিকেটেড ডিসকর্ড ও ফেসবুক সাপোর্ট গ্রুপ রয়েছে। প্রতিদিন নির্ধারিত সময়ে এক্সপার্ট সাপোর্ট ইন্সট্রাক্টররা গুগল মিট ও টিমভিউয়ার/অ্যানিডেস্কের মাধ্যমে শিক্ষার্থীদের সরাসরি সমস্যা সমাধান করে দেন।'
    }
  ];

  const filteredFaqs = faqData.filter(faq => 
    faqCategory === 'all' || faq.category === faqCategory
  );

  useEffect(() => {
    // 1. Fetch courses
    coursesAPI.getAll()
      .then(data => {
        if (Array.isArray(data)) setCourses(data);
      })
      .catch(err => console.error(err));

    // 2. Fetch HQ employees
    peopleAPI.getByCategory('employee')
      .then(data => {
        if (Array.isArray(data)) setHqEmployees(data.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  // Top Course Slider Auto-play
  useEffect(() => {
    if (courses.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % Math.min(courses.length, 5));
    }, 6000);
    return () => clearInterval(interval);
  }, [courses.length]);

  const sliderCourses = courses.slice(0, 5);

  const nextSlide = () => {
    if (sliderCourses.length === 0) return;
    setActiveSlide(prev => (prev + 1) % sliderCourses.length);
  };

  const prevSlide = () => {
    if (sliderCourses.length === 0) return;
    setActiveSlide(prev => (prev - 1 + sliderCourses.length) % sliderCourses.length);
  };

  // Course filter categories and search filter logic
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

  // Pricing and discount mapper for courses
  const getCoursePricing = (course) => {
    const pricingMap = {
      'web-development': { current: '৳৪,৯১৪', original: '৳৭,৮০০', discount: '৩৭% ছাড়' },
      'graphic-design-ui-ux': { current: '৳৩,৪৫০', original: '৳৬,৯০০', discount: '৫০% ছাড়' },
      'cyber-security': { current: '৳৫,৯৯৯', original: '৳৯,৯৯৯', discount: '৪০% ছাড়' },
      'mobile-app-development': { current: '৳৫,৫০০', original: '৳১০,০০০', discount: '৪৫% ছাড়' },
      'fullstack-freelancing-kushtia': { current: '৳৪,৯১৪', original: '৳৭,৮০০', discount: '৩৭% ছাড়' },
      'python-data-analytics-bogura': { current: '৳৩,৯৯৯', original: '৳৭,৯৯৯', discount: '৫০% ছাড়' },
      'digital-marketing-sylhet': { current: '৳২,৯৯৯', original: '৳৫,৯৯৯', discount: '৫০% ছাড়' },
      'basic-ict-office-barishal': { current: '৳১,৯৯৯', original: '৳৩,৯৯৯', discount: '৫০% ছাড়' },
    };
    if (course && course.slug && pricingMap[course.slug]) {
      return pricingMap[course.slug];
    }
    return { current: '৳৪,৯১৪', original: '৳৭,৮০০', discount: '৩৭% ছাড়' };
  };

  // Software & IT Services List with Photos and Colorful Gradients
  const softwareServices = [
    {
      id: 1,
      title: 'কাস্টম সফটওয়্যার ডেভেলপমেন্ট',
      desc: 'ব্যবসা ও দাপ্তরিক কাজ স্বয়ংক্রিয় করতে আধুনিক প্রযুক্তি ও ফ্রেমওয়ার্কে তৈরি কাস্টমাইজড সফটওয়্যার সমাধান।',
      icon: <Code size={22} />,
      image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      badge: 'কাস্টম কোডিং',
      gradient: 'linear-gradient(150deg, #00281b 0%, #004d36 100%)',
      borderColor: 'rgba(52, 211, 153, 0.45)',
      features: ['রিয়্যাক্ট, নোডজেএস ও পাইথন বেজড', 'হাই স্পিড পারফরম্যান্স', 'সম্পূর্ণ কাস্টমাইজড ডেটাবেস']
    },
    {
      id: 2,
      title: 'ওয়েব ও মোবাইল অ্যাপ সল্যুশন',
      desc: 'রেসপন্সিভ ওয়েব প্ল্যাটফর্ম এবং অ্যান্ড্রয়েড ও আইওএস (iOS) মোবাইল অ্যাপস ডেভেলপমেন্ট।',
      icon: <Smartphone size={22} />,
      image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
      badge: 'মোবাইল ও ওয়েব',
      gradient: 'linear-gradient(150deg, #240510 0%, #4d0d26 100%)',
      borderColor: 'rgba(244, 42, 65, 0.45)',
      features: ['ক্রস-প্ল্যাটফর্ম Flutter আর্কিটেকচার', 'ইউজার-ফ্রেন্ডলি UI/UX ডিজাইন', 'রিয়েলটাইম নোটিফিকেশন']
    },
    {
      id: 3,
      title: 'শিক্ষা ও প্রতিষ্ঠান ম্যানেজমেন্ট (ERP)',
      desc: 'স্কুল, কলেজ, বিশ্ববিদ্যালয় ও মাদরাসার ভর্তি, হিসাব, ফলাফল ও ছাত্র-শিক্ষক পোর্টাল অটোমেশন।',
      icon: <GraduationCap size={22} />,
      image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      badge: 'এডুকেশন ERP',
      gradient: 'linear-gradient(150deg, #022033 0%, #06405f 100%)',
      borderColor: 'rgba(56, 189, 248, 0.45)',
      features: ['অনলাইন ফি ও পেমেন্ট গেটওয়ে', 'স্বয়ংক্রিয় রেজাল্ট ও গ্রেডিং শিট', 'অভিভাবক এসএমএস অ্যালার্ট']
    },
    {
      id: 4,
      title: 'স্বাস্থ্যসেবা ও ক্লিনিক ম্যানেজমেন্ট',
      desc: 'হাসপাতাল, ডায়াগনস্টিক সেন্টার ও ফার্মেসির প্রেসক্রিপশন, ইনভয়েসিং এবং পেশেন্ট হিস্ট্রি ম্যানেজমেন্ট।',
      icon: <Layers size={22} />,
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      badge: 'হেলথকেয়ার আইটি',
      gradient: 'linear-gradient(150deg, #012822 0%, #045247 100%)',
      borderColor: 'rgba(45, 212, 191, 0.45)',
      features: ['প্রেসক্রিপশন ও বিলিং সিস্টেম', 'ইনভেন্টরি ও ফার্মেসি স্টক ট্র্যাক', 'ডাক্তার অ্যাপয়েন্টমেন্ট শিডিউল']
    },
    {
      id: 5,
      title: 'ক্লাউড হোস্টিং ও ডেভঅপ্স সাপোর্ট',
      desc: 'আন্তর্জাতিক মানের হাই-স্পিড ক্লাউড সার্ভার, ডেটা ব্যাকআপ ও নিরবচ্ছিন্ন ডেভঅপ্স পরিকাঠামো।',
      icon: <Server size={22} />,
      image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      badge: 'ক্লাউড ও সার্ভার',
      gradient: 'linear-gradient(150deg, #141238 0%, #292468 100%)',
      borderColor: 'rgba(129, 140, 248, 0.45)',
      features: ['৯৯.৯% আপটাইম গ্যারান্টি', 'অটোমেটিক দৈনিক ব্যাকআপ', '২৪/৭ কারিগরি মনিটরিং']
    },
    {
      id: 6,
      title: 'সাইবার সিকিউরিটি ও আইটি অডিট',
      desc: 'প্রতিষ্ঠানসমূহের ডিজিটাল নিরাপত্তা নিশ্চিতকরণ, ভালনারেবিলিটি অ্যাসেসমেন্ট ও ডাটা প্রটেকশন।',
      icon: <Shield size={22} />,
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
      badge: 'সাইবার সিকিউরিটি',
      gradient: 'linear-gradient(150deg, #2b0c0c 0%, #571313 100%)',
      borderColor: 'rgba(248, 113, 113, 0.45)',
      features: ['সিকিউরিটি ভালনারেবিলিটি স্ক্যান', 'পেনিট্রেশন টেস্টিং ল্যাব', 'ডাটা এনক্রিপশন ও ব্যাকআপ']
    }
  ];

  // Service filter categories and search filter logic
  const serviceCategories = [
    { id: 'all', name: 'সকল সেবা' },
    { id: 'software', name: 'কাস্টম সফটওয়্যার' },
    { id: 'app', name: 'মোবাইল ও ওয়েব' },
    { id: 'erp', name: 'ERP অটোমেশন' },
    { id: 'cloud', name: 'ক্লাউড ও নিরাপত্তা' }
  ];

  const filteredServices = softwareServices.filter(s => {
    const query = serviceSearch.trim().toLowerCase();
    const matchesSearch = !query || 
      (s.title && s.title.toLowerCase().includes(query)) ||
      (s.desc && s.desc.toLowerCase().includes(query)) ||
      (s.badge && s.badge.toLowerCase().includes(query)) ||
      (s.features && s.features.some(f => f.toLowerCase().includes(query)));
    
    if (!matchesSearch) return false;
    if (selectedServiceCategory === 'all') return true;
    if (selectedServiceCategory === 'software') return s.id === 1;
    if (selectedServiceCategory === 'app') return s.id === 2;
    if (selectedServiceCategory === 'erp') return s.id === 3 || s.id === 4;
    if (selectedServiceCategory === 'cloud') return s.id === 5 || s.id === 6;
    return true;
  });

  return (
    <div>
      {/* =========================================================================
          1. COURSE SLIDER (প্রথমে কোর্সের স্লাইডার)
          ========================================================================= */}
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
            <div style={{ textAlign: 'center', padding: '60px 0' }}>কোর্স লোড হচ্ছে...</div>
          )}
        </div>
      </section>

      {/* =========================================================================
          2. HEADING (তারপর হেডিং)
          ========================================================================= */}
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
              তৃণমূল থেকে জাতীয় পর্যায়ে প্রতিটি তরুণের হাতে পৌঁছে যাক আধুনিক তথ্যপ্রযুক্তি, সফটওয়্যার ডেভেলপমেন্ট ও কর্মমুখী শিক্ষা। ৮টি বিভাগ, ৬৪টি জেলা ও সকল উপজেলায় ডিজিটাল সক্ষমতা ও প্রযুক্তি সেবা বিস্তারে নিবেদিত জাতীয় প্ল্যাটফর্ম — <strong>বাংলার আলো আইটি (BAIT)</strong>।
            </p>

            {/* 3 Showcase Highlight Feature Cards */}
            <div className="heading-highlights-grid">
              <div className="heading-highlight-card">
                <div className="heading-highlight-icon" style={{ background: 'rgba(0, 106, 78, 0.1)', color: 'var(--primary)' }}>
                  <Laptop size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                    হাতে-কলমে লাইভ প্রজেক্ট
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    আন্তর্জাতিক মানসম্পন্ন বাস্তব প্রজেক্ট ও পোর্টফোলিও তৈরির মাধ্যমে শতভাগ ব্যবহারিক শিক্ষা।
                  </p>
                </div>
              </div>

              <div className="heading-highlight-card">
                <div className="heading-highlight-icon" style={{ background: 'rgba(244, 42, 65, 0.1)', color: 'var(--accent-red)' }}>
                  <Award size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                    ইন্ডাস্ট্রি বিশেষজ্ঞ মেন্টরশিপ
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ারদের নিবিড় তত্ত্বাবধান, লাইভ প্রবলেম সলভিং ও সার্বক্ষণিক সাপোর্ট।
                  </p>
                </div>
              </div>

              <div className="heading-highlight-card">
                <div className="heading-highlight-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: 'var(--primary-light)' }}>
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                    ক্যারিয়ার ও ফ্রিল্যান্সিং সহায়তা
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    কোর্স সমাপ্তিতে ইন্টার্নশিপের সুযোগ, সিভি রিভিউ এবং আন্তর্জাতিক মার্কেটপ্লেস গাইডেন্স।
                  </p>
                </div>
              </div>
            </div>

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

      {/* =========================================================================
          3. COURSE (তারপর কোর্স - Glassmorphism Style)
          ========================================================================= */}
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

          {/* Course Cards Grid: Photo + Batch badge on left + Title + Micro-boxes + Buttons */}
          <div className="compact-courses-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.slice(0, 8).map(course => (
                <div 
                  key={course.id} 
                  className="compact-course-card"
                >
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

                    {/* Small Info Micro-Boxes after Course Name - Strictly 2 items on ONE horizontal line */}
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
                    {(() => {
                      const priceInfo = getCoursePricing(course);
                      return (
                        <div className="compact-course-pricing-row">
                          <div className="course-price-wrap">
                            <span className="course-current-price">{priceInfo.current}</span>
                            <span className="course-original-price">{priceInfo.original}</span>
                          </div>
                          <div className="course-discount-ticket">
                            <span className="ticket-text">{priceInfo.discount}</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Action Buttons: বিস্তারিত দেখুন & ভর্তি হন with Hover Floating and Rotating Border Beam */}
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

      {/* =========================================================================
          4. SOFTWARE SERVICE (তারপর সফটওয়্যার সার্ভিস - Glassmorphism Style)
          ========================================================================= */}
      <section className="services-glass-section" id="services">
        <div className="glass-bg-mesh"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* 3 Items in One Straight Line: Filter (Left) | Title (Center) | Search (Right) */}
          <div className="service-unified-bar">
            {/* 1. Left: Filter Box */}
            <div className="service-filter-select-wrap">
              <Filter size={18} className="service-filter-icon" />
              <select 
                value={selectedServiceCategory} 
                onChange={e => setSelectedServiceCategory(e.target.value)}
                className="service-filter-select"
                aria-label="সেবা ফিল্টার"
              >
                {serviceCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Center: Service Title with Top Badge centered over the text */}
            <h2 className="service-section-title">
              <Layers size={44} strokeWidth={2.3} className="service-title-icon" />
              <span className="service-title-text-group">
                <span className="service-top-badge">
                  আইটি সল্যুশন ও ডিজিটাল রূপান্তর
                </span>
                <span className="service-title-text">আমাদের সেবাসমূহ</span>
              </span>
            </h2>

            {/* 3. Right: Search Box */}
            <div className="service-search-wrap">
              <Search size={18} className="service-search-icon" />
              <input 
                type="text" 
                value={serviceSearch}
                onChange={e => setServiceSearch(e.target.value)}
                placeholder="সেবা খুঁজুন..."
                className="service-search-input"
                aria-label="সেবা সার্চ"
              />
            </div>
          </div>

          <div className="service-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <div 
                  key={service.id} 
                  className="service-glass-card"
                  style={{
                    background: service.gradient,
                    borderColor: service.borderColor
                  }}
                >
                  {/* Service Photo with Floating Icon & Tag */}
                  <div className="service-img-wrap">
                    <img 
                      src={service.image_url} 
                      alt={service.title} 
                      className="service-card-img"
                    />
                    <div className="service-img-overlay"></div>
                    
                    {/* Floating badge top-left */}
                    <span className="service-img-badge">
                      {service.badge}
                    </span>

                    {/* Icon wrap positioned nicely */}
                    <div className="service-floating-icon">
                      {service.icon}
                    </div>
                  </div>

                  <div className="service-card-body">
                    <h3 className="service-glass-title">{service.title}</h3>
                    <p className="service-glass-desc">{service.desc}</p>
                    
                    <ul className="service-features-list">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="service-glass-feature-item">
                          <Check size={16} color="#34d399" style={{ flexShrink: 0 }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Button float and border colouring round */}
                    <Link to="/jogajog" className="card-float-btn service-float-btn">
                      <span className="card-btn-inner">
                        <span>পরামর্শ ও কোটেশন নিন</span>
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                কোনো সেবা খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে খুঁজুন।
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. HEADQUARTER (তারপর হেডকোয়ার্টার)
          ========================================================================= */}
      <section className="section hq-section" id="headquarters">
        <div className="glass-bg-mesh"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-title-wrap" style={{ textAlign: 'center' }}>
            <span className="glass-badge hq-top-badge" style={{ marginBottom: '14px' }}>
              কেন্দ্রীয় প্রশাসন
            </span>
            <h2 className="section-title" style={{ color: '#ffffff', fontSize: '2.2rem' }}>BAIT সদর দপ্তর (Headquarters)</h2>
            <p className="section-subtitle" style={{ color: '#cbd5e1', maxWidth: '650px', margin: '0 auto 40px auto' }}>
              কেন্দ্রীয় পরিচালনা পর্ষদ ও প্রশাসনের নিষ্ঠাবান কর্মকর্তাদের পরিচিতি, দিকনির্দেশনা ও সার্বিক দায়িত্ব।
            </p>
          </div>

          <div className="employee-grid">
            {hqEmployees.map(emp => (
              <div key={emp.id} className="employee-card hq-employee-card">
                <div className="employee-photo-wrap">
                  <img src={emp.photo_url} alt={emp.name_bn} className="employee-photo" />
                </div>
                <div className="employee-info">
                  <span className="employee-dept-badge">{emp.department || 'সদর দপ্তর'}</span>
                  <h3 className="employee-name">{emp.name_bn}</h3>
                  <div className="employee-designation">{emp.designation}</div>
                  <p className="employee-desc">{emp.bio?.substring(0, 95)}...</p>
                  <Link to={`/employee/${emp.slug}`} className="card-float-btn hq-float-btn" style={{ marginTop: 'auto' }}>
                    <span className="card-btn-inner">
                      <span>পরিচিতি ও বিস্তারিত</span>
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FAQ SECTION (সচরাচর জিজ্ঞাসিত প্রশ্নাবলী - White Background)
          ========================================================================= */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="faq-header-wrap">
            <span className="faq-top-badge">
              <HelpCircle size={16} />
              <span>সাধারণ জিজ্ঞাসা ও উত্তর</span>
            </span>
            <h2 className="faq-section-title">সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)</h2>
            <p className="faq-section-subtitle">
              ভর্তি, কোর্স পরিচালনা, প্রজেক্ট, সার্টিফিকেট ও ক্যারিয়ার সংক্রান্ত আপনার সকল প্রশ্নের নির্ভরযোগ্য উত্তর এখানে পেয়ে যাবেন।
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="faq-categories-row">
            <button 
              type="button" 
              className={`faq-category-btn ${faqCategory === 'all' ? 'active' : ''}`}
              onClick={() => { setFaqCategory('all'); setOpenFaqId(null); }}
            >
              <span className="faq-category-btn-inner">সকল প্রশ্ন</span>
            </button>
            <button 
              type="button" 
              className={`faq-category-btn ${faqCategory === 'admission' ? 'active' : ''}`}
              onClick={() => { setFaqCategory('admission'); setOpenFaqId(null); }}
            >
              <span className="faq-category-btn-inner">ভর্তি ও ফি সংক্রান্ত</span>
            </button>
            <button 
              type="button" 
              className={`faq-category-btn ${faqCategory === 'classes' ? 'active' : ''}`}
              onClick={() => { setFaqCategory('classes'); setOpenFaqId(null); }}
            >
              <span className="faq-category-btn-inner">ক্লাস ও প্রশিক্ষণ</span>
            </button>
            <button 
              type="button" 
              className={`faq-category-btn ${faqCategory === 'certificate' ? 'active' : ''}`}
              onClick={() => { setFaqCategory('certificate'); setOpenFaqId(null); }}
            >
              <span className="faq-category-btn-inner">সনদপত্র (Certificate)</span>
            </button>
            <button 
              type="button" 
              className={`faq-category-btn ${faqCategory === 'career' ? 'active' : ''}`}
              onClick={() => { setFaqCategory('career'); setOpenFaqId(null); }}
            >
              <span className="faq-category-btn-inner">ক্যারিয়ার ও সাপোর্ট</span>
            </button>
          </div>

          {/* 2 Column Layout: Accordion on Left, Help/Counseling Card on Right */}
          <div className="faq-layout-grid">
            <div className="faq-accordion-list">
              {filteredFaqs.map(item => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button 
                      type="button" 
                      className="faq-question-btn"
                      onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                    >
                      <span>{item.question}</span>
                      <div className="faq-icon-bubble">
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    <div className="faq-answer-wrap">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Side Support / CTA Card */}
            <div className="faq-support-card">
              <div className="faq-support-icon-wrap">
                <HelpCircle size={28} />
              </div>
              <h3 className="faq-support-title">আরও কিছু জানার আছে?</h3>
              <p className="faq-support-desc">
                আপনার প্রয়োজনীয় প্রশ্নের উত্তর এখানে না পেলে সরাসরি আমাদের ক্যারিয়ার ও ভর্তি কাউন্সেলরের সাথে কথা বলুন।
              </p>

              <div className="faq-support-contact-list">
                <div className="faq-support-contact-item">
                  <PhoneCall size={18} color="#34d399" style={{ flexShrink: 0 }} />
                  <span>হটলাইন: 01711006214</span>
                </div>
                <div className="faq-support-contact-item">
                  <Clock size={18} color="#34d399" style={{ flexShrink: 0 }} />
                  <span>সময়: দুপুর ১২টা থেকে রাত ৮টা (শনি হতে বৃহস্পতি)</span>
                </div>
                <div className="faq-support-contact-item">
                  <Mail size={18} color="#a7f3d0" style={{ flexShrink: 0 }} />
                  <span>ইমেইল: supportbait@gmail.com</span>
                </div>
                <div className="faq-support-contact-item" style={{ alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#fef08a" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.86rem', lineHeight: '1.45' }}>
                    ৩১/১ শরীফ কমপ্লেক্স, দৈনিক বাংলার আলো নিউজ পত্রিকা অফিস, ৬ষ্ঠ তলা, পুরানা পল্টন, ঢাকা।
                  </span>
                </div>
              </div>

              <Link 
                to="/jogajog" 
                className="slider-float-btn slider-float-primary"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <span className="btn-inner-content" style={{ width: '100%', padding: '12px 20px', fontSize: '0.96rem', justifyContent: 'center' }}>
                  <span>সরাসরি যোগাযোগ করুন</span>
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

