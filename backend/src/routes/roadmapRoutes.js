const express = require('express');
const router = express.Router();
const RoadmapModel = require('../models/roadmapModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/timetables/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await RoadmapModel.getAll();
    res.json({ success: true, data: roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get roadmaps by domain
router.get('/domain/:domainId', async (req, res) => {
  try {
    const roadmaps = await RoadmapModel.getByDomain(req.params.domainId);
    res.json({ success: true, data: roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get teacher roadmaps for a domain
router.get('/domain/:domainId/teacher', async (req, res) => {
  try {
    const roadmaps = await RoadmapModel.getTeacherRoadmaps(req.params.domainId);
    res.json({ success: true, data: roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get AI roadmap for a domain and difficulty
router.get('/domain/:domainId/ai/:difficulty', async (req, res) => {
  try {
    const roadmaps = await RoadmapModel.getAIRoadmaps(req.params.domainId, req.params.difficulty);
    res.json({ success: true, data: roadmaps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new roadmap
router.post('/', async (req, res) => {
  try {
    const roadmap = await RoadmapModel.create(req.body);
    res.status(201).json({ success: true, data: roadmap });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate AI roadmap with OCR
router.post('/generate-ai', upload.single('timetable'), async (req, res) => {
  try {
    const { domain_id, difficulty, student_id } = req.body;
    const timetableImage = req.file ? req.file.path : null;

    // Simulate OCR processing and AI generation
    // In production, you would use actual OCR and AI services
    const mockOCRText = "Mock OCR extracted text from timetable...";

    // Generate roadmap based on difficulty
    const timelineWeeks = difficulty === 'easy' ? 16 : difficulty === 'medium' ? 12 : 8;

    const generatedRoadmap = {
      weeks: []
    };

    for (let i = 1; i <= timelineWeeks; i++) {
      generatedRoadmap.weeks.push({
        week: i,
        title: `Week ${i}: Topic ${i}`,
        description: `Learning objectives for week ${i}`,
        tasks: [
          `Complete reading for topic ${i}`,
          `Practice exercises`,
          `Submit assignment`
        ]
      });
    }

    const roadmap = await RoadmapModel.create({
      domain_id,
      title: `AI Generated Roadmap (${difficulty})`,
      description: `Personalized roadmap based on your timetable`,
      type: 'ai-generated',
      difficulty,
      timeline_weeks: timelineWeeks,
      created_by: null,
      is_ai_generated: 1,
      roadmap_data: generatedRoadmap,
      uploaded_by_name: 'AI Generator'
    });

    res.status(201).json({
      success: true,
      data: roadmap,
      ocrText: mockOCRText
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update roadmap
router.put('/:id', async (req, res) => {
  try {
    const roadmap = await RoadmapModel.update(req.params.id, req.body);
    if (!roadmap) {
      return res.status(404).json({ success: false, error: 'Roadmap not found' });
    }
    res.json({ success: true, data: roadmap });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete roadmap
router.delete('/:id', async (req, res) => {
  try {
    await RoadmapModel.delete(req.params.id);
    res.json({ success: true, message: 'Roadmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
