"use client";

import React, { useState } from "react";

export default function Chapter6Simulator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const notA = a === 0 ? 1 : 0;
  
  // Consensus Theorem: AB + A'C + BC = AB + A'C
  const termAB = a & b;
  const termNotAC = notA & c;
  const termBC = b & c;
  
  const leftSide = termAB | termNotAC | termBC;
  const rightSide = termAB | termNotAC;

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val === 0 ? 1 : 0);
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Consensus Theorem Identity Verifier</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-6 bg-[#ECFEFF] border border-[#00FFFF] p-4 text-center font-bold text-slate-800 text-lg">
          $AB + A'C + BC = AB + A'C$
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <div className="text-center">
            <div className="font-bold text-slate-700 mb-2">Input A</div>
            <button onClick={() => handleToggle(setA, a)} className={`w-16 h-16 text-2xl font-mono font-bold border-2 transition-colors ${a ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-slate-100 text-slate-500 border-slate-300'}`}>{a}</button>
          </div>
          <div className="text-center">
            <div className="font-bold text-slate-700 mb-2">Input B</div>
            <button onClick={() => handleToggle(setB, b)} className={`w-16 h-16 text-2xl font-mono font-bold border-2 transition-colors ${b ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-slate-100 text-slate-500 border-slate-300'}`}>{b}</button>
          </div>
          <div className="text-center">
            <div className="font-bold text-slate-700 mb-2">Input C</div>
            <button onClick={() => handleToggle(setC, c)} className={`w-16 h-16 text-2xl font-mono font-bold border-2 transition-colors ${c ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-slate-100 text-slate-500 border-slate-300'}`}>{c}</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-center text-slate-800">
          
          <div className="border border-slate-300 p-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-slate-300"></div>
             <h4 className="font-bold mb-4">Left Hand Side (Unoptimized)</h4>
             <div className="font-mono text-lg mb-2">AB: {termAB}</div>
             <div className="font-mono text-lg mb-2">A'C: {termNotAC}</div>
             <div className="font-mono text-lg mb-2 text-red-500 font-bold">BC: {termBC} (Redundant)</div>
             <div className="w-full h-px bg-slate-200 my-4"></div>
             <div className="font-bold text-2xl">Output: <span className="text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">{leftSide}</span></div>
          </div>

          <div className="border border-slate-300 p-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#00FFFF]"></div>
             <h4 className="font-bold mb-4">Right Hand Side (Optimized)</h4>
             <div className="font-mono text-lg mb-2">AB: {termAB}</div>
             <div className="font-mono text-lg mb-2">A'C: {termNotAC}</div>
             <div className="font-mono text-lg mb-2 text-transparent">-</div>
             <div className="w-full h-px bg-slate-200 my-4"></div>
             <div className="font-bold text-2xl">Output: <span className="text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">{rightSide}</span></div>
          </div>

        </div>

        <div className="mt-8 text-center">
           <div className={`inline-block px-6 py-2 font-bold border-2 ${leftSide === rightSide ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'}`}>
             {leftSide === rightSide ? '✓ IDENTITY MATCH' : '✗ IDENTITY MISMATCH'}
           </div>
        </div>
      </div>
    </div>
  );
}
