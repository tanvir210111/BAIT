import React from 'react';
import { Calendar, CheckCircle2, Clock, Upload, Award } from 'lucide-react';
import { toBengaliNumber } from '../../utils/formatDate';

export default function AssignmentCard({ assignment, onSubmitClick }) {
  if (!assignment) return null;

  const isGraded = assignment.status === 'graded';
  const isPending = assignment.status === 'pending';

  return (
    <div className="student-card assignment-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span 
          className="badge-tag" 
          style={{ 
            background: isGraded ? '#d1fae5' : '#fef3c7', 
            color: isGraded ? '#065f46' : '#92400e',
            fontSize: '0.78rem' 
          }}
        >
          {isGraded ? 'মূল্যায়িত (Graded)' : isPending ? 'জমা দেওয়া বাকি (Pending)' : 'জমা দেওয়া হয়েছে'}
        </span>
        <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
          মোট নম্বর: {toBengaliNumber(assignment.totalMarks)}
        </span>
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
        {assignment.title}
      </h3>

      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        কোর্স: {assignment.course}
      </div>

      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#64748b', marginBottom: '14px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} color="var(--primary)" />
          <span>ডেডলাইন: {assignment.deadline}</span>
        </div>
        {assignment.submissionDate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="#059669" />
            <span>জমা দেওয়া হয়েছে: {assignment.submissionDate}</span>
          </div>
        )}
      </div>

      {isGraded && (
        <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
            <Award size={16} />
            <span>প্রাপ্ত নম্বর: {toBengaliNumber(assignment.obtainedMarks)} / {toBengaliNumber(assignment.totalMarks)}</span>
          </div>
          {assignment.feedback && (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              মন্তব্য: {assignment.feedback}
            </p>
          )}
        </div>
      )}

      {isPending && (
        <button
          type="button"
          onClick={() => onSubmitClick && onSubmitClick(assignment)}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Upload size={16} />
          <span>অ্যাসাইনমেন্ট জমা দিন</span>
        </button>
      )}
    </div>
  );
}
