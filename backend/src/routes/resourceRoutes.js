const express = require('express');
const router = express.Router();
const ResourceModel = require('../models/resourceModel');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type || 'others';
    cb(null, `uploads/resources/${type}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await ResourceModel.getAll();
    res.json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get resources by domain
router.get('/domain/:domainId', async (req, res) => {
  try {
    const resources = await ResourceModel.getByDomain(req.params.domainId);
    res.json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get resources by domain and type
router.get('/domain/:domainId/type/:type', async (req, res) => {
  try {
    const resources = await ResourceModel.getByType(req.params.domainId, req.params.type);
    res.json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new resource
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const resourceData = {
      ...req.body,
      file_path: req.file ? req.file.path : null
    };

    const resource = await ResourceModel.create(resourceData);
    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update resource
router.put('/:id', async (req, res) => {
  try {
    const resource = await ResourceModel.update(req.params.id, req.body);
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }
    res.json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete resource
router.delete('/:id', async (req, res) => {
  try {
    await ResourceModel.delete(req.params.id);
    res.json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Increment views
router.post('/:id/view', async (req, res) => {
  try {
    const resource = await ResourceModel.incrementViews(req.params.id);
    res.json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Increment downloads
router.post('/:id/download', async (req, res) => {
  try {
    const resource = await ResourceModel.incrementDownloads(req.params.id);
    res.json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
