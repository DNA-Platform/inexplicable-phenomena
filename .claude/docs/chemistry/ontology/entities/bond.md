---
kind: stub
title: $Bond (entity)
status: planned
---

# `$Bond`

The reactive-prop binding object. When you write `$count = 0` in a chemical, the framework allocates a `$Bond` to back that field — its getter records reads in the active scope, its setter fires reactions.

**To be written.** This page should cover:

- What a `$Bond` carries: name, owner, current value, scope-tracking machinery.
- How it's allocated (lazily, on first read or write).
- Its relationship to [`$Molecule`][ent-molecule] (the chemical's bond bag) and [`$Reaction`][ent-reaction] (the active scope).

For now, see [reactive bonds (feature)][feat-reactive-bonds].

<!-- citations -->
[ent-molecule]: ./molecule.md
[ent-reaction]: ./reaction.md
[feat-reactive-bonds]: ../../features/reactive-bonds.md
