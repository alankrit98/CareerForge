import React from 'react';
import { Briefcase, Save, LayoutDashboard } from 'lucide-react'; // Added LayoutDashboard icon
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const Navbar = ({ onSave, isResumeLoaded }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Briefcase className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          CareerForge
        </span>
      </Link>

      <div className="flex items-center gap-6"> {/* Increased gap for better spacing */}
        
        {/* Navigation Links for Logged In Users */}
        <SignedIn>
          <Link 
            to="/dashboard" 
            className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          
          {/* Save Button (Only in Builder) */}
          {isResumeLoaded && (
            <button 
              onClick={onSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition shadow-sm font-medium text-sm"
            >
              <Save size={16} /> Save Resume
            </button>
          )}

          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-gray-600 font-medium hover:text-blue-600">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;