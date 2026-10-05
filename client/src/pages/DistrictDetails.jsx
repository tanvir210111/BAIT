import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map, Navigation, Users, BookOpen, Newspaper, ArrowRight, ChevronRight, Building2 } from 'lucide-react';

export default function DistrictDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/districts/${slug}`)
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
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>জেলার তথ্য লোড হচ্ছে...</div>;
  }

  if (!data || !data.district) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>জেলা পাওয়া যায়নি</h2>
        <Link to="/jela" className="btn btn-primary" style={{ marginTop: '20px' }}>জেলার তালিকায় ফিরুন</Link>
      </div>
    );
  }

  const { district, upazilas, instructors, students, journalists, courses } = data;

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
            <Link to={`/bibhag/${district.division_slug}`}>{district.division_name}</Link>
            <span>/</span>
            <span>{district.name_bn}</span>
          </div>
          <h1 className="page-banner-title">{district.name_bn} জেলা</h1>
          <p className="page-banner-subtitle">
            {district.description}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        {/* District Overview Card */}
        <div className="details-card-box">
          <h2 className="details-card-title">
            <Map size={22} color="var(--primary)" />
            <span>জেলার পরিচিতি ও প্রশাসনিক তথ্য</span>
          </h2>
          <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '18px' }}>
            {district.description} BAIT {district.name_bn} জেলার প্রতিটি উপজেলায় তথ্যপ্রযুক্তি ল্যাব, প্রশিক্ষণ কেন্দ্র এবং ক্যারিয়ার সহায়তা সেল পরিচালনা করে আসছে।
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
            <div>
              <strong>প্রশাসনিক বিভাগ:</strong>{' '}
              <Link to={`/bibhag/${district.division_slug}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {district.division_name}
              </Link>
            </div>
            <div>
              <strong>মোট উপজেলা:</strong> {upazilas?.length || 0} টি
            </div>
            <div>
              <strong>BAIT শিক্ষার্থী:</strong> {students?.length || 0} জন
            </div>
          </div>
        </div>

        {/* Upazilas List Section */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)' }}>
              {district.name_bn} জেলার অধীনস্থ উপজেলাসমূহ
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              উপজেলার ওপর ক্লিক করে ঐ উপজেলার প্রশিক্ষক, শিক্ষার্থী ও কোর্সের বিস্তারিত তথ্য দেখুন।
            </p>
          </div>

          <div className="entity-grid">
            {upazilas?.map(u => (
              <div key={u.id} className="standard-card">
                <div className="standard-card-header">
                  <span className="badge-tag badge-amber">উপজেলা</span>
                  {u.postal_code && (
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>পোস্ট কোড: {u.postal_code}</span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.3rem', margin: '8px 0', color: 'var(--primary-dark)' }}>
                  {u.name_bn} উপজেলা
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', flexGrow: 1 }}>
                  {u.description || `${district.name_bn} জেলার একটি অন্যতম গুরুত্বপূর্ণ প্রশাসনিক উপজেলা।`}
                </p>
                <Link to={`/upojela/${u.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                  <span>উপজেলার তথ্য দেখুন</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Courses in this District */}
        {courses?.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '18px' }}>
              {district.name_bn} জেলায় পরিচালিত কোর্সসমূহ
            </h2>
            <div className="entity-grid">
              {courses.map(c => (
                <div key={c.id} className="standard-card">
                  <span className="badge-tag badge-teal" style={{ width: 'fit-content', marginBottom: '8px' }}>{c.duration}</span>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{c.title_bn}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px', flexGrow: 1 }}>{c.description}</p>
                  <Link to={`/course/${c.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                    <span>কোর্সের বিবরণ দেখুন</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Associated Instructors, Students, Journalists */}
        {(instructors?.length > 0 || students?.length > 0 || journalists?.length > 0) && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '20px' }}>
              {district.name_bn} জেলার ব্যক্তিবর্গ
            </h2>

            {instructors?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '12px' }}>
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
                      <div className="person-footer">
                        <Link to={`/instructor/${inst.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
                          প্রোফাইল দেখুন →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {students?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-emerald)', marginBottom: '12px' }}>
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
                        </div>
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

            {journalists?.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '12px' }}>
                  সাংবাদিক প্রতিনিধি ({journalists.length} জন)
                </h3>
                <div className="entity-grid">
                  {journalists.map(j => (
                    <div key={j.id} className="person-card">
                      <div className="person-header">
                        <img src={j.photo_url} alt={j.name_bn} className="person-avatar" />
                        <div className="person-meta">
                          <div className="person-name">{j.name_bn}</div>
                          <div className="person-role">{j.designation}</div>
                        </div>
                      </div>
                      <div className="person-footer">
                        <Link to={`/journalist/${j.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
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

        {(!instructors?.length && !students?.length && !journalists?.length && !courses?.length) && (
          <div style={{ marginTop: '50px', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '36px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'inline-flex', padding: '14px', background: '#ecfdf5', borderRadius: '50%', color: 'var(--primary)', marginBottom: '14px' }}>
              <Building2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>
              {district.name_bn} জেলা প্রযুক্তি ও ক্যারিয়ার সেল
            </h3>
            <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '680px', margin: '0 auto 20px', lineHeight: '1.7' }}>
              {district.name_bn} জেলার সকল উপজেলার শিক্ষার্থীদের আধুনিক তথ্যপ্রযুক্তি প্রশিক্ষণ, ফ্রিল্যান্সিং ক্যারিয়ার গাইডলাইন ও অনলাইন স্কলারশিপের আওতায় নিয়ে আসা হচ্ছে। বিভাগীয় ও জাতীয় পর্যায়ের শীর্ষ প্রশিক্ষকদের ক্লাসে যুক্ত হতে আজই নিবন্ধন করুন।
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/course" className="btn btn-primary">
                <span>সকল কোর্স দেখুন</span>
              </Link>
              <Link to="/jogajog" className="btn btn-secondary">
                <span>জেলা প্রতিনিধির সহায়তা নিন</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
