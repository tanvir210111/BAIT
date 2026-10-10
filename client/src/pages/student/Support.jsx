import React, { useState } from 'react';
import { Headphones, MessageSquare, Send, CheckCircle2, Clock, Plus, ExternalLink, HelpCircle } from 'lucide-react';

export default function Support() {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('technical');
  const [ticketMessage, setTicketMessage] = useState('');
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 'TICK-402',
      subject: 'রেড্যাক্স টুলকিট useSelector টাইপ সমস্যা সমাধান',
      category: 'কোডিং ও কারিগরি সহায়তা',
      status: 'Resolved',
      statusBangla: 'সমাধান হয়েছে',
      date: '০৪ জানুয়ারি ২০২৪',
      lastReply: 'প্রধান মেন্টর তানভীর আহমেদ গুগল মিট কলে যুক্ত হয়ে বাগ সমাধান করে দিয়েছেন।'
    },
    {
      id: 'TICK-409',
      subject: 'গ্রাফিক ফান্ডামেন্টালস সার্টিফিকেট ডাউনলোড লিংক সংক্রান্ত প্রশ্ন',
      category: 'সনদপত্র ও অ্যাকাডেমিক',
      status: 'In Progress',
      statusBangla: 'কাজ চলছে',
      date: '০৮ জানুয়ারি ২০২৪',
      lastReply: 'অ্যাকাডেমিক শাখায় তথ্য যাচাই করা হচ্ছে।'
    }
  ]);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    const newTk = {
      id: `TICK-${Math.floor(400 + Math.random() * 500)}`,
      subject: ticketSubject,
      category: ticketCategory === 'technical' ? 'কোডিং ও কারিগরি সহায়তা' : 'প্রশাসনিক সহায়তা',
      status: 'Open',
      statusBangla: 'নতুন আবেদন',
      date: 'আজ (সদ্য খোলা)',
      lastReply: 'আবেদন গ্রহণ করা হয়েছে। মেন্টর দ্রুত যোগাযোগ করবেন।'
    };

    setTickets([newTk, ...tickets]);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setShowNewTicketModal(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 1500);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Headphones size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">সাপোর্ট ও লাইভ ডাউট সলভ হেল্পডেস্ক</h1>
          </div>
          <p className="utopia-page-subtitle">
            কোর্সের যেকোনো কোডিং ত্রুটি, অ্যাসাইনমেন্ট সংক্রান্ত সন্দেহ বা অ্যাকাডেমিক প্রয়োজনে মেন্টরের সাথে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <button 
          type="button" 
          className="utopia-btn-primary"
          onClick={() => setShowNewTicketModal(true)}
        >
          <Plus size={16} />
          <span>নতুন সাপোর্ট টিকিট খুলুন</span>
        </button>
      </div>

      {/* Quick Help Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="utopia-card" style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1e293b 100%)', color: '#ffffff' }}>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#ffffff' }}>
            লাইভ ডাউট ক্লিয়ারিং রুম
          </h3>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
            প্রতিদিন বিকাল ৪:০০ টা থেকে রাত ১১:০০ টা পর্যন্ত প্রধান মেন্টররা লাইভ ডিসকর্ড ও জুম ভয়েস রুমে স্ক্রিন শেয়ারের মাধ্যমে সরাসরি কোড সমাধান করে দেন।
          </p>
          <a 
            href="https://discord.gg/bait-community" 
            target="_blank" 
            rel="noreferrer"
            className="utopia-btn-primary"
            style={{ background: '#3b82f6', textDecoration: 'none', display: 'inline-flex' }}
          >
            <span>লাইভ মেন্টর রুমে প্রবেশ করুন</span>
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="utopia-card">
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: '#0f172a' }}>
            জরুরি হোয়াটসঅ্যাপ হেল্পলাইন
          </h3>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
            অ্যাকাডেমিক ফি, পরীক্ষা সংক্রান্ত সমস্যা বা জরুরি হেল্পলাইনের জন্য আমাদের হোয়াটসঅ্যাপ ডেস্কে বার্তা পাঠান।
          </p>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#059669', marginBottom: '0.75rem' }}>
            হোয়াটসঅ্যাপ: +৮৮০ ১৭১১-০০৬২১৪
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            সময়সূচি: সকাল ১০:০০ - রাত ১০:০০ টা
          </span>
        </div>
      </div>

      {/* Support Tickets Table */}
      <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #edf2f7' }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
            আপনার সাপোর্ট টিকেটসমূহ
          </h3>
        </div>

        <div className="utopia-table-container">
          <table className="utopia-exam-table">
            <thead>
              <tr>
                <th>টিকেট আইডি</th>
                <th>বিষয়</th>
                <th>বিভাগ</th>
                <th>তারিখ</th>
                <th>অবস্থা</th>
                <th>সর্বশেষ মেন্টর মন্তব্য</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(tk => (
                <tr key={tk.id}>
                  <td>
                    <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, color: '#0f172a' }}>
                      {tk.id}
                    </code>
                  </td>
                  <td>
                    <strong style={{ color: '#0f172a', fontSize: '0.86rem' }}>{tk.subject}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#475569' }}>{tk.category}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{tk.date}</span>
                  </td>
                  <td>
                    <span className={`badge-status ${tk.status === 'Resolved' ? 'badge-completed' : 'badge-upcoming'}`}>
                      {tk.statusBangla}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#334155' }}>{tk.lastReply}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="utopia-modal-backdrop" onClick={() => setShowNewTicketModal(false)}>
          <div className="utopia-modal-box" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <HelpCircle size={18} color="#0284c7" />
                <h3>নতুন সাপোর্ট টিকেট তৈরি করুন</h3>
              </div>
              <button 
                type="button" 
                className="utopia-modal-close"
                onClick={() => setShowNewTicketModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              {!createdSuccess ? (
                <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      টিকেটের বিষয় (Subject) *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="যেমন: রিঅ্যাক্ট রেড্যাক্স ডিসপ্যাচ করার পর স্টেট আপডেট হচ্ছে না"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      বিভাগ বেছে নিন
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="utopia-input"
                    >
                      <option value="technical">কোডিং ও কারিগরি সহায়তা</option>
                      <option value="academic">অ্যাকাডেমিক / পরীক্ষা / অ্যাসাইনমেন্ট সহায়তা</option>
                      <option value="administrative">হিসাব ও ফি সংক্রান্ত প্রশ্ন</option>
                      <option value="certificate">সনদপত্র ভেরিফিকেশন</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      সমস্যার বিস্তারিত বিবরণ *
                    </label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="এরর মেসেজ, কোড অংশ বা স্ক্রিনশট লিংক এখানে লিখুন..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div className="utopia-modal-footer" style={{ padding: '0.5rem 0 0 0', background: 'transparent' }}>
                    <button
                      type="button"
                      onClick={() => setShowNewTicketModal(false)}
                      className="utopia-btn-secondary"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="utopia-btn-primary"
                    >
                      <Send size={15} />
                      <span>টিকেট জমা দিন</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={46} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h3 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>সাপোর্ট টিকেট সফলভাবে তৈরি হয়েছে!</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>
                    মেন্টর টিম শীঘ্রই আপনার সমস্যাটি পর্যবেক্ষণ করে উত্তর প্রদান করবে।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
