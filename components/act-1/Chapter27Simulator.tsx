"use client";

import React, { useState } from "react";

export default function Chapter27Simulator() {
  const [count, setCount] = useState(0);
  const [modN, setModN] = useState(8);
  const [isSync, setIsSync] = useState(true);

  const pulse = () => {
    setCount((prev) => (prev + 1) % modN);
  };

  const binStr = count.toString(2).padStart(3, '0');

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">State Machine Counter (Mod-N)</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 mb-8">
           <div className="flex gap-4">
             <button 
               onClick={pulse}
               className="px-6 py-2 font-bold bg-[#00FFFF] text-slate-900 border-2 border-[#00FFFF] hover:shadow-[0_0_15px_#00FFFF] transition-all"
             >
               Apply CLK Pulse ⚡
             </button>
             <button 
               onClick={() => setCount(0)}
               className="px-4 py-2 font-bold border border-slate-300 text-slate-500 hover:bg-slate-100"
             >
               RESET
             </button>
           </div>
           
           <div className="flex items-center gap-4">
              <span className="font-bold text-slate-600">Modulus (N):</span>
              <select 
                className="p-2 border border-slate-300 font-bold"
                value={modN}
                onChange={(e) => {
                  setModN(Number(e.target.value));
                  setCount(0);
                }}
              >
                <option value={4}>Mod-4 (2-bit)</option>
                <option value={5}>Mod-5 (3-bit)</option>
                <option value={6}>Mod-6 (3-bit)</option>
                <option value={8}>Mod-8 (3-bit)</option>
              </select>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center mb-12">
           
           {/* Flip Flops (3 bits max for this demo) */}
           <div className="flex gap-4">
             {[0, 1, 2].map((idx) => {
               // Render based on current bits
               const isActive = binStr[idx] === '1';
               return (
                 <div key={idx} className="flex flex-col items-center">
                   <div className="text-sm font-bold text-slate-500 mb-2">Q{2-idx}</div>
                   <div className={`w-20 h-24 flex flex-col justify-center items-center border-4 transition-all ${isActive ? 'border-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]' : 'border-slate-300 bg-white'}`}>
                     <span className={`text-4xl font-black ${isActive ? 'text-[#00FFFF]' : 'text-slate-300'}`}>{isActive ? '1' : '0'}</span>
                   </div>
                 </div>
               )
             })}
           </div>

           <div className="text-6xl font-black text-slate-200">|</div>

           <div className="flex flex-col items-center">
             <div className="text-sm font-bold text-slate-500 mb-2">DECIMAL OUTPUT</div>
             <div className="text-6xl font-black text-slate-800 tracking-widest">{count}</div>
           </div>

        </div>

        <div className="border border-slate-200">
           <div className="flex bg-slate-100 border-b border-slate-200">
             <button 
               onClick={() => setIsSync(true)}
               className={`flex-1 p-3 font-bold ${isSync ? 'bg-slate-800 text-[#00FFFF]' : 'text-slate-500 hover:bg-slate-200'}`}
             >
               Synchronous Design
             </button>
             <button 
               onClick={() => setIsSync(false)}
               className={`flex-1 p-3 font-bold ${!isSync ? 'bg-slate-800 text-[#00FFFF]' : 'text-slate-500 hover:bg-slate-200'}`}
             >
               Asynchronous (Ripple) Design
             </button>
           </div>
           
           <div className="p-6 bg-slate-50 text-sm text-slate-700">
             {isSync ? (
               <p><strong>Synchronous Counter:</strong> All flip-flops share the exact same global clock line. They transition simultaneously. The next state logic is computed using combinational gates fed into the J/K or D inputs. Faster, reliable, but requires more gates.</p>
             ) : (
               <p>{'Asynchronous (Ripple) Counter: Only the first flip-flop receives the global clock. The output (Q or Q\') of each flip-flop acts as the clock for the next one. Slower due to cumulative propagation delay ($t_p = N \\times t_{ff}$), but extremely simple to construct.'}</p>
             )}
             <div className="mt-4 p-3 bg-white border border-slate-300 font-mono">
               <strong>Current Mod-{modN} State Space:</strong> <br/>
               {Array.from({length: modN}).map((_, i) => i).join(" → ")} → 0...
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
