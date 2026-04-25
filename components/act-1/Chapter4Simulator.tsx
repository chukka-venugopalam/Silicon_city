"use client";

import React, { useState, useEffect } from "react";

export default function Chapter4Simulator() {
  const [a, setA] = useState("0111"); // +7
  const [b, setB] = useState("0001"); // +1
  
  const [sum, setSum] = useState("");
  const [carryInMSB, setCarryInMSB] = useState(0);
  const [carryOutMSB, setCarryOutMSB] = useState(0);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    calculateAddition();
  }, [a, b]);

  const calculateAddition = () => {
    let c = 0;
    let s = "";
    let cin_msb = 0;
    
    // 4-bit addition
    for (let i = 3; i >= 0; i--) {
      const bitA = parseInt(a[i]);
      const bitB = parseInt(b[i]);
      
      if (i === 0) cin_msb = c;

      const sumBit = bitA ^ bitB ^ c;
      c = (bitA & bitB) | (bitB & c) | (bitA & c);
      
      s = sumBit.toString() + s;
    }
    
    setSum(s);
    setCarryInMSB(cin_msb);
    setCarryOutMSB(c);
    setOverflow(cin_msb !== c);
  };

  const handleAChange = (e: React.ChangeEvent<HTMLSelectElement>) => setA(e.target.value);
  const handleBChange = (e: React.ChangeEvent<HTMLSelectElement>) => setB(e.target.value);

  const getDecimal = (bin: string) => {
    const val = parseInt(bin, 2);
    return val >= 8 ? val - 16 : val;
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">4-Bit Overflow Detection Matrix</h3>
      
      <div className={`p-6 border transition-all duration-500 bg-white
        ${overflow ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-slate-300'}`}>
        
        <div className="flex gap-8 mb-8">
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">Operand A</label>
            <select value={a} onChange={handleAChange} className="w-full p-2 border border-slate-300 text-slate-800">
              {Array.from({length: 16}).map((_, i) => {
                const bin = i.toString(2).padStart(4, '0');
                return <option key={`a-${bin}`} value={bin}>{bin} ({getDecimal(bin)})</option>
              })}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">Operand B</label>
            <select value={b} onChange={handleBChange} className="w-full p-2 border border-slate-300 text-slate-800">
              {Array.from({length: 16}).map((_, i) => {
                const bin = i.toString(2).padStart(4, '0');
                return <option key={`b-${bin}`} value={bin}>{bin} ({getDecimal(bin)})</option>
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center font-mono text-2xl text-slate-800 bg-slate-50 p-6 rounded-sm">
          <div className="w-48 flex justify-between tracking-widest relative">
            <span>{a}</span>
            <span className="absolute -left-8 text-slate-500 text-lg">+</span>
          </div>
          <div className="w-48 flex justify-between tracking-widest border-b border-slate-400 pb-2">
            <span>{b}</span>
          </div>
          <div className={`w-48 flex justify-between tracking-widest pt-2 ${overflow ? 'text-red-600 font-bold' : 'text-[#00FFFF] drop-shadow-[0_0_8px_#00FFFF]'}`}>
            <span>{sum}</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">{'Carry Into MSB ($C_{in}$)'}</div>
            <div className="text-2xl font-bold text-slate-800">{carryInMSB}</div>
          </div>
          <div className="p-4 border border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-1">{'Carry Out MSB ($C_{out}$)'}</div>
            <div className="text-2xl font-bold text-slate-800">{carryOutMSB}</div>
          </div>
          <div className={`p-4 border transition-colors ${overflow ? 'bg-red-100 border-red-500' : 'bg-[#ECFEFF] border-[#00FFFF]'}`}>
            <div className="text-sm font-bold text-slate-700 mb-1">Overflow Flag ($V$)</div>
            <div className={`text-2xl font-bold ${overflow ? 'text-red-600' : 'text-[#00FFFF] drop-shadow-[0_0_2px_#00FFFF]'}`}>
              {overflow ? '1 (OVERFLOW)' : '0 (VALID)'}
            </div>
            <div className="text-xs text-slate-600 mt-1">{'$V = C_{in} \oplus C_{out}$'}</div>
          </div>
        </div>
        
        {overflow && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 font-bold border-l-4 border-red-500 text-sm">
            CRITICAL FAULT: Sign bit corrupted. The result ({getDecimal(sum)}) exceeds the 4-bit signed range [-8, +7].
          </div>
        )}
      </div>
    </div>
  );
}
