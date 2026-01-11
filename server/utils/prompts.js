/**
 * Constructs the Mega Prompt for Resume Generation & ATS Scoring
 * @param {string} userRawData - The unstructured text/JSON from the user
 * @param {string} jobDescription - (Optional) The target JD text
 * @returns {string} - The prompt for Gemini
 */
const buildResumeMegaPrompt = (userRawData, jobDescription) => {
  return `
    You are an expert Resume Writer and ATS (Applicant Tracking System) Specialist.
    
    ### TASK:
    1. Parse the user's raw input data.
    2. Optimize the content: Rewrite bullet points using the "STAR" method (Situation, Task, Action, Result). Quantify results where possible.
    3. If a Job Description is provided, tailor the resume to it.
    4. Calculate an ATS Match Score (0-100) based on the JD.
    
    ### INPUTS:
    - User Data: "${userRawData}"
    - Job Description: "${jobDescription || 'General Industry Standard'}"
    
    ### OUTPUT SCHEMA (Strict JSON):
    You must return a JSON object that matches this structure exactly:
    {
      "personalInfo": { "fullName": "", "summary": "Strong professional summary..." },
      "experience": [
        { 
          "company": "", "role": "", "startDate": "", "endDate": "", 
          "description": ["Action verb + task + result (quantified)"] 
        }
      ],
      "skills": ["Skill1", "Skill2"],
      "atsAnalysis": {
        "score": 0,
        "missingKeywords": ["keyword1", "keyword2"],
        "feedback": "Brief advice on how to improve..."
      }
    }
  `;
};

module.exports = { buildResumeMegaPrompt };