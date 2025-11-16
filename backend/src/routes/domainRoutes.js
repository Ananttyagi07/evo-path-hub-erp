const express = require('express');
const router = express.Router();
const DomainModel = require('../models/domainModel');

// Get all domains
router.get('/', async (req, res) => {
  try {
    const domains = await DomainModel.getAll();
    res.json({ success: true, data: domains });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get domain by ID
router.get('/:id', async (req, res) => {
  try {
    const domain = await DomainModel.getById(req.params.id);
    if (!domain) {
      return res.status(404).json({ success: false, error: 'Domain not found' });
    }
    res.json({ success: true, data: domain });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get domains by category
router.get('/category/:category', async (req, res) => {
  try {
    const domains = await DomainModel.getByCategory(req.params.category);
    res.json({ success: true, data: domains });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new domain
router.post('/', async (req, res) => {
  try {
    const domain = await DomainModel.create(req.body);
    res.status(201).json({ success: true, data: domain });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update domain
router.put('/:id', async (req, res) => {
  try {
    const domain = await DomainModel.update(req.params.id, req.body);
    if (!domain) {
      return res.status(404).json({ success: false, error: 'Domain not found' });
    }
    res.json({ success: true, data: domain });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete domain
router.delete('/:id', async (req, res) => {
  try {
    await DomainModel.delete(req.params.id);
    res.json({ success: true, message: 'Domain deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
