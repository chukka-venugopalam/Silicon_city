import React from 'react';

export default function ChapterCard({ title, badge, badgeColor, children }: any) {
  return (
    <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-500 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}