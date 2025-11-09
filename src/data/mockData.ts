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
