"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate DMA Channels", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace DMA Channels", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function DMAChannels() {
  return (
    <Act2Simulator
      title="DMA Channels Visualization"
      summary="Explore the active data path and control flow for dma channels operations."
      hint="Issue the transfer and let the DMA controller handle the memory reads and writes."
      question="Which unit requests the bus for memory transfers?"
      answerKey="DMA controller"
      explanation="DMA transfers move data without CPU intervention once the bus is granted."
      nodes={nodes}
      actions={actions}
    />
  );
}
