import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Plus, Calendar } from "lucide-react";
import { fetchUserResumes } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const res = await fetchUserResumes(user.id);
        if (res.data.success) setResumes(res.data.data);
      } catch (error) {
        console.error("Failed to load resumes");
      } finally {
        setLoading(false);
      }
    };
    if (user) loadResumes();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Resumes</h1>
        <Link
          to="/builder"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} /> Create New
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Link
              to={`/builder/${resume._id}`} // Link to the specific ID
              key={resume._id}
              className="bg-white p-5 rounded-xl border hover:shadow-md transition cursor-pointer block" // Added 'block'
            >
              {/* ... Card Content (Icon, Title, Date) ... */}
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  <FileText size={24} />
                </div>
                {resume.atsAnalysis?.score > 0 && (
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                    ATS: {resume.atsAnalysis.score}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">
                {resume.title || "Untitled Resume"}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={14} />{" "}
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
