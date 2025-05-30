import React, { useState } from "react";
import AudienceFilter from "../components/AudienceFilter";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CampaignCreation() {
  const [rules, setRules] = useState([]);
  const [matchedCount, setMatchedCount] = useState(null);
  const navigate = useNavigate();

  const handleRulesChange = (newRules) => {
    setRules(newRules);
  };

  const handleCheck = async () => {
    if (rules.length === 0) {
      alert("Please enter filter criteria.");
      return;
    }

    try {
      const res = await api.post("/audience-count", { rules });
      setMatchedCount(res.data.matchedCount);
    } catch (error) {
      console.error("Error fetching audience count:", error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleAddCampaign = async () => {
    if (!rules.length || matchedCount === null) {
      alert("Please set filter rules and check audience count before saving.");
      return;
    }

    try {
      await api.post("/campaigns", {
        rules,
        matchedCount: matchedCount,
        createdAt: new Date()
      });

      alert("Campaign saved successfully!");
      navigate("/campaign-history");
    } catch (error) {
      console.error("Error saving campaign: ", error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        alert("Failed to save campaign. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Campaign</h2>
        <p className="text-gray-600">Set up your campaign filters and target audience</p>
      </div>

      <AudienceFilter onRulesChange={handleRulesChange} onCheck={handleCheck} />

      {matchedCount !== null && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium flex items-center">
            <span className="mr-2">👥</span>
            Matched Audience: {matchedCount} users
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={handleAddCampaign}
        >
          Save Campaign
        </button>
        
        <button
          className="px-6 py-3 text-primary-600 bg-white border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() => navigate("/campaign-history")}
        >
          View Campaign History
        </button>
      </div>
    </div>
  );
}