"use client";

import React, { useState } from "react";

export default function Chapter14Simulator() {
  const [exprIdx, setExprIdx] = useState(0);

  const expressions = [
    { 
      raw: "P → Q", 
      dnf: "(¬P ∧ ¬Q) ∨ (¬P ∧ Q) ∨ (P ∧ Q)", 
      cnf: "(¬P ∨ Q)" 
    },
    { 
      raw: "P ↔ Q", 
      dnf: "(P ∧ Q) ∨ (¬P ∧ ¬Q)", 
      cnf: "(¬P ∨ Q) ∧ (P ∨ ¬Q)" 
    },
    { 
      raw: "¬(P ∧ Q)", 
      dnf: "(¬P ∧ ¬Q) ∨ (¬P ∧ Q) ∨ (P ∧ ¬Q)", 
      cnf: "(¬P ∨ ¬Q)" 
    },
    { 
      raw: "P ⊕ Q", 
      dnf: "(P ∧ ¬Q) ∨ (¬P ∧ Q)", 
      cnf: "(P ∨ Q) ∧ (¬P ∨ ¬Q)" 
    }
  ];

  const current = expressions[exprIdx];

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">CNF / DNF Synthesizer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-8">
          <label className="block text-slate-700 font-bold mb-2">Target Propositional Formula</label>
          <div className="flex gap-2">
            {expressions.map((e, idx) => (
              <button
                key={idx}
                onClick={() => setExprIdx(idx)}
                className={`flex-1 py-3 font-mono text-lg transition-all border-2 ${exprIdx === idx ? 'bg-[#00FFFF] text-slate-800 border-cyan-600 shadow-[0_0_5px_#00FFFF]' : 'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100'}`}
              >
                {e.raw}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 border border-slate-200 bg-slate-50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-[#00FFFF]"></div>
             <h4 className="font-bold text-slate-800 mb-1 ml-4 text-xl">Disjunctive Normal Form (DNF)</h4>
             <div className="text-sm text-slate-500 mb-4 ml-4">ORing of ANDed clauses (Sum of Products)</div>
             <div className="font-mono text-xl font-bold text-slate-800 ml-4 p-4 bg-white border border-slate-200 shadow-sm">
                {current.dnf}
             </div>
          </div>

          <div className="p-6 border border-slate-200 bg-slate-50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-slate-800"></div>
             <h4 className="font-bold text-slate-800 mb-1 ml-4 text-xl">Conjunctive Normal Form (CNF)</h4>
             <div className="text-sm text-slate-500 mb-4 ml-4">ANDing of ORed clauses (Product of Sums)</div>
             <div className="font-mono text-xl font-bold text-slate-800 ml-4 p-4 bg-white border border-slate-200 shadow-sm">
                {current.cnf}
             </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-[#ECFEFF] border border-[#00FFFF] text-slate-700">
          <strong>Conversion Algorithm:</strong> To generate CNF, eliminate implications ($\rightarrow$), move negations inward using De Morgan's Laws until they strictly apply to atoms, and then distribute OR over AND.
        </div>
      </div>
    </div>
  );
}
