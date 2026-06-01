# Sprint 18: Reactivity Rebuild

Implement the reactivity model the team converged on in the 2026-04-21 design conversation: reactive methods + view diff at post-lifecycle, with the equivalence rules and the determinism-in-bond-constructor idiom. Audit and rebuild tests against the resulting developer contract. Document the contract.

## Status

IN PROGRESS.

## Design reference

[Composition model notes](../design/composition-model-notes.md) captures the landed design. Cathy's library books ([reactivity-models](../../team/library/cathy/reactivity-models/README.md), [view-introspection](../../team/library/cathy/view-introspection/README.md)) are the background research.

## The contract (developer-facing)

This sprint must produce a clear, written version of the following contract. Every test, every error message, every doc should flow from it:

1. **State lives on chemicals as fields.** Mutate by assignment or via methods.
2. **Reactive methods trigger re-render.** Any method call on a chemical — sync or async — fires `$update` on that chemical after returning (sync) or when its Promise resolves (async).
3. **View is a pure read of chemical state.** Views should be idempotent. Non-idempotent views (reading `Date.now()`, `Math.random()`, external mutable state) cause infinite re-renders via the view diff.
4. **Non-determinism goes in the bond constructor.** `this.$random = Math.random()` in `$ClassName()`; view reads `this.$random`. Stable per instance.
5. **Cross-chemical reads work through the view diff.** Parent reading `this.$child.$x` in its view: when child mutates `$x`, parent's view output differs at post-lifecycle check; parent re-renders.
6. **Chemicals interact freely.** Set properties on each other, call methods on each other, read each other's state. The idiomatic pattern is through reactive methods, but the framework doesn't police it.
7. **Direct property writes outside a method don't trigger re-render by themselves.** The view diff will catch them if they affect any view's output; otherwise they're invisible. Dev-mode warns.
8. **Equivalence rules for the view diff:**
   - Primitives: `===`.
   - Functions: compare via `toString()`.
   - Plain objects and arrays: recursive structural equality.
   - Class instances (including chemicals): reference compare.
   - React elements: delegate to reconcile.

## Stories

### R1 — Audit current implementation

Cathy reads current `chemical.ts`, `particle.ts`, `reconcile.ts`, `helpers.ts` and confirms what aligns with the contract vs. what needs change. Specifically:

- Does `$lift` run the post-lifecycle view diff correctly?
- Does `$createComponent$` run it?
- Does `equivalent()` implement the five rules above?
- Does the reactive-method wrapper (currently in `$Bonding.form`) fire `$update` for sync and async cases?
- Is there dead code from earlier iterations (e.g., the deep-state-snapshot thread) that should be removed?

Output: a short audit memo listing what's correct, what needs change.

### R2 — Verify view-diff cross-chemical case works

Concrete test: parent reads `this.$child.$x` in view. Child mutates `$x` via its own reactive method. Without the view diff, parent wouldn't re-render. With it, parent does. Write this test explicitly. If it passes with current code, R2 is done; if not, fix until it does.

### R3 — Dev-mode warning for out-of-method writes

When a chemical's property is written outside any currently-executing method on that chemical, emit a dev-mode warning. Implementation path: a writable `currentMethod` marker set by the reactive-method wrapper; writes check the marker; warn if unset.

Trade-off: this may have false positives for writes that happen in the bond constructor (where `currentMethod` isn't set). The bond constructor path should either set the marker or be recognized as a first-class write-allowed context.

### R4 — Test audit

Queenie classifies every current test in `library/chemistry/tests/`:
- **VALID** — still expresses the contract correctly; keep.
- **STALE** — tested behavior we no longer intend; delete.
- **NEEDS REWRITE** — tests real behavior but under outdated assumptions; rewrite.

Produce a classification list before deleting or rewriting anything.

### R5 — Contract tests (new)

Queenie writes tests that express the contract directly. Each test maps to a specific contract clause (1-8 above). Minimum coverage:

- **C2 tests:** sync method mutation → re-render. Async method mutation (pre-await, post-await) → re-render. Async method with multiple awaits → single re-render on resolution. Nested reactive method calls → correct re-render scheduling.
- **C3 test:** view reads `this.$count`, nothing changes, re-render is stable.
- **C4 tests:** `Math.random()` in bond constructor is stable per instance across re-renders. `new Date()` in bond constructor same.
- **C5 tests:** cross-chemical read triggers parent re-render when child mutates. Deeply nested cross-chemical read (`this.$parent.$parent.$x`) works.
- **C6 tests:** chemical writes to another chemical's property, that chemical's view output changes, view diff catches it.
- **C7 tests:** direct property write outside any method — view diff catches if view depends on it; dev warning fires.
- **C8 tests:** inline arrow function in onClick — compared by toString; doesn't cause infinite loop. Inline `style={{color: 'red'}}` — compared deeply; doesn't cause loop. `new Date()` in view — ALWAYS differs by reference; DOES cause loop; flag the infinite loop as an anti-pattern in tests; document.

### R6 — Corner case inventory

Queenie and Cathy together enumerate:

- **Circular object references** in props — stack overflow in deep equal. How does the framework surface this? (Likely: document as unsupported; users shouldn't pass circular objects as props.)
- **Functions with same toString, different closure context** — framework says "equal"; behavior may differ. Document as a known limitation.
- **Class instances constructed anew each render** (`new Date()`, `new Foo()` in view) — always reference-differs; causes infinite re-render. Document as anti-pattern; bond constructor is the correct place.
- **Getter properties** — read twice during diff; may be expensive or have side effects. Test both cases.
- **Views that reach into React internals** (e.g., `React.createRef()` inline) — treat as class instances, reference compare, document.

Output: a list of flagged cases with framework response for each (supported, anti-pattern, unsupported).

### R7 — Developer contract doc

Libby writes the developer-facing reactivity contract into `.claude/docs/chemistry/reactivity-contract.md`, in plain prose, with example code for each clause. This becomes the source of truth for "how $Chemistry reactivity works" for future library consumers.

### R8 — Research double-check

Dispatch focused research to verify assumptions:

- React 19 concurrent-mode implications for the view-diff-in-useEffect pattern.
- Whether `Function.prototype.toString()` has any implementation pitfalls (e.g., minification, different return values across JS engines).
- Whether our "write to chemical outside a method" detection can be reliably implemented in userland JavaScript (no Proxy).

## Method

- Research stories dispatched in parallel.
- Audit (R1, R4) done sequentially after research returns.
- Implementation (R2, R3) and tests (R5) built iteratively.
- Docs (R7) finalized after implementation settles.

## Done

- All eight contract clauses are tested in R5.
- Every current test is classified per R4; stale ones deleted; rewrites done.
- R3 dev-mode warning fires for contract violations.
- R7 doc exists and matches the shipped code.
- All tests green. No framework regressions from sprint-13's green state.

## Out of scope (explicitly deferred)

- Static analysis / compiler plugin for generating characteristic functions. This is a future optimization that would replace the view re-run with a tighter `compute()`. Not this sprint.
- Proxy-based tracked access. Rejected in the design conversation.
- Changes to the Component / template / instance / prototypal-clone distinction. That design is separate and tracked in [composition model notes](../design/composition-model-notes.md).

<!-- citations -->
