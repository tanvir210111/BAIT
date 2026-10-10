import React, { useState } from 'react';
import { DollarSign, CreditCard, Download, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function Payments() {
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const [trxId, setTrxId] = useState('');
  const [amountToPay, setAmountToPay] = useState('6000');
  const [paySuccess, setPaySuccess] = useState(false);
  const [invoiceDownloadSuccess, setInvoiceDownloadSuccess] = useState(false);

  const [transactions, setTransactions] = useState([
    {
      id: 'TRX-948102',
      date: '১৫ জানুয়ারি ২০২৪',
      purpose: 'সেমিস্টার ৩ টিউশন ফি (১ম কিস্তি)',
      amount: '৬,০০০ টাকা',
      method: 'বিকাশ (01711***214)',
      status: 'পরিশোধিত',
      statusBangla: 'পরিশোধিত'
    },
    {
      id: 'TRX-948199',
      date: '২০ ফেব্রুয়ারি ২০২৪',
      purpose: 'সেমিস্টার ৩ টিউশন ফি (২য় কিস্তি)',
      amount: '৬,০০০ টাকা',
      method: 'নগদ (01711***214)',
      status: 'পরিশোধিত',
      statusBangla: 'পরিশোধিত'
    }
  ]);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!trxId) return;

    const newTx = {
      id: `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: 'আজ (সদ্য সম্পন্ন)',
      purpose: 'সেমিস্টার ৩ টিউশন ফি (৩য় কিস্তি)',
      amount: `${Number(amountToPay).toLocaleString()} টাকা`,
      method: `${selectedMethod.toUpperCase()} (${trxId.toUpperCase()})`,
      status: 'পরিশোধিত',
      statusBangla: 'পরিশোধিত'
    };

    setTransactions([newTx, ...transactions]);
    setPaySuccess(true);
  };

  const handleDownloadInvoice = () => {
    setInvoiceDownloadSuccess(true);
    setTimeout(() => setInvoiceDownloadSuccess(false), 3000);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <DollarSign size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">পেমেন্ট (ফি ও অনলাইন পেমেন্ট)</h1>
          </div>
          <p className="utopia-page-subtitle">
            সেমিস্টার ৩ এর টিউশন ফি, ল্যাব চার্জ, বকেয়া পরিশোধ এবং পেমেন্ট ইনভয়েস হিস্ট্রি।
          </p>
        </div>

        <button 
          type="button" 
          className="utopia-btn-primary"
          onClick={() => {
            setShowPayModal(true);
            setPaySuccess(false);
            setTrxId('');
          }}
        >
          <CreditCard size={16} />
          <span>অনলাইনে ফি পরিশোধ করুন</span>
        </button>
      </div>

      {invoiceDownloadSuccess && (
        <div className="utopia-alert-banner success">
          <CheckCircle2 size={18} />
          <span>পেমেন্ট ইনভয়েস PDF ডাউনলোড শুরু হয়েছে!</span>
        </div>
      )}

      {/* Finance Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            মোট সেমিস্টার ফি
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>
            ১৮,০০০ <span style={{ fontSize: '0.9rem', color: '#64748b' }}>টাকা</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
            সেমিস্টার ৩ এর অ্যাকাডেমিক ও ল্যাব খরচ
          </div>
        </div>

        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            পরিশোধ করা হয়েছে
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', margin: '4px 0' }}>
            ১২,০০০ <span style={{ fontSize: '0.9rem', color: '#059669' }}>টাকা</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
            ৬৬.৭% ফি পরিশোধ সম্পন্ন
          </div>
        </div>

        <div className="utopia-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            বকেয়া ব্যালেন্স (Due)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f97316', margin: '4px 0' }}>
            ৬,০০০ <span style={{ fontSize: '0.9rem', color: '#f97316' }}>টাকা</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#f97316' }}>
            পরিশোধের শেষ তারিখ: ২৮ ফেব্রুয়ারি ২০২৪
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="utopia-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
            পেমেন্ট লেনদেনের ইতিহাস
          </h3>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            সকল লেনদেন অ্যাকাউন্টে ভেরিফাইড
          </span>
        </div>

        <div className="utopia-table-container">
          <table className="utopia-exam-table">
            <thead>
              <tr>
                <th>ট্রানজ্যাকশন আইডি</th>
                <th>তারিখ</th>
                <th>বিবরণ / উদ্দেশ্য</th>
                <th>পরিমাণ</th>
                <th>মাধ্যম</th>
                <th>অবস্থা</th>
                <th style={{ textAlign: 'center' }}>রসিদ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>
                    <code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, color: '#0f172a' }}>
                      {tx.id}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: '#475569' }}>{tx.date}</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{tx.purpose}</strong>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.86rem', color: '#059669' }}>{tx.amount}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#475569' }}>{tx.method}</span>
                  </td>
                  <td>
                    <span className="badge-status badge-completed">
                      {tx.statusBangla}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={handleDownloadInvoice}
                      className="utopia-btn-outline-sm"
                      title="ইনভয়েস পিডিএফ"
                    >
                      <Download size={13} />
                      <span>রসিদ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Fee Modal */}
      {showPayModal && (
        <div className="utopia-modal-backdrop" onClick={() => setShowPayModal(false)}>
          <div className="utopia-modal-box" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div className="utopia-modal-title">
                <CreditCard size={18} color="#0284c7" />
                <h3>অনলাইনে ফি পরিশোধ করুন</h3>
              </div>
              <button 
                type="button" 
                className="utopia-modal-close"
                onClick={() => setShowPayModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="utopia-modal-body">
              {!paySuccess ? (
                <form onSubmit={handlePaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      পেমেন্ট মাধ্যম বেছে নিন:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {['bkash', 'nagad', 'rocket'].map(m => (
                        <button
                          key={m}
                          type="button"
                          className={`payment-method-card ${selectedMethod === m ? 'active' : ''}`}
                          onClick={() => setSelectedMethod(m)}
                        >
                          <strong style={{ textTransform: 'uppercase', fontSize: '0.88rem' }}>
                            {m === 'bkash' ? 'বিকাশ' : (m === 'nagad' ? 'নগদ' : 'রকেট')}
                          </strong>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
                    <strong>{selectedMethod.toUpperCase()} মার্চেন্ট নম্বর:</strong> <code>01711006214</code><br />
                    ১. আপনার পেমেন্ট অ্যাপ থেকে "Make Payment" অপশনে যান।<br />
                    ২. রেফারেন্স হিসেবে আপনার শিক্ষার্থী আইডি <code>ST001</code> দিন।<br />
                    ৩. লেনদেন সম্পন্ন হলে TrxID নিচে বসান।
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      টাকার পরিমাণ (টাকা)
                    </label>
                    <input 
                      type="number"
                      required
                      value={amountToPay}
                      onChange={(e) => setAmountToPay(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      ট্রানজ্যাকশন আইডি (TrxID) *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="যেমন: 9AK8L290X"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      className="utopia-input"
                    />
                  </div>

                  <div className="utopia-modal-footer" style={{ padding: '0.5rem 0 0 0', background: 'transparent' }}>
                    <button
                      type="button"
                      onClick={() => setShowPayModal(false)}
                      className="utopia-btn-secondary"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="utopia-btn-primary"
                    >
                      <span>পেমেন্ট নিশ্চিত করুন</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={46} color="#059669" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h3 style={{ margin: '0 0 6px 0', color: '#0f172a' }}>পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে!</h3>
                  <p style={{ margin: '0 0 1.25rem 0', color: '#64748b', fontSize: '0.88rem' }}>
                    ট্রানজ্যাকশন আইডি যাচাই করা হয়েছে এবং রসিদ আপনার অ্যাকাউন্টে যোগ করা হয়েছে।
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPayModal(false)}
                    className="utopia-btn-primary"
                  >
                    ঠিক আছে
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
