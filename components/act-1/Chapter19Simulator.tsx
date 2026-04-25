"use client";

import React, { useState, useEffect } from "react";

export default function Chapter19Simulator() {
  const [cells, setCells] = useState(Array(8).fill(0));
  const [expression, setExpression] = useState("0");

  const kMapIndices = [
    0, 1, 3, 2, // A=0: m0, m1, m3, m2
    4, 5, 7, 6  // A=1: m4, m5, m7, m6
  ];

  const labels = [
    "A'B'C'", "A'B'C", "A'BC", "A'BC'",
    "AB'C'", "AB'C", "ABC", "ABC'"
  ];

  const toggleCell = (idx: number) => {
    const newCells = [...cells];
    newCells[idx] = newCells[idx] === 0 ? 1 : 0;
    setCells(newCells);
  };

  useEffect(() => {
    // Quine-McCluskey is too complex for a raw React snippet without external libs.
    // We will do a simplified heuristic string builder for educational display.
    if (cells.every(c => c === 0)) { setExpression("0"); return; }
    if (cells.every(c => c === 1)) { setExpression("1"); return; }

    const activeMinterms = kMapIndices.filter(m => cells[m] === 1);
    
    // For educational UI, we just display the unminimized SOP of selected cells
    // and prompt the user to group them visually.
    const sop = activeMinterms.map(m => {
      const bin = m.toString(2).padStart(3, '0');
      return `${bin[0] === '1' ? 'A' : "A'"}${bin[1] === '1' ? 'B' : "B'"}${bin[2] === '1' ? 'C' : "C'"}`;
    }).join(" + ");

    setExpression(sop);

  }, [cells]);

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">3-Variable Karnaugh Map Engine</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-4 justify-between items-end mb-8">
           <div className="text-slate-600 font-bold">
             Select cells to assign $f(A,B,C) = 1$. Notice the Gray Code ordering of columns.
           </div>
           <button 
             onClick={() => setCells(Array(8).fill(0))}
             className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 font-bold text-sm transition-colors"
           >
             Clear Map
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse mx-auto text-center font-mono">
            <thead>
              <tr>
                <th className="p-4 border-r-2 border-b-2 border-slate-800 bg-slate-100 relative w-24">
                  <div className="absolute top-2 right-2 text-xs text-slate-500">BC</div>
                  <div className="absolute bottom-2 left-2 text-xs text-slate-500">A</div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <svg width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#334155" strokeWidth="2"/></svg>
                  </div>
                </th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest">00</th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest">01</th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest text-[#00FFFF] bg-slate-800">11</th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest">10</th>
              </tr>
            </thead>
            <tbody>
              {/* Row A=0 */}
              <tr>
                <td className="p-4 border-r-2 border-slate-800 bg-slate-50 font-bold text-slate-700">0</td>
                {[0, 1, 2, 3].map(colIdx => {
                  const m = kMapIndices[colIdx];
                  const isActive = cells[m] === 1;
                  return (
                    <td 
                      key={m} 
                      onClick={() => toggleCell(m)}
                      className={`border border-slate-300 p-0 h-24 relative cursor-pointer transition-all ${isActive ? 'bg-[#ECFEFF]' : 'hover:bg-slate-50'}`}
                    >
                      <div className="absolute top-1 right-1 text-xs text-slate-400">m{m}</div>
                      <div className={`text-4xl font-black ${isActive ? 'text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]' : 'text-slate-300'}`}>
                        {isActive ? '1' : '0'}
                      </div>
                    </td>
                  )
                })}
              </tr>
              {/* Row A=1 */}
              <tr>
                <td className="p-4 border-r-2 border-slate-800 bg-slate-50 font-bold text-slate-700">1</td>
                {[4, 5, 6, 7].map(colIdx => {
                  const m = kMapIndices[colIdx];
                  const isActive = cells[m] === 1;
                  return (
                    <td 
                      key={m} 
                      onClick={() => toggleCell(m)}
                      className={`border border-slate-300 p-0 h-24 relative cursor-pointer transition-all ${isActive ? 'bg-[#ECFEFF]' : 'hover:bg-slate-50'}`}
                    >
                      <div className="absolute top-1 right-1 text-xs text-slate-400">m{m}</div>
                      <div className={`text-4xl font-black ${isActive ? 'text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]' : 'text-slate-300'}`}>
                        {isActive ? '1' : '0'}
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 text-center">
           <h4 className="font-bold text-slate-800 mb-4">Raw Canonical SOP Expression:</h4>
           <div className="font-mono text-cyan-600 font-bold text-xl min-h-[30px] break-words">
             $f = {expression}$
           </div>
           <div className="mt-6 text-sm text-slate-500 max-w-2xl mx-auto border-t border-slate-300 pt-4">
             <strong>Architect's Note:</strong> Visual groupings of size $2^n$ (2, 4, or 8 adjacent 1s) allow you to eliminate $n$ variables from the terms. Grouping $m_0$ and $m_1$ eliminates the variable $C$.
           </div>
        </div>

      </div>
    </div>
  );
}
