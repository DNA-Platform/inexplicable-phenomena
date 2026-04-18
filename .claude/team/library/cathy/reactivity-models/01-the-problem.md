---
title: "The problem: when is the view output stale?"
---

# The problem: when is the view output stale?

A reactive UI framework is a function from *state* to *view*. When state changes, the view needs to change to match. The framework's job is to make that correspondence efficient and correct — to figure out **what view output depends on what state**, and to recompute only the view pieces whose dependencies changed.

The naïve approach is: on any state change, recompute the entire view and hand it to a diff engine. This is basically what early React was (and still is, for unmemoized components). It works, but it wastes cycles on parts of the view that didn't actually depend on what changed.

Every reactive framework is essentially an attempt to do *less than that* — to identify precisely which view fragments are stale, so the rest can be left alone. The strategies divide along two axes.

## Axis 1: When is "change" detected?

- **At state write time.** Something watches the write (observable setter, Proxy, signal setter) and marks dependents as stale immediately.
- **At some later synchronization point.** The framework waits until a commit, a flush, or the end of an event loop, then compares the new state to a snapshot and infers what's stale.

React is mostly the second: `setState` schedules; during the next commit, React reconciles new output against cached output. MobX, Vue, Solid, Svelte are mostly the first: reactivity is an *observation* built into reads and writes, so the system knows at write-time exactly what became stale.

## Axis 2: What granularity is tracked?

- **Whole component.** "This state was used somewhere in this component's render; when it changes, re-render the whole component." (React, MobX, early Vue.)
- **Expression or binding.** "This text node depends on `user.name`; when `user.name` changes, update this text node directly." (Solid, Svelte, Vue 3 fine-grained bindings.)
- **Property-level DOM op.** "When `style.color` changes, set `el.style.color = x`." (Svelte compiler output.)

Coarser granularity = larger recompute per change but simpler mental model. Finer granularity = smaller recompute per change but more complex machinery and a more constrained developer contract.

## Why this matters for $Chemistry

$Chemistry starts from OOP: a chemical is a class instance; `this.x = 5` is a valid mutation; methods encapsulate behavior. None of the fine-grained models (Solid, Svelte) naturally fit OOP mutation — they want reactive primitives at every read site. The coarse-grained models (React, MobX) fit OOP better — you mutate the object, the whole view re-runs, and diffing picks up the delta.

But $Chemistry has a further twist: **the view must be pure** — reading state, never mutating it, never allocating new chemicals inside it — because view is called multiple times per render cycle (once for the main render, once at the end of the lifecycle to detect lifecycle-induced changes). That purity requirement nudges us toward a React-like model where view is cheap and can be called twice, plus a diff mechanism that can distinguish "same view output semantically" from "new arrow function in an onClick."

The next five chapters walk through each framework's answer to the core question. The comparison chapter brings them side-by-side. The final chapter draws the implications.
