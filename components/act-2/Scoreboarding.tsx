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
  { label: "Activate Scoreboarding", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Scoreboarding", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function Scoreboarding() {
  return (
    <Act2Simulator
      title="Scoreboarding Visualization"
      summary="Explore the active data path and control flow for scoreboarding operations."
      hint="Track busy units and operand availability in a central scoreboard."
      question="Which technique monitors functional unit readiness and instruction hazards?"
      answerKey="Scoreboarding"
      explanation="Scoreboarding resolves hazards by tracking functional unit status and operand readiness."
      nodes={nodes}
      actions={actions}
    />
  );
}
