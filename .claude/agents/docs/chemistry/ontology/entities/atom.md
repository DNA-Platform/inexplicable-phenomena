---
kind: stub
title: $Atom (entity)
status: planned
---

# `$Atom`

The singleton template. `new $Atom()` always returns the class's template instance.

**Why it exists.** Every `$Particle` subclass has exactly one *template* — the canonical instance from which others are derived via `Object.create()`. `$Atom` is the framework's way of getting at that template without constructing fresh state.

**To be written.** This page should cover:

- The template-vs-instance distinction (see [`template-and-instance`][rel-template]).
- Why `new $Atom()` returns the template instead of allocating.
- The relationship to `$$template$$` and `$isTemplate$`.

For now, see source: [`atom.ts`][src-atom].

<!-- citations -->
[rel-template]: ../relationships/template-and-instance.md
[src-atom]: ../../../../library/chemistry/src/chemistry/atom.ts
