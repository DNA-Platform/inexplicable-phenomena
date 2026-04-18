---
title: "React: reconciliation from the root"
---

# React: reconciliation from the root

React is the baseline. It's the reactivity model that accepts the most "unnecessary" work at runtime and makes up for it with a simple developer contract. Understanding its trade-offs makes the others legible.

## The signal: setState

When a component calls `setState` (or its cousins — `useReducer`'s dispatch, context updates propagating through a Provider), React schedules a render. The signal isn't "something changed" — it's "the developer *asked* for a re-render." There is no observation of reads, no dependency tracking, no derivation graph. The only thing React knows is *whose setState got called*.

## The granularity: component-scoped, tree-walking

React re-runs the component whose state was updated, **and every descendant component** that the render produces, from the top down. There's no per-prop tracking; if the state lives in `<Page>` and changes, `<Page>`, `<Header>`, `<Body>`, `<Footer>` all re-run.

The saving grace is **reconciliation**: the new tree of React elements is structurally diffed against the previous tree, and only the minimum set of DOM mutations is applied. Siblings at index `i` are matched to previous siblings at index `i` (overridable via `key`). Type matches preserve the DOM node and its state (focus, scroll, input value); type changes unmount and remount.

So the work model is: *lots of virtual-DOM allocation* (every render creates new element objects), *minimal real-DOM mutation* (reconciliation catches the delta).

## The developer contract

1. **Render must be pure.** Same props/state/context → same JSX. No mutation of external data during render. React enforces this via Fiber's interruption model: a render may be thrown away mid-tree and restarted; anything with side effects will double-fire.
2. **Effects are the side-effect container.** `useEffect` runs after commit; `useLayoutEffect` before paint; `useInsertionEffect` before layout.
3. **State is a snapshot.** Within a render and its handlers, state variables hold the values captured at render time. Sequential `setX(x+1); setX(x+1)` increments by 1, not 2 — both reads see the same `x`. Use updater form `setX(x => x+1)` to compose.
4. **Keys for list identity.** Positional matching is the default; `key` is how you say "this is the same conceptual item."
5. **Refs for non-render values.** Anything that shouldn't drive rendering (timer IDs, DOM handles, mutable "latest value" caches) goes in `useRef`.

## memo, useMemo, useCallback are NOT reactivity

They're **referential-equality gates.** `React.memo(C)` does `Object.is` on each prop against the previous render; if all equal, it skips re-rendering `C` and its subtree. `useMemo` / `useCallback` stabilize references across renders so parent-provided values can pass those equality checks.

None of these observe reads. They're the developer manually wiring up change-detection gates where reconciliation would otherwise be wasteful. Inline objects (`style={{...}}`) and inline functions (`onClick={() => ...}`) defeat these gates by construction — a new allocation per render, unequal by `Object.is`. React doesn't track structural equality because **it chose not to pay that cost at the framework level**; it pushed the cost to the developer, who opts in when it matters.

## Fiber and the interruptibility lever

Fiber replaces the recursive render call stack with a linked tree of work units (`child`/`sibling`/`return`), making render work **interruptible**. Higher-priority updates (user input) can abandon an in-progress low-priority render (a `startTransition`). Double-buffering: the committed tree is `current`, the in-progress tree is `workInProgress`, swapped atomically at commit.

This is why "render must be pure" is a hard rule. Renders may execute and be discarded; impure code would produce visible side effects from thrown-away work. Strict Mode enforces this by double-invoking component bodies, state updaters, and effect cycles in development — a pure function is invariant, an impure one is immediately exposed.

## What React can't do cleanly

- **Fine-grained invalidation.** Everything below the state owner re-runs. If you want less, you memoize. Memoization is the developer's problem, not the framework's.
- **Tracking structural equality on props.** Inline `{color: 'red'}` objects defeat `memo`. Teach developers to hoist, or accept the wasted work.
- **Synchronous read-back of new state.** `setState(x+1); console.log(x)` logs the old `x`. State updates are queued.
- **Reacting to values outside the component's state model.** External stores (Redux, Zustand, etc.) need `useSyncExternalStore` to participate in React's tearing-safe subscription protocol.

## Why this matters for $Chemistry

$Chemistry is built *on top of* React's primitives — we inherit its reactivity model by construction. Our `$update$` is a thin wrapper over `useState` for force-update purposes. When a bonded method mutates state, we call `$update$`, React re-renders the chemical's function component, reconciliation kicks in, DOM updates.

The places where $Chemistry adds value on top of React are:

- **Bonded methods auto-trigger `$update$`** — the developer doesn't manually call setState, the wrapper does it for them.
- **Lifecycle phases** that map to effect timing — giving developers a structured way to participate in mount/layout/effect.
- **Post-lifecycle diff** — catching state mutations during effect resolution so view can be re-computed with fresh state.

Everything React-specific that applies to React also applies to us: render must be pure, view is a snapshot, inline allocations in view are expensive to diff.
