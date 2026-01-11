const Resume = require('../models/Resume');

// @desc    Save a new resume
// @route   POST /api/v1/resume/save
const saveResume = async (req, res) => {
  const { userId, resumeData, title } = req.body; // resumeData comes from the AI response

  try {
    // Basic validation
    if (!userId || !resumeData) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newResume = new Resume({
      userId,
      title: title || 'Untitled Resume',
      ...resumeData // Spread the AI structure directly into the schema
    });

    const savedResume = await newResume.save();

    res.status(201).json({ success: true, data: savedResume });
  } catch (error) {
    console.error("Save Resume Error:", error);
    res.status(500).json({ success: false, message: "Server Error saving resume" });
  }
};

// @desc    Get all resumes for a specific user
// @route   GET /api/v1/resume/user/:userId
const getResumesByUser = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: resumes.length, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error fetching resumes" });
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