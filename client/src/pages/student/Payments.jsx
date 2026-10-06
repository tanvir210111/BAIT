import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, Download, ArrowRight, AlertCircle } from 'lucide-react';
import { studentService } from '../../services/studentService';
import Loading from '../../components/common/Loading';
import { formatCurrencyBn } from '../../utils/formatCurrency';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getPayments()
      .then(data => {
        setPayments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="পেমেন্ট হিস্ট্রি লোড হচ্ছে..." fullPage />;
  }

  const totalPaid = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalCourseFee = 6500;
  const dueAmount = Math.max(0, totalCourseFee - totalPaid);

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">ফি ও পেমেন্ট হিস্ট্রি (Fees & Payments)</h1>
          <p className="student-page-subtitle">
            কোর্স ফি পরিশোধের রশিদ ও কিস্তি বিবরণী।
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="student-stats-grid" style={{ marginBottom: '28px' }}>
        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(0, 106, 78, 0.1)', color: 'var(--primary)' }}>
            <CreditCard size={24} />
          </div>
          <div>
            <div className="stat-card-title">মোট কোর্স ফি</div>
            <div className="stat-card-value">{formatCurrencyBn(totalCourseFee)}</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="stat-card-title">মোট পরিশোধিত</div>
            <div className="stat-card-value">{formatCurrencyBn(totalPaid)}</div>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-card-icon" style={{ background: 'rgba(244, 42, 65, 0.1)', color: 'var(--accent-red)' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-card-title">বাকি / বকেয়া</div>
            <div className="stat-card-value">{formatCurrencyBn(dueAmount)}</div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="student-card" style={{ padding: '24px', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '18px' }}>
          পরিশোধিত লেনদেন তালিকা
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="info-table" style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>ট্রানজ্যাকশন আইডি</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>তারিখ</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>কোর্স ও কিস্তি</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>মাধ্যম</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>পরিমাণ</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>স্ট্যাটাস</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>রশিদ</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#334155' }}>
                    <code>{p.id}</code>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    {p.date}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{p.course}</div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{p.type}</span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>
                    {p.method}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--primary)' }}>
                    {formatCurrencyBn(p.amount)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className="badge-tag badge-teal" style={{ fontWeight: 700 }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button 
                      type="button" 
                      onClick={() => alert(`ইনভয়েস ${p.id} ডাউনলোড হচ্ছে...`)}
                      className="btn btn-outline" 
                      style={{ padding: '4px 10px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={13} />
                      <span>রশিদ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Instructions Box */}
      <div className="student-card" style={{ padding: '24px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#065f46', marginBottom: '8px' }}>
          বকেয়া ফি পরিশোধের নিয়মাবলী
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#047857', lineHeight: '1.6', marginBottom: '14px' }}>
          বিকাশ বা নগদ মার্চেন্ট নম্বরে <strong>01711006214</strong> পেমেন্ট অপশনে গিয়ে রেফারেন্সে আপনার স্টুডেন্ট আইডি (BAIT-2026-ST001) উল্লেখ করে ফি পরিশোধ করতে পারেন।
        </p>
        <div style={{ fontSize: '0.85rem', color: '#065f46' }}>
          পেমেন্ট সংক্রান্ত কোনো তথ্যের জন্য যোগাযোগ করুন: <strong>supportbait@gmail.com</strong>
        </div>
      </div>
    </div>
  );
}
