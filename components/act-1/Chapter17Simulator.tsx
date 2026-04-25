"use client";

import React, { useState } from "react";

export default function Chapter17Simulator() {
  const [activeScope, setActiveScope] = useState<string | null>(null);

  // Expression: ∀x ( ∃y P(x, y) → ( ∀x Q(x, z) ∨ R(x) ) )
  // We'll break it down into interactive spans.

  const renderFormula = () => {
    return (
      <div className="font-mono text-3xl font-bold text-slate-800 flex flex-wrap gap-2 items-center justify-center cursor-default">
        
        {/* Outer Forall x */}
        <span 
          onMouseEnter={() => setActiveScope('outer-x')}
          onMouseLeave={() => setActiveScope(null)}
          className={`px-2 py-1 rounded cursor-pointer transition-all ${activeScope === 'outer-x' ? 'bg-[#00FFFF] text-slate-900 shadow-[0_0_10px_#00FFFF]' : 'hover:bg-slate-200'}`}
        >
          ∀x
        </span>
        
        <span>(</span>

        {/* Exists y */}
        <span 
          onMouseEnter={() => setActiveScope('inner-y')}
          onMouseLeave={() => setActiveScope(null)}
          className={`px-2 py-1 rounded cursor-pointer transition-all ${activeScope === 'inner-y' ? 'bg-violet-400 text-white shadow-[0_0_10px_rgba(167,139,250,0.8)]' : 'hover:bg-slate-200'}`}
        >
          ∃y
        </span>

        <span>P(</span>
        <span className={`transition-colors ${activeScope === 'outer-x' ? 'text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]' : ''}`}>x</span>
        <span>,</span>
        <span className={`transition-colors ${activeScope === 'inner-y' ? 'text-violet-500 drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]' : ''}`}>y</span>
        <span>)</span>

        <span className="mx-2">→</span>
        <span>(</span>

        {/* Inner Forall x (Shadowing) */}
        <span 
          onMouseEnter={() => setActiveScope('inner-x')}
          onMouseLeave={() => setActiveScope(null)}
          className={`px-2 py-1 rounded cursor-pointer transition-all ${activeScope === 'inner-x' ? 'bg-amber-400 text-slate-900 shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'hover:bg-slate-200'}`}
        >
          ∀x
        </span>
        
        <span>Q(</span>
        <span className={`transition-colors ${activeScope === 'inner-x' ? 'text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]' : (activeScope === 'outer-x' ? 'text-slate-300 line-through' : '')}`}>x</span>
        <span>,</span>
        <span className={`transition-colors ${activeScope === 'free-z' ? 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'text-red-500'}`}>z</span>
        <span>)</span>

        <span className="mx-2">∨</span>

        <span>R(</span>
        <span className={`transition-colors ${activeScope === 'outer-x' ? 'text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]' : ''}`}>x</span>
        <span>)</span>

        <span>)</span>
        <span>)</span>
      </div>
    );
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Quantifier Scope Binding Visualizer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-8 text-center text-slate-600 font-bold">
          Hover over any quantifier to illuminate its binding scope.
        </div>

        <div className="p-12 bg-slate-50 border border-slate-200 min-h-[200px] flex items-center justify-center select-none">
           {renderFormula()}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-4 border-l-4 border-[#00FFFF] bg-slate-50">
             <h4 className="font-bold text-slate-800 mb-1">Lexical Scoping</h4>
             <p className="text-sm text-slate-600">A variable is bound by the innermost quantifier that declares it. Notice how the outer $\forall x$ does not bind the $x$ inside $Q(x,z)$.</p>
           </div>
           
           <div className="p-4 border-l-4 border-amber-400 bg-slate-50">
             <h4 className="font-bold text-slate-800 mb-1">Variable Shadowing</h4>
             <p className="text-sm text-slate-600">The inner $\forall x$ creates a new, local scope for $x$, masking the outer declaration. This is structurally identical to variable scope in programming languages like C.</p>
           </div>

           <div className="p-4 border-l-4 border-red-500 bg-slate-50 md:col-span-2">
             <h4 className="font-bold text-slate-800 mb-1">Free Variables</h4>
             <p className="text-sm text-slate-600">The variable $z$ is not bound by any quantifier in this expression. It is a <strong className="text-red-500">Free Variable</strong>. An expression with free variables cannot be evaluated to a strict Truth/False value until a domain context is provided for $z$.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
