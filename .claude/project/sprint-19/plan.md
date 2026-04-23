# Sprint 19: Scope-Tracked Reactivity

Build the scope-tracking reactivity model designed in the 2026-04-22 conversations. Getter/setter interception on reactive properties, scope-local read/write tracking, `$symbolize`-based snapshots, scope finalization fires `react()` on every chemical with a diff.

## Status

IN PROGRESS — foundation complete, tests passing.

### Completed

- **R1** — Scope class implemented in `scope.ts`. Read/write tracking + snapshot-diff finalize.
- **R2** — Getter/setter interception installed by `$Bond.form()` via `installReactiveAccessor`. Backing storage per chemical via `$backing$` symbol, prototypally inherited.
- **R3** — `$symbolize` extended to handle Map, Set, Date, RegExp with determinism (sorted keys). Determinism bug in `unique` prefix fixed.
- **R4** — Handler augmentation rewired to `withScope`. Sync + async (with continuation scope).
- **R5** — Method wrapper (`$Bonding.form`) rewired to `withScope`. Direct writes during render suppressed via `$rendering$` flag.
- **R7** — `react(chemical)` free function exported as the public escape hatch for programmatic callers.
- **R18** — Developer contract doc at `.claude/docs/chemistry/reactivity-contract.md`.

### New tests added (29 cases)

- `tests/framework/symbolize-audit.test.ts` — 20 cases, `$symbolize` contract.
- `tests/react/scope-tracking.test.tsx` — 6 cases, scope-aware mutations.
- `tests/react/contract.test.tsx` — 7 cases, full developer contract coverage.

### Remaining

- **R6** — Wrap render cycle in a scope (currently not done; post-lifecycle view diff + immediate setter react cover the cases tested so far).
- **R8** — Test audit of 277 original tests (they all still pass; formal classification deferred).
- **R9–R16** — Expanded test suite. ~120 additional cases remain.
- **R17** — Performance benchmarks.


## Design reference

[Composition model notes](../design/composition-model-notes.md) captures earlier design. The scope-tracking model extends it:

- Reactive properties get getter/setter interception installed by `$Molecule.reactivate()`.
- Handler augmentation, reactive methods, and the render cycle each OPEN a scope.
- Within a scope, property reads record a `$symbolize` snapshot; property writes record the write target.
- At scope finalize: for each chemical with a direct write OR a read-snapshot that differs from current state, fire `reaction.react()`.
- React's automatic batching consolidates multiple reacts in a tick into a single coordinated render pass.

## The developer contract

1. **State lives on chemicals as fields.** `$`-prefixed fields are reactive.
2. **Mutations in reactive methods and event handlers trigger re-renders automatically.** No `setState`, no `useState`.
3. **Mutations from external callbacks (setTimeout, fetch.then, websocket) require a reactive method.** Call `this.someMethod()` from the callback; the method's wrapper opens a scope.
4. **Views are pure reads.** Non-idempotent views (time, random, new instance) cause infinite loops (anti-pattern, documented).
5. **Cross-chemical state: reading and writing freely supported within a scope.** Any chemical written in-scope gets `react()`'d. Chemicals READ in-scope whose state later changes outside that scope need React cascade or explicit subscription — framework doesn't maintain persistent read-subscriptions.
6. **Chemicals composed via bond constructor are typically rendered in their owner's view.** The common case "react on path" aligns with React's natural cascade.

## Stories

### R1 — Scope infrastructure

- **R1.1** Create `Scope` class in `chemistry/chemical.ts` (stays in the coupled cluster).
- **R1.2** Module-level `$currentScope` pointer.
- **R1.3** `withScope(fn)` wrapper: opens scope, runs fn, finalizes on exit.
- **R1.4** Scope tracks `reads: Map<chemical, Map<prop, snapshot>>` and `writes: Map<chemical, Set<prop>>`.
- **R1.5** `scope.finalize()` computes dirty set (direct writes ∪ snapshot-differs reads), fires react on each.
- **R1.6** Nested scopes: inner reads/writes propagate to outermost; only outermost finalizes.

### R2 — Getter/setter interception

- **R2.1** `$Molecule` / `$Bond.form()` installs `Object.defineProperty` accessors on reactive properties.
- **R2.2** Accessor uses a backing storage (e.g., `chemical[$backing$][prop]`).
- **R2.3** Getter: returns value; if `$currentScope`, records read with snapshot.
- **R2.4** Setter: stores value; if `$currentScope`, records write.
- **R2.5** Preserves object identity (`chem === chem` still works).
- **R2.6** Only reactive properties (`$`-prefixed, not `$$` or `_` prefixed) get accessors.

### R3 — Snapshot via `$symbolize`

- **R3.1** Scope's read snapshot calls `$symbolize(value)` → string.
- **R3.2** Diff at finalize: re-symbolize current value; string compare.
- **R3.3** Validate `$symbolize` handles: primitives, plain objects, arrays, Maps, Sets, nested chemicals, cycles. Expand `$symbolize` to handle Maps and Sets if it doesn't currently.
- **R3.4** Class instances: `$symbolize` returns a reference-stable placeholder (already does this for non-chemical classes); instance identity preserved.

### R4 — Rewire handler augmentation

- **R4.1** Current `augment()` wraps handlers with react() call. Change to wrap with `withScope(() => handler(...args))`.
- **R4.2** For async handlers: attach `.then(() => withScope(() => { /* continuation is a fresh scope */ }))` — except the continuation has already run by .then fires. So: wrap the handler in a way that the sync portion is one scope; the post-await continuation is a separate scope opened by the Promise resolution wrapper.
- **R4.3** Remove direct `react()` calls from augment wrapper — scope.finalize() does it.

### R5 — Rewire reactive methods

- **R5.1** `$Bonding.form()` currently wraps methods with react-on-return. Change to wrap with `withScope(() => action(...args))`.
- **R5.2** Async methods: same treatment as async handlers — sync scope + post-await scope.
- **R5.3** Remove direct `react()` calls.

### R6 — Rewire render cycle

- **R6.1** FC body opens a render scope at start, finalizes at end of post-effect useEffect.
- **R6.2** Removes the explicit post-lifecycle view diff (now subsumed by the render scope's snapshot-diff of anything view read).
- **R6.3** Applies to both `$lift` and `$createComponent$`.

### R7 — `$Reaction.react()` public

- **R7.1** Make `reaction.react()` public and documented as the escape hatch for programmatic mutations outside methods/handlers.
- **R7.2** Shorthand: `chemical.react()` that delegates to `chemical[$reaction$].react()`. (Consider; may pollute chemical namespace.)

### R8 — Test audit

- **R8.1** Classify 277 existing tests as VALID / STALE / NEEDS REWRITE.
- **R8.2** Delete STALE tests. Rewrite NEEDS REWRITE tests.
- **R8.3** Ensure green baseline before Phase 2 begins.

### R9 — Scope mechanics unit tests (Phase 2 from Queenie's plan)

- **R9.1** Scope.read/write record correctly.
- **R9.2** Scope.finalize fires react for direct writes.
- **R9.3** Scope.finalize fires react for snapshot diffs.
- **R9.4** Nested scopes propagate correctly.
- **R9.5** Scope idempotency (multiple scopes, same properties) — consistent behavior.

### R10 — Handler scope integration tests

- **R10.1** Direct writes, array push, Map set, Set add — all trigger re-render.
- **R10.2** Writes to parent/child/sibling chemical — appropriate chemical re-renders.
- **R10.3** Deep path writes (`this.x.y.z = v`) — all chemicals along the path re-render.
- **R10.4** No-mutation handler — no re-render.
- **R10.5** Async handler pre/post-await mutations — both captured.

### R11 — Method scope integration tests

- **R11.1** Reactive method mutation → re-render.
- **R11.2** Nested reactive method calls → outermost scope finalizes.
- **R11.3** Async reactive method → sync + continuation scopes.

### R12 — Render-cycle scope tests

- **R12.1** Lifecycle method mutation → captured by render scope.
- **R12.2** Cross-chemical read in view → child mutation cascades to parent via React.
- **R12.3** Non-deterministic views (anti-pattern) → document infinite loop.

### R13 — External callback boundary tests

- **R13.1** setInterval direct write → no re-render (boundary).
- **R13.2** setInterval calling reactive method → re-render works.
- **R13.3** fetch.then direct write → no re-render (boundary).
- **R13.4** fetch inside async mount → re-render works.
- **R13.5** Document each pattern with tests.

### R14 — Composition and graph tests

- **R14.1** Circular references handled by `$symbolize`.
- **R14.2** Chemical held but not rendered — write fires but no DOM change.
- **R14.3** Sibling without ancestor — write fires react but UI stale (documented).

### R15 — Anti-pattern tests

- **R15.1** `new Date()` in view → infinite loop.
- **R15.2** Mutation in view → infinite loop.
- **R15.3** Non-reactive (`_`-prefix) property write → no re-render.

### R16 — Strict Mode and concurrent tests

- **R16.1** Strict Mode double-invoke → idempotent scope behavior.
- **R16.2** Discarded render → no leak.
- **R16.3** Transition-deferred update → works.

### R17 — Performance benchmarks

- **R17.1** Baseline: pre-scope vs. scope-tracked. Simple chemical, 10 props, 1000 re-renders. Target: <2× slowdown.
- **R17.2** Large state: chemical with 10000-entry Map. Measure `$symbolize` cost per read. Target: <5ms per read.
- **R17.3** Deep nesting: 10-level chemical chain. Measure finalize cost. Target: <10ms per finalize.
- **R17.4** If any target exceeded: evaluate optimization (lazy snapshot, cached serialization, leaf class-instance shortcut).

### R18 — Developer contract documentation

- **R18.1** Write `.claude/docs/chemistry/reactivity-contract.md` covering the contract clauses above.
- **R18.2** Code examples for each clause.
- **R18.3** Explicit anti-pattern section with code that doesn't work and why.
- **R18.4** Mental-model section: "scope, snapshot, diff, react — what the framework does behind your OO code."

## Method

- R1, R2, R3 built first (infrastructure).
- R4, R5, R6 wire into existing augment/bond/render paths.
- R7 exposes the public escape hatch.
- R8 audits existing tests against the new contract.
- R9–R16 new tests (~150 cases).
- R17 benchmarks; gate the feature.
- R18 docs capture what was built.

## Done

- All new stories complete.
- All 277+ existing tests green (classified, rewritten where needed).
- All new tests green.
- Performance benchmarks within target.
- Developer contract doc exists.
- Surface area: no React primitives inside chemicals; external code uses `chemical.react()` escape hatch when needed.

## Out of scope

- Static analysis / compile-time slicing (later sprint).
- Framework-provided scheduler primitives (explicitly rejected).
- React.memo usage inside chemicals (not applicable — no React primitives).
- Subscription graph for cross-tree cross-chemical reactivity (relying on React cascade + composition discipline).

## Risk and mitigation

- **Performance unknown until R17.** If scope-tracking is too slow for production use, we have clear optimization paths (lazy snapshot, leaf shortcuts). Worst case: defer to static-analysis sprint.
- **Existing tests may break.** R8 audits and fixes; Queenie owns.
- **Strict Mode edge cases** (R16) — need careful testing.
- **$symbolize may not currently handle all cases** (R3.3). May need expansion.

<!-- citations -->
