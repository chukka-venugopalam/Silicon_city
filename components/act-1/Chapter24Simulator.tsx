"use client";

import React, { useState } from "react";

export default function Chapter24Simulator() {
  const [s, setS] = useState(0);
  const [r, setR] = useState(0);
  const [q, setQ] = useState(0);

  const applyLogic = (newS: number, newR: number) => {
    setS(newS);
    setR(newR);

    if (newS === 0 && newR === 0) {
      // Hold state - q remains unchanged
    } else if (newS === 0 && newR === 1) {
      setQ(0); // Reset
    } else if (newS === 1 && newR === 0) {
      setQ(1); // Set
    } else if (newS === 1 && newR === 1) {
      setQ(-1); // Invalid state
    }
  };

  const getQStr = () => q === -1 ? "INVALID" : q.toString();
  const getQnStr = () => q === -1 ? "INVALID" : (q === 0 ? "1" : "0");

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">NOR-Based SR Latch (Asynchronous Memory)</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex flex-col md:flex-row gap-16 justify-center items-center mb-12">
          
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
               <span className="font-bold text-slate-700 w-8">S (Set)</span>
               <button 
                 onClick={() => applyLogic(s ^ 1, r)}
                 className={`w-16 h-16 text-3xl font-black border-4 transition-all ${s ? 'border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
               >{s}</button>
            </div>
            <div className="flex items-center gap-4">
               <span className="font-bold text-slate-700 w-8">R (Reset)</span>
               <button 
                 onClick={() => applyLogic(s, r ^ 1)}
                 className={`w-16 h-16 text-3xl font-black border-4 transition-all ${r ? 'border-red-500 text-red-500 bg-red-50 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
               >{r}</button>
            </div>
          </div>

          <div className="relative w-48 h-48 border-4 border-slate-800 bg-slate-100 flex items-center justify-center">
             <div className="flex flex-col items-center">
                <span className="font-black text-2xl text-slate-800 tracking-widest">SR</span>
                <span className="font-bold text-slate-800 tracking-widest">LATCH</span>
             </div>

             {/* Cross-coupling visualization */}
             <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                <path d="M 80 20 L 20 80" stroke="#334155" strokeWidth="2" fill="none" />
                <path d="M 20 20 L 80 80" stroke="#334155" strokeWidth="2" fill="none" />
             </svg>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
               <div className={`w-24 h-16 flex items-center justify-center text-2xl font-black border-4 transition-all ${q === 1 ? 'border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : q === 0 ? 'border-slate-300 text-slate-400 bg-slate-50' : 'border-red-500 text-red-600 bg-red-50 animate-pulse'}`}>
                 {getQStr()}
               </div>
               <span className="font-bold text-slate-700 w-8">Q</span>
            </div>
            <div className="flex items-center gap-4">
               <div className={`w-24 h-16 flex items-center justify-center text-2xl font-black border-4 transition-all ${q === 0 ? 'border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : q === 1 ? 'border-slate-300 text-slate-400 bg-slate-50' : 'border-red-500 text-red-600 bg-red-50 animate-pulse'}`}>
                 {getQnStr()}
               </div>
               <span className="font-bold text-slate-700 w-8">Q'</span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 border-l-4 transition-all ${s===0 && r===0 ? 'border-[#00FFFF] bg-[#ECFEFF]' : 'border-slate-300 bg-slate-50'}`}>
            <h4 className="font-bold text-slate-800">Hold State (0, 0)</h4>
            <p className="text-sm text-slate-600">The latch remembers its previous value. This is the foundation of RAM.</p>
          </div>
          <div className={`p-4 border-l-4 transition-all ${s===1 && r===1 ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'}`}>
            <h4 className="font-bold text-slate-800">Invalid State (1, 1)</h4>
            <p className="text-sm text-slate-600">Forces both Q and Q' to 0 simultaneously, breaking the logical complement rule.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
