"use client";

import React, { useState } from "react";

export default function Chapter31Simulator() {
  const [modN, setModN] = useState(5);
  const [op, setOp] = useState<"ADD" | "MUL">("ADD");

  const elements = Array.from({length: modN}, (_, i) => i);
  // For multiplication in group theory, we often drop 0 if N is prime to form a cyclic group,
  // but for a general modulo table visualization, keeping 0 is fine.
  
  const compute = (a: number, b: number) => {
    if (op === "ADD") return (a + b) % modN;
    return (a * b) % modN;
  };

  const hasIdentity = () => true; // Modulo arithmetic always has identity (0 for add, 1 for mul)
  
  const getInverse = (a: number) => {
    const identity = op === "ADD" ? 0 : 1;
    for (let i = 0; i < modN; i++) {
      if (compute(a, i) === identity) return i;
    }
    return null;
  };

  const isGroup = () => {
    // Check if every element has an inverse
    for (let i = 0; i < modN; i++) {
      if (getInverse(i) === null) return false;
    }
    return true;
  };

  const isGroupValid = isGroup();

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Algebraic Structure: Cayley Table Generator</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-slate-50 p-4 border border-slate-200 mb-8">
           <div className="flex gap-4">
             <button 
               onClick={() => setOp("ADD")}
               className={`px-4 py-2 font-bold transition-all ${op === "ADD" ? 'bg-[#00FFFF] text-slate-900 border-2 border-[#00FFFF]' : 'bg-white border-2 border-slate-300 text-slate-500 hover:bg-slate-100'}`}
             >
               Addition Modulo
             </button>
             <button 
               onClick={() => setOp("MUL")}
               className={`px-4 py-2 font-bold transition-all ${op === "MUL" ? 'bg-violet-400 text-white border-2 border-violet-500' : 'bg-white border-2 border-slate-300 text-slate-500 hover:bg-slate-100'}`}
             >
               Multiplication Modulo
             </button>
           </div>

           <div className="flex items-center gap-4">
             <span className="font-bold text-slate-700">{'Set $\mathbb{Z}_{N}$ where $N =$'}</span>
             <input 
               type="range" 
               min="2" max="7" 
               value={modN} 
               onChange={(e) => setModN(Number(e.target.value))}
               className="w-32 accent-[#00FFFF]"
             />
             <span className="font-black text-2xl text-slate-800">{modN}</span>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-start">
           
           <div className="border-4 border-slate-800 p-2 bg-slate-100 inline-block overflow-x-auto">
             <table className="border-collapse bg-white">
               <thead>
                 <tr>
                   <th className="p-3 bg-slate-800 text-[#00FFFF] font-black border-r-2 border-b-2 border-slate-800">
                     {op === "ADD" ? "+_m" : "*_m"}
                   </th>
                   {elements.map(e => <th key={e} className="p-4 w-16 bg-slate-200 text-slate-800 font-black border-b-2 border-slate-800">{e}</th>)}
                 </tr>
               </thead>
               <tbody>
                 {elements.map((r) => (
                   <tr key={r}>
                     <td className="p-4 bg-slate-200 text-slate-800 font-black text-center border-r-2 border-slate-800">{r}</td>
                     {elements.map((c) => {
                       const res = compute(r, c);
                       return (
                         <td 
                           key={c}
                           className="border border-slate-300 p-0 relative"
                         >
                           <div className={`w-16 h-16 flex items-center justify-center text-3xl font-bold transition-colors hover:bg-[#ECFEFF] ${res === (op === "ADD" ? 0 : 1) ? 'text-[#00FFFF] drop-shadow-[0_0_2px_#00FFFF]' : 'text-slate-500'}`}>
                             {res}
                           </div>
                         </td>
                       )
                     })}
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="w-full md:w-80 flex flex-col gap-6">
              
              <div className="border border-slate-200 p-6 bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">Group Axioms Check</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex justify-between items-center font-bold text-green-600">
                    <span>Closure:</span> <span>✓ PASS</span>
                  </li>
                  <li className="flex justify-between items-center font-bold text-green-600">
                    <span>Associativity:</span> <span>✓ PASS</span>
                  </li>
                  <li className="flex justify-between items-center font-bold text-green-600">
                    <span>Identity Exists:</span> <span>✓ PASS (e = {op === "ADD" ? 0 : 1})</span>
                  </li>
                  <li className={`flex justify-between items-center font-bold ${isGroupValid ? 'text-green-600' : 'text-red-500'}`}>
                    <span>All Inverses Exist:</span> <span>{isGroupValid ? '✓ PASS' : '✗ FAIL'}</span>
                  </li>
                </ul>
                
                <div className={`mt-6 p-3 text-center font-black uppercase tracking-widest border-2 ${isGroupValid ? 'border-[#00FFFF] text-slate-800 bg-[#ECFEFF]' : 'border-red-500 text-red-600 bg-red-50'}`}>
                  {isGroupValid ? 'Valid Group' : 'Not A Group'}
                </div>

                {!isGroupValid && op === "MUL" && (
                  <div className="mt-4 text-xs italic text-slate-500">
                    {'* Modulo multiplication on $\mathbb{Z}_N$ is not a group because $0$ has no multiplicative inverse (you cannot multiply anything by $0$ to get $1$).'}
                  </div>
                )}
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
