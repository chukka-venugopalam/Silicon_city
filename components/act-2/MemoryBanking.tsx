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
  { label: "Activate Memory Banking", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Memory Banking", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function MemoryBanking() {
  return (
    <Act2Simulator
      title="Memory Banking Visualization"
      summary="Explore the active data path and control flow for memory banking operations."
      hint="Distribute sequential addresses across banks to maximize parallelism."
      question="Which bank serves address 0x04 in a 2-bank interleaved layout?"
      answerKey="Bank 1"
      explanation="Memory banks allow simultaneous accesses if addresses map to different banks."
      nodes={nodes}
      actions={actions}
    />
  );
}
