"use client";

import React, { useState, useEffect } from "react";

export default function Chapter3Simulator() {
  const [bits, setBits] = useState(Array(32).fill(0));
  const [decimalValue, setDecimalValue] = useState("0");
  const [equation, setEquation] = useState("");

  useEffect(() => {
    // 01000000010010001111010111000011 (3.14)
    // Default let's set it to 1.0 -> 0 01111111 0000...
    const initialBits = Array(32).fill(0);
    initialBits[1] = 0;
    initialBits[2] = 1;
    initialBits[3] = 1;
    initialBits[4] = 1;
    initialBits[5] = 1;
    initialBits[6] = 1;
    initialBits[7] = 1;
    initialBits[8] = 1;
    setBits(initialBits);
  }, []);

  useEffect(() => {
    calculateValue(bits);
  }, [bits]);

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const calculateValue = (currentBits: number[]) => {
    const signBit = currentBits[0];
    const exponentBits = currentBits.slice(1, 9);
    const mantissaBits = currentBits.slice(9);

    const sign = signBit === 1 ? -1 : 1;
    const exponent = parseInt(exponentBits.join(''), 2);
    
    let mantissaVal = 0;
    for (let i = 0; i < mantissaBits.length; i++) {
      if (mantissaBits[i] === 1) {
        mantissaVal += Math.pow(2, -(i + 1));
      }
    }

    if (exponent === 255) {
      if (mantissaVal !== 0) {
        setDecimalValue("NaN");
        setEquation("NaN");
      } else {
        setDecimalValue(sign === 1 ? "Infinity" : "-Infinity");
        setEquation(sign === 1 ? "+Infinity" : "-Infinity");
      }
      return;
    }

    if (exponent === 0) {
      if (mantissaVal === 0) {
        setDecimalValue(sign === 1 ? "0" : "-0");
        setEquation(`(-1)^${signBit} × 0 × 2^(-126)`);
      } else {
        // Subnormal
        const val = sign * mantissaVal * Math.pow(2, -126);
        setDecimalValue(val.toExponential(4));
        setEquation(`(-1)^${signBit} × ${mantissaVal} × 2^(-126)`);
      }
      return;
    }

    // Normal
    const actualExponent = exponent - 127;
    const val = sign * (1 + mantissaVal) * Math.pow(2, actualExponent);
    setDecimalValue(val.toString().length > 10 ? val.toExponential(4) : val.toString());
    setEquation(`(-1)^${signBit} × (1 + ${mantissaVal.toFixed(4)}) × 2^(${actualExponent})`);
  };

  const resetSystem = () => {
    setBits(Array(32).fill(0));
  };

  return (
    <div className="p-6 font-sans">
      <h3 className="text-xl font-bold text-slate-800 mb-4">IEEE 754 Single Precision Breakdown</h3>
      
      <div className="bg-white p-6 border border-slate-300">
        
        <div className="mb-6">
          <div className="text-sm font-bold text-slate-500 mb-2">Click bits to toggle:</div>
          <div className="flex flex-wrap gap-1">
            {/* Sign Bit */}
            <div 
              onClick={() => toggleBit(0)}
              className={`w-8 h-10 flex items-center justify-center font-mono font-bold cursor-pointer transition-colors border
                ${bits[0] ? 'bg-red-500 text-white border-red-600' : 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200'}`}
              title="Sign Bit"
            >
              {bits[0]}
            </div>

            {/* Exponent Bits */}
            <div className="flex gap-1 ml-2">
              {bits.slice(1, 9).map((bit, idx) => (
                <div 
                  key={idx + 1}
                  onClick={() => toggleBit(idx + 1)}
                  className={`w-8 h-10 flex items-center justify-center font-mono font-bold cursor-pointer transition-colors border
                    ${bit ? 'bg-green-500 text-white border-green-600' : 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'}`}
                  title={`Exponent Bit ${7 - idx}`}
                >
                  {bit}
                </div>
              ))}
            </div>

            {/* Mantissa Bits */}
            <div className="flex flex-wrap gap-1 ml-2 max-w-full">
              {bits.slice(9).map((bit, idx) => (
                <div 
                  key={idx + 9}
                  onClick={() => toggleBit(idx + 9)}
                  className={`w-6 h-10 flex items-center justify-center text-sm font-mono font-bold cursor-pointer transition-colors border
                    ${bit ? 'bg-[#00FFFF] text-slate-800 border-cyan-600 shadow-[0_0_5px_#00FFFF]' : 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100'}`}
                  title={`Mantissa Bit ${23 - idx}`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 mt-2 text-sm font-bold">
            <span className="text-red-600">Sign (1 bit)</span>
            <span className="text-green-600 ml-5">Exponent (8 bits)</span>
            <span className="text-cyan-600 ml-64">Fraction / Mantissa (23 bits)</span>
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-sm">
          <div className="text-slate-500 font-bold mb-1">Equation:</div>
          <div className="font-mono text-slate-800 mb-4">{equation}</div>
          
          <div className="text-slate-500 font-bold mb-1">Decimal Value:</div>
          <div className="text-3xl font-bold text-slate-800">{decimalValue}</div>
        </div>

        <button 
          onClick={resetSystem}
          className="mt-6 py-2 px-4 border border-[#00FFFF] text-slate-700 font-bold hover:bg-[#00FFFF] hover:text-white transition-colors"
        >
          Reset System
        </button>
      </div>
    </div>
  );
}
