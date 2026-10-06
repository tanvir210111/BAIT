import { authAPI } from './api';

export const authService = {
  login: async (credentials) => {
    return authAPI.login(credentials);
  },

  register: async (userData) => {
    return authAPI.register(userData);
  },

  getMe: async () => {
    return authAPI.getMe();
  },

  logout: () => {
    authAPI.logout();
  },

  isAuthenticated: () => {
    return authAPI.isAuthenticated();
  },

  getUser: () => {
    return authAPI.getUser();
  }
};

export default authService;
