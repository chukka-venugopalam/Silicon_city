"use client";

import React, { useState } from "react";

export default function Chapter18Simulator() {
  const [selectedAns, setSelectedAns] = useState<number | null>(null);

  const scenario = {
    english: "Every student likes at least one subject.",
    predicates: [
      "S(x): x is a student",
      "C(y): y is a subject",
      "L(x, y): x likes y"
    ],
    options: [
      { id: 1, fol: "∀x ( S(x) ∧ ∃y (C(y) ∧ L(x, y)) )", correct: false, reason: "Uses AND with ∀. This means 'Everything in the universe is a student AND they like a subject.' This is way too strong." },
      { id: 2, fol: "∀x ( S(x) → ∃y (C(y) ∧ L(x, y)) )", correct: true, reason: "Correct! 'For all x, if x is a student, then there exists a y such that y is a subject AND x likes y.'" },
      { id: 3, fol: "∃y ( C(y) ∧ ∀x (S(x) → L(x, y)) )", correct: false, reason: "Reversed quantifiers. This means 'There is ONE specific subject that EVERY student likes.'" },
      { id: 4, fol: "∀x ( S(x) → ∃y (C(y) → L(x, y)) )", correct: false, reason: "Uses IMPLIES with ∃. This is vacuously true if there is even one thing in the universe that is NOT a subject." }
    ]
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Linguistic to Formal Translation Sandbox</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="p-6 bg-[#ECFEFF] border border-[#00FFFF] mb-8">
           <h4 className="font-bold text-slate-500 mb-2 text-sm uppercase tracking-widest">Natural Language Source</h4>
           <div className="text-2xl font-bold text-slate-800 italic">"{scenario.english}"</div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-1/3">
             <h4 className="font-bold text-slate-800 mb-4">Available Predicates:</h4>
             <ul className="space-y-3 font-mono text-slate-600 bg-slate-50 p-4 border border-slate-200">
               {scenario.predicates.map((p, idx) => (
                 <li key={idx} className="border-b border-slate-200 pb-2 last:border-0 last:pb-0">{p}</li>
               ))}
             </ul>
          </div>

          <div className="flex-1">
             <h4 className="font-bold text-slate-800 mb-4">Select Valid FOL Translation:</h4>
             <div className="space-y-3">
               {scenario.options.map((opt) => {
                 const isSelected = selectedAns === opt.id;
                 let btnClass = "border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700";
                 
                 if (isSelected) {
                   btnClass = opt.correct 
                     ? "border-green-500 bg-green-50 text-green-800 shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
                     : "border-red-500 bg-red-50 text-red-800 shadow-[0_0_10px_rgba(239,68,68,0.3)]";
                 }

                 return (
                   <div key={opt.id}>
                     <button
                       onClick={() => setSelectedAns(opt.id)}
                       className={`w-full p-4 font-mono text-lg text-left border-2 transition-all font-bold ${btnClass}`}
                     >
                       {opt.fol}
                     </button>
                     {isSelected && (
                       <div className={`p-3 mt-1 text-sm font-bold border-l-4 ${opt.correct ? 'border-green-500 text-green-700 bg-green-100' : 'border-red-500 text-red-700 bg-red-100'}`}>
                         {opt.reason}
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
