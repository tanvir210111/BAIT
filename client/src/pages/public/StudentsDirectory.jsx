import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { peopleAPI } from '../../services/api';
import StudentCard from '../../components/directory/StudentCard';
import Loading from '../../components/common/Loading';

export default function StudentsDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    peopleAPI.getByCategory('student')
      .then(data => {
        setStudents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredStudents = students.filter(st => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      (st.name_bn && st.name_bn.toLowerCase().includes(query)) ||
      (st.course_name && st.course_name.toLowerCase().includes(query)) ||
      (st.batch && st.batch.toLowerCase().includes(query)) ||
      (st.achievements && st.achievements.toLowerCase().includes(query))
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
            <span>শিক্ষার্থী</span>
          </div>
          <h1 className="page-banner-title">BAIT শিক্ষার্থী ডিরেক্টরি</h1>
          <p className="page-banner-subtitle">
            BAIT অ্যাকাডেমির কৃতি শিক্ষার্থীদের প্রোফাইল, কোর্স ও সাফল্যের খতিয়ান।
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', margin: 0 }}>
              নিবন্ধিত শিক্ষার্থীবৃন্দ ({filteredStudents.length} জন)
            </h2>
          </div>

          <div style={{ position: 'relative', minWidth: '240px', flexGrow: 1, maxWidth: '360px' }}>
            <input 
              type="text" 
              placeholder="শিক্ষার্থী বা কোর্স খুঁজুন..."
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
        ) : filteredStudents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
            কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="entity-grid">
            {filteredStudents.map(st => (
              <StudentCard key={st.id} student={st} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
