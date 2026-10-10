import React, { useState } from 'react';
import { 
  Library as LibraryIcon, 
  BookOpen, 
  Search, 
  Bookmark, 
  ExternalLink, 
  Star, 
  Check, 
  Eye, 
  X
} from 'lucide-react';

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [bookmarkedIds, setBookmarkedIds] = useState([1, 3]);
  const [readingBook, setReadingBook] = useState(null);

  const booksList = [
    {
      id: 1,
      title: 'এলিমেন্টস অব ইউজার এক্সপেরিয়েন্স ডিজাইন',
      author: 'জেসি জেমস গ্যারেট',
      category: 'ux',
      categoryLabel: 'ইউআই/ইউএক্স',
      pages: '২০৮ পৃষ্ঠা',
      rating: '৪.৯',
      edition: '৩য় সংস্করণ (অনুবাদ)',
      description: 'ব্যবহারকারী অভিজ্ঞতার পাঁচটি মূল স্তর: কৌশল, সুযোগ, কাঠামো, কঙ্কাল এবং উপরিভাগ সম্পর্কে পূর্ণাঙ্গ নির্দেশিকা।'
    },
    {
      id: 2,
      title: 'লার্নিং রিঅ্যাক্ট: আধুনিক অ্যাপ্লিকেশন নির্মাণ',
      author: 'অ্যালেক্স ব্যাংকস ও ইভ পোরসেলো',
      category: 'web',
      categoryLabel: 'ওয়েব ডেভেলপমেন্ট',
      pages: '৩৫০ পৃষ্ঠা',
      rating: '৪.৮',
      edition: '২য় সংস্করণ',
      description: 'ফাংশনাল প্রোগ্রামিং, রিঅ্যাক্ট হুকস, স্টেট ম্যানেজমেন্ট এবং সিঙ্গেল পেজ অ্যাপ্লিকেশন তৈরির হ্যান্ডস-অন বই।'
    },
    {
      id: 3,
      title: 'দ্য অ্যানিমেটরস সারভাইভাল কিট',
      author: 'রিচার্ড উইলিয়ামস',
      category: 'animation',
      categoryLabel: 'অ্যানিমেশন',
      pages: '৩৯২ পৃষ্ঠা',
      rating: '৫.০',
      edition: 'মাস্টার ক্লাস এডিশন',
      description: 'অ্যানিমেশনের ১২টি ক্লাসিকাল প্রিন্সিপাল, টাইমিং, স্পেসিং এবং ক্যারেক্টার মুভমেন্টের বিশ্বখ্যাত মাস্টারপিস।'
    },
    {
      id: 4,
      title: 'গ্রিড সিস্টেমস ইন গ্রাফিক ডিজাইন',
      author: 'জোসেফ মুলার-ব্রকম্যান',
      category: 'graphic',
      categoryLabel: 'গ্রাফিক ডিজাইন',
      pages: '১৭৬ পৃষ্ঠা',
      rating: '৪.৯',
      edition: 'আন্তর্জাতিক সংস্করণ',
      description: 'টাইপোগ্রাফি, ভিজ্যুয়াল আর্কিটেকচার এবং সুইস গ্রিড ডিজাইনের আন্তর্জাতিক মানদণ্ড ও প্রয়োগ।'
    },
    {
      id: 5,
      title: 'রিফ্যাক্টরিং ইউআই: ব্যবহারিক ডিজাইন',
      author: 'অ্যাডাম ওয়াথান ও স্টিভ শগার',
      category: 'ux',
      categoryLabel: 'ইউআই/ইউএক্স',
      pages: '২৫২ পৃষ্ঠা',
      rating: '৪.৯',
      edition: 'প্রথম সংস্করণ',
      description: 'জটিল থিওরি ছাড়াই দ্রুত সুন্দর ও পেশাদার ওয়েব ইন্টারফেস তৈরি করার কার্যকর ভিজ্যুয়াল টেকনিক।'
    },
    {
      id: 6,
      title: 'ইউ ডোন্ট নো জেএস: স্কোপ অ্যান্ড ক্লোজারস',
      author: 'কাইল সিম্পসন',
      category: 'web',
      categoryLabel: 'ওয়েব ডেভেলপমেন্ট',
      pages: '১৮০ পৃষ্ঠা',
      rating: '৪.৭',
      edition: 'দ্বিতীয় সংস্করণ',
      description: 'জাভাস্ক্রিপ্ট ইঞ্জিনের অভ্যন্তরীণ কার্যপদ্ধতি, লেক্সিক্যাল স্কোপ, ক্লোজার ও মেমরি মডেলের গভীর আলোচনা।'
    }
  ];

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const filteredBooks = booksList.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || book.category === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <LibraryIcon size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">ডিজিটাল ই-লাইব্রেরি</h1>
          </div>
          <p className="utopia-page-subtitle">
            বিশ্বমানের আইটি, ডিজাইন ও সফটওয়্যার ইঞ্জিনিয়ারিং রেফারেন্স বই, ই-বুক ও স্টাডি ম্যানুয়াল।
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="utopia-filter-card">
        <div className="utopia-day-pills">
          <button
            type="button"
            onClick={() => setSelectedTopic('all')}
            className={`utopia-day-pill ${selectedTopic === 'all' ? 'active' : ''}`}
          >
            সকল বই ({booksList.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedTopic('web')}
            className={`utopia-day-pill ${selectedTopic === 'web' ? 'active' : ''}`}
          >
            ওয়েব ও কোডিং
          </button>
          <button
            type="button"
            onClick={() => setSelectedTopic('ux')}
            className={`utopia-day-pill ${selectedTopic === 'ux' ? 'active' : ''}`}
          >
            ইউআই/ইউএক্স
          </button>
          <button
            type="button"
            onClick={() => setSelectedTopic('graphic')}
            className={`utopia-day-pill ${selectedTopic === 'graphic' ? 'active' : ''}`}
          >
            গ্রাফিক ডিজাইন
          </button>
          <button
            type="button"
            onClick={() => setSelectedTopic('animation')}
            className={`utopia-day-pill ${selectedTopic === 'animation' ? 'active' : ''}`}
          >
            অ্যানিমেশন
          </button>
        </div>

        <div className="utopia-table-search">
          <Search size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="বইয়ের নাম দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 3-Column Aligned Books Grid (2 Rows of 3 Cards) */}
      <div className="utopia-cards-grid-3">
        {filteredBooks.map(book => (
          <div key={book.id} className="utopia-portal-card">
            {/* Top Body */}
            <div className="utopia-portal-card-body">
              <div className="utopia-portal-card-header">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#7c3aed', background: '#f3e8ff', padding: '3px 8px', borderRadius: '6px' }}>
                  {book.categoryLabel}
                </span>
                <button
                  type="button"
                  onClick={() => toggleBookmark(book.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: bookmarkedIds.includes(book.id) ? '#eab308' : '#cbd5e1'
                  }}
                  title="বুকমার্ক করুন"
                >
                  <Bookmark size={17} fill={bookmarkedIds.includes(book.id) ? '#eab308' : 'none'} />
                </button>
              </div>

              <h3 className="utopia-portal-card-title">
                {book.title}
              </h3>

              <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px' }}>
                লেখক: <strong>{book.author}</strong> • {book.edition}
              </div>

              <div className="utopia-course-divider" style={{ margin: '8px 0 10px' }} />

              <p className="utopia-portal-card-desc">
                {book.description}
              </p>

              <div style={{ display: 'flex', gap: '14px', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '8px' }}>
                <span>{book.pages}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', fontWeight: 600 }}>
                  <Star size={13} fill="#eab308" /> {book.rating} রেটিং
                </span>
              </div>
            </div>

            {/* Bottom Footer Aligned Across Cards */}
            <div className="utopia-portal-card-footer">
              <button
                type="button"
                onClick={() => setReadingBook(book)}
                className="utopia-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <BookOpen size={15} />
                <span>ই-বুক রিডারে খুলুন</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* E-book Reader Preview Modal */}
      {readingBook && (
        <div className="utopia-modal-backdrop" onClick={() => setReadingBook(null)}>
          <div className="utopia-modal-box" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  {readingBook.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  লেখক: {readingBook.author} • {readingBook.pages}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReadingBook(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  সূচিপত্র ও সংক্ষিপ্ত পাঠ্য
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
                  অধ্যায় ০১: ভিত্তিমূল এবং প্রাথমিক ধারণা<br/>
                  অধ্যায় ০২: ইন্ডাস্ট্রি স্ট্যান্ডার্ড প্র্যাকটিস ও মেথডোলজি<br/>
                  অধ্যায় ০৩: রিয়েল-ওয়ার্ল্ড কেস স্টাডি ও আর্কিটেকচার পর্যালোচনা<br/>
                  অধ্যায় ০৪: অ্যাডভান্সড টেকনিকস এবং টিম কোলাবোরেশন
                </p>
              </div>

              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: '1.6' }}>
                এই বইটি বিআইটি সেন্ট্রাল ডিজিটাল লাইব্রেরির শিক্ষার্থী পোর্টাল সদস্যদের জন্য সম্পূর্ণ উন্মুক্ত করা হয়েছে। আপনি অফলাইন পাঠের জন্য পিডিএফ সংরক্ষণ করতে পারেন।
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setReadingBook(null)}
                  className="utopia-btn-secondary"
                >
                  বন্ধ করুন
                </button>
                <button
                  type="button"
                  onClick={() => alert('পিডিএফ রিডার ডাউনলোড শুরু হচ্ছে...')}
                  className="utopia-btn-primary"
                >
                  সম্পূর্ণ বই ডাউনলোড করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
