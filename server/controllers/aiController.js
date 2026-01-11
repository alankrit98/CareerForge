const { generateResumeData } = require("../services/geminiService");

// @desc    Generate Resume content & ATS Score
// @route   POST /api/v1/ai/generate
// @access  Private (Requires Auth - to be added later)
const generateResume = async (req, res) => {
  const { userRawData, jobDescription } = req.body;

  // 1. Validation: Don't waste AI tokens if input is empty
  if (!userRawData || userRawData.length < 50) {
    return res.status(400).json({
      success: false,
      message: "Input data is too short. Please provide more details."
    });
  }

  try {
    // 2. Call the AI Service
    const aiResponse = await generateResumeData(userRawData, jobDescription);

    // 3. Send Success Response
    return res.status(200).json({
      success: true,
      data: aiResponse // This maps directly to the Resume Schema
    });

  } catch (error) {
    console.error("AI Controller Error:", error);
    
    // Handle "Overloaded" or "Rate Limit" specific errors
    if (error.status === 429) {
        return res.status(429).json({ success: false, message: "AI traffic is high. Please try again in a moment." });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate resume. Please try again."
    });
  }
};

module.exports = { generateResume };