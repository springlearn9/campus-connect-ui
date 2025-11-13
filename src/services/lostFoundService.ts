import api from './api';
import { mockService } from './mockService';

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
    try {
      return await api.get<LostItem[]>('/lost');
    } catch (error) {
      // Fallback to mock data
      mockService.init();
      return { data: mockService.getLostItems() };
    }
  },
  
  addLostItem: async (item: LostItem) => {
    try {
      return await api.post<LostItem>('/lost', item);
    } catch (error) {
      // Fallback to mock data
      const newItem = mockService.addLostItem(item);
      return { data: newItem };
    }
  },
  
  // Found Items
  getAllFoundItems: async () => {
    try {
      return await api.get<FoundItem[]>('/found');
    } catch (error) {
      // Fallback to mock data
      mockService.init();
      return { data: mockService.getFoundItems() };
    }
  },
  
  addFoundItem: async (item: FoundItem) => {
    try {
      return await api.post<FoundItem>('/found', item);
    } catch (error) {
      // Fallback to mock data
      const newItem = mockService.addFoundItem(item);
      return { data: newItem };
    }
  },
};
