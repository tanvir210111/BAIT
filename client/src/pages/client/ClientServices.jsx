import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Smartphone, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  Cloud,
  ArrowRight,
  Plus
} from 'lucide-react';
import ROUTES from '../../constants/routes';

export default function ClientServices() {
  const services = [
    {
      id: 1,
      title: 'ওয়েব ও পোর্টাল ডেভেলপমেন্ট',
      desc: 'MERN ও Next.js দিয়ে এন্টারপ্রাইজ গ্রেড ওয়েবসাইট, অ্যাডমিন ড্যাশবোর্ড ও কাস্টম ওয়েব প্ল্যাটফর্ম।',
      icon: Globe,
      features: ['ফুল-স্ট্যাক আর্কিটেকচার', 'মোবাইল রেসপন্সিভ', 'এসইও ও স্পিড অপ্টিমাইজড']
    },
    {
      id: 2,
      title: 'ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ',
      desc: 'Android ও iOS উভয় প্ল্যাটফর্মের জন্য সিঙ্গেল কোডবেসে উচ্চ পারফরম্যান্সের ফ্লাটার অ্যাপ।',
      icon: Smartphone,
      features: ['অফলাইন সিঙ্ক', 'পুশ নোটিফিকেশন', 'পেমেন্ট গেটওয়ে']
    },
    {
      id: 3,
      title: 'কাস্টম এন্টারপ্রাইজ ERP / POS',
      desc: 'আপনার ব্যবসা প্রতিষ্ঠানের হিসাব, ইনভেন্টরি, সেলস ও এইচআর সম্পূর্ণ অটোমেট করার সফটওয়্যার।',
      icon: Database,
      features: ['রিয়েল-টাইম স্টক আপডেট', 'অটোমেটেড ইনভয়েসিং', 'ভূমিকাভিত্তিক অ্যাক্সেস']
    },
    {
      id: 4,
      title: 'ডিজিটাল মার্কেটিং ও গ্রোথ',
      desc: 'সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO), সোশ্যাল মিডিয়া মার্কেটিং ও টার্গেটেড লিড জেনারেশন।',
      icon: TrendingUp,
      features: ['গুগল র্যাঙ্কিং বুস্ট', 'কনভার্সন রেট অপ্টিমাইজেশন', 'সাপ্তাহিক অ্যানালিটিক্স']
    },
    {
      id: 5,
      title: 'ক্লাউড হোস্টিং ও ডেভঅপস',
      desc: 'AWS, DigitalOcean এবং Docker দিয়ে ৯৯.৯% আপটাইম ও সিকিউর সার্ভার ম্যানেজমেন্ট।',
      icon: Cloud,
      features: ['অটো স্কেলিং', 'প্রতিদিনের ডাটা ব্যাকআপ', 'SSL ও ডিডিওএস প্রটেকশন']
    },
    {
      id: 6,
      title: 'আইটি পরামর্শ ও সিকিউরিটি অডিট',
      desc: 'কোড কোয়ালিটি রিভিউ, আর্কিটেকচারাল প্ল্যানিং ও সাইবার সিকিউরিটি প্রটেকশন সার্ভিস।',
      icon: ShieldCheck,
      features: ['সিকিউরিটি টেস্ট', 'পারফরম্যান্স টিউনিং', '৬ মাস ফ্রি ওয়ারেন্টি']
    }
  ];

  return (
    <div className="client-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--client-text)', margin: '0 0 6px 0' }}>
            আইটি সার্ভিস ক্যাটালগ
          </h1>
          <p style={{ color: 'var(--client-text-muted)', margin: 0, fontSize: '0.92rem' }}>
            BAIT-এর অত্যাধুনিক প্রযুক্তিগত সেবাসমূহ একনজরে দেখুন এবং আপনার প্রতিষ্ঠানের জন্য সরাসরি অর্ডার করুন।
          </p>
        </div>

        <Link to={ROUTES.CLIENT.REQUEST_PROJECT} className="client-cta-req-btn">
          <Plus size={16} />
          <span>নতুন সার্ভিস অর্ডার করুন</span>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {services.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="client-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="client-stat-icon-wrap icon-emerald" style={{ marginBottom: '14px' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--client-text)', marginBottom: '8px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: '1.5', marginBottom: '14px' }}>
                  {s.desc}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {s.features.map((f, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={ROUTES.CLIENT.REQUEST_PROJECT}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--client-primary)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none'
                }}
              >
                <span>কোটেশন রিকোয়েস্ট</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
