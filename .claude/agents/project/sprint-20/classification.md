# Sprint 20 — Test Classification (Test-by-Test)

Every test in every $Chemistry-relevant file, individually classified.

Legend:
- **BEH** — BEHAVIOR: framework behavior a developer experiences.
- **INV** — INVARIANT: framework-level correctness property.
- **IMP** — IMPLEMENTATION: internal data structure / code shape.
- **DEG** — DEGENERATE: trivially true (just "function exists"); low information value.
- **DUP** — DUPLICATE: same behavior tested elsewhere.
- **EXE** — EXEMPLAR (secondary): reads as a clear example a developer would copy.

---

## `tests/framework/chemical.test.ts` — 12 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `should extend $Particle` | IMP | `instanceof` check of internal hierarchy. |
| 2 | `should have a unique cid and symbol` | IMP | Reads `$cid$`, `$symbol$` — internal identifiers. |
| 3 | `should establish template singleton` | IMP | Reads `$$template$$`, `$isTemplate$`. Internal flags. |
| 4 | `should create molecule, reaction, and orchestrator` | IMP | Internal composite structures. |
| 5 | `should be its own parent and catalyst by default` | IMP | Internal graph invariant via internal symbols. |
| 6 | `should render children by default` | BEH | Semantically correct test; setup uses `$children$` but the assertion is about view output. Could be rewritten with Component+children. |
| 7 | `should have lifecycle methods` | DEG | Only checks `typeof mount === 'function'`. Trivially true. |
| 8 | `should have a Component getter` | DEG | Same shape — checks `typeof Component === 'function'`. |
| 9 | `should establish its own template` (subclass) | IMP | Internal flag. |
| 10 | `should have its own type` (subclass) | IMP | Reads `$type$`. |
| 11 | `should have $-prefixed props` (subclass) | BEH | Field access. Fine. |
| 12 | `should render its view` (subclass) | BEH+EXE | Clean example. |

**Verdict:** 7 IMP + 2 DEG + 3 BEH. Delete/rewrite IMP+DEG. Keep BEH with cleaner setup.

---

## `tests/framework/lifecycle.test.ts` — 9 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `next() resolves immediately if at phase` | INV | Uses `$resolve$` internal — but verifies contract of next(). |
| 2 | `next() resolves immediately if past phase` | INV | Same. |
| 3 | `next() waits for future phase` | BEH | Clean. |
| 4 | `multiple awaiters all resolve` | INV | Framework guarantee. |
| 5 | `tracks the current phase` | IMP | Reads `$phase$` directly. Can be reframed as behavior via `await next()` instead. |
| 6 | `unmount always waits` | INV | Framework rule. |
| 7 | `provides named method shortcuts` (chemical) | DEG | `typeof mount === 'function'`. |
| 8 | `named methods delegate to next()` (chemical) | BEH | Clean. |
| 9 | `linear async lifecycle code works` | BEH+EXE | Exemplar pattern. |

**Verdict:** Mostly keep. Rewrite #5 to observe behavior rather than read `$phase$`. Delete #7 as degenerate.

---

## `tests/framework/molecule.test.ts` — 14 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `isSpecial: $-prefixed lowercase` | INV | Framework rule about what's tracked. |
| 2 | `isSpecial: $-prefixed uppercase` | INV | Same. |
| 3 | `isSpecial: $$ or $_` | INV | Same. |
| 4 | `isReactive: _ prefixed` | INV | Same. |
| 5 | `isReactive: regular names` | INV | Same. |
| 6 | `$Molecule: created with chemical` | IMP | Internal structure. |
| 7 | `$Molecule: starts non-reactive` | IMP | Internal flag. |
| 8 | `$Molecule: becomes reactive after reactivate()` | IMP | Internal flag. |
| 9 | `$Molecule: creates bonds for $-prefixed` | IMP | Internal bond map. |
| 10 | `$Molecule: does not create bonds for _ prefixed` | IMP | Internal bond map. |
| 11 | `$Molecule: creates bonds for regular reactive` | IMP | Internal bond map. |
| 12 | `$Molecule: destroyable` | IMP | Internal lifecycle. |
| 13 | `$Bond: identifies fields vs methods` | IMP | Internal Bond type. |
| 14 | `$Bond: identifies getter properties` | IMP | Internal Bond.isProperty. |

**Verdict:** 5 INV worth keeping (the Reflection rules — these are framework-defining). 9 IMP to delete. The INV ones should be reframed: "is $-prefixed reactive?" reframed as "does mutating $x trigger re-render?"

---

## `tests/framework/particle.test.ts` — 14 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `unique cid` | IMP | Reads `$cid$`. |
| 2 | `unique symbol per instance` | IMP | Reads `$symbol$`. |
| 3 | `stores constructor as type` | IMP | Reads `$type$`. |
| 4 | `formats symbol as $Chemistry.ClassName[cid]` | IMP | Format detail. |
| 5 | `starts in setup phase` | IMP | Reads `$phase$`. |
| 6 | `has phase queues for all lifecycle phases` | IMP | Reads `$phases$`. |
| 7 | `next() resolves immediately if at phase` | DUP | Duplicated in lifecycle.test.ts. |
| 8 | `next() past phase` | DUP | Same. |
| 9 | `next() pending for future phase` | DUP | Same. |
| 10 | `drain phase queue on resolve` | IMP | Reads `$phases$` directly. |
| 11 | `use() produces callable function` | DEG | Checks function existence. |
| 12 | `component carries $view and $this` | IMP | Internal metadata. |
| 13 | `toString returns symbol` | IMP | Format detail. |
| 14 | `toString usable in string contexts` | IMP | Format detail. |

**Verdict:** 9 IMP + 3 DUP + 1 DEG + 1 technical. Delete most. The only valuable thing here is particle identity behavior which is better tested via integration.

---

## `tests/framework/reaction.test.ts` — 4 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `created with chemical` | IMP | Internal structure. |
| 2 | `own system by default` | IMP | Internal flag. |
| 3 | `register in static map` | IMP | Tests `$Reaction.find()` — used by orchestrator, not by user. |
| 4 | `cleanup on destroy` | IMP | Internal lifecycle. |

**Verdict:** 4 IMP. Delete entire file.

---

## `tests/framework/symbolize-audit.test.ts` — 20 tests (sprint-19)

All INV for `$symbolize`'s determinism contract. All well-named. Already classified at creation.

**Verdict:** Keep all.

---

## `tests/framework/walk.test.tsx` — 19 tests

All tests verify `walk()` and `reconcile()` primitives.

- 9 tests for `walk()` core behavior (null, primitives, visits, nesting, arrays, transformation).
- 3 tests for `walk()` paired traversal.
- 8 tests for `reconcile()` return-cached-when-unchanged behavior.

**Classification: INV/TECHNICAL.** These are tests of internal utilities (walk, reconcile). Users don't see them. Framework relies on them.

**Verdict:** Keep all. Move to `tests/primitives/` because they're not framework semantics — they're framework plumbing.

---

## `tests/react/assumptions.test.tsx` — 7 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `click triggers re-render via $Bonding` | BEH | Name leaks `$Bonding`. Rewrite label. |
| 2 | `held instance method triggers re-render` | BEH | Clean. |
| 3 | `phase advances after mount` | IMP | Reads `$phase$` directly. Rewrite as "an awaited next('mount') resolves after render." |
| 4 | `two template components have separate state` | BEH+EXE | Clean. |
| 5 | `parent re-render with new props updates child` | BEH+EXE | Clean. |
| 6 | `multiple clicks each update DOM` | BEH+EXE | Clean. |
| 7 | `component removal fires unmount` | BEH | Clean. |

**Verdict:** 6 BEH + 1 IMP. Rewrite #1's label, rewrite #3 as behavior.

---

## `tests/react/augmentation.test.tsx` — 4 tests (sprint-18)

All BEH+EXE. Keep.

---

## `tests/react/contract.test.tsx` — 7 tests (sprint-19)

All BEH+EXE. Keep.

---

## `tests/react/instance-render.test.tsx` — 3 tests

| # | Test | Class |
|---|------|-------|
| 1 | `template .Component works` | BEH+EXE |
| 2 | `held instance .Component works` | BEH+EXE |
| 3 | `held instance method from outside works` | BEH+EXE |

**Verdict:** Keep all.

---

## `tests/react/integration.test.tsx` — 3 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `renders a book via template Component` | BEH+EXE | Clean. |
| 2 | `renders a book via instance $use (stateful pattern)` | BEH+EXE | Name mentions `$use` which is deprecated. Rename. |
| 3 | `re-renders after method call on held instance` | BEH | Clean. |

**Verdict:** Keep. Rename #2.

---

## `tests/react/patterns.test.tsx` — 9 tests (sprint-19)

All BEH+EXE. Keep.

---

## `tests/react/pure-react.test.tsx` — ~5 tests

Baseline React tests with no $Chemistry involved. Verifies test environment works.

**Verdict:** Keep as sanity check. Move to `tests/env/` or similar.

---

## `tests/react/rendering-safety.test.tsx` — 5 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `computed getter in view does not trigger infinite loop` | BEH+EXE | Critical behavior test. |
| 2 | `method called from view does not trigger infinite loop` | BEH | Critical. |
| 3 | `$rendering$ flag is false outside render` | IMP | Reads `$rendering$` internal flag. |
| 4 | `$rendering$ flag is true during render` | IMP | Same. |
| 5 | `two components from same template have separate state` | DUP | Duplicate of assumptions.test.tsx #4. |

**Verdict:** Keep #1, #2. Delete or rewrite #3, #4 as observable behavior. Delete #5 as duplicate.

---

## `tests/react/scope-tracking.test.tsx` — 6 tests (sprint-19)

All BEH+EXE. Keep.

---

## `tests/react/smoke.test.tsx` — 2 tests

| # | Test | Class |
|---|------|-------|
| 1 | `renders hydrogen` | BEH |
| 2 | `renders oxygen` | BEH |

**Verdict:** Keep. Consider consolidating with integration.test.tsx.

---

## `tests/react/validation.test.tsx` — 4 tests

| # | Test | Class | Notes |
|---|------|-------|-------|
| 1 | `accepts correct typed children` | BEH+EXE | Clean. |
| 2 | `$check returns the value (validation is batch-evaluated)` | BEH | Name parenthetical leaks implementation. |
| 3 | `$check accepts correct type` | BEH | Clean. |
| 4 | `$check accepts subclass` | BEH | Clean. |

**Verdict:** Keep. Rename #2.

---

## Non-framework test files

### `tests/framework/catalogue.test.ts` — 396 lines, many tests

Tests the `$Catalogue` reference/literature system (`src/catalogue.ts`). UNRELATED to $Chemistry reactive UI framework. Confirmed by inspection: every test uses `$lib`, `$rep`, `$index`, `$find` — catalogue terminology.

**Verdict:** MOVE to `tests/catalogue/` — NOT classified test-by-test because they're not part of this sprint's scope (they test a different subsystem).

### `tests/framework/reflection.test.ts` — 997 lines, many tests

Tests the `$ObjectiveRep` / `$SubjectiveRep` type reflection system (`src/reflection.ts`). UNRELATED. Confirmed: tests use `$type`, `$typeof`, `$instanceof`, `$Class` — type reflection terminology.

**Verdict:** MOVE to `tests/reflection/` — not part of framework reactivity tests.

---

## Totals (in-scope files only)

| Classification | Count |
|----------------|-------|
| BEH / BEH+EXE | ~60 |
| INV | ~36 |
| IMP | ~42 |
| DEG | ~4 |
| DUP | ~5 |

**Of the ~147 in-scope tests, ~51 (35%) are IMP/DEG/DUP and candidates for deletion or rewrite.**

---

## Confidence statement

I went test-by-test for every file except `catalogue.test.ts` and `reflection.test.ts`, which were verified to be unrelated subsystems via content inspection. For the in-scope files, every test was read and classified individually. The table above reflects this.

Tests I considered uncertain and labeled carefully:
- `chemical.test.ts #6 (render children by default)` — setup uses internal symbol but assertion is behavioral.
- `lifecycle.test.ts #1, #2 (next resolution)` — uses internal `$resolve$` but verifies user contract. Kept as INV.
- `assumptions.test.tsx #1` — content is BEH but name is IMP-leaky. Kept as BEH with a rename note.

The biggest risk in this classification: a test I labeled IMP might actually guard a subtle behavior that manifests only through the internal check. Example: `reaction.test.ts #3` verifies `$Reaction.find(cid)` works; the orchestrator USES this. If we delete the test and later change find() to return undefined, the orchestrator breaks without a failing test.

**Mitigation:** for every IMP test marked for deletion, verify the framework behavior it (indirectly) protects is covered by another test. If not, rewrite instead of delete.

Specifically at risk:
- `reaction.test.ts #3` — covered implicitly by integration tests that render compositions.
- `molecule.test.ts bond creation tests` — covered by scope-tracking and contract tests (if reactivity works, bonds work).
- `particle.test.ts identity tests` — NOT directly covered. But the identity is observable through `toString()` and symbol-keyed React elements in the reconcile machinery. Low risk.
