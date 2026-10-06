import React, { useState, useEffect } from 'react';
import { FileText, Upload, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { studentService } from '../../services/studentService';
import AssignmentCard from '../../components/student/AssignmentCard';
import Loading from '../../components/common/Loading';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [submitForm, setSubmitForm] = useState({ githubUrl: '', liveUrl: '', note: '' });
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    studentService.getAssignments()
      .then(data => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOpenSubmit = (assignment) => {
    setSubmittingAssignment(assignment);
    setSubmitForm({ githubUrl: '', liveUrl: '', note: '' });
    setStatusMessage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!submitForm.githubUrl.trim()) {
      setStatusMessage({ type: 'error', text: 'গিটহাব কোড রিপোজিটরি লিংক প্রদান করা আবশ্যক।' });
      return;
    }

    try {
      await studentService.submitAssignment(submittingAssignment.id, submitForm);
      setStatusMessage({ type: 'success', text: 'অ্যাসাইনমেন্ট সফলভাবে জমা নেওয়া হয়েছে।' });
      setTimeout(() => {
        setSubmittingAssignment(null);
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'জমা দিতে সমস্যা হয়েছে।' });
    }
  };

  if (loading) {
    return <Loading text="অ্যাসাইনমেন্ট লোড হচ্ছে..." fullPage />;
  }

  const filteredAssignments = assignments.filter(a => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'graded') return a.status === 'graded';
    return true;
  });

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">অ্যাসাইনমেন্ট পোর্টাল (Assignments)</h1>
          <p className="student-page-subtitle">
            কোর্সের ব্যবহারিক প্রজেক্ট ও অ্যাসাইনমেন্ট সাবমিশন এবং গ্রেডিং।
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className={`badge-tag ${filter === 'all' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('all')}
          >
            সকল ({assignments.length})
          </button>
          <button
            type="button"
            className={`badge-tag ${filter === 'pending' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('pending')}
          >
            বাকি
          </button>
          <button
            type="button"
            className={`badge-tag ${filter === 'graded' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('graded')}
          >
            মূল্যায়িত
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredAssignments.map(assignment => (
          <AssignmentCard 
            key={assignment.id} 
            assignment={assignment} 
            onSubmitClick={handleOpenSubmit}
          />
        ))}
      </div>

      {/* Submission Modal */}
      {submittingAssignment && (
        <div className="search-modal-backdrop" onClick={() => setSubmittingAssignment(null)}>
          <div className="student-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', margin: 0 }}>
                অ্যাসাইনমেন্ট সাবমিট করুন
              </h3>
              <button 
                type="button" 
                onClick={() => setSubmittingAssignment(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <strong>{submittingAssignment.title}</strong>
            </p>

            {statusMessage && (
              <div style={{
                padding: '10px 14px',
                borderRadius: '6px',
                marginBottom: '16px',
                background: statusMessage.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: statusMessage.type === 'success' ? '#065f46' : '#991b1b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">গিটহাব রিপোজিটরি লিংক (GitHub URL) *</label>
                <input 
                  type="url"
                  className="form-control"
                  placeholder="https://github.com/your-username/project-repo"
                  value={submitForm.githubUrl}
                  onChange={e => setSubmitForm({ ...submitForm, githubUrl: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">লাইভ সাইট লিংক (Live URL)</label>
                <input 
                  type="url"
                  className="form-control"
                  placeholder="https://your-project.vercel.app"
                  value={submitForm.liveUrl}
                  onChange={e => setSubmitForm({ ...submitForm, liveUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">প্রজেক্ট সম্পর্কিত মন্তব্য বা নোট</label>
                <textarea 
                  className="form-control"
                  rows="3"
                  placeholder="কী কী ফিচার যোগ করেছেন তা সংক্ষেপে লিখুন..."
                  value={submitForm.note}
                  onChange={e => setSubmitForm({ ...submitForm, note: e.target.value })}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', height: '44px', fontWeight: 700 }}
              >
                জমা দিন (Submit Assignment)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
