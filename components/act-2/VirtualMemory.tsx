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
  { label: "Activate Virtual Memory Tiles", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Virtual Memory Tiles", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function VirtualMemory() {
  return (
    <Act2Simulator
      title="Virtual Memory Tiles Visualization"
      summary="Explore the active data path and control flow for virtual memory tiles operations."
      hint="Remember that page tables translate virtual addresses before physical access."
      question="Which address is translated by the TLB: virtual or physical?"
      answerKey="Virtual"
      explanation="The TLB maps virtual page numbers to frames in physical memory."
      nodes={nodes}
      actions={actions}
    />
  );
}
