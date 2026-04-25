"use client";

import React, { useState } from "react";

export default function Chapter16Simulator() {
  const [predicate, setPredicate] = useState("EVEN");
  
  const domain = [1, 2, 3, 4, 5];

  const evalPredicate = (x: number) => {
    if (predicate === "EVEN") return x % 2 === 0;
    if (predicate === "GT2") return x > 2;
    if (predicate === "LT6") return x < 6;
    return false;
  };

  const results = domain.map(x => ({ val: x, truth: evalPredicate(x) }));
  
  const forAll = results.every(r => r.truth);
  const exists = results.some(r => r.truth);

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">First-Order Logic Domain Mapper</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-4 items-center mb-8 bg-slate-50 p-4 border border-slate-200">
          <div className="font-bold text-slate-700">Domain D = {'{'}1, 2, 3, 4, 5{'}'}</div>
          <div className="w-px h-8 bg-slate-300 mx-4"></div>
          <div className="font-bold text-slate-700 mr-2">Predicate P(x) is:</div>
          <select 
            className="p-2 border border-slate-300 text-slate-800"
            value={predicate}
            onChange={e => setPredicate(e.target.value)}
          >
            <option value="EVEN">$x$ is an even number</option>
            <option value="GT2">{'$x > 2$'}</option>
            <option value="LT6">{'$x < 6$'}</option>
          </select>
        </div>

        <div className="flex gap-2 justify-between mb-12">
          {results.map(r => (
            <div key={r.val} className={`flex-1 p-4 border-2 text-center transition-all ${r.truth ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-slate-50'}`}>
               <div className="text-xl font-bold text-slate-800 mb-2">$x = {r.val}$</div>
               <div className={`font-bold ${r.truth ? 'text-cyan-600' : 'text-slate-400'}`}>
                 {r.truth ? 'TRUE' : 'FALSE'}
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          
          <div className="border border-slate-300 relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#00FFFF]"></div>
             <div className="p-6">
               <h4 className="font-bold text-slate-800 text-2xl mb-2">Universal Quantifier</h4>
               <div className="font-mono text-xl text-slate-500 mb-6">∀ x in D, P(x)</div>
               
               <div className={`p-4 font-bold text-xl text-center border-2 ${forAll ? 'bg-[#ECFEFF] border-[#00FFFF] text-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'bg-red-50 border-red-500 text-red-600'}`}>
                 {forAll ? 'TRUE' : 'FALSE'}
               </div>
               <div className="text-sm text-slate-500 mt-4 text-center">
                 True ONLY if P(x) is true for EVERY element in D. Evaluates as P(1) ∧ P(2) ∧ ... ∧ P(5).
               </div>
             </div>
          </div>

          <div className="border border-slate-300 relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-violet-500"></div>
             <div className="p-6">
               <h4 className="font-bold text-slate-800 text-2xl mb-2">Existential Quantifier</h4>
               <div className="font-mono text-xl text-slate-500 mb-6">∃ x in D, P(x)</div>
               
               <div className={`p-4 font-bold text-xl text-center border-2 ${exists ? 'bg-violet-50 border-violet-500 text-violet-600 shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'bg-red-50 border-red-500 text-red-600'}`}>
                 {exists ? 'TRUE' : 'FALSE'}
               </div>
               <div className="text-sm text-slate-500 mt-4 text-center">
                 True if P(x) is true for AT LEAST ONE element in D. Evaluates as P(1) ∨ P(2) ∨ ... ∨ P(5).
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
