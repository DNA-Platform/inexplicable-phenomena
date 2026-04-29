---
kind: catalogue-section
section: II.6
title: isParticle(x)
status: stub
---

# § II.6 `isParticle(x)`

## Definition

`isParticle(x)` returns `true` when `x` carries the particle marker. The check works for both prototype-chain particles (regular `new $Subclass()`) and own-property particles (particularization carriers, § II.5). The function is the framework's universal "is this thing a particle?" predicate.

## Rules

- *(TBD — checks marker via prototype-chain or own-property.)*
- *(TBD — does not require `instanceof $Particle`.)*

## Cases

- A regular subclass instance: `isParticle(new $Counter()) === true`.
- A particularized error: `isParticle(carrier) === true`.

## See also

- [§ II.5 The `particular` argument][s-II-5] — what stamps the marker.
- [§ VII.1 The pattern][s-VII-1] — particularization mechanics.

<!-- citations -->
[s-II-5]: ./05-particular-argument.md
[s-VII-1]: ../VII-particularization/01-the-pattern.md
