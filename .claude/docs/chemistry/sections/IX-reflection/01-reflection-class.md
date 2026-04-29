---
kind: catalogue-section
section: IX.1
title: $Reflection class
status: stub
---

# § IX.1 `$Reflection` class

## Definition

`$Reflection` is the per-property classifier. It owns the decorator registries (`@inert`, `@reactive`) and makes the per-instance reactivity decision: given a property name and the class's decorator state, is this property reactive? The class is consulted by the get/set accessor installation in `$Particle` construction.

## Rules

- *(TBD — owns decorator registries.)*
- *(TBD — makes per-instance reactivity decision.)*

## Cases

- A property classified as reactive by name shape.
- A property classified as inert by `@inert`.

## See also

- [§ IX.2 `isReactive`][s-IX-2] — the name predicate.
- [§ IX.3 `isSpecial`][s-IX-3] — the shape predicate.
- [§ V.6 Decorators][s-V-6] — the registries.

<!-- citations -->
[s-IX-2]: ./02-isreactive.md
[s-IX-3]: ./03-isspecial.md
[s-V-6]: ../V-reactivity/06-decorators.md
