const Resume = require('../models/Resume');

// @desc    Save a new resume
// @route   POST /api/v1/resume/save
const saveResume = async (req, res) => {
  const { userId } = req.auth; 
  const { resumeData, title } = req.body;

  try {
    const newResume = new Resume({
      userId, // Use the authenticated ID
      title: title || 'Untitled Resume',
      ...resumeData
    });

    const savedResume = await newResume.save();
    res.status(201).json({ success: true, data: savedResume });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all resumes for a specific user
// @route   GET /api/v1/resume/user/:userId
const getResumesByUser = async (req, res) => {
  const { userId } = req.auth; // Securely get ID from token

  try {
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: resumes.length, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/v1/resume/:id
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error fetching resume" });
  }
};

module.exports = { saveResume, getResumesByUser, getResumeById };