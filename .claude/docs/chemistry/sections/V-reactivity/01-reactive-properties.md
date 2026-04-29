---
kind: catalogue-section
section: V.1
title: Reactive properties
status: stub
---

# § V.1 Reactive properties

## Definition

A `$`-prefixed instance field is a reactive property. The framework installs a get/set accessor pair that records reads (for snapshot) and writes (for fan-out). Mutating a reactive property triggers re-render without an explicit `setState`. The shape predicate — `length >= 2` and starting with `$` — is documented in § IX.3.

## Rules

- *(TBD — `$x` fields are reactive by default.)*
- *(TBD — `_`-prefixed fields are excluded.)*
- *(TBD — `constructor` is excluded.)*
- *(TBD — single-letter `$<x>` is not special; `length >= 2` is required.)*

## Cases

- `$count = 0` with `this.$count++`.
- `$map = new Map()` with `this.$map.set(...)`.
- `$arr.push(...)`.

## See also

- [§ V.2 Scope tracking][s-V-2] — how reads/writes are recorded.
- [§ V.6 Decorators][s-V-6] — `@inert` / `@reactive` overrides.
- [§ IX.3 `isSpecial`][s-IX-3] — the shape predicate.
- [§ I.2 The `$` membrane][s-I-2] — the grammar.

<!-- citations -->
[s-V-2]: ./02-scope-tracking.md
[s-V-6]: ./06-decorators.md
[s-IX-3]: ../IX-reflection/03-isspecial.md
[s-I-2]: ../I-foundation/02-the-dollar-membrane.md
