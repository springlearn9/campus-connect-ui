import api from './api';
import { mockService } from './mockService';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string; // STUDENT, FACULTY, ADMIN
}

export const userService = {
  getAllUsers: async () => {
    try {
      return await api.get<User[]>('/users');
    } catch (error) {
      // Fallback to mock data
      mockService.init();
      return { data: mockService.getUsers() };
    }
  },
  
  registerUser: async (user: User) => {
    try {
      return await api.post<User>('/users/register', user);
    } catch (error) {
      // Fallback to mock data
      const newUser = mockService.addUser(user);
      return { data: newUser };
    }
  },
  
  // Get currently authenticated user (backend should expose /users/me)
  getCurrentUser: async () => {
    try {
      return await api.get<User>('/users/me');
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
  },
};
