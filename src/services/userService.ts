import api from './api';
import { mockService } from './mockService';
import { apiCache } from '../utils/apiCache';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string; // STUDENT, FACULTY, ADMIN
}

export const userService = {
  getAllUsers: async () => {
    return apiCache.get('users', async () => {
      try {
        const response = await api.get<User[]>('/users');
        return response;
      } catch (error) {
        // Fallback to mock data
        mockService.init();
        return { data: mockService.getUsers() };
      }
    });
  },
  
  registerUser: async (user: User) => {
    try {
      const result = await api.post<User>('/users/register', user);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('users');
      return result;
    } catch (error) {
      // Fallback to mock data
      const newUser = mockService.addUser(user);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('users');
      return { data: newUser };
    }
  },
  
  // Get currently authenticated user (backend should expose /users/me)
  getCurrentUser: async () => {
    return apiCache.get('currentUser', async () => {
      try {
        const response = await api.get<User>('/users/me');
        return response;
      } catch (error) {
        // Fallback to mock data
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@campus.edu',
          role: 'STUDENT',
          department: 'Computer Science',
          photoUrl: 'https://via.placeholder.com/40'
        };
        return { data: mockUser };
      }
    });
  },
};
