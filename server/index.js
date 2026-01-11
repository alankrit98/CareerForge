require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const aiRoutes = require('./routes/aiRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Allow Frontend to hit Backend
app.use(express.json()); // Parse JSON bodies

// 2. Database Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB Connected'))
//   .catch((err) => console.error('❌ MongoDB Connection Error:', err));
connectDB();

// 3. Routes
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/resume', resumeRoutes);

// 4. Health Check (Critical for Vercel)
app.get('/', (req, res) => {
  res.send('CareerForge Backend is Running!');
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});