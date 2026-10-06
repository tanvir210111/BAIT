import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, TrendingUp, Download } from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getResults()
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="ফলাফল লোড হচ্ছে..." fullPage />;
  }

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">ফলাফল ও গ্রেডশিট (Academic Results)</h1>
          <p className="student-page-subtitle">
            কোর্সের কুইজ, টেস্ট এবং অ্যাসাইনমেন্টের সার্বিক মূল্যায়ন রেকর্ড।
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-outline"
          onClick={() => alert('গ্রেডশিট PDF ডাউনলোড হচ্ছে...')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Download size={16} />
          <span>গ্রেডশিট ডাউনলোড</span>
        </button>
      </div>

      {/* Summary Score Card */}
      <div className="student-stats-grid" style={{ marginBottom: '24px' }}>
        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(0, 106, 78, 0.1)', color: 'var(--primary)' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-card-title">সর্বমোট সিজিপিএ / গ্রেড</div>
            <div className="stat-card-value">A+ (৪.০০)</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-card-title">গড় নম্বর শতকরা</div>
            <div className="stat-card-value">৯৬.৪%</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(244, 42, 65, 0.1)', color: 'var(--accent-red)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="stat-card-title">মূল্যায়িত টেস্ট সংখ্যা</div>
            <div className="stat-card-value">{toBengaliNumber(results.length)} টি</div>
          </div>
        </div>
      </div>

      <div className="student-card" style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="info-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>পরীক্ষা / অ্যাসাইনমেন্টের শিরোনাম</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>তারিখ</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>মোট নম্বর</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>প্রাপ্ত নম্বর</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>শতকরা</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>গ্রেড</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>প্রশিক্ষকের মূল্যায়ন</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--primary-dark)' }}>
                    {r.title}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {r.examDate}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>
                    {toBengaliNumber(r.totalMarks)}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--primary)' }}>
                    {toBengaliNumber(r.obtainedMarks)}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                    {r.percentage}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge-tag badge-teal" style={{ fontWeight: 700 }}>
                      {r.grade}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    {r.remarks}
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
