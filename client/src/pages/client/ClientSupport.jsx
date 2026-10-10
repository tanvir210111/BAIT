import React, { useState } from 'react';
import { 
  Headphones, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function ClientSupport() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketPriority, setTicketPriority] = useState('স্বাভাবিক');
  const [submitted, setSubmitted] = useState(false);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const existingTickets = [
    {
      id: 'TICK-CL-801',
      subject: 'পেমেন্ট গেটওয়ে টেস্ট এপিআই সংক্রান্ত প্রশ্ন',
      project: 'প্রাইম টেক মাল্টি-ভেন্ডর ই-কমার্স প্ল্যাটফর্ম',
      status: 'সমাধানকৃত',
      date: '০৩ অক্টোবর ২০২৬',
      reply: 'লিড আর্কিটেক্ট লাইভ টেস্ট ক্রেডেনশিয়াল আপডেট করে দিয়েছেন।'
    },
    {
      id: 'TICK-CL-804',
      subject: 'নতুন সার্ভার ডোমেইন পয়েন্ট করার সহায়তা',
      project: 'কর্পোরেট ব্র্যান্ডিং ওয়েবসাইট',
      status: 'চলমান',
      date: '০৮ অক্টোবর ২০২৬',
      reply: 'ডিএনএস রেকর্ড ভেরিফিকেশনের কাজ চলছে।'
    }
  ];

  return (
    <div className="client-page">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--client-text)', margin: '0 0 6px 0' }}>
          ডেডিকেটেড ক্লায়েন্ট সাপোর্ট ও হেল্পডেস্ক
        </h1>
        <p style={{ color: 'var(--client-text-muted)', margin: 0, fontSize: '0.92rem' }}>
          যেকোনো কারিগরি প্রশ্ন, সার্ভার ডাউনটাইম রিপোর্ট বা প্রজেক্ট পরিবর্তনের জন্য আপনার ডেডিকেটেড ইঞ্জিনিয়ার টিমের সাথে যুক্ত হন।
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Support Tickets Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Create Ticket */}
          <div className="client-card">
            <h2 className="client-card-title" style={{ marginBottom: '1rem' }}>নতুন সাপোর্ট টিকিট খুলুন</h2>
            {submitted && (
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 16px', borderRadius: '10px', color: '#065f46', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#10b981" />
                <span>আপনার সাপোর্ট টিকিট সফলভাবে রেজিস্টার্ড হয়েছে। একজন ইঞ্জিনিয়ার শীঘ্রই যোগাযোগ করবেন।</span>
              </div>
            )}
            <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  বিষয় / সমস্যা সংক্ষেপে *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: এসএসএল সার্টিফিকেট রিনিউয়াল ইস্যু"
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  জরুরিতা স্তর
                </label>
                <select
                  value={ticketPriority}
                  onChange={e => setTicketPriority(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none', background: '#fff' }}
                >
                  <option>স্বাভাবিক (২৪ ঘণ্টার মধ্যে সমাধান)</option>
                  <option>উচ্চ (৬ ঘণ্টার মধ্যে সমাধান)</option>
                  <option>জরুরি / সিস্টেম ডাউন (তাত্ক্ষণিক রেসপন্স)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  বিস্তারিত বিবরণ *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="আপনার সমস্যার বিস্তারিত বা প্রয়োজনীয় পরিবর্তন উল্লেখ করুন..."
                  value={ticketMessage}
                  onChange={e => setTicketMessage(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'var(--client-primary)',
                  color: '#fff',
                  border: 'none',
                  padding: '11px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  alignSelf: 'flex-start'
                }}
              >
                <Send size={16} />
                <span>টিকিট সাবমিট করুন</span>
              </button>
            </form>
          </div>

          {/* Active Tickets History */}
          <div className="client-card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--client-text)', marginBottom: '1rem' }}>
              পূর্ববর্তী সাপোর্ট টিকিটসমূহ
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {existingTickets.map(t => (
                <div key={t.id} style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>{t.id}</span>
                    <span style={{ fontSize: '0.76rem', background: t.status === 'সমাধানকৃত' ? '#dcfce7' : '#fef3c7', color: t.status === 'সমাধানকৃত' ? '#15803d' : '#b45309', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
                      {t.status}
                    </span>
                  </div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--client-text)' }}>{t.subject}</strong>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>প্রজেক্ট: {t.project} • তারিখ: {t.date}</div>
                  <div style={{ marginTop: '8px', padding: '8px 10px', background: '#ffffff', borderRadius: '6px', fontSize: '0.84rem', color: '#334155', borderLeft: '3px solid #10b981' }}>
                    <strong>আপডেট:</strong> {t.reply}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Hotlines Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="client-card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneCall size={18} />
              <span>২৪/৭ এমার্জেন্সি হটলাইন</span>
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '14px' }}>
              লাইভ সার্ভার বা প্রোডাকশন অ্যাপ্লিকেশন ডাউন হলে অবিলম্বে আমাদের জরুরি টেকনিক্যাল রেসপন্স টিমে কল দিন:
            </p>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>হটলাইন ১ (ক্লাউড টিম):</div>
              <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>+৮৮০১৭০০-০০০০০০</strong>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>ইমেইল:</div>
              <strong style={{ fontSize: '0.92rem', color: '#ffffff' }}>enterprise.support@bait.com.bd</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
