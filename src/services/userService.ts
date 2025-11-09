import api from './api';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string; // STUDENT, FACULTY, ADMIN
}

export const userService = {
  getAllUsers: () => api.get<User[]>('/users'),
  
  registerUser: (user: User) => api.post<User>('/users/register', user),
};
