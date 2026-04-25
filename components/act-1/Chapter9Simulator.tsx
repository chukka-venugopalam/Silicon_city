"use client";

import React, { useState } from "react";

export default function Chapter9Simulator() {
  const [voltage, setVoltage] = useState(2.5); // 0 to 5V

  // TTL Logic thresholds
  const vIL = 0.8; // Max voltage for Logic 0
  const vIH = 2.0; // Min voltage for Logic 1

  let logicState = "";
  let colorClass = "";
  
  if (voltage <= vIL) {
    logicState = "LOGIC 0 (LOW)";
    colorClass = "text-slate-800 border-slate-800 bg-slate-100";
  } else if (voltage >= vIH) {
    logicState = "LOGIC 1 (HIGH)";
    colorClass = "text-[#00FFFF] border-[#00FFFF] bg-[#ECFEFF] shadow-[0_0_15px_#00FFFF]";
  } else {
    logicState = "UNDEFINED (NOISE MARGIN)";
    colorClass = "text-red-500 border-red-500 bg-red-50";
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoltage(parseFloat(e.target.value));
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">TTL Voltage Logic Threshold Viewer</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-8">
          <label className="block text-slate-700 font-bold mb-4">Input Voltage (Vin): {voltage.toFixed(2)}V</label>
          <input 
            type="range" 
            min="0" max="5" step="0.1" 
            value={voltage} 
            onChange={handleSlider}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00FFFF]"
          />
        </div>

        <div className="flex gap-8 items-center justify-center">
          
          <div className="relative h-64 w-24 bg-slate-100 border border-slate-300 flex flex-col justify-end">
            <div className="absolute w-full border-t border-dashed border-slate-400" style={{bottom: '100%'}}><span className="absolute -left-10 -top-3 text-xs font-bold text-slate-500">5.0V</span></div>
            <div className="absolute w-full border-t border-dashed border-[#00FFFF]" style={{bottom: `${(vIH / 5) * 100}%`}}><span className="absolute -left-10 -top-3 text-xs font-bold text-cyan-600">2.0V</span></div>
            <div className="absolute w-full border-t border-dashed border-slate-800" style={{bottom: `${(vIL / 5) * 100}%`}}><span className="absolute -left-10 -top-3 text-xs font-bold text-slate-800">0.8V</span></div>
            <div className="absolute w-full border-t border-dashed border-slate-400" style={{bottom: '0%'}}><span className="absolute -left-10 -top-3 text-xs font-bold text-slate-500">0.0V</span></div>

            {/* Voltage Level Indicator */}
            <div 
              className={`w-full transition-all duration-100 ${colorClass.split(' ')[2]}`}
              style={{height: `${(voltage / 5) * 100}%`}}
            ></div>
          </div>

          <div className={`p-6 border-4 font-bold text-2xl transition-all w-80 text-center ${colorClass}`}>
            {logicState}
          </div>

        </div>

        <div className="mt-8 text-sm text-slate-600">
          <p className="mb-2"><strong>V_IL (Voltage Input Low Max):</strong> The maximum voltage the gate guarantees to interpret as a Logic 0. (0.8V for TTL)</p>
          <p><strong>V_IH (Voltage Input High Min):</strong> The minimum voltage the gate guarantees to interpret as a Logic 1. (2.0V for TTL)</p>
        </div>

      </div>
    </div>
  );
}
