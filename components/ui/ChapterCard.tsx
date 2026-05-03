import type { ReactNode } from "react";

interface ChapterCardProps {
  title: string;
  badge?: string;
  badgeColor?: string;
  children: ReactNode;
}

export const ChapterCard = ({ title, badge, badgeColor = "bg-slate-100 text-slate-500", children }: ChapterCardProps) => (
  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all duration-200 hover:shadow-md">
    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">GATE Theory</p>
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      </div>
      {badge ? (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>{badge}</span>
      ) : null}
    </div>
    <div className="text-slate-700">{children}</div>
  </div>
);