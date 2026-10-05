import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, BookOpen, Laptop, Users, Newspaper, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>আমাদের সম্পর্কে</span>
          </div>
          <h1 className="page-banner-title">আমাদের সম্পর্কে (About BAIT)</h1>
          <p className="page-banner-subtitle">
            বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট অব টেকনোলজি — প্রযুক্তি ও জ্ঞানের তৃণমূল সংযোগ।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* ১. BAIT সম্পর্কে */}
        <div className="details-card-box">
          <h2 className="details-card-title">
            <ShieldCheck size={24} color="var(--primary)" />
            <span>BAIT সম্পর্কে</span>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-main)', marginBottom: '16px' }}>
            <strong>বাংলাদেশ অ্যাডভান্সড ইনস্টিটিউট অব টেকনোলজি (BAIT)</strong> একটি জাতীয় পর্যায়ের অগ্রগামী কারিগরি, প্রশিক্ষণ ও গবেষণা প্রতিষ্ঠান। বাংলাদেশের প্রান্তিক পর্যায়ের সাধারণ মানুষ ও তরুণ সমাজের কাছে আধুনিক তথ্যপ্রযুক্তি, ডিজিটাল সাক্ষরতা ও বাস্তবমুখী কর্মসংস্থানের পথ উন্মোচন করতে BAIT কাজ করছে।
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-main)' }}>
            বাংলাদেশের প্রতিটি বিভাগ, জেলা ও উপজেলার তৃণমূল জনসাধারণের সাথে প্রত্যক্ষ যোগাযোগ রক্ষা করে আমরা তথ্য ও প্রযুক্তির সুফলকে সাধারণ মানুষের দোরগোড়ায় পৌঁছে দিতে অঙ্গীকারবদ্ধ। আমাদের রয়েছে সুসংগঠিত প্রশিক্ষক দল, প্রত্যন্ত অঞ্চলের শিক্ষার্থী নেটওয়ার্ক এবং নিষ্ঠাবান সাংবাদিক ফোরাম।
          </p>
        </div>

        {/* ২. লক্ষ্য ও উদ্দেশ্য (Vision & Mission) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '36px' }}>
          <div className="details-card-box" style={{ marginBottom: 0 }}>
            <h2 className="details-card-title">
              <Compass size={24} color="var(--accent)" />
              <span>আমাদের লক্ষ্য (Our Vision)</span>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              বাংলাদেশের প্রতিটি বিভাগ ও উপজেলার তরুণদের যুগোপযোগী প্রযুক্তি শিক্ষায় দক্ষ করে তোলা; যাতে তারা বৈশ্বিক ডিজিটাল অর্থনীতিতে অবদান রাখার পাশাপাশি স্থানীয় পর্যায়ে সামাজিক ও অর্থনৈতিক রূপান্তর ঘটাতে পারে।
            </p>
          </div>

          <div className="details-card-box" style={{ marginBottom: 0 }}>
            <h2 className="details-card-title">
              <Target size={24} color="var(--accent-gold)" />
              <span>আমাদের উদ্দেশ্য (Our Mission)</span>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
              ১. উপজেলা পর্যায় পর্যন্ত আন্তর্জাতিক মানের বিনামূল্যে ও স্বল্পমূল্যের আইসিটি প্রশিক্ষণ নিশ্চিত করা।<br />
              ২. তরুণ শিক্ষার্থীদের ক্যারিয়ার গাইডেন্স ও ফ্রিল্যান্সিং সহায়তা প্রদান।<br />
              ৩. প্রান্তিক সাংবাদিক ফোরামের মাধ্যমে সঠিক ও বস্তুনিষ্ঠ তথ্য তুলে ধরা।
            </p>
          </div>
        </div>

        {/* ৩. আমাদের কার্যক্রম (৬টি প্রধান শাখা) */}
        <div style={{ marginTop: '20px' }}>
          <div className="section-title-wrap">
            <span className="section-tag">কার্যপরিকল্পনা</span>
            <h2 className="section-title">আমাদের প্রধান কার্যক্রম</h2>
            <p className="section-subtitle">
              BAIT মূলত ৬টি প্রধান স্তম্ভের ওপর ভিত্তি করে দেশব্যাপী কার্যক্রম পরিচালনা করে থাকে।
            </p>
          </div>

          <div className="entity-grid">
            {/* ১. প্রশিক্ষণ */}
            <div className="standard-card">
              <div className="card-icon-bubble bubble-division">
                <Laptop size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>১. প্রশিক্ষণ (Training)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                ওয়েব ডেভেলপমেন্ট, সাইবার সিকিউরিটি, মোবাইল অ্যাপ এবং ইউআই/ইউএক্স ডিজাইনে বাস্তবমুখী ল্যাব-ভিত্তিক হ্যান্ডস-অন প্রশিক্ষণ।
              </p>
            </div>

            {/* ২. শিক্ষা */}
            <div className="standard-card">
              <div className="card-icon-bubble bubble-district">
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>২. শিক্ষা (Education)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                স্কুল ও কলেজ পর্যায়ের শিক্ষার্থীদের জন্য ডিজিটাল লিটারেসি, প্রোগ্রামিং ও সাইবার সচেতনতা বিষয়ক কর্মশালা ও সেমিনার।
              </p>
            </div>

            {/* ৩. দক্ষতা উন্নয়ন */}
            <div className="standard-card">
              <div className="card-icon-bubble bubble-upazila">
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>৩. দক্ষতা উন্নয়ন (Skill Development)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                আন্তর্জাতিক ফ্রিল্যান্সিং মার্কেটপ্লেস, প্রফেশনাল সিভি তৈরি এবং ইন্টারভিউ প্রস্তুতির জন্য ক্যারিয়ার মেন্টরিং সেল।
              </p>
            </div>

            {/* ৪. স্থানীয় কার্যক্রম */}
            <div className="standard-card">
              <div className="card-icon-bubble bubble-division">
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>৪. স্থানীয় কার্যক্রম (Local Outreach)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                ৬৪ জেলার প্রতিটি উপজেলায় স্থানীয় কমিটি গঠন ও প্রত্যন্ত অঞ্চলের সুবিধাবঞ্চিত তরুণদের জন্য বিশেষ প্রশিক্ষণ কার্যক্রম।
              </p>
            </div>

            {/* ৫. সাংবাদিকতা */}
            <div className="standard-card">
              <div className="card-icon-bubble bubble-district">
                <Newspaper size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>৫. সাংবাদিকতা (Journalism)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                মাঠপর্যায়ের সাংবাদিকদের জন্য ডেটা জার্নালিজম, ইনভেস্টিগেটিভ রিপোর্টিং ও ডিজিটাল মিডিয়া নীতিমালার ওপর উচ্চতর প্রশিক্ষণ।
              </p>
            </div>

            {/* ৬. সামাজিক কার্যক্রম */}
            <div className="standard-card">
              <div className="card-icon-bubble bubble-upazila">
                <HeartHandshake size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>৬. সামাজিক কার্যক্রম (Social Impact)</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                নারীদের আইসিটি ক্ষমতায়ন, প্রতিবন্ধী ব্যক্তিদের জন্য প্রযুক্তি প্রশিক্ষণ এবং যুব সমাজের নৈতিক ও মেধা বিকাশ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
