import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Layers, 
  Eye, 
  Award,
  Send,
  X
} from 'lucide-react';

export default function Projects() {
  const [activeTab, setActiveTab] = useState('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form states
  const [projectTitle, setProjectTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ITD201 - অ্যাডভান্সড ওয়েব ডিজাইন');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [description, setDescription] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [projectsList, setProjectsList] = useState([
    {
      id: 1,
      title: 'রিঅ্যাক্ট ও নোড ই-কমার্স প্ল্যাটফর্ম',
      course: 'ITD201 - ওয়েব ডিজাইন',
      status: 'in-progress',
      statusBangla: 'চলমান প্রজেক্ট',
      badgeClass: 'badge-upcoming',
      score: null,
      githubUrl: 'https://github.com/bait-student/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.bait.edu.bd',
      submissionDate: '১০ জানুয়ারি ২০২৪',
      description: 'সম্পূর্ণ রেসপনসিভ শপিং কার্ট, পেমেন্ট গেটওয়ে এবং অ্যাডমিন ড্যাশবোর্ড ইন্টিগ্রেশন সম্পন্ন আধুনিক ই-কমার্স অ্যাপ।',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'ব্র্যান্ড আইডেন্টিটি ও ডিজাইন সিস্টেম',
      course: 'ART101 - গ্রাফিক ডিজাইন',
      status: 'completed',
      statusBangla: 'অনুমোদিত ও সম্পন্ন',
      badgeClass: 'badge-completed',
      score: '৯৬/১০০',
      githubUrl: 'https://behance.net/bait-student-branding',
      liveUrl: 'https://figma.com/@bait-brand-kit',
      submissionDate: '২২ ডিসেম্বর ২০২৩',
      description: 'একটি স্টার্টআপ ব্র্যান্ডের জন্য লোগো, কালার প্যালেট, টাইপোগ্রাফি রুলবুক ও কর্পোরেট স্টেশনারি ডিজাইন।',
      technologies: ['Illustrator', 'Figma']
    },
    {
      id: 3,
      title: 'টেলিমেডিসিন মোবাইল অ্যাপ ইউএক্স স্টাডি',
      course: 'UXD301 - ইউজার এক্সপেরিয়েন্স',
      status: 'under-review',
      statusBangla: 'রিভিউতে রয়েছে',
      badgeClass: 'badge-upcoming',
      score: null,
      githubUrl: 'https://figma.com/@telemed-case-study',
      liveUrl: 'https://medium.com/@bait-telemed-ux',
      submissionDate: '৮ জানুয়ারি ২০২৪',
      description: 'ব্যবহারকারী ইন্টারভিউ, ওয়্যারফ্রেমিং, ইনফরমেশন আর্কিটেকচার এবং ইন্টারেক্টিভ প্রোটোটাইপিং সম্পন্ন কেস স্টাডি।',
      technologies: ['Figma', 'Miro']
    },
    {
      id: 4,
      title: 'ব্লেন্ডার ৩ডি সাই-ফাই ক্যারেক্টার মডেল',
      course: 'ANI301 - থ্রিডি অ্যানিমেশন',
      status: 'completed',
      statusBangla: 'অনুমোদিত ও সম্পন্ন',
      badgeClass: 'badge-completed',
      score: '৯৫/১০০',
      githubUrl: 'https://artstation.com/bait-student-3d',
      liveUrl: 'https://sketchfab.com/bait-3d-model',
      submissionDate: '১৫ ডিসেম্বর ২০২৩',
      description: 'সম্পূর্ণ রিগিং ও টেক্সচারিং সমৃদ্ধ একটি সাই-ফাই রোবটিক ক্যারেক্টারের ৩ডি মডেল ও ওয়াক-সাইকেল অ্যানিমেশন।',
      technologies: ['Blender', 'Substance']
    }
  ]);

  const filteredProjects = projectsList.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return p.status === 'in-progress';
    if (activeTab === 'under-review') return p.status === 'under-review';
    if (activeTab === 'completed') return p.status === 'completed';
    return true;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectTitle || !githubUrl) return;

    const newProj = {
      id: projectsList.length + 1,
      title: projectTitle,
      course: selectedCourse,
      status: 'under-review',
      statusBangla: 'রিভিউতে রয়েছে',
      badgeClass: 'badge-upcoming',
      score: null,
      githubUrl,
      liveUrl: liveUrl || githubUrl,
      submissionDate: 'আজ, ১০ জানুয়ারি',
      description: description || 'শিক্ষার্থী কর্তৃক সফলভাবে জমা দেওয়া প্রজেক্ট।',
      technologies: ['React', 'Custom']
    };

    setProjectsList([newProj, ...projectsList]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setProjectTitle('');
      setGithubUrl('');
      setLiveUrl('');
      setDescription('');
    }, 1200);
  };

  return (
    <div className="utopia-page-container">
      {/* Page Header */}
      <div className="utopia-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <FolderGit2 size={20} color="#0d1b2a" />
            <h1 className="utopia-page-title">প্রজেক্ট ও পোর্টফোলিও</h1>
          </div>
          <p className="utopia-page-subtitle">
            আপনার অ্যাকাডেমিক কোর্সওয়ার্কের ক্যাপস্টোন প্রজেক্ট, গিটহাব রিপোজিটরি ও লাইভ পোর্টফোলিও সাবমিশন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="utopia-btn-primary"
        >
          <Plus size={16} />
          <span>নতুন প্রজেক্ট জমা দিন</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="utopia-stats-grid">
        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <Layers size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">{projectsList.length}টি</div>
            <div className="utopia-stat-label">সর্বমোট প্রজেক্ট</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <Clock size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">১টি</div>
            <div className="utopia-stat-label">চলমান কাজ</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
            <FolderGit2 size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">১টি</div>
            <div className="utopia-stat-label">রিভিউ অপেক্ষমান</div>
          </div>
        </div>

        <div className="utopia-stat-card">
          <div className="utopia-stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Award size={22} />
          </div>
          <div className="utopia-stat-info">
            <div className="utopia-stat-value">৯৫.৫</div>
            <div className="utopia-stat-label">গড় প্রজেক্ট স্কোর</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="utopia-filter-card">
        <div className="utopia-day-pills">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`utopia-day-pill ${activeTab === 'all' ? 'active' : ''}`}
          >
            সকল প্রজেক্ট ({projectsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('in-progress')}
            className={`utopia-day-pill ${activeTab === 'in-progress' ? 'active' : ''}`}
          >
            চলমান (১)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('under-review')}
            className={`utopia-day-pill ${activeTab === 'under-review' ? 'active' : ''}`}
          >
            রিভিউতে (১)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`utopia-day-pill ${activeTab === 'completed' ? 'active' : ''}`}
          >
            সম্পন্ন (২)
          </button>
        </div>
      </div>

      {/* 4-Column Aligned Projects Grid */}
      <div className="utopia-cards-grid-4">
        {filteredProjects.map(proj => (
          <div key={proj.id} className="utopia-portal-card">
            {/* Top Body */}
            <div className="utopia-portal-card-body">
              <div className="utopia-portal-card-header">
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#059669', background: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>
                  {proj.course}
                </span>
                <span className={`badge-status ${proj.badgeClass}`}>
                  {proj.statusBangla}
                </span>
              </div>

              <h3 className="utopia-portal-card-title">
                {proj.title}
              </h3>

              <div className="utopia-course-divider" style={{ margin: '8px 0 10px' }} />

              <p className="utopia-portal-card-desc">
                {proj.description}
              </p>

              {/* Technologies Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
                {proj.technologies.map((t, idx) => (
                  <span key={idx} style={{ fontSize: '0.7rem', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '4px' }}>
                জমা: {proj.submissionDate}
              </div>
            </div>

            {/* Bottom Footer Aligned Across All Cards */}
            <div className="utopia-portal-card-footer">
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a' }}>
                {proj.score ? `নম্বর: ${proj.score}` : 'মূল্যায়ন চলছে'}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="utopia-btn-outline-sm"
                  title="রিপোজিটরি"
                  style={{ textDecoration: 'none' }}
                >
                  <GitBranch size={13} /> কোড
                </a>
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="utopia-btn-sm"
                  title="লাইভ ডেমো"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={13} /> লাইভ
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Submission Modal */}
      {isSubmitModalOpen && (
        <div className="utopia-modal-backdrop" onClick={() => setIsSubmitModalOpen(false)}>
          <div className="utopia-modal-box" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
            <div className="utopia-modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  নতুন প্রজেক্ট বা পোর্টফোলিও জমা দিন
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  আপনার তৈরি করা কোর্সের প্রজেক্ট বা গিটহাব লিংক সাবমিট করুন
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>

            {submittedSuccess ? (
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  প্রজেক্ট সফলভাবে জমা হয়েছে!
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginTop: '6px' }}>
                  আপনার কোর্স প্রশিক্ষক প্রজেক্টটি পর্যালোচনা করে ফলাফল প্রদান করবেন।
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateProject} style={{ padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    প্রজেক্টের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ফুলস্ট্যাক বুকস্টোর ওয়েব অ্যাপ্লিকেশন"
                    value={projectTitle}
                    onChange={e => setProjectTitle(e.target.value)}
                    className="utopia-input"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    কোর্স নির্বাচন করুন *
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={e => setSelectedCourse(e.target.value)}
                    className="utopia-input"
                  >
                    <option value="ITD201 - ওয়েব ডিজাইন">ITD201 - ওয়েব ডিজাইন</option>
                    <option value="ART101 - গ্রাফিক ডিজাইন">ART101 - গ্রাফিক ডিজাইন</option>
                    <option value="UXD301 - ইউজার এক্সপেরিয়েন্স">UXD301 - ইউজার এক্সপেরিয়েন্স</option>
                    <option value="ANI301 - থ্রিডি অ্যানিমেশন">ANI301 - থ্রিডি অ্যানিমেশন</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      গিটহাব / কোড রিপোজিটরি লিংক *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/..."
                      value={githubUrl}
                      onChange={e => setGithubUrl(e.target.value)}
                      className="utopia-input"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      লাইভ ডেমো / প্রিভিউ লিংক
                    </label>
                    <input
                      type="url"
                      placeholder="https://myproject.vercel.app"
                      value={liveUrl}
                      onChange={e => setLiveUrl(e.target.value)}
                      className="utopia-input"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    প্রজেক্টের বিবরণ ও প্রযুক্তি
                  </label>
                  <textarea
                    rows={3}
                    placeholder="প্রজেক্টটি কী সমস্যা সমাধান করে এবং কী কী ফিচার অন্তর্ভুক্ত রয়েছে সংক্ষেপে লিখুন..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="utopia-input"
                    style={{ fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="utopia-btn-secondary"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="utopia-btn-primary"
                    style={{ background: '#059669' }}
                  >
                    <Send size={15} /> প্রজেক্ট জমা দিন
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
