---
kind: catalogue-section
section: VI.1
title: Per-mount derivatives
status: stub
---

# § VI.1 Per-mount derivatives

## Definition

Two mounts of the same held instance produce two derivatives via `Object.create()`. Each derivative inherits state from the parent through the prototype chain but owns its own writes. The framework's lexical-scoping model is built on this: a single instance can appear at multiple JSX sites without state collisions.

## Rules

- *(TBD — each mount is `Object.create(parent)`.)*
- *(TBD — reads cascade up the chain.)*
- *(TBD — writes land on the derivative.)*

## Cases

- Two `<inner.Component />` mounts; expand on one, the other unaffected.

## See also

- [§ II.9 `$lift`][s-II-9] — the primitive that creates the derivative.
- [§ VI.2 The `$derivatives$` registry][s-VI-2] — the parent's set.
- [chemistry concept — lexical scoping][concept-lexical-scoping] — the existing long-form treatment.

<!-- citations -->
[s-II-9]: ../II-primitives/09-lift.md
[s-VI-2]: ./02-derivatives-registry.md
[concept-lexical-scoping]: ../../concepts/lexical-scoping.md
