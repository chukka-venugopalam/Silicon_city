# SILICON CITY: ARCHITECT'S MASTER BLUEPRINT

## [1. THE UI & DESIGN SYSTEM]
**The Aesthetic:** High-fidelity, clinical, futuristic. 
* **Colors:** Background: `#FFFFFF` (Pure White). Primary Text: `#334155` (Slate). Accents/Interactivity: `#00FFFF` (Cyan).
* **Typography:** Modern Sans-serif (Inter/Geist). 
* **Components:**
    - **<ChapterCard>:** A white container with a 1px slate-200 border and a 4px cyan left-border. Used for Theory.
    - **<GateTrap>:** A specialized warning card. Use a light slate background (`#F1F5F9`) with a bold, dark slate border. This must explicitly highlight common student mistakes and examiner tricks.
    - **<ArchitectShortcut>:** A specialized card for time-saving exam hacks and formula shortcuts. Use a subtle cyan background (`#ECFEFF`).
    - **<SimulatorContainer>:** A slightly off-white (#F8FAFC) area for interactive logic.
    - **Buttons:** Sharp edges (no rounded corners). Default state: Cyan border. Hover state: Cyan background with white text.

## [2. CORE WEBSITE FEATURES]
* **Progress Tracking:** Every chapter must report 'Completed' status to local storage once the user answers the GATE Practice questions correctly.
* **The Mainframe (Dashboard):** A central map page (`/map`) that shows all Acts and Chapters. Chapters are 'Grayed out' until the previous one is completed.
* **Search Grid:** A global search bar that allows the user to jump to any GATE topic (e.g., 'K-Maps').
* **Exam Mode Toggle:** A feature on each page to hide the 'Story' text and show only the 'Technical Theory' for quick revision.

## [3. CHAPTER MDX STRUCTURE & FLOW]
Every single `page.mdx` file MUST follow this exact top-to-bottom flow:
1. **The Briefing (Theory):** `<ChapterCard>` explaining the concept, formulas, and strict definitions.
2. **The GATE Trap:** `<GateTrap>` detailing the most common pitfall for this specific topic (e.g., 'Trap: Forgetting to add 1 when finding the 2s complement of a negative number').
3. **The Shortcut:** `<ArchitectShortcut>` providing a fast way to solve it in the exam.
4. **The Simulator:** The interactive React visualization.
5. **The Proving Ground (Practice):** 2-3 NAT or MCQ questions directly inspired by actual GATE PYQs.

## [4. SIMULATOR DEVELOPMENT STANDARDS]
* **Zero Libraries:** No D3, no Chart.js, no Framer Motion. Use raw `useState`, `useEffect`, and standard CSS Transitions.
* **State Reset:** Every simulator must have a 'Reset System' button.
* **Visual Feedback:** When a user performs a correct action, the element must glow Cyan (#00FFFF). When wrong, it must shake slightly.

## [5. ACT 1 SYLLABUS: THE LOGICAL SINGULARITY (31 CHAPTERS)]

### PHASE I: THE BIT STREAM (ARITHMETIC)
1. **Chapter 1.1: Numerical Origins.** Base conversions (Binary/Hex). Simulator: Real-time converter.
2. **Chapter 1.2: Fixed Point.** 1s and 2s complement logic. Simulator: Binary subtractor.
3. **Chapter 1.3: IEEE 754.** Floating point structure. Simulator: Bit-breakdown tool.
4. **Chapter 1.4: Overflow Logic.** Range calculations. Simulator: Triggering the Overflow flag.
5. **Chapter 1.5: Operations.** Binary Add/Sub/Mul. Simulator: Step-by-step bitwise adder.

### PHASE II: LOGIC GATEWAYS (BOOLEAN)
6. **Chapter 1.6: Boolean Laws.** De Morgan's & Consensus. Simulator: Identity checker.
7. **Chapter 1.7: SOP & POS.** Canonical forms. Simulator: Expression converter.
8. **Chapter 1.8: Universal Gates.** NAND/NOR implementations. Simulator: NAND-only circuit builder.
9. **Chapter 1.9: Physical Logic.** Voltage levels. Simulator: Signal waveform viewer.
10. **Chapter 1.10: Complexity.** Propagation delay. Simulator: Delay calculator.

### PHASE III: PROPOSITIONAL MATRIX (MATH LOGIC)
11. **Chapter 1.11: Connectives.** Truth Tables. Simulator: Logic Table Generator.
12. **Chapter 1.12: Tautologies.** Satisfiability laws. Simulator: Automated checker.
13. **Chapter 1.13: Equivalences.** Logical identities. Simulator: Step-by-step simplifier.
14. **Chapter 1.14: Normal Forms.** CNF/DNF. Simulator: Normal form converter.
15. **Chapter 1.15: Inference.** Modus Ponens/Tollens. Simulator: Deduction engine.

### PHASE IV: THE PREDICATE LAYER (FOL)
16. **Chapter 1.16: Quantifiers.** For all and Exists. Simulator: Domain mapper.
17. **Chapter 1.17: Formal Validity.** Nested quantifiers. Simulator: Scope highlighter.
18. **Chapter 1.18: Language Translation.** English to FOL. Simulator: Translation sandbox.

### PHASE V: SILICON STRUCTURES (COMBINATIONAL)
19. **Chapter 1.19: K-Maps (2/3 Var).** Minimization. Simulator: Cell grouping tool.
20. **Chapter 1.20: 4-Var K-Maps.** Don't Care conditions. Simulator: K-Map solver.
21. **Chapter 1.21: Hardware Arithmetic.** Adders/Subtractors. Simulator: Interactive circuit.
22. **Chapter 1.22: Multiplexers.** Data routing. Simulator: 4-to-1 Mux visualizer.
23. **Chapter 1.23: Decoders/Encoders.** Priority logic. Simulator: 3-to-8 Decoder.

### PHASE VI: THE STATE MACHINE (SEQUENTIAL)
24. **Chapter 1.24: Latches/FF.** Timing & Clocking. Simulator: Latch vs FF viewer.
25. **Chapter 1.25: Flip-Flops.** SR/D/JK/T. Simulator: State explorer.
26. **Chapter 1.26: Registers.** Shift logic (SISO/SIPO). Simulator: Data shifter.
27. **Chapter 1.27: Counters.** Sync/Async. Simulator: Counter with timing pulses.

### PHASE VII: ABSTRACT ALGEBRA (SETS & GROUPS)
28. **Chapter 1.28: Sets.** Power sets/Cardinals. Simulator: Venn Diagram tool.
29. **Chapter 1.29: Relations.** Equivalence/Partitions. Simulator: Digraph generator.
30. **Chapter 1.30: Partial Orders.** Hasse Diagrams. Simulator: Hasse Diagram builder.
31. **Chapter 1.31: Lattices/Groups.** Groups/Lattices. Simulator: Cayley Table generator.
