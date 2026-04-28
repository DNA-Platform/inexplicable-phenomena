---
kind: concept
title: Lifecycle — construction, phases, next(), resolve
status: stable
---

# Lifecycle

A particle moves through a fixed sequence of named phases. User code waits on a phase by awaiting `next(phase)`. The framework advances phases by calling `[$resolve$](phase)`, which both flips the current phase and drains a queue of resolvers blocked on that phase. There is also a side-channel — the `'construction'` event — that surfaces async bond-ctor work without joining the linear phase order.

Before any of that, however, the particle has to *exist*. The constructor body that runs the moment a subclass calls `super()` allocates everything the rest of the lifecycle assumes is there: identity slots, the phase queue, the molecule, the reaction, and the template registration. This chapter starts there.

## Construction sequence

The [`$Particle` constructor][particle-ctor] runs once per naturally-instantiated particle. Its job is to put every slot the rest of the framework expects in place — printable identity, reactive carriers, template tracking — before the constructor returns. As of sprint-27 (Crystallization), the constructor allocates the reactive machinery (`$Molecule`, `$Reaction`) and registers the class template. These two responsibilities used to live one layer up in `$Chemical`; they are now `$Particle`-level concerns and therefore run for *every* particle, including particularized carriers and particle-only subclasses that may never participate in synthesis.

The body executes in this order:

1. **Particularization fast-path.** If the constructor was called with an already-particle argument (`new $Foo(existingParticle)`), JS lets the constructor return that object in place of `this`. The constructor short-circuits — no new identity, no new molecule, no new reaction. (See [particularization][].)
2. **Identity stamping.** Allocate `[$cid$]` from the static counter, set `[$type$]` to `this.constructor`, build `[$symbol$]` from cid + type. (See [identity][].)
3. **Phase queue allocation.** `[$phases$]` is set to a fresh `Map` keyed by every phase in `$phaseOrder`, each value an empty resolver array. The queue must exist before `next(phase)` can be called; the constructor is the only place that creates it on a naturally-instantiated particle. (Derivatives produced by `$lift` create their own.)
4. **Reactive-machinery allocation.** `this[$molecule$] = new $Molecule(this)` and `this[$reaction$] = new $Reaction(this)`. Every particle gets both, unconditionally. The molecule starts in an unreactivated state — its accessors will be installed lazily on first `reactivate()` (typically driven from `$lift` or `$Chemical`'s bond path). The reaction registers itself in the cid-keyed reaction registry so `$Reaction.find(cid)` can recover the live particle from a serialized symbol. See [identity][] for the slot definitions and [caveat: particle allocates reactivity machinery][caveat-allocates] for the cost implication.
5. **Template registration.** If the particle's class has no template registered yet — or has one that isn't actually an instance *of this exact class* (the subclass case where an ancestor's template was registered first) — register `this` as `cls[$$template$$]`. Then set `this[$template$] = this`. The first naturally-constructed instance of every class becomes the canonical template for that class. (See [identity][] § Template identity.)
6. **Particularization slow-path.** If a non-particle argument was passed, walk its prototype chain copying inherited methods to `this` as own properties, then sever this particle's prototype chain to point at the foreign object. The `$particleMarker$` is stamped as an own property because the prototype-chain marker is no longer reachable. (See [particularization][].)

After the constructor returns, the particle has every slot any downstream consumer assumes is there. `$Chemical` extends this sequence by allocating `$Synthesis` and wiring `$$parent$$` and `$catalyst$` to `this` (the chemical starts as its own catalyst until `$parent` is assigned).

A subtle invariant: the molecule and reaction are allocated *unconditionally*, even for particles that will never form bonds (e.g., a `$Error` particularized carrier that is just a wrapped Error object). The cost is real but small (two object allocations per particle); the simplification it buys at the framework level — every particle is uniformly reactive — was judged worth it. The caveat page documents this trade-off.

## The phase order

Phases are declared at the top of [`particle.ts`][phase-order] as an exported array:

```typescript
export const $phaseOrder: $Phase[] = ['setup', 'mount', 'render', 'layout', 'effect', 'unmount'];
```

The order matters: it is what `next(phase)` uses to decide whether a request resolves immediately (the requested phase is already in the past), waits (it is in the future), or rejects (the particle has unmounted). The phases map onto React's lifecycle:

- **`setup`** — the initial phase. Set in the [class field declaration][phase-field], so it is the value before the constructor body even runs.
- **`mount`** — first `useEffect` callback fires.
- **`render`** — currently between `mount` and `layout` in the order. Reserved for an explicit render-resolve point; the implementation in [lift][] does not yet resolve `render` separately.
- **`layout`** — `useLayoutEffect` fires.
- **`effect`** — second `useEffect` (deferred-effect) fires.
- **`unmount`** — cleanup runs.

## `next(phase)` — three cases, plus one

The [`next(phase)`][particle-next] method returns a promise the user can await. It distinguishes four cases:

1. **The `'construction'` side-channel.** This is not a phase in `$phaseOrder`; it is a dedicated event that resolves when async bond-ctor work has settled. If `[$construction$]` is set (the bond-ctor orchestrator stores its bundled promise here), `next('construction')` returns it. If not, the request resolves immediately. This is how a user awaits the chemical's *constructor work*, distinct from awaiting its *mount*.
2. **The particle has unmounted.** If the current phase is `'unmount'` and the requested phase is anything else, the promise rejects. The framework guarantees no further forward-progress on an unmounted particle.
3. **The requested phase has already passed.** If `current >= target` in the phase order, the promise resolves immediately — `await` returns synchronously next tick.
4. **The requested phase is in the future.** A new promise is created, its resolver is pushed onto `[$phases$].get(phase)`, and the promise is returned. It will resolve when the framework reaches that phase.

`unmount` is special-cased: even if the current phase is past `unmount` in the array order (it cannot be, since `unmount` is last), the request always queues — `unmount` is the only phase that can be reached "from anywhere."

## `$resolve` — flipping the phase, draining the queue, propagating

The framework advances a particle through its lifecycle by calling [`[$resolve$](phase)`][particle-resolve]. Three things happen:

1. **The phase flips.** `this[$phase$] = phase`. After this assignment, `next(phase)` for that phase returns immediately.
2. **The queue drains.** Every resolver pushed by `next(phase)` calls fires, in insertion order. The queue is drained with `shift()` so re-entrant `next(phase)` calls inside resolver code path correctly into either "already resolved" or "the next queued slot."
3. **Propagation up the prototype chain.** If the parent (via `Object.getPrototypeOf(this)`) has its own `$phases$` map (i.e., it is itself a particle, not just `Object.prototype`), `$resolve$` is called on the parent too.

The third behavior is what makes `next('mount')` on a parent reference work in the multi-site case. A user who holds the original parent and writes `await parent.next('mount')` expects that to resolve when their JSX renders — which means when *any* derivative of the parent mounts. The propagation walks the chain and resolves the parent's phase queue when the first derivative crosses the boundary. (The [lift][] chapter covers how derivatives are created with `Object.create(parent)`, which puts the parent in the derivative's prototype chain.)

The check `Object.prototype.hasOwnProperty.call(proto, $phases$)` matters: it ensures propagation only continues up *particle* prototype-chain links, not all the way to `Object.prototype`. A particularized carrier (whose prototype is a foreign object — see [particularization][]) terminates propagation at the carrier itself.

## The `'construction'` side-channel

`'construction'` is not in `$phaseOrder`. It exists because async bond-ctor work doesn't fit on the linear phase line: a bond-ctor can resolve before *or* after `mount`, depending on whether it awaits anything async, and depending on its context-parent's own construction. The framework bundles all of that into one promise stored on `[$construction$]`, and `next('construction')` returns it.

If no bond ctor ran, or it was sync, `[$construction$]` is unset and `next('construction')` returns `Promise.resolve()`. The contract is: "by the time this resolves, all of this particle's constructor work — including its context-parent chain's constructor work — is settled."

The bundling logic lives in `$Chemical`'s synthesis layer; from `$Particle`'s perspective, `[$construction$]` is just a stored promise to hand back. (See the `chemical/` book for how the bundle is built.)

## Why this design

The lifecycle-as-awaitable pattern lets initialization read top-to-bottom in a constructor or bond ctor:

```typescript
class $Chart extends $Chemical {
    async $Chart() {
        const data = await fetch('/data');
        await this.next('mount');
        renderD3IntoDOM(this.ref, data);
    }
}
```

Compared to React's `useEffect`-based initialization, the user writes the *intent* (do A, then wait for mount, then do B) rather than splitting it across hooks and dependency arrays. The promise queue, the phase order, and the prototype-chain propagation are what make that read-top-to-bottom pattern actually work when the same instance is mounted at multiple sites.

## See also

- [feature: lifecycle phases][feat-lifecycle] — the surface-level reference.
- [identity][] — what stays constant while phases churn.
- [lift][] — where the resolves are *called* (the React hooks inside `$lift`'s Component fire `[$resolve$]` on each phase boundary).

<!-- citations -->
[identity]: ./identity.md
[lift]: ./lift.md
[particularization]: ./particularization.md
[feat-lifecycle]: ../../features/lifecycle-phases.md
[caveat-allocates]: ../../caveats/particle-allocates-reactivity-machinery.md

[phase-order]: ../../../../../library/chemistry/src/abstraction/particle.ts#L16
[phase-field]: ../../../../../library/chemistry/src/abstraction/particle.ts#L30
[particle-ctor]: ../../../../../library/chemistry/src/abstraction/particle.ts#L59
[particle-next]: ../../../../../library/chemistry/src/abstraction/particle.ts#L110
[particle-resolve]: ../../../../../library/chemistry/src/abstraction/particle.ts#L128
[molecule-alloc]: ../../../../../library/chemistry/src/abstraction/particle.ts#L73
[reaction-alloc]: ../../../../../library/chemistry/src/abstraction/particle.ts#L74
[template-register]: ../../../../../library/chemistry/src/abstraction/particle.ts#L79
