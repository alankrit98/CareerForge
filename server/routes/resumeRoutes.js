const express = require('express');
const router = express.Router();
const { saveResume, getResumesByUser, getResumeById } = require('../controllers/resumeController');

router.post('/save', saveResume);
router.get('/user/:userId', getResumesByUser);
router.get('/:id', getResumeById);

module.exports = router;