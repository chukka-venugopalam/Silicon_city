"use client";

import React, { useState } from "react";

export default function Chapter15Simulator() {
  const [ruleIdx, setRuleIdx] = useState(0);

  const rules = [
    {
      name: "Modus Ponens",
      premise1: "P → Q",
      premise2: "P",
      conclusion: "Q",
      valid: true,
      desc: "If P implies Q, and P is true, then Q must be true."
    },
    {
      name: "Modus Tollens",
      premise1: "P → Q",
      premise2: "¬Q",
      conclusion: "¬P",
      valid: true,
      desc: "If P implies Q, and Q is false, then P must be false."
    },
    {
      name: "Hypothetical Syllogism",
      premise1: "P → Q",
      premise2: "Q → R",
      conclusion: "P → R",
      valid: true,
      desc: "Chain rule. Transitivity of implication."
    },
    {
      name: "Disjunctive Syllogism",
      premise1: "P ∨ Q",
      premise2: "¬P",
      conclusion: "Q",
      valid: true,
      desc: "If at least one is true, and it's not the first, it must be the second."
    },
    {
      name: "Affirming the Consequent (FALLACY)",
      premise1: "P → Q",
      premise2: "Q",
      conclusion: "P",
      valid: false,
      desc: "INVALID. Just because Q is true doesn't mean P caused it. Q could be true on its own."
    },
    {
      name: "Denying the Antecedent (FALLACY)",
      premise1: "P → Q",
      premise2: "¬P",
      conclusion: "¬Q",
      valid: false,
      desc: "INVALID. P is sufficient for Q, but not necessary. Q could still be true."
    }
  ];

  const current = rules[ruleIdx];

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Logical Deduction Engine</h3>
      
      <div className="bg-white p-6 border border-slate-300 flex flex-col md:flex-row gap-8">
        
        <div className="w-full md:w-1/3 flex flex-col gap-2">
          <div className="font-bold text-slate-700 mb-2">Select Inference Rule:</div>
          {rules.map((rule, idx) => (
            <button
              key={idx}
              onClick={() => setRuleIdx(idx)}
              className={`p-3 text-left font-bold border-l-4 transition-all ${
                ruleIdx === idx 
                  ? 'bg-[#ECFEFF] border-[#00FFFF] text-slate-800' 
                  : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {rule.name}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-slate-50 border border-slate-200 p-8 flex flex-col justify-center relative overflow-hidden">
           
           <div className="text-sm font-bold text-slate-400 mb-4 tracking-widest uppercase">Deduction Proof</div>
           
           <div className="flex items-center gap-6 mb-4 pl-8">
              <div className="font-mono text-2xl font-bold text-slate-800 w-32">Premise 1:</div>
              <div className="font-mono text-3xl font-bold text-[#00FFFF] drop-shadow-[0_0_2px_#00FFFF]">{current.premise1}</div>
           </div>

           <div className="flex items-center gap-6 mb-6 pl-8">
              <div className="font-mono text-2xl font-bold text-slate-800 w-32">Premise 2:</div>
              <div className="font-mono text-3xl font-bold text-[#00FFFF] drop-shadow-[0_0_2px_#00FFFF]">{current.premise2}</div>
           </div>

           <div className="w-full h-1 bg-slate-300 my-4 relative">
             <div className="absolute -left-2 -top-4 font-mono text-4xl text-slate-400">∴</div>
           </div>

           <div className="flex items-center gap-6 mt-6 pl-8">
              <div className="font-mono text-2xl font-bold text-slate-800 w-32">Conclusion:</div>
              <div className={`font-mono text-3xl font-bold ${current.valid ? 'text-green-500' : 'text-red-500'}`}>
                {current.conclusion}
              </div>
           </div>

           <div className={`mt-12 p-4 border-2 font-bold text-lg text-center ${current.valid ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'}`}>
             {current.valid ? '✓ LOGICALLY VALID ARGUMENT' : '⚠ LOGICAL FALLACY DETECTED'}
           </div>

           <div className="mt-4 text-slate-600 italic text-center">
             "{current.desc}"
           </div>

        </div>

      </div>
    </div>
  );
}
