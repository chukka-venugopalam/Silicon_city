"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate Page Replacement", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace Page Replacement", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function PageReplacement() {
  return (
    <Act2Simulator
      title="Page Replacement Visualization"
      summary="Explore the active data path and control flow for page replacement operations."
      hint="When in doubt, replace the page with the oldest reference timestamp."
      question="True or False: LRU removes the least recently used page."
      answerKey="True"
      explanation="LRU evicts the page that was least recently accessed."
      nodes={nodes}
      actions={actions}
    />
  );
}
