import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { peopleAPI } from '../../services/api';
import InstructorCard from '../../components/directory/InstructorCard';
import Loading from '../../components/common/Loading';

export default function InstructorsDirectory() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    peopleAPI.getByCategory('instructor')
      .then(data => {
        setInstructors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredInstructors = instructors.filter(inst => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      (inst.name_bn && inst.name_bn.toLowerCase().includes(query)) ||
      (inst.designation && inst.designation.toLowerCase().includes(query)) ||
      (inst.courses_taught && inst.courses_taught.toLowerCase().includes(query)) ||
      (inst.bio && inst.bio.toLowerCase().includes(query))
    );
  });

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <span>প্রশিক্ষক</span>
          </div>
          <h1 className="page-banner-title">BAIT প্রশিক্ষকমণ্ডলী</h1>
          <p className="page-banner-subtitle">
            অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ার ও প্রফেশনাল আইসিটি ট্রেইনারবৃন্দ।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>
              প্রশিক্ষক ডিরেক্টরি ({filteredInstructors.length} জন)
            </h2>
          </div>

          <div style={{ position: 'relative', minWidth: '240px', flexGrow: 1, maxWidth: '360px' }}>
            <input 
              type="text" 
              placeholder="প্রশিক্ষক খুঁজুন..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', height: '42px', fontSize: '0.9rem' }}
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          </div>
        </div>

        {loading ? (
          <Loading text="তথ্য লোড হচ্ছে..." />
        ) : filteredInstructors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
            কোনো প্রশিক্ষকের তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="entity-grid">
            {filteredInstructors.map(inst => (
              <InstructorCard key={inst.id} instructor={inst} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
