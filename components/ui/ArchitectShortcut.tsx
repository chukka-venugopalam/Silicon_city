import type { ReactNode } from "react";

export const ArchitectShortcut = ({ children }: { children: ReactNode }) => (
  <div className="bg-[#ECFEFF] border border-[#00FFFF] p-5 rounded-sm my-4">
    <h4 className="text-slate-800 font-bold mb-2 flex items-center gap-2">⚡ Architect Shortcut</h4>
    <div className="text-slate-700">{children}</div>
  </div>
);