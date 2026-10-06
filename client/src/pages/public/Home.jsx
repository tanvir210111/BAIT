import React, { useState, useEffect } from 'react';
import { coursesAPI, peopleAPI } from '../../services/api';
import HeroSection from '../../components/home/HeroSection';
import AboutSection from '../../components/home/AboutSection';
import CourseSection from '../../components/home/CourseSection';
import ServicesSection from '../../components/home/ServicesSection';
import HeadquartersSection from '../../components/home/HeadquartersSection';
import FAQSection from '../../components/home/FAQSection';

export default function Home({ onOpenSearch }) {
  const [courses, setCourses] = useState([]);
  const [hqEmployees, setHqEmployees] = useState([]);

  useEffect(() => {
    // 1. Fetch courses
    coursesAPI.getAll()
      .then(data => {
        if (Array.isArray(data)) setCourses(data);
      })
      .catch(err => console.error(err));

    // 2. Fetch HQ employees
    peopleAPI.getByCategory('employee')
      .then(data => {
        if (Array.isArray(data)) setHqEmployees(data.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* 1. Course Slider (প্রথমে কোর্সের স্লাইডার) */}
      <HeroSection courses={courses} />

      {/* 2. Heading & Stats (তারপর হেডিং) */}
      <AboutSection />

      {/* 3. Course Section (তারপর কোর্স - Glassmorphism Style) */}
      <CourseSection courses={courses} />

      {/* 4. Software & IT Services (তারপর সফটওয়্যার সার্ভিস - Glassmorphism Style) */}
      <ServicesSection />

      {/* 5. Headquarters Administration (তারপর হেডকোয়ার্টার) */}
      <HeadquartersSection employees={hqEmployees} />

      {/* 6. FAQ Section (সচরাচর জিজ্ঞাসিত প্রশ্নাবলী) */}
      <FAQSection />
    </div>
  );
}
