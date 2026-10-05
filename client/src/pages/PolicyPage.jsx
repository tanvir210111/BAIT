import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, RefreshCw, ArrowLeft } from 'lucide-react';

export default function PolicyPage({ type = 'privacy' }) {
  const content = {
    refund: {
      badge: 'রিফান্ড পলিসি',
      title: 'BAIT রিফান্ড ও রিটার্ন নীতিমালা',
      icon: RefreshCw,
      updated: 'সর্বশেষ আপডেট: অক্টোবর ২০২৬',
      sections: [
        {
          heading: '১. কোর্স ফি রিফান্ড প্রাপ্তির যোগ্যতা',
          body: 'কোর্সের প্রথম ক্লাসের পর কোনো শিক্ষার্থী যদি মনে করেন কোর্সটি তার জন্য উপযুক্ত নয়, তবে দ্বিতীয় ক্লাসের পূর্বে লিখিত বা ইমেইলের মাধ্যমে রিফান্ডের আবেদন জানাতে পারেন। এ ক্ষেত্রে সম্পূর্ণ ফি (প্রসেসিং চার্জ ব্যতীত) ফেরত দেওয়া হবে।'
        },
        {
          heading: '২. রিফান্ডের শর্তাবলী',
          body: 'কোর্সের মোট ক্লাসের ১০% এর বেশি সম্পন্ন হলে বা ক্লাস মেটেরিয়ালস/রিসোর্স ডাউনলোড করার পর কোনো রিফান্ড আবেদন গ্রহণযোগ্য হবে না। তবে বিশেষ অসুস্থতা বা যুক্তিসঙ্গত কারণে পরবর্তী যেকোনো ব্যাচে বিনামূল্যে ব্যাচ ট্রান্সফারের সুযোগ থাকবে।'
        },
        {
          heading: '৩. রিফান্ড প্রসেসিং সময়সীমা',
          body: 'রিফান্ড আবেদন অনুমোদনের ৫ থেকে ৭ কর্মদিবসের মধ্যে যে মাধ্যমে অর্থ পরিশোধ করা হয়েছিল (বিকাশ, নগদ, রকেট বা ব্যাংক একাউন্ট), সেই মাধ্যমেই অর্থ ফেরত পাঠানো হবে।'
        },
        {
          heading: '৪. হেল্পলাইন ও সহায়তা',
          body: 'রিফান্ড সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের অফিসিয়াল ইমেইল supportbait@gmail.com অথবা হটলাইন নম্বর 01711006214 এ যোগাযোগ করার জন্য অনুরোধ করা হচ্ছে।'
        }
      ]
    },
    privacy: {
      badge: 'প্রাইভেসী পলিসি',
      title: 'BAIT গোপনীয়তা ও প্রাইভেসী নীতিমালা',
      icon: ShieldCheck,
      updated: 'সর্বশেষ আপডেট: অক্টোবর ২০২৬',
      sections: [
        {
          heading: '১. সংগৃহীত তথ্যাবলী',
          body: 'BAIT-এ ভর্তি বা নিবন্ধনের সময় শিক্ষার্থীদের নাম, মোবাইল নম্বর, ইমেইল ঠিকানা ও শিক্ষাগত তথ্য সংগ্রহ করা হয়। এই তথ্য শুধুমাত্র অ্যাকাডেমিক পরিচালনা ও যোগাযোগ রক্ষার উদ্দেশ্যে ব্যবহৃত হয়।'
        },
        {
          heading: '২. তথ্যের নিরাপত্তা ও গোপনীয়তা',
          body: 'আমরা আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। কোনো শিক্ষার্থীর ব্যক্তিগত তথ্য তৃতীয় কোনো বাণিজ্যিক প্রতিষ্ঠানের কাছে বিক্রয়, হস্তান্তর বা অপব্যবহার করা হয় না।'
        },
        {
          heading: '৩. পেমেন্ট তথ্যের নিরাপত্তা',
          body: 'অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে পরিশোধকৃত সকল তথ্য এনক্রিপ্টেড ও ব্যাংক-গ্রেড সিকিউরিটি দ্বারা সংরক্ষিত। BAIT কোনো শিক্ষার্থীর পিন বা কার্ডের পূর্ণাঙ্গ বিবরণ সংরক্ষণ করে না।'
        },
        {
          heading: '৪. কুকিজ ও সাইট ব্যবহার',
          body: 'আমাদের সাইটের ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং প্রয়োজনীয় সেশন বজায় রাখতে স্ট্যান্ডার্ড কুকিজ ব্যবহৃত হয়। আপনি যেকোনো সময় ব্রাউজার সেটিংস থেকে কুকিজ নিয়ন্ত্রণ করতে পারেন।'
        }
      ]
    },
    terms: {
      badge: 'টার্মস এবং শর্তাবলী',
      title: 'BAIT ব্যবহারের নিয়মাবলী ও শর্তসমূহ',
      icon: FileText,
      updated: 'সর্বশেষ আপডেট: অক্টোবর ২০২৬',
      sections: [
        {
          heading: '১. প্ল্যাটফর্ম ব্যবহার নীতিমালা',
          body: 'BAIT ওয়েবসাইটের সকল কারিকুলাম, ক্লাস রেকর্ডিং ও রিসোর্স মেধাস্বত্ব আইনের আওতাভুক্ত। কোনো কোর্স উপাদান অননুমোদিতভাবে বাণিজ্যিক উদ্দেশ্যে পুনরুৎপাদন, শেয়ার বা বিক্রয় করা সম্পূর্ণ নিষিদ্ধ।'
        },
        {
          heading: '২. কোড অফ কন্ডাক্ট ও আচরণবিধি',
          body: 'ক্লাসরুম ও কমিউনিটি সাপোর্ট গ্রুপগুলোতে সহপাঠী ও প্রশিক্ষকদের প্রতি সম্মানজনক আচরণ বজায় রাখতে হবে। যেকোনো ধরনের অশোভন আচরণ বা নীতিবিরোধী কার্যকলাপের ক্ষেত্রে কর্তৃপক্ষ সংশ্লিষ্ট শিক্ষার্থীর ভর্তি বাতিল করার অধিকার সংরক্ষণ করে।'
        },
        {
          heading: '৩. ক্লাসের সময়সূচি ও আপডেট',
          body: 'প্রশিক্ষণ কার্যক্রমের গুণগত মান নিশ্চিত করতে কর্তৃপক্ষ প্রয়োজনে ব্যাচের সময়সূচি বা প্রশিক্ষক সমন্বয়ের অধিকার রাখে, যা শিক্ষার্থীদের পূর্বাহ্নে নোটিফিকেশন বা ইমেইলের মাধ্যমে জানানো হবে।'
        },
        {
          heading: '৪. সনদ ও স্বীকৃতি',
          body: 'কোর্সের সকল অ্যাসাইনমেন্ট এবং ফাইনাল প্রজেক্ট সফলভাবে জমা দেওয়ার ভিত্তিতেই শুধুমাত্র ভেরিফায়েড সার্টিফিকেট প্রদান করা হবে।'
        }
      ]
    }
  };

  const data = content[type] || content.privacy;
  const IconComponent = data.icon;

  return (
    <div style={{ background: '#f8fafc', minHeight: '80vh', padding: '60px 0 80px 0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', marginBottom: '24px' }}>
          <ArrowLeft size={18} />
          <span>হোমপেজে ফিরে যান</span>
        </Link>

        <div style={{ background: '#ffffff', borderRadius: '18px', padding: '40px', border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#ecfdf5', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComponent size={28} />
            </div>
            <div>
              <span className="badge-tag badge-teal" style={{ marginBottom: '4px' }}>{data.badge}</span>
              <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', margin: 0, fontWeight: 800 }}>{data.title}</h1>
            </div>
          </div>

          <div style={{ fontSize: '0.86rem', color: '#94a3b8', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '26px' }}>
            {data.updated}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {data.sections.map((sec, idx) => (
              <div key={idx} style={{ background: '#fcfdfd', padding: '20px 24px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                <h2 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '8px', fontWeight: 700 }}>
                  {sec.heading}
                </h2>
                <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.75', margin: 0 }}>
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b', fontSize: '0.92rem' }}>
            যেকোনো সহায়তার জন্য ইমেইল করুন: <a href="mailto:supportbait@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>supportbait@gmail.com</a> অথবা কল করুন: <strong>01711006214</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
