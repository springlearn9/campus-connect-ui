import api from './api';
import { mockService } from './mockService';
import { apiCache } from '../utils/apiCache';

export interface LostItem {
  id?: number;
  itemName: string;
  description: string;
  location: string;
  status: string; // PENDING, FOUND, CLAIMED
  createdAt?: string;
  updatedAt?: string;
  user?: any;
}

export interface FoundItem {
  id?: number;
  itemName: string;
  description: string;
  location: string;
  photoUrl?: string;
  foundDate?: string;
  reportedBy?: any;
}

export const lostFoundService = {
  // Lost Items
  getAllLostItems: async () => {
    return apiCache.get('lostItems', async () => {
      try {
        const response = await api.get<LostItem[]>('/lost');
        return response;
      } catch (error) {
        // Fallback to mock data
        mockService.init();
        return { data: mockService.getLostItems() };
      }
    });
  },
  
  addLostItem: async (item: LostItem) => {
    try {
      const result = await api.post<LostItem>('/lost', item);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('lostItems');
      return result;
    } catch (error) {
      // Fallback to mock data
      const newItem = mockService.addLostItem(item);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('lostItems');
      return { data: newItem };
    }
  },
  
  // Found Items
  getAllFoundItems: async () => {
    return apiCache.get('foundItems', async () => {
      try {
        const response = await api.get<FoundItem[]>('/found');
        return response;
      } catch (error) {
        // Fallback to mock data
        mockService.init();
        return { data: mockService.getFoundItems() };
      }
    });
  },
  
  addFoundItem: async (item: FoundItem) => {
    try {
      const result = await api.post<FoundItem>('/found', item);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('foundItems');
      return result;
    } catch (error) {
      // Fallback to mock data
      const newItem = mockService.addFoundItem(item);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('foundItems');
      return { data: newItem };
    }
  },
};
