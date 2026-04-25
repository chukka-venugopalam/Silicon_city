"use client";

import React, { useState } from "react";

export default function Chapter8Simulator() {
  const [targetGate, setTargetGate] = useState("NOT");

  const renderCircuit = () => {
    switch(targetGate) {
      case "NOT":
        return (
          <div className="flex items-center gap-4 text-slate-800 font-mono text-xl">
             <div>A</div>
             <div className="w-8 h-px bg-slate-800"></div>
             <div className="flex flex-col gap-2 relative">
                <div className="w-px h-8 bg-slate-800 absolute -left-0 top-1/2 -translate-y-1/2"></div>
                <div className="w-8 h-px bg-slate-800"></div>
                <div className="w-8 h-px bg-slate-800"></div>
             </div>
             <div className="border-2 border-slate-800 p-4 bg-[#ECFEFF] flex items-center shadow-[0_0_8px_#00FFFF]">
               NAND
             </div>
             <div className="w-8 h-px bg-slate-800"></div>
             <div>A'</div>
          </div>
        );
      case "AND":
        return (
          <div className="flex items-center gap-4 text-slate-800 font-mono text-xl">
             <div className="flex flex-col gap-6">
                <div>A</div>
                <div>B</div>
             </div>
             <div className="flex flex-col gap-6">
                <div className="w-8 h-px bg-slate-800"></div>
                <div className="w-8 h-px bg-slate-800"></div>
             </div>
             <div className="border-2 border-slate-800 p-4 bg-slate-100 flex items-center">
               NAND
             </div>
             <div className="w-8 h-px bg-slate-800"></div>
             <div className="flex flex-col gap-2 relative">
                <div className="w-px h-8 bg-slate-800 absolute -left-0 top-1/2 -translate-y-1/2"></div>
                <div className="w-8 h-px bg-slate-800"></div>
                <div className="w-8 h-px bg-slate-800"></div>
             </div>
             <div className="border-2 border-slate-800 p-4 bg-[#ECFEFF] shadow-[0_0_8px_#00FFFF] flex items-center">
               NAND
             </div>
             <div className="w-8 h-px bg-slate-800"></div>
             <div>AB</div>
          </div>
        );
      case "OR":
        return (
          <div className="flex flex-col gap-4 text-slate-800 font-mono text-xl justify-center h-full">
            
            <div className="flex items-center gap-4">
               <div>A</div>
               <div className="w-4 h-px bg-slate-800"></div>
               <div className="flex flex-col gap-1 relative">
                  <div className="w-px h-4 bg-slate-800 absolute -left-0 top-1/2 -translate-y-1/2"></div>
                  <div className="w-4 h-px bg-slate-800"></div>
                  <div className="w-4 h-px bg-slate-800"></div>
               </div>
               <div className="border-2 border-slate-800 p-2 bg-slate-100">NAND</div>
               <div className="w-4 h-px bg-slate-800"></div>
               <div className="w-px h-12 bg-slate-800"></div>
               <div className="w-4 h-px bg-slate-800"></div>
               <div className="border-2 border-slate-800 p-4 bg-[#ECFEFF] shadow-[0_0_8px_#00FFFF] -ml-4 translate-y-8">NAND</div>
               <div className="w-8 h-px bg-slate-800 translate-y-8"></div>
               <div className="translate-y-8">A + B</div>
            </div>

            <div className="flex items-center gap-4">
               <div>B</div>
               <div className="w-4 h-px bg-slate-800"></div>
               <div className="flex flex-col gap-1 relative">
                  <div className="w-px h-4 bg-slate-800 absolute -left-0 top-1/2 -translate-y-1/2"></div>
                  <div className="w-4 h-px bg-slate-800"></div>
                  <div className="w-4 h-px bg-slate-800"></div>
               </div>
               <div className="border-2 border-slate-800 p-2 bg-slate-100">NAND</div>
               <div className="w-4 h-px bg-slate-800"></div>
               <div className="w-px h-12 bg-slate-800 -translate-y-12"></div>
            </div>

          </div>
        );
      case "XOR":
        return (
          <div className="text-center font-bold text-slate-500 mt-8">
            Requires 4 NAND gates. <br/> (A NAND B) is fed into two intermediate NANDs along with A and B respectively. <br/>Their outputs feed the final NAND.
          </div>
        );
    }
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">NAND Universal Synthesizer</h3>
      
      <div className="bg-white p-6 border border-slate-300 min-h-[400px] flex flex-col">
        
        <div className="flex gap-4 mb-8 justify-center">
          {["NOT", "AND", "OR", "XOR"].map(gate => (
            <button
              key={gate}
              onClick={() => setTargetGate(gate)}
              className={`py-2 px-6 font-bold border-2 transition-all ${targetGate === gate ? 'bg-[#00FFFF] text-slate-800 border-cyan-600 shadow-[0_0_5px_#00FFFF]' : 'bg-slate-50 text-slate-600 border-slate-300 hover:bg-slate-200'}`}
            >
              {gate}
            </button>
          ))}
        </div>

        <div className="flex-1 border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center p-8 overflow-hidden relative">
           <div className="absolute top-2 left-2 text-sm text-slate-400 font-bold">Hardware Synthesis Layout</div>
           {renderCircuit()}
        </div>

        <div className="mt-6 p-4 bg-slate-100 border-l-4 border-slate-800 text-slate-700">
          <strong>Resource Cost:</strong> 
          {targetGate === "NOT" && " 1 NAND gate. Inputs tied together."}
          {targetGate === "AND" && " 2 NAND gates. One for standard NAND, one acting as NOT to invert it."}
          {targetGate === "OR" && " 3 NAND gates. By De Morgan's: (A'B')' = A + B."}
          {targetGate === "XOR" && " 4 NAND gates. Optimized layout to prevent redundant signal propagation."}
        </div>
      </div>
    </div>
  );
}
