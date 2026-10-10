import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Plus, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';
import clientService from '../../services/clientService';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';
import ROUTES from '../../constants/routes';

export default function ClientProjects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientService.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading text="প্রজেক্ট তালিকা লোড হচ্ছে..." fullPage />;
  }

  const filtered = projects.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="client-page">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--client-text)', margin: '0 0 6px 0' }}>
            আমার প্রজেক্টসমূহ
          </h1>
          <p style={{ color: 'var(--client-text-muted)', margin: 0, fontSize: '0.92rem' }}>
            আপনার প্রতিষ্ঠানের সকল চলমান, রিভিউতে থাকা ও সম্পন্ন প্রকল্পের বিস্তারিত অগ্রগতি।
          </p>
        </div>

        <Link to={ROUTES.CLIENT.REQUEST_PROJECT} className="client-cta-req-btn">
          <Plus size={16} />
          <span>নতুন প্রজেক্ট রিকোয়েস্ট</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
        {[
          { key: 'all', label: 'সকল প্রজেক্ট' },
          { key: 'in_progress', label: 'চলমান' },
          { key: 'completed', label: 'সম্পন্ন' }
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            style={{
              background: filter === tab.key ? 'var(--client-primary)' : '#ffffff',
              color: filter === tab.key ? '#ffffff' : '#475569',
              border: '1px solid',
              borderColor: filter === tab.key ? 'var(--client-primary)' : '#cbd5e1',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="client-projects-list">
        {filtered.map(project => (
          <div key={project.id} className="client-project-item" style={{ background: '#ffffff', padding: '1.75rem' }}>
            <div className="client-project-top">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>{project.id}</span>
                  <h2 className="client-project-title" style={{ fontSize: '1.25rem' }}>{project.title}</h2>
                </div>
                <span className="client-project-cat">{project.category}</span>
              </div>
              <span className={`client-status-badge status-${project.status}`}>
                ● {project.status_bn}
              </span>
            </div>

            {/* Progress */}
            <div className="client-progress-row" style={{ marginTop: '1rem' }}>
              <div className="client-progress-header">
                <span>সার্বিক অগ্রগতি</span>
                <strong style={{ color: 'var(--client-primary)' }}>{toBengaliNumber(project.progress)}%</strong>
              </div>
              <div className="client-progress-bar-bg" style={{ height: '10px' }}>
                <div 
                  className="client-progress-bar-fill" 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
            </div>

            {/* Milestones */}
            <div style={{ margin: '1.5rem 0' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                মাইলস্টোন ও ডেলিভারি ফেজ:
              </h4>
              <div className="client-milestone-stepper">
                {project.milestones.map((m, idx) => (
                  <div key={m.id} className={`milestone-step ${m.status}`}>
                    <div className="milestone-dot">
                      {m.status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <span className="milestone-name">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer details */}
            <div className="client-project-footer">
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ color: '#64748b' }}>প্রজেক্ট ম্যানেজার: </span>
                  <strong style={{ color: 'var(--client-text)' }}>{project.projectManager}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>বাজেট: </span>
                  <strong style={{ color: 'var(--client-text)' }}>৳{toBengaliNumber(project.budget.toLocaleString())}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>ডেলিভারি তারিখ: </span>
                  <strong style={{ color: 'var(--client-text)' }}>{project.deliveryDate}</strong>
                </div>
              </div>

              <div className="client-tech-chips">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="client-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
