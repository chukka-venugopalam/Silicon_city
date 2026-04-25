"use client";

import React, { useState } from "react";

export default function Chapter23Simulator() {
  const [a1, setA1] = useState(0);
  const [a0, setA0] = useState(0);
  const [enable, setEnable] = useState(1);
  const [activeLow, setActiveLow] = useState(false);

  const idx = (a1 << 1) | a0;
  
  // Decoder logic
  const d0 = enable ? (idx === 0 ? 1 : 0) : 0;
  const d1 = enable ? (idx === 1 ? 1 : 0) : 0;
  const d2 = enable ? (idx === 2 ? 1 : 0) : 0;
  const d3 = enable ? (idx === 3 ? 1 : 0) : 0;

  const getOut = (val: number) => activeLow ? (val ^ 1) : val;

  const outClass = (val: number) => {
    const finalVal = getOut(val);
    if (activeLow) {
      return finalVal === 0 ? "border-amber-400 text-amber-500 bg-amber-50 shadow-[0_0_15px_rgba(251,191,36,0.6)]" : "border-slate-300 text-slate-400 bg-slate-50";
    }
    return finalVal === 1 ? "border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]" : "border-slate-300 text-slate-400 bg-slate-50";
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">2-to-4 Line Decoder</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 mb-8">
           <div className="flex gap-4">
             <button 
               onClick={() => setEnable(enable ^ 1)}
               className={`px-4 py-2 font-bold border-2 transition-all ${enable ? 'bg-green-500 border-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-200 border-slate-300 text-slate-500'}`}
             >
               Enable: {enable ? 'ON' : 'OFF'}
             </button>
           </div>
           
           <div className="flex gap-2 bg-white border border-slate-300 p-1">
             <button 
               onClick={() => setActiveLow(false)}
               className={`px-4 py-2 font-bold transition-all ${!activeLow ? 'bg-slate-800 text-[#00FFFF]' : 'text-slate-400 hover:bg-slate-100'}`}
             >
               Active-High
             </button>
             <button 
               onClick={() => setActiveLow(true)}
               className={`px-4 py-2 font-bold transition-all ${activeLow ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:bg-slate-100'}`}
             >
               Active-Low
             </button>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
           
           {/* Inputs */}
           <div className="flex flex-col gap-6">
             <div className="flex items-center gap-4">
               <span className="font-bold text-slate-700 w-8">A1</span>
               <button 
                 onClick={() => setA1(a1 ^ 1)}
                 className={`w-16 h-16 text-3xl font-black border-4 transition-all ${a1 ? 'border-slate-800 text-slate-800 shadow-[0_0_10px_rgba(0,0,0,0.2)]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
               >{a1}</button>
             </div>
             <div className="flex items-center gap-4">
               <span className="font-bold text-slate-700 w-8">A0</span>
               <button 
                 onClick={() => setA0(a0 ^ 1)}
                 className={`w-16 h-16 text-3xl font-black border-4 transition-all ${a0 ? 'border-slate-800 text-slate-800 shadow-[0_0_10px_rgba(0,0,0,0.2)]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
               >{a0}</button>
             </div>
           </div>

           {/* Decoder Block */}
           <div className="w-48 h-80 border-4 border-slate-800 bg-slate-100 relative flex items-center justify-center">
             <div className="text-center font-black text-2xl text-slate-800 tracking-widest leading-loose">
               <div>2 x 4</div>
               <div>DEC</div>
             </div>
             {/* Not bubbles for Active Low */}
             {activeLow && (
               <>
                 <div className="absolute top-8 -right-3 w-4 h-4 rounded-full border-4 border-slate-800 bg-white"></div>
                 <div className="absolute top-28 -right-3 w-4 h-4 rounded-full border-4 border-slate-800 bg-white"></div>
                 <div className="absolute bottom-28 -right-3 w-4 h-4 rounded-full border-4 border-slate-800 bg-white"></div>
                 <div className="absolute bottom-8 -right-3 w-4 h-4 rounded-full border-4 border-slate-800 bg-white"></div>
               </>
             )}
           </div>

           {/* Outputs */}
           <div className="flex flex-col gap-4">
             {[d0, d1, d2, d3].map((val, i) => (
               <div key={i} className="flex items-center gap-4">
                 <div className={`w-14 h-14 flex items-center justify-center text-2xl font-black border-4 transition-all ${outClass(val)}`}>
                   {getOut(val)}
                 </div>
                 <span className="font-bold text-slate-700 w-8">D{i}</span>
               </div>
             ))}
           </div>
        </div>

        <div className="mt-12 text-sm text-slate-600 p-4 border-l-4 border-slate-300 bg-slate-50">
          <strong>Decoder Principle:</strong> A decoder generates all $2^n$ minterms of its $n$ input variables. When enabled, exactly one output line is active based on the binary input value. 
          <br/>
          <em>Active-Low</em> decoders (like the 74LS138) use NAND gates instead of AND gates, meaning the selected line outputs `0` while all others output `1`. This is critical for memory chip-select ($CS'$) lines.
        </div>

      </div>
    </div>
  );
}
