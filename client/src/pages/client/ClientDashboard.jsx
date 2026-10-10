import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  CheckCircle2, 
  Wallet, 
  Clock, 
  ArrowRight, 
  Plus, 
  Download, 
  ExternalLink,
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import clientService from '../../services/clientService';
import Loading from '../../components/common/Loading';
import { toBengaliNumber } from '../../utils/formatDate';
import ROUTES from '../../constants/routes';

export default function ClientDashboard() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accountManager, setAccountManager] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      clientService.getProfile(),
      clientService.getStats(),
      clientService.getProjects(),
      clientService.getInvoices(),
      clientService.getActivities(),
      clientService.getAccountManager()
    ]).then(([prof, st, prj, inv, act, mgr]) => {
      setProfile(prof);
      setStats(st);
      setProjects(prj);
      setInvoices(inv);
      setActivities(act);
      setAccountManager(mgr);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading text="ক্লায়েন্ট ড্যাশবোর্ড লোড হচ্ছে..." fullPage />;
  }

  const ongoingProjects = projects.filter(p => p.status === 'in_progress');

  return (
    <div className="client-page">
      {/* 1. Hero / Welcome Banner */}
      <div className="client-dashboard-hero">
        <div className="client-hero-content">
          <div className="client-hero-tags">
            <span className="client-badge-tag client-badge-emerald">
              <ShieldCheck size={14} />
              {profile?.tier || 'এন্টারপ্রাইজ পার্টনার'}
            </span>
            <span className="client-badge-tag client-badge-gold">
              ক্লায়েন্ট আইডি: {profile?.client_id || 'BAIT-CL904'}
            </span>
          </div>
          <h1 className="client-hero-title">
            স্বাগতম, {profile?.name_bn || 'সম্মানিত ক্লায়েন্ট'}!
          </h1>
          <p className="client-hero-desc">
            {profile?.company_name || 'আপনার প্রতিষ্ঠান'}-এর চলমান ডিজিটাল প্রজেক্টের সার্বিক অগ্রগতি, মাইলস্টোন ও বিলিং স্ট্যাটাস একনজরে পর্যবেক্ষণ করুন।
          </p>
        </div>

        <div className="client-hero-actions">
          <Link to={ROUTES.CLIENT.REQUEST_PROJECT} className="client-hero-primary-btn">
            <Plus size={18} />
            <span>নতুন প্রজেক্ট রিকোয়েস্ট</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="client-stats-grid">
        <div className="client-stat-card">
          <div className="client-stat-icon-wrap icon-emerald">
            <FolderKanban size={24} />
          </div>
          <div className="client-stat-info">
            <span className="client-stat-label">চলমান প্রজেক্ট</span>
            <span className="client-stat-value">{toBengaliNumber(stats?.activeProjects || 0)} টি</span>
            <span className="client-stat-trend">সময়মতো অগ্রসরমান</span>
          </div>
        </div>

        <div className="client-stat-card">
          <div className="client-stat-icon-wrap icon-teal">
            <CheckCircle2 size={24} />
          </div>
          <div className="client-stat-info">
            <span className="client-stat-label">সম্পন্ন ডেলিভারি</span>
            <span className="client-stat-value">{toBengaliNumber(stats?.completedProjects || 0)} টি</span>
            <span className="client-stat-trend">১০০% কোয়ালিটি টেস্টেড</span>
          </div>
        </div>

        <div className="client-stat-card">
          <div className="client-stat-icon-wrap icon-blue">
            <Wallet size={24} />
          </div>
          <div className="client-stat-info">
            <span className="client-stat-label">মোট বিনিয়োগ</span>
            <span className="client-stat-value">৳{toBengaliNumber((stats?.totalInvested || 0).toLocaleString())}</span>
            <span className="client-stat-trend">সিকিউর এস্ক্রো পেমেন্ট</span>
          </div>
        </div>

        <div className="client-stat-card">
          <div className="client-stat-icon-wrap icon-amber">
            <Clock size={24} />
          </div>
          <div className="client-stat-info">
            <span className="client-stat-label">বকেয়া ইনভয়েস</span>
            <span className="client-stat-value">৳{toBengaliNumber((stats?.pendingAmount || 0).toLocaleString())}</span>
            <span className="client-stat-trend" style={{ color: '#d97706' }}>
              {toBengaliNumber(stats?.pendingInvoicesCount || 0)} টি ইনভয়েস অবশিষ্ট
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="client-dashboard-grid">
        {/* Left Column: Ongoing Projects & Invoices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Active Projects Tracker */}
          <div className="client-card">
            <div className="client-card-header">
              <h2 className="client-card-title">চলমান প্রজেক্ট অগ্রগতি</h2>
              <Link to={ROUTES.CLIENT.PROJECTS} className="client-card-link">
                সকল প্রজেক্ট দেখুন →
              </Link>
            </div>

            <div className="client-projects-list">
              {ongoingProjects.map((project) => (
                <div key={project.id} className="client-project-item">
                  <div className="client-project-top">
                    <div>
                      <h3 className="client-project-title">{project.title}</h3>
                      <span className="client-project-cat">{project.category}</span>
                    </div>
                    <span className={`client-status-badge status-${project.status}`}>
                      ● {project.status_bn}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="client-progress-row">
                    <div className="client-progress-header">
                      <span>অগ্রগতি</span>
                      <strong style={{ color: 'var(--client-primary)' }}>{toBengaliNumber(project.progress)}%</strong>
                    </div>
                    <div className="client-progress-bar-bg">
                      <div 
                        className="client-progress-bar-fill" 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                  </div>

                  {/* Milestone Stepper */}
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

                  {/* Footer Meta */}
                  <div className="client-project-footer">
                    <div>
                      <span>প্রজেক্ট ম্যানেজার: </span>
                      <span className="client-meta-val">{project.projectManager}</span>
                    </div>
                    <div>
                      <span>সম্ভাব্য ডেলিভারি: </span>
                      <span className="client-meta-val">{project.deliveryDate}</span>
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

          {/* Recent Invoices Table */}
          <div className="client-card">
            <div className="client-card-header">
              <h2 className="client-card-title">সাম্প্রতিক ইনভয়েস ও বিলিং</h2>
              <Link to={ROUTES.CLIENT.INVOICES} className="client-card-link">
                বিলিং হিস্ট্রি →
              </Link>
            </div>

            <div className="client-invoices-table-wrap">
              <table className="client-invoices-table">
                <thead>
                  <tr>
                    <th>ইনভয়েস নং</th>
                    <th>প্রজেক্টের নাম</th>
                    <th>পরিমাণ</th>
                    <th>নির্ধারিত তারিখ</th>
                    <th>স্ট্যাটাস</th>
                    <th>রসিদ</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.slice(0, 3).map((inv) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 700, color: 'var(--client-text)' }}>{inv.id}</td>
                      <td>{inv.projectTitle}</td>
                      <td style={{ fontWeight: 700, color: 'var(--client-primary)' }}>
                        ৳{toBengaliNumber(inv.amount.toLocaleString())}
                      </td>
                      <td>{inv.dueDate}</td>
                      <td>
                        <span className={`inv-badge-${inv.status}`}>
                          {inv.status_bn}
                        </span>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          title="ডাউনলোড রসিদ" 
                          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Account Manager, Activity Log & SLA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Dedicated Account Manager Card */}
          <div className="client-account-manager-card">
            <div className="manager-card-top">
              <div className="manager-avatar-wrap">
                <img 
                  src={accountManager?.avatar} 
                  alt={accountManager?.name} 
                  className="manager-avatar" 
                />
                <span className="manager-status-indicator" title="অনলাইন" />
              </div>
              <div>
                <h4 className="manager-name">{accountManager?.name}</h4>
                <p className="manager-role">{accountManager?.designation}</p>
              </div>
            </div>

            <div className="manager-contact-list">
              <div className="manager-contact-item">
                <Mail size={15} />
                <span>{accountManager?.email}</span>
              </div>
              <div className="manager-contact-item">
                <Phone size={15} />
                <span>{accountManager?.phone}</span>
              </div>
              <div className="manager-contact-item">
                <Calendar size={15} />
                <span>{accountManager?.availableTime}</span>
              </div>
            </div>

            <a 
              href={`mailto:${accountManager?.email}`} 
              className="manager-cta-btn"
            >
              <Mail size={16} />
              <span>সরাসরি যোগাযোগ করুন</span>
            </a>
          </div>

          {/* Activity / Project Log Feed */}
          <div className="client-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--client-text)', marginBottom: '16px' }}>
              প্রজেক্ট আপডেট ও কার্যক্রম
            </h3>
            <div className="client-activity-feed">
              {activities.map((act) => (
                <div key={act.id} className="client-activity-item">
                  <span className="activity-dot" />
                  <div>
                    <h5 className="activity-title">{act.title}</h5>
                    <p className="activity-desc">{act.desc}</p>
                    <span className="activity-time">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise SLA Guarantee Card */}
          <div className="client-card" style={{ background: '#0b1d16', color: '#ffffff', border: '1px solid #064e3b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Sparkles size={20} color="#34d399" />
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                BAIT এন্টারপ্রাইজ কমিটমেন্ট
              </h4>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '14px' }}>
              প্রতিটি প্রজেক্টে ডেডিকেটেড ক্লাউড আর্কিটেকচার, ৯৯.৯% আপটাইম নিশ্চয়তা এবং কোডবেস ডেলিভারির পর ৬ মাসের ফ্রি মেইনটেন্যান্স অন্তর্ভুক্ত।
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="client-chip" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#a7f3d0' }}>
                ✓ ৯৯.৯% SLA
              </span>
              <span className="client-chip" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#a7f3d0' }}>
                ✓ ২৪/৭ মনিটরিং
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
