import api from './api';
import { mockService } from './mockService';
import { apiCache } from '../utils/apiCache';

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
    return apiCache.get('notices', async () => {
      try {
        const response = await api.get<Notice[]>('/notices');
        return response;
      } catch (error) {
        // Fallback to mock data
        mockService.init();
        return { data: mockService.getNotices() };
      }
    });
  },
  
  getNoticeById: (id: number) => api.get<Notice>(`/notices/${id}`),
  
  createNotice: async (notice: Notice, userId: number) => {
    try {
      const result = await api.post<Notice>('/notices', notice, { params: { userId } });
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('notices');
      return result;
    } catch (error) {
      // Fallback to mock data
      const newNotice = mockService.addNotice(notice);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('notices');
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
