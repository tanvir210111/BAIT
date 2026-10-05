import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Award, BookOpen, Calendar, ArrowLeft, CheckCircle2, Newspaper, Building2 
} from 'lucide-react';
import { peopleAPI } from '../services/api';

export default function PersonProfile({ category }) {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Category in API is 'employee', 'instructor', 'student', 'journalist'
  const apiCategory = category || 'instructor';

  useEffect(() => {
    setLoading(true);
    peopleAPI.getProfile(apiCategory, slug)
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [apiCategory, slug]);

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>প্রোফাইল লোড হচ্ছে...</div>;
  }

  if (!data || !data.person) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>প্রোফাইল তথ্য পাওয়া যায়নি</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>হোমে ফিরে যান</Link>
      </div>
    );
  }

  const { person, courses } = data;

  const categoryTitle = 
    person.category === 'instructor' ? 'প্রশিক্ষক প্রোফাইল' :
    person.category === 'student' ? 'শিক্ষার্থী প্রোফাইল' :
    person.category === 'journalist' ? 'সাংবাদিক প্রোফাইল' : 'সদর দপ্তর কর্মকর্তা প্রোফাইল';

  const backLink = 
    person.category === 'instructor' ? '/instructor' :
    person.category === 'student' ? '/student' :
    person.category === 'journalist' ? '/journalist' : '/';

  return (
    <div>
      {/* Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">হোম</Link>
            <span>/</span>
            <Link to={backLink}>{categoryTitle}</Link>
            <span>/</span>
            <span>{person.name_bn}</span>
          </div>
          <h1 className="page-banner-title">{person.name_bn}</h1>
          <p className="page-banner-subtitle">
            {person.designation} {person.upazila_name ? `• ${person.upazila_name}, ${person.district_name}` : ''}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="profile-view-wrap">
          {/* Left Column: Avatar & Contact Card */}
          <div className="profile-sidebar">
            <img 
              src={person.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
              alt={person.name_bn} 
              className="profile-large-avatar" 
            />
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>
              {person.name_bn}
            </h2>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.92rem', marginBottom: '14px' }}>
              {person.designation}
            </div>

            {/* Area Badges */}
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'left', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                প্রশাসনিক অবস্থান:
              </div>
              {person.division_name && (
                <div style={{ fontSize: '0.88rem', marginBottom: '4px' }}>
                  <strong>বিভাগ:</strong> <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{person.division_name}</span>
                </div>
              )}
              {person.district_name && (
                <div style={{ fontSize: '0.88rem', marginBottom: '4px' }}>
                  <strong>জেলা:</strong> <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{person.district_name}</span>
                </div>
              )}
              {person.upazila_name && (
                <div style={{ fontSize: '0.88rem' }}>
                  <strong>উপজেলা:</strong> <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{person.upazila_name}</span>
                </div>
              )}
            </div>

            {/* Contact details */}
            <div style={{ textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {person.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Phone size={16} color="var(--primary)" />
                  <span>{person.phone}</span>
                </div>
              )}
              {person.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Mail size={16} color="var(--primary)" />
                  <span>{person.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Biography & Academic Info */}
          <div>
            {/* Biography */}
            <div className="details-card-box">
              <h3 className="details-card-title">
                <User size={20} color="var(--primary)" />
                <span>সংক্ষিপ্ত পরিচিতি ও সারসংক্ষেপ</span>
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                {person.bio || 'কোনো পরিচিতি তথ্য উল্লেখ নেই।'}
              </p>
            </div>

            {/* Specific Category Blocks */}

            {/* 1. Instructor details */}
            {person.category === 'instructor' && (
              <div className="details-card-box">
                <h3 className="details-card-title">
                  <BookOpen size={20} color="var(--primary)" />
                  <span>প্রশিক্ষণের বিষয় ও কোর্সের বিবরণ</span>
                </h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <td>পরিচালিত বিষয় / কোর্স:</td>
                      <td><strong>{person.courses_taught || 'আইসিটি ও আধুনিক প্রযুক্তি'}</strong></td>
                    </tr>
                    <tr>
                      <td>শিক্ষাগত যোগ্যতা:</td>
                      <td>{person.education || 'সংশ্লিষ্ট বিষয়ে স্নাতক/স্নাতকোত্তর'}</td>
                    </tr>
                    <tr>
                      <td>কাজের অভিজ্ঞতা:</td>
                      <td>{person.experience || '৮+ বছরের অভিজ্ঞতা'}</td>
                    </tr>
                    <tr>
                      <td>দক্ষতার ক্ষেত্রসমূহ:</td>
                      <td>{person.expertise}</td>
                    </tr>
                    <tr>
                      <td>কার্য এলাকা:</td>
                      <td>{person.upazila_name} উপজেলা, {person.district_name} জেলা, {person.division_name} বিভাগ</td>
                    </tr>
                  </tbody>
                </table>

                {courses?.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>
                      সরাসরি পরিচালিত কোর্সসমূহ:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {courses.map(c => (
                        <Link 
                          key={c.id} 
                          to={`/course/${c.slug}`}
                          style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--border)' }}
                        >
                          <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{c.title_bn}</span>
                          <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>কোর্সের বিবরণ দেখুন →</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Student details */}
            {person.category === 'student' && (
              <div className="details-card-box">
                <h3 className="details-card-title">
                  <GraduationCap size={20} color="var(--primary)" />
                  <span>অধ্যয়ন ও কোর্স তথ্য</span>
                </h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <td>কোর্সের নাম:</td>
                      <td><strong>{person.course_name}</strong></td>
                    </tr>
                    <tr>
                      <td>ব্যাচ নম্বর:</td>
                      <td>{person.batch || 'ব্যাচ-০১ (২০২৬)'}</td>
                    </tr>
                    <tr>
                      <td>শিক্ষাগত যোগ্যতা:</td>
                      <td>{person.education}</td>
                    </tr>
                    <tr>
                      <td>অর্জন ও কৃতিত্ব:</td>
                      <td>
                        <span style={{ color: '#047857', fontWeight: 600 }}>
                          {person.achievements || 'কোর্স সফলভাবে চলমান'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>এলাকা:</td>
                      <td>{person.upazila_name} উপজেলা, {person.district_name} জেলা, {person.division_name} বিভাগ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. Journalist details */}
            {person.category === 'journalist' && (
              <div className="details-card-box">
                <h3 className="details-card-title">
                  <Newspaper size={20} color="var(--primary)" />
                  <span>সাংবাদিকতা ও প্রকাশনা</span>
                </h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <td>কর্মক্ষেত্র ও গণমাধ্যম:</td>
                      <td><strong>{person.workplace_media}</strong></td>
                    </tr>
                    <tr>
                      <td>সাংবাদিকতার অভিজ্ঞতা:</td>
                      <td>{person.experience || '৫+ বছর'}</td>
                    </tr>
                    <tr>
                      <td>বিশেষায়িত ক্ষেত্র:</td>
                      <td>{person.expertise || 'তৃণমূল রিপোর্টিং ও শিক্ষা'}</td>
                    </tr>
                    <tr>
                      <td>প্রকাশিত সংবাদ ও প্রতিবেদন:</td>
                      <td>{person.published_works || 'বিভিন্ন জাতীয় ও আঞ্চলিক সংবাদ মাধ্যমে প্রকাশিত প্রতিবেদন।'}</td>
                    </tr>
                    <tr>
                      <td>দায়িত্বপ্রাপ্ত এলাকা:</td>
                      <td>{person.upazila_name} উপজেলা, {person.district_name} জেলা, {person.division_name} বিভাগ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 4. HQ Employee details */}
            {person.category === 'employee' && (
              <div className="details-card-box">
                <h3 className="details-card-title">
                  <Building2 size={20} color="var(--primary)" />
                  <span>সদর দপ্তর প্রশাসনিক দায়িত্ব</span>
                </h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <td>শাখা / বিভাগ:</td>
                      <td><strong>{person.department}</strong></td>
                    </tr>
                    <tr>
                      <td>BAIT-এ প্রধান দায়িত্ব:</td>
                      <td>{person.responsibilities}</td>
                    </tr>
                    <tr>
                      <td>শিক্ষাগত পটভূমি:</td>
                      <td>{person.education}</td>
                    </tr>
                    <tr>
                      <td>পেশাগত অভিজ্ঞতা:</td>
                      <td>{person.experience}</td>
                    </tr>
                    <tr>
                      <td>বিশেষ দক্ষতা:</td>
                      <td>{person.expertise}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
