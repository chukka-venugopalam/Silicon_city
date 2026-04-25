"use client";

import React, { useState } from "react";

export default function Chapter12Simulator() {
  const [expressionIndex, setExpressionIndex] = useState(0);

  const expressions = [
    { label: "P ∨ ¬P", type: "TAUTOLOGY", logic: (p: number, q: number) => p | (p === 0 ? 1 : 0) },
    { label: "P ∧ ¬P", type: "CONTRADICTION", logic: (p: number, q: number) => p & (p === 0 ? 1 : 0) },
    { label: "P → (P ∨ Q)", type: "TAUTOLOGY", logic: (p: number, q: number) => (!p || (p | q)) ? 1 : 0 },
    { label: "(P → Q) ∧ P ∧ ¬Q", type: "CONTRADICTION", logic: (p: number, q: number) => (((!p || q) ? 1 : 0) & p & (q === 0 ? 1 : 0)) },
    { label: "P → Q", type: "CONTINGENCY", logic: (p: number, q: number) => (!p || q) ? 1 : 0 },
  ];

  const currentExpr = expressions[expressionIndex];

  const renderTable = () => {
    const rows = [
      { p: 0, q: 0 },
      { p: 0, q: 1 },
      { p: 1, q: 0 },
      { p: 1, q: 1 },
    ];

    let hasTrue = false;
    let hasFalse = false;

    const results = rows.map(row => {
      const res = currentExpr.logic(row.p, row.q);
      if (res === 1) hasTrue = true;
      if (res === 0) hasFalse = true;
      return res;
    });

    let detectedType = "CONTINGENCY";
    let colorClass = "text-amber-500 border-amber-500 bg-amber-50";
    if (hasTrue && !hasFalse) {
      detectedType = "TAUTOLOGY (Valid)";
      colorClass = "text-[#00FFFF] border-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]";
    } else if (!hasTrue && hasFalse) {
      detectedType = "CONTRADICTION (Unsatisfiable)";
      colorClass = "text-red-500 border-red-500 bg-red-50";
    }

    return (
      <div className="flex flex-col gap-6">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-300">
              <th className="p-3 border-r border-slate-300 text-slate-700 font-bold w-1/4">P</th>
              <th className="p-3 border-r border-slate-300 text-slate-700 font-bold w-1/4">Q</th>
              <th className="p-3 text-[#00FFFF] font-bold w-1/2 bg-slate-800">
                {currentExpr.label}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-200 hover:bg-[#ECFEFF] transition-colors">
                <td className="p-3 border-r border-slate-300 font-mono text-lg">{row.p}</td>
                <td className="p-3 border-r border-slate-300 font-mono text-lg">{row.q}</td>
                <td className={`p-3 font-mono text-xl font-bold ${results[idx] === 1 ? 'text-[#00FFFF] bg-slate-800' : 'text-slate-400'}`}>
                  {results[idx]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`p-6 border-4 font-bold text-2xl transition-all text-center uppercase tracking-widest ${colorClass}`}>
          {detectedType}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Satisfiability & Tautology Analyzer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-6">
          <label className="block text-slate-700 font-bold mb-2">Select Propositional Formula:</label>
          <select 
            className="w-full p-3 border border-slate-300 text-slate-800 focus:outline-none focus:border-[#00FFFF]"
            value={expressionIndex}
            onChange={(e) => setExpressionIndex(Number(e.target.value))}
          >
            {expressions.map((expr, idx) => (
              <option key={idx} value={idx}>{expr.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden">
          {renderTable()}
        </div>

        <div className="mt-8 text-sm text-slate-600 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border border-slate-200">
            <h4 className="font-bold text-[#00FFFF] mb-1 bg-slate-800 p-1">TAUTOLOGY</h4>
            <p>True for all possible truth assignments. (Valid)</p>
          </div>
          <div className="p-4 border border-slate-200">
            <h4 className="font-bold text-red-500 mb-1 bg-red-50 p-1">CONTRADICTION</h4>
            <p>False for all possible truth assignments. (Unsatisfiable)</p>
          </div>
          <div className="p-4 border border-slate-200">
            <h4 className="font-bold text-amber-500 mb-1 bg-amber-50 p-1">CONTINGENCY</h4>
            <p>True in some cases, false in others. (Satisfiable but not valid)</p>
          </div>
        </div>

      </div>
    </div>
  );
}
