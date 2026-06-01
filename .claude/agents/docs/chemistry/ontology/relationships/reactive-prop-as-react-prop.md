---
kind: stub
title: Reactive prop as React prop
status: planned
---

# Reactive prop as React prop

The bridge between the framework's reactive surface and the React render tree it ultimately produces.

When a chemical reads `this.$count` inside its render path, the read is recorded in the active scope. When `this.$count` is written, the scope wakes — and the React component at the boundary re-renders with the new value bound through.

**To be written.** This page should cover:

- The handoff: how a `$x` field becomes a value React sees.
- The render-time scope: when reads register, when they don't.
- The unidirectional convention — chemicals own state; React reads it.

For now, see [reactive bonds][feat-reactive-bonds] and [`$Particle` book — component][book-particle-component].

<!-- citations -->
[feat-reactive-bonds]: ../../features/reactive-bonds.md
[book-particle-component]: ../../books/particle/component.md
