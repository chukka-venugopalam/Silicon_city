import type { ReactNode } from "react";

export const GateTrap = ({ children }: { children: ReactNode }) => (
  <div className="bg-slate-100 border-2 border-slate-700 p-5 rounded-sm my-4">
    <h4 className="text-slate-800 font-bold mb-2 uppercase tracking-wider flex items-center gap-2">⚠️ GATE Trap</h4>
    <div className="text-slate-700">{children}</div>
  </div>
);