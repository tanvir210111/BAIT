import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactAPI } from '../../services/api';

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
      const data = await contactAPI.sendMessage(formData);
      setStatusMsg({ type: 'success', text: data?.message || 'আপনার বার্তাটি সফলভাবে পৌঁছানো হয়েছে। ধন্যবাদ!' });
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message || 'সার্ভারের সাথে যোগাযোগে সমস্যা হয়েছে।' });
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
            BAIT সদর দপ্তর, ক্যারিয়ার কাউন্সেলিং ও যে কোনো তথ্য ও পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন।
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
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
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
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    className="form-control"
                    placeholder="০১৭১১০০০০০০"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ই-মেইল ঠিকানা</label>
                  <input 
                    type="email" 
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">বিষয় / প্রসঙ্গের শিরোনাম</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="যেমন: কোর্স বা প্রশিক্ষণ বিষয়ক তথ্য"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">আপনার বার্তা *</label>
                <textarea 
                  className="form-control"
                  rows="5"
                  placeholder="আপনার জিজ্ঞাসা বা বার্তা বিস্তারিত লিখুন..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting}
                style={{ width: '100%', height: '46px', fontSize: '1rem', fontWeight: 600 }}
              >
                {submitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </button>
            </form>
          </div>

          {/* Right Column: Office info */}
          <div>
            <div className="details-card-box">
              <h2 className="details-card-title">
                <MapPin size={22} color="var(--primary)" />
                <span>BAIT কেন্দ্রীয় কার্যালয়</span>
              </h2>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top', width: '32px' }}><MapPin size={18} color="var(--accent-red)" /></td>
                    <td>
                      <strong>ঠিকানা:</strong><br />
                      ৩১/১ শরীফ কমপ্লেক্স, দৈনিক বাংলার আলো নিউজ পত্রিকা অফিস, ৬ষ্ঠ তলা, পুরানা পল্টন, ঢাকা।
                    </td>
                  </tr>
                  <tr>
                    <td><Phone size={18} color="var(--primary)" /></td>
                    <td>
                      <strong>হটলাইন:</strong> 01711006214
                    </td>
                  </tr>
                  <tr>
                    <td><Mail size={18} color="var(--primary)" /></td>
                    <td>
                      <strong>ইমেইল:</strong> supportbait@gmail.com
                    </td>
                  </tr>
                  <tr>
                    <td><Clock size={18} color="var(--primary)" /></td>
                    <td>
                      <strong>কার্যালয়ের সময়:</strong> শনি - বৃহঃ দুপুর ১২টা - রাত ৮টা
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="details-card-box" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                অনলাইন সাপোর্ট ও কাউন্সেলিং
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#065f46', lineHeight: '1.6' }}>
                কোর্স কারিকুলাম, ভর্তি ফি, সময়সূচি এবং ক্যারিয়ার রোডম্যাপ সম্পর্কে যেকোনো প্রশ্নের সরাসরি উত্তর পেতে আমাদের ভর্তি হেল্পলাইনে কল করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
