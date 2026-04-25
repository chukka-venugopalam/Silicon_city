import type { ReactNode } from "react";

export const SimulatorContainer = ({ children }: { children: ReactNode }) => (
  <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm my-6 overflow-hidden">
    {children}
  </div>
);