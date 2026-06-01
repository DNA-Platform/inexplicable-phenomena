---
kind: stub
title: State
status: planned
---

# State

What a particle remembers between events. In `$Chemistry`, state lives in `$x` reactive bonds; reads and writes are scope-tracked.

**To be written.** Distinguish *intrinsic state* (the `$x` fields the chemical owns) from *extrinsic context* (props passed in from a parent), and distinguish reactive state from non-reactive (see [`@inert` / `@reactive`][feat-reactive]).

For now, see [reactive bonds (feature)][feat-reactive] and [reactivity contract][reactivity-contract].

<!-- citations -->
[feat-reactive]: ../../features/reactive-bonds.md
[reactivity-contract]: ../../reactivity-contract.md
