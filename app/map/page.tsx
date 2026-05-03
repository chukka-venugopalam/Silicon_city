"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ActCard {
  num: number;
  title: string;
  href: string;
  locked: boolean;
  chapterCount: number;
}

const acts: ActCard[] = [
  { num: 1, title: "The Logical Singularity", href: "/act-1/chapter-1.1", locked: false, chapterCount: 31 },
  { num: 2, title: "The First Pulse", href: "/act-2/chapter-1", locked: false, chapterCount: 25 },
  { num: 3, title: "The Architect's Hand", href: "#", locked: true, chapterCount: 31 },
  { num: 4, title: "The Abstract Machine", href: "#", locked: true, chapterCount: 31 },
  { num: 5, title: "The Tower", href: "#", locked: true, chapterCount: 31 },
  { num: 6, title: "The Infinite Tape", href: "#", locked: true, chapterCount: 31 },
  { num: 7, title: "The Network Matrix", href: "#", locked: true, chapterCount: 31 },
];

export default function CityMap() {
  const [progress, setProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    const completed: Record<number, number> = {};
    acts.forEach((act) => {
      completed[act.num] = 0;
    });

    if (typeof window !== "undefined") {
      Object.keys(window.localStorage).forEach((key) => {
        const match = key.match(/^completed-act-(\d+)-chapter-/);
        if (match) {
          const actId = Number(match[1]);
          if (completed[actId] !== undefined) {
            completed[actId] += 1;
          }
        }
      });
    }

    setProgress(completed);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12 inline-block border-b-4 border-cyan-400 pb-4 bg-white/80 px-4 rounded-t-sm">
          <h1 className="text-5xl font-black tracking-tight uppercase text-slate-800">Mainframe Architecture</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {acts.map((act) => {
            const completed = progress[act.num] ?? 0;
            const percent = act.chapterCount > 0 ? Math.min(100, Math.round((completed / act.chapterCount) * 100)) : 0;
            const isComplete = percent === 100 && !act.locked;

            return (
              <div key={act.num} className="h-full">
                {act.locked ? (
                  <div className="h-full bg-white border-2 border-slate-200 p-8 grayscale opacity-60 cursor-not-allowed">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-slate-400 font-black tracking-widest text-lg">ACT {act.num}</span>
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="text-slate-500 font-bold tracking-widest text-xs uppercase">Data Encrypted</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-400 uppercase">{act.title}</h2>
                  </div>
                ) : (
                  <Link href={act.href} className="block h-full group">
                    <div className="h-full bg-white border-2 border-slate-200 p-8 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-cyan-500 font-black tracking-widest text-lg">ACT {act.num}</span>
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFFF] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFFF]"></span>
                          </span>
                          <span className="text-[#00FFFF] font-bold tracking-widest text-xs uppercase">System Online</span>
                        </div>
                      </div>
                      <h2 className="text-3xl font-black text-slate-800 uppercase group-hover:text-cyan-500 transition-colors">{act.title}</h2>
                      <div className="mt-8">
                        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                          <span>Progress</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-cyan-400 transition-all duration-300" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                      {isComplete ? (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                          <span>✓</span>
                          <span>Completed</span>
                        </div>
                      ) : null}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
