"use client";

import React, { useState } from "react";

export default function Chapter25Simulator() {
  const [ffType, setFfType] = useState("JK");

  const getExcitationData = () => {
    switch(ffType) {
      case "SR":
        return [
          { q: 0, qnext: 0, in1: "0", in2: "X" },
          { q: 0, qnext: 1, in1: "1", in2: "0" },
          { q: 1, qnext: 0, in1: "0", in2: "1" },
          { q: 1, qnext: 1, in1: "X", in2: "0" }
        ];
      case "JK":
        return [
          { q: 0, qnext: 0, in1: "0", in2: "X" },
          { q: 0, qnext: 1, in1: "1", in2: "X" },
          { q: 1, qnext: 0, in1: "X", in2: "1" },
          { q: 1, qnext: 1, in1: "X", in2: "0" }
        ];
      case "D":
        return [
          { q: 0, qnext: 0, in1: "0", in2: null },
          { q: 0, qnext: 1, in1: "1", in2: null },
          { q: 1, qnext: 0, in1: "0", in2: null },
          { q: 1, qnext: 1, in1: "1", in2: null }
        ];
      case "T":
        return [
          { q: 0, qnext: 0, in1: "0", in2: null },
          { q: 0, qnext: 1, in1: "1", in2: null },
          { q: 1, qnext: 0, in1: "1", in2: null },
          { q: 1, qnext: 1, in1: "0", in2: null }
        ];
      default: return [];
    }
  };

  const getEq = () => {
    switch(ffType) {
      case "SR": return "Q(t+1) = S + R'Q(t)";
      case "JK": return "Q(t+1) = JQ'(t) + K'Q(t)";
      case "D":  return "Q(t+1) = D";
      case "T":  return "Q(t+1) = T ⊕ Q(t)";
      default: return "";
    }
  };

  const data = getExcitationData();

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Flip-Flop Excitation Matrix</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="flex gap-4 mb-8">
          {["SR", "JK", "D", "T"].map(type => (
            <button
              key={type}
              onClick={() => setFfType(type)}
              className={`flex-1 py-3 font-bold border-2 transition-all text-xl ${ffType === type ? 'bg-[#00FFFF] text-slate-900 border-[#00FFFF] shadow-[0_0_10px_#00FFFF]' : 'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100'}`}
            >
              {type} FF
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="border border-slate-200">
            <h4 className="bg-slate-800 text-white font-bold p-3 tracking-widest text-center">EXCITATION TABLE</h4>
            <table className="w-full text-center">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="p-3 text-slate-700">Q(t)</th>
                  <th className="p-3 text-slate-700">Q(t+1)</th>
                  <th className="p-3 text-[#00FFFF] bg-slate-700">{ffType === "SR" ? "S" : ffType === "JK" ? "J" : ffType}</th>
                  {data[0].in2 !== null && <th className="p-3 text-[#00FFFF] bg-slate-700">{ffType === "SR" ? "R" : "K"}</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-lg">{row.q}</td>
                    <td className="p-3 font-mono font-bold text-lg">{row.qnext}</td>
                    <td className={`p-3 font-mono font-black text-xl ${row.in1 === 'X' ? 'text-red-500' : 'text-slate-800'}`}>{row.in1}</td>
                    {row.in2 !== null && <td className={`p-3 font-mono font-black text-xl ${row.in2 === 'X' ? 'text-red-500' : 'text-slate-800'}`}>{row.in2}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-6">
             <div className="border border-slate-200 bg-slate-50 p-6 flex flex-col justify-center items-center flex-1">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Characteristic Equation</span>
                <span className="font-mono text-2xl font-black text-slate-800">{getEq()}</span>
             </div>
             
             <div className="border border-slate-200 bg-slate-50 p-6">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 block">Hardware Conversion Logic</span>
                <p className="text-slate-600 text-sm">
                  To convert Flip-Flop $A$ into Flip-Flop $B$:
                  <br/><br/>
                  1. Write the target excitation table for $B$.<br/>
                  2. Append the inputs required by the available FF $A$ to achieve the same state transitions.<br/>
                  3. Solve K-Maps for $A$'s inputs in terms of $B$'s inputs and $Q(t)$.
                </p>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
