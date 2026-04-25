import type { ReactNode } from "react";

export const ChapterCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-white border border-slate-200 border-l-4 border-l-[#00FFFF] p-6 rounded-sm shadow-sm my-4 text-slate-700">
    {children}
  </div>
);