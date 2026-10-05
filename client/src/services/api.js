/**
 * BAIT Frontend Centralized API Service
 * 
 * This service handles all communications between the frontend UI and the backend API.
 * Configured via Vite environment variable: `VITE_API_BASE_URL`
 * If `VITE_API_BASE_URL` is not set, it defaults to `/api` (works seamlessly with Vite proxy in dev mode).
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_PREFIX = API_BASE ? `${API_BASE}/api` : '/api';

/**
 * Universal fetch wrapper with automatic JSON parsing and Auth token headers
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_PREFIX}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Automatically attach auth token if available in localStorage
  const token = localStorage.getItem('bait_admin_token');
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(url, config);
    let data = null;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const errorMessage = (data && data.error) || (data && data.message) || `HTTP error! status: ${res.status}`;
      const err = new Error(errorMessage);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    console.warn(`[API] Error fetching ${url}:`, err.message);
    throw err;
  }
}

import { mockCourses, mockEmployees } from './mockData';

// ----------------------------------------------------------------------
// 1. Courses Endpoints
// ----------------------------------------------------------------------
export const coursesAPI = {
  /**
   * Fetch all courses
   * GET /api/courses
   */
  getAll: async () => {
    try {
      const data = await apiFetch('/courses');
      return Array.isArray(data) && data.length > 0 ? data : mockCourses;
    } catch {
      console.info('[API] Backend offline. Using mock courses fallback.');
      return mockCourses;
    }
  },

  /**
   * Fetch a single course by its slug
   * GET /api/courses/:slug
   */
  getBySlug: async (slug) => {
    try {
      const data = await apiFetch(`/courses/${slug}`);
      if (data && (data.course || data.id)) return data;
      const found = mockCourses.find(c => c.slug === slug);
      return found ? { course: found, instructor: null, reviews: [] } : null;
    } catch {
      console.info('[API] Backend offline. Using mock course fallback for:', slug);
      const found = mockCourses.find(c => c.slug === slug);
      return found ? { course: found, instructor: null, reviews: [] } : null;
    }
  },
};

// ----------------------------------------------------------------------
// 2. People & Directory Endpoints (Instructors, Students, Journalists, Employees)
// ----------------------------------------------------------------------
export const peopleAPI = {
  /**
   * Fetch people by category ('employee' | 'instructor' | 'student' | 'journalist')
   * GET /api/people?category=...
   */
  getByCategory: async (category) => {
    try {
      const data = await apiFetch(`/people?category=${encodeURIComponent(category)}`);
      return Array.isArray(data) && data.length > 0 ? data : (category === 'employee' ? mockEmployees : []);
    } catch {
      console.info(`[API] Backend offline. Using mock ${category} fallback.`);
      return category === 'employee' ? mockEmployees : [];
    }
  },

  /**
   * Fetch individual profile by category and slug
   * GET /api/people/:category/:slug
   */
  getProfile: (category, slug) => apiFetch(`/people/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`),
};

// ----------------------------------------------------------------------
// 3. Authentication Endpoints
// ----------------------------------------------------------------------
export const authAPI = {
  /**
   * Student Login
   * POST /api/auth/login
   * Body: { username, password }
   */
  login: (credentials) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  /**
   * Student Registration / Signup
   * POST /api/auth/register
   * Body: { name_bn, phone, email, password, course_id, ... }
   */
  register: (userData) => apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  /**
   * Get Current Logged-in User Profile
   * GET /api/auth/me
   * Headers: Authorization: Bearer <token>
   */
  getMe: () => apiFetch('/auth/me'),

  /**
   * Helper: Logout user and clear local storage
   */
  logout: () => {
    localStorage.removeItem('bait_admin_token');
    localStorage.removeItem('bait_admin_user');
  },

  /**
   * Helper: Check if a user is currently logged in
   */
  isAuthenticated: () => !!localStorage.getItem('bait_admin_token'),

  /**
   * Helper: Get stored user data
   */
  getUser: () => {
    try {
      const user = localStorage.getItem('bait_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
};

// ----------------------------------------------------------------------
// 4. Contact & Support Endpoints
// ----------------------------------------------------------------------
export const contactAPI = {
  /**
   * Send a contact/help message
   * POST /api/contact
   * Body: { name, email, phone, subject, message }
   */
  sendMessage: (formData) => apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),
};

// ----------------------------------------------------------------------
// 5. Global Search Endpoint
// ----------------------------------------------------------------------
export const searchAPI = {
  /**
   * Global search across courses and people
   * GET /api/search?q=...
   */
  search: (query) => apiFetch(`/search?q=${encodeURIComponent(query.trim())}`),
};

// ----------------------------------------------------------------------
// 6. Geographic / Dropdown Data
// ----------------------------------------------------------------------
export const geoAPI = {
  /**
   * Fetch divisions, districts, upazilas for forms
   * GET /api/dropdown-data
   */
  getDropdownData: () => apiFetch('/dropdown-data'),
};

export default {
  courses: coursesAPI,
  people: peopleAPI,
  auth: authAPI,
  contact: contactAPI,
  search: searchAPI,
  geo: geoAPI,
  fetch: apiFetch
};
