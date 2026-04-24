import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Sparkles className="text-emerald-500 w-10 h-10" />
          </div>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          The Void is quiet.
        </h2>
        <p className="max-w-md mx-auto text-lg text-slate-500 leading-relaxed">
          Lead Architect, the foundation is laid. The laws of physics are waiting to be written. 
          Are you ready to spark the first logic gate?
        </p>
      </div>

      {/* Wrapping the button in a Link to navigate to the map */}
      <Link href="/map">
        <button className="group relative px-8 py-3 bg-slate-900 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-emerald-500/20">
          Initialize Act I: Laws of Reality
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      </Link>
      
      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left">
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-2">Status</div>
          <div className="text-slate-900 font-semibold">Environment Ready</div>
        </div>
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="text-blue-500 font-bold text-[10px] uppercase tracking-widest mb-2">Next Step</div>
          <div className="text-slate-900 font-semibold">Define First Logic</div>
        </div>
        <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="text-amber-500 font-bold text-[10px] uppercase tracking-widest mb-2">Architect</div>
          <div className="text-slate-900 font-semibold">Ready for Command</div>
        </div>
      </div>
    </div>
  );
}