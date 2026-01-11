import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import ATSSimulator from './pages/ATSSimulator';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          
          {/* Builder has its own internal Navbar logic, so we might render it inside the page */}
          <Route path="/builder/:id?" element={<Builder />} />
          
          <Route path="/ats-simulator" element={<ATSSimulator />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;