---
title: "Implications for $Chemistry"
---

# Implications for $Chemistry

This chapter is opinionated. I'm using the comparative survey to propose positions for $Chemistry's reactivity model. They should be debated, not accepted.

## Where $Chemistry sits today

$Chemistry's current model is a hybrid:

- **Built on React** — re-renders are React re-renders; we inherit React's component-subtree granularity and reconciliation.
- **Bonded method wrappers** — every method call on a chemical automatically triggers `$update$` after returning. This is coarser than MobX (MobX tracks reads; we don't) but more automatic than raw React (the developer doesn't manually call setState).
- **Post-lifecycle view diff** — we re-run `view()` at the end of the effect phase and compare its output to the pre-render output. If changed, force update. This catches state mutations that happened during lifecycle effects.
- **OOP-first** — `this.count = 5` and `this.items.push(x)` are idiomatic. We don't intercept them.

This hybrid borrows from React (subtree re-render), MobX (method-level auto-reactivity), and — failingly — tries to approximate tracked access via output diffing rather than input observation.

## The core tension

The survey makes the tension explicit. $Chemistry currently trusts *output* for reactivity decisions (what did view return, did it change) rather than *input* (what did the chemical's state become). Every framework surveyed that does any form of fine-grained tracking does it at the input side. Every framework that does output-based decisions (React's VDOM diff, Vue's patch flags) does it *at the DOM level*, not at the "should I invalidate" level.

Trusting output for invalidation decisions is the uncommon choice. It's why we hit the "inline arrow functions always diff unequal" wall — output is maximally noisy; input is quiet.

## Position 1: the post-lifecycle diff compares a witness produced by the compiled view

The view-diff approach and the deep-state-snapshot approach both fail the semantic test — view-diff has false positives from closures/allocations, deep-snapshot has false positives from state view doesn't read and false negatives for external reads (`Date.now()`, globals).

The right answer is to compile view into a form that **emits a witness object** alongside the JSX output. The witness factorizes every dynamic value that flowed to view — direct reads (`this.$count`), nested paths, per-element witnesses for iteration, conditional branches. The post-lifecycle diff compares witness-before vs. witness-after. Precise, correct, covers external reads.

See the companion book [view-introspection](../view-introspection/README.md) for the full design, direct prior art (C# closure compilation, React Compiler), and implementation sketch.

Deep state snapshot is **not** the design. It was my temporary proposal when I hadn't yet internalized that the correctness target is "compare what view produced," not "compare state." Retracted.

## Position 2: do NOT adopt tracked access now

Tracked access (MobX/Vue model) is compelling. But adopting it is a *huge* change to $Chemistry:

- Every reactive property needs a Proxy interceptor or defineProperty getter/setter.
- Reads need a "currently-rendering chemical" pointer that registers subscriptions.
- We'd have to audit every `===` check (proxy identity ≠ raw identity).
- Destructuring, async boundaries, external state all become new failure modes developers have to learn.

The post-lifecycle state diff (Position 1) gets us ~80% of tracked access's precision at a fraction of the architectural cost. If, after adoption, performance demands it, we can add tracked access incrementally — but we shouldn't do it now as a speculative optimization.

The architecture should not *preclude* tracked access. Keep reactive properties uniform; keep the molecule/bond system able to distinguish reactive from inert. Don't commit to machinery that would be inconsistent with a future tracked-access upgrade.

## Position 3: output equality must short-circuit, everywhere

Every framework surveyed converged on this: propagation stops when output is unchanged. Our version:

- **The bonded method wrapper should not always trigger `$update$`.** If a method didn't change state, no update. (Today we always trigger, which causes spurious renders.) Cost: compare state snapshots around the method call. Same machinery as Position 1.
- **The post-lifecycle diff must short-circuit on equal state.** Already implied by Position 1.
- **Computed getters (if we add them) must short-circuit on equal output.** Not relevant yet, but flag for future.

## Position 4: the developer contract must be written down

Every framework has a contract. React's: render is pure, state is a snapshot. MobX's: wrap in observer, dereference late. Vue's: don't replace refs. Solid's: reads must be in scope. Svelte's: only compiler-visible assignments track.

$Chemistry's contract today is implicit and half-formed. My understanding, now that the survey is done:

1. **Mutations happen via methods, not direct field writes.** Method wrappers are how $Chemistry detects change.
2. **Direct field writes during methods are fine** (the wrapper fires at method return).
3. **Direct field writes outside methods** — in test code, in external callbacks — are NOT guaranteed to re-render unless they flow through a method or `$update$` is manually called.
4. **Views must be pure.** Read from `this`, return JSX. No allocations of chemicals. No side effects.
5. **Mutations in lifecycle methods are allowed** — the post-lifecycle state diff catches them.
6. **State is whatever lives on the chemical's bonded properties.** External state (Date, globals) is out of the reactive model.
7. **Nested mutations** (`this.items.push(x)`) are supported via deep state equivalence checking, same as Svelte 5 and MobX 5+.

This should become a book in this library or a doc in `.claude/docs/chemistry/`. It's C2 of the library sprint.

## Position 5: we are philosophically closest to MobX

Of the five frameworks, MobX is the closest to what $Chemistry wants to be:

- OOP-first, with class annotations and method wrappers.
- React-based, reusing React's DOM layer.
- Tracking at the object level, with derived values short-circuited.
- A contract that lets developers write normal-feeling JavaScript.

We should read MobX's source code, not just its docs, and understand how `Atom`, `Reaction`, and `ComputedValue` are implemented. That's likely where our tracked-access upgrade (if we ever do it) will derive from. A future book: [MobX internals — a reading guide].

## Position 6: we should absorb these lessons as documented abilities, not just memory

Every trap mentioned in the survey chapters will eventually hit a $Chemistry developer. The places to put them:

- Developer-facing docs (`.claude/docs/chemistry/`): what the contract is, what the common traps are.
- This library (agent-facing): why we made the design choices we made, with citations.
- The codebase (inline comments): only where a choice would otherwise be non-obvious.

## Recommended next steps

1. **Finish C2** — write $Chemistry's re-render contract as its own book, cross-linked here.
2. **Read [view-introspection](../view-introspection/README.md)** — the full witness design, prior art, and implementation sketch.
3. **Doug decides implementation priority.** I don't have the grounding to estimate effort or time; the design is described, the path is traceable, the call is his.
4. **Audit our contract vs. the frameworks' contracts for parity** — document our "don't destructure / don't read external state / don't mutate outside methods" rules explicitly.
5. **Add "view must be deterministic given `this`" to the developer contract.** Non-deterministic sources (time, randomness) must be mirrored onto chemical state via bonded updates. This is the framework-level constraint that makes the witness model well-defined.

The key win from this book: we don't have to invent reactivity from scratch anymore. Five frameworks already tried. Their convergent lessons are our starting point — and for the specific question of "compile view source to know what flows to output," React Compiler and Solid's JSX compiler have already proven the approach shippable.
