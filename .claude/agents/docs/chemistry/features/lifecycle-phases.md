---
kind: feature
title: Lifecycle phases — next(phase) and async ctors
status: stable
related:
  - particle
  - chemical
---

# Lifecycle phases — `next(phase)` and async ctors

Each chemical moves through named phases (`setup` → `mount` → `ready`). User code can `await this.next('mount')` to suspend until the framework reaches that phase. Constructors and bond ctors can themselves be async.

## What it is

The lifecycle is a sequence of named phases the framework drives, ordered by [`$phaseOrder`][phase-order] (`setup` → `mount` → `render` → `layout` → `effect` → `unmount`). Each chemical instance has a `$phase$` (current phase) and a `$phases$` map (phase-name → resolvers that fire when reached). User code reads [`await this.next('mount')`][particle-next] to wait for a specific phase before proceeding.

This is the "lifecycle as awaitable" pattern. Compared to React's `useEffect` callbacks, this lets initialization code read top-to-bottom in a constructor or bond ctor:

```typescript
class $Chart extends $Chemical {
    async $Chart() {
        const data = await fetch('/data');
        await this.next('mount');         // wait for DOM to exist
        renderD3IntoDOM(this.ref, data);
    }
    view() { return <div ref={r => this.ref = r} />; }
}
```

## How it works

The phase order is stable (currently `setup` → `mount` → `ready`). Each phase has a corresponding promise on `$phases$`; the framework resolves them in order as React's lifecycle hooks fire (`setup` immediately on instance creation; `mount` after the first effect; `ready` after the first render commits). [`$resolve$`][particle-resolve] flips the current phase, drains the resolver queue, and propagates up the prototype chain so derivatives also resolve their parent's lifecycle promises.

[`this.next(phaseName)`][particle-next] returns the matching promise. Awaiting it suspends until the framework advances. If the phase has already passed, the promise is already resolved and `await` returns immediately.

Async constructors and async bond ctors are first-class. The orchestrator awaits the bond ctor's promise before considering the chemical "formed." During the wait, the chemical is in `setup` phase; the view is not yet rendered. Once the ctor resolves, the framework advances to `mount`.

This was the API decision recorded in user memory: **`next()`, not `await()`. No `$` prefix. String enum phases.**

## Related

- [`$Particle`][particle] — phases live on every particle.
- [`$Chemical`][chemical] — bond ctors can be async.

## See also

- Source: [particle.ts][particle-src]
- Specific: [`$phaseOrder`][phase-order] · [`next(phase)`][particle-next] · [`$resolve$`][particle-resolve]

<!-- citations -->
[particle]: ./particle.md
[chemical]: ./chemical.md
[particle-src]: ../../../../library/chemistry/src/abstraction/particle.ts
[phase-order]: ../../../../library/chemistry/src/abstraction/particle.ts#L14
[particle-next]: ../../../../library/chemistry/src/abstraction/particle.ts#L84
[particle-resolve]: ../../../../library/chemistry/src/abstraction/particle.ts#L102
