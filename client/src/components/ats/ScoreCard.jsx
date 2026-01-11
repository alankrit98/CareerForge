import React from 'react';

const ScoreCard = ({ score }) => {
  let color = 'text-red-600';
  let bgColor = 'bg-red-50';
  let label = 'Needs Improvement';

  if (score >= 80) {
    color = 'text-green-600';
    bgColor = 'bg-green-50';
    label = 'Excellent';
  } else if (score >= 60) {
    color = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    label = 'Good';
  }

  return (
    <div className={`p-6 rounded-xl border ${bgColor} text-center`}>
      <h3 className="text-gray-600 font-medium mb-2 uppercase text-xs tracking-wider">ATS Match Score</h3>
      <div className={`text-5xl font-bold mb-2 ${color}`}>
        {score}%
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-bold border ${color.replace('text', 'border')} ${color} bg-white`}>
        {label}
      </span>
    </div>
  );
};

export default ScoreCard;