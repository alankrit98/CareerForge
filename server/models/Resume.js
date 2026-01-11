const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: String, // Clerk ID or Custom Auth ID
    required: true,
    index: true
  },
  title: {
    type: String, 
    default: 'Untitled Resume'
  },
  // Core Resume Data (Mapped to Frontend Form)
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    linkedin: String,
    portfolio: String,
    summary: String, // AI-Generated Professional Summary
  },
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String,
  }],
  experience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: [String] // Array of AI-optimized bullet points
  }],
  skills: [String], // ["React", "Node.js", "Team Leadership"]
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String
  }],
  
  // ATS Simulator Data (Persisted from the AI analysis)
  atsAnalysis: {
    score: { type: Number, default: 0 },
    missingKeywords: [String],
    feedback: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);