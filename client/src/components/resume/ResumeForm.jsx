import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const ResumeForm = ({ onSubmit, isLoading }) => {
  const [inputMode, setInputMode] = useState('paste'); // 'paste' or 'manual'
  const [pasteText, setPasteText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // We send the "pasteText" as the raw data
    onSubmit({ rawText: pasteText }, jobDescription);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="font-semibold text-blue-800 mb-2">How it works</h2>
        <p className="text-sm text-blue-600">
          Paste your current resume content below. Our AI will analyze it, rewrite bullet points, and format it for ATS compliance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Description (Optional)</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32 text-sm"
            placeholder="Paste the job description here to tailor your resume..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Resume Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Current Resume Content</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-64 font-mono text-sm"
            placeholder="Paste your entire resume text here..."
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !pasteText}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? 'Generating...' : <><Sparkles size={18} /> Generate Resume</>}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;