import ChapterCard from "@/components/ChapterCard";
import LogicSimulator from "@/components/LogicSimulator";
import { AlertCircle } from "lucide-react";

export default function ChapterOne() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      <div className="space-y-2">
        <div className="text-emerald-500 font-bold text-sm tracking-widest uppercase">Act I — Mission 01</div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">The Laws of Truth</h1>
      </div>
      <ChapterCard title="The Mission Alert" badge="Story" badgeColor="bg-amber-50 text-amber-600">
        <p>Before the city can think, it must know what is True. We begin with Propositional Logic.</p>
      </ChapterCard>
      <ChapterCard title="The Logic Circuit" badge="Simulator" badgeColor="bg-blue-50 text-blue-600">
        <p>Test the rules of truth below. Watch the Implication trap closely!</p>
        <LogicSimulator />
      </ChapterCard>
      <div className="p-6 bg-slate-900 rounded-3xl text-white flex gap-6">
        <AlertCircle className="text-amber-400 shrink-0" />
        <p className="text-sm"><strong>GATE Trick:</strong> P → Q is only False when P is True and Q is False. Otherwise, it is True!</p>
      </div>
    </div>
  );
}