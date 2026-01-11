import React, { useState, useEffect } from "react";
import { Loader2, Save, Download, ArrowLeft } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ResumeForm from "../components/resume/ResumeForm";
import ResumePreview from "../components/resume/ResumePreview";
import { generateResumeAI, saveResumeToDB } from "../services/api";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "@clerk/clerk-react";
import { setAuthToken, fetchResumeById } from "../services/api";

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null); // Stores the AI JSON
  const [atsScore, setAtsScore] = useState(null);
  const { getToken, isSignedIn } = useAuth();

  // 1. LOAD RESUME ON MOUNT (If ID exists)
  useEffect(() => {
    const loadResume = async () => {
      if (!id || !isSignedIn) return;

      try {
        setLoading(true);
        const token = await getToken();
        setAuthToken(token);

        const res = await fetchResumeById(id);
        if (res.data.success) {
          setResumeData(res.data.data); // Use the saved data
          // atsAnalysis is stored inside the resume object in DB
          if (res.data.data.atsAnalysis) {
            setAtsScore(res.data.data.atsAnalysis);
          }
        }
      } catch (error) {
        console.error("Failed to load resume", error);
        alert("Could not load resume.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [id, isSignedIn, getToken, navigate]);

  // 2. DOWNLOAD FUNCTION
  const handleDownload = () => {
    window.print(); // Triggers browser print (Save as PDF)
  };

  // Triggered when user hits "Generate" on the form
  const handleGenerate = async (formData, jobDesc) => {
    setLoading(true);
    try {
      // 1. Convert form object to string for the "Mega Prompt"
      const rawData = JSON.stringify(formData);

      // 2. Call API
      const response = await generateResumeAI(rawData, jobDesc);

      // 3. Update State with AI Response
      if (response.data.success) {
        setResumeData(response.data.data); // The "Mega JSON"
        setAtsScore(response.data.data.atsAnalysis);
      }
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isSignedIn) return alert("Please sign in to save.");

    try {
      const token = await getToken();
      setAuthToken(token); // Attach token to Axios

      await saveResumeToDB(resumeData, "My Generated Resume");
      alert("Saved!");
    } catch (e) {
      console.error(e);
      alert("Save failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onSave={handleSave} isResumeLoaded={!!resumeData} />
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            <ArrowLeft />
          </Link>
          <h1 className="text-xl font-bold text-blue-600">
            {id ? "Edit Resume" : "New Resume"}
          </h1>
        </div>

        <div className="flex gap-2">
          {resumeData && (
            <>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
              >
                <Download size={18} /> PDF
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                <Save size={18} /> Save
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content: Split Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Input Section */}
        <div className="w-1/2 p-6 overflow-y-auto border-r bg-white">
          <ResumeForm onSubmit={handleGenerate} isLoading={loading} />
        </div>

        {/* RIGHT: Preview Section */}
        <div className="w-1/2 p-6 overflow-y-auto bg-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Loader2 className="animate-spin mb-4" size={48} />
              <p>AI is analyzing and rewriting your resume...</p>
            </div>
          ) : resumeData ? (
            <ResumePreview data={resumeData} atsScore={atsScore} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Fill out the form to generate your resume.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
