# Sprint 20: Test Suite as Specification

Review the entire test suite as a STATEMENT OF WHAT $CHEMISTRY IS. The primary question: does each test articulate framework semantics a developer would recognize, or does it test implementation details that happen to exist?

Part I (review) comes first. Part II (fixing) acts on what Part I finds.

## Why this sprint exists

The test suite has grown organically across sprints. Each sprint added tests to verify the work of that sprint. Some tests exercise framework behavior from a developer's perspective; others exercise internal representation (symbols, private state, specific implementation choices) that the framework could change without changing its semantics.

A test that verifies "`chemical[$molecule$].bonds.size === 5`" tells a developer nothing about what $Chemistry does for them. It tells a framework dev "don't break this particular internal data structure." Those are different kinds of assertions.

The test suite IS the most-read form of documentation a framework has. If tests read as cryptic implementation snapshots, developers can't learn from them. If tests read as clear framework behaviors with natural code examples, developers can USE them as examples.

This sprint audits the suite through that lens.

## Status

COMPLETE.

### Delivered (2026-04-22)

- Test-by-test classification at [classification.md](./classification.md).
- **Relocations:**
  - `catalogue.test.ts` → `tests/catalogue/` (unrelated subsystem, 1 file, ~80 tests).
  - `reflection.test.ts` → `tests/reflection/` (unrelated subsystem, 1 file, ~100+ tests).
  - `walk.test.tsx` → `tests/primitives/` (internal utility, not framework semantics).
  - `pure-react.test.tsx` → `tests/env/` (test environment sanity).
- **Deletions:**
  - `reaction.test.ts` (100% IMPLEMENTATION — internal registry tests).
  - ~30 IMPLEMENTATION/DEGENERATE/DUPLICATE tests across `chemical.test.ts`, `molecule.test.ts`, `particle.test.ts`, `lifecycle.test.ts`, `rendering-safety.test.tsx`.
- **Rewrites:**
  - `chemical.test.ts` — 12 tests → 3 BEHAVIOR tests with clear names.
  - `molecule.test.ts` — 14 tests → 6 INVARIANT tests reframed as framework rules (rather than internal bond-structure assertions).
  - `particle.test.ts` — 14 tests → 3 BEHAVIOR tests about identity and lift.
  - `lifecycle.test.ts` — reorganized and relabeled; describes the framework's phase-coordination contract.
  - `rendering-safety.test.tsx` — 5 tests → 2 BEHAVIOR tests about view-as-pure-read safety.
- **Label renames:**
  - `assumptions.test.tsx` — all 7 labels rewritten from "React assumption: X" format to direct behavior descriptions.
  - `integration.test.tsx`, `validation.test.tsx` — one label each.

### Test count

- Before sprint-20: 323 tests.
- After sprint-20: 286 tests.
- Delta: -37 tests (≈11% reduction).
- Coverage preserved: all remaining tests pass; framework behavior covered by the reduced set.

### Cohesion verdict (final)

The test suite NOW reads as a specification of what $Chemistry does. Reactivity-contract tests from sprint-19 anchor it. Pre-sprint implementation-heavy tests are gone or reframed. Unrelated subsystems (catalogue, reflection) live in their own directories rather than pretending to be part of the framework test surface.

A developer reading `tests/react/*` and `tests/framework/*` can learn what the framework promises without decoding internal symbols.

## Structure

### Part I — Review (stories R1–R6)

Every test gets classified. Classification determines what Part II does to it.

### Part II — Act on findings (stories A1–A5)

Delete, rewrite, or restructure based on Part I's classification.

---

## Part I stories

### R1 — Classification framework (Queenie)

Define the classification dimensions before we start labeling.

**Primary dimension — what does this test verify?**
- **BEHAVIOR**: observable framework behavior a developer experiences. "When I mutate `this.$count` in a handler, the DOM updates."
- **IMPLEMENTATION**: internal representation or code shape. "The molecule has 5 bonds after reactivate." Users don't care about this; we can change bonds without changing what the framework does.
- **INVARIANT**: framework-level correctness property that isn't directly user-facing but must hold for behavior to work. "A scope's read-set is finalized before writes propagate." More internal than BEHAVIOR but more architectural than IMPLEMENTATION.
- **STALE**: tested something that's no longer how the framework works. Deletion candidate.
- **UNCLEAR**: the test author's intent is ambiguous. Needs clarification before we can classify.

**Secondary dimension — is this test instructive?**
- **EXEMPLAR**: reads like a small example a developer would copy. Clear setup, clear assertion, natural code.
- **TECHNICAL**: useful for verifying correctness but not suitable as documentation.
- **CRYPTIC**: hard to understand what's being verified or why.

A test can be BEHAVIOR+EXEMPLAR (keep, prize), BEHAVIOR+TECHNICAL (keep, lower priority), IMPLEMENTATION+CRYPTIC (likely delete), etc.

**Deliverable**: `.claude/project/sprint-20/classification.md` listing every test file with its dimensions recorded.

### R2 — Audit `tests/framework/*` (Queenie)

These are the most-likely-to-be-implementation-heavy tests. Each file:

- `catalogue.test.ts`
- `chemical.test.ts`
- `lifecycle.test.ts`
- `molecule.test.ts`
- `particle.test.ts`
- `reaction.test.ts`
- `reflection.test.ts`
- `symbolize-audit.test.ts`
- `walk.test.tsx`

For each test in each file, Queenie records the classification and a one-sentence rationale. Cathy spot-checks the ones Queenie flags as borderline.

### R3 — Audit `tests/react/*` (Queenie with Cathy)

These are more likely behavior-focused but may have drifted. Each file:

- `assumptions.test.tsx`
- `augmentation.test.tsx`
- `contract.test.tsx`
- `integration.test.tsx`
- `instance-render.test.tsx`
- `patterns.test.tsx`
- `pure-react.test.tsx`
- `rendering-safety.test.tsx`
- `scope-tracking.test.tsx`
- `smoke.test.tsx`
- `validation.test.tsx`

Same classification per test. Cathy joins Queenie on the semantically-subtle ones.

### R4 — Design review of test NAMES (Cathy)

Read every `describe/it` line. Do they articulate framework behavior?

Good: `it('click triggers re-render via $Bonding', ...)` — but actually "$Bonding" leaks implementation. Better: `it('clicking a button that mutates state updates the DOM', ...)`.

For each test file, rewrite the `describe/it` labels to read as framework specifications. Output: a proposed rewrite list.

### R5 — Design review of test SHAPE (Cathy)

Are there common patterns of setup boilerplate that obscure the point of tests? Should we have test-only fixtures that reduce the boilerplate?

Examples of boilerplate worth compressing:
- `new $Foo(); const foo = new $Foo(); const Foo = foo.Component;` — the "ensure template exists, then hold instance" dance. Could be `held($Foo)`.
- `await act(async () => { fireEvent.click(...); await new Promise(r => setTimeout(r, 10)); });` — async click + flush. Could be `clickAndFlush(button, { wait: 10 })`.

Proposed helper catalog. Each helper cleans up N tests.

### R6 — Duplication audit (Arthur)

Are there tests that verify the same behavior in different files? Consolidate. Output: a duplication map with proposed consolidations.

---

## Part II stories

### A1 — Delete classified-IMPLEMENTATION tests (Queenie)

For every test classified as IMPLEMENTATION in Part I, Queenie proposes deletion. Cathy reviews. Doug approves.

### A2 — Rewrite STALE and UNCLEAR tests (Queenie + Cathy)

For each STALE test: decide whether the intended behavior is still valid. If yes, rewrite against current framework. If no, delete.

For each UNCLEAR test: clarify intent with Cathy, then rewrite or delete.

### A3 — Apply name rewrites from R4 (Cathy)

Update `describe`/`it` labels across the suite per R4's proposed list.

### A4 — Extract test helpers per R5 (Cathy)

Add `tests/helpers/` or `tests/utils/` with the proposed fixtures. Refactor N tests per helper to use the new shape.

### A5 — Consolidate duplicates per R6 (Arthur)

Merge duplicate tests into their canonical location. Update any cross-references.

---

## Acceptance criteria

- Every test file has a classification entry.
- No IMPLEMENTATION-classified tests remain (deleted or elevated to INVARIANT with justification).
- No STALE or UNCLEAR tests remain.
- Test names read as framework specifications.
- Common patterns live in test helpers.
- Duplications eliminated.
- Test count should decrease (deletions) but CLARITY should increase.
- All remaining tests pass.

## Out of scope

- Adding new tests for uncovered behavior (that's sprint-21 or natural work).
- Performance benchmarks (sprint-19 R17).
- Refactoring non-test code (unless a test reveals a real framework gap).

## Risk

- **Over-deletion.** We might delete a test that actually guards a real invariant. Mitigation: Cathy reviews every deletion; if unsure, downgrade to INVARIANT + keep.
- **Under-classification.** Lots of tests, easy to rubber-stamp. Mitigation: Cathy spot-checks a random sample of Queenie's classifications.
- **Scope creep.** Easy to turn into a "rewrite everything" sprint. Mitigation: Part II is strictly acting on Part I's findings; no new behaviors.

## Method

- R1 first. Rest of Part I runs in parallel where possible (R2, R3, R4, R5, R6 are independent).
- Part II executes after Part I completes.
- No git commits until both parts pass and all tests green.

## Done

- Classification doc written.
- Deletion list reviewed and applied.
- Rewrite list reviewed and applied.
- Name and helper refactors landed.
- All tests green.
- Test count delta recorded with rationale.
