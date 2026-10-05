import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation, MapPin, BookOpen, Users, Newspaper, ArrowRight, UserCheck, Award } from 'lucide-react';

export default function UpazilaDetails() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/upazilas/${slug}`)
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
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>উপজেলার তথ্য লোড হচ্ছে...</div>;
  }

  if (!data || !data.upazila) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>উপজেলা পাওয়া যায়নি</h2>
        <Link to="/upojela" className="btn btn-primary" style={{ marginTop: '20px' }}>উপজেলার তালিকায় ফিরুন</Link>
      </div>
    );
  }

  const { upazila, instructors, students, journalists, courses } = data;

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
            <Link to={`/bibhag/${upazila.division_slug}`}>{upazila.division_name}</Link>
            <span>/</span>
            <Link to={`/jela/${upazila.district_slug}`}>{upazila.district_name}</Link>
            <span>/</span>
            <span>{upazila.name_bn}</span>
          </div>
          <h1 className="page-banner-title">{upazila.name_bn} উপজেলা</h1>
          <p className="page-banner-subtitle">
            {upazila.district_name} জেলা • {upazila.division_name} বিভাগ
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '70px' }}>
        {/* উপজেলা পরিচিতি */}
        <div className="details-card-box">
          <h2 className="details-card-title">
            <Navigation size={22} color="var(--primary)" />
            <span>উপজেলা পরিচিতি</span>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '18px' }}>
            {upazila.description || `${upazila.name_bn} উপজেলা ${upazila.district_name} জেলার অধীনে অবস্থিত একটি সমৃদ্ধ জনপদ।`}
          </p>
          <table className="info-table">
            <tbody>
              <tr>
                <td>উপজেলার নাম:</td>
                <td><strong>{upazila.name_bn}</strong></td>
              </tr>
              <tr>
                <td>জেলা:</td>
                <td>
                  <Link to={`/jela/${upazila.district_slug}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    {upazila.district_name} জেলা
                  </Link>
                </td>
              </tr>
              <tr>
                <td>বিভাগ:</td>
                <td>
                  <Link to={`/bibhag/${upazila.division_slug}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                    {upazila.division_name} বিভাগ
                  </Link>
                </td>
              </tr>
              {upazila.postal_code && (
                <tr>
                  <td>ডাকঘর ও পোস্ট কোড:</td>
                  <td>{upazila.postal_code}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* কোর্স ও প্রশিক্ষক (Course & Instructors Section) */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            কোর্স ও প্রশিক্ষক
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
            {upazila.name_bn} উপজেলায় প্রশিক্ষণ প্রদানকারী অভিজ্ঞ প্রশিক্ষকমণ্ডলী ও পরিচালিত কোর্সসমূহ।
          </p>

          {instructors?.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid var(--border)', padding: '28px', borderRadius: '12px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: '#ecfdf5', borderRadius: '50%', color: 'var(--primary)', marginBottom: '12px' }}>
                <Navigation size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
                {upazila.name_bn} উপজেলায় BAIT ডিজিটাল সেবা সেল
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 18px', lineHeight: '1.7' }}>
                {upazila.name_bn} উপজেলার শিক্ষার্থীদের জন্য {upazila.district_name} জেলা কেন্দ্রের আওতায় নিয়মিত অনলাইন ও অন-ক্যাম্পাস প্রশিক্ষণ পরিচালিত হচ্ছে। নতুন ব্যাচে ভর্তির জন্য জেলা সমন্বয়কের সাথে যোগাযোগ করুন।
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to={`/jela/${upazila.district_slug}`} className="btn btn-secondary">
                  <span>{upazila.district_name} জেলার তথ্য দেখুন</span>
                </Link>
                <Link to="/jogajog" className="btn btn-primary">
                  <span>ভর্তি সহায়তার জন্য যোগাযোগ</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="entity-grid">
              {instructors.map(inst => (
                <div key={inst.id} className="person-card">
                  <div className="person-header">
                    <img src={inst.photo_url} alt={inst.name_bn} className="person-avatar" style={{ width: '70px', height: '70px' }} />
                    <div className="person-meta">
                      <div className="person-name">{inst.name_bn}</div>
                      <div className="person-role">{inst.designation}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent)', marginTop: '2px', fontWeight: 600 }}>
                        {inst.courses_taught || 'তথ্যপ্রযুক্তি প্রশিক্ষণ'}
                      </div>
                    </div>
                  </div>
                  <div className="person-body">
                    <p style={{ marginBottom: '8px' }}>{inst.bio}</p>
                    {inst.education && (
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                        <strong>শিক্ষাগত যোগ্যতা:</strong> {inst.education}
                      </div>
                    )}
                  </div>
                  <div className="person-footer">
                    <Link to={`/instructor/${inst.slug}`} className="card-btn" style={{ width: '100%' }}>
                      <span>বিস্তারিত দেখুন</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* এই উপজেলার কোর্সসমূহ */}
        {courses?.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
              {upazila.name_bn} উপজেলায় চলমান কোর্স
            </h3>
            <div className="entity-grid">
              {courses.map(c => (
                <div key={c.id} className="standard-card">
                  <span className="badge-tag badge-teal" style={{ width: 'fit-content', marginBottom: '8px' }}>{c.duration}</span>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{c.title_bn}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px', flexGrow: 1 }}>{c.description}</p>
                  <Link to={`/course/${c.slug}`} className="card-btn" style={{ marginTop: 'auto' }}>
                    <span>কোর্সের বিস্তারিত দেখুন</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* শিক্ষার্থী সেকশন (Students Section) */}
        {students?.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
              {upazila.name_bn} উপজেলার শিক্ষার্থী
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
              BAIT-এর প্রশিক্ষণ কার্যক্রমে অংশ নেওয়া সফল ও অধ্যয়নরত শিক্ষার্থীবৃন্দ।
            </p>

            <div className="entity-grid">
              {students.map(st => (
                <div key={st.id} className="person-card">
                  <div className="person-header">
                    <img src={st.photo_url} alt={st.name_bn} className="person-avatar" />
                    <div className="person-meta">
                      <div className="person-name">{st.name_bn}</div>
                      <div className="person-role">{st.course_name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{st.batch}</div>
                    </div>
                  </div>
                  <div className="person-body">
                    <div style={{ fontSize: '0.85rem', marginBottom: '6px' }}>
                      <strong>অর্জন:</strong> {st.achievements || 'কোর্স চলমান'}
                    </div>
                  </div>
                  <div className="person-footer">
                    <Link to={`/student/${st.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
                      বিস্তারিত প্রোফাইল দেখুন →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* সাংবাদিক সেকশন (Journalists Section) */}
        {journalists?.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
              {upazila.name_bn} উপজেলার সাংবাদিক প্রতিনিধি
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
              মাঠপর্যায় থেকে তথ্য সংগ্রহ ও জনসচেতনতায় কর্মরত BAIT সাংবাদিক ফোরামের প্রতিনিধি।
            </p>

            <div className="entity-grid">
              {journalists.map(jr => (
                <div key={jr.id} className="person-card">
                  <div className="person-header">
                    <img src={jr.photo_url} alt={jr.name_bn} className="person-avatar" />
                    <div className="person-meta">
                      <div className="person-name">{jr.name_bn}</div>
                      <div className="person-role">{jr.designation}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{jr.workplace_media}</div>
                    </div>
                  </div>
                  <div className="person-body">
                    <p style={{ fontSize: '0.88rem' }}>{jr.bio}</p>
                  </div>
                  <div className="person-footer">
                    <Link to={`/journalist/${jr.slug}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginLeft: 'auto' }}>
                      বিস্তারিত প্রোফাইল দেখুন →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
