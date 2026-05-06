"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Tomasulo Reservation Station", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Tomasulo Reservation Station", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function Tomasulo() {
  return (
    <Act2Simulator
      title="Tomasulo Reservation Station Visualization"
      summary="Explore the active data path and control flow for tomasulo reservation station operations."
      hint="Use reservation stations to hold operands until the functional unit is ready."
      question="Which reservation station type receives memory addresses for loads?"
      answerKey="Load"
      explanation="Reservation stations decouple instruction issue from execution readiness."
      nodes={nodes}
      actions={actions}
    />
  );
}
