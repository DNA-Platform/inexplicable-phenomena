---
kind: concept
title: Sprint 23 — Audit Cleanup
status: stable
related:
  - sprint-22-lexical-scoping
  - particularization
---

# Sprint 23 — Audit Cleanup

A polish pass. No new behavior, no design changes. Tightened audience boundaries, symbol-keyed leaky public statics, rationalized vocabulary, resolved `$particular$`, and collapsed the redundant `Component` / `$Component` getters.

## Context

Sprint 22 shipped the structural rebuild — lexical scoping, the `$()` dispatch surface, the new type family. By the end of it the framework had accumulated minor leaks, vestigial code, and mismatched naming. Sprint 23 was a deliberate audit-and-clean pass before adding more surface.

## What shipped

### Audience boundary tightening

`@dna-platform/chemistry` (the package root, `index.ts`) is for component developers. `@dna-platform/chemistry/symbolic` is for framework-internal consumers and advanced users.

Items moved from root to symbolic, or deleted as vestigial:

- `$lift`, `$phaseOrder` → `symbolic.ts`.
- `export * from './implementation/types'` → replaced with a curated whitelist (`Component`, `Element`, `$Component`, `$Element`, `$Phase`, `$Promise`, `$Properties`, `$Props`, `Constructor`).
- `$SymbolFeature`, `$Particular<T>`, `$MethodComponent`, `$Bound<T>`, `$ParameterType` → `symbolic.ts`.
- `$Represent` (the class) → `symbolic.ts`. `$symbolize` and `$literalize` stayed at root as audience-2 functions.
- `Particle` singleton (lowercase) → deleted; never referenced.

### Symbol-keying leaky public statics

Public string-keyed statics on framework classes that were really machinery:

- `$Reflection.inertDecorators` / `$Reflection.reactiveDecorators` → moved behind `$inertDecorators$` / `$reactiveDecorators$` symbols. Decorator setters now write through symbols; public string access removed.
- `$ParamValidation.describeType` / `describeActual` / `isPrimitiveType` / `isValidReactNode` / `validateArgument` / `validatePrimitive` → moved to module-level helpers or marked `private`.
- `$Bond.isMethod` / `$Bond.create` → similar treatment.

After this, no public string-keyed statics on framework classes were silently mutable framework state.

### Vocabulary pass — derivative / parent / child

Three terms had been used inconsistently:

- **derivative** = `Object.create(parent)` instance (prototype-derived).
- **prototype parent** = the chemical the derivative was created from.
- **context parent** = the chemical containing this one in the JSX tree (set via `$bind`).
- **child** = JSX child, only used in orchestrator processing — *never* for derivatives.

Comments and code in `chemical.ts` and `particle.ts` were swept to honor these definitions.

### `$particular$` resolution

The `$particular$` field had been declared but never read since sprint 22. Sprint 23 finished the integration: `$particular$` is set when a chemical is constructed from an existing object (the particularization path) and consulted at lifecycle points where the carrier matters. The feature went from "incomplete" to "documented and used." See [particularization].

### `Component` / `$Component` getter collapse

Two getters returned the same value with different types — `Component` typed as required props, `$Component` cast to all-optional. Redundant. Sprint 23 kept the `Component` getter and dropped `$Component`; users get the all-optional shape via `$(chemical)`, which already returns `$Component<T>`.

### Test hygiene

- `tests/abstraction/lexical-scoping.test.ts` had been reaching into `$derivatives$` directly. Refactored to assert observable behavior (DOM state, render counts) instead of internal symbol state.
- `scope-tracking.test.tsx` and `contract.test.tsx` got their descriptions reframed from internal-mechanism language ("scope tracking — withScope catches mutations") to user-observable language ("mutations inside event handlers cause re-render").

### Docstring sweep

Comments referencing the removed `react()` escape hatch, the old `.Component` getter, and the singleton-Atom semantics were updated.

## What was walked back

Nothing material. Sprint 23 was a cleanup sprint. The only items that *could* be called walk-backs are the deletions: `$Component` getter (redundant), `Particle` singleton (vestigial), prior placement of leaked types in `index.ts` (oversight, not design).

## Enduring decisions

- **The audience split is real.** `@dna-platform/chemistry` is curated; `/symbolic` is the escape hatch. Future framework additions either fit the audience-2 surface or live behind the subpath.
- **Symbol-keyed framework state.** Anything that's framework machinery and not legitimate audience-1 API gets a symbol key. String keys are reserved for surfaces users actually call.
- **Vocabulary precision.** "Derivative" / "prototype parent" / "context parent" / "child" mean specific things. Future docs and code should honor the distinctions.

## Open at end of sprint

- `$Include` / `$wrap` — sprint 23 didn't decide whether they're permanent primitives or scaffolding. Sprint 24+ work will resolve.
- `$check` / `$is` — kept in audience 2 for now. Active monitoring on whether component dev code actually uses them.

## Related

- [Sprint 22 — Lexical Scoping & The Beautiful API][sprint-22-lexical-scoping] — the rebuild that motivated this cleanup.
- [Particularization history][particularization] — `$particular$` integration finished here.

<!-- citations -->
[sprint-22-lexical-scoping]: ./sprint-22-lexical-scoping.md
[particularization]: ./particularization.md
[sprint-23 plan]: ../../project/sprint-23/plan.md
