const express = require('express');
const router = express.Router();
const TestModel = require('../models/testModel');

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await TestModel.getAll();
    res.json({ success: true, data: tests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get tests by domain
router.get('/domain/:domainId', async (req, res) => {
  try {
    const tests = await TestModel.getByDomain(req.params.domainId);
    res.json({ success: true, data: tests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get tests by domain and type
router.get('/domain/:domainId/type/:type', async (req, res) => {
  try {
    const tests = await TestModel.getByType(req.params.domainId, req.params.type);
    res.json({ success: true, data: tests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get test with questions
router.get('/:id/full', async (req, res) => {
  try {
    const test = await TestModel.getWithQuestions(req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, error: 'Test not found' });
    }
    res.json({ success: true, data: test });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new test
router.post('/', async (req, res) => {
  try {
    const test = await TestModel.create(req.body);
    res.status(201).json({ success: true, data: test });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add question to test
router.post('/:id/questions', async (req, res) => {
  try {
    const questionId = await TestModel.addQuestion({
      ...req.body,
      test_id: req.params.id
    });
    res.status(201).json({ success: true, data: { id: questionId } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit test
router.post('/:id/submit', async (req, res) => {
  try {
    const submissionId = await TestModel.submitTest({
      ...req.body,
      test_id: req.params.id
    });
    res.status(201).json({ success: true, data: { id: submissionId } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get student submissions
router.get('/submissions/student/:studentId', async (req, res) => {
  try {
    const submissions = await TestModel.getStudentSubmissions(req.params.studentId);
    res.json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update test
router.put('/:id', async (req, res) => {
  try {
    const test = await TestModel.update(req.params.id, req.body);
    if (!test) {
      return res.status(404).json({ success: false, error: 'Test not found' });
    }
    res.json({ success: true, data: test });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete test (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    await TestModel.delete(req.params.id);
    res.json({ success: true, message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
