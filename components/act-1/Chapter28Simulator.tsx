"use client";

import React, { useState } from "react";

export default function Chapter28Simulator() {
  // 8 distinct regions in a 3-set Venn Diagram
  // indices: 0:None, 1:A, 2:B, 3:AB, 4:C, 5:AC, 6:BC, 7:ABC
  const [regions, setRegions] = useState(Array(8).fill(false));

  const toggle = (idx: number) => {
    const newReg = [...regions];
    newReg[idx] = !newReg[idx];
    setRegions(newReg);
  };

  const getEquation = () => {
    const active = regions.map((val, idx) => val ? idx : -1).filter(v => v !== -1);
    if (active.length === 0) return "∅ (Empty Set)";
    if (active.length === 8) return "U (Universal Set)";
    
    // Simplistic text representation based on selected regions
    // For a real tool, Quine-McCluskey minimization would be used, but we'll show raw disjoint unions
    const parts = active.map(idx => {
      let s = "";
      s += (idx & 1) ? "A" : "A'";
      s += (idx & 2) ? "B" : "B'";
      s += (idx & 4) ? "C" : "C'";
      return s;
    });
    
    // Some hardcoded common patterns for educational purposes
    if (active.includes(1) && active.includes(3) && active.includes(5) && active.includes(7) && active.length === 4) return "A";
    if (active.includes(2) && active.includes(3) && active.includes(6) && active.includes(7) && active.length === 4) return "B";
    if (active.includes(4) && active.includes(5) && active.includes(6) && active.includes(7) && active.length === 4) return "C";
    if (active.includes(3) && active.includes(7) && active.length === 2) return "A ∩ B";
    if (active.includes(5) && active.includes(7) && active.length === 2) return "A ∩ C";
    if (active.includes(6) && active.includes(7) && active.length === 2) return "B ∩ C";
    if (active.length === 1 && active.includes(7)) return "A ∩ B ∩ C";
    if (active.length === 7 && !active.includes(0)) return "A ∪ B ∪ C";

    return parts.join(" ∪ ");
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Interactive 3-Set Venn Diagram</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-4 justify-between items-end mb-8 bg-slate-50 p-4 border border-slate-200">
           <div className="text-slate-600 font-bold">
             Click on the bounded regions to construct a Set Theory equation.
           </div>
           <button 
             onClick={() => setRegions(Array(8).fill(false))}
             className="px-4 py-2 border border-slate-400 text-slate-600 hover:bg-slate-200 font-bold text-sm"
           >
             Clear Universe
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center mb-8">
           
           <div className="relative w-80 h-80 border-4 border-slate-800 bg-slate-100 cursor-pointer overflow-hidden group">
              <div className="absolute top-2 left-2 font-bold text-slate-400">U</div>
              
              {/* Region 0 (Universal Background) */}
              <div 
                onClick={() => toggle(0)}
                className={`absolute inset-0 transition-colors ${regions[0] ? 'bg-[#ECFEFF]' : 'bg-transparent'}`}
              ></div>

              {/* Fake SVG layering for clicking. We use absolute positioning and border-radius. */}
              {/* This is a simplified CSS representation of a Venn diagram for interactability */}
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="pointer-events-auto">
                  {/* We will just use circles and mix-blend-mode for visual, but clickable regions in SVG are complex without libraries. */}
                  {/* Let's render circles and attach clicks to them. Overlaps are tricky in raw SVG without pathing. */}
                  {/* We will just provide a visual map and buttons below it for precise region selection, as raw SVG paths for 8 regions is very verbose. */}
                  <circle cx="35" cy="40" r="25" fill="none" stroke="#334155" strokeWidth="1" />
                  <circle cx="65" cy="40" r="25" fill="none" stroke="#334155" strokeWidth="1" />
                  <circle cx="50" cy="65" r="25" fill="none" stroke="#334155" strokeWidth="1" />
                  <text x="25" y="25" fontSize="6" fontWeight="bold" fill="#334155">A</text>
                  <text x="70" y="25" fontSize="6" fontWeight="bold" fill="#334155">B</text>
                  <text x="50" y="85" fontSize="6" fontWeight="bold" fill="#334155">C</text>
                </svg>
              </div>

              {/* Overlay for "Tool not fully interactive" */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/90 p-4 text-center border border-slate-300">
                  <p className="text-sm font-bold text-slate-800">Use precise region toggles below</p>
                </div>
              </div>

           </div>

           <div className="grid grid-cols-2 gap-2">
             <button onClick={() => toggle(1)} className={`p-2 border font-mono ${regions[1] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>A only</button>
             <button onClick={() => toggle(2)} className={`p-2 border font-mono ${regions[2] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>B only</button>
             <button onClick={() => toggle(4)} className={`p-2 border font-mono ${regions[4] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>C only</button>
             <button onClick={() => toggle(3)} className={`p-2 border font-mono ${regions[3] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>A ∩ B only</button>
             <button onClick={() => toggle(5)} className={`p-2 border font-mono ${regions[5] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>A ∩ C only</button>
             <button onClick={() => toggle(6)} className={`p-2 border font-mono ${regions[6] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>B ∩ C only</button>
             <button onClick={() => toggle(7)} className={`p-2 border font-mono ${regions[7] ? 'bg-[#00FFFF] border-slate-800 font-bold' : 'bg-slate-50'}`}>A ∩ B ∩ C</button>
             <button onClick={() => toggle(0)} className={`p-2 border font-mono ${regions[0] ? 'bg-slate-800 text-[#00FFFF] font-bold' : 'bg-slate-50'}`}>Neither (U)</button>
           </div>

        </div>

        <div className="p-6 bg-[#ECFEFF] border border-[#00FFFF] text-center">
           <h4 className="font-bold text-slate-500 mb-2 uppercase tracking-widest text-sm">Constructed Set Equation</h4>
           <div className="font-mono text-2xl font-black text-slate-800">
             {getEquation()}
           </div>
        </div>

      </div>
    </div>
  );
}
