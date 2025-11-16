const express = require('express');
const router = express.Router();
const TeacherModel = require('../models/teacherModel');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await TeacherModel.getAll();
    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search teachers
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: 'Search query required' });
    }
    const teachers = await TeacherModel.search(q);
    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get teachers by department
router.get('/department/:department', async (req, res) => {
  try {
    const teachers = await TeacherModel.getByDepartment(req.params.department);
    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await TeacherModel.getById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found' });
    }
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new teacher
router.post('/', async (req, res) => {
  try {
    const teacher = await TeacherModel.create(req.body);
    res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await TeacherModel.update(req.params.id, req.body);
    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher not found' });
    }
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete teacher
router.delete('/:id', async (req, res) => {
  try {
    TeacherModel.delete(req.params.id);
    res.json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
