import api from './api';

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
  getAllLostItems: () => api.get<LostItem[]>('/lost'),
  
  addLostItem: (item: LostItem) => api.post<LostItem>('/lost', item),
  
  // Found Items
  getAllFoundItems: () => api.get<FoundItem[]>('/found'),
  
  addFoundItem: (item: FoundItem) => api.post<FoundItem>('/found', item),
};
