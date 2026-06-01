---
kind: catalogue-section
section: VII.1
title: The pattern
status: stub
---

# § VII.1 The pattern

## Definition

Particularization is the pattern by which any non-particle object becomes a particle. The `$Particle` constructor invoked with one argument lifts the particle layer's methods onto the argument's prototype chain, stamps the marker that `isParticle` (§ II.6) reads, and reparents — leaving the original prototype chain in place. The result is the same object reference, now with particle behavior; `instanceof OriginalType` continues to hold.

## Rules

- *(TBD — `new $Particle(particular)` is the entry point.)*
- *(TBD — the particle layer is inserted into the prototype chain.)*
- *(TBD — the original prototype chain is preserved.)*
- *(TBD — the marker is stamped.)*

## Cases

- `new $Error(realErr)` carrier; `instanceof Error === true`.
- Original `.message` reachable via the carrier.

## See also

- [§ II.5 The `particular` argument][s-II-5] — the constructor branch.
- [§ VII.2 `instanceof` preservation][s-VII-2] — the invariant.
- [§ VII.4 Reactivity machinery on carriers][s-VII-4] — the cost.
- [chemistry feature — particularization][feat-particularization] — the existing long-form treatment.

<!-- citations -->
[s-II-5]: ../II-primitives/05-particular-argument.md
[s-VII-2]: ./02-instanceof-preservation.md
[s-VII-4]: ./04-reactivity-on-carriers.md
[feat-particularization]: ../../features/particularization.md
