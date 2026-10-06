import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { studentService } from '../../services/studentService';
import NoticeCard from '../../components/student/NoticeCard';
import Loading from '../../components/common/Loading';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    studentService.getNotifications()
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  if (loading) {
    return <Loading text="নোটিফিকেশন লোড হচ্ছে..." fullPage />;
  }

  const filteredNotices = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">নোটিফিকেশন ও নোটিশ (Notifications)</h1>
          <p className="student-page-subtitle">
            ক্লাস আপডেট, অ্যাসাইনমেন্ট ফিডব্যাক ও প্রশাসনিক ঘোষণা।
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            className={`badge-tag ${filter === 'all' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('all')}
          >
            সকল ({notifications.length})
          </button>
          <button
            type="button"
            className={`badge-tag ${filter === 'unread' ? 'badge-teal' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 14px', border: '1px solid var(--border)' }}
            onClick={() => setFilter('unread')}
          >
            অপঠিত ({notifications.filter(n => n.unread).length})
          </button>
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="btn btn-outline"
            style={{ padding: '6px 12px', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <CheckCheck size={16} />
            <span>সব পঠিত হিসেবে মার্ক করুন</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredNotices.length > 0 ? (
          filteredNotices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
            কোনো নোটিফিকেশন নেই।
          </div>
        )}
      </div>
    </div>
  );
}
