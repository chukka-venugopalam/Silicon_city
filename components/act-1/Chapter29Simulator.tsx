"use client";

import React, { useState } from "react";

export default function Chapter29Simulator() {
  const SIZE = 4;
  const [matrix, setMatrix] = useState(
    Array(SIZE).fill(null).map(() => Array(SIZE).fill(0))
  );

  const toggle = (r: number, c: number) => {
    const newM = matrix.map(row => [...row]);
    newM[r][c] ^= 1;
    setMatrix(newM);
  };

  const checkReflexive = () => {
    for (let i = 0; i < SIZE; i++) {
      if (matrix[i][i] === 0) return false;
    }
    return true;
  };

  const checkSymmetric = () => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (matrix[i][j] !== matrix[j][i]) return false;
      }
    }
    return true;
  };

  const checkTransitive = () => {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (matrix[i][j] === 1) {
          for (let k = 0; k < SIZE; k++) {
            if (matrix[j][k] === 1 && matrix[i][k] === 0) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const isRef = checkReflexive();
  const isSym = checkSymmetric();
  const isTrans = checkTransitive();
  const isEquiv = isRef && isSym && isTrans;

  const elements = ['A', 'B', 'C', 'D'];

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Relational Matrix Analyzer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 mb-8">
           <div className="text-slate-600 font-bold">
             Define the Relation R on set S={'{'}A, B, C, D{'}'} by toggling the matrix cells.
           </div>
           <button 
             onClick={() => setMatrix(Array(SIZE).fill(null).map(() => Array(SIZE).fill(0)))}
             className="px-4 py-2 border border-red-400 text-red-500 hover:bg-red-50 font-bold text-sm"
           >
             Clear Relation
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
           
           <div className="border-4 border-slate-800 p-2 bg-slate-100 inline-block">
             <table className="border-collapse bg-white">
               <thead>
                 <tr>
                   <th className="p-3 bg-slate-200"></th>
                   {elements.map(e => <th key={e} className="p-3 w-16 bg-slate-200 text-slate-800 font-bold">{e}</th>)}
                 </tr>
               </thead>
               <tbody>
                 {matrix.map((row, r) => (
                   <tr key={r}>
                     <td className="p-3 bg-slate-200 text-slate-800 font-bold text-center">{elements[r]}</td>
                     {row.map((val, c) => (
                       <td 
                         key={c}
                         onClick={() => toggle(r, c)}
                         className={`border border-slate-300 p-0 h-16 relative cursor-pointer transition-all ${val ? 'bg-[#ECFEFF]' : 'hover:bg-slate-50'}`}
                       >
                         <div className={`text-3xl text-center font-black ${val ? 'text-[#00FFFF]' : 'text-slate-200'}`}>
                           {val}
                         </div>
                       </td>
                     ))}
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="flex flex-col gap-4 w-full md:w-80">
              <div className={`p-4 border-l-4 font-bold ${isRef ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-300 bg-slate-50 text-slate-400'}`}>
                Reflexive: {isRef ? 'YES ✓' : 'NO ✗'}
                <div className="text-xs font-normal mt-1">Main diagonal must be all 1s.</div>
              </div>
              <div className={`p-4 border-l-4 font-bold ${isSym ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-300 bg-slate-50 text-slate-400'}`}>
                Symmetric: {isSym ? 'YES ✓' : 'NO ✗'}
                <div className="text-xs font-normal mt-1">Matrix must equal its transpose ($M = M^T$).</div>
              </div>
              <div className={`p-4 border-l-4 font-bold ${isTrans ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-300 bg-slate-50 text-slate-400'}`}>
                Transitive: {isTrans ? 'YES ✓' : 'NO ✗'}
                <div className="text-xs font-normal mt-1">If $aRb$ and $bRc$, then $aRc$ must exist.</div>
              </div>

              <div className={`mt-4 p-6 border-2 text-center text-xl font-black uppercase tracking-widest ${isEquiv ? 'border-[#00FFFF] bg-[#ECFEFF] text-slate-800 shadow-[0_0_15px_#00FFFF]' : 'border-slate-300 bg-slate-100 text-slate-400'}`}>
                {isEquiv ? 'Equivalence Relation' : 'Not an Equivalence'}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
