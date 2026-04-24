import DistrictCard from "@/components/DistrictCard";

export default function CityMap() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">The Silicon Map</h1>
        <p className="text-slate-500">The city is dark. Restore the districts to bring back the light.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DistrictCard act="ACT I" title="The Laws of Reality" description="Fix the city's fundamental logic. Discrete Math & Truth." status="available" color="bg-emerald-500" href="/act-1/chapter-1" />
        <DistrictCard act="ACT II" title="The First Pulse" description="Build the CPU heartbeat. Digital Logic & COA." status="locked" color="bg-violet-500" href="#" />
        <DistrictCard act="ACT III" title="The Architect's Hand" description="Master C & Algorithms to command the city." status="locked" color="bg-amber-500" href="#" />
      </div>
    </div>
  );
}