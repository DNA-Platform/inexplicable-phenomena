# Sprint 7: Deep Read

We don't understand the framework well enough to write canonical tests. Sprint 6 proved this — we invented a `$Compound.formula()` string method instead of using `$Molecule.formula()`, called binding constructors directly instead of through the orchestrator, and tested template instances instead of bound instances. A test that uses the API wrong is worse than no test at all.

This sprint is about understanding. For each uncertain area of the framework, we: read the code path end-to-end, write exploratory probes (small tests that ask "what happens when..."), document what we learn, and ask Doug when the code doesn't explain itself. The output is comprehension, documented by Libby, reviewed by Doug.

The sprint ends with: a catalogue of framework semantics we trust, a list of questions for Doug, and a revised plan for canonical tests we can write with confidence.

## Status: IN PROGRESS

Last updated: 2026-04-08

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Code reading, exploratory probes, semantic analysis |
| Arthur | Architect | Dependency tracing, structural observations |
| Libby | Librarian | Document findings, track questions, maintain semantic catalogue |

## Method

For each investigation:

1. **Read** — trace the code path in the actual source, not from memory
2. **Probe** — write small tests that ask "what happens when X?" not "X should produce Y"
3. **Document** — Libby writes findings in the spike output
4. **Ask** — when the code doesn't explain itself, ask Doug as the author

Findings go to `spikes/`. When we're confident in a finding, Libby promotes it to the glossary or overview. Not before.

## Investigations

### I-1: The render pipeline — NOT STARTED
- **Owner:** Cathy
- **Question:** What happens from "React calls Component function" to "view output appears in DOM"? Every step, every object, every call.
- **Trace through:** `$Component$` constructor → `useState` → `createChemical` → `$render$` → `$BondOrchestrator.render()` → `reaction.activate` → `molecule.reactivate` → `bond()` → `view()` → `augmentView` → `reaction.deactivate` → `updateIf`
- **Output:** `spikes/render-pipeline.md`

### I-2: The bond lifecycle — NOT STARTED
- **Owner:** Cathy
- **Question:** When are bonds created? What does a bond DO to a property? What is the read/write interception path? What is the parent-bond / double-bond / child-bond relationship?
- **Trace through:** `$Molecule.reactivate()` → `$Bond.create()` → `$Bond.form()` → `describe()` (the `Object.defineProperty` call) → `bondGet()` → `bondSet()` → `update()`. Also: `double()` for template-instance bond copying. `$Parent` for the parent property. `$Bonding` for methods.
- **Output:** `spikes/bond-lifecycle.md`

### I-3: The catalyst and parent system — NOT STARTED
- **Owner:** Arthur
- **Question:** What is `$catalyst`? How does the parent hierarchy relate to the reaction system? When does `$Bond.replaceIf()` fire and what does it do?
- **Trace through:** `$Chemical` constructor parent assignment → `$catalyst` propagation → `$Reaction` system trees → `$Bond.replaceIf()` → `$Component.$bind(parent)` rebinding
- **Output:** `spikes/catalyst-parent.md`

### I-4: The binding constructor path — NOT STARTED
- **Owner:** Cathy
- **Question:** How do JSX children become binding constructor arguments? What is the full orchestrator pipeline?
- **Trace through:** `$BondOrchestrator.bond(props)` → `process(children, context)` → `processElement()` (chemical, function, html, array cases) → `$BondOrchestrationContext` parameter tracking → binding constructor invocation → `$check` validation
- **Output:** `spikes/binding-constructor.md`

### I-5: The template-instance-shadow chain — NOT STARTED
- **Owner:** Cathy
- **Question:** What is the prototype chain of a rendered chemical? When is each layer created? What state lives where?
- **Trace through:** `$Chemical` constructor (template creation) → `$Component$.createChemical()` (bound instance via `Object.create`) → `$BondOrchestrator.bindProps()` (prop shadowing) → `augmentView` element rebinding
- **Output:** `spikes/prototype-chain.md`

### I-6: formula() and read() — NOT STARTED
- **Owner:** Libby
- **Question:** What does `$Molecule.formula()` actually produce? What is `read()` for? When are they used outside `$Persistent`?
- **Trace through:** `formula()` → iterates bonds → calls `$symbolize` on each value → returns JSON. `read()` → parses JSON → creates bonds for deserialized values. `$Persistent.reform()` → calls `read()`. `$Persistent.reflect()` → calls `formula()`.
- **Output:** `spikes/formula-read.md`

### I-7: augmentView() — NOT STARTED
- **Owner:** Cathy
- **Question:** What does `augmentView()` do to the React element tree? Why does it exist? What breaks without it?
- **Trace through:** `$BondOrchestrator.view()` calls `augmentView()` → `augmentNode()` recursive walk → key injection → element rebinding with `$symbol` keys → `$bind()` calls on encountered chemicals
- **Output:** `spikes/augment-view.md`

### I-8: The $Component$ lifecycle bridge — NOT STARTED
- **Owner:** Arthur
- **Question:** How do React hooks drive the `$Reaction` lifecycle phases? What's the two-check unmount pattern? When do effects fire relative to bonds?
- **Trace through:** `useEffect` mount/unmount → `useLayoutEffect` layout → `useEffect` effect → `$Reaction.resolve()` → callback queues → `$Reaction.update()` → `setState({})` → React re-render
- **Output:** `spikes/lifecycle-bridge.md`

## Questions for Doug

(Populated as investigations proceed)

- *None yet*

## Dependency graph

```
I-1 (render pipeline) — foundational, read first
 ├── I-2 (bonds) — called during render
 ├── I-4 (binding constructor) — called during render
 ├── I-5 (prototype chain) — created during render
 └── I-7 (augmentView) — called during render

I-3 (catalyst/parent) — independent
I-6 (formula/read) — independent
I-8 (lifecycle bridge) — depends on I-1
```

## Verification

This sprint succeeds when:
- [ ] Every uncertain area has a spike document with traced findings
- [ ] Exploratory probes confirm or correct our understanding
- [ ] Questions for Doug are catalogued and answered
- [ ] We can explain the full render pipeline from React call to DOM output
- [ ] We know what every public API method does and when it's called
- [ ] We have a revised test plan based on real understanding
