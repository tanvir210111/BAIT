import React, { useState } from 'react';
import { 
  FolderDown, 
  FileText, 
  Code, 
  FileArchive, 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  Check, 
  Layers
} from 'lucide-react';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadedIds, setDownloadedIds] = useState([]);

  const resourcesList = [
    {
      id: 1,
      title: 'কমপ্লিট কালার থিওরি ও ভিজ্যুয়াল গ্রিড হ্যান্ডবুক',
      course: 'ART101 - গ্রাফিক ফান্ডামেন্টালস',
      type: 'pdf',
      typeLabel: 'পিডিএফ গাইড',
      size: '১৪.২ এমবি',
      downloads: '১,৪২০',
      date: '৮ জানুয়ারি ২০২৪',
      description: 'কালার কম্বিনেশন, কনট্রাস্ট রেশিও এবং ১২-কলাম লেআউট গ্রিড সম্পর্কিত বিস্তারিত পিডিএফ হ্যান্ডবুক।'
    },
    {
      id: 2,
      title: 'রিঅ্যাক্ট ও রেড্যাক্স টুলকিট ফুল স্টার্টার বয়লারপ্লেট',
      course: 'ITD201 - ওয়েব ডিজাইন',
      type: 'code',
      typeLabel: 'সোর্স কোড',
      size: '৫.৮ এমবি',
      downloads: '২,১৮০',
      date: '৫ জানুয়ারি ২০২৪',
      description: 'ভাইট, সিএসএস ও রেড্যাক্স আর্কিটেকচার প্রি-কনফিগার করা রেডি-টু-ইউজ প্রজেক্ট কোড জিপ ফাইল।'
    },
    {
      id: 3,
      title: 'ইউজার ইন্টারভিউ ও ইউজেবিলিটি টেস্টিং চেকলিস্ট',
      course: 'UXD301 - ইউজার এক্সপেরিয়েন্স',
      type: 'doc',
      typeLabel: 'ডকুমেন্টেশন',
      size: '৩.১ এমবি',
      downloads: '৯৫০',
      date: '২ জানুয়ারি ২০২৪',
      description: 'ইউজার রিসার্চ সেশন পরিচালনার জন্য প্রস্তুতকৃত স্ট্যান্ডার্ড ইন্টারভিউ প্রশ্নমালা ও প্রশ্নপত্র টেমপ্লেট।'
    },
    {
      id: 4,
      title: 'ব্লেন্ডার লো-পলি ক্যারেক্টার ও টেক্সচার এসেট প্যাক',
      course: 'ANI301 - থ্রিডি অ্যানিমেশন',
      type: 'zip',
      typeLabel: 'থ্রিডি এসেট জিপ',
      size: '৮২.৫ এমবি',
      downloads: '১,০৫০',
      date: '২৮ ডিসেম্বর ২০২৩',
      description: 'ব্লেন্ডার ৩.৬ ভার্সনে ব্যবহারের জন্য রয়্যালটি-ফ্রি পিবিআর টেক্সচার ও রিগড লো-পলি ক্যারেক্টার ফাইল।'
    },
    {
      id: 5,
      title: 'মডার্ন সিএসএস ফ্লেক্সবক্স ও গ্রিড আলটিমেট চিটশিট',
      course: 'ITD201 - ওয়েব ডিজাইন',
      type: 'pdf',
      typeLabel: 'চিটশিট',
      size: '২.৪ এমবি',
      downloads: '৩,৪০০',
      date: '২২ ডিসেম্বর ২০২৩',
      description: 'সিএসএস ফ্লেক্সবক্স ও গ্রিডের সকল প্রপার্টি ও ভিজ্যুয়াল ডায়াগ্রাম সমৃদ্ধ কুইক রেফারেন্স চিটশিট।'
    },
    {
      id: 6,
      title: 'কর্পোরেট ব্র্যান্ডিং ভেক্টর মকআপ ও আইকন বান্ডেল',
      course: 'ART101 - গ্রাফিক ফান্ডামেন্টালস',
      type: 'zip',
      typeLabel: 'ডিজাইন এসেট',
      size: '৪৫.০ এমবি',
      downloads: '১,৭৫০',
      date: '১৫ ডিসেম্বর ২০২৩',
      description: 'বিজনেস কার্ড, লেটারহেড এবং ব্রোশিওর ডিজাইনের জন্য ভেক্টর এসভিজি ও ইলাস্ট্রেটর ফাইল বান্ডেল।'
    }
  ];

  const handleDownload = (id) => {
    setDownloadedIds(prev => [...prev, id]);
  };

  const filteredResources = resourcesList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <FolderDown size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">রিসোর্স ও স্টাডি ম্যাটেরিয়ালস</h1>
          </div>
          <p className="utopia-page-subtitle">
            আপনার কোর্স সমূহের প্রয়োজনীয় লেকচার স্লাইডস, সোর্স কোড রিপোজিটরি, এসেট বান্ডেল ও রেফারেন্স ফাইল ডাউনলোড করুন।
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="utopia-filter-card">
        <div className="utopia-day-pills">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`utopia-day-pill ${selectedCategory === 'all' ? 'active' : ''}`}
          >
            সকল ফাইল ({resourcesList.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('pdf')}
            className={`utopia-day-pill ${selectedCategory === 'pdf' ? 'active' : ''}`}
          >
            পিডিএফ গাইড
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('code')}
            className={`utopia-day-pill ${selectedCategory === 'code' ? 'active' : ''}`}
          >
            সোর্স কোড
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('zip')}
            className={`utopia-day-pill ${selectedCategory === 'zip' ? 'active' : ''}`}
          >
            এসেট জিপ
          </button>
        </div>

        <div className="utopia-table-search">
          <Search size={15} color="#94a3b8" />
          <input
            type="text"
            placeholder="রিসোর্স খুঁজুন..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 3-Column Aligned Resources Grid (2 Rows of 3 Cards) */}
      <div className="utopia-cards-grid-3">
        {filteredResources.map(res => (
          <div key={res.id} className="utopia-portal-card">
            {/* Top Body */}
            <div className="utopia-portal-card-body">
              <div className="utopia-portal-card-header">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '3px 8px', borderRadius: '6px' }}>
                  {res.course}
                </span>
                <span style={{ fontSize: '0.74rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                  {res.typeLabel}
                </span>
              </div>

              <h3 className="utopia-portal-card-title">
                {res.title}
              </h3>

              <div className="utopia-course-divider" style={{ margin: '8px 0 10px' }} />

              <p className="utopia-portal-card-desc">
                {res.description}
              </p>

              <div style={{ display: 'flex', gap: '14px', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '8px' }}>
                <span>আকার: <strong>{res.size}</strong></span>
                <span>ডাউনলোড: <strong>{res.downloads}</strong></span>
              </div>
            </div>

            {/* Bottom Footer Aligned Across Cards */}
            <div className="utopia-portal-card-footer">
              <button
                type="button"
                onClick={() => handleDownload(res.id)}
                className={downloadedIds.includes(res.id) ? 'utopia-btn-outline-sm' : 'utopia-btn-primary'}
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  background: downloadedIds.includes(res.id) ? '#dcfce7' : '#0d1b2a',
                  color: downloadedIds.includes(res.id) ? '#15803d' : '#ffffff',
                  borderColor: downloadedIds.includes(res.id) ? '#bbf7d0' : undefined
                }}
              >
                {downloadedIds.includes(res.id) ? (
                  <>
                    <Check size={15} /> ডাউনলোড সম্পন্ন হয়েছে
                  </>
                ) : (
                  <>
                    <Download size={15} /> ফাইল ডাউনলোড করুন
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
