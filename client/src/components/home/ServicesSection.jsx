import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Filter, Search, Check, ArrowRight, Code, Smartphone, GraduationCap, Server, Shield } from 'lucide-react';

export default function ServicesSection() {
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');

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
  );
}
