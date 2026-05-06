"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";
import type { SimulatorAction, SimulatorNode } from "@/components/ui/Act2Simulator";

const nodes: SimulatorNode[] = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions: SimulatorAction[] = [
  { label: "Activate Pipeline Stalls", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Pipeline Stalls", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function PipelineStalls() {
  return (
    <Act2Simulator
      title="Pipeline Stalls Visualization"
      summary="Explore the active data path and control flow for pipeline stalls operations."
      hint="Forwarding can avoid many stalls, but control hazards still require careful handling."
      question="What type of hazard occurs when an instruction needs a result that is not yet written?"
      answerKey="Data hazard"
      explanation="A stall disables the next instruction until the hazard clears."
      nodes={nodes}
      actions={actions}
    />
  );
}
