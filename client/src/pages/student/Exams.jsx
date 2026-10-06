import React, { useState, useEffect } from 'react';
import { FileQuestion, Clock, Calendar, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getExams()
      .then(data => {
        setExams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="পরীক্ষার তথ্য লোড হচ্ছে..." fullPage />;
  }

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">অনলাইন পরীক্ষা ও কুইজ (Exams & Quizzes)</h1>
          <p className="student-page-subtitle">
            মডিউল মূল্যায়ন পরীক্ষা এবং কুইজের সময়সূচি ও ফলাফল।
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {exams.map(exam => {
          const isCompleted = exam.status === 'completed';

          return (
            <div key={exam.id} className="student-card" style={{ borderLeft: `4px solid ${isCompleted ? '#059669' : 'var(--accent-red)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`badge-tag ${isCompleted ? 'badge-teal' : 'badge-red'}`} style={{ fontSize: '0.78rem' }}>
                  {isCompleted ? 'সম্পন্ন হয়েছে' : 'আসন্ন পরীক্ষা'}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  মোট নম্বর: {toBengaliNumber(exam.totalMarks)}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '8px' }}>
                {exam.title}
              </h3>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                কোর্স: {exam.course}
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.84rem', color: '#475569', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--primary)" />
                  <span>তারিখ: {exam.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--accent-red)" />
                  <span>সময়কাল: {exam.duration}</span>
                </div>
              </div>

              {isCompleted ? (
                <div style={{ background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <div style={{ color: '#065f46', fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={16} />
                    <span>প্রাপ্ত নম্বর: {toBengaliNumber(exam.obtainedMarks)} / {toBengaliNumber(exam.totalMarks)}</span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => alert('পরীক্ষা শুরুর নির্ধারিত সময় ১২ই অক্টোবর ২০২৬ রাত ৮:৩০ টায়। পরীক্ষার ১০ মিনিট পূর্বে লিংক সক্রিয় হবে।')}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <FileQuestion size={16} />
                  <span>পরীক্ষায় অংশগ্রহণ করুন</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
