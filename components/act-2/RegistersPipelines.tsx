"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Registers & Pipelines", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Registers & Pipelines", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function RegistersPipelines() {
  return (
    <Act2Simulator
      title="Registers & Pipelines Visualization"
      summary="Explore the active data path and control flow for registers & pipelines operations."
      hint="Read the pipeline stages from left to right and identify when the next instruction can safely proceed."
      question="Which register should be read for the third decode stage?"
      answerKey="R5"
      explanation="A pipeline stall is often caused by a data hazard when an instruction depends on the result of a previous stage."
      nodes={nodes}
      actions={actions}
    />
  );
}
