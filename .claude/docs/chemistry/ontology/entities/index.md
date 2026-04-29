---
kind: index
title: Entities
status: evolving
---

# Entities

The things that *are* in `$Chemistry`. Each entity is something you can hold, name, or `instanceof`-check. Subclasses of `$Particle`, runtime singletons, callable surfaces, the `$Atom` template object.

| Entity | One-line role |
|---|---|
| [`$Particle`][particle] | Leaf with reactivity, identity, lifecycle, view. Framework base class. |
| [`$Chemical`][chemical] | Particle that contains other particles via JSX children. |
| [`$Atom`][atom] | Singleton template — `new $Atom()` always returns the class template. |
| [`$Bond`][bond] | The reactive-prop binding object. The thing a `$x` field actually is. |
| [`$Reaction`][reaction] | The recompute scope. Tracks reads, queues writes, fires re-renders. |
| [`$Molecule`][molecule] | The reactivity machinery a particle allocates. |
| [`$Synthesis`][synthesis] | Bond-ctor orchestration. Per-mount; processes JSX children. |
| [`$()` callable][dollar-callable] | The dispatch surface — class form, instance form, JSX form, string form. |

Each page is an **ontological pin** — it names the entity and points at the substantive page in [features][feat-index] or in the [particle book][book-particle]. The ontology spine itself is short on prose; the substantive treatment lives where it always did.

<!-- citations -->
[particle]: ./particle.md
[chemical]: ./chemical.md
[atom]: ./atom.md
[bond]: ./bond.md
[reaction]: ./reaction.md
[molecule]: ./molecule.md
[synthesis]: ./synthesis.md
[dollar-callable]: ./dollar-callable.md
[feat-index]: ../../features/index.md
[book-particle]: ../../books/particle/index.md
