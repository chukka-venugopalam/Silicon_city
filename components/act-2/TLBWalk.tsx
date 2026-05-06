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
  { label: "Activate TLB Walkthrough", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace TLB Walkthrough", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function TLBWalk() {
  return (
    <Act2Simulator
      title="TLB Walkthrough Visualization"
      summary="Explore the active data path and control flow for tlb walkthrough operations."
      hint="First check the TLB tag before reading the frame number."
      question="What is the first step when searching the TLB?"
      answerKey="Check tag"
      explanation="A TLB lookup compares the virtual page number against stored tags."
      nodes={nodes}
      actions={actions}
    />
  );
}
