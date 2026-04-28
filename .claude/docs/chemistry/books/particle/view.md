---
kind: concept
title: View — view(), apply, augmentation, cache
status: stable
---

# View

A particle's `view()` method is the JSX-producing boundary. It is the closest thing chemistry has to React's `render()` function. Around the call to `view()` sits a small machinery: props are applied to the instance, render filters consulted, the output augmented with reactivity-scoped event handlers, and the result diffed against a cache.

This chapter covers what `view()` returns, how `$apply` reads props, how augmentation works, and what `$rendering$` and `$viewCache$` carry.

## `view()` — the default

The default [`view()`][view-method] returns `this.toString()` — the particle's symbol. That is rarely what a subclass wants; subclasses override `view()` to return JSX:

```typescript
class $Counter extends $Particle {
    $count = 0;
    view() {
        return <button onClick={() => this.$count++}>{this.$count}</button>;
    }
}
```

The signature is `view(): ReactNode`. The framework calls `view()` from inside the render body of `$lift`'s Component (and from `chemical.view`'s own callers); the result is what React reconciles.

## `$apply` — props onto the instance

[`[$apply$](props)`][apply-method] is the framework's mechanism for copying React props onto the particle as own properties. It runs at the start of every render in `$lift`'s Component body, before the filter chain and `view()`.

```typescript
protected [$apply$](props?: $Props) {
    if (!props) return;
    const $this = this as any;
    $this[$children$] = props.children;
    for (const prop in props) {
        if (prop === 'children' || prop === 'key' || prop === 'ref') continue;
        $this['$' + prop] = props[prop];
    }
}
```

Three behaviors:

- **`children` is stored under `[$children$]`** — the symbol-keyed slot, not as `$children`. Children are not a reactive prop; they are structural input to the render.
- **`key` and `ref` are skipped.** Both are React-internal; copying them would shadow the framework's own use.
- **Every other prop is `$`-prefixed and assigned.** This is what makes `<Counter count={3} />` deliver `3` to `this.$count` — the JSX prop becomes a `$`-prefixed write through the bond setter. (If `$count` is a reactive bond, this fires reactivity; if not, it lands as a plain own property.)

`$apply` is `protected` — subclasses can override it to customize prop translation, but ordinary code does not call it. The render body calls it; nothing else should.

## Augmentation — wrapping handlers in scope

After `view()` returns, the render body in `$lift` calls `augment(view, react)`. Augmentation walks the JSX tree and wraps every event handler with a reactivity scope, so any bond writes inside the handler are batched and finalized atomically. The `react` callback passed to `augment` is the closure that schedules a re-render of this derivative — it is what handlers ultimately fire when a bond write triggers reaction.

The implementation lives in [`augment.ts`][augment-src]; this chapter only notes the contract: in, a JSX tree from `view()`; out, a JSX tree where every event handler is `withScope(originalHandler, react)`. The reactivity-scope mechanism is documented in the [reactivity contract][reactivity-contract].

## `$rendering$` — the re-entrancy flag

[`[$rendering$]`][rendering-flag] is a boolean that the render body sets to `true` for the duration of the `$apply` → `applyRenderFilters` → `view` → `augment` sequence, and back to `false` after. It exists because the bond setter consults it to suppress re-entrant `react()` calls during view computation.

The flow looks like this:

```
p[$rendering$] = true
p[$apply$](props)              // bond writes during apply: noop react
applyRenderFilters(p)          // filter may read state but shouldn't write
output = augment(p.view(), react)  // view may read state, computes JSX
p[$viewCache$] = output
p[$rendering$] = false
```

If a render somehow triggered a write that fired `react()`, that would re-enter the render body — a render loop. The rendering flag short-circuits the recursion: a write during render *lands* in the backing but does not call `react()`. (The bond layer has the actual flag-check logic; this chapter just notes that `$Particle` carries the flag.)

## `$viewCache$` — last-rendered output

[`[$viewCache$]`][view-cache] stores the most recent `view()` output. It is read by the deferred-effect `useEffect` in `$lift`, which re-runs `view()` post-render and diffs against the cache: if the second view differs from the first, force a re-render. This is the mechanism that catches state changes that didn't go through bond setters (deferred async work resolving, for example).

The diff lives in [`reconcile.ts`][reconcile-src]; the cache mechanism only stores the previous output. The cache is also consulted by `chemical.view` semantics for identity-preserving mounts (this chapter does not cover those — see the chemical book).

## The render flow, end to end

Putting it together, the per-render sequence is:

1. **Apply props.** `$apply(props)` writes `$`-prefixed props onto the instance.
2. **Consult filters.** `applyRenderFilters(p)` runs the filter chain. If a filter returns non-undefined, that is the output; skip the rest.
3. **Compute view.** `p[$rendering$] = true`; `view()` produces JSX.
4. **Augment.** `augment(jsx, react)` wraps event handlers.
5. **Cache.** `p[$viewCache$] = augmented`.
6. **Done.** `p[$rendering$] = false`; return.

After React commits the render, the deferred-effect hook re-runs the same `view()` + augment cycle and diffs against the cache; if changed, it schedules another render. This double-render-with-diff catches state changes from async work that resolved between the first render and the commit.

## See also

- [lift][] — where the render body lives, where these methods are called.
- [render filters][] — the chain consulted between `$apply` and `view`.
- [reactivity contract][] — what the augmented handlers do.
- [identity][] — what `toString()` returns when `view()` defaults to it.

<!-- citations -->
[lift]: ./lift.md
[render filters]: ./render-filters.md
[identity]: ./identity.md
[reactivity-contract]: ../../reactivity-contract.md

[view-method]: ../../../../../library/chemistry/src/abstraction/particle.ts#L80
[apply-method]: ../../../../../library/chemistry/src/abstraction/particle.ts#L121
[rendering-flag]: ../../../../../library/chemistry/src/abstraction/particle.ts#L32
[view-cache]: ../../../../../library/chemistry/src/abstraction/particle.ts#L31
[augment-src]: ../../../../../library/chemistry/src/implementation/augment.ts
[reconcile-src]: ../../../../../library/chemistry/src/implementation/reconcile.ts
