"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Branch Folding", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Branch Folding", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function BranchFolding() {
  return (
    <Act2Simulator
      title="Branch Folding Visualization"
      summary="Explore the active data path and control flow for branch folding operations."
      hint="Treat simple backward branches as fast paths for loops."
      question="Branch folding is most closely related to what technique?"
      answerKey="prediction"
      explanation="Branch folding blends prediction and prefetching to avoid control hazards."
      nodes={nodes}
      actions={actions}
    />
  );
}
