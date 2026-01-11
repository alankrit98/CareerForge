import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to set the token dynamically
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

// AI Endpoints
export const generateResumeAI = (userRawData, jobDescription) => 
  API.post('/ai/generate', { userRawData, jobDescription });

// Resume Endpoints (Now secured)
export const saveResumeToDB = (resumeData, title) => 
  API.post('/resume/save', { resumeData, title });

export const fetchUserResumes = () => 
  API.get(`/resume/user`); // Endpoint changed: Backend infers ID from token

export const fetchResumeById = (id) => 
  API.get(`/resume/${id}`);

export default API;