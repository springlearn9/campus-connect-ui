import api from './api';

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
  getAllEvents: () => api.get<Event[]>('/events'),
  
  getEventById: (id: number) => api.get<Event>(`/events/${id}`),
  
  createEvent: (event: Event, userId: number) => 
    api.post<Event>('/events', event, { params: { userId } }),
  
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
