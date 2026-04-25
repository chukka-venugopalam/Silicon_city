"use client";

import React, { useState } from "react";

export default function Chapter21Simulator() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [cin, setCin] = useState(0);

  const sum = a ^ b ^ cin;
  const cout = (a & b) | (cin & (a ^ b));

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Full Adder Combinational Logic</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-12 justify-center items-center mb-12">
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700 w-8">A</span>
              <button 
                onClick={() => setA(a ^ 1)}
                className={`w-16 h-16 text-3xl font-black border-4 transition-all ${a ? 'border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
              >
                {a}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700 w-8">B</span>
              <button 
                onClick={() => setB(b ^ 1)}
                className={`w-16 h-16 text-3xl font-black border-4 transition-all ${b ? 'border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
              >
                {b}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700 w-8">Cin</span>
              <button 
                onClick={() => setCin(cin ^ 1)}
                className={`w-16 h-16 text-3xl font-black border-4 transition-all ${cin ? 'border-amber-400 text-amber-500 bg-amber-50 shadow-[0_0_15px_rgba(251,191,36,0.6)]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
              >
                {cin}
              </button>
            </div>
          </div>

          {/* ALU Block */}
          <div className="relative w-48 h-64 border-4 border-slate-800 bg-slate-100 flex items-center justify-center">
            <span className="font-black text-2xl text-slate-800 tracking-widest rotate-[-90deg]">ADDER</span>
            
            {/* Input Lines */}
            <div className={`absolute top-8 -left-12 w-12 h-1 ${a ? 'bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]' : 'bg-slate-300'}`}></div>
            <div className={`absolute top-32 -left-12 w-12 h-1 ${b ? 'bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]' : 'bg-slate-300'}`}></div>
            <div className={`absolute bottom-8 -left-12 w-12 h-1 ${cin ? 'bg-amber-400 shadow-[0_0_5px_#fbbf24]' : 'bg-slate-300'}`}></div>

            {/* Output Lines */}
            <div className={`absolute top-16 -right-12 w-12 h-1 ${sum ? 'bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]' : 'bg-slate-300'}`}></div>
            <div className={`absolute bottom-16 -right-12 w-12 h-1 ${cout ? 'bg-violet-500 shadow-[0_0_5px_#8b5cf6]' : 'bg-slate-300'}`}></div>
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 flex items-center justify-center text-3xl font-black border-4 transition-all ${sum ? 'border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}>
                {sum}
              </div>
              <span className="font-bold text-slate-700">Sum</span>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 flex items-center justify-center text-3xl font-black border-4 transition-all ${cout ? 'border-violet-500 text-violet-500 bg-violet-50 shadow-[0_0_15px_rgba(139,92,246,0.6)]' : 'border-slate-300 text-slate-400 bg-slate-50'}`}>
                {cout}
              </div>
              <span className="font-bold text-slate-700">Cout</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="p-4 border-l-4 border-[#00FFFF] bg-slate-50">
             <h4 className="font-bold text-slate-800 mb-2">Sum Logic (XOR)</h4>
             <div className="font-mono text-sm text-slate-600 mb-2">S = A ⊕ B ⊕ Cin</div>
             <p className="text-sm text-slate-500">True when an odd number of inputs are 1. Requires two 2-input XOR gates.</p>
          </div>
          <div className="p-4 border-l-4 border-violet-500 bg-slate-50">
             <h4 className="font-bold text-slate-800 mb-2">Carry Logic (Majority)</h4>
             <div className="font-mono text-sm text-slate-600 mb-2">Cout = AB + Cin(A ⊕ B)</div>
             <p className="text-sm text-slate-500">True when two or more inputs are 1. The critical path determining ripple delay.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
