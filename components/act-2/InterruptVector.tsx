"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Interrupt Vector", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Interrupt Vector", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function InterruptVector() {
  return (
    <Act2Simulator
      title="Interrupt Vector Visualization"
      summary="Explore the active data path and control flow for interrupt vector operations."
      hint="Keep the vector table in a known low-memory region for fast lookup."
      question="Where is the interrupt vector table stored?"
      answerKey="RAM"
      explanation="The interrupt vector table lives in memory and points to handler addresses."
      nodes={nodes}
      actions={actions}
    />
  );
}
