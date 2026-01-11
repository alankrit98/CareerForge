import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ResumePreview = ({ data, atsScore }) => {
  const { personalInfo, experience, skills, projects } = data;

  return (
    <div className="space-y-6">
      
      {/* ATS Score Card */}
      {atsScore && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">ATS Analysis</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${atsScore.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              Score: {atsScore.score}/100
            </span>
          </div>
          {atsScore.missingKeywords && atsScore.missingKeywords.length > 0 && (
            <div className="text-sm">
              <p className="font-semibold text-red-500 flex items-center gap-1">
                <AlertCircle size={14}/> Missing Keywords:
              </p>
              <p className="text-gray-600 mt-1">{atsScore.missingKeywords.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      {/* The Resume Paper */}
      <div className="bg-white shadow-lg p-8 min-h-[800px] w-full mx-auto" id="resume-preview">
        {/* Header */}
        <div className="text-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo?.fullName || "Your Name"}</h1>
          <div className="text-sm text-gray-600 mt-2 space-x-3">
             <span>{personalInfo?.email}</span>
             <span>|</span>
             <span>{personalInfo?.phone}</span>
             {personalInfo?.linkedin && (
                <><span>|</span><span>{personalInfo.linkedin}</span></>
             )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
           <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Professional Summary</h2>
           <p className="text-sm text-gray-700 leading-relaxed">{personalInfo?.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3">Experience</h2>
          <div className="space-y-4">
            {experience?.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold text-gray-700 italic">{exp.company}</p>
                <ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-700 space-y-1">
                  {exp.description?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
           <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
           <div className="flex flex-wrap gap-2 text-sm text-gray-700">
             {skills?.join(' • ')}
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResumePreview;