const express = require('express');
const router = express.Router();
const MarksModel = require('../models/marksModel');

// Get all marks
router.get('/', async (req, res) => {
  try {
    const marks = await MarksModel.getAll();
    res.json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get marks by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const marks = await MarksModel.getBySubject(req.params.subject);
    res.json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new marks entry
router.post('/', async (req, res) => {
  try {
    const marks = await MarksModel.create(req.body);
    res.status(201).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update marks
router.put('/:id', async (req, res) => {
  try {
    const result = await MarksModel.update(req.params.id, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete marks
router.delete('/:id', async (req, res) => {
  try {
    MarksModel.delete(req.params.id);
    res.json({ success: true, message: 'Marks deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
