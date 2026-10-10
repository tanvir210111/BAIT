import React, { useState } from 'react';
import { Megaphone, Bell, Check, Trash2, Calendar, FileText, ExternalLink } from 'lucide-react';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifs, setNotifs] = useState([
    {
      id: 1,
      type: 'class',
      title: 'আজকের লাইভ ক্লাস শুরু রাত ৯:০০ টায়',
      desc: 'মডিউল ১৪: রেড্যাক্স টুলকিট ও আরটিকে কোয়েরি আর্কিটেকচার লাইভ ক্লাসে সবাইকে সময়মতো জুম লিংকে যুক্ত হতে নির্দেশ দেওয়া হচ্ছে।',
      date: 'আজ, সন্ধ্যা ৬:৩০',
      unread: true,
      sender: 'প্রধান মেন্টর টিম'
    },
    {
      id: 2,
      type: 'exam',
      title: 'মিড-টার্ম পরীক্ষার তারিখ ও আসন বিন্যাস প্রকাশিত',
      desc: 'সেমিস্টার ৩ এর গ্রাফিক ডিজাইন ফান্ডামেন্টালস ও ওয়েব ডিজাইন পরীক্ষার আসন বিন্যাস প্রকাশিত হয়েছে। পরীক্ষা বোর্ড ট্যাবে দেখে নিন।',
      date: '১০ জানুয়ারি ২০২৪',
      unread: true,
      sender: 'পরীক্ষা নিয়ন্ত্রণ শাখা'
    },
    {
      id: 3,
      type: 'academic',
      title: 'বিএআইটি টেক ক্লাব সদস্যপদ নিবন্ধন শুরু',
      desc: 'ওয়েব অ্যান্ড ক্লাউড ক্লাব, রোবোটিক্স গিল্ড এবং ইউআই/ইউএক্স ডিজাইন ক্লাবের নতুন সদস্য নিবন্ধন শুরু হয়েছে। শিক্ষার্থী পোর্টাল থেকে বিনামূল্যে যুক্ত হোন।',
      date: '০৮ জানুয়ারি ২০২৪',
      unread: false,
      sender: 'শিক্ষার্থী বিষয়ক পরিষদ'
    },
    {
      id: 4,
      type: 'administrative',
      title: 'সেমিস্টার ৩ এর টিউশন ফি পরিশোধের শেষ সময়',
      desc: 'আগামী ২৮ ফেব্রুয়ারি ২০২৪ এর মধ্যে ২য় কিস্তির ফি পরিশোধের অনুরোধ করা হচ্ছে। অনলাইনে বিকাশ/নগদ দিয়ে ফি প্রদান করা যাবে।',
      date: '০৪ জানুয়ারি ২০২৪',
      unread: false,
      sender: 'হিসাব ও অর্থ শাখা'
    }
  ]);

  const [activeModalNotif, setActiveModalNotif] = useState(null);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotif = (id) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifs = notifs.filter(n => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'exam') return n.type === 'exam';
    if (activeTab === 'class') return n.type === 'class';
    return true;
  });

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Megaphone size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">নোটিশ (নোটিশ ও জরুরি ঘোষণা)</h1>
          </div>
          <p className="utopia-page-subtitle">
            বিএআইটি একাডেমির অফিশিয়াল প্রশাসনিক নোটিশ, ক্লাস অ্যালার্ট এবং পরীক্ষার যাবতীয় ঘোষণা।
          </p>
        </div>

        <button 
          type="button" 
          className="utopia-btn-outline-sm"
          onClick={markAllRead}
        >
          <Check size={14} />
          <span>সব পড়া হয়েছে (Mark All Read)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="utopia-filter-card" style={{ justifyContent: 'flex-start', gap: '8px' }}>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          সকল নোটিশ ({notifs.length})
        </button>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'unread' ? 'active' : ''}`}
          onClick={() => setActiveTab('unread')}
        >
          অপঠিত নোটিশ ({notifs.filter(n => n.unread).length})
        </button>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'exam' ? 'active' : ''}`}
          onClick={() => setActiveTab('exam')}
        >
          পরীক্ষা সংক্রান্ত
        </button>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'class' ? 'active' : ''}`}
          onClick={() => setActiveTab('class')}
        >
          লাইভ ক্লাস সংক্রান্ত
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredNotifs.length === 0 ? (
          <div className="utopia-card" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            কোনো নোটিশ খুঁজে পাওয়া যায়নি।
          </div>
        ) : (
          filteredNotifs.map(notif => (
            <div 
              key={notif.id} 
              className={`utopia-card notif-item-card ${notif.unread ? 'unread-card' : ''}`}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.15rem', cursor: 'pointer' }}
              onClick={() => setActiveModalNotif(notif)}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '8px', 
                  background: notif.unread ? '#e0f2fe' : '#f1f5f9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: notif.unread ? '#0284c7' : '#64748b',
                  flexShrink: 0
                }}>
                  <Bell size={18} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.94rem', color: '#0f172a', fontWeight: notif.unread ? 800 : 600 }}>
                      {notif.title}
                    </h4>
                    {notif.unread && (
                      <span style={{ fontSize: '0.68rem', background: '#dc2626', color: '#ffffff', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                        নতুন
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 6px 0', fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                    {notif.desc}
                  </p>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    প্রেরক: <strong>{notif.sender}</strong> • {notif.date}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotif(notif.id);
                }}
                className="utopia-modal-close"
                title="মুছে ফেলুন"
                style={{ padding: '4px' }}
              >
                <Trash2 size={15} color="#94a3b8" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Notification Details Modal */}
      {activeModalNotif && (
        <div className="utopia-modal-backdrop" onClick={() => setActiveModalNotif(null)}>
          <div className="utopia-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <Bell size={18} color="#0284c7" />
                <h3>নোটিশের বিস্তারিত বিবরণ</h3>
              </div>
              <button 
                type="button" 
                className="utopia-modal-close"
                onClick={() => setActiveModalNotif(null)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              <h3 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>{activeModalNotif.title}</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '1.25rem' }}>
                প্রেরক: <strong>{activeModalNotif.sender}</strong> • প্রকাশের তারিখ: {activeModalNotif.date}
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                {activeModalNotif.desc}
              </div>
            </div>

            <div className="utopia-modal-footer">
              <button
                type="button"
                className="utopia-btn-primary"
                onClick={() => setActiveModalNotif(null)}
              >
                পড়া হয়েছে
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
