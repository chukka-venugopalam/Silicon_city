"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Speculative Load Bypass", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Speculative Load Bypass", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function SpeculativeLoad() {
  return (
    <Act2Simulator
      title="Speculative Load Bypass Visualization"
      summary="Explore the active data path and control flow for speculative load bypass operations."
      hint="Allow speculative loads only when you can confirm there is no address overlap."
      question="Can a speculative load be rolled back if a later store conflicts?"
      answerKey="Yes"
      explanation="Speculative loads can execute before older stores if dependency checks pass."
      nodes={nodes}
      actions={actions}
    />
  );
}
