---
title: "Solid: signals and fine-grained effects"
---

# Solid: signals and fine-grained effects

Solid inverts React. Components run *once*. Reactivity lives in the leaves of the expression tree, not at the component boundary. When a value changes, the framework doesn't re-run the component — it re-runs the specific effect bound to that value, which updates one text node or one attribute.

## The signal: createSignal returns a getter/setter pair

```js
const [count, setCount] = createSignal(0);
// read:   count()
// write:  setCount(1)
```

The getter is a function call. This is load-bearing. Invoking `count()` within a *tracking scope* registers the current reactive computation as a subscriber in the signal's dependents set. Writing with `setCount(1)` compares against the previous value (default `===`, overridable) and, if changed, schedules all dependents for re-execution.

Reactivity is pull-based on reads, push-based on writes: reads are O(1) subscription records, writes walk the dependency graph.

## Tracking scopes

Three constructs create tracking scopes:
- `createEffect(fn)` — side effect re-running on dep change.
- `createMemo(fn)` — pure derived signal; caches, equality-checks.
- `createComputed(fn)` — the synchronous sibling of effect, for advanced graph construction (rarely the right choice).
- **JSX expressions inside a component's return value.** The compiler wraps every dynamic hole in an effect.

Reading a signal *outside* any tracking scope yields the current value with no subscription — no error, just silently dead code reactively. This is the single most common Solid trap.

## Components run once

A Solid component is a plain function invoked exactly once per instantiation. It returns a DOM-producing expression; it does not re-run on update. The compiler transforms `<div>{count()}</div>` into a template clone plus an `insert(div, count)` call that creates a render effect writing `count()` into a text node. Only that text node re-updates.

There is **no `useMemo` or `useCallback` hygiene** in Solid because nothing re-runs to need memoizing. The closures you write are the closures that persist. The DOM operations the compiler emits are the only work done on update.

## The developer contract

1. Pass signal accessors (`count`), not signal values (`count()`), across boundaries.
2. Never destructure `props`. `const { name } = props` reads `props.name` once and freezes it. Use `props.name` at the call site, or `splitProps(props, ["name"])` to preserve the getter proxy.
3. Any computation that needs to track must execute the read *inside* its own scope.
4. `batch(fn)` defers downstream notifications until `fn` returns — multiple setter calls fire one effect.
5. `untrack(fn)` reads signals without subscribing; `on(deps, fn)` makes dependencies explicit.
6. Use `<Show>`, `<Switch>`, `<Dynamic>` for conditional tree shapes — the component won't re-execute to change its shape.

## Effects and memos

`createEffect(fn)` runs once after render (post-DOM, pre-paint), then re-runs whenever any signal it read changes. `createMemo(fn)` is a *pure* derived signal that caches its return value and only notifies downstream when the result actually changes. `onCleanup(fn)` registers a disposer before the computation re-executes or is disposed.

Effects run after memos in each flush cycle.

## What Solid can't do cleanly

- **Components can't restructure their DOM shape per-render.** The component body doesn't re-execute, so conditionals must use `<Show>` / `<Switch>` / `<Dynamic>` or they'll be captured at mount.
- **"The getter is a function call" ergonomic.** `{foo}` in JSX doesn't track; you need `{foo()}`. Easy to forget.
- **Reading signals outside tracking scope.** No error, silently dead.
- **Third-party integration.** Code expecting plain values (React-idiom hooks ported over) has to be wrapped.
- **Concurrent-mode-style interruption.** Solid doesn't have one; render is synchronous.

## Why this matters for $Chemistry

Solid's model is the farthest from $Chemistry's. It requires component functions to run once and reactivity to live in expressions. $Chemistry has a whole lifecycle per render and treats the chemical as the unit of re-render; we're philosophically closer to React.

That said, the *discipline* Solid's model enforces is worth absorbing:

- **Output equality matters.** Solid's memos only notify downstream on actual value change, which is how they avoid effect cascades. If $Chemistry's post-lifecycle diff fires `$update$` whenever it detects structural output change, we should be similarly rigorous about what "change" means — hence the `equivalent` function with clear rules rather than raw `!==`.
- **Dependency scope is a real thing.** Solid's "outside the tracking scope means no subscription" is a sharp rule. $Chemistry has an analogous concept: reads inside `view()` are "inside the render," reads inside `mount()` are "inside the lifecycle," reads inside an async callback after a `setTimeout` are "outside any tracked context." We should name these scopes explicitly if we ever add tracked access.
- **Components-run-once isn't for us, but the observation behind it is.** React re-executes function components to invalidate. Solid refuses to, and puts the reactivity at the leaves. $Chemistry re-executes via React but adds wrappers and lifecycle phases — we're inheriting React's coarseness while adding complexity on top. This is a place where we should be careful not to invent a worst-of-both-worlds.
