import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, UserCheck, Download } from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';

export default function ClassRoutine() {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getRoutine()
      .then(data => {
        setRoutine(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="রুটিন লোড হচ্ছে..." fullPage />;
  }

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">সাপ্তাহিক ক্লাস রুটিন (Class Routine)</h1>
          <p className="student-page-subtitle">
            কোর্সের নিয়মিত লাইভ ক্লাস ও প্রবলেম সলভিং সেশনের সময়সূচি।
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-outline"
          onClick={() => alert('ক্লাস রুটিন PDF ডাউনলোড হচ্ছে...')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Download size={16} />
          <span>রুটিন ডাউনলোড (PDF)</span>
        </button>
      </div>

      <div className="student-card" style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="info-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>বার / দিন</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>সময়</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>কোর্স ও বিষয়</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>প্রশিক্ষক</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>মাধ্যম / রুম</th>
              </tr>
            </thead>
            <tbody>
              {routine.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge-tag badge-teal" style={{ fontWeight: 700 }}>
                      {item.day}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} color="var(--accent-red)" />
                      <span>{item.time}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--primary-dark)' }}>
                    {item.course}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <UserCheck size={15} color="var(--primary)" />
                      <span>{item.instructor}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '0.86rem', color: '#0369a1', background: '#e0f2fe', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
                      {item.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
