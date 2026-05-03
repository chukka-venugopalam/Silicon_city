"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ChapterNavigationProps {
  currentChapter: number;
  actNumber?: number;
}

export default function ChapterNavigation({ currentChapter, actNumber = 1 }: ChapterNavigationProps) {
  const [saved, setSaved] = useState(false);
  const chapterCount = actNumber === 2 ? 25 : 31;
  const chapterKey = `completed-act-${actNumber}-chapter-${currentChapter}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(chapterKey, "true");
    setSaved(true);
  }, [chapterKey]);

  const previousChapter = currentChapter - 1;
  const nextChapter = currentChapter + 1;
  const hasPrevious = currentChapter > 1;
  const hasNext = currentChapter < chapterCount;
  const previousHref = actNumber === 1 ? `/act-1/chapter-1.${previousChapter}` : `/act-${actNumber}/chapter-${previousChapter}`;
  const nextHref = actNumber === 1 ? `/act-1/chapter-1.${nextChapter}` : `/act-${actNumber}/chapter-${nextChapter}`;

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className={`inline-flex h-2.5 w-2.5 rounded-full ${saved ? "bg-emerald-500" : "bg-slate-300"}`} />
          <span>{saved ? "Chapter progress saved" : "Saving progress..."}</span>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-500">
          Act {actNumber}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {hasPrevious ? (
          <Link
            href={previousHref}
            className="inline-flex items-center justify-center rounded-full border border-cyan-400 bg-white px-6 py-3 text-sm font-bold text-cyan-500 transition hover:bg-cyan-50"
          >
            &larr; PREVIOUS SECTOR
          </Link>
        ) : (
          <div className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-400">
            &larr; PREVIOUS SECTOR
          </div>
        )}

        {hasNext ? (
          <Link
            href={nextHref}
            className="inline-flex items-center justify-center rounded-full border border-cyan-400 bg-white px-6 py-3 text-sm font-bold text-cyan-500 transition hover:bg-cyan-50"
          >
            NEXT SECTOR &rarr;
          </Link>
        ) : (
          <div className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-400">
            NEXT SECTOR &rarr;
          </div>
        )}
      </div>
    </div>
  );
}
