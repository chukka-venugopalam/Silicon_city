"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Process States", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Process States", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function ProcessStates() {
  return (
    <Act2Simulator
      title="Process States Visualization"
      summary="Explore the active data path and control flow for process states operations."
      hint="Differentiate ready, running, and blocked when scheduling processes."
      question="What state is a process in while waiting for I/O?"
      answerKey="blocked"
      explanation="A process waiting for I/O is not ready to run and enters the blocked state."
      nodes={nodes}
      actions={actions}
    />
  );
}
