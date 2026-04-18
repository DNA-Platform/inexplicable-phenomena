---
title: "Vue: Proxy reactivity"
---

# Vue: Proxy reactivity

Vue 3 takes the MobX idea — reads register, writes publish — and bakes it into the framework's primitives. Unlike MobX, where you opt observables into tracking, Vue 3 makes the primitives reactive by default: `reactive()` wraps an object, `ref()` wraps a value, and everything downstream of those participates in the reactive graph.

## The signal: track/trigger through Proxies

Every reactive object is an ES6 `Proxy`. Its `get` trap calls `track(target, key)`, which registers `(target, key)` against the currently-active effect in a global `WeakMap<target, Map<key, Set<effect>>>`. Its `set` trap calls `trigger(target, key)`, which looks up the subscribers of that key and re-runs each effect.

There is no dirty-checking, no change-detection pass. A mutation directly enqueues the dependent work.

`ref(value)` is a small wrapper object with a `.value` accessor pair that does the same job for primitives (and internally calls `reactive()` on object values).

## The granularity: fine at the effect level, batched at the component

Reactivity tracking is per-effect, which means per-`watchEffect`, per-`computed`, and — crucially — per-component-render. Each component instance mounts by invoking its render function inside a reactive effect; that effect's deps are every reactive read performed during render. When any dep fires, the component's render effect is scheduled once on the next microtask tick (deduplicated).

But Vue's DOM-update work is *not* a full re-render of the template. The template compiles to a render function that emits vnodes annotated with **patch flags** — bitmasks telling the runtime exactly which parts of each element may have changed (TEXT, CLASS, STYLE, PROPS). Static subtrees are hoisted as singletons. Dynamic descendants are collected into a flat array (tree flattening via `openBlock`). On re-render, the patcher walks the flat array and applies only the flagged mutations. The render function re-runs; the DOM diff is near-O(dynamic nodes), not O(tree).

This is "Compiler-Informed Virtual DOM" — and it's a genuinely clever middle ground between React's pure-runtime diff and Solid's compile-to-direct-DOM.

## The developer contract

1. Declare state with `ref()` or `reactive()`.
2. Mutate via `.value` or property assignment. Mutations propagate through the proxy; raw object mutation bypasses tracking.
3. Derive with `computed()`.
4. Observe with `watch()` or `watchEffect()`.
5. In `<script setup>`, top-level refs auto-unwrap in templates.
6. Never replace a reactive object's reference (`state = reactive(...)` severs every existing dependent). Mutate in place; or hold a ref and replace `.value`.

## Computed and watch

`computed(fn)` is a lazy, cached effect exposed as a read-only ref. `computed({get, set})` makes it writable. Like MobX, Vue 3.4+ added short-circuit propagation — a computed whose output value didn't change doesn't re-trigger downstream effects.

`watch(source, cb)` takes a ref, reactive object, getter, or array, and fires `cb(new, old)` lazily. Options: `immediate`, `deep` (a depth number in 3.5+), `once`. `watchEffect(fn)` runs eagerly and re-runs on any tracked dep change.

## What Vue 3 can't do cleanly

- **Destructuring `reactive()` loses reactivity.** `const { count } = state` captures the current primitive. Use `toRefs(state)` or pass `state` itself and dereference later.
- **`reactive()` rejects primitives.** Use `ref()` for those.
- **`reactive(raw) !== raw`.** The proxy is a different object from the source; always use the proxy.
- **Ref auto-unwrap is scoped.** Top-level template identifiers unwrap; deep-reactive properties unwrap; `shallowReactive` properties and collection elements require `.value`.
- **Computeds over non-reactive sources never update.** A computed reading `Date.now()` or a raw module variable has no reactive dep; it'll never recompute.
- **Mutating the original (non-proxy) object bypasses tracking.** A common mistake when interop'ing with external data.

## Why this matters for $Chemistry

Vue 3's model is very close to what $Chemistry *could* be if we committed to tracked access. We'd wrap reactive properties in Proxies (or `defineProperty`-installed getters/setters), track reads against a currently-rendering chemical, invalidate on writes.

Patch flags are a separate concept from reactivity — they're a compilation strategy for making re-render work O(dynamic) rather than O(tree). $Chemistry doesn't have a template compiler, but we could approximate by caching view output and doing reconcile passes (which we already have).

Vue's failure modes are worth internalizing:

- *Never assume raw identity equals proxy identity.* If we add proxy-based reactivity, `chemical === rawChemical` will be false, which will break assumptions in the codebase. We'd have to audit every `===` check.
- *Destructuring loses reactivity* — the same trap, in the same shape, would apply to our users. Documentation has to call this out hard.

One concrete lesson: Vue 3.4's improvements to short-circuit propagation in computeds came from *real-world bugs* where intermediate recomputation fired downstream effects even when the output was unchanged. This is a trap we'd hit too if we built tracked access. Output equality is a first-class concern, not a detail.
