"use client";

import { useEffect, useState } from "react";
import GateValidator from "./GateValidator";

export type NodeStatus = "idle" | "active" | "alert";

export type SimulatorAction = {
  label: string;
  badge: string;
  correct: boolean;
  detail: string;
  highlightIndex: number;
};

export type SimulatorNode = {
  label: string;
  value: string;
  description: string;
  status?: NodeStatus;
};

interface Act2SimulatorProps {
  title: string;
  summary: string;
  hint: string;
  question: string;
  answerKey: string;
  explanation: string;
  nodes: SimulatorNode[];
  actions: SimulatorAction[];
}

export default function Act2Simulator({
  title,
  summary,
  hint,
  question,
  answerKey,
  explanation,
  nodes,
  actions,
}: Act2SimulatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAction, setSelectedAction] = useState<SimulatorAction | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((current) => (current + 1 < nodes.length ? current + 1 : current));
    }, 2800);

    return () => clearTimeout(timer);
  }, [activeIndex, nodes.length]);

  const handleAction = (action: SimulatorAction) => {
    setSelectedAction(action);
    setStatus(action.correct ? "correct" : "wrong");
    setActiveIndex(action.highlightIndex);
  };

  const handleCheck = () => {
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedKey = answerKey.trim().toLowerCase();
    setStatus(normalizedAnswer === normalizedKey ? "correct" : "wrong");
  };

  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-2xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/20" />
          Interactive Simulator
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">{summary}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {nodes.map((node, index) => {
              const isActive = index === activeIndex;
              const statusClass = isActive
                ? "border-cyan-500 bg-cyan-500/10 text-slate-900 dark:bg-cyan-400/10 dark:text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200";

              return (
                <div key={node.label} className={`rounded-3xl border p-4 transition ${statusClass}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{node.label}</p>
                    <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{node.value}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{node.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => handleAction(action)}
                className={`rounded-3xl border px-5 py-4 text-left transition shadow-sm ${
                  selectedAction?.label === action.label
                    ? "border-cyan-500 bg-cyan-500/10 text-slate-900 dark:border-cyan-400 dark:bg-cyan-400/10 dark:text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-400"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{action.label}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{action.badge}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{action.detail}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/90">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">System Hint</p>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{hint}</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-100">{question}</label>
            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer here"
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-500/20"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCheck}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Validate Answer
              </button>
              <span className={`text-sm font-semibold ${status === "correct" ? "text-emerald-600" : status === "wrong" ? "text-rose-500" : "text-slate-500"}`}>
                {status === "correct" ? "Correct" : status === "wrong" ? "Incorrect" : "Awaiting input"}
              </span>
            </div>
          </div>

          {selectedAction ? (
            <div className="rounded-3xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-slate-800 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-slate-100">
              <p className="font-semibold">Action Result</p>
              <p className="mt-2 leading-6">{selectedAction.correct ? selectedAction.detail : "The system rejected that step. Try a different sequence."}</p>
            </div>
          ) : null}

          <GateValidator question={question} correctAnswer={answerKey} stepByStep={explanation} />
        </div>
      </div>
    </div>
  );
}
