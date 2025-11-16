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
  getById: (id: number | string) => api.get(`/students/${id}`),
  getLeaderboard: (limit: number = 10) => api.get(`/students/leaderboard?limit=${limit}`),
  search: (query: string) => api.get(`/students/search?q=${query}`),
  getAttendance: (id: number | string, startDate?: string, endDate?: string) =>
    api.get(`/students/${id}/attendance`, { params: { startDate, endDate } }),
  getMarks: (id: number | string) => api.get(`/students/${id}/marks`),
  create: (data: any) => api.post('/students', data),
  update: (id: number | string, data: any) => api.put(`/students/${id}`, data),
  delete: (id: number | string) => api.delete(`/students/${id}`),
};

// Teachers API
export const teachersAPI = {
  getAll: () => api.get('/teachers'),
  getById: (id: number | string) => api.get(`/teachers/${id}`),
  search: (query: string) => api.get(`/teachers/search?q=${query}`),
  getByDepartment: (dept: string) => api.get(`/teachers/department/${dept}`),
  create: (data: any) => api.post('/teachers', data),
  update: (id: number | string, data: any) => api.put(`/teachers/${id}`, data),
  delete: (id: number | string) => api.delete(`/teachers/${id}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: () => api.get('/attendance'),
  getByDate: (date: string) => api.get(`/attendance/date/${date}`),
  getStats: (studentId: number | string, startDate?: string, endDate?: string) =>
    api.get(`/attendance/student/${studentId}/stats`, { params: { startDate, endDate } }),
  markAttendance: (data: any) => api.post('/attendance', data),
  bulkMarkAttendance: (dataArray: any[]) => api.post('/attendance', dataArray),
};

// Marks API
export const marksAPI = {
  getAll: () => api.get('/marks'),
  getBySubject: (subject: string) => api.get(`/marks/subject/${subject}`),
  create: (data: any) => api.post('/marks', data),
  update: (id: number | string, data: any) => api.put(`/marks/${id}`, data),
  delete: (id: number | string) => api.delete(`/marks/${id}`),
};

export default api;
