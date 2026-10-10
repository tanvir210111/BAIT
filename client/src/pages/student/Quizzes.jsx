import React, { useState } from 'react';
import { 
  HelpCircle, 
  Clock, 
  CheckCircle, 
  Award, 
  Timer, 
  AlertCircle,
  FileQuestion,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Quizzes() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeQuizModal, setActiveQuizModal] = useState(null);

  // Quiz interactive test state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quizQuestions = [
    {
      q: '১. কালার থিওরিতে প্রাইমারি রঙের সংমিশ্রণে কোন রঙ তৈরি হয়?',
      options: ['টারশিয়ারি কালার', 'সেকেন্ডারি কালার', 'মনোক্রোম কালার', 'কমপ্লিমেন্টারি কালার'],
      correctIndex: 1
    },
    {
      q: '২. রিঅ্যাক্ট-এ স্টেট ম্যানেজ করার জন্য কোন হুক সবচেয়ে বেশি ব্যবহৃত হয়?',
      options: ['useEffect', 'useMemo', 'useState', 'useRef'],
      correctIndex: 2
    },
    {
      q: '৩. ওয়েবসাইটে ভিজ্যুয়াল হায়ারার্কি বজায় রাখার মূল উদ্দেশ্য কী?',
      options: ['পেজ লোড স্পিড বৃদ্ধি করা', 'ব্যবহারকারীর চোখের দৃষ্টিকে গুরুত্বপূর্ণ উপাদানে চালিত করা', 'বেশি টেক্সট অন্তর্ভুক্ত করা', 'অ্যানিমেশন সংখ্যা বাড়ানো'],
      correctIndex: 1
    }
  ];

  const quizzesList = [
    {
      id: 1,
      title: 'গ্রাফিক ডিজাইন কালার থিওরি কুইজ',
      course: 'ART101 - গ্রাফিক ফান্ডামেন্টালস',
      duration: '১৫ মিনিট',
      totalQuestions: 15,
      totalMarks: 30,
      obtainedMarks: null,
      status: 'active',
      statusBangla: 'লাইভ কুইজ চলমান',
      deadline: 'আজ রাত ১১:৫৯ পর্যন্ত',
      badgeClass: 'badge-completed'
    },
    {
      id: 2,
      title: 'রিঅ্যাক্ট বেসিক্স ও হুকস মূল্যায়ন কুইজ',
      course: 'ITD201 - অ্যাডভান্সড ওয়েব ডিজাইন',
      duration: '২০ মিনিট',
      totalQuestions: 20,
      totalMarks: 40,
      obtainedMarks: null,
      status: 'upcoming',
      statusBangla: 'আসন্ন কুইজ',
      deadline: '১৫ জানুয়ারি ২০২৪',
      badgeClass: 'badge-upcoming'
    },
    {
      id: 3,
      title: 'ইউজার এক্সপেরিয়েন্স রিসার্চ মেথড কুইজ',
      course: 'UXD301 - ইউজার এক্সপেরিয়েন্স',
      duration: '১৫ মিনিট',
      totalQuestions: 15,
      totalMarks: 30,
      obtainedMarks: 28,
      status: 'completed',
      statusBangla: 'সম্পন্ন হয়েছে',
      deadline: '৫ জানুয়ারি ২০২৪',
      badgeClass: 'badge-completed'
    },
    {
      id: 4,
      title: '৩ডি অ্যানিমেশন প্রিন্সিপালস কুইজ ০১',
      course: 'ANI301 - থ্রিডি অ্যানিমেশন',
      duration: '১০ মিনিট',
      totalQuestions: 10,
      totalMarks: 20,
      obtainedMarks: 19,
      status: 'completed',
      statusBangla: 'সম্পন্ন হয়েছে',
      deadline: '২৮ ডিসেম্বর ২০২৩',
      badgeClass: 'badge-completed'
    }
  ];

  const filteredQuizzes = quizzesList.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return item.status === 'active' || item.status === 'upcoming';
    if (activeTab === 'completed') return item.status === 'completed';
    return true;
  });

  const handleStartQuiz = (quiz) => {
    setActiveQuizModal(quiz);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let calculated = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        calculated += 10;
      }
    });
    setScore(calculated);
    setQuizSubmitted(true);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <HelpCircle size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">কুইজ টেস্ট পোর্টাল</h1>
          </div>
          <p className="utopia-page-subtitle">
            আপনার নিবন্ধিত কোর্সসমূহের অনলাইন কুইজ, প্রস্তুতিমূলক পরীক্ষা ও ফলাফল বিশ্লেষণ।
          </p>
        </div>
      </div>

      {/* Summary KPI Cards Grid (Equal 4 Columns) */}
      <div className="utopia-stats-grid">
        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <HelpCircle size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">৪টি</div>
            <div className="utopia-stat-label">সর্বমোট কুইজ</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <CheckCircle size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">২টি</div>
            <div className="utopia-stat-label">সম্পন্ন কুইজ</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Timer size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">১টি</div>
            <div className="utopia-stat-label">চলমান লাইভ কুইজ</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <Award size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">৯৪%</div>
            <div className="utopia-stat-label">গড় কুইজ স্কোর</div>
          </div>
        </div>
      </div>

      {/* Filter Bar with Day-Pill styling */}
      <div className="utopia-filter-card">
        <div className="utopia-day-pills">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`utopia-day-pill ${activeTab === 'all' ? 'active' : ''}`}
          >
            সকল কুইজ (৪)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`utopia-day-pill ${activeTab === 'active' ? 'active' : ''}`}
          >
            চলমান ও আসন্ন (২)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`utopia-day-pill ${activeTab === 'completed' ? 'active' : ''}`}
          >
            সম্পন্ন কুইজ (২)
          </button>
        </div>
      </div>

      {/* Quizzes 4-Column Aligned Cards Grid */}
      <div className="utopia-cards-grid-4">
        {filteredQuizzes.map(quiz => (
          <div key={quiz.id} className="utopia-portal-card">
            {/* Top Body */}
            <div className="utopia-portal-card-body">
              <div className="utopia-portal-card-header">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '3px 8px', borderRadius: '6px' }}>
                  {quiz.course}
                </span>
                <span className={`badge-status ${quiz.badgeClass}`}>
                  {quiz.statusBangla}
                </span>
              </div>

              <h3 className="utopia-portal-card-title">
                {quiz.title}
              </h3>

              <div className="utopia-course-divider" style={{ margin: '8px 0 10px' }} />

              <div className="utopia-portal-card-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} color="#64748b" /> সময়: <strong>{quiz.duration}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileQuestion size={14} color="#64748b" /> প্রশ্ন: <strong>{quiz.totalQuestions}টি</strong> | পূর্ণমান: <strong>{quiz.totalMarks}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Timer size={14} color="#64748b" /> শেষ সময়: <strong>{quiz.deadline}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Footer Aligned Across All Cards */}
            <div className="utopia-portal-card-footer">
              {quiz.status === 'completed' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: 700, fontSize: '0.82rem' }}>
                  <CheckCircle size={15} /> স্কোর: {quiz.obtainedMarks}/{quiz.totalMarks}
                </div>
              ) : (
                <div style={{ fontSize: '0.76rem', color: quiz.status === 'active' ? '#0284c7' : '#d97706', fontWeight: 600 }}>
                  {quiz.status === 'active' ? 'চলমান পরীক্ষা' : 'আসন্ন তারিখ'}
                </div>
              )}

              {quiz.status === 'active' ? (
                <button
                  type="button"
                  onClick={() => handleStartQuiz(quiz)}
                  className="utopia-btn-primary"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  <span>কুইজ শুরু করুন</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStartQuiz(quiz)}
                  className="utopia-btn-outline-sm"
                >
                  {quiz.status === 'completed' ? 'উত্তর দেখুন' : 'সিলেবাস'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive MCQ Quiz Modal */}
      {activeQuizModal && (
        <div className="utopia-modal-backdrop" onClick={() => setActiveQuizModal(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                  {activeQuizModal.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                  {activeQuizModal.course} • সময়: {activeQuizModal.duration}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveQuizModal(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {!quizSubmitted ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284c7' }}>
                      প্রশ্ন {currentQIndex + 1} / {quizQuestions.length}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#ea580c', background: '#ffedd5', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
                      <Timer size={14} /> অবশিষ্ট সময়: ১৪:১৮ মিনিট
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>
                    {quizQuestions[currentQIndex].q}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {quizQuestions[currentQIndex].options.map((option, idx) => (
                      <label
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`quiz-option-btn ${selectedAnswers[currentQIndex] === idx ? 'selected' : ''}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="radio"
                          name={`quiz-q-${currentQIndex}`}
                          checked={selectedAnswers[currentQIndex] === idx}
                          onChange={() => handleSelectOption(idx)}
                          style={{ accentColor: '#0284c7' }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                    <button
                      type="button"
                      disabled={currentQIndex === 0}
                      onClick={() => setCurrentQIndex(prev => prev - 1)}
                      className="utopia-btn-outline-sm"
                      style={{ opacity: currentQIndex === 0 ? 0.5 : 1, cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      পূর্ববর্তী
                    </button>

                    {currentQIndex < quizQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                        className="utopia-btn-primary"
                      >
                        পরবর্তী প্রশ্ন
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="utopia-btn-primary"
                        style={{ background: '#16a34a' }}
                      >
                        কুইজ সাবমিট করুন
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#16a34a' }}>
                    <Award size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                    অভিনন্দন! কুইজ সম্পন্ন হয়েছে
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '6px' }}>
                    আপনার প্রাপ্ত স্কোর: <strong style={{ color: '#16a34a', fontSize: '1.2rem' }}>{score} / ৩০</strong>
                  </p>
                  <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '12px' }}>
                    ফলাফল স্বয়ংক্রিয়ভাবে আপনার একাডেমিক প্রোফাইলে যুক্ত হয়েছে।
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveQuizModal(null)}
                    className="utopia-btn-primary"
                    style={{ marginTop: '20px' }}
                  >
                    বন্ধ করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
