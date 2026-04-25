import Link from 'next/link';

interface ChapterNavigationProps {
  currentChapter: number;
}

export default function ChapterNavigation({ currentChapter }: ChapterNavigationProps) {
  const previousChapter = currentChapter - 1;
  const nextChapter = currentChapter + 1;
  const hasPrevious = currentChapter > 1;
  const hasNext = currentChapter < 31;

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center bg-white">
      {hasPrevious ? (
        <Link 
          href={`/act-1/chapter-1.${previousChapter}`}
          className="group px-6 py-3 border border-cyan-400 text-cyan-500 font-bold tracking-widest text-sm hover:bg-cyan-50 transition-colors"
        >
          &larr; PREVIOUS SECTOR
        </Link>
      ) : (
        <div className="px-6 py-3 border border-slate-200 text-slate-300 font-bold tracking-widest text-sm cursor-not-allowed">
          &larr; PREVIOUS SECTOR
        </div>
      )}

      {hasNext ? (
        <Link 
          href={`/act-1/chapter-1.${nextChapter}`}
          className="group px-6 py-3 border border-cyan-400 text-cyan-500 font-bold tracking-widest text-sm hover:bg-cyan-50 transition-colors"
        >
          NEXT SECTOR &rarr;
        </Link>
      ) : (
        <div className="px-6 py-3 border border-slate-200 text-slate-300 font-bold tracking-widest text-sm cursor-not-allowed">
          NEXT SECTOR &rarr;
        </div>
      )}
    </div>
  );
}
