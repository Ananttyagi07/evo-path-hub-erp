const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { createTables } = require('./config/database');
const { createCourseTables } = require('./config/courseTables');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const marksRoutes = require('./routes/marksRoutes');
const domainRoutes = require('./routes/domainRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
createTables();
createCourseTables();

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/tests', testRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EvoPath Hub API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to EvoPath Hub API',
    version: '1.0.0',
    endpoints: {
      students: '/api/students',
      teachers: '/api/teachers',
      attendance: '/api/attendance',
      marks: '/api/marks',
      domains: '/api/domains',
      roadmaps: '/api/roadmaps',
      resources: '/api/resources',
      tests: '/api/tests',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   EvoPath Hub Backend API Server              ║
╚════════════════════════════════════════════════╝

🚀 Server is running on port ${PORT}
📍 Base URL: http://localhost:${PORT}
🏥 Health Check: http://localhost:${PORT}/api/health

Available Endpoints:
  📚 Students:    http://localhost:${PORT}/api/students
  👨‍🏫 Teachers:   http://localhost:${PORT}/api/teachers
  📊 Attendance:  http://localhost:${PORT}/api/attendance
  📝 Marks:       http://localhost:${PORT}/api/marks

Environment: ${process.env.NODE_ENV || 'development'}
  `);
});

module.exports = app;
