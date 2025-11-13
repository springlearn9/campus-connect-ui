// Campus Connect Mock Data

export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  year: string;
  gpa: number;
  status: 'Active' | 'Inactive';
}

export interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  enrolled: number;
  capacity: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  type: 'Academic' | 'Sports' | 'Cultural' | 'Workshop';
}

export interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalEvents: number;
  averageAttendance: number;
}

export const students: Student[] = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@campus.edu', department: 'Computer Science', year: '3rd Year', gpa: 3.8, status: 'Active' },
  { id: 2, name: 'Emma Williams', email: 'emma.w@campus.edu', department: 'Business', year: '2nd Year', gpa: 3.6, status: 'Active' },
  { id: 3, name: 'Michael Brown', email: 'michael.b@campus.edu', department: 'Engineering', year: '4th Year', gpa: 3.9, status: 'Active' },
  { id: 4, name: 'Sophia Davis', email: 'sophia.d@campus.edu', department: 'Arts', year: '1st Year', gpa: 3.7, status: 'Active' },
  { id: 5, name: 'James Wilson', email: 'james.w@campus.edu', department: 'Science', year: '3rd Year', gpa: 3.5, status: 'Active' },
  { id: 6, name: 'Olivia Martinez', email: 'olivia.m@campus.edu', department: 'Computer Science', year: '2nd Year', gpa: 3.85, status: 'Active' },
  { id: 7, name: 'Noah Garcia', email: 'noah.g@campus.edu', department: 'Business', year: '4th Year', gpa: 3.4, status: 'Inactive' },
  { id: 8, name: 'Ava Rodriguez', email: 'ava.r@campus.edu', department: 'Engineering', year: '3rd Year', gpa: 3.95, status: 'Active' },
];

export const courses: Course[] = [
  { id: 1, code: 'CS101', name: 'Introduction to Programming', instructor: 'Dr. Smith', credits: 3, enrolled: 45, capacity: 50 },
  { id: 2, code: 'BUS201', name: 'Business Analytics', instructor: 'Prof. Johnson', credits: 4, enrolled: 38, capacity: 40 },
  { id: 3, code: 'ENG301', name: 'Advanced Engineering Design', instructor: 'Dr. Lee', credits: 4, enrolled: 30, capacity: 35 },
  { id: 4, code: 'ART150', name: 'Digital Art & Design', instructor: 'Ms. Taylor', credits: 3, enrolled: 25, capacity: 30 },
  { id: 5, code: 'SCI202', name: 'Physics II', instructor: 'Dr. Anderson', credits: 4, enrolled: 42, capacity: 45 },
  { id: 6, code: 'CS305', name: 'Data Structures', instructor: 'Dr. Smith', credits: 4, enrolled: 40, capacity: 45 },
];

export const events: Event[] = [
  { id: 1, title: 'Tech Hackathon 2024', date: '2024-12-15', location: 'Main Auditorium', attendees: 150, type: 'Academic' },
  { id: 2, title: 'Annual Sports Meet', date: '2024-12-20', location: 'Sports Complex', attendees: 300, type: 'Sports' },
  { id: 3, title: 'Cultural Festival', date: '2024-12-25', location: 'Campus Grounds', attendees: 500, type: 'Cultural' },
  { id: 4, title: 'Career Development Workshop', date: '2024-12-10', location: 'Conference Hall', attendees: 80, type: 'Workshop' },
  { id: 5, title: 'AI/ML Seminar', date: '2024-12-18', location: 'CS Building', attendees: 120, type: 'Academic' },
];

export const stats: Stats = {
  totalStudents: 1250,
  totalCourses: 85,
  totalEvents: 24,
  averageAttendance: 88,
};

// Mock Notices
export const mockNotices = [
  {
    id: 1,
    title: 'Final Exam Schedule Released',
    description: 'The final examination schedule for Fall 2024 has been published. Please check your student portal.',
    priority: 'HIGH',
    category: 'ACADEMIC',
    validUntil: '2024-12-31',
    status: 'ACTIVE',
    createdAt: '2024-11-01',
    postedBy: { name: 'Academic Office' }
  },
  {
    id: 2,
    title: 'Library Hours Extended',
    description: 'Library will remain open 24/7 during exam period starting December 10th.',
    priority: 'NORMAL',
    category: 'GENERAL',
    validUntil: '2024-12-20',
    status: 'ACTIVE',
    createdAt: '2024-11-05',
    postedBy: { name: 'Library Administration' }
  },
  {
    id: 3,
    title: 'Student Council Elections',
    description: 'Nominations open for Student Council positions. Deadline: November 30th.',
    priority: 'NORMAL',
    category: 'ADMINISTRATIVE',
    validUntil: '2024-11-30',
    status: 'ACTIVE',
    createdAt: '2024-11-10',
    postedBy: { name: 'Student Affairs' }
  }
];

// Mock Events  
export const mockEvents = [
  {
    id: 1,
    title: 'Tech Hackathon 2024',
    description: 'Annual 48-hour coding competition with exciting prizes',
    eventDate: '2024-12-15T09:00',
    location: 'Main Auditorium',
    status: 'ACTIVE',
    createdAt: '2024-10-15',
    postedBy: { name: 'Computer Science Dept' }
  },
  {
    id: 2,
    title: 'Annual Sports Meet',
    description: 'Inter-department sports competition',
    eventDate: '2024-12-20T08:00',
    location: 'Sports Complex',
    status: 'ACTIVE',
    createdAt: '2024-10-20',
    postedBy: { name: 'Sports Committee' }
  },
  {
    id: 3,
    title: 'Cultural Festival',
    description: 'Celebrate diversity with music, dance, and food',
    eventDate: '2024-12-25T17:00',
    location: 'Campus Grounds',
    status: 'ACTIVE',
    createdAt: '2024-10-25',
    postedBy: { name: 'Cultural Committee' }
  }
];

// Mock Lost & Found Items
export const mockLostItems = [
  {
    id: 1,
    itemName: 'Blue Backpack',
    description: 'Navy blue backpack with laptop compartment',
    location: 'Library 2nd Floor',
    status: 'PENDING',
    createdAt: '2024-11-08',
    user: { name: 'John Doe', email: 'john@campus.edu' }
  },
  {
    id: 2,
    itemName: 'iPhone 13',
    description: 'Black iPhone 13 with cracked screen',
    location: 'Cafeteria',
    status: 'FOUND',
    createdAt: '2024-11-10',
    user: { name: 'Jane Smith', email: 'jane@campus.edu' }
  }
];

export const mockFoundItems = [
  {
    id: 1,
    itemName: 'Car Keys',
    description: 'Toyota keys with red keychain',
    location: 'Parking Lot B',
    foundDate: '2024-11-12',
    reportedBy: { name: 'Security', email: 'security@campus.edu' }
  },
  {
    id: 2,
    itemName: 'Textbook',
    description: 'Advanced Mathematics textbook',
    location: 'Math Building Room 201',
    foundDate: '2024-11-11',
    reportedBy: { name: 'Prof. Wilson', email: 'wilson@campus.edu' }
  }
];
