import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Send, CheckCircle2, MessageSquare, Clock, PhoneCall } from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'কারিগরি ও কোডিং সহায়তা', message: '' });
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    studentService.getSupportTickets()
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.message.trim()) return;

    try {
      const res = await studentService.createSupportTicket(ticketForm);
      const newTicket = {
        id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
        subject: ticketForm.subject,
        category: ticketForm.category,
        status: 'চলমান',
        date: 'আজ',
        lastReply: 'আপনার সমস্যাটি সাপোর্ট টিমে পাঠানো হয়েছে।'
      };
      setTickets([newTicket, ...tickets]);
      setStatusMsg({ type: 'success', text: res?.message || 'টিকিট সফলভাবে খোলা হয়েছে।' });
      setTimeout(() => {
        setShowNewModal(false);
        setTicketForm({ subject: '', category: 'কারিগরি ও কোডিং সহায়তা', message: '' });
        setStatusMsg(null);
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'টিকিট খুলতে সমস্যা হয়েছে।' });
    }
  };

  if (loading) {
    return <Loading text="সাপোর্ট লোড হচ্ছে..." fullPage />;
  }

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">শিক্ষার্থী হেল্প ও সাপোর্ট (Student Support)</h1>
          <p className="student-page-subtitle">
            কোডিং এরর, ক্লাস কনসেপ্ট বা যেকোনো কারিগরি সহায়তায় মেন্টরদের সাথে সরাসরি যোগাযোগ।
          </p>
        </div>

        <button 
          type="button" 
          onClick={() => setShowNewModal(true)}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          <span>নতুন সাপোর্ট টিকিট খুলুন</span>
        </button>
      </div>

      {/* Support Hours Banner */}
      <div className="student-card" style={{ padding: '20px', marginBottom: '28px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>
              দৈনিক ওয়ান-টু-ওয়ান গুগল মিট লাইভ সাপোর্ট
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#047857', margin: 0 }}>
              প্রতিদিন বিকাল ৪:০০ টা হতে রাত ৮:০০ টা পর্যন্ত লাইভ স্ক্রিন শেয়ারের মাধ্যমে বাগ ও কোড ফিক্স করা হয়।
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: 700 }}>
            <PhoneCall size={18} />
            <span>হেল্পলাইন: 01711006214</span>
          </div>
        </div>
      </div>

      {/* My Support Tickets */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '16px' }}>
          আমার সাপোর্ট টিকিটসমূহ
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tickets.map(ticket => (
            <div key={ticket.id} className="student-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <code style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700 }}>
                    {ticket.id}
                  </code>
                  <span className="badge-tag badge-teal" style={{ fontSize: '0.78rem' }}>
                    {ticket.category}
                  </span>
                </div>
                <span 
                  className="badge-tag" 
                  style={{ 
                    background: ticket.status === 'সমাধানকৃত' ? '#d1fae5' : '#fef3c7', 
                    color: ticket.status === 'সমাধানকৃত' ? '#065f46' : '#92400e',
                    fontWeight: 700 
                  }}
                >
                  {ticket.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
                {ticket.subject}
              </h3>

              <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                সর্বশেষ আপডেট: {ticket.lastReply}
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                তারিখ: {ticket.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showNewModal && (
        <div className="search-modal-backdrop" onClick={() => setShowNewModal(false)}>
          <div className="student-modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              নতুন সাপোর্ট টিকিট
            </h3>

            {statusMsg && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '6px',
                marginBottom: '16px',
                background: statusMsg.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: statusMsg.type === 'success' ? '#065f46' : '#991b1b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateTicket}>
              <div className="form-group">
                <label className="form-label">সমস্যার ক্যাটাগরি *</label>
                <select 
                  className="form-control"
                  value={ticketForm.category}
                  onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                >
                  <option value="কারিগরি ও কোডিং সহায়তা">কারিগরি ও কোডিং সহায়তা</option>
                  <option value="ক্লাস ও সিলেবাস জিজ্ঞাসা">ক্লাস ও সিলেবাস জিজ্ঞাসা</option>
                  <option value="সার্টিফিকেট ও প্রশাসনিক">সার্টিফিকেট ও প্রশাসনিক</option>
                  <option value="অন্যান্য জিজ্ঞাসা">অন্যান্য জিজ্ঞাসা</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">বিষয় / সমস্যার সংক্ষেপ *</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="যেমন: Redux Toolkit এ useSelector সমস্যা"
                  value={ticketForm.subject}
                  onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">বিস্তারিত বিবরণ *</label>
                <textarea 
                  className="form-control"
                  rows="4"
                  placeholder="কোডের ত্রুটি বা বিস্তারিত সমস্যা লিখুন..."
                  value={ticketForm.message}
                  onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowNewModal(false)}
                  style={{ flex: 1 }}
                >
                  বাতিল
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  টিকিট জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
