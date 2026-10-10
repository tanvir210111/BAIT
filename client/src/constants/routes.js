// Application Route Constants
export const ROUTES = {
  // Public Routes
  HOME: '/',
  ABOUT: '/amader-somporke',
  COURSES: '/course',
  COURSE_DETAILS: (slug = ':slug') => `/course/${slug}`,
  SERVICES: '/services',
  INSTRUCTORS: '/instructor',
  INSTRUCTOR_PROFILE: (slug = ':slug') => `/instructor/${slug}`,
  STUDENTS: '/student',
  STUDENT_PUBLIC_PROFILE: (slug = ':slug') => `/student-profile/${slug}`,
  EMPLOYEE_PROFILE: (slug = ':slug') => `/employee/${slug}`,
  CONTACT: '/jogajog',
  
  // Policy Pages
  REFUND_POLICY: '/refund-policy',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',

  // Auth Routes
  SIGNIN: '/signin',
  LOGIN: '/login',
  SIGNUP: '/signup',
  REGISTER: '/register',
  STUDENT_LOGIN: '/student/login',
  STUDENT_SIGNUP: '/student/signup',
  CLIENT_LOGIN: '/client/login',
  CLIENT_SIGNUP: '/client/signup',
  MY_PROFILE: '/my-profile',

  // Student Panel Routes
  STUDENT: {
    ROOT: '/student',
    DASHBOARD: '/student/dashboard',
    COURSES: '/student/courses',
    COURSE_LEARNING: (id = ':id') => `/student/courses/${id}`,
    LIVE_CLASSES: '/student/live-classes',
    CLASS_ROUTINE: '/student/class-routine',
    ASSIGNMENTS: '/student/assignments',
    EXAMS: '/student/exams',
    RESULTS: '/student/results',
    CERTIFICATES: '/student/certificates',
    PAYMENTS: '/student/payments',
    NOTIFICATIONS: '/student/notifications',
    SUPPORT: '/student/support',
    PROFILE: '/student/profile',
    SETTINGS: '/student/settings',
  },

  // Client Panel Routes
  CLIENT: {
    ROOT: '/client',
    DASHBOARD: '/client/dashboard',
    PROJECTS: '/client/projects',
    REQUEST_PROJECT: '/client/request-project',
    INVOICES: '/client/invoices',
    SERVICES: '/client/services',
    SUPPORT: '/client/support',
    SETTINGS: '/client/settings',
  }
};

export default ROUTES;
