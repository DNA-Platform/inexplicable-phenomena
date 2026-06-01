---
kind: stub
title: Composition
status: planned
---

# Composition

How chemicals contain other particles. The `$Chemical` base class plus the bond constructor (its surprising surface) plus the `$()` callable (its dispatch surface) — together these form the composition story.

**To be written.** Should distinguish:

- *Static* composition (JSX inside a render).
- *Bond-ctor* composition (typed children passed to the bond constructor at mount).
- *Held-instance* composition (`<inner.Component />` reusing a known instance).

For now, see [`$Chemical` (feature)][feat-chemical] and the canonical surprise: [bond constructor][surprising-bond-ctor].

<!-- citations -->
[feat-chemical]: ../../features/chemical.md
[surprising-bond-ctor]: ../surprising/bond-constructor.md
