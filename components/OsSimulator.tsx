"use client";
import React, { useState } from 'react';

export default function OsSimulator() {
  const [processes, setProcesses] = useState([
    { id: 'P1', burstTime: 5, color: 'bg-blue-400' },
    { id: 'P2', burstTime: 3, color: 'bg-emerald-400' },
    { id: 'P3', burstTime: 8, color: 'bg-amber-400' },
  ]);

  // Calculate Completion Times for FCFS
  let currentTime = 0;
  const ganttChart = processes.map(p => {
    const start = currentTime;
    currentTime += p.burstTime;
    return { ...p, start, end: currentTime };
  });

  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner mt-6">
      <h4 className="text-lg font-bold text-slate-800 mb-4">FCFS Gantt Chart Visualizer</h4>
      
      {/* The Gantt Chart */}
      <div className="flex w-full h-16 bg-slate-200 rounded-xl overflow-hidden mb-4 shadow-sm border border-slate-300">
        {ganttChart.map((p, index) => (
          <div 
            key={p.id} 
            className={`${p.color} h-full flex items-center justify-center font-bold text-slate-900 border-r border-black/10 transition-all`}
            style={{ width: `${(p.burstTime / currentTime) * 100}%` }}
          >
            {p.id}
          </div>
        ))}
      </div>

      {/* The Timeline Markers */}
      <div className="flex w-full relative h-6 text-xs font-bold text-slate-500">
        <span className="absolute left-0">0</span>
        {ganttChart.map(p => (
          <span 
            key={p.id} 
            className="absolute -translate-x-1/2" 
            style={{ left: `${(p.end / currentTime) * 100}%` }}
          >
            {p.end}
          </span>
        ))}
      </div>
    </div>
  );
}