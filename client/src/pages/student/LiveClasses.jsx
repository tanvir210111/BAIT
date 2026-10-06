import React, { useState, useEffect } from 'react';
import { Video, Calendar, Clock, ExternalLink, PlayCircle } from 'lucide-react';
import { studentService } from '../../services/studentService';
import UpcomingClass from '../../components/student/UpcomingClass';
import Loading from '../../components/common/Loading';

export default function LiveClasses() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getLiveClasses()
      .then(data => {
        setLiveClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="লাইভ ক্লাসের তথ্য লোড হচ্ছে..." fullPage />;
  }

  const upcomingClasses = liveClasses.filter(c => c.status === 'upcoming');
  const pastClasses = liveClasses.filter(c => c.status === 'completed');

  return (
    <div className="student-page">
      <div className="student-page-header">
        <div>
          <h1 className="student-page-title">লাইভ ক্লাসেস (Live Classes)</h1>
          <p className="student-page-subtitle">
            সরাসরি জুম ক্লাসের সময়সূচি ও বিগত ক্লাসের ভিডিও রেকর্ডিং আর্কাইভ।
          </p>
        </div>
      </div>

      {/* Upcoming Section */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Video size={20} color="var(--accent-red)" />
          <span>আসন্ন লাইভ ক্লাস</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {upcomingClasses.map(cls => (
            <UpcomingClass key={cls.id} liveClass={cls} />
          ))}
        </div>
      </div>

      {/* Recorded Classes Archive */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlayCircle size={20} color="var(--primary)" />
          <span>বিগত ক্লাসের ভিডিও রেকর্ডিং</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {pastClasses.map(cls => (
            <UpcomingClass key={cls.id} liveClass={cls} />
          ))}
        </div>
      </div>
    </div>
  );
}
