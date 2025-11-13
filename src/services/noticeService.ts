import api from './api';
import { mockService } from './mockService';

export interface Notice {
  id?: number;
  title: string;
  description: string;
  priority: string; // HIGH, NORMAL, LOW
  category: string; // ACADEMIC, ADMINISTRATIVE, EVENT, GENERAL
  validUntil?: string;
  status: string; // ACTIVE, ARCHIVED, DRAFT
  attachmentUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  postedBy?: any;
}

export const noticeService = {
  getAllNotices: async () => {
    try {
      return await api.get<Notice[]>('/notices');
    } catch (error) {
      // Fallback to mock data
      mockService.init();
      return { data: mockService.getNotices() };
    }
  },
  
  getNoticeById: (id: number) => api.get<Notice>(`/notices/${id}`),
  
  createNotice: async (notice: Notice, userId: number) => {
    try {
      return await api.post<Notice>('/notices', notice, { params: { userId } });
    } catch (error) {
      // Fallback to mock data
      const newNotice = mockService.addNotice(notice);
      return { data: newNotice };
    }
  },
  
  updateNotice: (id: number, notice: Notice, userId: number) =>
    api.put<Notice>(`/notices/${id}`, notice, { params: { userId } }),
  
  deleteNotice: (id: number, userId: number) =>
    api.delete(`/notices/${id}`, { params: { userId } }),
  
  getActiveNotices: () => api.get<Notice[]>('/notices/active'),
  
  getNoticesByStatus: (status: string) =>
    api.get<Notice[]>(`/notices/status/${status}`),
  
  getNoticesByCategory: (category: string) =>
    api.get<Notice[]>(`/notices/category/${category}`),
  
  getNoticesByPriority: (priority: string) =>
    api.get<Notice[]>(`/notices/priority/${priority}`),
  
  searchNotices: (keyword: string) =>
    api.get<Notice[]>('/notices/search', { params: { keyword } }),
  
  getNoticesByUser: (userId: number) =>
    api.get<Notice[]>(`/notices/user/${userId}`),
  
  getHighPriorityNotices: () => api.get<Notice[]>('/notices/high-priority'),
};
