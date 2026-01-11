import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ResumeForm from '../components/resume/ResumeForm';
import ScoreCard from '../components/ats/ScoreCard';
import { generateResumeAI } from '../services/api';

const ATSSimulator = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (formData, jobDesc) => {
    setLoading(true);
    try {
      // Reuse the same Mega Prompt API - it already calculates the score!
      const rawData = JSON.stringify(formData);
      const res = await generateResumeAI(rawData, jobDesc);
      if(res.data.success) {
        setAnalysis(res.data.data.atsAnalysis);
      }
    } catch (e) {
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-2">ATS Simulator</h1>
        <p className="text-center text-gray-600 mb-10">Paste your resume and job description to see if you pass the bot.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <ResumeForm onSubmit={handleAnalyze} isLoading={loading} />
          </div>

          {/* Right: Results */}
          <div className="space-y-6">
            {analysis ? (
              <>
                <ScoreCard score={analysis.score} />
                <div className="bg-white p-6 rounded-xl border">
                  <h3 className="font-bold mb-3">Feedback</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{analysis.feedback || "No feedback provided."}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border">
                   <h3 className="font-bold mb-3 text-red-600">Missing Keywords</h3>
                   <div className="flex flex-wrap gap-2">
                     {analysis.missingKeywords?.map(k => (
                       <span key={k} className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">{k}</span>
                     ))}
                   </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl p-10">
                Run an analysis to see your score.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSSimulator;