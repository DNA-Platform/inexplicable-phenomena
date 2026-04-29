---
kind: catalogue-section
section: XIV.3
title: $isChemicalBase$ inherited resolution
status: provisional
---

# § XIV.3 `$isChemicalBase$` inherited resolution

## Definition

`molecule.ts:79`. The walk that locates the chemical-base prototype halts on the first match via *inherited* resolution rather than *own*. User methods on subclass prototypes never reach `$Reagent.form()` as a result.

## Observed

- User methods on subclass prototypes are not wrapped by `$Reagent`.

## Suspected fix

- *(TBD — switch to `hasOwnProperty` walk.)*

## See also

- [§ XIV.4 `$Reagent` reachability][s-XIV-4] — the consequence.
- [§ XV.5 `molecule.ts`][s-XV-5] — the source.

<!-- citations -->
[s-XIV-4]: ./04-reagent-reachability.md
[s-XV-5]: ../XV-implementation/05-molecule-ts.md
