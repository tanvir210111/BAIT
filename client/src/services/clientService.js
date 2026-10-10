/**
 * BAIT Client Portal Service
 * Handles Client Dashboard statistics, ongoing projects, invoices, and support.
 */

export const mockClientProfile = {
  client_id: 'BAIT-CL904',
  name_bn: 'মোহাম্মদ তানজিম হাসান',
  name_en: 'Mohammad Tanjim Hasan',
  company_name: 'প্রাইম টেক লজিস্টিকস লিমিটেড',
  company_type: 'ই-কমার্স ও সাপ্লাই চেইন এন্টারপ্রাইজ',
  email: 'client@primetech.com.bd',
  phone: '০১৭১২-৩৪৫৬৭৮',
  address: 'বাড়ি ১২, রোড ০৭, ধানমন্ডি, ঢাকা',
  tier: 'এন্টারপ্রাইজ পার্টনার',
  joined_date: 'মার্চ ২০২৬',
  active_projects_count: 2,
  completed_projects_count: 3
};

export const mockClientStats = {
  activeProjects: 2,
  completedProjects: 3,
  totalInvested: 350000,
  pendingInvoicesCount: 1,
  pendingAmount: 45000,
  slaUptime: '৯৯.৯%',
  activeSupportTickets: 0
};

export const mockClientProjects = [
  {
    id: 'PRJ-101',
    title: 'প্রাইম টেক মাল্টি-ভেন্ডর ই-কমার্স প্ল্যাটফর্ম',
    category: 'ওয়েবসাইট ও মোবাইল অ্যাপ সলিউশন',
    status: 'in_progress', // 'in_progress', 'review', 'completed'
    status_bn: 'চলমান',
    progress: 78,
    budget: 180000,
    paid: 135000,
    startDate: '০১ জুলাই ২০২৬',
    deliveryDate: '১৫ নভেম্বর ২০২৬',
    projectManager: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Flutter', 'AWS'],
    milestones: [
      { id: 1, title: 'UI/UX ও প্রোটোটাইপিং', status: 'completed', date: '১৫ জুলাই ২০২৬' },
      { id: 2, title: 'কোর ব্যাকএন্ড ও ডাটাবেজ আর্কিটেকচার', status: 'completed', date: '১০ আগস্ট ২০২৬' },
      { id: 3, title: 'পেমেন্ট গেটওয়ে ও অর্ডার ম্যানেজমেন্ট', status: 'completed', date: '০৫ সেপ্টেম্বর ২০২৬' },
      { id: 4, title: 'মোবাইল অ্যাপ ফ্রন্টএন্ড ইন্টিগ্রেশন', status: 'current', date: '২০ অক্টোবর ২০২৬' },
      { id: 5, title: 'ফাইনাল QA টেস্টিং ও প্রোডাকশন লঞ্চ', status: 'pending', date: '১৫ নভেম্বর ২০২৬' }
    ]
  },
  {
    id: 'PRJ-102',
    title: 'স্মার্ট ইনভেন্টরি ও ওয়্যারহাউস অটোমেশন সিস্টেম',
    category: 'কাস্টম এন্টারপ্রাইজ সফটওয়্যার',
    status: 'in_progress',
    status_bn: 'চলমান',
    progress: 45,
    budget: 120000,
    paid: 60000,
    startDate: '০১ আগস্ট ২০২৬',
    deliveryDate: '৩০ ডিসেম্বর ২০২৬',
    projectManager: 'আহসান হাবিব',
    techStack: ['Next.js', 'Python FastAPI', 'Docker', 'Redis'],
    milestones: [
      { id: 1, title: 'রিকোয়ারমেন্ট অ্যানালাইসিস ও সিস্টেম ডিজাইন', status: 'completed', date: '২০ আগস্ট ২০২৬' },
      { id: 2, title: 'বারকোড স্ক্যানার ও ওয়্যারহাউস মডিউল', status: 'current', date: '১৫ অক্টোবর ২০২৬' },
      { id: 3, title: 'অটোমেটেড রিপোর্টিং ও অ্যানালিটিক্স', status: 'pending', date: '২০ নভেম্বর ২০২৬' },
      { id: 4, title: 'ইউজার ট্রেনিং ও সাইট ডেপ্লয়মেন্ট', status: 'pending', date: '৩০ ডিসেম্বর ২০২৬' }
    ]
  },
  {
    id: 'PRJ-098',
    title: 'কর্পোরেট ব্র্যান্ডিং ওয়েবসাইট ও ডিজিটাল পিআর পোর্টাল',
    category: 'ওয়েব ডেভেলপমেন্ট ও এসইও',
    status: 'completed',
    status_bn: 'সম্পন্ন',
    progress: 100,
    budget: 50000,
    paid: 50000,
    startDate: '১০ মে ২০২৬',
    deliveryDate: '২৫ জুন ২০২৬',
    projectManager: 'শারমিন সুলতানা',
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Cloudflare'],
    milestones: [
      { id: 1, title: 'ব্র্যান্ড গাইডলাইন ও মকআপ', status: 'completed', date: '২০ মে ২০২৬' },
      { id: 2, title: 'রেসপন্সিভ ওয়েব পোর্টাল ডেভেলপমেন্ট', status: 'completed', date: '১০ জুন ২০২৬' },
      { id: 3, title: 'এসইও অপ্টিমাইজেশন ও লাইভ ডেপ্লয়মেন্ট', status: 'completed', date: '২৫ জুন ২০২৬' }
    ]
  }
];

export const mockClientInvoices = [
  {
    id: 'INV-2026-092',
    projectId: 'PRJ-101',
    projectTitle: 'প্রাইম টেক মাল্টি-ভেন্ডর ই-কমার্স প্ল্যাটফর্ম',
    description: 'মাইলস্টোন ৪: মোবাইল অ্যাপ ফ্রন্টএন্ড ইন্টিগ্রেশন কিস্তি',
    amount: 45000,
    issueDate: '০১ অক্টোবর ২০২৬',
    dueDate: '১৫ অক্টোবর ২০২৬',
    status: 'pending', // 'paid', 'pending', 'overdue'
    status_bn: 'পরিশোধ বাকি'
  },
  {
    id: 'INV-2026-078',
    projectId: 'PRJ-102',
    projectTitle: 'স্মার্ট ইনভেন্টরি ও ওয়্যারহাউস অটোমেশন সিস্টেম',
    description: 'মাইলস্টোন ১ সম্পন্ন হওয়া বাবদ প্রাথমিক অগ্রিম',
    amount: 60000,
    issueDate: '১৫ আগস্ট ২০২৬',
    dueDate: '২৫ আগস্ট ২০২৬',
    status: 'paid',
    status_bn: 'পরিশোধিত',
    paidDate: '২০ আগস্ট ২০২৬',
    method: 'City Bank Wire Transfer'
  },
  {
    id: 'INV-2026-065',
    projectId: 'PRJ-101',
    projectTitle: 'প্রাইম টেক মাল্টি-ভেন্ডর ই-কমার্স প্ল্যাটফর্ম',
    description: 'মাইলস্টোন ৩: পেমেন্ট গেটওয়ে ও ব্যাকএন্ড কিস্তি',
    amount: 45000,
    issueDate: '০৫ সেপ্টেম্বর ২০২৬',
    dueDate: '১৫ সেপ্টেম্বর ২০২৬',
    status: 'paid',
    status_bn: 'পরিশোধিত',
    paidDate: '১০ সেপ্টেম্বর ২০২৬',
    method: 'bKash Merchant'
  },
  {
    id: 'INV-2026-042',
    projectId: 'PRJ-098',
    projectTitle: 'কর্পোরেট ব্র্যান্ডিং ওয়েবসাইট ও ডিজিটাল পিআর পোর্টাল',
    description: 'সম্পূর্ণ প্রজেক্ট ফাইনাল বিল ও হ্যান্ডওভার',
    amount: 50000,
    issueDate: '২৫ জুন ২০২৬',
    dueDate: '০৫ জুলাই ২০২৬',
    status: 'paid',
    status_bn: 'পরিশোধিত',
    paidDate: '২৮ জুন ২০২৬',
    method: 'BRAC Bank Transfer'
  }
];

export const mockClientActivities = [
  {
    id: 1,
    title: 'সফটওয়্যার স্প্রিন্ট ৩ আপডেট',
    desc: 'প্রাইম টেক ই-কমার্স অ্যাপের পেমেন্ট গেটওয়ে (SSLCommerz ও bKash) সফলভাবে টেস্ট সম্পন্ন হয়েছে।',
    time: '৩ ঘণ্টা আগে',
    type: 'project'
  },
  {
    id: 2,
    title: 'নতুন ইনভয়েস জেনারেট হয়েছে',
    desc: 'ইনভয়েস #INV-2026-092 ইস্যু করা হয়েছে (পরিমাণ: ৳৪৫,০০০)। শেষ তারিখ ১৫ই অক্টোবর।',
    time: '১ দিন আগে',
    type: 'invoice'
  },
  {
    id: 3,
    title: 'মাইলস্টোন সম্পন্ন অনুমোদন',
    desc: 'কোর ব্যাকএন্ড ও ডাটাবেজ আর্কিটেকচার মাইলস্টোন কোয়ালিটি অডিট সফলভাবে পাস করেছে।',
    time: '৪ দিন আগে',
    type: 'milestone'
  }
];

export const mockAccountManager = {
  name: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
  designation: 'লিড সলিউশন আর্কিটেক্ট ও ক্লায়েন্ট সাকসেস লিড',
  email: 'tanvir.engr@bait.com.bd',
  phone: '+৮৮০ ১৭৮৯-৪৫৬১২৩',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  availableTime: 'রবি-বৃহস্পতি (সকাল ১০:০০ - সন্ধ্যা ৬:০০)',
  status: 'সরাসরি অনলাইন'
};

export const clientService = {
  getProfile: async () => {
    try {
      const stored = localStorage.getItem('bait_client_profile');
      if (stored) return JSON.parse(stored);
      return mockClientProfile;
    } catch {
      return mockClientProfile;
    }
  },

  getStats: async () => {
    return mockClientStats;
  },

  getProjects: async () => {
    return mockClientProjects;
  },

  getInvoices: async () => {
    return mockClientInvoices;
  },

  getActivities: async () => {
    return mockClientActivities;
  },

  getAccountManager: async () => {
    return mockAccountManager;
  },

  requestProject: async (projectData) => {
    // In real app, POST /api/client/request-project
    const newProject = {
      id: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      title: projectData.title,
      category: projectData.serviceCategory || 'কাস্টম আইটি সলিউশন',
      status: 'review',
      status_bn: 'রিভিউতে',
      progress: 5,
      budget: Number(projectData.budget) || 50000,
      paid: 0,
      startDate: 'অপেক্ষমাণ',
      deliveryDate: projectData.deadline || 'নির্ধারণযোগ্য',
      projectManager: 'নির্ধারণাধীন',
      techStack: ['আধুনিক প্রযুক্তি'],
      milestones: [
        { id: 1, title: 'প্রকল্প প্রস্তাব ও চুক্তি স্বাক্ষর', status: 'current', date: 'চলতি সপ্তাহ' }
      ]
    };
    return { success: true, project: newProject };
  }
};

export default clientService;
