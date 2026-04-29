---
kind: catalogue-section
section: II.5
title: The particular constructor argument
status: stub
---

# § II.5 The `particular` constructor argument

## Definition

A `$Particle` constructor invoked with one argument enters **particularization** mode. The constructor lifts particle methods onto the argument's prototype chain, stamps the marker that `isParticle` reads, and returns the original argument. The result has particle behavior but is not `instanceof $Particle`. The original object is otherwise untouched.

## Rules

- *(TBD — invoking with one argument triggers particularization.)*
- *(TBD — methods are lifted; the argument's prototype chain is extended, not replaced.)*
- *(TBD — the marker is stamped on the argument so `isParticle` returns true.)*
- *(TBD — particularizing an existing particle is a no-op.)*

## Cases

- `new $Particle(error)` produces a carrier; `instanceof Error` preserved.
- Particularizing the same object twice returns the same carrier.

## See also

- [§ VII.1 The pattern][s-VII-1] — full treatment of particularization.
- [§ II.1 The class][s-II-1] — the constructor where this branch lives.
- [§ XIII.4 Particularization preserves prototype][s-XIII-4] — the historical caveat.

<!-- citations -->
[s-VII-1]: ../VII-particularization/01-the-pattern.md
[s-II-1]: ./01-the-class.md
[s-XIII-4]: ../XIII-caveats/04-particularization-preserves-prototype.md
