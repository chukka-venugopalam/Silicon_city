"use client";

import React, { useState, useEffect } from "react";

export default function Chapter1Simulator() {
  const [binary, setBinary] = useState("");
  const [hex, setHex] = useState("");
  const [decimal, setDecimal] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      resetSystem();
      return;
    }
    if (!/^[01]+$/.test(val)) {
      triggerError("Invalid Binary Input");
      return;
    }
    setBinary(val);
    const dec = parseInt(val, 2);
    setDecimal(dec.toString());
    setHex(dec.toString(16).toUpperCase());
    triggerSuccess();
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val === "") {
      resetSystem();
      return;
    }
    if (!/^[0-9A-F]+$/.test(val)) {
      triggerError("Invalid Hexadecimal Input");
      return;
    }
    setHex(val);
    const dec = parseInt(val, 16);
    setDecimal(dec.toString());
    setBinary(dec.toString(2));
    triggerSuccess();
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      resetSystem();
      return;
    }
    if (!/^[0-9]+$/.test(val)) {
      triggerError("Invalid Decimal Input");
      return;
    }
    setDecimal(val);
    const dec = parseInt(val, 10);
    setBinary(dec.toString(2));
    setHex(dec.toString(16).toUpperCase());
    triggerSuccess();
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setShake(true);
    setSuccess(false);
    setTimeout(() => setShake(false), 400);
  };

  const triggerSuccess = () => {
    setError("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
  };

  const resetSystem = () => {
    setBinary("");
    setHex("");
    setDecimal("");
    setError("");
    setShake(false);
    setSuccess(false);
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Real-Time Radix Converter</h3>
      
      <div 
        className={`flex flex-col gap-6 p-6 border transition-all duration-300 bg-white ${
          shake ? "translate-x-1 -translate-x-1 border-red-500" : ""
        } ${success ? "border-[#00FFFF] shadow-[0_0_10px_#00FFFF]" : "border-slate-300"}`}
      >
        {error && <div className="text-red-500 font-bold">{error}</div>}
        
        <div>
          <label className="block text-slate-700 font-bold mb-2">Binary (Base-2)</label>
          <input 
            type="text" 
            value={binary} 
            onChange={handleBinaryChange}
            className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all text-slate-800"
            placeholder="e.g., 1010"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">Decimal (Base-10)</label>
          <input 
            type="text" 
            value={decimal} 
            onChange={handleDecimalChange}
            className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all text-slate-800"
            placeholder="e.g., 10"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-2">Hexadecimal (Base-16)</label>
          <input 
            type="text" 
            value={hex} 
            onChange={handleHexChange}
            className="w-full p-3 border border-slate-300 focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all text-slate-800"
            placeholder="e.g., A"
          />
        </div>

        <button 
          onClick={resetSystem}
          className="mt-4 py-2 px-4 border border-[#00FFFF] text-slate-700 font-bold hover:bg-[#00FFFF] hover:text-white transition-colors"
        >
          Reset System
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .translate-x-1 { transform: translateX(4px); }
        .-translate-x-1 { transform: translateX(-4px); }
      `}} />
    </div>
  );
}
