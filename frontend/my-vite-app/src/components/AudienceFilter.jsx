import React, { useState, useEffect } from "react";

export default function AudienceFilter({ onRulesChange, onCheck }) {
  const [spendOperator, setSpendOperator] = useState(">");
  const [spendValue, setSpendValue] = useState("");
  const [visitOperator, setVisitOperator] = useState(">");
  const [visitValue, setVisitValue] = useState("");

  const updateRules = () => {
    const rules = [];
    if (spendValue) {
      rules.push({ field: "spend", operator: spendOperator, value: Number(spendValue) });
    }
    if (visitValue) {
      rules.push({ field: "visits", operator: visitOperator, value: Number(visitValue) });
    }
    onRulesChange(rules);
  };

  useEffect(() => {
    updateRules();
  }, [spendOperator, spendValue, visitOperator, visitValue]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Audience Filter</h3>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-sm font-medium text-gray-700 min-w-[80px]">Spend:</label>
            <select 
              value={spendOperator}
              onChange={(e) => setSpendOperator(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 bg-white focus:ring-primary-500 focus:border-primary-500"
            >
              <option value=">">Greater than</option>
              <option value="<">Less than</option>
              <option value="=">Equal to</option>
            </select>
            <input
              type="number"
              value={spendValue}
              onChange={(e) => setSpendValue(e.target.value)}
              placeholder="Enter spend value"
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="text-sm font-medium text-gray-700 min-w-[80px]">Visits:</label>
            <select 
              value={visitOperator}
              onChange={(e) => setVisitOperator(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 bg-white focus:ring-primary-500 focus:border-primary-500"
            >
              <option value=">">Greater than</option>
              <option value="<">Less than</option>
              <option value="=">Equal to</option>
            </select>
            <input
              type="number"
              value={visitValue}
              onChange={(e) => setVisitValue(e.target.value)}
              placeholder="Enter visit value"
              className="rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-primary-500 focus:border-primary-500 flex-1"
            />
          </div>
        </div>

        <button 
          onClick={onCheck}
          className="mt-6 w-full md:w-auto px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Check Audience
        </button>
      </div>
    </div>
  );
}