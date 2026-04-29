---
kind: stub
title: Chemical as React component
status: planned
---

# Chemical as React component

How a `$Chemical` instance becomes something React can mount.

The `Component` getter on every particle returns a React component that, when rendered, re-enters the framework. The `$lift` machinery handles per-mount derivation so the same instance can appear in two places with independent state.

**To be written.** This page should cover:

- The `Component` getter: what it returns, where it's memoized.
- `$lift`: the `Object.create()` derivation per mount.
- The boundary contract: what flows from React to chemistry, what flows back.

For now, see [`$Particle` book — component][book-particle-component] and [`$Particle` book — lift][book-particle-lift].

<!-- citations -->
[book-particle-component]: ../../books/particle/component.md
[book-particle-lift]: ../../books/particle/lift.md
