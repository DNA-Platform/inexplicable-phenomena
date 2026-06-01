# Sprint 24: Instance-Owned Bond Accessors + Library Docs Organization

Two parallel tracks. **Track A** (Cathy + Queenie) moves reactive bond accessor installation off `$Chemical` subclass prototypes and onto each instance — eliminating a hidden side-effect where merely instantiating a chemical mutates a shared prototype. **Track B** (Libby) builds a wiki-style documentation system under `.claude/docs/`, captures the post-sprint-21 history (sprints 22, 23, plus the post-21 work on particularization / $Error / `I<T>`), and documents the chemistry surface as a feature/caveat reference.

The tracks are independent. Track A touches `library/chemistry/src/**` and `library/chemistry/tests/**`. Track B touches `.claude/docs/**` and (read-only) the sprint folders + chemistry source. Only coordination point is **L-4**: when Track A's refactor lands, the "reactive bonds" docs entry updates from "installed on prototype (caveat: shared mutation)" to "installed on instance."

## Status: COMPLETE

Last updated: 2026-04-28. Retro at `reviews/retro.md`.

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Track A — bond-accessor refactor, design + implementation |
| Queenie | QA Engineer | Track A — regression coverage written *before* the refactor; benchmarks gated |
| Libby | Librarian | Track B — docs system, sprint history capture, chemistry feature/caveat reference |

## Spikes

### SP-1: $lift derivative compatibility — NOT STARTED
- **Owner:** Cathy
- **Question:** When bond accessors are own properties of the parent instance (not the prototype), do `$lift`-created derivatives (`Object.create(parent)`) still find them via prototype lookup, and does the existing fan-out via `$derivatives$` still propagate writes correctly?
- **Method:** Read `src/abstraction/bond.ts`, `src/abstraction/molecule.ts`, `src/abstraction/particle.ts` ($lift). Trace a write on a derivative and confirm: (a) the write hits the accessor, (b) the accessor's setter executes, (c) `$derivatives$` fan-out fires updates on siblings.
- **Decision gate:** If derivatives still work, proceed with story A-2 directly. If not, an additional story is needed to thread the new install path through `$lift`.
- **Output:** `spikes/lift-derivative-compatibility.md`

### SP-2: Doc systems survey — NOT STARTED
- **Owner:** Libby
- **Question:** How do projects like React, Vue, Rust, Tailwind, MDN, and frameworks like Diátaxis organize feature/caveat/reference content into many small cross-linked files? Which model fits "isomorphic to how we want to inform users of features"?
- **Method:** Web research. Survey 4-6 systems. Identify the structural patterns (file-per-concept, frontmatter conventions, cross-link styles, navigation aids).
- **Decision gate:** Pick a model (or a hybrid). Document the choice + reasoning. Story L-1 builds the skeleton from the chosen model.
- **Output:** `spikes/doc-systems-survey.md`

## Epics

### EA: Instance-Owned Bond Accessors

Move reactive bond accessor installation off the class prototype and onto each instance. Bond ctor still runs once per template to compute the bond *spec* (which props are reactive, decorators, initial values). Each instance, on reactivation, stamps accessors as own properties from that spec. Result: class objects become inert definitions; instances are self-describing; particularization (and any future prototype-chain manipulation) composes cleanly.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| A-1 | Regression coverage — pin current observable behavior | Queenie | — | NOT STARTED |
| A-2 | Extract bond spec — bond ctor produces a spec, no behavior change | Cathy | A-1, SP-1 | NOT STARTED |
| A-3 | Per-instance accessor stamping — install from spec on each instance | Cathy | A-2 | NOT STARTED |
| A-4 | Remove prototype mutation — delete the install-on-prototype path | Cathy | A-3 | NOT STARTED |
| A-5 | Performance gate — granularity / locality / micro benchmarks within tolerance | Queenie | A-4 | NOT STARTED |

#### Story details

##### A-1: Regression coverage
- **What:** A regression suite that pins current observable bond behavior so the refactor can't drift silently.
- **Files:** new tests under `tests/abstraction/` and `tests/react/` covering: re-render counts on parent writes, derivative fan-out symmetry, lexical-scoping invariants from `lexical-scoping.test.ts` re-asserted at the bond level, `scope-tracking.test.tsx` invariants, behavior of held-instance + held-derivative + lifted-component combinations.
- **Acceptance:** All new tests pass on the *current* implementation. Each test isolates one observable invariant.
- **Notes:** Don't import bond internals; assert via behavior (DOM, render counts, observable values). The whole point is the suite stays green through the refactor.

##### A-2: Extract bond spec
- **What:** Bond constructor stops installing accessors on the prototype directly. Instead it produces a *spec*: a structure describing which props are reactive, their initial values, applied decorators. Spec is stored on the class (or template) for later use.
- **Files:** `src/abstraction/bond.ts`, `src/abstraction/molecule.ts`.
- **Acceptance:** All tests still green. `$Chemical.prototype` is no longer mutated by accessor installation in this step's intermediate state, OR (if interim shim retained) the shim is documented and deleted in A-4.
- **Notes:** This step is allowed to retain accessors-on-prototype if needed for green-step refactor — the rule is "no behavior change," not "final design in one step."

##### A-3: Per-instance accessor stamping
- **What:** On instance reactivation, accessors are installed from the spec as own properties on the instance. Templates may also receive own accessors (consistency).
- **Files:** `src/abstraction/molecule.ts`, `src/abstraction/bond.ts`, `src/abstraction/particle.ts` (`$lift` reactivate path).
- **Acceptance:** All regression tests green. `$lift` derivatives still work (read via prototype lookup; writes still fan out via `$derivatives$`).
- **Notes:** Watch for: the catalyst graph wiring, the molecule destroy path (must clean up own accessors per-instance now), and bond decorators that previously assumed prototype installation.

##### A-4: Remove prototype mutation
- **What:** Delete the install-on-prototype code path. Verify `$Chemical.prototype` and subclass prototypes are untouched after instantiation.
- **Files:** `src/abstraction/bond.ts`, `src/abstraction/molecule.ts`. Possibly `src/abstraction/$Reflection`.
- **Acceptance:** Test asserting `Object.getOwnPropertySymbols($SomeChemical.prototype)` and string keys are stable across `new $SomeChemical()` calls. All regression tests green.

##### A-5: Performance gate
- **What:** Run `bench/granularity.test.tsx` and `bench/locality.test.tsx` plus the micro-benchmarks on the refactored code. Compare to the sprint-21 baseline ratios.
- **Files:** existing benchmarks, no new ones.
- **Acceptance:** Ratios within ±20% of sprint-21 baseline. If degraded, root-cause and fix before closing the sprint.

### EB: Library Docs Organization System

Build a wiki-style documentation system at `.claude/docs/` that organizes chemistry feature/caveat/reference content into many small cross-linked files. Capture sprint history that's currently stuck in per-sprint folders. Document the current chemistry surface so users (and future agents) can find features without reading source.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| L-1 | Establish docs skeleton — directory structure, frontmatter, cross-link style | Libby | SP-2 | NOT STARTED |
| L-2 | Sprint history capture — sprints 22-23 + post-21 work into durable docs | Libby | L-1 | NOT STARTED |
| L-3 | Chemistry surface reference — feature/caveat pages for the current API | Libby | L-1 | NOT STARTED |
| L-4 | Update reactive-bonds doc when Track A lands | Libby | A-4 | NOT STARTED |

#### Story details

##### L-1: Docs skeleton
- **What:** Pick a structure (from SP-2 findings), establish naming conventions, frontmatter (kind: feature / caveat / reference / how-to), cross-reference link style, and an `index.md` entry page.
- **Files:** `.claude/docs/index.md`, `.claude/docs/_template-feature.md`, `.claude/docs/_template-caveat.md`, plus folders per the chosen taxonomy.
- **Acceptance:** Skeleton in place; index linkable; templates exist; SP-2 decision is documented in the skeleton's README.

##### L-2: Sprint history capture
- **What:** Walk sprints 22 and 23 (currently undocumented in the project tracker), plus the post-sprint-21 work in this conversation (particularization, `$Error`, `I<T>`). Distill into durable docs entries: shipped features, walked-back ideas (caveats / lessons), enduring decisions.
- **Files:** new docs entries under the chosen taxonomy. Update `.claude/project/index.md` to add sprints 22-23 to the history table.
- **Acceptance:** Reading the new docs gives context that the per-sprint folders alone don't. Sprints 22-23 appear in the project tracker history table.

##### L-3: Chemistry surface reference
- **What:** Document the current chemistry surface — `$Particle`, `$Chemical`, `$Atom`, `$()` callable, render filters, particularization, `$Error`, `I<T>`, lifecycle phases, async ctors, lexical scoping. One page per concept with a feature description + caveats. Cross-linked.
- **Files:** docs entries.
- **Acceptance:** Pages exist; each is short; cross-links work; an outsider could find each feature from the index.

##### L-4: Reactive-bonds doc update
- **What:** When A-4 lands, update the reactive-bonds page from "installed on prototype" to "installed on instance." Stress-test the system: a one-page-update should not require touching cross-references.
- **Files:** the reactive-bonds entry.
- **Acceptance:** Page reflects the new architecture; cross-references remain valid.

## Dependency graph

```
SP-1 ──> A-2 ──> A-3 ──> A-4 ──> A-5
A-1 ──────────────^
SP-2 ──> L-1 ──┬─> L-2
               └─> L-3
A-4 ──> L-4
```

Track A and Track B run in parallel. Only inter-track dependency is L-4 → A-4.

## Verification checklist

- [ ] `Object.getOwnPropertySymbols($Chemical.prototype)` shows zero bond accessors after instantiation
- [ ] All regression tests (A-1) green on the refactored code
- [ ] Bench ratios within ±20% of sprint-21 baseline
- [ ] Docs index reachable; chemistry surface pages cross-linked
- [ ] Project tracker has sprints 22-23 in history table
- [ ] Reactive-bonds doc reflects the post-A-4 architecture
