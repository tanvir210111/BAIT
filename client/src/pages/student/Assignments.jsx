import React, { useState } from 'react';
import { 
  BookMarked, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  AlertCircle, 
  FileText,
  Send,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

export default function Assignments() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [submitModalHw, setSubmitModalHw] = useState(null);
  const [feedbackModalHw, setFeedbackModalHw] = useState(null);

  // Form state
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [studentNotes, setStudentNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [homeworks, setHomeworks] = useState([
    {
      id: 1,
      courseTitle: 'গ্রাফিক ফান্ডামেন্টালস (ART101)',
      assignmentTitle: 'অ্যাসাইনমেন্ট ০১: ব্র্যান্ড আইডেন্টিটি ও লোগো ডিজাইন',
      dueDateBangla: '১০ই ফেব্রুয়ারি ২০২৪',
      status: 'pending',
      statusBangla: 'জমা দেওয়া হয়নি',
      badgeClass: 'badge-upcoming',
      totalMarks: 50,
      obtainedMarks: null,
      progressPercent: 30,
      description: 'লোগো ডিজাইন, কালার প্যালেট সিলেকশন এবং বিজনেস কার্ডের ফুল ব্র্যান্ডিং প্যাকেজ তৈরি করুন।',
      feedback: null
    },
    {
      id: 2,
      courseTitle: 'অ্যাডভান্সড ওয়েব ডিজাইন (ITD201)',
      assignmentTitle: 'অ্যাসাইনমেন্ট ০২: রেসপনসিভ ই-কমার্স ওয়েবসাইট প্রজেক্ট',
      dueDateBangla: '৫ই মার্চ ২০২৪',
      status: 'completed',
      statusBangla: 'সম্পন্ন হয়েছে',
      badgeClass: 'badge-completed',
      totalMarks: 50,
      obtainedMarks: 48,
      progressPercent: 100,
      description: 'আধুনিক রিঅ্যাক্ট, সিএসএস গ্রিড এবং শপিং কার্ট স্টেট দিয়ে পূর্ণাঙ্গ রেসপনসিভ ওয়েব অ্যাপ তৈরি করুন।',
      feedback: 'দারুণ কাজ! সিএসএস গ্রিড লেআউট এবং মোবাইল ভিউয়ের রেসপনসিভনেস চমৎকার হয়েছে। প্রাপ্ত নম্বর: ৪৮/৫০ (A+)।'
    },
    {
      id: 3,
      courseTitle: 'ইউজার এক্সপেরিয়েন্স রিসার্চ (UXD301)',
      assignmentTitle: 'অ্যাসাইনমেন্ট ০৩: ইউজেবিলিটি টেস্টিং ও রিসার্চ রিপোর্ট',
      dueDateBangla: '১৫ই এপ্রিল ২০২৪',
      status: 'in-progress',
      statusBangla: 'কাজ চলছে',
      badgeClass: 'badge-upcoming',
      totalMarks: 50,
      obtainedMarks: null,
      progressPercent: 65,
      description: 'ফিগমা প্রোটোটাইপের ওপর ৫ জন ব্যবহারকারীর সাথে ইউজেবিলিটি সেশন সম্পন্ন করে একটি পূর্ণাঙ্গ রিপোর্ট তৈরি করুন।',
      feedback: null
    },
    {
      id: 4,
      courseTitle: 'ডিজিটাল ফটোগ্রাফি (ART104)',
      assignmentTitle: 'অ্যাসাইনমেন্ট ০৪: ফটো জার্নালিজম ভিজ্যুয়াল প্রজেক্ট',
      dueDateBangla: '৮ই এপ্রিল ২০২৪',
      status: 'pending',
      statusBangla: 'শুরু হয়নি',
      badgeClass: 'badge-upcoming',
      totalMarks: 40,
      obtainedMarks: null,
      progressPercent: 0,
      description: 'রুল-অব-থার্ডস এবং প্রাকৃতিক আলোর সঠিক ব্যবহার করে শহুরে জীবনের ওপর ৫টি ছবির একটি ভিজ্যুয়াল গল্প তৈরি করুন।',
      feedback: null
    },
    {
      id: 5,
      courseTitle: 'থ্রিডি অ্যানিমেশন টেকনিকস (ANI301)',
      assignmentTitle: 'অ্যাসাইনমেন্ট ০৫: ক্যারেক্টার ওয়াক-সাইকেল অ্যানিমেশন',
      dueDateBangla: '২০শে মে ২০২৪',
      status: 'pending',
      statusBangla: 'জমা দেওয়া হয়নি',
      badgeClass: 'badge-upcoming',
      totalMarks: 50,
      obtainedMarks: null,
      progressPercent: 20,
      description: 'কি-ফ্রেম ও কার্ভ এডিটর ব্যবহার করে একটি ক্যারেক্টারের ১৫ সেকেন্ডের হাঁটা ও লাফানোর সিকোয়েন্স অ্যানিমেট করুন।',
      feedback: null
    }
  ]);

  const filteredHomeworks = homeworks.filter(hw => {
    if (activeFilter === 'pending') return hw.status === 'pending' || hw.status === 'not-started';
    if (activeFilter === 'in-progress') return hw.status === 'in-progress';
    if (activeFilter === 'completed') return hw.status === 'completed';
    return true;
  });

  const handleOpenSubmit = (hw) => {
    setSubmitModalHw(hw);
    setRepoUrl('');
    setLiveUrl('');
    setStudentNotes('');
    setSubmittedSuccess(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setHomeworks(prev => prev.map(item => {
        if (item.id === submitModalHw.id) {
          return {
            ...item,
            status: 'completed',
            statusBangla: 'সম্পন্ন হয়েছে',
            badgeClass: 'badge-completed',
            progressPercent: 100,
            feedback: 'অ্যাসাইনমেন্ট সফলভাবে জমা নেওয়া হয়েছে। প্রশিক্ষক শীঘ্রই রিভিউ প্রদান করবেন।'
          };
        }
        return item;
      }));
    }, 1000);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <BookMarked size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">অ্যাসাইনমেন্ট (সাবমিশন ও মূল্যায়ন)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টার ৩ এর অ্যাসাইনমেন্ট জমা দেওয়ার পোর্টাল এবং প্রশিক্ষকের মূল্যায়ন ও গ্রেডিং ফিডব্যাক।
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="utopia-stats-grid">
        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Layers size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">{homeworks.length}টি</div>
            <div className="utopia-stat-label">সর্বমোট অ্যাসাইনমেন্ট</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">{homeworks.filter(h => h.status === 'completed').length}টি</div>
            <div className="utopia-stat-label">সম্পন্ন ও মূল্যায়িত</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Clock size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">{homeworks.filter(h => h.status === 'in-progress').length}টি</div>
            <div className="utopia-stat-label">চলমান কাজ</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <Award size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">৪৮ / ৫০</div>
            <div className="utopia-stat-label">সর্বোচ্চ স্কোর (A+)</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="utopia-filter-card">
        <div className="utopia-day-pills">
          <button
            type="button"
            className={`utopia-day-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            সকল অ্যাসাইনমেন্ট ({homeworks.length})
          </button>
          <button
            type="button"
            className={`utopia-day-pill ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            জমা দেওয়া বাকি ({homeworks.filter(h => h.status === 'pending' || h.status === 'not-started').length})
          </button>
          <button
            type="button"
            className={`utopia-day-pill ${activeFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            কাজ চলছে ({homeworks.filter(h => h.status === 'in-progress').length})
          </button>
          <button
            type="button"
            className={`utopia-day-pill ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            সম্পন্ন হয়েছে ({homeworks.filter(h => h.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Assignment Cards Grid (3 Columns, Equal Height, Clean Alignment) */}
      <div className="utopia-cards-grid-3">
        {filteredHomeworks.map(hw => (
          <div key={hw.id} className="utopia-portal-card">
            {/* Top Body */}
            <div className="utopia-portal-card-body">
              <div className="utopia-portal-card-header">
                <span className={`badge-status ${hw.badgeClass}`}>
                  {hw.statusBangla}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                  পূর্ণমান: {hw.totalMarks}
                </span>
              </div>

              <h3 className="utopia-portal-card-title">
                {hw.assignmentTitle}
              </h3>

              <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 600, marginBottom: '6px' }}>
                {hw.courseTitle}
              </div>

              <div className="utopia-course-divider" style={{ margin: '8px 0 10px' }} />

              <p className="utopia-portal-card-desc">
                {hw.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b', marginBottom: '12px' }}>
                <Calendar size={14} color="#94a3b8" />
                <span>জমার শেষ তারিখ: <strong>{hw.dueDateBangla}</strong></span>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginBottom: '5px' }}>
                  <span>অগ্রগতি</span>
                  <span style={{ fontWeight: 700 }}>{hw.progressPercent}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${hw.progressPercent}%`,
                      height: '100%',
                      borderRadius: '4px',
                      backgroundColor: hw.status === 'completed' ? '#16a34a' : (hw.progressPercent > 50 ? '#9333ea' : '#d97706'),
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Footer Horizontal Full-Width Button */}
            <div className="utopia-portal-card-footer">
              {hw.status === 'completed' ? (
                <button
                  type="button"
                  onClick={() => setFeedbackModalHw(hw)}
                  className="utopia-btn-outline-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <FileText size={15} />
                  <span>ফিডব্যাক ও প্রাপ্ত নম্বর দেখুন</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenSubmit(hw)}
                  className="utopia-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <UploadCloud size={15} />
                  <span>অ্যাসাইনমেন্ট জমা দিন</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Assignment Modal */}
      {submitModalHw && (
        <div className="utopia-modal-backdrop" onClick={() => setSubmitModalHw(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  {submitModalHw.assignmentTitle}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  {submitModalHw.courseTitle} • জমার শেষ সময়: {submitModalHw.dueDateBangla}
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setSubmitModalHw(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {submittedSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 14px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                    অ্যাসাইনমেন্ট সফলভাবে জমা নেওয়া হয়েছে!
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '6px' }}>
                    আপনার প্রশিক্ষক এটি পর্যালোচনা করে ফিডব্যাক ও নম্বর প্রদান করবেন।
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitModalHw(null)}
                    className="utopia-btn-primary"
                    style={{ marginTop: '20px' }}
                  >
                    বন্ধ করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      গিটহাব রিপোজিটরি / ড্রাইভ ফাইল লিংক *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/your-username/assignment"
                      value={repoUrl}
                      onChange={e => setRepoUrl(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      লাইভ ডেমো / ফিগমা প্রোটোটাইপ লিংক (ঐচ্ছিক)
                    </label>
                    <input
                      type="url"
                      placeholder="https://my-project.vercel.app"
                      value={liveUrl}
                      onChange={e => setLiveUrl(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      শিক্ষার্থীর মন্তব্য বা নোট
                    </label>
                    <textarea
                      rows={3}
                      placeholder="প্রজেক্টে ব্যবহৃত বিশেষ ফিচার বা মেন্টরের জন্য কোনো তথ্য থাকলে লিখুন..."
                      value={studentNotes}
                      onChange={e => setStudentNotes(e.target.value)}
                      className="utopia-input"
                      style={{ fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setSubmitModalHw(null)}
                      className="utopia-btn-secondary"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="utopia-btn-primary"
                    >
                      <Send size={15} />
                      <span>{isSubmitting ? 'জমা দেওয়া হচ্ছে...' : 'অ্যাসাইনমেন্ট জমা দিন'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModalHw && (
        <div className="utopia-modal-backdrop" onClick={() => setFeedbackModalHw(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '540px' }} onClick={e => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  প্রশিক্ষকের মূল্যায়ন ও ফিডব্যাক
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  {feedbackModalHw.assignmentTitle}
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setFeedbackModalHw(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#dcfce7', borderRadius: '10px', marginBottom: '18px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16a34a' }}>
                  প্রাপ্ত নম্বর
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#15803d' }}>
                  {feedbackModalHw.obtainedMarks} / {feedbackModalHw.totalMarks}
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  প্রশিক্ষকের মন্তব্য:
                </div>
                <p style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: '1.6', margin: 0 }}>
                  {feedbackModalHw.feedback || 'মূল্যায়ন চলমান রয়েছে। শীঘ্রই পূর্ণাঙ্গ মন্তব্য দেওয়া হবে।'}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setFeedbackModalHw(null)}
                  className="utopia-btn-primary"
                >
                  ঠিক আছে
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
