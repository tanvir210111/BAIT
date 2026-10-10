import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle, 
  FileQuestion, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Timer
} from 'lucide-react';

export default function Exams() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeQuizModal, setActiveQuizModal] = useState(null);
  const [activeSyllabusModal, setActiveSyllabusModal] = useState(null);

  // Quiz state inside modal
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const examsList = [
    {
      id: 1,
      title: 'গ্রাফিক ডিজাইন ফান্ডামেন্টালস কুইজ',
      course: 'ART101 - গ্রাফিক ফান্ডামেন্টালস',
      date: '২৫ জানুয়ারি ২০২৪',
      time: 'সকাল ১০:০০ - ১১:০০',
      location: 'ডিজাইন স্টুডিও এ',
      totalMarks: 50,
      obtainedMarks: 46,
      status: 'completed',
      statusBangla: 'সম্পন্ন হয়েছে',
      syllabus: 'কালার থিওরি, টাইপোগ্রাফি হায়ারার্কি, গ্রিড সিস্টেম ও ভিজ্যুয়াল ব্যালেন্স প্রিন্সিপালস।'
    },
    {
      id: 2,
      title: 'ডিজিটাল ইলাস্ট্রেশন প্র্যাকটিক্যাল পরীক্ষা',
      course: 'ART103 - ডিজিটাল ইলাস্ট্রেশন',
      date: '৫ ফেব্রুয়ারি ২০২৪',
      time: 'দুপুর ০২:০০ - ০৩:৩০',
      location: 'কম্পিউটার ল্যাব ২',
      totalMarks: 50,
      obtainedMarks: 48,
      status: 'completed',
      statusBangla: 'সম্পন্ন হয়েছে',
      syllabus: 'ভেক্টর পেন টুল, ক্যারেক্টার ইনকিং, লেয়ার মাস্কিং ও লাইটিং শেডিং।'
    },
    {
      id: 3,
      title: 'ইউআই/ইউএক্স ডিজাইন প্রিন্সিপালস মিড-টার্ম',
      course: 'UXD301 - ইউজার এক্সপেরিয়েন্স রিসার্চ',
      date: '১০ মার্চ ২০২৪',
      time: 'দুপুর ০১:০০ - ০২:০০',
      location: 'ডিজাইন ল্যাব ১',
      totalMarks: 50,
      obtainedMarks: null,
      status: 'upcoming',
      statusBangla: 'আসন্ন পরীক্ষা',
      syllabus: 'ইউজার পার্সোনা, ফিগমা ওয়্যারফ্রেমিং, হিউরিস্টিক ইভ্যালুয়েশন ও ইনফরমেশন আর্কিটেকচার।'
    },
    {
      id: 4,
      title: 'ডিজাইন হিস্ট্রি থিওরি ও এসে মূল্যায়ন',
      course: 'ART101 - গ্রাফিক ফান্ডামেন্টালস',
      date: '২ এপ্রিল ২০২৪',
      time: 'সকাল ০৯:৪৫ - ১১:১৫',
      location: 'লেকচার হল বি',
      totalMarks: 40,
      obtainedMarks: null,
      status: 'upcoming',
      statusBangla: 'আসন্ন পরীক্ষা',
      syllabus: 'বাউহাউস মুভমেন্ট, সুইস স্টাইল ও পোস্টমডার্ন গ্রাফিক ট্রেন্ডস।'
    },
    {
      id: 5,
      title: 'প্রোডাক্ট ডিজাইন প্রোটোটাইপ অ্যাসেসমেন্ট',
      course: 'ITD201 - অ্যাডভান্সড ওয়েব ডিজাইন',
      date: '১৫ মে ২০২৪',
      time: 'সকাল ১১:১৫ - ১২:৪৫',
      location: 'প্রোটোটাইপ ল্যাব',
      totalMarks: 60,
      obtainedMarks: null,
      status: 'upcoming',
      statusBangla: 'আসন্ন পরীক্ষা',
      syllabus: 'কম্পোনেন্ট ড্রিভেন আর্কিটেকচার, রিঅ্যাক্ট হুকস স্টেট ও রেস্ট এপিআই ইমপ্লিমেন্টেশন।'
    },
    {
      id: 6,
      title: 'কালার থিওরি ও অ্যাপলিকেশন মূল্যায়ন',
      course: 'ART103 - ডিজিটাল ইলাস্ট্রেশন',
      date: '৮ জুন ২০২৪',
      time: 'দুপুর ০২:১৫ - ০৩:১৫',
      location: 'ডিজাইন স্টুডিও বি',
      totalMarks: 30,
      obtainedMarks: null,
      status: 'upcoming',
      statusBangla: 'আসন্ন পরীক্ষা',
      syllabus: 'কমপ্লিমেন্টারি প্যালেট, আরজিবি বনাম সিএমওয়াইকে কালার গ্যামাট ও স্যাচুরেশন নিয়ম।'
    }
  ];

  // Interactive sample quiz questions in Bengali
  const sampleQuizQuestions = [
    {
      id: 1,
      question: 'ইউআই/ইউএক্স ডিজাইনে "Affordance" বলতে কী বোঝানো হয়?',
      options: [
        'ক) একটি উপাদান কীভাবে ব্যবহার করতে হবে তার ভিজ্যুয়াল ক্লু দেওয়া',
        'খ) ওয়েবসাইট হোস্টিংয়ের বাৎসরিক খরচ',
        'গ) সার্ভারের রেসপন্স টাইম',
        'ঘ) সিএসএস কালার প্যালেটের উজ্জ্বলতা'
      ],
      correctIndex: 0
    },
    {
      id: 2,
      question: 'রিঅ্যাক্ট কম্পোনেন্টে স্টেট পরিবর্তন হলে কী ঘটে?',
      options: [
        'ক) ব্রাউজার উইন্ডো সম্পূর্ণ রিলোড হয়',
        'খ) কম্পোনেন্ট রি-রেন্ডার হয় এবং ইউআই তাৎক্ষণিক আপডেট হয়',
        'গ) ডেটাবেজ স্বয়ংক্রিয়ভাবে মুছে যায়',
        'ঘ) সিএসএস স্টাইল বাদ পড়ে যায়'
      ],
      correctIndex: 1
    },
    {
      id: 3,
      question: 'রেসপনসিভ ওয়েব ডিজাইনের জন্য সবচেয়ে গুরুত্বপূর্ণ কোনটি?',
      options: [
        'ক) float: left',
        'খ) মিডিয়া কোয়েরি (@media) ও ফ্লেক্সবক্স/গ্রিড',
        'গ) position: absolute',
        'ঘ) font-family: monospace'
      ],
      correctIndex: 1
    }
  ];

  const filteredExams = examsList.filter(item => {
    if (activeTab === 'completed') return item.status === 'completed';
    if (activeTab === 'upcoming') return item.status === 'upcoming';
    return true;
  });

  const startQuiz = (exam) => {
    setActiveQuizModal(exam);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const handleSelectOption = (optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQIndex]: optionIndex
    });
  };

  const handleQuizSubmit = () => {
    let calculatedScore = 0;
    sampleQuizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <FileSpreadsheet size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">এক্সাম (সেমিস্টার পরীক্ষা ও মূল্যায়ন)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টার ৩ এর মিড-টার্ম, ফাইনাল প্র্যাকটিক্যাল পরীক্ষা এবং সিট প্ল্যান ও সময়সূচি।
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="utopia-filter-card" style={{ justifyContent: 'flex-start', gap: '10px' }}>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          সকল পরীক্ষা ({examsList.length})
        </button>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          আসন্ন পরীক্ষা ({examsList.filter(e => e.status === 'upcoming').length})
        </button>
        <button
          type="button"
          className={`utopia-day-pill ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          সম্পন্ন হয়েছে ({examsList.filter(e => e.status === 'completed').length})
        </button>
      </div>

      {/* Exam Table */}
      <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="utopia-table-container">
          <table className="utopia-exam-table">
            <thead>
              <tr>
                <th>পরীক্ষার নাম</th>
                <th>কোর্স</th>
                <th>তারিখ</th>
                <th>সময়</th>
                <th>স্থান</th>
                <th>নম্বর / স্কোর</th>
                <th>অবস্থা</th>
                <th style={{ textAlign: 'center' }}>পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map(exam => (
                <tr key={exam.id}>
                  <td>
                    <strong style={{ color: '#0f172a', fontSize: '0.86rem' }}>{exam.title}</strong>
                  </td>
                  <td>
                    <span style={{ color: '#475569', fontSize: '0.82rem' }}>{exam.course}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155', fontSize: '0.82rem' }}>
                      <Calendar size={13} color="#0284c7" />
                      <span>{exam.date}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.82rem' }}>
                      <Clock size={13} color="#64748b" />
                      <span>{exam.time}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', background: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '4px' }}>
                      {exam.location}
                    </span>
                  </td>
                  <td>
                    {exam.status === 'completed' ? (
                      <span style={{ fontWeight: 700, color: '#15803d', fontSize: '0.85rem' }}>
                        {exam.obtainedMarks} / {exam.totalMarks}
                      </span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.82rem' }}>
                        মোট: {exam.totalMarks}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge-status ${exam.status === 'completed' ? 'badge-completed' : 'badge-upcoming'}`}>
                      {exam.statusBangla}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setActiveSyllabusModal(exam)}
                        className="utopia-btn-outline-sm"
                        title="সিলেবাস দেখুন"
                      >
                        সিলেবাস
                      </button>

                      {exam.status === 'upcoming' ? (
                        <button
                          type="button"
                          onClick={() => startQuiz(exam)}
                          className="utopia-btn-sm"
                        >
                          <FileQuestion size={13} />
                          <span>পরীক্ষা দিন</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>
                          উত্তীর্ণ (A+)
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Syllabus Modal */}
      {activeSyllabusModal && (
        <div className="utopia-modal-backdrop" onClick={() => setActiveSyllabusModal(null)}>
          <div className="utopia-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <FileSpreadsheet size={18} color="#0d1b2a" />
                <h3>পরীক্ষার সিলেবাস ও নির্দেশনা</h3>
              </div>
              <button 
                type="button" 
                className="utopia-modal-close"
                onClick={() => setActiveSyllabusModal(null)}
              >
                &times;
              </button>
            </div>
            <div className="utopia-modal-body">
              <h4 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>{activeSyllabusModal.title}</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.82rem' }}>
                কোর্স: {activeSyllabusModal.course} • তারিখ: {activeSyllabusModal.date}
              </p>
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  সিলেবাসের বিষয়বস্তু:
                </strong>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                  {activeSyllabusModal.syllabus}
                </p>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                • পরীক্ষার সময় ক্যামেরা ও ব্রাউজার স্ক্রিন সচল রাখতে হবে।<br />
                • কোনো ধরনের অনৈতিক সহায়তা বা এআই কপি পাওয়া গেলে পরীক্ষা বাতিল হবে।<br />
                • মোট নম্বর: {activeSyllabusModal.totalMarks} নম্বর।
              </div>
            </div>
            <div className="utopia-modal-footer">
              <button
                type="button"
                className="utopia-btn-primary"
                onClick={() => setActiveSyllabusModal(null)}
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Online Quiz Modal */}
      {activeQuizModal && (
        <div className="utopia-modal-backdrop" onClick={() => setActiveQuizModal(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <Timer size={18} color="#0284c7" />
                <h3>অনলাইন কুইজ: {activeQuizModal.title}</h3>
              </div>
              <button 
                type="button" 
                className="utopia-modal-close"
                onClick={() => setActiveQuizModal(null)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              {!quizSubmitted ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                      প্রশ্ন {currentQIndex + 1} / {sampleQuizQuestions.length}
                    </span>
                    <span style={{ fontSize: '0.78rem', background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      সময় বাকি: ০৮:৪৫
                    </span>
                  </div>

                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#0f172a', lineHeight: 1.4 }}>
                    {sampleQuizQuestions[currentQIndex].question}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sampleQuizQuestions[currentQIndex].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(optIdx)}
                          className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                    <button
                      type="button"
                      disabled={currentQIndex === 0}
                      onClick={() => setCurrentQIndex(prev => prev - 1)}
                      className="utopia-btn-secondary"
                      style={{ opacity: currentQIndex === 0 ? 0.5 : 1 }}
                    >
                      পূর্ববর্তী
                    </button>

                    {currentQIndex < sampleQuizQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                        className="utopia-btn-primary"
                      >
                        পরবর্তী প্রশ্ন &rarr;
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleQuizSubmit}
                        className="utopia-btn-primary"
                        style={{ background: '#059669' }}
                      >
                        কুইজ জমা দিন
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <Award size={48} color="#059669" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>কুইজ সফলভাবে জমা হয়েছে!</h3>
                  <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                    আপনার প্রাপ্ত স্কোর: <strong>{score} / {sampleQuizQuestions.length} ({Math.round((score / sampleQuizQuestions.length) * 100)}%)</strong>
                  </p>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '8px', color: '#15803d', fontSize: '0.85rem' }}>
                    অভিনন্দন! আপনার পরীক্ষার উত্তরপত্র মূল্যায়নের জন্য জমা নেওয়া হয়েছে। ফলাফল শিট স্বয়ংক্রিয়ভাবে আপডেট করা হয়েছে।
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <button
                      type="button"
                      className="utopia-btn-primary"
                      onClick={() => setActiveQuizModal(null)}
                    >
                      পরীক্ষা বোর্ডে ফিরে যান
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
