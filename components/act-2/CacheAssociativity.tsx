"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Cache Associativity", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Cache Associativity", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function CacheAssociativity() {
  return (
    <Act2Simulator
      title="Cache Associativity Visualization"
      summary="Explore the active data path and control flow for cache associativity operations."
      hint="Use set associativity to balance conflict misses and lookup cost."
      question="How many lines are in each set for a two-way associative cache?"
      answerKey="2"
      explanation="Associativity determines how many lines compete for the same set."
      nodes={nodes}
      actions={actions}
    />
  );
}
