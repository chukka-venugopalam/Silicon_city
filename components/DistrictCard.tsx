import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';

export default function DistrictCard({ title, act, description, status, color, href }: any) {
  const isLocked = status === 'locked';
  return (
    <div className={`group p-6 rounded-3xl border transition-all duration-500 ${isLocked ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:shadow-xl hover:-translate-y-1'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
          {isLocked ? <Lock size={20} /> : <span className="font-bold text-xs">{act}</span>}
        </div>
      </div>
      <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{description}</p>
      {!isLocked ? (
        <Link href={href} className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-4 transition-all">
          Enter District <ArrowRight size={16} />
        </Link>
      ) : (
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">District Locked</span>
      )}
    </div>
  );
}