"use client";

import React, { useState } from "react";

export default function Chapter20Simulator() {
  const [cells, setCells] = useState(Array(16).fill("0")); // "0", "1", "X"

  const kMapIndices = [
    0, 1, 3, 2,   // AB=00
    4, 5, 7, 6,   // AB=01
    12, 13, 15, 14, // AB=11
    8, 9, 11, 10  // AB=10
  ];

  const toggleCell = (idx: number) => {
    const newCells = [...cells];
    if (newCells[idx] === "0") newCells[idx] = "1";
    else if (newCells[idx] === "1") newCells[idx] = "X";
    else newCells[idx] = "0";
    setCells(newCells);
  };

  const getMintermStr = (m: number) => {
    const bin = m.toString(2).padStart(4, '0');
    return `${bin[0] === '1' ? 'A' : "A'"}${bin[1] === '1' ? 'B' : "B'"}${bin[2] === '1' ? 'C' : "C'"}${bin[3] === '1' ? 'D' : "D'"}`;
  };

  const ones = cells.map((val, idx) => val === "1" ? idx : -1).filter(v => v !== -1);
  const dcares = cells.map((val, idx) => val === "X" ? idx : -1).filter(v => v !== -1);
  
  const onesStr = ones.length > 0 ? ones.sort((a,b)=>a-b).join(", ") : "∅";
  const dcaresStr = dcares.length > 0 ? dcares.sort((a,b)=>a-b).join(", ") : "∅";

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">4-Variable K-Map & Don't Care Matrix</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-4 justify-between items-end mb-8 bg-slate-50 p-4 border border-slate-200">
           <div className="text-slate-600 font-bold text-sm">
             Click cells to cycle states: <span className="text-slate-400 font-black">0</span> $\rightarrow$ <span className="text-[#00FFFF] font-black drop-shadow-[0_0_2px_#00FFFF]">1</span> $\rightarrow$ <span className="text-red-500 font-black drop-shadow-[0_0_2px_red]">X</span> (Don't Care).
           </div>
           <button 
             onClick={() => setCells(Array(16).fill("0"))}
             className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 font-bold text-sm transition-colors"
           >
             Clear Matrix
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse mx-auto text-center font-mono">
            <thead>
              <tr>
                <th className="p-4 border-r-2 border-b-2 border-slate-800 bg-slate-100 relative w-24">
                  <div className="absolute top-2 right-2 text-xs text-slate-500">CD</div>
                  <div className="absolute bottom-2 left-2 text-xs text-slate-500">AB</div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <svg width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#334155" strokeWidth="2"/></svg>
                  </div>
                </th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest">00</th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest">01</th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-[#00FFFF] bg-slate-800 tracking-widest">11</th>
                <th className="p-4 border-b-2 border-slate-800 bg-slate-50 w-24 font-bold text-slate-700 tracking-widest">10</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((rowIdx) => {
                const rowLabel = ["00", "01", "11", "10"][rowIdx];
                const rowStyle = rowIdx === 2 ? "bg-slate-800 text-[#00FFFF]" : "bg-slate-50 text-slate-700";
                return (
                  <tr key={rowIdx}>
                    <td className={`p-4 border-r-2 border-slate-800 font-bold tracking-widest ${rowStyle}`}>{rowLabel}</td>
                    {[0, 1, 2, 3].map(colIdx => {
                      const m = kMapIndices[rowIdx * 4 + colIdx];
                      const val = cells[m];
                      let cellClass = "hover:bg-slate-50 text-slate-300";
                      if (val === "1") cellClass = "bg-[#ECFEFF] text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]";
                      if (val === "X") cellClass = "bg-red-50 text-red-500 drop-shadow-[0_0_5px_red]";

                      return (
                        <td 
                          key={m} 
                          onClick={() => toggleCell(m)}
                          className={`border border-slate-300 p-0 h-24 relative cursor-pointer transition-all select-none ${cellClass}`}
                        >
                          <div className="absolute top-1 right-1 text-xs text-slate-400">m{m}</div>
                          <div className="text-4xl font-black">
                            {val}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="p-4 border border-slate-200">
             <h4 className="font-bold text-slate-800 mb-2">Ones Target ($\Sigma m$)</h4>
             <div className="font-mono text-cyan-600 font-bold">
               {onesStr}
             </div>
          </div>
          
          <div className="p-4 border border-slate-200">
             <h4 className="font-bold text-slate-800 mb-2">Don't Cares ($\Sigma d$)</h4>
             <div className="font-mono text-red-500 font-bold">
               {dcaresStr}
             </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-500 p-4 border-l-4 border-slate-800 bg-slate-100">
          <strong>Strategic Heuristic:</strong> Treat 'X' as '1' ONLY if it helps form a larger valid group ($2, 4, 8, 16$) that covers a real '1'. Treat 'X' as '0' if including it does not expand a group or cover new 1s. Never circle a group composed entirely of 'X's.
        </div>

      </div>
    </div>
  );
}
