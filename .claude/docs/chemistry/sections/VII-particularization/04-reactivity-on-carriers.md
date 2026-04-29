---
kind: catalogue-section
section: VII.4
title: Reactivity machinery on particularized carriers
status: stub
---

# § VII.4 Reactivity machinery on particularized carriers

## Definition

Sprint-27's reframe widened `$Particle` to allocate `$Molecule` and `$Reaction` for every instance, including particularization carriers. A particularized error therefore carries reactivity machinery even though it will likely never use it. The cost is constant per carrier; the benefit is uniform behavior between regular particles and carriers.

## Rules

- *(TBD — every particle allocates reactivity machinery.)*
- *(TBD — particularized carriers inherit the allocation.)*

## Cases

- A particularized error has `$molecule$` and `$reaction$` slots.

## See also

- [§ XIII.3 Particle allocates reactivity machinery][s-XIII-3] — the caveat page.
- [§ VII.1 The pattern][s-VII-1] — particularization mechanics.

<!-- citations -->
[s-XIII-3]: ../XIII-caveats/03-particle-allocates-reactivity.md
[s-VII-1]: ./01-the-pattern.md
