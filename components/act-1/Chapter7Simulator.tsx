"use client";

import React, { useState } from "react";

export default function Chapter7Simulator() {
  const [minterms, setMinterms] = useState<number[]>([]);

  const toggleMinterm = (m: number) => {
    if (minterms.includes(m)) {
      setMinterms(minterms.filter(x => x !== m).sort());
    } else {
      setMinterms([...minterms, m].sort());
    }
  };

  const maxterms = [0, 1, 2, 3, 4, 5, 6, 7].filter(m => !minterms.includes(m));

  const getSOP = () => {
    if (minterms.length === 0) return "0";
    if (minterms.length === 8) return "1";
    
    return minterms.map(m => {
      const bin = m.toString(2).padStart(3, '0');
      return `${bin[0] === '1' ? 'A' : "A'"}${bin[1] === '1' ? 'B' : "B'"}${bin[2] === '1' ? 'C' : "C'"}`;
    }).join(" + ");
  };

  const getPOS = () => {
    if (maxterms.length === 0) return "1";
    if (maxterms.length === 8) return "0";
    
    return maxterms.map(M => {
      const bin = M.toString(2).padStart(3, '0');
      return `(${bin[0] === '0' ? 'A' : "A'"} + ${bin[1] === '0' ? 'B' : "B'"} + ${bin[2] === '0' ? 'C' : "C'"})`;
    }).join(" · ");
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Canonical Form Synthesizer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-6">
          <div className="font-bold text-slate-700 mb-2">Select Minterms ($\Sigma m$) for $f(A,B,C)$:</div>
          <div className="flex gap-2 flex-wrap">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(m => (
              <button
                key={m}
                onClick={() => toggleMinterm(m)}
                className={`w-12 h-12 rounded-sm font-bold transition-all ${
                  minterms.includes(m) 
                    ? 'bg-[#00FFFF] text-slate-800 border-2 border-cyan-600 shadow-[0_0_8px_#00FFFF]' 
                    : 'bg-slate-100 text-slate-500 border-2 border-slate-300 hover:bg-slate-200'
                }`}
              >
                m{m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <div className="p-4 border border-slate-200 bg-slate-50">
            <h4 className="font-bold text-slate-800 mb-2">Sum of Products (SOP)</h4>
            <div className="text-sm text-slate-500 mb-2">$\Sigma m({minterms.join(', ') || '∅'})$</div>
            <div className="font-mono text-cyan-700 font-bold break-words">
              $f = {getSOP()}$
            </div>
          </div>

          <div className="p-4 border border-slate-200 bg-slate-50">
            <h4 className="font-bold text-slate-800 mb-2">Product of Sums (POS)</h4>
            <div className="text-sm text-slate-500 mb-2">$\Pi M({maxterms.join(', ') || '∅'})$</div>
            <div className="font-mono text-cyan-700 font-bold break-words">
              $f = {getPOS()}$
            </div>
          </div>

        </div>

        <div className="mt-6 text-sm text-slate-500 bg-slate-100 p-3 border-l-4 border-slate-400">
          <strong>Observation:</strong> The indices of the Maxterms are exactly the complement of the Minterm indices. $\Sigma m_i = \Pi M_j$ where $j \notin i$.
        </div>

        <button 
          onClick={() => setMinterms([])}
          className="mt-6 py-2 px-4 border border-[#00FFFF] text-slate-700 font-bold hover:bg-[#00FFFF] hover:text-white transition-colors"
        >
          Reset System
        </button>

      </div>
    </div>
  );
}
