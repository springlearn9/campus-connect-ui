// Mock service to handle API failures and provide fallback data
import { mockNotices, mockEvents, mockLostItems, mockFoundItems } from '../data/mockData';

// Local storage keys for persistence
const NOTICES_KEY = 'campus_notices';
const EVENTS_KEY = 'campus_events';
const LOST_ITEMS_KEY = 'campus_lost_items';
const FOUND_ITEMS_KEY = 'campus_found_items';
const USERS_KEY = 'campus_users';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@campus.edu',
    role: 'STUDENT'
  },
  {
    id: 2,
    name: 'Prof. Smith',
    email: 'smith@campus.edu',
    role: 'FACULTY'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'ADMIN'
  },
  {
    id: 4,
    name: 'Jane Wilson',
    email: 'jane.wilson@campus.edu',
    role: 'STUDENT'
  },
  {
    id: 5,
    name: 'Dr. Johnson',
    email: 'johnson@campus.edu',
    role: 'FACULTY'
  }
];

class MockService {
  // Initialize with mock data if localStorage is empty
  init() {
    if (!localStorage.getItem(NOTICES_KEY)) {
      localStorage.setItem(NOTICES_KEY, JSON.stringify(mockNotices));
    }
    if (!localStorage.getItem(EVENTS_KEY)) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(mockEvents));
    }
    if (!localStorage.getItem(LOST_ITEMS_KEY)) {
      localStorage.setItem(LOST_ITEMS_KEY, JSON.stringify(mockLostItems));
    }
    if (!localStorage.getItem(FOUND_ITEMS_KEY)) {
      localStorage.setItem(FOUND_ITEMS_KEY, JSON.stringify(mockFoundItems));
    }
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    }
  }

  // Notices
  getNotices() {
    return JSON.parse(localStorage.getItem(NOTICES_KEY) || '[]');
  }

  addNotice(notice: any) {
    const notices = this.getNotices();
    const newNotice = {
      ...notice,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      postedBy: { name: 'Current User' }
    };
    notices.unshift(newNotice);
    localStorage.setItem(NOTICES_KEY, JSON.stringify(notices));
    return newNotice;
  }

  // Events
  getEvents() {
    return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]');
  }

  addEvent(event: any) {
    const events = this.getEvents();
    const newEvent = {
      ...event,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      postedBy: { name: 'Current User' }
    };
    events.unshift(newEvent);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    return newEvent;
  }

  // Lost Items
  getLostItems() {
    return JSON.parse(localStorage.getItem(LOST_ITEMS_KEY) || '[]');
  }

  addLostItem(item: any) {
    const items = this.getLostItems();
    const newItem = {
      ...item,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      user: { name: 'Current User', email: 'user@campus.edu' }
    };
    items.unshift(newItem);
    localStorage.setItem(LOST_ITEMS_KEY, JSON.stringify(items));
    return newItem;
  }

  // Found Items
  getFoundItems() {
    return JSON.parse(localStorage.getItem(FOUND_ITEMS_KEY) || '[]');
  }

  addFoundItem(item: any) {
    const items = this.getFoundItems();
    const newItem = {
      ...item,
      id: Date.now(),
      foundDate: item.foundDate || new Date().toISOString(),
      reportedBy: { name: 'Current User', email: item.reporterEmail || 'user@campus.edu' }
    };
    items.unshift(newItem);
    localStorage.setItem(FOUND_ITEMS_KEY, JSON.stringify(items));
    return newItem;
  }

  // Users
  getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  addUser(user: any) {
    const users = this.getUsers();
    const newUser = {
      ...user,
      id: Date.now()
    };
    users.unshift(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  }

  // Mock current user
  getCurrentUser() {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@campus.edu',
      role: 'STUDENT',
      department: 'Computer Science',
      photoUrl: 'https://via.placeholder.com/40'
    };
  }
}

export const mockService = new MockService();