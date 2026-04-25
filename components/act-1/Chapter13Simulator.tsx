"use client";

import React, { useState } from "react";

export default function Chapter13Simulator() {
  const [step, setStep] = useState(0);

  const proofSteps = [
    { expr: "¬(P ∨ (¬P ∧ Q))", law: "Initial Expression" },
    { expr: "¬P ∧ ¬(¬P ∧ Q)", law: "De Morgan's Law (on outer NOT)" },
    { expr: "¬P ∧ (¬(¬P) ∨ ¬Q)", law: "De Morgan's Law (on inner AND)" },
    { expr: "¬P ∧ (P ∨ ¬Q)", law: "Double Negation" },
    { expr: "(¬P ∧ P) ∨ (¬P ∧ ¬Q)", law: "Distributive Law" },
    { expr: "F ∨ (¬P ∧ ¬Q)", law: "Contradiction (¬P ∧ P = F)" },
    { expr: "¬P ∧ ¬Q", law: "Identity Law (F ∨ X = X)" }
  ];

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Logical Equivalence Simplifier</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex justify-between items-center mb-8">
          <div className="font-bold text-slate-700">Target: Show $\neg(P \lor (\neg P \land Q)) \equiv \neg P \land \neg Q$</div>
          <button 
            onClick={() => setStep(0)}
            className="text-sm px-4 py-2 border border-slate-300 hover:bg-slate-100"
          >
            Reset Proof
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 min-h-[400px]">
          {proofSteps.slice(0, step + 1).map((s, idx) => (
            <div key={idx} className={`mb-6 transition-opacity duration-500 ${idx === step ? 'opacity-100 scale-105 origin-left' : 'opacity-60'}`}>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                   {idx + 1}
                 </div>
                 <div className="flex-1">
                   <div className="font-mono text-xl text-slate-800 font-bold mb-1">
                     {s.expr}
                   </div>
                   <div className="text-sm font-bold text-[#00FFFF] bg-slate-800 px-2 py-1 inline-block">
                     By: {s.law}
                   </div>
                 </div>
              </div>
              {idx < proofSteps.length - 1 && idx !== step && (
                <div className="w-px h-6 bg-slate-300 ml-4 mt-2"></div>
              )}
            </div>
          ))}

          {step === proofSteps.length - 1 && (
            <div className="mt-8 p-4 bg-[#ECFEFF] border border-[#00FFFF] text-center text-xl font-bold text-slate-800 shadow-[0_0_15px_#00FFFF]">
               Q.E.D. Proof Complete.
            </div>
          )}
        </div>

        <button 
          onClick={() => setStep(prev => Math.min(prev + 1, proofSteps.length - 1))}
          disabled={step === proofSteps.length - 1}
          className="mt-6 w-full py-4 bg-slate-800 text-white font-bold hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === proofSteps.length - 1 ? "Simplification Reached" : "Apply Next Logical Law"}
        </button>

      </div>
    </div>
  );
}
