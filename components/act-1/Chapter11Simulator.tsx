"use client";

import React, { useState } from "react";

export default function Chapter11Simulator() {
  const [operator, setOperator] = useState("AND");

  const renderTable = () => {
    const rows = [
      { p: 0, q: 0 },
      { p: 0, q: 1 },
      { p: 1, q: 0 },
      { p: 1, q: 1 },
    ];

    const getResult = (p: number, q: number) => {
      switch (operator) {
        case "AND": return p & q;
        case "OR": return p | q;
        case "IMPLIES": return (!p || q) ? 1 : 0;
        case "IFF": return (p === q) ? 1 : 0;
        case "XOR": return p ^ q;
        default: return 0;
      }
    };

    return (
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-slate-100 border-b-2 border-slate-300">
            <th className="p-3 border-r border-slate-300 text-slate-700 font-bold w-1/3">P</th>
            <th className="p-3 border-r border-slate-300 text-slate-700 font-bold w-1/3">Q</th>
            <th className="p-3 text-[#00FFFF] font-bold w-1/3 bg-slate-800">
              {operator === "AND" && "P ∧ Q"}
              {operator === "OR" && "P ∨ Q"}
              {operator === "IMPLIES" && "P → Q"}
              {operator === "IFF" && "P ↔ Q"}
              {operator === "XOR" && "P ⊕ Q"}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-200 hover:bg-[#ECFEFF] transition-colors">
              <td className="p-3 border-r border-slate-300 font-mono text-lg">{row.p}</td>
              <td className="p-3 border-r border-slate-300 font-mono text-lg">{row.q}</td>
              <td className="p-3 font-mono text-xl font-bold text-slate-800">
                {getResult(row.p, row.q)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Propositional Truth Generator</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {["AND", "OR", "IMPLIES", "IFF", "XOR"].map(op => (
            <button
              key={op}
              onClick={() => setOperator(op)}
              className={`py-2 px-6 font-bold border-2 transition-all ${operator === op ? 'bg-[#00FFFF] text-slate-800 border-cyan-600 shadow-[0_0_5px_#00FFFF]' : 'bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-200'}`}
            >
              {op}
            </button>
          ))}
        </div>

        <div className="overflow-hidden border border-slate-300 rounded-sm">
          {renderTable()}
        </div>

        <div className="mt-8 p-4 bg-slate-50 border-l-4 border-[#00FFFF] text-slate-700">
          <strong>Logical Signature:</strong> 
          {operator === "AND" && " Conjunction. True only when both P and Q are true."}
          {operator === "OR" && " Disjunction. False only when both P and Q are false."}
          {operator === "IMPLIES" && " Implication. False ONLY when P is true and Q is false (Broken Promise)."}
          {operator === "IFF" && " Biconditional. True only when P and Q have identical truth values."}
          {operator === "XOR" && " Exclusive OR. True only when P and Q have different truth values."}
        </div>

      </div>
    </div>
  );
}
