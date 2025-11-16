const express = require('express');
const router = express.Router();
const AttendanceModel = require('../models/attendanceModel');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await AttendanceModel.getAll();
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get attendance by date
router.get('/date/:date', async (req, res) => {
  try {
    const attendance = await AttendanceModel.getByDate(req.params.date);
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get attendance statistics for a student
router.get('/student/:studentId/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const stats = await AttendanceModel.getStatistics(req.params.studentId, startDate, endDate);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark attendance (single or bulk)
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk attendance
      const result = await AttendanceModel.bulkCreate(req.body);
      res.status(201).json({ success: true, data: result });
    } else {
      // Single attendance
      const attendance = await AttendanceModel.create(req.body);

      // Update student's attendance percentage
      AttendanceModel.updateStudentAttendancePercentage(req.body.student_id);

      res.status(201).json({ success: true, data: attendance });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
