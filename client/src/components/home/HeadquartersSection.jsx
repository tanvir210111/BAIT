import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeadquartersSection({ employees = [] }) {
  if (!employees || employees.length === 0) return null;

  return (
    <section className="section hq-section" id="headquarters">
      <div className="glass-bg-mesh"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-title-wrap" style={{ textAlign: 'center' }}>
          <span className="glass-badge hq-top-badge" style={{ marginBottom: '14px' }}>
            কেন্দ্রীয় প্রশাসন
          </span>
          <h2 className="section-title" style={{ color: '#ffffff', fontSize: '2.2rem' }}>BAIT সদর দপ্তর (Headquarters)</h2>
          <p className="section-subtitle" style={{ color: '#cbd5e1', maxWidth: '650px', margin: '0 auto 40px auto' }}>
            কেন্দ্রীয় পরিচালনা পর্ষদ ও প্রশাসনের নিষ্ঠাবান কর্মকর্তাদের পরিচিতি, দিকনির্দেশনা ও সার্বিক দায়িত্ব।
          </p>
        </div>

        <div className="employee-grid">
          {employees.map(emp => (
            <div key={emp.id} className="employee-card hq-employee-card">
              <div className="employee-photo-wrap">
                <img src={emp.photo_url} alt={emp.name_bn} className="employee-photo" />
              </div>
              <div className="employee-info">
                <span className="employee-dept-badge">{emp.department || 'সদর দপ্তর'}</span>
                <h3 className="employee-name">{emp.name_bn}</h3>
                <div className="employee-designation">{emp.designation}</div>
                <p className="employee-desc">{emp.bio?.substring(0, 95)}...</p>
                <Link to={`/employee/${emp.slug}`} className="card-float-btn hq-float-btn" style={{ marginTop: 'auto' }}>
                  <span className="card-btn-inner">
                    <span>পরিচিতি ও বিস্তারিত</span>
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
