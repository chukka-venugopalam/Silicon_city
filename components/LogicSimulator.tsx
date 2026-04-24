"use client";
import React, { useState } from 'react';

export default function LogicSimulator() {
  const [p, setP] = useState(false);
  const [q, setQ] = useState(false);
  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner mt-6">
      <div className="flex gap-4 mb-8">
        <button onClick={() => setP(!p)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${p ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>P: {p ? '1' : '0'}</button>
        <button onClick={() => setQ(!q)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${q ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>Q: {q ? '1' : '0'}</button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between p-4 bg-white rounded-xl border border-slate-100">
          <span className="font-semibold text-slate-600 font-mono">AND (P ∧ Q)</span>
          <span className="font-bold">{p && q ? 'TRUE' : 'FALSE'}</span>
        </div>
        <div className="flex justify-between p-4 bg-slate-900 rounded-xl text-amber-400">
          <span className="font-semibold font-mono">IMPLICATION (P → Q)</span>
          <span className="font-bold">{(!p || q) ? 'TRUE' : 'FALSE (TRAP!)'}</span>
        </div>
      </div>
    </div>
  );
}