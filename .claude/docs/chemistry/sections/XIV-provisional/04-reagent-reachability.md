---
kind: catalogue-section
section: XIV.4
title: $Reagent reachability
status: provisional
---

# § XIV.4 `$Reagent` reachability

## Definition

Open question: are non-`$` user methods ever wrapped by `$Reagent`? Given the inherited-resolution behavior of § XIV.3, the answer appears to be no. The mechanism may be entirely dead code or may exist for a case the test suite does not currently exercise.

## Observed

- Non-`$` user methods are not observably wrapped.

## Suspected fix

- *(TBD — fix § XIV.3 first, then determine whether `$Reagent` does anything useful.)*

## See also

- [§ XIV.3 `$isChemicalBase$` inherited resolution][s-XIV-3] — the upstream cause.
- [§ XV.4 `bond.ts`][s-XV-4] — the source.

<!-- citations -->
[s-XIV-3]: ./03-ischemicalbase-inherited.md
[s-XV-4]: ../XV-implementation/04-bond-ts.md
