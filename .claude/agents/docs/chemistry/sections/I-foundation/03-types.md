---
kind: catalogue-section
section: I.3
title: Types
status: stub
---

# § I.3 Types

## Definition

`$Chemistry`'s TypeScript vocabulary lets a class definition double as a component-prop interface. The core types — `$Properties<T>`, `$Component<T>`, `$Element<T>`, `I<T>` — translate `$`-prefixed instance fields into bare consumer-facing props at the `.Component` boundary, and provide identity-shaped intersections for particularization carriers.

## Rules

- *(TBD — `$Properties<T>` extracts `$`-prefixed props from a class.)*
- *(TBD — `$Component<T>` is the React component type augmented with `$bind`, `$chemical`.)*
- *(TBD — `$Element<T>` is the JSX element type for a chemical class.)*
- *(TBD — `I<T>` is the identity-shaped type used by particularization.)*

## Cases

- A class with three `$`-prefixed fields and the resulting consumer-facing props interface.
- The `I<$Error> & I<Error>` intersection on a particularized error.

## See also

- [§ I.2 The `$` membrane][s-I-2] — the grammar these types implement.
- [§ VII.3 The `I<T>` type][s-VII-3] — the identity-shaped type in detail.
- [§ XV.10 `src/implementation/types.ts`][s-XV-10] — the source.

<!-- citations -->
[s-I-2]: ./02-the-dollar-membrane.md
[s-VII-3]: ../VII-particularization/03-i-of-t.md
[s-XV-10]: ../XV-implementation/10-types-ts.md
