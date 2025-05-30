import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CampaignCreation from "./pages/CampaignCreation";
import CampaignHistory from "./pages/CampaignHistory";
import Login from "./pages/Login";  // Login component import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">Mini CRM</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<CampaignCreation />} />
            <Route path="/campaign-history" element={<CampaignHistory />} />
            <Route path="/login" element={<Login />} /> {/* Login route added */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
