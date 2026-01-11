# 🚀 CareerForge
AI-Powered Resume Builder & ATS Simulator

CareerForge is a full-stack AI application that helps users craft professional resumes and optimizes them for Applicant Tracking Systems (ATS). Powered by Google Gemini, it analyzes content, rewrites bullet points, provides real-time scoring, and enables one-click PDF exports.

---

## 🛠 Tech Stack
### Frontend:

**Framework:** React (Vite)

**Styling:** Tailwind CSS

**Icons:** Lucide-React

**Auth:** Clerk (React SDK)

**HTTP Client:** Axios

### Backend:

**Runtime:** Node.js

**Framework:** Express.js

**Database:** MongoDB (Mongoose)

**AI Model:** Google Gemini 2.5 Flash (via Google Generative AI SDK)

**Auth:** Clerk (Node SDK)

---

## ✨ Key Features
- **🤖 AI Resume Writer:** Uses a "Mega Prompt" architecture to parse raw text, rewrite content using the STAR method, and format it into a structured JSON resume in a single API call.

- **📊 ATS Simulator:** Scores resumes (0-100) against target job descriptions and identifies missing keywords and formatting issues.

- **📝 Live Preview:** Split-screen interface with real-time JSON-to-PDF visualization.

- **💾 Dashboard:** Securely save, edit, and manage multiple resume versions (stored in MongoDB).

- **🔒 Secure Auth:** Full authentication flow (Sign Up/Login) powered by Clerk.

- **mypdf:** Built-in browser print styling for clean PDF downloads.

---

## 📂 Project Structure
```
career-forge/
├── client/             # React Frontend (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, ResumeForm, Preview)
│   │   ├── pages/      # Builder, Dashboard, Home, ATS Simulator
│   │   └── services/   # API logic (Axios + Clerk Token)
│   └── ...
├── server/             # Node.js Backend
│   ├── controllers/    # AI Logic & Resume CRUD
│   ├── models/         # Mongoose Schemas (User, Resume)
│   ├── routes/         # Express Routes
│   ├── services/       # Gemini AI integration
│   └── index.js        # Entry point
└── README.md
```

## 🚀 Getting Started
Follow these steps to run the project locally.

### 1. Prerequisites
```
Node.js (v18+)

MongoDB Account (Atlas or Local)

Google Gemini API Key

Clerk Account (for Auth)
```

### 2. Clone the Repository
```
git clone https://github.com/yourusername/career-forge.git
cd career-forge
```

### 3. Backend Setup
```
cd server
npm install

Create a .env file in the server folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

Start the Server: npm run dev
# Server runs on http://localhost:5000
```

### 4. Frontend Setup
```
Open a new terminal.
cd client
npm install

Create a .env file in the client folder:
VITE_API_URL=http://localhost:5000/api/v1
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Start the Client: npm run dev
# Application runs on http://localhost:5173
```

---

## 📖 Usage Guide
- **Sign In:** Create an account using the Clerk authentication on the homepage.

- **Dashboard:** View your saved resumes or create a new one.

- **Builder:**

  - **Input:** Paste your old resume text or fill in details manually.

  - **Job Description:** (Optional) Paste a JD to tailor the resume.

- **Generate:** Click the button to let Gemini AI rewrite and format your data.

- **Edit & Save:** The AI output is editable. Save your progress to the database.

- **Export:** Click the PDF button to download a clean, ATS-friendly PDF.

---

## 🛡 API & Safety (Gemini)
- This project uses a "Mega Prompt" Strategy to optimize for the Gemini Free Tier:

- It bundles Parsing, Rewriting, and Scoring into a single API request.

- It utilizes responseMimeType: "application/json" to ensure strict structured output.

- Error handling catches 429 (Rate Limit) errors gracefully.

---

## 🤝 Contributing
Contributions are welcome!

Fork the repository.

Create a feature branch (git checkout -b feature/NewFeature).

Commit your changes.

Push to the branch.

Open a Pull Request.

---

## 📄 License
This project is licensed under the (MIT License)[MIT LICENSE].
