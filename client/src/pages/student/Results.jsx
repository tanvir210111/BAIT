import React, { useState } from 'react';
import { TrendingUp, Award, Download, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export default function Results() {
  const [selectedSemester, setSelectedSemester] = useState('3');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const gradeSheetData = [
    { code: 'ART101', course: 'গ্রাফিক ফান্ডামেন্টালস', credit: 3.0, midMarks: 24, finalMarks: 48, total: 92, grade: 'A+', point: 4.00, status: 'উত্তীর্ণ' },
    { code: 'ART103', course: 'ডিজিটাল ইলাস্ট্রেশন', credit: 3.0, midMarks: 23, finalMarks: 47, total: 90, grade: 'A+', point: 4.00, status: 'উত্তীর্ণ' },
    { code: 'ITD201', course: 'অ্যাডভান্সড ওয়েব ডিজাইন', credit: 4.0, midMarks: 25, finalMarks: 49, total: 94, grade: 'A+', point: 4.00, status: 'উত্তীর্ণ' },
    { code: 'UXD301', course: 'ইউজার এক্সপেরিয়েন্স রিসার্চ', credit: 3.0, midMarks: 22, finalMarks: 45, total: 87, grade: 'A', point: 3.75, status: 'উত্তীর্ণ' },
    { code: 'ANI301', course: 'থ্রিডি অ্যানিমেশন টেকনিকস', credit: 3.0, midMarks: 24, finalMarks: 46, total: 90, grade: 'A+', point: 4.00, status: 'উত্তীর্ণ' }
  ];

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <TrendingUp size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">রেজাল্ট (ফলাফল ও গ্রেড রিপোর্ট)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টারভিত্তিক সিজিপিএ সারাংশ, ক্রেডিট ট্রান্সক্রিপ্ট এবং বিষয়ভিত্তিক নম্বরপত্র।
          </p>
        </div>

        <button 
          type="button" 
          className="utopia-btn-primary"
          onClick={handleDownloadReport}
        >
          <Download size={16} />
          <span>গ্রেড শিট (পিডিএফ) ডাউনলোড করুন</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="utopia-alert-banner success">
          <CheckCircle size={18} />
          <span>সেমিস্টার {selectedSemester} এর গ্রেড শিট PDF ফাইল ডাউনলোড শুরু হয়েছে!</span>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            সর্বমোট সিজিপিএ (Cumulative CGPA)
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
            ৩.৯২ <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ ৪.০০</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
            ব্যাচের শীর্ষ ৫% শিক্ষার্থী • অনন্য ফলাফল
          </div>
        </div>

        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            সম্পন্ন হওয়া ক্রেডিট
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
            ৪২ <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ ১২০ ক্রেডিট</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>
            সেমিস্টার ৩ চলমান (৩৫% সম্পন্ন)
          </div>
        </div>

        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            অ্যাকাডেমিক স্ট্যান্ডিং
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', margin: '4px 0' }}>
            ডিনস লিস্ট
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            মেধা স্কলারশিপের জন্য যোগ্য শিক্ষার্থী
          </div>
        </div>
      </div>

      {/* Semester Filter Bar */}
      <div className="utopia-filter-card" style={{ justifyContent: 'flex-start', gap: '8px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginRight: '6px' }}>
          সেমিস্টার নির্বাচন করুন:
        </span>
        {['১', '২', '৩'].map((sem, idx) => (
          <button
            key={sem}
            type="button"
            className={`utopia-day-pill ${selectedSemester === String(idx + 1) ? 'active' : ''}`}
            onClick={() => setSelectedSemester(String(idx + 1))}
          >
            সেমিস্টার {sem}
          </button>
        ))}
      </div>

      {/* Grade Table */}
      <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="utopia-table-container">
          <table className="utopia-exam-table">
            <thead>
              <tr>
                <th>কোর্স কোড</th>
                <th>কোর্সের নাম</th>
                <th style={{ textAlign: 'center' }}>ক্রেডিট</th>
                <th style={{ textAlign: 'center' }}>মিড-টার্ম (৩০)</th>
                <th style={{ textAlign: 'center' }}>ফাইনাল (৫০)</th>
                <th style={{ textAlign: 'center' }}>মোট (১০০)</th>
                <th style={{ textAlign: 'center' }}>লেটার গ্রেড</th>
                <th style={{ textAlign: 'center' }}>গ্রেড পয়েন্ট</th>
                <th style={{ textAlign: 'center' }}>অবস্থা</th>
              </tr>
            </thead>
            <tbody>
              {gradeSheetData.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, color: '#0f172a' }}>
                      {row.code}
                    </code>
                  </td>
                  <td>
                    <strong style={{ color: '#0f172a', fontSize: '0.86rem' }}>{row.course}</strong>
                  </td>
                  <td style={{ textAlign: 'center', color: '#475569' }}>{row.credit}</td>
                  <td style={{ textAlign: 'center', color: '#334155' }}>{row.midMarks}</td>
                  <td style={{ textAlign: 'center', color: '#334155' }}>{row.finalMarks}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{row.total}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#059669', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                      {row.grade}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: '#334155' }}>{row.point.toFixed(2)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge-status badge-completed">
                      {row.status}
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
