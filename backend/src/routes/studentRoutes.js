const express = require('express');
const router = express.Router();
const StudentModel = require('../models/studentModel');
const AttendanceModel = require('../models/attendanceModel');
const MarksModel = require('../models/marksModel');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await StudentModel.getAll();
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const students = await StudentModel.getLeaderboard(limit);
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search students
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }
    const students = await StudentModel.search(q);
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await StudentModel.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get student attendance
router.get('/:id/attendance', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const attendance = await StudentModel.getAttendance(req.params.id, startDate, endDate);
    const stats = await AttendanceModel.getStatistics(req.params.id, startDate, endDate);
    res.json({ success: true, data: { attendance, stats } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get student marks
router.get('/:id/marks', async (req, res) => {
  try {
    const marks = await StudentModel.getMarks(req.params.id);
    const performance = await MarksModel.getSubjectPerformance(req.params.id);
    res.json({ success: true, data: { marks, performance } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new student
router.post('/', async (req, res) => {
  try {
    const student = await StudentModel.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const student = await StudentModel.update(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    await StudentModel.delete(req.params.id);
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
