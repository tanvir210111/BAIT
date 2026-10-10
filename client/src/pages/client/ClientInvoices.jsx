import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import clientService from '../../services/clientService';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';

export default function ClientInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientService.getInvoices().then(data => {
      setInvoices(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading text="ইনভয়েস তথ্য লোড হচ্ছে..." fullPage />;
  }

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0);

  return (
    <div className="client-page">
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--client-text)', margin: '0 0 6px 0' }}>
          ইনভয়েস ও বিলিং স্টেটমেন্ট
        </h1>
        <p style={{ color: 'var(--client-text-muted)', margin: 0, fontSize: '0.92rem' }}>
          আপনার প্রতিষ্ঠানের প্রজেক্ট ভিত্তিক বিলিং ইতিহাস, রশিদ ডাউনলোড এবং পরিশোধিত কিস্তির হিসাব।
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div className="client-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="client-stat-icon-wrap icon-emerald">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>মোট পরিশোধিত</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#15803d' }}>
              ৳{toBengaliNumber(totalPaid.toLocaleString())}
            </div>
          </div>
        </div>

        <div className="client-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="client-stat-icon-wrap icon-amber">
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>পরিশোধ বাকি</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#b45309' }}>
              ৳{toBengaliNumber(totalPending.toLocaleString())}
            </div>
          </div>
        </div>

        <div className="client-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="client-stat-icon-wrap icon-blue">
            <Receipt size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>মোট ইনভয়েস</div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--client-text)' }}>
              {toBengaliNumber(invoices.length)} টি
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="client-card">
        <h2 className="client-card-title" style={{ marginBottom: '1.25rem' }}>সকল ইনভয়েসের তালিকা</h2>
        <div className="client-invoices-table-wrap">
          <table className="client-invoices-table">
            <thead>
              <tr>
                <th>ইনভয়েস আইডি</th>
                <th>প্রকল্প</th>
                <th>বিবরণ</th>
                <th>পরিমাণ</th>
                <th>ইস্যু তারিখ</th>
                <th>শেষ তারিখ</th>
                <th>স্ট্যাটাস</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 700, color: 'var(--client-text)' }}>{inv.id}</td>
                  <td style={{ fontWeight: 600 }}>{inv.projectTitle}</td>
                  <td style={{ fontSize: '0.84rem', color: '#64748b' }}>{inv.description}</td>
                  <td style={{ fontWeight: 800, color: 'var(--client-primary)' }}>
                    ৳{toBengaliNumber(inv.amount.toLocaleString())}
                  </td>
                  <td>{inv.issueDate}</td>
                  <td>{inv.dueDate}</td>
                  <td>
                    <span className={`inv-badge-${inv.status}`}>
                      ● {inv.status_bn}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                      onClick={() => alert(`ইনভয়েস ${inv.id} ডাউনলোড করা হচ্ছে...`)}
                    >
                      <Download size={14} />
                      <span>রশিদ</span>
                    </button>
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
