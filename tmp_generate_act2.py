import os
from pathlib import Path

root = Path(__file__).resolve().parent
components_dir = root / "components" / "act-2"
app_act2_dir = root / "app" / "act-2"
components_dir.mkdir(parents=True, exist_ok=True)

pages = [
    (1, "RamGrid", "RAM Grid"),
    (2, "PointersAmpersandStar", "& vs *"),
    (3, "PointerArithmetic", "Pointer Arithmetic"),
    (4, "DoublePointers", "Double Pointers"),
    (5, "MallocHeapVsStack", "Malloc / Heap vs Stack"),
    (6, "CallByValueRef", "Call by Value vs Reference"),
    (7, "CallStackFrames", "Call Stack Frames"),
    (8, "RecursionSteps", "Recursion Steps"),
    (9, "RecursiveTree", "Recursive Tree"),
    (10, "TailRecursion", "Tail Recursion"),
    (11, "CPUFetchDecode", "CPU Fetch / Decode"),
    (12, "SixteenBitParser", "16-bit Parser"),
    (13, "ImmediateVsDirect", "Immediate vs Direct Addressing"),
    (14, "IndirectAddressing", "Indirect Addressing"),
    (15, "IndexedAddressing", "Indexed Addressing"),
    (16, "OneDArrays", "1D Arrays"),
    (17, "TwoDArrays", "2D Arrays"),
    (18, "RowColMajor", "Row / Column Major"),
    (19, "SinglyLinkedList", "Singly Linked Lists"),
    (20, "DoublyLinkedList", "Doubly Linked Lists"),
    (21, "ListInsertDelete", "List Insert / Delete"),
    (22, "Stacks", "Stacks"),
    (23, "StackPostfixEval", "Stack Postfix Evaluation"),
    (24, "LinearQueueDrift", "Linear Queue Drift"),
    (25, "LinkedQueues", "Linked Queues"),
]

code_templates = {
    "RamGrid": '''"use client";
import { useState } from "react";

const rows = 4;
const cols = 8;

export default function RamGrid() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Tap a memory cell to inspect its address and stored value.</p>
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: rows * cols }, (_, index) => {
          const address = 0x1000 + index * 4;
          const active = selected === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              className={`rounded-2xl border px-3 py-4 text-xs text-left transition ${
                active ? "border-cyan-400 bg-cyan-50 shadow-sm" : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-slate-500">0x{address.toString(16).toUpperCase()}</p>
              <p className="font-semibold text-slate-900">Value {index + 1}</p>
            </button>
          );
        })}
      </div>
      {selected !== null ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 text-slate-700">
          <p className="text-sm text-slate-500">Inspecting cell</p>
          <p className="font-semibold">Address: 0x{(0x1000 + selected * 4).toString(16).toUpperCase()}</p>
          <p className="font-semibold">Stored value: {selected + 1}</p>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-600">Select a memory cell to begin.</div>
      )}
    </div>
  );
}
''',
    "PointersAmpersandStar": '''"use client";
import { useState } from "react";

export default function PointersAmpersandStar() {
  const [showAddress, setShowAddress] = useState(false);
  const [showTarget, setShowTarget] = useState(false);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Interact with pointer symbols and reveal how & and * behave.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Code</p>
          <pre className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-800">int x = 10;
int *p = &x;
int y = *p;</pre>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <button
            type="button"
            onClick={() => setShowAddress((current) => !current)}
            className="mb-3 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            {showAddress ? "Hide" : "Reveal"} &amp;x
          </button>
          <button
            type="button"
            onClick={() => setShowTarget((current) => !current)}
            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            {showTarget ? "Hide" : "Reveal"} *p
          </button>
          <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            <p>&amp;x is the address of x: <span className="font-semibold">0x2000</span></p>
            {showAddress ? <p className="mt-2 text-cyan-700">Pointer p stores that address.</p> : null}
            <p className="mt-2">*p is the value stored at the address.</p>
            {showTarget ? <p className="mt-2 text-cyan-700">*p evaluates to 10.</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
''',
    "PointerArithmetic": '''"use client";
import { useState } from "react";

export default function PointerArithmetic() {
  const [offset, setOffset] = useState(0);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Adjust the pointer offset and watch the resulting address move by element size.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">Base pointer: int *p = 0x3000;</p>
        <p className="text-sm text-slate-600">Element size: 4 bytes</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOffset((current) => Math.max(current - 1, -3))}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
          >
            -1
          </button>
          <button
            type="button"
            onClick={() => setOffset((current) => Math.min(current + 1, 5))}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
          >
            +1
          </button>
        </div>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          <p>Pointer offset: <span className="font-semibold">{offset}</span></p>
          <p>Computed address: <span className="font-semibold">0x{(0x3000 + offset * 4).toString(16).toUpperCase()}</span></p>
        </div>
      </div>
    </div>
  );
}
''',
    "DoublePointers": '''"use client";
import { useState } from "react";

export default function DoublePointers() {
  const [stage, setStage] = useState(1);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Explore how a pointer to a pointer resolves its target step by step.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setStage(step)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold ${
                stage === step ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              Step {step}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          {stage === 1 && <p>int x = 42;</p>}
          {stage === 2 && <p>int *p = &x; // p contains the address of x</p>}
          {stage === 3 && <p>int **q = &p; // q contains the address of p</p>}
          <p className="mt-3 font-semibold">Double dereference: **q = 42</p>
        </div>
      </div>
    </div>
  );
}
''',
    "MallocHeapVsStack": '''"use client";
import { useState } from "react";

const boxes = [
  { label: "x = 5", zone: "stack" },
  { label: "p = malloc(4)", zone: "heap" },
  { label: "arr[10]", zone: "stack" },
  { label: "node = malloc(sizeof(Node))", zone: "heap" },
];

export default function MallocHeapVsStack() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Choose whether each allocation belongs on the stack or heap.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {boxes.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setSelected(item.label)}
            className={`rounded-3xl border p-4 text-left transition ${
              selected === item.label ? "border-cyan-400 bg-cyan-50" : "border-slate-200 bg-white"
            }`}
          >
            <p className="font-semibold text-slate-900">{item.label}</p>
            <p className="mt-2 text-sm text-slate-500">{item.zone.toUpperCase()}</p>
          </button>
        ))}
      </div>
      {selected ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <p className="font-semibold">Selected:</p>
          <p>{selected}</p>
          <p className="mt-2 text-sm text-slate-500">Correct zone displays in the label above.</p>
        </div>
      ) : null}
    </div>
  );
}
''',
    "CallByValueRef": '''"use client";
import { useState } from "react";

export default function CallByValueRef() {
  const [value, setValue] = useState(3);
  const [ref, setRef] = useState(3);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Observe the difference between passing by value and by reference.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="font-semibold">Call by Value</p>
          <p className="mt-2">Original x = {value}</p>
          <button
            type="button"
            onClick={() => setValue((current) => current + 1)}
            className="mt-3 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Simulate value change
          </button>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="font-semibold">Call by Reference</p>
          <p className="mt-2">Referenced x = {ref}</p>
          <button
            type="button"
            onClick={() => setRef((current) => current + 1)}
            className="mt-3 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Simulate reference update
          </button>
        </div>
      </div>
      <p className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        Value version does not modify the original source, while reference updates the same storage.
      </p>
    </div>
  );
}
''',
    "CallStackFrames": '''"use client";
import { useState } from "react";

export default function CallStackFrames() {
  const [frames, setFrames] = useState(["main"]);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Push and pop stack frames as functions execute and return.</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFrames((current) => [...current, `foo(${current.length})`] )}
          className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Push frame
        </button>
        <button
          type="button"
          onClick={() => setFrames((current) => current.length > 1 ? current.slice(0, -1) : current)}
          className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Pop frame
        </button>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        {frames.map((frame, index) => (
          <div key={`${frame}-${index}`} className="mb-2 rounded-2xl bg-slate-50 px-4 py-3 text-slate-800 last:mb-0">
            <p className="text-sm font-semibold">Frame {frames.length - index}</p>
            <p className="text-slate-600">{frame}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
''',
    "RecursionSteps": '''"use client";
import { useState } from "react";

const calls = [
  "factorial(1)",
  "factorial(2)",
  "factorial(3)",
  "factorial(4)",
  "return 24",
];

export default function RecursionSteps() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Step through the recursive call stack for factorial.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(calls.length - 1, current + 1))}
            className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Next
          </button>
        </div>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          <p className="font-semibold">Current step:</p>
          <p>{calls[step]}</p>
        </div>
      </div>
    </div>
  );
}
''',
    "RecursiveTree": '''"use client";
import { useState } from "react";

const nodes = [
  { label: "root", children: ["left", "right"] },
  { label: "left", children: ["left.left", "left.right"] },
  { label: "right", children: ["right.left", "right.right"] },
];

export default function RecursiveTree() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Open and close branches to inspect recursion tree flow.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          {open ? "Collapse" : "Expand"} tree
        </button>
        <div className="mt-4 space-y-3 text-slate-800">
          <div>
            <p className="font-semibold">root</p>
            {open ? (
              <div className="ml-4 border-l border-slate-200 pl-4 text-slate-700">
                <p>left</p>
                <p>right</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
''',
    "TailRecursion": '''"use client";
import { useState } from "react";

export default function TailRecursion() {
  const [isTail, setIsTail] = useState(true);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Switch between tail recursion and a regular recursive pattern.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <button
          type="button"
          onClick={() => setIsTail((current) => !current)}
          className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          {isTail ? "Show non-tail" : "Show tail"}
        </button>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          <p className="font-semibold">Mode:</p>
          <p>{isTail ? "Tail recursion reuses the last return value." : "Non-tail recursion performs work after the recursive call."}</p>
        </div>
      </div>
    </div>
  );
}
''',
    "CPUFetchDecode": '''"use client";
import { useState } from "react";

const instructions = [
  { op: "LOAD", arg: "R1, [0x4000]" },
  { op: "ADD", arg: "R1, R2" },
  { op: "STORE", arg: "R1, [0x4004]" },
];

export default function CPUFetchDecode() {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Step through instruction fetch and decode phases.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setIndex((current) => Math.min(instructions.length - 1, current + 1))}
            className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Next
          </button>
        </div>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          <p className="font-semibold">Fetching:</p>
          <p>{instructions[index].op} {instructions[index].arg}</p>
          <p className="mt-3 font-semibold">Decode:</p>
          <p>Operation: {instructions[index].op}</p>
        </div>
      </div>
    </div>
  );
}
''',
    "SixteenBitParser": '''"use client";
import { useState } from "react";

const defaultValue = "1101001110010011";

export default function SixteenBitParser() {
  const [binary, setBinary] = useState(defaultValue);
  const hi = parseInt(binary.slice(0, 8), 2);
  const lo = parseInt(binary.slice(8), 2);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Edit the 16-bit stream and inspect the high and low byte values.</p>
      <input
        value={binary}
        onChange={(event) => setBinary(event.target.value.replace(/[^01]/g, "").slice(0, 16))}
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="font-semibold">High byte</p>
          <p className="mt-2 text-slate-600">Binary: {binary.slice(0, 8)}</p>
          <p>Decimal: {hi}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="font-semibold">Low byte</p>
          <p className="mt-2 text-slate-600">Binary: {binary.slice(8)}</p>
          <p>Decimal: {lo}</p>
        </div>
      </div>
    </div>
  );
}
''',
    "ImmediateVsDirect": '''"use client";
import { useState } from "react";

const choices = [
  { label: "MOV R1, #5", type: "Immediate" },
  { label: "MOV R1, [0x3000]", type: "Direct" },
];

export default function ImmediateVsDirect() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Select whether the instruction uses immediate or direct addressing.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {choices.map((choice) => (
          <button
            key={choice.label}
            type="button"
            onClick={() => setSelected(choice.type)}
            className={`rounded-3xl border p-4 text-left transition ${
              selected === choice.type ? "border-cyan-400 bg-cyan-50" : "border-slate-200 bg-white"
            }`}
          >
            <p className="font-semibold">{choice.label}</p>
            <p className="mt-2 text-sm text-slate-500">{choice.type}</p>
          </button>
        ))}
      </div>
      {selected ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          <p className="font-semibold">Selected mode:</p>
          <p>{selected}</p>
        </div>
      ) : null}
    </div>
  );
}
''',
    "IndirectAddressing": '''"use client";
import { useState } from "react";

export default function IndirectAddressing() {
  const [pointer, setPointer] = useState(0x5000);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Indirect addressing uses a pointer to an address, then loads from that address.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <p className="text-sm">Pointer q = 0x5000</p>
        <p className="text-sm">*q =&gt; memory at 0x5000</p>
        <button
          type="button"
          onClick={() => setPointer((current) => current + 4)}
          className="mt-4 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Advance target address
        </button>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          <p>Indirect address: 0x{pointer.toString(16).toUpperCase()}</p>
          <p>Loaded value: {pointer / 4}</p>
        </div>
      </div>
    </div>
  );
}
''',
    "IndexedAddressing": '''"use client";
import { useState } from "react";

export default function IndexedAddressing() {
  const [index, setIndex] = useState(0);
  const base = 0x6000;
  const effective = base + index * 4;

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Compute the effective address for base + index addressing.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            -1
          </button>
          <button
            type="button"
            onClick={() => setIndex((current) => Math.min(current + 1, 8))}
            className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            +1
          </button>
        </div>
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-slate-800">
          <p>Index: {index}</p>
          <p>Base: 0x{base.toString(16).toUpperCase()}</p>
          <p className="font-semibold">Effective address: 0x{effective.toString(16).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}
''',
    "OneDArrays": '''"use client";
import { useState } from "react";

export default function OneDArrays() {
  const [values, setValues] = useState([3, 5, 7, 9, 11]);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Modify array values and observe index-based access.</p>
      <div className="grid gap-3 sm:grid-cols-5">
        {values.map((value, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setValues(values.map((item, idx) => (idx === index ? item + 1 : item)))}
            className="rounded-3xl border border-slate-200 bg-white p-4 text-center text-slate-800"
          >
            <p className="text-sm text-slate-500">a[{index}]</p>
            <p className="mt-2 text-xl font-semibold">{value}</p>
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
        <p className="font-semibold">Hint:</p>
        <p>Index expressions like a[2] access contiguous memory offsets.</p>
      </div>
    </div>
  );
}
''',
    "TwoDArrays": '''"use client";
import { useState } from "react";

const start = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export default function TwoDArrays() {
  const [matrix, setMatrix] = useState(start);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Tap a cell in the 2D array to increment its value.</p>
      <div className="grid gap-2 rounded-3xl border border-slate-200 bg-white p-4">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((value, colIndex) => (
              <button
                key={colIndex}
                type="button"
                onClick={() => setMatrix(matrix.map((r, rIdx) => rIdx === rowIndex ? r.map((c, cIdx) => cIdx === colIndex ? c + 1 : c) : r) )}
                className="min-w-[72px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800"
              >
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
''',
    "RowColMajor": '''"use client";
import { useState } from "react";

export default function RowColMajor() {
  const [mode, setMode] = useState("row");

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Toggle between row-major and column-major layout for a 3x3 matrix.</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setMode("row")}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold ${mode === "row" ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          Row-major
        </button>
        <button
          type="button"
          onClick={() => setMode("col")}
          className={`rounded-2xl px-4 py-2 text-sm font-semibold ${mode === "col" ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          Column-major
        </button>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 text-slate-800">
        <p className="font-semibold">Memory ordering:</p>
        <p>{mode === "row" ? "Index sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8" : "Index sequence: 0, 3, 6, 1, 4, 7, 2, 5, 8"}</p>
      </div>
    </div>
  );
}
''',
    "SinglyLinkedList": '''"use client";
import { useState } from "react";

const defaultNodes = ["A", "B", "C"];

export default function SinglyLinkedList() {
  const [nodes, setNodes] = useState(defaultNodes);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Add nodes to the end of a singly linked list.</p>
      <div className="flex flex-wrap gap-3">
        {nodes.map((node, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
            <p className="font-semibold">{node}</p>
            <p className="text-xs text-slate-500">next ➜</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setNodes((current) => [...current, String.fromCharCode(65 + current.length)])}
        className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
      >
        Append node
      </button>
    </div>
  );
}
''',
    "DoublyLinkedList": '''"use client";
import { useState } from "react";

const defaultNodes = ["A", "B", "C"];

export default function DoublyLinkedList() {
  const [nodes, setNodes] = useState(defaultNodes);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">A doubly linked list holds both prev and next pointers.</p>
      <div className="grid gap-3">
        {nodes.map((node, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 bg-white p-4 text-slate-900">
            <p className="font-semibold">Node {node}</p>
            <p className="text-sm text-slate-500">prev: {index > 0 ? nodes[index - 1] : "null"}</p>
            <p className="text-sm text-slate-500">next: {index < nodes.length - 1 ? nodes[index + 1] : "null"}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setNodes((current) => [...current, String.fromCharCode(65 + current.length)])}
        className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
      >
        Add node
      </button>
    </div>
  );
}
''',
    "ListInsertDelete": '''"use client";
import { useState } from "react";

export default function ListInsertDelete() {
  const [items, setItems] = useState(["node1", "node2", "node3"]);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Insert and delete list elements from either end.</p>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800">{item}</span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setItems((current) => [`node${current.length + 1}`, ...current])}
          className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Insert front
        </button>
        <button
          type="button"
          onClick={() => setItems((current) => current.slice(0, -1))}
          className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Delete end
        </button>
      </div>
    </div>
  );
}
''',
    "Stacks": '''"use client";
import { useState } from "react";

export default function Stacks() {
  const [stack, setStack] = useState([1, 2, 3]);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Use push and pop to manage the stack.</p>
      <div className="space-y-2 rounded-3xl border border-slate-200 bg-white p-4">
        {stack.slice(0).reverse().map((value, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
            Top: {value}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setStack((current) => [...current, current.length + 1])}
          className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
        >
          Push
        </button>
        <button
          type="button"
          onClick={() => setStack((current) => (current.length > 0 ? current.slice(0, -1) : current))}
          className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Pop
        </button>
      </div>
    </div>
  );
}
''',
    "StackPostfixEval": '''"use client";
import { useState } from "react";

export default function StackPostfixEval() {
  const [expression, setExpression] = useState("3 4 + 2 *");
  const [result, setResult] = useState<number | null>(14);

  const evaluate = () => {
    const tokens = expression.split(" ");
    const stack: number[] = [];
    tokens.forEach((token) => {
      if (!Number.isNaN(Number(token))) {
        stack.push(Number(token));
      } else {
        const b = stack.pop() ?? 0;
        const a = stack.pop() ?? 0;
        if (token === "+") stack.push(a + b);
        if (token === "*") stack.push(a * b);
      }
    });
    setResult(stack.pop() ?? null);
  };

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Evaluate a postfix expression with a simulated operand stack.</p>
      <input
        value={expression}
        onChange={(event) => setExpression(event.target.value)}
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
      />
      <button
        type="button"
        onClick={evaluate}
        className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
      >
        Evaluate
      </button>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
        <p className="font-semibold">Result:</p>
        <p>{result !== null ? result : "—"}</p>
      </div>
    </div>
  );
}
''',
    "LinearQueueDrift": '''"use client";
import { useState } from "react";

export default function LinearQueueDrift() {
  const [queue, setQueue] = useState(["A", "B", "C"]);

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">Enqueue and dequeue from a linear queue to witness drift.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="flex gap-2 overflow-x-auto py-2">
          {queue.map((item, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
              {item}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setQueue((current) => [...current, String.fromCharCode(65 + current.length)])}
            className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Enqueue
          </button>
          <button
            type="button"
            onClick={() => setQueue((current) => current.slice(1))}
            className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
          >
            Dequeue
          </button>
        </div>
      </div>
    </div>
  );
}
''',
    "CircularQueues": '''"use client";
import { useState } from "react";

export default function CircularQueues() {
  const [queue, setQueue] = useState(["A", "B", "C"]);
  const [head, setHead] = useState(0);

  const enqueue = () => {
    if (queue.length < 5) {
      setQueue((current) => [...current, String.fromCharCode(65 + current.length)]);
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setHead((current) => (current + 1) % 5);
      setQueue((current) => current.slice(1));
    }
  };

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">The queue wraps around in circular buffer style.</p>
      <div className="rounded-3xl border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-5 gap-2 text-center text-sm text-slate-700">
          {Array.from({ length: 5 }, (_, idx) => (
            <div key={idx} className={`rounded-2xl border px-3 py-4 ${idx === head ? "border-cyan-400 bg-cyan-50" : "border-slate-200 bg-slate-50"}`}>
              {queue[idx] ?? ""}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button type="button" onClick={enqueue} className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600">Enqueue</button>
          <button type="button" onClick={dequeue} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">Dequeue</button>
        </div>
      </div>
    </div>
  );
}
''',
    "LinkedQueues": '''"use client";
import { useState } from "react";

interface Node { value: string; next: Node | null; }

export default function LinkedQueues() {
  const [tail, setTail] = useState<Node>({ value: "A", next: null });
  const [count, setCount] = useState(1);

  const enqueue = () => {
    const nextValue = String.fromCharCode(65 + count);
    const newNode = { value: nextValue, next: null };
    let current = tail;
    while (current.next) current = current.next;
    current.next = newNode;
    setCount(count + 1);
    setTail({ ...tail });
  };

  const values: string[] = [];
  let walker: Node | null = tail;
  while (walker) {
    values.push(walker.value);
    walker = walker.next;
  }

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-sm text-slate-500">A linked queue stores nodes with next pointers and grows dynamically.</p>
      <div className="flex flex-wrap gap-3">
        {values.map((value, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
            {value}
          </div>
        ))}
      </div>
      <button type="button" onClick={enqueue} className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-600">
        Enqueue node
      </button>
    </div>
  );
}
''',
}

for page_num, component_name, title in pages:
    component_file = components_dir / f"{component_name}.tsx"
    component_code = code_templates.get(component_name)
    if component_code is None:
        raise ValueError(f"No template for {component_name}")
    component_file.write_text(component_code, encoding="utf-8")

    chapter_dir = app_act2_dir / f"chapter-{page_num}"
    chapter_dir.mkdir(parents=True, exist_ok=True)
    page_file = chapter_dir / "page.mdx"

    page_content = f'''import {{ ChapterCard }} from "@/components/ui/ChapterCard";
import {{ GateTrap }} from "@/components/ui/GateTrap";
import {{ ArchitectShortcut }} from "@/components/ui/ArchitectShortcut";
import {{ SimulatorContainer }} from "@/components/ui/SimulatorContainer";
import ChapterNavigation from "@/components/ui/ChapterNavigation";
import GateValidator from "@/components/ui/GateValidator";
import {component_name} from "@/components/act-2/{component_name}";

<div className="max-w-4xl mx-auto space-y-8 pb-24">
  <div className="space-y-2">
    <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">Act 2 — The Physical Foundation</div>
    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Chapter {page_num}: {title}</h1>
  </div>

  <ChapterCard title="{title}" badge="Act 2 — Physical Foundation" badgeColor="bg-cyan-50 text-cyan-700">
    This chapter introduces the core physical concepts for C memory, addressing, and data structure layout.
  </ChapterCard>

  <SimulatorContainer>
    <{component_name} />
  </SimulatorContainer>

  <GateTrap>
    Remember that exam questions often test the pointer meaning, not the variable name. Read memory flow carefully.
  </GateTrap>

  <ArchitectShortcut>
    Visualize memory as cells and links, then map the syntax to the physical operation.
  </ArchitectShortcut>

  <GateValidator question="Which memory area stores dynamic allocations in C?" correctAnswer="TBD" stepByStep="Solution pending..." />
  <GateValidator question="Is the * operator used to access the address or the value?" correctAnswer="TBD" stepByStep="Solution pending..." />

  <ChapterNavigation actNumber={2} currentChapter={page_num} />
</div>
'''

    page_file.write_text(page_content, encoding="utf-8")

print("Generated Act 2 simulator components and chapters.")
