import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Wallet, 
  FileText,
  AlertCircle
} from 'lucide-react';
import clientService from '../../services/clientService';
import ROUTES from '../../constants/routes';

export default function ClientRequestProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    serviceCategory: 'ওয়েবসাইট ডেভেলপমেন্ট (MERN/Next.js)',
    budget: '১,০০,০০০ - ২,০০,০০০ ৳',
    deadline: '২ মাস',
    description: '',
    features: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await clientService.requestProject(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.CLIENT.PROJECTS);
      }, 2000);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="client-page">
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--client-text)', margin: '0 0 8px 0' }}>
            নতুন আইটি প্রজেক্ট প্রস্তাবনা ও রিকোয়েস্ট
          </h1>
          <p style={{ color: 'var(--client-text-muted)', margin: 0, fontSize: '0.94rem' }}>
            আপনার ব্যবসার চাহিদা অনুযায়ী প্রয়োজনীয় সফটওয়্যার বা আইটি সার্ভিসের বিবরণ দিন। আমাদের টেকনিক্যাল টিম ২৪ ঘণ্টার মধ্যে কোটেশন ও আর্কিটেকচার প্ল্যান প্রদান করবে।
          </p>
        </div>

        {success && (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '1.25rem', borderRadius: '12px', color: '#065f46', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <CheckCircle2 size={24} color="#10b981" />
            <div>
              <strong>প্রস্তাবনা সফলভাবে জমা হয়েছে!</strong>
              <div style={{ fontSize: '0.86rem' }}>আপনাকে প্রজেক্ট তালিকায় রিডাইরেক্ট করা হচ্ছে...</div>
            </div>
          </div>
        )}

        <div className="client-card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                প্রজেক্টের নাম / শিরোনাম *
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: স্মার্ট ফার্মেসি ম্যানেজমেন্ট সিস্টেম"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.94rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  সার্ভিস ক্যাটাগরি
                </label>
                <select
                  value={formData.serviceCategory}
                  onChange={e => setFormData({ ...formData, serviceCategory: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.94rem', outline: 'none', background: '#fff' }}
                >
                  <option>ওয়েবসাইট ডেভেলপমেন্ট (MERN/Next.js)</option>
                  <option>মোবাইল অ্যাপ্লিকেশন (Flutter)</option>
                  <option>কাস্টম এন্টারপ্রাইজ ERP / POS</option>
                  <option>ইউআই/ইউএক্স প্রোটোটাইপিং</option>
                  <option>ডিজিটাল মার্কেটিং ও এসইও ক্যাম্পেইন</option>
                  <option>ক্লাউড আর্কিটেকচার ও ডেভঅপস</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  আনুমানিক বাজেট সীমা
                </label>
                <select
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.94rem', outline: 'none', background: '#fff' }}
                >
                  <option>৫০,০০০ - ১,০০,০০০ ৳</option>
                  <option>১,০০,০০০ - ২,০০,০০০ ৳</option>
                  <option>২,০০,০০০ - ৫,০০,০০০ ৳</option>
                  <option>৫,০০,০০০+ ৳ (এন্টারপ্রাইজ)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                প্রকল্পের বিস্তারিত বিবরণ ও লক্ষ্য *
              </label>
              <textarea
                rows={4}
                required
                placeholder="আপনার ব্যবসার মূল উদ্দেশ্য, টার্গেট ইউজার এবং সফটওয়্যারটির কাজ কী হবে তা সংক্ষেপে লিখুন..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.94rem', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                background: 'linear-gradient(135deg, #006a4e 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '13px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 106, 78, 0.35)',
                marginTop: '8px'
              }}
            >
              <Send size={18} />
              <span>{submitting ? 'জমা হচ্ছে...' : 'প্রজেক্ট রিকোয়েস্ট পাঠান'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
