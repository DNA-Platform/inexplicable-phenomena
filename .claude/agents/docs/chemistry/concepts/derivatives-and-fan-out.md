---
kind: concept
title: Derivatives and fan-out
status: stable
related:
  - lexical-scoping
  - reactive-bonds
  - cross-chemical-handler-fanout
---

# Derivatives and fan-out

The mechanism behind multi-site rendering. Each chemical instance has a `$derivatives$` Set — a collection of `Object.create(this)` instances live elsewhere in the React tree. When a parent's reactive prop is written, the framework walks `$derivatives$` and fires `react()` on each. This is *fan-out*.

## What a derivative is

A derivative is `Object.create(parent)` — an empty object whose prototype is the parent chemical. It has fresh framework identity (`$cid$`, `$symbol$`, `$reaction$`, `$update$`, `$phases$`, `$phase$`) but inherits the bond accessors and shared infrastructure (`$molecule$`, `$orchestrator$`) through the prototype chain.

Derivatives are produced by `$lift`, which is invoked per-React-site when you mount `$(instance)` in JSX. One mount site = one derivative.

## What fan-out is

When a reactive prop is written on the parent — say `parent.$prop = 'x'` — the bond setter does two things:

1. **Local effect**: writes the new value into `parent`'s `$backing$`, fires `parent[$reaction$].react()`.
2. **Fan-out**: walks `parent[$derivatives$]` (a Set of registered derivatives) and fires `react()` on each one.

The fan-out is **unconditional** — the setter does not check whether each derivative has shadowed `$prop`. Shadowing is dynamic (a derivative may have or not have its own value depending on the order of writes/deletes), so checking at fan-out time tracks a moving target. Instead, every derivative wakes; React's reconciler short-circuits any derivative whose view diff is empty.

## Two write paths

The bond setter has two paths depending on whether a scope is active:

- **No active scope.** Direct call: `chem[$reaction$].react()` *and* `fanOutToDerivatives(chem)`. Sibling derivatives wake immediately.
- **Active scope** (the path event handlers take, since view augmentation wraps them in `withScope`). The setter records the write on the scope, defers everything to `scope.finalize()`. The finalizer fires `react()` per dirty chemical *and* fans out to derivatives. Re-entrancy is safe because `withScope` clears `$currentScope` before calling `finalize()` — any cascading writes during fan-out fire as out-of-scope writes.

This second path was the source of [a regression caveat][cross-chemical-handler-fanout] before sprint 24 — the finalizer used to skip fan-out, so writes from one chemical's event handler to another chemical's reactive prop landed but didn't repaint the lifted DOM. Fixed.

## Cleanup

Derivatives are added to `parent[$derivatives$]` on first render at their React site. They're removed on unmount (the lift cleanup runs `parent[$derivatives$].delete(derivative)`). The Set's growth is bounded by the number of live mount sites.

## Three-level chains

A derivative can itself be a parent. If `D` is a derivative of `P`, and `D` is mounted via `$()` somewhere that creates `D'`, then `D` has its own `$derivatives$` containing `D'`. Writes on `P` wake `D` via fan-out; `D`'s setter then walks `D[$derivatives$]` and wakes `D'`. Propagation cascades. This was test scenario 7 in the sprint-22 lexical-scoping test matrix.

## Related

- [Lexical scoping][lexical-scoping] — the higher-level model derivatives implement.
- [Reactive bonds][reactive-bonds] — what gets fanned out.
- [Cross-chemical handler fanout][cross-chemical-handler-fanout] — historical caveat; documents the in-scope-write fan-out fix.

<!-- citations -->
[lexical-scoping]: ./lexical-scoping.md
[reactive-bonds]: ../features/reactive-bonds.md
[cross-chemical-handler-fanout]: ../caveats/cross-chemical-handler-fanout.md
