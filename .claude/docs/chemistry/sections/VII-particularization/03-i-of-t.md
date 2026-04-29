---
kind: catalogue-section
section: VII.3
title: The I<T> type
status: stub
---

# § VII.3 The `I<T>` type

## Definition

`I<T>` is the identity-shaped TypeScript helper used to express a particularization carrier's static type. The intersection `I<$Error> & I<Error>` says "this value satisfies both the `$Error` interface and the `Error` interface."

## Rules

- *(TBD — `I<T>` is the identity-shaped type.)*
- *(TBD — used as an intersection on particularization carriers.)*

## Cases

- A `$Error` carrier typed as `I<$Error> & I<Error>`.

## See also

- [§ I.3 Types][s-I-3] — the full type vocabulary.
- [§ VII.1 The pattern][s-VII-1] — the runtime side.

<!-- citations -->
[s-I-3]: ../I-foundation/03-types.md
[s-VII-1]: ./01-the-pattern.md
