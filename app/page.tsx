import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8 bg-white text-slate-900 font-sans">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-none border-2 border-slate-200 animate-[bounce_3s_infinite]">
            <Sparkles className="text-cyan-500 w-10 h-10" />
          </div>
        </div>
        <h2 className="text-5xl font-black uppercase tracking-widest text-slate-900">
          Silicon City
        </h2>
        <p className="max-w-md mx-auto text-lg text-slate-500 leading-relaxed font-medium">
          Lead Architect, the foundation is laid. The laws of physics are waiting to be written. 
          Are you ready to spark the first logic gate?
        </p>
      </div>

      <Link href="/map">
        <button className="group relative px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 font-bold tracking-widest uppercase transition-all duration-300 hover:border-cyan-400 hover:text-cyan-500 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          Enter City
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-white"></span>
          </span>
        </button>
      </Link>
      
      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left">
        <div className="p-6 bg-white border-2 border-slate-200">
          <div className="text-cyan-500 font-bold text-[10px] uppercase tracking-widest mb-2">Status</div>
          <div className="text-slate-800 font-black uppercase">Environment Ready</div>
        </div>
        <div className="p-6 bg-white border-2 border-slate-200">
          <div className="text-cyan-500 font-bold text-[10px] uppercase tracking-widest mb-2">Next Step</div>
          <div className="text-slate-800 font-black uppercase">Define First Logic</div>
        </div>
        <div className="p-6 bg-white border-2 border-slate-200">
          <div className="text-cyan-500 font-bold text-[10px] uppercase tracking-widest mb-2">Architect</div>
          <div className="text-slate-800 font-black uppercase">Ready for Command</div>
        </div>
      </div>
    </div>
  );
}