import type { ReactNode } from "react";

export const SimulatorContainer = ({ children }: { children: ReactNode }) => (
  <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl shadow-sm my-6 overflow-hidden">
    <div className="mb-4 flex items-center justify-between rounded-t-3xl border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
      <span>Simulator Console</span>
      <span className="rounded-full bg-white px-2 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-500">Live</span>
    </div>
    <div className="px-1 pb-1">{children}</div>
  </div>
);