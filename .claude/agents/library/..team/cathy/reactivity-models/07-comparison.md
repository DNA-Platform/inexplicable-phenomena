---
title: "Comparison: the developer contract across frameworks"
---

# Comparison: the developer contract across frameworks

Five frameworks, five answers. The point of this chapter is to collapse them into a single mental model so that reactivity design decisions can be made by consulting a matrix rather than by recollecting five separate documents.

## The matrix

| Framework | Signal | Tracking | Granularity (invalidation) | Granularity (DOM update) | Developer contract |
|-----------|--------|----------|----------------------------|--------------------------|---------------------|
| **React** | `setState` call | None (blunt invalidation from state owner down) | Component subtree | Reconciliation diff | Pure render; `memo`/`useCallback`/`useMemo` to stabilize; `key` for lists |
| **MobX** | Atom `reportChanged` on write | Read-time registration with current `Reaction` | Per-atom subscription → per-component re-render | Reconciliation diff (React) | Annotate `observable`; mutate in `action`; wrap components in `observer`; pass refs, dereference late |
| **Vue 3** | Proxy `set` trap → `trigger` | Proxy `get` trap → `track`, keyed per (target, prop) | Per-effect (including per-component render effect) | Patch flags + tree-flattened vnode diff | `ref()` / `reactive()`; mutate in place; never replace proxy; `computed()`/`watch()`/`watchEffect()` |
| **Solid** | Signal setter publishes | Accessor call inside tracking scope subscribes | Per-effect (leaf of expression tree) | Direct DOM op emitted by compiler | Accessor calls inside scopes; no destructure; `batch`/`untrack`; `<Show>`/`<Switch>` for shape changes |
| **Svelte 5** | `$state` setter publishes (deep via Proxy) | `$state` getter registers with current `$effect`/`$derived` | Per-signal → per-effect | Compile-time-generated DOM ops | Declare with runes; rest is compiler magic |
| **Svelte 4** | Assignment rewritten by compiler to `$$invalidate(bit)` | None (compiler-static, per-var bit) | Component-wide bitmask | Compile-time-generated DOM ops reading mask | Only compiler-visible assignments track; `array = array` workaround; cross-file via stores |

## Three reactivity primitives

Strip the syntax and naming differences away. All five answer three orthogonal questions:

**(1) How does the framework detect "something changed"?**

Three answers appear:
- **Developer calls setState.** React. The framework has no visibility into reads; it re-renders when asked.
- **Reads register with an active reactor; writes notify registered reactors.** MobX, Vue 3, Solid, Svelte 5. The runtime intercepts both sides.
- **Compiler rewrites assignments to invalidation calls.** Svelte 4 (largely replaced in Svelte 5).

**(2) What unit of work is invalidated?**

- **Component subtree.** React, MobX (via React), Svelte 4.
- **Single effect / expression.** Vue 3, Solid, Svelte 5.

**(3) How does invalidation become DOM updates?**

- **Virtual-DOM diff.** React, MobX, Vue 3 (augmented with patch flags).
- **Compiler-emitted direct DOM ops.** Solid, Svelte.

The third axis turns out to be orthogonal to the first two — you can pair signal-based reactivity with either VDOM diff (Vue) or direct DOM ops (Solid, Svelte).

## Coarse → fine spectrum

Ranked by how much work is discarded on average per state change:

```
MOST work discarded (coarsest)                          LEAST work discarded (finest)
←─────────────────────────────────────────────────────────────────────────────────→

React          MobX           Vue 3            Svelte 5 / Solid
(whole         (components    (components      (one text node,
 subtree)       that read)     that read +      one attribute)
                               patch flags)
```

The rightward end achieves precision at the cost of:
- More runtime machinery (signal graphs, effect scopes, tracking scopes).
- More surprising developer contracts (destructuring loses tracking, reads outside scope silently fail).
- More compiler involvement (Solid, Svelte need build-time transformation).

The leftward end accepts runtime waste to buy:
- A simpler mental model (just re-render; diff sorts it out).
- No build-time magic required.
- Fewer trapdoors for inexperienced developers.

There is no wrong choice here; there are only choices that fit or don't fit a framework's *identity*. React's identity is "JavaScript, not a DSL"; MobX's is "invisible reactivity"; Solid's is "reactivity is a runtime primitive"; Svelte's is "the compiler is the framework."

## Output equality is universal

Every framework that does *any* form of dependency tracking has converged on the same optimization: **downstream propagation is short-circuited when the computed output is equal to the cached output.**

- MobX: `computed` compares via `comparer.default` (identity); equal short-circuits.
- Vue 3.4+: computeds short-circuit when output is unchanged.
- Solid memos: cache and only notify on actual value change.
- Svelte 5 derivers: same.

This is not a coincidence. The pattern "mutate state, derive a value, propagate to a view" has a natural no-op when the derived value doesn't change. A framework that doesn't short-circuit here creates effect cascades — downstream code runs on every upstream change, even when nothing observable changed.

**For $Chemistry: any reactivity model we adopt must short-circuit on output equality.** The question is what "equality" means — which we discussed in the `equivalent()` design conversation.

## Failure modes cluster

The failure modes across frameworks are not unique to each framework; they repeat with different symptoms:

- **"Destructuring loses reactivity."** MobX, Vue, Solid. Always present in frameworks that track dereference sites.
- **"Async boundaries are outside tracking."** MobX, Vue, Solid, Svelte 5. Present whenever tracking is tied to a synchronous call stack.
- **"Raw identity != proxy identity."** Vue, Svelte 5. Present whenever reactivity is injected via Proxy.
- **"Reactivity ends at some boundary."** Svelte 4 (component boundary), Solid (tracking scope), etc.
- **"Effect cascades from side-effectful derivations."** MobX (reactions that write), Vue (watchEffect that writes), Solid (effects that write), Svelte 5 (effects that write). Universal.

These aren't bugs — they're the price of abstraction. The right frame: decide which failure modes are tolerable for *our* developers, and design documentation/tooling around them.

## What none of them offer

None of these frameworks cleanly handle:

- **Reading from external time or randomness and wanting that to drive reactivity.** Always requires a reactive wrapper (setInterval mutating a signal, etc.).
- **Automatic tracking through class method boundaries without explicit wrapping.** MobX needs `makeObservable`; Vue needs `reactive()`; Svelte 5 needs runes. All require opt-in.
- **Reactivity in code that hasn't been told it's reactive.** A plain function that reads `obj.x` from a reactive proxy and returns a value is tracked if called inside a scope, untracked if called outside. There's no way to mark a function as "always tracking" without wrapping its call site.

These aren't weaknesses of any individual framework. They appear to be fundamental limits of the reactive abstraction in JavaScript.

## Summary

The five frameworks agree on more than they disagree:

- Tracking is a valid strategy; fine-grained is possible but carries contract cost.
- Output equality short-circuits are non-negotiable.
- Async boundaries always break tracking.
- Destructuring always loses reactivity where tracking is read-site based.
- The compiler can help (Solid, Svelte) but isn't required (MobX, Vue).

They disagree on:

- Whether the developer explicitly triggers re-renders (React) or the framework infers them (everyone else).
- Whether components run once (Solid) or re-run on state change (everyone else).
- Whether reactivity is injected via Proxy (Vue, Svelte 5, MobX 5+), via compile-time rewriting (Svelte 4), or not at all (React, where "reactivity" is just setState).

The next chapter — [implications for $Chemistry](08-implications-for-chemistry.md) — answers: given where $Chemistry sits today, which of these models best guides the next design decisions?
