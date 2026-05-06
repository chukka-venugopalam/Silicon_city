"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Superscalar Architecture", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Superscalar Architecture", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function Superscalar() {
  return (
    <Act2Simulator
      title="Superscalar Architecture Visualization"
      summary="Explore the active data path and control flow for superscalar architecture operations."
      hint="Check instruction independence before issuing multiple operations in the same cycle."
      question="How many instructions does a dual-issue superscalar pipeline issue per cycle?"
      answerKey="2"
      explanation="Parallel issue width is limited by data dependencies, not just the number of execution units."
      nodes={nodes}
      actions={actions}
    />
  );
}
