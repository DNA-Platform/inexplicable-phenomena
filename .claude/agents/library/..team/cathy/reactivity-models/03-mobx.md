---
title: "MobX: tracked access"
---

# MobX: tracked access

MobX is the "invisible React" of reactivity models. You keep writing normal JavaScript — mutate objects, read properties, define getters — and the framework detects exactly which data each rendering function *actually read*, and re-runs only those functions when *that* data changes. The model is precise without feeling fine-grained; the developer contract looks almost identical to OOP JavaScript.

## The signal: reads register, writes publish

MobX maintains a global "currently running derivation" pointer. Every observable field is backed by an `Atom` with two hooks: `reportObserved()` on read, `reportChanged()` on write. When a tracked function (a `Reaction` or a `ComputedValue`) executes, each property access calls `reportObserved`, which registers the atom as a dependency of the active derivation. Writes call `reportChanged`, which schedules the dependent derivations.

Dependency sets are rebuilt on every run — so if a conditional branch stops reading `this.foo`, the next reaction no longer subscribes to it. There's no "unregister" API; the graph is re-derived each time.

In MobX 5+, observable state is backed by ES6 `Proxy`: `get` traps call `reportObserved`, `set` traps call `reportChanged`. This catches dynamic property addition, new Map keys, out-of-bounds array indices — things `Object.defineProperty` can't see. Pre-5 MobX used `defineProperty` and was silently broken for dynamic shapes.

## The granularity: per-atom subscription, component-wide re-render

Tracking is **per-atom**, not per-object or per-component. A React component wrapped with `observer` internally creates a `Reaction` whose tracked function is its render. Only atoms actually read during that render subscribe — a sibling property on the same object that wasn't read won't trigger a re-render.

The re-render *itself* is a full React re-render of that component (MobX doesn't rewrite React's VDOM). But the **subscription surface is exactly the set of read atoms**, which is finer-grained than prop-drilling or selector-based systems without requiring any manual memoization.

## The developer contract

1. **Annotate state** with `makeObservable(this, {...})`, `makeAutoObservable(this)`, or `observable()`.
2. **Mutate only inside actions** (`action`-decorated methods). `configure({ enforceActions: "always" })` makes this a runtime error. Actions batch notifications until the outermost transaction ends.
3. **Wrap every component that reads observables in `observer`.** Pass object references down the tree; dereference as late as possible, ideally inside the observer that will subscribe.
4. **Dispose reactions.** `autorun` and `reaction` return a disposer function. Forgetting it leaks — atoms hold strong references to observers.

The feel: you write OOP code as normal. You pepper in `observable`, `action`, `observer`. The reactivity is almost invisible.

## Computed values: lazy, cached, short-circuiting

`computed` values are pull-based: they don't re-evaluate on upstream change, they just mark themselves `POSSIBLY_STALE`. When a consumer reads the computed, MobX walks the upstream graph checking whether any input *actually* changed — if not, the cached value is returned. If changed, re-evaluation runs, and the result is compared via `comparer.default` (identity + NaN-safe). Equal outputs short-circuit propagation — a critical optimization for chains of derivations.

Unobserved computeds don't cache (they "suspend"); `keepAlive: true` overrides this at memory-leak risk.

## What MobX can't do cleanly

- **Async boundaries break tracking.** Anything read after `await`, `setTimeout`, or `.then` is outside the reactive context. Use `runInAction` or `flow` generators to re-enter.
- **Destructuring at the wrong layer.** `const title = todo.title` captures the value, not the subscription. Pass `todo` down, not `todo.title`. MobX tracks *dereference location*, not value.
- **Class instances are opaque** unless their constructor opts in with `makeObservable`.
- **Reactions that write observables** create ordering hazards — docs explicitly say reactions "should not compute new data"; use `computed` instead.
- **Plain object destructuring** in general; the contract is "pass the reactive object, read leaves where you need them."

## Why this matters for $Chemistry

$Chemistry is OOP-first in exactly the way MobX is. `this.count = 5`; `this.items.push(x)`. These *feel* like natural mutations. MobX's tracked-access model is the closest conceptual fit to what $Chemistry wants the developer experience to be.

But $Chemistry currently doesn't implement tracked access. It doesn't register dependencies at read sites, and it doesn't intercept writes to track them. Instead, $Chemistry relies on:

- **Bonded method wrappers** — any method call triggers `$update$` after the method returns. Coarse: updates on *any* method call, whether or not the method changed anything observable.
- **Post-lifecycle view diff** — compare main-render view output to effect-phase view output. Coarse: catches any output change, including closure/allocation noise.

Neither mechanism observes state reads. Neither has MobX's precision. The question for $Chemistry is: should we add tracked access? The cost is significant — every reactive property needs a Proxy or defineProperty interceptor, and reads need to register with a current-reaction pointer. The benefit is that we'd know precisely which chemicals need re-rendering on which mutations, without relying on React's whole-subtree re-render.

An interim position: we don't add full tracked access yet, but we adopt MobX's mental model in documentation — "state is what's inside `this`, mutations via methods, pass chemicals down rather than dereferencing early" — and we revisit tracked access if performance demands it. The architecture should not preclude it.
