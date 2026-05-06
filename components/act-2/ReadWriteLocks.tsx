"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Read/Write Locks", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Read/Write Locks", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function ReadWriteLocks() {
  return (
    <Act2Simulator
      title="Read/Write Locks Visualization"
      summary="Explore the active data path and control flow for read/write locks operations."
      hint="Allow concurrent read access only when no writer holds the lock."
      question="Read/write locks allow multiple readers and what kind of writer?"
      answerKey="exclusive"
      explanation="Multiple readers can share a lock, but a single writer needs exclusive access."
      nodes={nodes}
      actions={actions}
    />
  );
}
