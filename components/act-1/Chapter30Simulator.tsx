"use client";

import React, { useState } from "react";

export default function Chapter30Simulator() {
  const setS = [1, 2, 3, 4, 6, 12];
  
  // Relation: a divides b
  const divides = (a: number, b: number) => b % a === 0;

  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Pre-calculate Hasse edges (covering relation: a divides b, and no c exists such that a divides c and c divides b)
  const isCovering = (a: number, b: number) => {
    if (a >= b || !divides(a, b)) return false;
    for (const c of setS) {
      if (c !== a && c !== b && divides(a, c) && divides(c, b)) {
        return false;
      }
    }
    return true;
  };

  const getHasseEdges = () => {
    const edges = [];
    for (const a of setS) {
      for (const b of setS) {
        if (isCovering(a, b)) edges.push([a, b]);
      }
    }
    return edges;
  };

  const edges = getHasseEdges();

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Hasse Diagram Synthesizer (Divisibility Poset)</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="bg-slate-50 p-4 border border-slate-200 mb-8 font-mono text-slate-700">
           Let S = {'{'}1, 2, 3, 4, 6, 12{'}'}.<br/>
           Relation R = {'{'}(a, b) | a divides b{'}'}.
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center">
           
           <div className="flex-1 border-4 border-slate-800 bg-slate-100 p-8 relative min-h-[400px]">
             {/* Fake SVG Graph. We'll manually position nodes for the Divisibility lattice of 12. */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {edges.map(([a, b], idx) => {
                   // Manual coordinate mapping
                   const coords: Record<number, [string, string]> = {
                     12: ['50%', '10%'],
                     4:  ['30%', '40%'],
                     6:  ['70%', '40%'],
                     2:  ['30%', '70%'],
                     3:  ['70%', '70%'],
                     1:  ['50%', '90%']
                   };
                   const [x1, y1] = coords[a];
                   const [x2, y2] = coords[b];

                   const isHighlighted = activeNode === a || activeNode === b;

                   return (
                     <line 
                       key={idx} 
                       x1={x1} y1={y1} x2={x2} y2={y2} 
                       stroke={isHighlighted ? '#00FFFF' : '#94a3b8'} 
                       strokeWidth={isHighlighted ? 4 : 2} 
                     />
                   )
                })}
             </svg>

             {/* Nodes */}
             {[12, 4, 6, 2, 3, 1].map((n) => {
                const coords: Record<number, [string, string]> = {
                  12: ['50%', '10%'],
                  4:  ['30%', '40%'],
                  6:  ['70%', '40%'],
                  2:  ['30%', '70%'],
                  3:  ['70%', '70%'],
                  1:  ['50%', '90%']
                };
                const [left, top] = coords[n];
                const isActive = activeNode === n;

                return (
                  <div 
                    key={n}
                    onMouseEnter={() => setActiveNode(n)}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center font-black text-xl border-4 cursor-pointer transition-all ${isActive ? 'bg-[#ECFEFF] border-[#00FFFF] text-[#00FFFF] shadow-[0_0_15px_#00FFFF]' : 'bg-white border-slate-800 text-slate-800'}`}
                    style={{ left, top }}
                  >
                    {n}
                  </div>
                )
             })}
           </div>

           <div className="w-full md:w-80 flex flex-col gap-6">
              <div className="p-4 border-l-4 border-amber-400 bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-1">Partially Ordered Set (POSET)</h4>
                <p className="text-sm text-slate-600">A relation that is Reflexive, Antisymmetric, and Transitive. The divisibility relation is a classic POSET.</p>
              </div>
              <div className="p-4 border-l-4 border-[#00FFFF] bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-1">Hasse Reduction Rules</h4>
                <p className="text-sm text-slate-600">
                  1. <strong>Remove Reflexivity:</strong> Do not draw self-loops (e.g., $1|1$).<br/>
                  2. <strong>Remove Transitivity:</strong> If $1|2$ and $2|4$, do NOT draw a line from $1$ to $4$. Only draw direct "covering" connections.<br/>
                  3. <strong>Directionality:</strong> Draw implied direction upwards. No arrowheads needed.
                </p>
              </div>
              <div className="p-4 border-l-4 border-violet-500 bg-slate-50">
                <h4 className="font-bold text-slate-800 mb-1">Lattice Property</h4>
                <p className="text-sm text-slate-600">Because every pair of elements has a unique Least Upper Bound (LCM) and Greatest Lower Bound (GCD) within the set, this specific POSET is also a <strong>Lattice</strong>.</p>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
