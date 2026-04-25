"use client";

import React, { useState } from "react";

export default function Chapter5Simulator() {
  const [a, setA] = useState("1101");
  const [b, setB] = useState("1011");
  const [step, setStep] = useState(0); // 0 to 4
  const [carries, setCarries] = useState([0, 0, 0, 0, 0]); // c0 to c4
  const [sums, setSums] = useState(["?", "?", "?", "?"]);

  const calculateStep = () => {
    if (step > 3) return;
    
    const bitIndex = 3 - step;
    const bitA = parseInt(a[bitIndex]);
    const bitB = parseInt(b[bitIndex]);
    const cin = carries[step];

    const sumBit = bitA ^ bitB ^ cin;
    const cout = (bitA & bitB) | (bitB & cin) | (bitA & cin);

    const newSums = [...sums];
    newSums[bitIndex] = sumBit.toString();
    setSums(newSums);

    const newCarries = [...carries];
    newCarries[step + 1] = cout;
    setCarries(newCarries);

    setStep(step + 1);
  };

  const resetSystem = () => {
    setStep(0);
    setCarries([0, 0, 0, 0, 0]);
    setSums(["?", "?", "?", "?"]);
  };

  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^01]/g, '');
    if(val.length <= 4) {
      setA(val.padStart(4, '0'));
      resetSystem();
    }
  };

  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^01]/g, '');
    if(val.length <= 4) {
      setB(val.padStart(4, '0'));
      resetSystem();
    }
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Ripple Carry Adder (Step-by-Step)</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Operand A</label>
            <input type="text" value={a} onChange={handleAChange} maxLength={4} className="w-24 p-2 border border-slate-300 text-center tracking-widest text-slate-800" />
          </div>
          <div>
            <label className="block text-slate-700 font-bold mb-1">Operand B</label>
            <input type="text" value={b} onChange={handleBChange} maxLength={4} className="w-24 p-2 border border-slate-300 text-center tracking-widest text-slate-800" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 py-8 bg-slate-50 border border-slate-200">
          
          {[0, 1, 2, 3].map((i) => {
            const isCurrent = step === (3 - i);
            const isDone = step > (3 - i);
            return (
              <div key={i} className={`flex flex-col items-center p-3 border-2 transition-all ${isCurrent ? 'border-[#00FFFF] bg-[#ECFEFF] scale-110 shadow-[0_0_10px_#00FFFF]' : 'border-transparent'}`}>
                <div className="text-xs text-slate-400 mb-1">Cin</div>
                <div className={`font-mono text-lg ${isDone || isCurrent ? 'text-red-500 font-bold' : 'text-transparent'}`}>
                  {isCurrent ? carries[step] : (isDone ? carries[3-i] : "0")}
                </div>
                
                <div className="font-mono text-2xl text-slate-800 mt-2">{a[i]}</div>
                <div className="font-mono text-2xl text-slate-800">{b[i]}</div>
                
                <div className="w-12 h-px bg-slate-400 my-2"></div>
                
                <div className={`font-mono text-2xl ${isDone ? 'text-green-600 font-bold' : 'text-slate-300'}`}>
                  {sums[i]}
                </div>
              </div>
            )
          })}
          
          <div className="flex flex-col items-center justify-center p-3">
             <div className="text-xs text-slate-400 mb-1">Final Cout</div>
             <div className={`font-mono text-2xl ${step === 4 ? 'text-red-500 font-bold' : 'text-transparent'}`}>
               {carries[4]}
             </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={calculateStep}
            disabled={step === 4}
            className="flex-1 py-3 px-4 bg-slate-800 text-white font-bold hover:bg-slate-700 disabled:opacity-50 transition-colors"
          >
            {step === 4 ? 'Addition Complete' : 'Clock Pulse (Next Bit)'}
          </button>
          <button 
            onClick={resetSystem}
            className="py-3 px-6 border border-[#00FFFF] text-slate-700 font-bold hover:bg-[#00FFFF] hover:text-white transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
