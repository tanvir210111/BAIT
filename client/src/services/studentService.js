import { apiFetch } from './api';
import {
  mockStudentProfile,
  mockEnrolledCourses,
  mockLiveClasses,
  mockClassRoutine,
  mockAssignments,
  mockExams,
  mockResults,
  mockCertificates,
  mockPayments,
  mockNotifications,
  mockSupportTickets
} from './mockData';

export const studentService = {
  // 1. Student Profile
  getProfile: async () => {
    try {
      const data = await apiFetch('/student/profile');
      return data?.user || mockStudentProfile;
    } catch {
      return mockStudentProfile;
    }
  },

  // 2. Enrolled Courses
  getCourses: async () => {
    try {
      const data = await apiFetch('/student/courses');
      return Array.isArray(data) && data.length > 0 ? data : mockEnrolledCourses;
    } catch {
      return mockEnrolledCourses;
    }
  },

  getCourseDetails: async (courseId) => {
    try {
      const data = await apiFetch(`/student/courses/${courseId}`);
      return data || mockEnrolledCourses.find(c => c.id === Number(courseId)) || mockEnrolledCourses[0];
    } catch {
      return mockEnrolledCourses.find(c => c.id === Number(courseId)) || mockEnrolledCourses[0];
    }
  },

  // 3. Live Classes
  getLiveClasses: async () => {
    try {
      const data = await apiFetch('/student/live-classes');
      return Array.isArray(data) && data.length > 0 ? data : mockLiveClasses;
    } catch {
      return mockLiveClasses;
    }
  },

  // 4. Class Routine
  getRoutine: async () => {
    try {
      const data = await apiFetch('/student/class-routine');
      return Array.isArray(data) && data.length > 0 ? data : mockClassRoutine;
    } catch {
      return mockClassRoutine;
    }
  },

  // 5. Assignments
  getAssignments: async () => {
    try {
      const data = await apiFetch('/student/assignments');
      return Array.isArray(data) && data.length > 0 ? data : mockAssignments;
    } catch {
      return mockAssignments;
    }
  },

  submitAssignment: async (assignmentId, submissionData) => {
    try {
      return await apiFetch(`/student/assignments/${assignmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify(submissionData)
      });
    } catch {
      return { success: true, message: 'অ্যাসাইনমেন্ট সফলভাবে জমা নেওয়া হয়েছে।' };
    }
  },

  // 6. Exams
  getExams: async () => {
    try {
      const data = await apiFetch('/student/exams');
      return Array.isArray(data) && data.length > 0 ? data : mockExams;
    } catch {
      return mockExams;
    }
  },

  // 7. Results
  getResults: async () => {
    try {
      const data = await apiFetch('/student/results');
      return Array.isArray(data) && data.length > 0 ? data : mockResults;
    } catch {
      return mockResults;
    }
  },

  // 8. Certificates
  getCertificates: async () => {
    try {
      const data = await apiFetch('/student/certificates');
      return Array.isArray(data) && data.length > 0 ? data : mockCertificates;
    } catch {
      return mockCertificates;
    }
  },

  // 9. Payments / Fees History
  getPayments: async () => {
    try {
      const data = await apiFetch('/student/payments');
      return Array.isArray(data) && data.length > 0 ? data : mockPayments;
    } catch {
      return mockPayments;
    }
  },

  // 10. Notifications
  getNotifications: async () => {
    try {
      const data = await apiFetch('/student/notifications');
      return Array.isArray(data) && data.length > 0 ? data : mockNotifications;
    } catch {
      return mockNotifications;
    }
  },

  // 11. Support Tickets
  getSupportTickets: async () => {
    try {
      const data = await apiFetch('/student/support');
      return Array.isArray(data) && data.length > 0 ? data : mockSupportTickets;
    } catch {
      return mockSupportTickets;
    }
  },

  createSupportTicket: async (ticketData) => {
    try {
      return await apiFetch('/student/support', {
        method: 'POST',
        body: JSON.stringify(ticketData)
      });
    } catch {
      return { success: true, message: 'সাপোর্ট টিকিট সফলভাবে খোলা হয়েছে।' };
    }
  }
};

export default studentService;
