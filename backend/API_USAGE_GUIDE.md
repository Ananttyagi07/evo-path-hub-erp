# EvoPath Hub API Usage Guide

Backend server is running on `http://localhost:5001`

## Quick Start

The backend is already running and the database is populated with:
- **55 Students** (including Ayush, Piyush, Ritik, Anant Sir, Yash)
- **5 Teachers**
- **1 Admin**
- **Attendance records** for the last 30 days
- **Marks/grades** for multiple subjects
- **Sample assignments**

## Frontend Integration

### 1. Install Axios (if not already installed)
```bash
npm install axios
```

### 2. Create API Service File

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Students API
export const studentsAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  getLeaderboard: (limit = 10) => api.get(`/students/leaderboard?limit=${limit}`),
  search: (query) => api.get(`/students/search?q=${query}`),
  getAttendance: (id, startDate, endDate) =>
    api.get(`/students/${id}/attendance`, { params: { startDate, endDate } }),
  getMarks: (id) => api.get(`/students/${id}/marks`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

// Teachers API
export const teachersAPI = {
  getAll: () => api.get('/teachers'),
  getById: (id) => api.get(`/teachers/${id}`),
  search: (query) => api.get(`/teachers/search?q=${query}`),
  getByDepartment: (dept) => api.get(`/teachers/department/${dept}`),
  create: (data) => api.post('/teachers', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: () => api.get('/attendance'),
  getByDate: (date) => api.get(`/attendance/date/${date}`),
  getStats: (studentId, startDate, endDate) =>
    api.get(`/attendance/student/${studentId}/stats`, { params: { startDate, endDate } }),
  markAttendance: (data) => api.post('/attendance', data),
  bulkMarkAttendance: (dataArray) => api.post('/attendance', dataArray),
};

// Marks API
export const marksAPI = {
  getAll: () => api.get('/marks'),
  getBySubject: (subject) => api.get(`/marks/subject/${subject}`),
  create: (data) => api.post('/marks', data),
  update: (id, data) => api.put(`/marks/${id}`, data),
  delete: (id) => api.delete(`/marks/${id}`),
};

export default api;
```

### 3. Example Usage in Components

#### Example: StudentLeaderboard Component

```javascript
import React, { useState, useEffect } from 'react';
import { studentsAPI } from '../services/api';

function StudentLeaderboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await studentsAPI.getLeaderboard(10);
      setStudents(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Student Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Marks</th>
            <th>GPA</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.rank}</td>
              <td>{student.full_name}</td>
              <td>{student.total_marks}</td>
              <td>{student.gpa}</td>
              <td>{student.attendance_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentLeaderboard;
```

#### Example: Update Student Data

```javascript
const updateStudent = async (studentId, updates) => {
  try {
    const response = await studentsAPI.update(studentId, {
      full_name: "New Name",
      email: "newemail@example.com",
      gpa: 9.5,
      // ... other fields
    });

    if (response.data.success) {
      console.log('Student updated:', response.data.data);
      // The database is automatically updated!
    }
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

#### Example: Mark Attendance

```javascript
const markAttendance = async () => {
  try {
    const response = await attendanceAPI.markAttendance({
      student_id: 1,
      date: '2025-11-16',
      status: 'present',
      subject: 'Mathematics',
      remarks: ''
    });

    console.log('Attendance marked:', response.data);
  } catch (error) {
    console.error('Failed to mark attendance:', error);
  }
};
```

## API Endpoints Reference

### Students
- `GET /api/students` - Get all students
- `GET /api/students/leaderboard?limit=10` - Get top students
- `GET /api/students/search?q=name` - Search students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/:id/attendance` - Get student attendance
- `GET /api/students/:id/marks` - Get student marks
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `GET /api/teachers/search?q=name` - Search teachers
- `GET /api/teachers/department/:dept` - Get teachers by department
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/date/:date` - Get attendance by date
- `GET /api/attendance/student/:id/stats` - Get attendance statistics
- `POST /api/attendance` - Mark attendance (single or bulk)

### Marks
- `GET /api/marks` - Get all marks
- `GET /api/marks/subject/:subject` - Get marks by subject
- `POST /api/marks` - Create new marks entry
- `PUT /api/marks/:id` - Update marks
- `DELETE /api/marks/:id` - Delete marks

## Test the API

You can test the API using curl or any API testing tool:

```bash
# Get all students
curl http://localhost:5001/api/students

# Get leaderboard
curl http://localhost:5001/api/students/leaderboard?limit=5

# Search students
curl http://localhost:5001/api/students/search?q=Ayush

# Get student by ID
curl http://localhost:5001/api/students/1

# Get all teachers
curl http://localhost:5001/api/teachers

# Get attendance for a date
curl http://localhost:5001/api/attendance/date/2025-11-15
```

## Database File

The SQLite database is located at:
`backend/database.sqlite`

You can inspect it using any SQLite browser tool.

## Notes

- All changes made through the API are immediately reflected in the database
- Student ranks are automatically updated when marks change
- Attendance percentages are automatically calculated
- The API uses CORS to allow requests from `http://localhost:3000`, `http://localhost:5173`, and `http://localhost:5174`

## Login Credentials

For testing authentication (if you implement it):

**Admin:**
- Email: admin@evopathhub.com
- Password: admin123

**Teacher (Anant Sir):**
- Email: anant.sir@evopathhub.com
- Password: anant123

**Student (Ayush):**
- Email: ayush.kumar@student.evopathhub.com
- Password: student123

## Running the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start

# Or start in development mode with auto-reload
npm run dev

# Reinitialize database with fresh data
npm run init-db
```

The server will start on `http://localhost:5001`
