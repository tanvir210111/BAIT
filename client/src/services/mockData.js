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
    instructor_name: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    instructor_slug: 'engr-tanvir-ahmed',
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
    instructor_name: 'শারমিন সুলতানা',
    instructor_slug: 'sharmin-sultana',
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
    instructor_name: 'ড. ফারহানা জামান',
    instructor_slug: 'dr-farhana-zaman',
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
    instructor_name: 'অধ্যাপক মোঃ জহিরুল হক',
    instructor_slug: 'prof-zahirul-haque',
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
    bio: 'বাংলাদেশের ৬৪ জেলার মাঠপর্যায়ের প্রশিক্ষণ সমন্বয় ও গণযোগাযোগ রক্ষা করে চলেছেন।'
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

// Student Panel Mock Data
export const mockStudentProfile = {
  id: 1,
  name_bn: 'তানভীর হোসেন',
  name_en: 'Tanvir Hossain',
  email: 'tanvir.kapasia@gmail.com',
  phone: '01711006214',
  category: 'student',
  student_id: 'BAIT-2026-ST001',
  enrollment_date: '2026-01-15',
  batch: 'ব্যাচ-০১ (MERN Full Stack)',
  course_name: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
  photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  division_name: 'ঢাকা',
  district_name: 'গাজীপুর',
  upazila_name: 'কাপাসিয়া',
  blood_group: 'B+',
  guardian_phone: '01712000000',
  bio: 'উদ্যমী তরুণ সফটওয়্যার শিক্ষার্থী। আধুনিক ওয়েব প্রযুক্তি শিখে আন্তর্জাতিক বাজারে ক্যারিয়ার গড়তে প্রতিশ্রুতিবদ্ধ।'
};

export const mockEnrolledCourses = [
  {
    id: 1,
    title: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    batch: 'ব্যাচ-০১',
    instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    progress: 68,
    totalLessons: 72,
    completedLessons: 49,
    nextClass: 'আজ রাত ৯:০০ টায়',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    status: 'চলমান',
    currentTopic: 'Express.js REST API & JWT Authentication'
  },
  {
    id: 2,
    title: 'প্রফেশনাল গ্রাফিক ও ইউআই/ইউএক্স ডিজাইন',
    batch: 'ব্যাচ-০৩',
    instructor: 'শারমিন সুলতানা',
    progress: 100,
    totalLessons: 48,
    completedLessons: 48,
    nextClass: 'কোর্স সম্পন্ন হয়েছে',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    status: 'সমাপ্ত',
    currentTopic: 'ক্যাপস্টোন পোর্টফোলিও রিভিউ'
  }
];

export const mockLiveClasses = [
  {
    id: 101,
    courseTitle: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    topic: 'Module 14: Redux Toolkit & RTK Query Architecture',
    instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    date: 'আজ (মঙ্গলবার)',
    time: 'রাত ৯:০০ - ১১:০০',
    platform: 'Zoom Live',
    status: 'upcoming',
    joinUrl: 'https://zoom.us/j/bait-live-mern'
  },
  {
    id: 102,
    courseTitle: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    topic: 'Module 13: Advanced React Hooks & Context API Live Practice',
    instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    date: 'রবিবার, ০৪ অক্টোবর ২০২৬',
    time: 'রাত ৯:০০ - ১১:০০',
    platform: 'Zoom Live',
    status: 'completed',
    recordingUrl: 'https://bait.academy/recordings/mern-class-13'
  },
  {
    id: 103,
    courseTitle: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    topic: 'Module 12: React Router v7 & State Management Basics',
    instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    date: 'বৃহস্পতিবার, ০১ অক্টোবর ২০২৬',
    time: 'রাত ৯:০০ - ১১:০০',
    platform: 'Zoom Live',
    status: 'completed',
    recordingUrl: 'https://bait.academy/recordings/mern-class-12'
  }
];

export const mockClassRoutine = [
  { day: 'রবিবার', time: 'রাত ০৯:০০ - ১১:০০', course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট', instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ', room: 'Zoom Room A' },
  { day: 'মঙ্গলবার', time: 'রাত ০৯:০০ - ১১:০০', course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট', instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ', room: 'Zoom Room A' },
  { day: 'বৃহস্পতিবার', time: 'রাত ০৯:০০ - ১১:০০', course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট', instructor: 'ইঞ্জিনিয়ার তানভীর আহমেদ', room: 'Zoom Room A' },
  { day: 'শুক্রবার', time: 'বিকাল ০৪:০০ - ০৬:০০', course: 'লাইভ প্রবলেম সলভিং ও কোড রিভিউ', instructor: 'সাপোর্ট টিম', room: 'Discord Voice & Video' }
];

export const mockAssignments = [
  {
    id: 1,
    title: 'Assignment 08: E-commerce Product Filtering & Cart with React',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট',
    deadline: '১০ অক্টোবর ২০২৬',
    totalMarks: 50,
    obtainedMarks: 48,
    status: 'graded',
    submissionDate: '০৬ অক্টোবর ২০২৬',
    feedback: 'অসাধারণ কোড স্ট্রাকচার! কম্পোনেন্টগুলো খুব পরিচ্ছন্নভাবে ভাগ করা হয়েছে।'
  },
  {
    id: 2,
    title: 'Assignment 09: Node.js Express Auth API with JWT & MongoDB',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট',
    deadline: '১৫ অক্টোবর ২০২৬',
    totalMarks: 60,
    obtainedMarks: null,
    status: 'pending',
    submissionDate: null,
    feedback: null
  },
  {
    id: 3,
    title: 'Assignment 07: Responsive Dashboard Layout with Vanilla CSS',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট',
    deadline: '২৮ সেপ্টেম্বর ২০২৬',
    totalMarks: 50,
    obtainedMarks: 50,
    status: 'graded',
    submissionDate: '২৭ সেপ্টেম্বর ২০২৬',
    feedback: 'পারফেক্ট রেসপনসিভনেস ও কালার হারমোনি।'
  }
];

export const mockExams = [
  {
    id: 1,
    title: 'Mid-term Quiz: React Fundamentals & Hooks',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট',
    date: '১২ অক্টোবর ২০২৬',
    duration: '৪৫ মিনিট',
    totalMarks: 50,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Quiz 01: Modern JavaScript (ES6+)',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট',
    date: '১৫ সেপ্টেম্বর ২০২৬',
    duration: '৩০ মিনিট',
    totalMarks: 30,
    obtainedMarks: 28,
    status: 'completed'
  }
];

export const mockResults = [
  {
    id: 1,
    title: 'Quiz 01: Modern JavaScript (ES6+)',
    examDate: '১৫ সেপ্টেম্বর ২০২৬',
    totalMarks: 30,
    obtainedMarks: 28,
    percentage: '৯৩.৩%',
    grade: 'A+',
    remarks: 'চমৎকার পারফরম্যান্স'
  },
  {
    id: 2,
    title: 'Assignment 08: E-commerce Cart',
    examDate: '০৬ অক্টোবর ২০২৬',
    totalMarks: 50,
    obtainedMarks: 48,
    percentage: '৯৬%',
    grade: 'A+',
    remarks: 'কোড কোয়ালিটি চমৎকার'
  },
  {
    id: 3,
    title: 'Assignment 07: Responsive Dashboard',
    examDate: '২৭ সেপ্টেম্বর ২০২৬',
    totalMarks: 50,
    obtainedMarks: 50,
    percentage: '১০০%',
    grade: 'A+',
    remarks: 'শতভাগ নির্ভুল'
  }
];

export const mockCertificates = [
  {
    id: 'BAIT-CERT-2026-902',
    courseName: 'প্রফেশনাল গ্রাফিক ও ইউআই/ইউএক্স ডিজাইন',
    issueDate: '৩০ সেপ্টেম্বর ২০২৬',
    grade: 'A+',
    credentialUrl: 'https://bait.academy/verify/BAIT-CERT-2026-902',
    instructor: 'শারমিন সুলতানা',
    status: 'Verified'
  }
];

export const mockPayments = [
  {
    id: 'TRX-948102',
    date: '১৫ জানুয়ারি ২০২৬',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    amount: 3500,
    method: 'bKash (01711***214)',
    status: 'পরিশোধিত',
    type: '১ম কিস্তি'
  },
  {
    id: 'TRX-948199',
    date: '২০ ফেব্রুয়ারি ২০২৬',
    course: 'ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (MERN)',
    amount: 3000,
    method: 'Nagad (01711***214)',
    status: 'পরিশোধিত',
    type: '২য় কিস্তি'
  }
];

export const mockNotifications = [
  {
    id: 1,
    title: 'আজকের লাইভ ক্লাস শুরু রাত ৯:০০ টায়',
    desc: 'Module 14: Redux Toolkit & RTK Query ক্লাসে যথাসময়ে যুক্ত হতে নির্দেশ দেওয়া হলো।',
    time: '২ ঘণ্টা আগে',
    unread: true,
    type: 'class'
  },
  {
    id: 2,
    title: 'Assignment 08 এর ফলাফল প্রকাশিত হয়েছে',
    desc: 'আপনার প্রাপ্ত নম্বর: ৪৮/৫০। ফিডব্যাক চেক করতে Results ট্যাবে প্রবেশ করুন।',
    time: '১ দিন আগে',
    unread: true,
    type: 'assignment'
  },
  {
    id: 3,
    title: 'আসন্ন কুইজ পরীক্ষার সময়সূচি',
    desc: '১২ই অক্টোবর ২০২৬ রাত ৮:৩০ টায় React Fundamentals এর ওপর অনলাইন কুইজ অনুষ্ঠিত হবে।',
    time: '৩ দিন আগে',
    unread: false,
    type: 'exam'
  }
];

export const mockSupportTickets = [
  {
    id: 'TICK-402',
    subject: 'Redux Toolkit useSelector টাইপ ইস্যু সমাধান',
    category: 'কারিগরি ও কোডিং সহায়তা',
    status: 'সমাধানকৃত',
    date: '০৪ অক্টোবর ২০২৬',
    lastReply: 'সাপোর্ট ইন্সট্রাক্টর Google Meet-এ সমাধান করে দিয়েছেন।'
  },
  {
    id: 'TICK-409',
    subject: 'কোর্স সার্টিফিকেট ডাউনলোড সংক্রান্ত জিজ্ঞাসা',
    category: 'সার্টিফিকেট ও প্রশাসনিক',
    status: 'চলমান',
    date: '০৬ অক্টোবর ২০২৬',
    lastReply: 'আপনার আবেদনটি যাচাই করা হচ্ছে।'
  }
];
