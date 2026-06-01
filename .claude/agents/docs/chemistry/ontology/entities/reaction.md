---
kind: stub
title: $Reaction (entity)
status: planned
---

# `$Reaction`

The recompute scope. A reaction tracks every reactive read inside its execution and queues a follow-up when any of those reads' bonds are written.

**To be written.** This page should cover:

- The scope-tracking lifecycle: enter, execute, finalize.
- How reads register dependencies; how writes enqueue dirty reactions.
- The fan-out path (see [derivatives and fan-out][concept-derivatives]).
- The cross-chemical handler propagation rule (see [caveat][cav-cross-chemical]).

For now, see [derivatives and fan-out (concept)][concept-derivatives] and [reactivity contract][reactivity-contract].

<!-- citations -->
[concept-derivatives]: ../../concepts/derivatives-and-fan-out.md
[cav-cross-chemical]: ../../caveats/cross-chemical-handler-fanout.md
[reactivity-contract]: ../../reactivity-contract.md
