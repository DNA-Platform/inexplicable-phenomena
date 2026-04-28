---
kind: caveat
title: Every particle allocates a $Molecule and a $Reaction at construction
status: stable
related:
  - particle
  - chemical
  - particularization
---

# Every particle allocates a `$Molecule` and a `$Reaction` at construction

As of sprint-27 (Crystallization), the `$Particle` constructor allocates two objects unconditionally for every instance: a `$Molecule` (the bond graph) and a `$Reaction` (the re-render entry point). This holds even for particles that never form bonds, never re-render, and never participate in JSX — including particularized carriers such as `$Error` wrappers around plain `Error` objects.

This is not a bug. It is a deliberate trade-off documented here so callers don't trip over the cost in profiles or the surprise when they observe a molecule attached to a particle that "shouldn't have one."

## What changed

Before sprint-27, the molecule, reaction, and `Component` cache lived on `$Chemical`. A `$Particle` subclass that never extended into chemistry (e.g., a wrapper around an external object via [particularization][]) carried only identity slots and the phase queue. It had no reactive machinery; it allocated nothing beyond its own fields and what `$Particle`'s constructor stamped.

The sprint-27 migration moved `$Molecule`, `$Reaction`, the `Component` getter, and the template-tracking slots down to `$Particle`. The construction sequence (see [lifecycle][]) now executes:

```typescript
this[$molecule$] = new $Molecule(this);
this[$reaction$] = new $Reaction(this);
```

unconditionally, on every naturally-instantiated particle.

## What this costs

Two object allocations per particle. The molecule's bond graph is empty until `reactivate()` is called (which only happens on the lift / chemical-bond path), so the marginal cost is small — a couple of object headers and the molecule's empty backing maps. The reaction registers itself in the cid-keyed reaction registry, which contributes one entry per particle.

For a typical chemistry workload (a few hundred chemical instances), the cost is invisible. For workloads that construct many short-lived particularized carriers — e.g., wrapping every error in a logging pipeline as `new $Error(err)` — the allocation is real and observable.

## Why we accept it

Two reasons:

1. **Uniformity at the framework level.** Every particle is now a fully-reactive carrier. `$lift` no longer has to check whether its parent has a molecule before reactivating; `$Chemical` no longer has a special "I'm a chemical, I have a molecule, you don't" branch. The framework code that reads from `[$molecule$]` and `[$reaction$]` can assume both are present.
2. **The `Component` getter migration.** Moving `Component` to `$Particle` means a pure-particle subclass can be mounted without going through `$Chemical`. That mount path needs a reaction (for re-renders) and a molecule (for fan-out to derivatives). Once those are required for *any* mounted particle, requiring them for *every* particle is a small step and removes a category of "is this mountable?" branching.

The trade-off was judged worth it: small constant overhead per particle, in exchange for one consistent mental model and shorter framework code paths.

## What to watch for

- **Particularized carriers inherit the cost.** `new $Error(err)`, `new $Result(value)`, etc., each pay the two-allocation cost. If you're building such carriers in a hot path, profile.
- **Reaction registry growth.** Every particle's reaction registers in the cid-keyed registry. If carriers are short-lived, the registry grows; the reaction's destroy path removes the entry, but only fires when the particle's lift-Component unmounts. A particle that's allocated and immediately discarded without ever being mounted does not currently auto-unregister. (Filed as a potential follow-up; not yet a known-leak source.)
- **Memory profile shift.** A pre-sprint-27 heap snapshot shows fewer molecule/reaction instances than a sprint-27+ snapshot of the same workload. Expected; not a regression.

## Related

- [Construction sequence][lifecycle] — the order in which slots get allocated.
- [Identity — reactive-carrier slots][identity] — what each slot is for.
- [Particularization][particularization] — the case where the cost is most visible (carriers that may never use the molecule).

## History

- 2026-04-28 sprint-27 — `$Molecule`, `$Reaction`, `Component`, and template slots migrated from `$Chemical` to `$Particle`. Construction sequence updated to allocate the reactive machinery unconditionally. Caveat filed at the same time so the trade-off is visible to callers.

<!-- citations -->
[lifecycle]: ../books/particle/lifecycle.md
[identity]: ../books/particle/identity.md
[particularization]: ../books/particle/particularization.md
[particle]: ../features/particle.md
[chemical]: ../features/chemical.md
