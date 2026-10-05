/**
 * BAIT Frontend Mock Data
 * Used as fallback data when the backend is not running or under development.
 */

export const mockCourses = [
  {
    id: 1,
    title_bn: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    slug: 'full-stack-web-development-mern',
    duration: '৬ মাস',
    level: 'বিগিনার হতে অ্যাডভান্সড',
    description: 'এইচটিএমএল, সিএসএস, আধুনিক জাভাস্ক্রিপ্ট, রিঅ্যাক্ট এবং নোডজেএস শিখে প্রফেশনাল ফুল-স্ট্যাক ডেভেলপার হয়ে ক্যারিয়ার শুরু করুন।',
    batch_info: 'নতুন ব্যাচ শুরু: ১৫ই নভেম্বর',
    price: 12000,
    discount_price: 6500,
    lessons_count: 72,
    projects_count: 10,
    curriculum: [
      { title: 'মডিউল ১: ওয়েব ফান্ডামেন্টালস ও আধুনিক জাভাস্ক্রিপ্ট (ES6+)' },
      { title: 'মডিউল ২: রিঅ্যাক্ট ও আধুনিক স্টেট ম্যানেজমেন্ট' },
      { title: 'মডিউল ৩: নোডজেএস, এক্সপ্রেস ও ডেটাবেজ আর্কিটেকচার' },
      { title: 'মডিউল ৪: লাইভ ক্লাউড ডেপ্লয়মেন্ট ও ক্যাপস্টোন প্রজেক্ট' }
    ]
  },
  {
    id: 2,
    title_bn: 'প্রফেশনাল গ্রাফিক ও ইউআই/ইউএক্স ডিজাইন',
    slug: 'professional-graphic-ui-ux-design',
    duration: '৪ মাস',
    level: 'সকলের জন্য',
    description: 'ফিগমা, ফটোশপ ও ইলাস্ট্রেটর ব্যবহার করে আধুনিক ডিজিটাল প্রোডাক্ট, মোবাইল অ্যাপ এবং ওয়েবসাইট ইউজার ইন্টারফেস ডিজাইন শিখুন।',
    batch_info: 'নতুন ব্যাচ শুরু: ২০শে নভেম্বর',
    price: 10000,
    discount_price: 5500,
    lessons_count: 48,
    projects_count: 8,
    curriculum: [
      { title: 'মডিউল ১: ডিজাইন প্রিন্সিপালস ও টাইপোগ্রাফি' },
      { title: 'মডিউল ২: অ্যাডোবি ইলাস্ট্রেটর ও ফটোশপ মাস্টারি' },
      { title: 'মডিউল ৩: ফিগমা ইউআই কম্পোনেন্ট ও প্রোটোটাইপিং' },
      { title: 'মডিউল ৪: বিহ্যান্স ও ড্রিবল পোর্টফোলিও মেকিং' }
    ]
  },
  {
    id: 3,
    title_bn: 'পাইথন, ডেটা অ্যানালিটিক্স ও মেশিন লার্নিং',
    slug: 'python-data-analytics-machine-learning',
    duration: '৬ মাস',
    level: 'ইন্টারমিডিয়েট',
    description: 'পাইথন প্রোগ্রামিং, নামপাই, পান্ডাস, পাওয়ার বিআই এবং সাইকিট-লার্ন দিয়ে ডেটা অ্যানালাইসিস এবং প্রেডিক্টিভ মডেলিং শিখুন।',
    batch_info: 'নতুন ব্যাচ শুরু: ২৫শে নভেম্বর',
    price: 14000,
    discount_price: 7500,
    lessons_count: 64,
    projects_count: 6,
    curriculum: [
      { title: 'মডিউল ১: পাইথন ফান্ডামেন্টালস ও ওওপি (OOP)' },
      { title: 'মডিউল ২: ডেটা ক্লিনিং ও অ্যানালাইসিস (Pandas, NumPy)' },
      { title: 'মডিউল ৩: ডেটা ভিজ্যুয়ালাইজেশন (Power BI, Seaborn)' },
      { title: 'মডিউল ৪: মেশিন লার্নিং বেসিকস ও রিয়েল-ওয়ার্ল্ড প্রজেক্ট' }
    ]
  },
  {
    id: 4,
    title_bn: 'মোবাইল অ্যাপ ডেভেলপমেন্ট (ফ্লাটার ও ডার্ট)',
    slug: 'mobile-app-development-flutter-dart',
    duration: '৫ মাস',
    level: 'বিগিনার ফ্রেন্ডলি',
    description: 'একই সাথে অ্যান্ড্রয়েড এবং আইওএস প্ল্যাটফর্মের জন্য আধুনিক, স্কেলেবল এবং হাই-পারফরম্যান্স মোবাইল অ্যাপ্লিকেশন তৈরি শিখুন।',
    batch_info: 'নতুন ব্যাচ শুরু: ১লা ডিসেম্বর',
    price: 13000,
    discount_price: 7000,
    lessons_count: 56,
    projects_count: 7,
    curriculum: [
      { title: 'মডিউল ১: ডার্ট প্রোগ্রামিং ফান্ডামেন্টালস' },
      { title: 'মডিউল ২: ফ্লাটার উইজেটস ও রেসপনসিভ লেআউট' },
      { title: 'মডিউল ৩: স্টেট ম্যানেজমেন্ট (Provider / Bloc)' },
      { title: 'মডিউল ৪: ফায়ারবেস ব্যাকএন্ড ও গুগল প্লে-স্টোর পাবলিশিং' }
    ]
  }
];

export const mockEmployees = [
  {
    id: 1,
    name_bn: 'শারমিন সুলতানা',
    slug: 'sharmin-sultana',
    designation: 'সিনিয়র জনসংযোগ ও মিডিয়া কর্মকর্তা',
    department: 'জনসংযোগ ও যোগাযোগ শাখা',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    bio: 'বাংলাদেশের ৬৪ জেলার মাঠপর্যায়ের সাংবাদিক ও প্রতিনিধিদের সাথে সার্বক্ষণিক যোগাযোগ ও মিডিয়া সমন্বয়।'
  },
  {
    id: 2,
    name_bn: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    slug: 'engr-tanvir-ahmed',
    designation: 'প্রধান প্রযুক্তি কর্মকর্তা (CTO)',
    department: 'আইসিটি ও প্রযুক্তি বিভাগ',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    bio: 'জাতীয় ডিজিটাল প্ল্যাটফর্ম এবং ক্লাউড আর্কিটেকচার বিশেষজ্ঞ। BAIT-এর সমগ্র আইটি অবকাঠামো পরিচালনা করছেন।'
  },
  {
    id: 3,
    name_bn: 'ড. ফারহানা জামান',
    slug: 'dr-farhana-zaman',
    designation: 'পরিচালক, শিক্ষা ও কারিকুলাম',
    department: 'শিক্ষা ও গবেষণা বিভাগ',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    bio: 'আধুনিক কারিগরি শিক্ষা ও তৃণমূল পর্যায়ে দক্ষতা উন্নয়ন কারিকুলাম প্রণয়নে বিশেষজ্ঞ গবেষক।'
  },
  {
    id: 4,
    name_bn: 'অধ্যাপক মোঃ জহিরুল হক',
    slug: 'prof-zahirul-haque',
    designation: 'নির্বাহী পরিচালক (Executive Director)',
    department: 'নির্বাহী পরিচালনা ও নীতি নির্ধারণ',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    bio: 'বিগত ২৫ বছর ধরে তথ্যপ্রযুক্তি শিক্ষা ও প্রশাসনিক নেতৃত্বে যুক্ত আছেন। BAIT-এর দূরদর্শী রূপরেখা প্রণয়নে অগ্রণী ভূমিকা পালন করছেন।'
  }
];
