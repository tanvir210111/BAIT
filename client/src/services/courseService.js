import { coursesAPI } from './api';

export const courseService = {
  getAll: async () => {
    return coursesAPI.getAll();
  },

  getBySlug: async (slug) => {
    return coursesAPI.getBySlug(slug);
  }
};

export default courseService;
