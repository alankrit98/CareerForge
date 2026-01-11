import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Craft a Resume that <span className="text-blue-600">Beats the ATS</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          AI-powered resume builder and ATS simulator. Get instant feedback and rewrite your bullet points to land more interviews.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/builder" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center gap-2">
            Build Resume <ArrowRight size={20} />
          </Link>
          <Link to="/ats-simulator" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition">
            Test ATS Score
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;