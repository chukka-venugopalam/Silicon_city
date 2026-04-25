"use client";

import React, { useState } from "react";

export default function Chapter2Simulator() {
  const [a, setA] = useState("1010"); // 10
  const [b, setB] = useState("0101"); // 5
  
  const [onesComp, setOnesComp] = useState("");
  const [twosComp, setTwosComp] = useState("");
  const [result, setResult] = useState("");
  
  const [shakeField, setShakeField] = useState("");
  const [successField, setSuccessField] = useState("");

  const triggerError = (field: string) => {
    setShakeField(field);
    setSuccessField("");
    setTimeout(() => setShakeField(""), 400);
  };

  const triggerSuccess = (field: string) => {
    setShakeField("");
    setSuccessField(field);
    setTimeout(() => setSuccessField(""), 1000);
  };

  const verifyOnes = (val: string) => {
    setOnesComp(val);
    const expected = b.split('').map(bit => bit === '1' ? '0' : '1').join('');
    if (val === expected) triggerSuccess("ones");
    else if (val.length === b.length) triggerError("ones");
  };

  const verifyTwos = (val: string) => {
    setTwosComp(val);
    const expected = (parseInt(b.split('').map(bit => bit === '1' ? '0' : '1').join(''), 2) + 1)
      .toString(2).padStart(b.length, '0');
    if (val === expected) triggerSuccess("twos");
    else if (val.length === b.length) triggerError("twos");
  };

  const verifyResult = (val: string) => {
    setResult(val);
    // Add A and 2s comp of B
    const expectedTwos = (parseInt(b.split('').map(bit => bit === '1' ? '0' : '1').join(''), 2) + 1);
    let expectedSum = (parseInt(a, 2) + expectedTwos).toString(2);
    // truncate to length of A
    if (expectedSum.length > a.length) {
        expectedSum = expectedSum.slice(expectedSum.length - a.length);
    } else {
        expectedSum = expectedSum.padStart(a.length, '0');
    }
    
    if (val === expectedSum) triggerSuccess("result");
    else if (val.length >= a.length) triggerError("result");
  };

  const resetSystem = () => {
    setA("1010");
    setB("0101");
    setOnesComp("");
    setTwosComp("");
    setResult("");
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">2's Complement Subtractor: A - B</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">Operand A</label>
            <input type="text" value={a} onChange={(e) => setA(e.target.value.replace(/[^01]/g, ''))} maxLength={8} className="w-full p-2 border border-slate-300 focus:outline-none focus:border-[#00FFFF] text-slate-800" />
          </div>
          <div className="flex-1">
            <label className="block text-slate-700 font-bold mb-2">Operand B</label>
            <input type="text" value={b} onChange={(e) => setB(e.target.value.replace(/[^01]/g, ''))} maxLength={8} className="w-full p-2 border border-slate-300 focus:outline-none focus:border-[#00FFFF] text-slate-800" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 font-bold mb-2">Step 1: 1's Complement of B</label>
            <input 
              type="text" 
              value={onesComp} 
              onChange={(e) => verifyOnes(e.target.value.replace(/[^01]/g, ''))}
              maxLength={b.length}
              className={`w-full p-2 border transition-all text-slate-800 focus:outline-none
                ${shakeField === "ones" ? "border-red-500 translate-x-1" : ""}
                ${successField === "ones" ? "border-[#00FFFF] shadow-[0_0_8px_#00FFFF]" : "border-slate-300"}
              `}
              placeholder="Invert bits of B"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2">Step 2: 2's Complement of B (+1)</label>
            <input 
              type="text" 
              value={twosComp} 
              onChange={(e) => verifyTwos(e.target.value.replace(/[^01]/g, ''))}
              maxLength={b.length}
              className={`w-full p-2 border transition-all text-slate-800 focus:outline-none
                ${shakeField === "twos" ? "border-red-500 translate-x-1" : ""}
                ${successField === "twos" ? "border-[#00FFFF] shadow-[0_0_8px_#00FFFF]" : "border-slate-300"}
              `}
              placeholder="Add 1 to 1's Complement"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-2">Step 3: A + (2's Comp B) [Discard Carry]</label>
            <input 
              type="text" 
              value={result} 
              onChange={(e) => verifyResult(e.target.value.replace(/[^01]/g, ''))}
              maxLength={a.length}
              className={`w-full p-2 border transition-all text-slate-800 focus:outline-none
                ${shakeField === "result" ? "border-red-500 translate-x-1" : ""}
                ${successField === "result" ? "border-[#00FFFF] shadow-[0_0_8px_#00FFFF]" : "border-slate-300"}
              `}
              placeholder="Result of Subtraction"
            />
          </div>
        </div>

        <button 
          onClick={resetSystem}
          className="mt-6 py-2 px-4 border border-[#00FFFF] text-slate-700 font-bold hover:bg-[#00FFFF] hover:text-white transition-colors"
        >
          Reset System
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .translate-x-1 { transform: translateX(4px); }
      `}} />
    </div>
  );
}
