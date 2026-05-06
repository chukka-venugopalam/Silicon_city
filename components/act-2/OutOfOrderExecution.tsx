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
  { label: "Activate Out-of-Order Execution", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Out-of-Order Execution", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function OutOfOrderExecution() {
  return (
    <Act2Simulator
      title="Out-of-Order Execution Visualization"
      summary="Explore the active data path and control flow for out-of-order execution operations."
      hint="Resolve dependencies before dispatching results back to the architectural register file."
      question="Should an instruction wait for its operands to be ready before executing out of order?"
      answerKey="No"
      explanation="Out-of-order issue requires the processor to preserve program order at commit time."
      nodes={nodes}
      actions={actions}
    />
  );
}
