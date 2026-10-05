import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, Map, Users, BookOpen, Newspaper, Award, ArrowRight, ChevronRight, User } from 'lucide-react';

export default function DivisionDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/divisions/${slug}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>বিভাগের তথ্য লোড হচ্ছে...</div>;
  }

  if (!data || !data.division) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>বিভাগ পাওয়া যায়নি</h2>
        <Link to="/bibhag" className="btn btn-primary" style={{ marginTop: '20px' }}>বিভাগের তালিকায় ফিরুন</Link>
      </div>
    );
  }

  const { division, districts, instructors, students, journalists, courses } = data;

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <Link to="/bibhag">বিভাগ</Link>
            <span>/</span>
            <span>{division.name_bn}</span>
          </div>
          <h1 className="page-banner-title">{division.name_bn}</h1>
          <p className="page-banner-subtitle">
            {division.description}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>মোট জেলা</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{districts?.length || 0} টি</div>
          </div>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>সদর দপ্তর</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{division.headquarters || 'বিভাগীয় শহর'}</div>
          </div>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>BAIT প্রশিক্ষক</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)' }}>{instructors?.length || 0} জন</div>
          </div>
          <div className="standard-card" style={{ padding: '16px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>সক্রিয় শিক্ষার্থী</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{students?.length || 0} জন</div>
          </div>
        </div>

        {/* Division Overview & BAIT Activities */}
        <div className="details-card-box">
          <h2 className="details-card-title">
            <Building2 size={22} color="var(--primary)" />
            <span>বিভাগের পরিচিতি ও BAIT-এর কার্যক্রম</span>
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '16px' }}>
            {division.description} BAIT এই বিভাগের প্রতিটি জেলার প্রত্যন্ত অঞ্চলে তথ্যপ্রযুক্তি অবকাঠামো সম্প্রসারণ, তরুণদের আইসিটি দক্ষতা উন্নয়ন এবং তৃণমূল সাংবাদিকদের সমন্বয়ে তথ্য নেটওয়ার্ক প্রতিষ্ঠায় নিরবচ্ছিন্নভাবে কাজ করে চলেছে।
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', background: '#f8fafc', padding: '18px', borderRadius: '8px' }}>
            <div>
              <strong>প্রতিষ্ঠাকাল:</strong> {division.established_year} খ্রিস্টাব্দ
            </div>
            <div>
              <strong>আয়তন:</strong> {division.area_sq_km} বর্গ কিলোমিটার
            </div>
            <div>
              <strong>প্রধান কার্যালয়:</strong> {division.headquarters}
            </div>
          </div>
        </div>

        {/* Districts Section */}
        <div style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>
                {division.name_bn}-এর অধীনস্থ জেলাসমূহ ({districts?.length || 0}টি)
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                যে কোনো জেলার কার্ডে ক্লিক করে উপজেলার তালিকা ও স্থানীয় তথ্য দেখুন।
              </p>
            </div>
          </div>

          <div className="entity-grid">
            {districts?.map(dist => (
              <div key={dist.id} className="standard-card">
                <div className="standard-card-header">
                  <span className="badge-tag badge-blue">জেলা</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>উপজেলা: {dist.total_upazilas || 0} টি</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: '8px 0', color: 'var(--primary-dark)' }}>
                  {dist.name_bn} জেলা
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', flexGrow: 1 }}>
                  {dist.description?.substring(0, 85)}...
                </p>
                <Link to={`/jela/${dist.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Instructors, Students & Journalists Tabs / Grid */}
        {(instructors?.length > 0 || students?.length > 0 || journalists?.length > 0) && (
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
              {division.name_bn}-এর সংশ্লিষ্ট ব্যক্তিবর্গ
            </h2>

            {/* Instructors */}
            {instructors?.length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--primary)' }}>
                  প্রশিক্ষকবৃন্দ ({instructors.length} জন)
                </h3>
                <div className="entity-grid">
                  {instructors.map(inst => (
                    <div key={inst.id} className="person-card">
                      <div className="person-header">
                        <img src={inst.photo_url} alt={inst.name_bn} className="person-avatar" />
                        <div className="person-meta">
                          <div className="person-name">{inst.name_bn}</div>
                          <div className="person-role">{inst.designation}</div>
                        </div>
                      </div>
                      <div className="person-body">
                        {inst.bio?.substring(0, 90)}...
                      </div>
                      <div className="person-footer">
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{inst.courses_taught?.split(',')[0]}</span>
                        <Link to={`/instructor/${inst.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                          বিস্তারিত →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students */}
            {students?.length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--accent-emerald)' }}>
                  শিক্ষার্থীবৃন্দ ({students.length} জন)
                </h3>
                <div className="entity-grid">
                  {students.map(st => (
                    <div key={st.id} className="person-card">
                      <div className="person-header">
                        <img src={st.photo_url} alt={st.name_bn} className="person-avatar" />
                        <div className="person-meta">
                          <div className="person-name">{st.name_bn}</div>
                          <div className="person-role">{st.course_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{st.batch}</div>
                        </div>
                      </div>
                      <div className="person-body">
                        {st.achievements?.substring(0, 85)}...
                      </div>
                      <div className="person-footer">
                        <Link to={`/student/${st.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
                          প্রোফাইল দেখুন →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Journalists */}
            {journalists?.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--accent-gold)' }}>
                  সাংবাদিক প্রতিনিধি ({journalists.length} জন)
                </h3>
                <div className="entity-grid">
                  {journalists.map(jr => (
                    <div key={jr.id} className="person-card">
                      <div className="person-header">
                        <img src={jr.photo_url} alt={jr.name_bn} className="person-avatar" />
                        <div className="person-meta">
                          <div className="person-name">{jr.name_bn}</div>
                          <div className="person-role">{jr.designation}</div>
                        </div>
                      </div>
                      <div className="person-body">
                        {jr.workplace_media}
                      </div>
                      <div className="person-footer">
                        <Link to={`/journalist/${jr.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
                          প্রোফাইল দেখুন →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
