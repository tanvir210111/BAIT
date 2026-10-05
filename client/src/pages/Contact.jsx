import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setStatusMsg({ type: 'error', text: 'অনুগ্রহ করে আপনার নাম এবং বার্তা প্রদান করুন।' });
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg({ type: 'success', text: data.message || 'আপনার বার্তাটি সফলভাবে পৌঁছানো হয়েছে। ধন্যবাদ!' });
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'বার্তা পাঠানো সম্ভব হয়নি। পুনরায় চেষ্টা করুন।' });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'সার্ভারের সাথে যোগাযোগে সমস্যা হয়েছে।' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>যোগাযোগ</span>
          </div>
          <h1 className="page-banner-title">যোগাযোগ করুন</h1>
          <p className="page-banner-subtitle">
            BAIT সদর দপ্তর, বিভাগীয় কার্যালয় অথবা যে কোনো তথ্য ও পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="details-content-grid">
          {/* Left Column: Contact Form */}
          <div className="details-card-box">
            <h2 className="details-card-title">
              <Send size={22} color="var(--primary)" />
              <span>আমাদের বার্তা পাঠান</span>
            </h2>

            {statusMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                background: statusMsg.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: statusMsg.type === 'success' ? '#065f46' : '#991b1b',
                border: `1px solid ${statusMsg.type === 'success' ? '#a7f3d0' : '#fecaca'}`
              }}>
                {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">আপনার পূর্ণ নাম *</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="যেমন: মোঃ কামরুল হাসান"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">ফোন নম্বর</label>
                  <input 
                    type="tel"
                    className="form-control"
                    placeholder="যেমন: 01700000000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ই-মেইল ঠিকানা</label>
                  <input 
                    type="email"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">বার্তার বিষয়</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="যেমন: উপজেলায় নতুন কোর্স চালু করার আবেদন"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">আপনার বার্তা *</label>
                <textarea 
                  rows={5}
                  className="form-control"
                  placeholder="বিস্তারিত বার্তা লিখুন..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
                style={{ width: '100%', height: '46px' }}
              >
                <span>{submitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}</span>
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Right Column: HQ Office Info & Map */}
          <div>
            <div className="details-card-box">
              <h3 className="details-card-title">
                <MapPin size={22} color="var(--primary)" />
                <span>BAIT সদর দপ্তর</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>ঠিকানা:</strong><br />
                    BAIT টাওয়ার, প্লট-৭/এ, মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>ফোন নম্বর:</strong><br />
                    +৮৮০ ২-৯৮৭৬৫৪৩, +৮৮০ ১৭০০ ০০১১২২
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Mail size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>অফিসিয়াল ই-মেইল:</strong><br />
                    info@bait.org.bd, support@bait.org.bd
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Clock size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>অফিস সময়:</strong><br />
                    রবিবার হতে বৃহস্পতিবার: সকাল ৯:০০ টা – বিকাল ৫:০০ টা<br />
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>(শুক্রবার ও শনিবার সাপ্তাহিক বন্ধ)</span>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed iframe */}
              <div style={{ marginTop: '24px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <iframe 
                  title="BAIT সদর দপ্তর অবস্থান মানচিত্র"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700319752535!2d90.3654215!3d23.8052445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d33532b3fb%3A0x2b35ef50567a572a!2sMirpur%2010%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                  width="100%" 
                  height="220" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
