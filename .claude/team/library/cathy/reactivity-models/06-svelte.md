---
title: "Svelte: compile-time invalidation"
---

# Svelte: compile-time invalidation

Svelte is a compiler. The runtime is tiny. The reactivity model is baked into the generated JavaScript itself — your source gets rewritten, and the rewrite is where reactivity happens. There are two distinct eras — pre-5 and post-5 — and the shift between them is the most instructive part of Svelte's history for framework designers.

## Svelte 4: assignment IS the signal

In Svelte 4, a top-level `let` inside `<script>` is implicitly reactive. The compiler assigns each such variable a bitmask bit. Every `=`, `+=`, `++`, or destructuring write the compiler can statically see gets rewritten to also call `$$invalidate(bit, newValue)`.

The component has a single dirty mask. At the end of a microtask, the component re-runs its update fragment, which reads the mask and updates only the DOM bindings whose dependency bits are set.

`$: doubled = count * 2` is a reactive statement. The compiler topologically sorts `$:` blocks by their read/write sets and runs them during the update phase, before the DOM pass. Dependencies are determined *syntactically* — whichever identifiers are read but not written inside the statement.

Granularity: **component-level for scheduling, binding-level for DOM writes.** One assignment dirties the component; the template surgically updates only the text/attribute bindings that read the dirty variable.

**Developer contract (Svelte 4):**
1. Reactivity requires an assignment the compiler can see. `array.push(x)` does nothing; you must write `array = [...array, x]` or redundantly `array = array`.
2. Cross-component reactive state requires `svelte/store` and the `$store` auto-subscription sigil — a parallel system.
3. Indirect dependencies fail. `$: doubled = double()` where `double()` reads `count` internally won't re-run on count changes.

## Svelte 5: runes

Svelte 5 replaces the implicit model with **runes** — `$`-prefixed compiler keywords that look like function calls but are syntax.

```js
let count = $state(0);
let doubled = $derived(count * 2);
$effect(() => { console.log(count); });
```

`$state(0)` declares a reactive cell. The compiler rewrites it into a signal-backed getter/setter — reads subscribe, writes publish.

`$derived(expr)` is a memoized computation whose dependencies are gathered at *runtime* by tracking which signals the expression reads.

`$effect(fn)` is a subscriber that re-runs in a microtask after DOM flush, with optional teardown via return.

The crucial shift: reactivity is now **runtime fine-grained, not compile-time component-wide.** There's no per-component bitmask; each `$state` cell is its own signal, each `$derived` a lazy node in a push-pull graph.

`$state` proxies objects and arrays deeply, so `todos.push(x)` and `user.name = 'x'` now trigger invalidation without the `x = x` workaround. Runes also work in `.svelte.js` / `.svelte.ts` modules — collapsing the stores/components split.

## Why Svelte shifted

Svelte 4's model worked beautifully for small components but scaled badly:

- The `array = array` workaround was a constant papercut.
- Cross-file reactivity required a whole parallel API (`svelte/store`).
- Indirect dependencies couldn't be tracked, forcing manual state duplication.
- The bitmask had a 32-bit limit, which mattered for large components.

Svelte 5 adopted the same signals-based runtime that Solid pioneered — while keeping the compile-time template transformation. The result is fine-grained runtime reactivity with compile-time DOM-update code.

## What Svelte still can't do cleanly

- **Effect cascades.** Writing state inside `$effect` can ping-pong. (Same hazard as Vue's `watchEffect`.)
- **Identity invariants.** `$state`-wrapped objects are proxies; `state === rawObject` is false. Third-party libraries that rely on identity break.
- **SSR skips `$effect`.** Browser-only setup must live there deliberately.
- **Reads inside async continuations are untracked.** Only synchronous reads during effect evaluation register.

## Why this matters for $Chemistry

Svelte's trajectory is the most instructive pattern here: **implicit "assignments are reactive" sounds elegant, scales poorly, and eventually gets replaced with explicit runes.**

$Chemistry starts from OOP — `this.count = 5` is the mutation syntax. That's the same starting point as Svelte 4. If we follow Svelte's path, we'll eventually hit the same wall: the compiler can see `this.count = 5` but can't see `this.items.push(x)`, and users will either need workarounds or we'll need Proxy-based deep reactivity (Svelte 5's choice).

The lesson: if we add tracked access, we should probably add it *deeply* via Proxies — catching both `this.foo = x` and `this.items.push(x)` — rather than shallowly via simple getter/setter rewrites. The shallow approach has a track record of being abandoned.

The other lesson: **cross-component/cross-file reactivity is a separate design problem from intra-component reactivity.** Svelte 4 bolted it on with stores and regretted it. If $Chemistry grows cross-chemical reactive derivations, we should design them as first-class from the start, not as a parallel system.

Finally: Svelte 5's *choice* to converge on the signal model is a meaningful data point. Two independent framework lineages (Solid from scratch, Svelte from a different starting point) arrived at the same answer. That's not conclusive, but it's strong evidence that signals are a durable primitive for reactivity.
