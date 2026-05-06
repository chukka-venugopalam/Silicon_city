"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Priority Boost", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Priority Boost", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function PriorityBoost() {
  return (
    <Act2Simulator
      title="Priority Boost Visualization"
      summary="Explore the active data path and control flow for priority boost operations."
      hint="Raise a starving thread temporarily to keep it from waiting forever."
      question="Priority boost is used to avoid what issue?"
      answerKey="starvation"
      explanation="Priority boosting prevents low-priority tasks from never getting CPU time."
      nodes={nodes}
      actions={actions}
    />
  );
}
