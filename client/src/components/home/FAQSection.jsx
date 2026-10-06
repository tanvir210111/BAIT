import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, PhoneCall, Clock, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function FAQSection() {
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

  return (
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
                  <div className="faq-item-inner">
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
  );
}
