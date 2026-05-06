const fs = require("fs");
const path = require("path");

const chapters = [
  { id: 1, name: "Registers & Pipelines", component: "RegistersPipelines", answer: "R5", trap: "A pipeline stall is often caused by a data hazard when an instruction depends on the result of a previous stage.", shortcut: "Read the pipeline stages from left to right and identify when the next instruction can safely proceed.", questionA: "Which register should be read for the third decode stage?", questionB: "What is the most common pipeline stall source?" },
  { id: 2, name: "Cache Coherency", component: "CacheCoherency", answer: "MESI", trap: "Shared memory regions need a coherence protocol to avoid stale data across multiple caches.", shortcut: "Tag the cache line and track ownership states rather than invalidating blindly.", questionA: "Which coherence protocol uses the states Modified, Exclusive, Shared, Invalid?", questionB: "What coherence problem occurs when two caches keep different values for the same address?" },
  { id: 3, name: "Branch Prediction", component: "BranchPrediction", answer: "Taken", trap: "A static predictor can still be useful, but patterns often change mid-stream.", shortcut: "Favor taken paths in loops and backward branches for faster predictions.", questionA: "If a branch reverses direction frequently, is it better predicted as Taken or Not Taken?", questionB: "What does a misprediction cost in a pipeline?" },
  { id: 4, name: "Superscalar Architecture", component: "Superscalar", answer: "2", trap: "Parallel issue width is limited by data dependencies, not just the number of execution units.", shortcut: "Check instruction independence before issuing multiple operations in the same cycle.", questionA: "How many instructions does a dual-issue superscalar pipeline issue per cycle?", questionB: "What blocks superscalar issue when two instructions depend on the same register?" },
  { id: 5, name: "Tomasulo Reservation Station", component: "Tomasulo", answer: "Load", trap: "Reservation stations decouple instruction issue from execution readiness.", shortcut: "Use reservation stations to hold operands until the functional unit is ready.", questionA: "Which reservation station type receives memory addresses for loads?", questionB: "What is the main benefit of Tomasulo's algorithm?" },
  { id: 6, name: "Pipeline Stalls", component: "PipelineStalls", answer: "Data hazard", trap: "A stall disables the next instruction until the hazard clears.", shortcut: "Forwarding can avoid many stalls, but control hazards still require careful handling.", questionA: "What type of hazard occurs when an instruction needs a result that is not yet written?", questionB: "What is the effect of a stall on pipeline throughput?" },
  { id: 7, name: "Out-of-Order Execution", component: "OutOfOrderExecution", answer: "No", trap: "Out-of-order issue requires the processor to preserve program order at commit time.", shortcut: "Resolve dependencies before dispatching results back to the architectural register file.", questionA: "Should an instruction wait for its operands to be ready before executing out of order?", questionB: "What is the goal of out-of-order execution?" },
  { id: 8, name: "Scoreboarding", component: "Scoreboarding", answer: "Scoreboarding", trap: "Scoreboarding resolves hazards by tracking functional unit status and operand readiness.", shortcut: "Track busy units and operand availability in a central scoreboard.", questionA: "Which technique monitors functional unit readiness and instruction hazards?", questionB: "What does a scoreboard prevent?" },
  { id: 9, name: "Speculative Load Bypass", component: "SpeculativeLoad", answer: "Yes", trap: "Speculative loads can execute before older stores if dependency checks pass.", shortcut: "Allow speculative loads only when you can confirm there is no address overlap.", questionA: "Can a speculative load be rolled back if a later store conflicts?", questionB: "What is the risk of speculative load bypass?" },
  { id: 10, name: "Branch Folding", component: "BranchFolding", answer: "prediction", trap: "Branch folding blends prediction and prefetching to avoid control hazards.", shortcut: "Treat simple backward branches as fast paths for loops.", questionA: "Branch folding is most closely related to what technique?", questionB: "What does a correct branch prediction avoid?" },
  { id: 11, name: "Memory Banking", component: "MemoryBanking", answer: "Bank 1", trap: "Memory banks allow simultaneous accesses if addresses map to different banks.", shortcut: "Distribute sequential addresses across banks to maximize parallelism.", questionA: "Which bank serves address 0x04 in a 2-bank interleaved layout?", questionB: "What is the main advantage of banked memory?" },
  { id: 12, name: "Cache Associativity", component: "CacheAssociativity", answer: "2", trap: "Associativity determines how many lines compete for the same set.", shortcut: "Use set associativity to balance conflict misses and lookup cost.", questionA: "How many lines are in each set for a two-way associative cache?", questionB: "What type of miss occurs when two addresses map to the same set?" },
  { id: 13, name: "Prefetching Strategies", component: "Prefetching", answer: "True", trap: "Hardware prefetch detects sequential streams and warms the cache ahead of demand.", shortcut: "Prefetch contiguous blocks only when access patterns are predictable.", questionA: "Is hardware prefetching useful for regular sequential access?", questionB: "What is the downside of aggressive prefetching?" },
  { id: 14, name: "Virtual Memory Tiles", component: "VirtualMemory", answer: "Virtual", trap: "The TLB maps virtual page numbers to frames in physical memory.", shortcut: "Remember that page tables translate virtual addresses before physical access.", questionA: "Which address is translated by the TLB: virtual or physical?", questionB: "What is stored in a page table entry?" },
  { id: 15, name: "TLB Walkthrough", component: "TLBWalk", answer: "Check tag", trap: "A TLB lookup compares the virtual page number against stored tags.", shortcut: "First check the TLB tag before reading the frame number.", questionA: "What is the first step when searching the TLB?", questionB: "What happens on a TLB miss?" },
  { id: 16, name: "Page Replacement", component: "PageReplacement", answer: "True", trap: "LRU evicts the page that was least recently accessed.", shortcut: "When in doubt, replace the page with the oldest reference timestamp.", questionA: "True or False: LRU removes the least recently used page.", questionB: "What do page faults trigger?" },
  { id: 17, name: "DMA Channels", component: "DMAChannels", answer: "DMA controller", trap: "DMA transfers move data without CPU intervention once the bus is granted.", shortcut: "Issue the transfer and let the DMA controller handle the memory reads and writes.", questionA: "Which unit requests the bus for memory transfers?", questionB: "What does DMA free the CPU to do?" },
  { id: 18, name: "Interrupt Vector", component: "InterruptVector", answer: "RAM", trap: "The interrupt vector table lives in memory and points to handler addresses.", shortcut: "Keep the vector table in a known low-memory region for fast lookup.", questionA: "Where is the interrupt vector table stored?", questionB: "What does an interrupt vector contain?" },
  { id: 19, name: "System Calls", component: "SystemCalls", answer: "kernel", trap: "System calls cross the boundary from user mode to kernel mode.", shortcut: "Treat syscalls as controlled transitions to privileged execution.", questionA: "A system call switches execution to what mode?", questionB: "Why are syscalls used instead of direct hardware access?" },
  { id: 20, name: "Process States", component: "ProcessStates", answer: "blocked", trap: "A process waiting for I/O is not ready to run and enters the blocked state.", shortcut: "Differentiate ready, running, and blocked when scheduling processes.", questionA: "What state is a process in while waiting for I/O?", questionB: "Which state means the process can run but is not currently running?" },
  { id: 21, name: "Scheduling Policies", component: "Scheduling", answer: "cyclic", trap: "Round-robin cycles through processes with equal time slices.", shortcut: "Use a circular queue to rotate CPU time fairly among ready tasks.", questionA: "Round-robin follows which order?", questionB: "What is the key feature of time-slice scheduling?" },
  { id: 22, name: "Read/Write Locks", component: "ReadWriteLocks", answer: "exclusive", trap: "Multiple readers can share a lock, but a single writer needs exclusive access.", shortcut: "Allow concurrent read access only when no writer holds the lock.", questionA: "Read/write locks allow multiple readers and what kind of writer?", questionB: "Why are read/write locks useful?" },
  { id: 23, name: "Semaphore Race", component: "SemaphoreRace", answer: "signal", trap: "A semaphore uses P and V operations to acquire and release permits.", shortcut: "Use V to signal the next waiting process when a resource is freed.", questionA: "What does V stand for in semaphore notation?", questionB: "What problem do semaphores solve?" },
  { id: 24, name: "Context Switch", component: "ContextSwitch", answer: "context", trap: "Context switches save and restore CPU registers and program state.", shortcut: "Always preserve the process context before switching threads.", questionA: "What does a context switch save and restore?", questionB: "What is the overhead of frequent context switching?" },
  { id: 25, name: "Priority Boost", component: "PriorityBoost", answer: "starvation", trap: "Priority boosting prevents low-priority tasks from never getting CPU time.", shortcut: "Raise a starving thread temporarily to keep it from waiting forever.", questionA: "Priority boost is used to avoid what issue?", questionB: "What happens when a thread is boosted?" },
];

const act2Dir = path.join(__dirname, "components", "act-2");
const act2PagesDir = path.join(__dirname, "app", "act-2");

fs.mkdirSync(act2Dir, { recursive: true });

const sanitize = (value) => value.replace(/"/g, "\"");

function buildComponent(entry) {
  return `"use client";

import Act2Simulator from "@/components/ui/Act2Simulator";

const nodes = [
  { label: "Fetch", value: "Ready", description: "Instruction fetch unit is primed.", status: "active" },
  { label: "Decode", value: "Pending", description: "Decode stage waits for opcode analysis.", status: "idle" },
  { label: "Execute", value: "Waiting", description: "Execution logic holds until operands arrive.", status: "idle" },
  { label: "Commit", value: "Hold", description: "Results are queued for retirement.", status: "idle" },
];

const actions = [
  { label: "Activate ${entry.name}", badge: "Start", correct: true, detail: "The control path is initialized and the simulator begins updating state.", highlightIndex: 0 },
  { label: "Trace ${entry.name}", badge: "Inspect", correct: false, detail: "Inspecting the wrong stage can delay the next action.", highlightIndex: 2 },
  { label: "Reset Sequence", badge: "Reset", correct: false, detail: "A reset will restore the visual state but does not solve the specific structure error.", highlightIndex: 3 },
];

export default function ${entry.component}() {
  return (
    <Act2Simulator
      title="${entry.name} Visualization"
      summary="Explore the active data path and control flow for ${entry.name.toLowerCase()} operations."
      hint="${entry.shortcut}"
      question="${entry.questionA}"
      answerKey="${entry.answer}"
      explanation="${entry.trap}"
      nodes={nodes}
      actions={actions}
    />
  );
}
`;
}

function buildPage(entry) {
  return `import ChapterNavigation from '../../../components/ui/ChapterNavigation';
import { ChapterCard } from "@/components/ui/ChapterCard";
import { GateTrap } from "@/components/ui/GateTrap";
import { ArchitectShortcut } from "@/components/ui/ArchitectShortcut";
import { SimulatorContainer } from "@/components/ui/SimulatorContainer";
import ${entry.component} from "@/components/act-2/${entry.component}";

<div className="max-w-4xl mx-auto space-y-8 pb-24">
  <div className="space-y-2">
    <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">Act 2 — The First Pulse</div>
    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mission ${entry.id}: ${entry.name}</h1>
  </div>

  <ChapterCard title="System Briefing" badge="Status: Active" badgeColor="bg-cyan-100 text-cyan-800">
    The Pulse Core is seeking stability in the ${entry.name.toLowerCase()} sector. Use the diagnostic terminal to verify the control path and restore the node.
  </ChapterCard>

  <GateTrap>
    <strong>Diagnostic Trap:</strong> ${entry.trap}
  </GateTrap>

  <ArchitectShortcut>
    <strong>Architect Shortcut:</strong> ${entry.shortcut}
  </ArchitectShortcut>

  <SimulatorContainer>
    <${entry.component} />
  </SimulatorContainer>

  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-slate-900">The Proving Ground</h2>
    <p className="text-sm text-slate-600">Answer the following to demonstrate your understanding of ${entry.name.toLowerCase()}.</p>
    <ul className="list-disc space-y-2 pl-5 text-slate-700">
      <li><strong>Question 1 (NAT):</strong> ${entry.questionA}</li>
      <li><strong>Question 2 (NAT):</strong> ${entry.questionB}</li>
    </ul>
  </div>

  <ChapterNavigation currentChapter={${entry.id}} />
</div>
`;
}

for (const entry of chapters) {
  const componentPath = path.join(act2Dir, `${entry.component}.tsx`);
  const chapterDir = path.join(act2PagesDir, `chapter-2.${entry.id}`);
  const pagePath = path.join(chapterDir, "page.mdx");

  fs.mkdirSync(chapterDir, { recursive: true });
  fs.writeFileSync(componentPath, buildComponent(entry), "utf8");
  fs.writeFileSync(pagePath, buildPage(entry), "utf8");
}

console.log("Act 2 generators created for 25 chapters.");
