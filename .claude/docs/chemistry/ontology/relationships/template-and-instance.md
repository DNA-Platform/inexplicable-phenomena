---
kind: stub
title: Template and instance
status: planned
---

# Template and instance

Every `$Particle` subclass has exactly one **template** — the canonical instance that other instances derive from. The first time the class is constructed, that instance becomes `$$template$$`. Every subsequent construction is a derivation.

**To be written.** This page should cover:

- `$$template$$` — the class-level slot pointing at the first instance.
- `$template$` (instance getter) — points back at the class's template.
- `$isTemplate$` — `instance === instance.constructor.$$template$$`.
- `$derived$` — `instance !== instance.$template$` (true for `$lift`-derived instances).
- The relationship between `$lift` and `createComponent` — both operate against the template.
- `$Atom` as the template-singleton accessor (see [`$Atom`][ent-atom]).

For now, see [`$Particle` book — identity][book-particle-identity].

<!-- citations -->
[ent-atom]: ../entities/atom.md
[book-particle-identity]: ../../books/particle/identity.md
