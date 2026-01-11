const express = require('express');
const router = express.Router();
const { generateResume } = require('../controllers/aiController');

// Define the POST endpoint
router.post('/generate', generateResume);

module.exports = router;