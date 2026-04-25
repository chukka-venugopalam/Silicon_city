"use client";

import React, { useState } from "react";

export default function Chapter26Simulator() {
  const [regs, setRegs] = useState([0, 0, 0, 0]);
  const [serialIn, setSerialIn] = useState(1);

  const clockShift = () => {
    const newRegs = [...regs];
    newRegs.pop(); // remove last
    newRegs.unshift(serialIn); // push serialIn to front
    setRegs(newRegs);
  };

  const parallelLoad = () => {
    setRegs([1, 0, 1, 1]); // Example Parallel load data
  };

  const clear = () => setRegs([0, 0, 0, 0]);

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">4-Bit Universal Shift Register</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 mb-12">
           <div className="flex gap-4">
             <button 
               onClick={clockShift}
               className="px-6 py-2 font-bold bg-[#00FFFF] text-slate-900 border-2 border-[#00FFFF] hover:shadow-[0_0_15px_#00FFFF] transition-all"
             >
               Apply CLK Pulse ⚡
             </button>
             <button 
               onClick={parallelLoad}
               className="px-6 py-2 font-bold border-2 border-slate-800 text-slate-800 hover:bg-slate-100 transition-all"
             >
               Parallel Load (1011)
             </button>
           </div>
           <button 
             onClick={clear}
             className="px-4 py-2 font-bold text-red-500 border border-red-500 hover:bg-red-50"
           >
             Clear (Asynchronous)
           </button>
        </div>

        <div className="flex items-center justify-center gap-4">
           
           {/* Serial Input */}
           <div className="flex flex-col items-center gap-2">
             <span className="font-bold text-slate-500">Serial IN</span>
             <button 
               onClick={() => setSerialIn(serialIn ^ 1)}
               className={`w-12 h-12 text-2xl font-black border-4 transition-all ${serialIn ? 'border-amber-400 text-amber-500 bg-amber-50' : 'border-slate-300 text-slate-400 bg-slate-50'}`}
             >
               {serialIn}
             </button>
             <div className="text-slate-400 font-black">→</div>
           </div>

           {/* Flip Flops */}
           <div className="flex gap-2 p-4 border-4 border-slate-800 bg-slate-100">
             {regs.map((val, idx) => (
               <div key={idx} className="flex flex-col items-center">
                 <div className="text-xs font-bold text-slate-500 mb-2">FF {3-idx}</div>
                 <div className={`w-16 h-20 flex flex-col justify-between items-center p-2 border-2 bg-white ${val ? 'border-[#00FFFF] shadow-[0_0_10px_#00FFFF]' : 'border-slate-300'}`}>
                   <span className="text-xs text-slate-400 self-start">D</span>
                   <span className={`text-3xl font-black ${val ? 'text-[#00FFFF]' : 'text-slate-300'}`}>{val}</span>
                   <div className="flex w-full justify-between items-end">
                     <span className="text-xs text-slate-400">CLK</span>
                     <span className="text-xs text-slate-400">Q</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           {/* Serial Output */}
           <div className="flex flex-col items-center gap-2">
             <span className="font-bold text-slate-500">Serial OUT</span>
             <div className={`w-12 h-12 flex items-center justify-center text-2xl font-black border-4 transition-all ${regs[3] ? 'border-violet-500 text-violet-500 bg-violet-50' : 'border-slate-300 text-slate-400 bg-slate-50'}`}>
               {regs[3]}
             </div>
             <div className="text-slate-400 font-black">→</div>
           </div>

        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-3 border border-slate-200 text-center bg-slate-50">
             <div className="font-bold text-slate-800">SISO</div>
             <div className="text-xs text-slate-500">Serial In, Serial Out. Used as a delay line.</div>
           </div>
           <div className="p-3 border border-slate-200 text-center bg-slate-50">
             <div className="font-bold text-slate-800">SIPO</div>
             <div className="text-xs text-slate-500">Serial In, Parallel Out. UART Receivers.</div>
           </div>
           <div className="p-3 border border-slate-200 text-center bg-slate-50">
             <div className="font-bold text-slate-800">PISO</div>
             <div className="text-xs text-slate-500">Parallel In, Serial Out. UART Transmitters.</div>
           </div>
           <div className="p-3 border border-slate-200 text-center bg-slate-50">
             <div className="font-bold text-slate-800">PIPO</div>
             <div className="text-xs text-slate-500">Parallel In, Parallel Out. Standard CPU register.</div>
           </div>
        </div>

      </div>
    </div>
  );
}
