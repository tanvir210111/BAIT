import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, RefreshCw } from 'lucide-react';

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
          body: 'রিফান্ড আবেদন অনুমোদনের ৫ থেকে ৭ কর্মদিবসের মধ্যে যে মাধ্যমে অর্থ পরিশোধ করা হয়েছিল (বিকাশ, নগদ বা ব্যাংক একাউন্ট), সেই মাধ্যমেই অর্থ ফেরত পাঠানো হবে।'
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
          heading: '১. সেবার শর্তাবলী গ্রহণ',
          body: 'BAIT প্ল্যাটফর্ম ব্যবহারের মাধ্যমে আপনি আমাদের সকল নিয়ম, নীতিমালা ও আচরণবিধি মেনে নিতে সম্মত হচ্ছেন।'
        },
        {
          heading: '২. শিক্ষার্থীর আচরণবিধি',
          body: 'লাইভ ক্লাসে শিক্ষক এবং সহপাঠীদের প্রতি মার্জিত আচরণ বজায় রাখতে হবে। প্ল্যাটফর্মের কোনো ভিডিও বা কোর্স কনটেন্ট বাণিজ্যিক উদ্দেশ্যে শেয়ার বা বিক্রি করা সম্পূর্ণ নিষিদ্ধ।'
        },
        {
          heading: '৩. মেধা স্বত্ব ও কপিরাইট',
          body: 'BAIT-এর সকল লেকচার, স্লাইড, কোডবেস এবং প্রজেক্ট ম্যাটেরিয়াল কপিরাইট আইনের আওতায় সংরক্ষিত।'
        },
        {
          heading: '৪. অ্যাকাউন্টের নিরাপত্তা',
          body: 'আপনার শিক্ষার্থী অ্যাকাউন্টের ইউজারনেম ও পাসওয়ার্ডের গোপনীয়তা রক্ষার দায়িত্ব সম্পূর্ণ আপনার নিজের।'
        }
      ]
    }
  };

  const current = content[type] || content.privacy;
  const IconComponent = current.icon;

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>{current.badge}</span>
          </div>
          <h1 className="page-banner-title">{current.title}</h1>
          <p className="page-banner-subtitle">{current.updated}</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px', maxWidth: '860px' }}>
        <div className="details-card-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0, 106, 78, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComponent size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', margin: 0 }}>{current.title}</h2>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>বাংলার আলো আইটি (BAIT)</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {current.sections.map((sec, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                  {sec.heading}
                </h3>
                <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
