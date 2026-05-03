"use client";

import React, { useState } from "react";

export default function BranchPrediction() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const checkAnswer = () => {
    const normalized = answer.trim().toLowerCase();
    const expected = "taken";
    if (normalized === expected) {
      setFeedback("Success: the sector is stabilized.");
    } else {
      setFeedback("Mismatch detected. Recheck the system pattern.");
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">Branch Prediction Diagnostics</h3>
        <p className="mt-2 text-sm text-slate-600">A static predictor can still be useful, but patterns often change mid-stream.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="block text-sm font-medium text-slate-700">Answer the prompt</span>
          <input
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            placeholder="Type your answer here"
          />
        </label>

        <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">System Hint</p>
          <p className="text-sm text-slate-600">Favor taken paths in loops and backward branches for faster predictions.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={checkAnswer}
        className="rounded-2xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
      >
        Validate Input
      </button>

      {feedback ? <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-700">{feedback}</div> : null}
    </div>
  );
}
