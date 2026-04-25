"use client";

import React, { useState } from "react";

export default function Chapter22Simulator() {
  const [data, setData] = useState([0, 1, 0, 1]);
  const [s1, setS1] = useState(0);
  const [s0, setS0] = useState(0);

  const toggleData = (idx: number) => {
    const newData = [...data];
    newData[idx] = newData[idx] ^ 1;
    setData(newData);
  };

  const selectedIdx = (s1 << 1) | s0;
  const out = data[selectedIdx];

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">4x1 Data Multiplexer (MUX)</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
           
           {/* Inputs */}
           <div className="flex flex-col gap-4">
             {data.map((d, idx) => (
               <div key={idx} className="flex items-center gap-4">
                 <span className="font-bold text-slate-700 w-8">I{idx}</span>
                 <button 
                   onClick={() => toggleData(idx)}
                   className={`w-12 h-12 text-2xl font-black border-2 transition-all ${selectedIdx === idx ? 'border-[#00FFFF] text-[#00FFFF] shadow-[0_0_10px_#00FFFF]' : 'border-slate-300 text-slate-400 hover:bg-slate-50'}`}
                 >
                   {d}
                 </button>
               </div>
             ))}
           </div>

           {/* MUX Body */}
           <div className="relative">
              {/* Select Lines from top */}
              <div className="absolute -top-12 left-8 flex gap-8">
                 <div className="flex flex-col items-center">
                   <button 
                     onClick={() => setS1(s1 ^ 1)}
                     className={`w-10 h-10 mb-2 border-2 font-bold ${s1 ? 'bg-[#00FFFF] border-[#00FFFF] text-slate-900 shadow-[0_0_10px_#00FFFF]' : 'bg-slate-50 border-slate-300 text-slate-500'}`}
                   >{s1}</button>
                   <span className="text-xs font-bold text-slate-500">S1</span>
                 </div>
                 <div className="flex flex-col items-center">
                   <button 
                     onClick={() => setS0(s0 ^ 1)}
                     className={`w-10 h-10 mb-2 border-2 font-bold ${s0 ? 'bg-[#00FFFF] border-[#00FFFF] text-slate-900 shadow-[0_0_10px_#00FFFF]' : 'bg-slate-50 border-slate-300 text-slate-500'}`}
                   >{s0}</button>
                   <span className="text-xs font-bold text-slate-500">S0</span>
                 </div>
              </div>

              <div 
                className="w-40 bg-slate-100 border-4 border-slate-800 flex items-center justify-center relative z-10"
                style={{ height: '240px', clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' }}
              >
                <div className="flex flex-col items-center opacity-30">
                  <span className="font-black text-4xl text-slate-800 tracking-widest">MUX</span>
                  <span className="font-bold text-slate-800 tracking-widest">4 x 1</span>
                </div>

                {/* Routing Visualization */}
                <div 
                  className="absolute left-0 h-1 bg-[#00FFFF] shadow-[0_0_10px_#00FFFF] transition-all duration-300 origin-left"
                  style={{
                    top: `${15 + selectedIdx * 23}%`,
                    width: '100%',
                    transform: `rotate(${selectedIdx === 0 ? 10 : selectedIdx === 1 ? 5 : selectedIdx === 2 ? -5 : -10}deg)`
                  }}
                ></div>
              </div>
           </div>

           {/* Output */}
           <div className="flex items-center gap-4">
             <div className="w-16 h-16 flex items-center justify-center text-4xl font-black border-4 border-[#00FFFF] text-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF] transition-all">
               {out}
             </div>
             <span className="font-bold text-slate-700 text-xl">OUT</span>
           </div>

        </div>

        <div className="mt-12 p-6 border border-slate-200 bg-slate-50">
          <h4 className="font-bold text-slate-800 mb-2">Architect's Note</h4>
          <p className="text-slate-600">The Boolean equation for a 4x1 MUX is $Y = S_1'S_0'I_0 + S_1'S_0I_1 + S_1S_0'I_2 + S_1S_0I_3$. This proves that a multiplexer is essentially a hardware implementation of a Boolean function's Sum of Products (SOP). A $2^n \times 1$ MUX can implement ANY Boolean function of $n$ variables directly.</p>
        </div>

      </div>
    </div>
  );
}
