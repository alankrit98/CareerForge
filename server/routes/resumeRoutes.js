const express = require('express');
const router = express.Router();
const { saveResume, getResumesByUser, getResumeById } = require('../controllers/resumeController');
const { requireAuth } = require('../middleware/auth');

// Apply requireAuth to protect these routes
router.post('/save', requireAuth, saveResume);
router.get('/user', requireAuth, getResumesByUser); // Changed path to generic '/user'
router.get('/:id', requireAuth, getResumeById);

module.exports = router;