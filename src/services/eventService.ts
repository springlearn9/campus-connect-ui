import api from './api';
import { mockService } from './mockService';
import { apiCache } from '../utils/apiCache';

export interface Event {
  id?: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  imageUrl?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  postedBy?: any;
}

export const eventService = {
  getAllEvents: async () => {
    return apiCache.get('events', async () => {
      try {
        const response = await api.get<Event[]>('/events');
        return response;
      } catch (error) {
        // Fallback to mock data
        mockService.init();
        return { data: mockService.getEvents() };
      }
    });
  },
  
  getEventById: (id: number) => api.get<Event>(`/events/${id}`),
  
  addEvent: async (event: Event, userId: number) => {
    try {
      const result = await api.post<Event>('/events', event, { params: { userId } });
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('events');
      return result;
    } catch (error) {
      // Fallback to mock data
      const newEvent = mockService.addEvent(event);
      // Clear cache to ensure fresh data on next fetch
      apiCache.clear('events');
      return { data: newEvent };
    }
  },
  
  updateEvent: (id: number, event: Event, userId: number) =>
    api.put<Event>(`/events/${id}`, event, { params: { userId } }),
  
  deleteEvent: (id: number, userId: number) =>
    api.delete(`/events/${id}`, { params: { userId } }),
  
  getUpcomingEvents: () => api.get<Event[]>('/events/upcoming'),
  
  getEventsByStatus: (status: string) => 
    api.get<Event[]>(`/events/status/${status}`),
  
  searchEvents: (keyword: string) =>
    api.get<Event[]>('/events/search', { params: { keyword } }),
  
  getEventsByUser: (userId: number) =>
    api.get<Event[]>(`/events/user/${userId}`),
  
  getEventsByLocation: (location: string) =>
    api.get<Event[]>('/events/location', { params: { location } }),
};
