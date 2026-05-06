"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Cache Coherency", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Cache Coherency", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function CacheCoherency() {
  return (
    <Act2Simulator
      title="Cache Coherency Visualization"
      summary="Explore the active data path and control flow for cache coherency operations."
      hint="Tag the cache line and track ownership states rather than invalidating blindly."
      question="Which coherence protocol uses the states Modified, Exclusive, Shared, Invalid?"
      answerKey="MESI"
      explanation="Shared memory regions need a coherence protocol to avoid stale data across multiple caches."
      nodes={nodes}
      actions={actions}
    />
  );
}
