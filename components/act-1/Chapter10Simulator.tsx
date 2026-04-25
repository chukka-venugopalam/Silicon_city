"use client";

import React, { useState } from "react";

export default function Chapter10Simulator() {
  const [delayAND, setDelayAND] = useState(2);
  const [delayOR, setDelayOR] = useState(3);
  const [delayNOT, setDelayNOT] = useState(1);

  // Critical path calculation
  const path1Delay = delayNOT + delayAND + delayOR; // A -> NOT -> AND -> OR
  const path2Delay = delayAND + delayOR; // B -> AND -> OR
  const path3Delay = delayOR; // C -> OR
  
  const criticalPath = Math.max(path1Delay, path2Delay, path3Delay);

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Critical Path Delay Analyzer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">NOT Gate Delay (ns)</label>
            <input type="number" min="0" value={delayNOT} onChange={e => setDelayNOT(Number(e.target.value) || 0)} className="w-full p-2 border border-slate-300" />
          </div>
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">AND Gate Delay (ns)</label>
            <input type="number" min="0" value={delayAND} onChange={e => setDelayAND(Number(e.target.value) || 0)} className="w-full p-2 border border-slate-300" />
          </div>
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">OR Gate Delay (ns)</label>
            <input type="number" min="0" value={delayOR} onChange={e => setDelayOR(Number(e.target.value) || 0)} className="w-full p-2 border border-slate-300" />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-8 flex flex-col items-center relative overflow-hidden">
          
          <svg className="w-full h-64" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
              </marker>
            </defs>

            {/* Inputs */}
            <text x="20" y="55" fontSize="16" fontWeight="bold" fill="#334155">A</text>
            <text x="20" y="105" fontSize="16" fontWeight="bold" fill="#334155">B</text>
            <text x="20" y="165" fontSize="16" fontWeight="bold" fill="#334155">C</text>

            {/* Wires */}
            <line x1="40" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="2" />
            <line x1="160" y1="50" x2="250" y2="50" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="100" x2="250" y2="100" stroke="#334155" strokeWidth="2" />
            
            <line x1="330" y1="75" x2="420" y2="75" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="160" x2="420" y2="160" stroke="#334155" strokeWidth="2" />
            <line x1="500" y1="117" x2="560" y2="117" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="570" y="122" fontSize="16" fontWeight="bold" fill="#334155">Y</text>

            {/* NOT Gate */}
            <polygon points="100,30 150,50 100,70" fill="white" stroke="#334155" strokeWidth="2" />
            <circle cx="155" cy="50" r="5" fill="white" stroke="#334155" strokeWidth="2" />
            <text x="110" y="85" fontSize="12" fill="#64748b">{delayNOT}ns</text>

            {/* AND Gate */}
            <path d="M 250,30 L 290,30 A 45,45 0 0,1 290,120 L 250,120 Z" fill="white" stroke="#334155" strokeWidth="2" />
            <text x="260" y="140" fontSize="12" fill="#64748b">{delayAND}ns</text>

            {/* OR Gate */}
            <path d="M 420,50 Q 450,117 420,185 Q 470,185 500,117 Q 470,50 420,50 Z" fill="white" stroke="#334155" strokeWidth="2" />
            <text x="440" y="200" fontSize="12" fill="#64748b">{delayOR}ns</text>

          </svg>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="p-4 border border-slate-200">
             <h4 className="font-bold text-slate-800 mb-2">Path Analysis</h4>
             <ul className="text-sm text-slate-600 space-y-2">
               <li><strong>Path A $\rightarrow$ Y:</strong> NOT + AND + OR = {delayNOT} + {delayAND} + {delayOR} = <span className="font-bold">{path1Delay}ns</span></li>
               <li><strong>Path B $\rightarrow$ Y:</strong> AND + OR = {delayAND} + {delayOR} = <span className="font-bold">{path2Delay}ns</span></li>
               <li><strong>Path C $\rightarrow$ Y:</strong> OR = {delayOR} = <span className="font-bold">{path3Delay}ns</span></li>
             </ul>
          </div>
          
          <div className={`p-4 border-2 flex flex-col items-center justify-center transition-all ${criticalPath > 0 ? 'bg-[#ECFEFF] border-[#00FFFF] shadow-[0_0_10px_#00FFFF]' : 'bg-slate-50 border-slate-200'}`}>
             <div className="text-slate-500 font-bold mb-2">System Critical Path Delay</div>
             <div className="text-4xl font-bold text-slate-800">{criticalPath}ns</div>
             <div className="text-xs text-slate-500 mt-2">{`Maximum frequency $f_{max} = 1 / ${criticalPath}\\text{ns}$`}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
