---
kind: stub
title: $Molecule (entity)
status: planned
---

# `$Molecule`

The reactivity machinery a particle allocates. Every `$Particle` instance carries a `$Molecule` that holds its bonds and connects to the broader reaction graph.

**To be written.** This page should cover:

- What a `$Molecule` owns: a map of bonds keyed by name, a link to the catalyst graph.
- Why every particle (even particularized ones) allocates one — see the [allocation caveat][cav-alloc].
- The relationship to `$derivatives$` and the per-instance reactivity decision.

<!-- citations -->
[cav-alloc]: ../../caveats/particle-allocates-reactivity-machinery.md
