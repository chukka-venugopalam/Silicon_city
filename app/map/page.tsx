import Link from 'next/link';

export default function CityMap() {
  const acts = [
    { num: 1, title: "The Logical Singularity", status: "ACTIVE", href: "/act-1/chapter-1.1" },
    { num: 2, title: "The First Pulse", status: "LOCKED", href: "#" },
    { num: 3, title: "The Architect's Hand", status: "LOCKED", href: "#" },
    { num: 4, title: "The Abstract Machine", status: "LOCKED", href: "#" },
    { num: 5, title: "The Tower", status: "LOCKED", href: "#" },
    { num: 6, title: "The Infinite Tape", status: "LOCKED", href: "#" },
    { num: 7, title: "The Network Matrix", status: "LOCKED", href: "#" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      {/* Grid Paper Background */}
      <div className="absolute inset-0 z-0 opacity-40" style={{
        backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-12 inline-block border-b-4 border-cyan-400 pb-4 bg-white/80 px-4 rounded-t-sm">
          <h1 className="text-5xl font-black tracking-tight uppercase text-slate-800">Mainframe Architecture</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {acts.map((act) => (
            <div key={act.num} className="h-full">
              {act.status === "ACTIVE" ? (
                <Link href={act.href} className="block h-full group">
                  <div className="h-full bg-white border-2 border-slate-200 p-8 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] relative overflow-hidden">
                    {/* Pulsing indicator */}
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
                  </div>
                </Link>
              ) : (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}