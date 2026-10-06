import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, User, ArrowRight, Loader } from 'lucide-react';
import { searchAPI } from '../../services/api';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      searchAPI.search(query)
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Filter out any journalist category from public flow
  const publicPeople = (results?.people || []).filter(p => p.category !== 'journalist');

  const hasAnyResults = results && (
    publicPeople.length > 0 ||
    (results.courses && results.courses.length > 0)
  );

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-box" onClick={e => e.stopPropagation()}>
        {/* Search Input Box */}
        <div className="search-input-header">
          <Search size={22} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            className="search-main-input"
            placeholder="কোর্স, প্রশিক্ষক, শিক্ষার্থী বা কর্মকর্তা খুঁজুন..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {loading && <Loader size={20} className="spin-animation" color="var(--primary)" />}
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Results Body */}
        <div className="search-results-area">
          {!query.trim() && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#94a3b8' }}>
              <p style={{ fontSize: '1rem', marginBottom: '8px' }}>অনুসন্ধান করতে বাংলা বা ইংরেজিতে টাইপ করুন</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span onClick={() => setQuery('ওয়েব ডেভেলপমেন্ট')} style={{ cursor: 'pointer', background: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.82rem', color: '#334155' }}>
                  ওয়েব ডেভেলপমেন্ট
                </span>
                <span onClick={() => setQuery('গ্রাফিক')} style={{ cursor: 'pointer', background: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.82rem', color: '#334155' }}>
                  গ্রাফিক ডিজাইন
                </span>
                <span onClick={() => setQuery('প্রশিক্ষক')} style={{ cursor: 'pointer', background: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.82rem', color: '#334155' }}>
                  প্রশিক্ষক
                </span>
                <span onClick={() => setQuery('পাইথন')} style={{ cursor: 'pointer', background: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.82rem', color: '#334155' }}>
                  পাইথন
                </span>
              </div>
            </div>
          )}

          {query.trim() && !loading && results && !hasAnyResults && (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: '#64748b' }}>
              <p>"{query}" সম্পর্কিত কোনো তথ্য পাওয়া যায়নি।</p>
            </div>
          )}

          {/* People Results */}
          {publicPeople.length > 0 && (
            <div>
              <div className="search-group-title">ব্যক্তিবর্গ (প্রশিক্ষক / শিক্ষার্থী / কর্মকর্তা)</div>
              {publicPeople.map(p => {
                const categoryUrl = p.category === 'employee' ? 'employee' : p.category;
                const categoryLabel = 
                  p.category === 'instructor' ? 'প্রশিক্ষক' :
                  p.category === 'student' ? 'শিক্ষার্থী' : 'কর্মকর্তা';

                return (
                  <Link 
                    key={p.id} 
                    to={`/${categoryUrl}/${p.slug}`} 
                    onClick={onClose}
                    className="search-result-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {p.photo_url ? (
                        <img src={p.photo_url} alt={p.name_bn} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={18} color="#64748b" />
                        </div>
                      )}
                      <div>
                        <strong style={{ color: 'var(--primary-dark)' }}>{p.name_bn}</strong>
                        <span style={{ marginLeft: '8px', fontSize: '0.75rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>
                          {categoryLabel}
                        </span>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          {p.designation || p.course_name || ''}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--primary)" />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Courses Results */}
          {results?.courses?.length > 0 && (
            <div>
              <div className="search-group-title">কোর্স</div>
              {results.courses.map(c => (
                <Link 
                  key={c.id} 
                  to={`/course/${c.slug}`} 
                  onClick={onClose}
                  className="search-result-item"
                >
                  <div>
                    <strong style={{ color: 'var(--primary-dark)' }}>{c.title_bn}</strong>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      মেয়াদ: {c.duration} {c.batch_info ? `| ${c.batch_info}` : ''}
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--primary)" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
