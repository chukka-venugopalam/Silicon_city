"use client";

import { useState } from "react";

interface GateValidatorProps {
  question: string;
  correctAnswer: string;
  stepByStep: string;
}

export default function GateValidator({ question, correctAnswer, stepByStep }: GateValidatorProps) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const handleCheck = () => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedKey = correctAnswer.trim().toLowerCase();

    if (normalizedKey.length === 0) {
      setStatus("wrong");
      return;
    }

    if (normalizedAnswer === normalizedKey) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className={`mb-6 rounded-3xl border p-5 transition-all duration-200 ${
      status === "correct"
        ? "border-emerald-400 bg-emerald-50"
        : status === "wrong"
        ? "border-rose-400 bg-rose-50 animate-shake"
        : "border-slate-300 bg-white"
    }`}>
      <div className="mb-3 text-slate-700">
        <p className="font-semibold text-slate-900">NAT Question</p>
        <p>{question}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Type your numeric or text response"
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
        />
        <button
          type="button"
          onClick={handleCheck}
          className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-cyan-600"
        >
          Check
        </button>
      </div>

      {status === "correct" ? (
        <div className="mt-4 rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
          <p className="font-semibold text-emerald-700">Correct</p>
          <p>{stepByStep}</p>
        </div>
      ) : status === "wrong" ? (
        <div className="mt-4 rounded-2xl bg-rose-50 p-4 text-rose-700 shadow-sm">
          <p className="font-semibold">Incorrect answer.</p>
          <p>Try again or review the hint from the chapter.</p>
        </div>
      ) : null}
    </div>
  );
}
