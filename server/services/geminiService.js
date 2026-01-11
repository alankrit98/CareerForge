const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildResumeMegaPrompt } = require("../utils/prompts");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResumeData = async (userRawData, jobDescription) => {
  try {
    // 1. Configure Model with JSON Mode (Critical for stability)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Low latency, low cost
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7 // Balance between creativity and strict formatting
      }
    });

    // 2. Build the Prompt
    const prompt = buildResumeMegaPrompt(userRawData, jobDescription);

    // 3. Execute Request
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Safe Parse
    // Even with JSON mode, wrapping in try/catch ensures app doesn't crash on rare malformed data
    try {
      const parsedData = JSON.parse(text);
      return parsedData;
    } catch (parseError) {
      console.error("JSON Parse Error. Raw Text:", text);
      throw new Error("AI response was not valid JSON.");
    }

  } catch (error) {
    console.error("Gemini Service Error:", error.message);
    // Propagate error to controller for graceful HTTP 500 response
    throw error;
  }
};

module.exports = { generateResumeData };