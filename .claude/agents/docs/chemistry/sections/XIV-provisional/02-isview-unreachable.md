---
kind: catalogue-section
section: XIV.2
title: isViewSymbol unreachable branch
status: provisional
---

# § XIV.2 `isViewSymbol` unreachable branch

## Definition

`chemical.ts:148`. The `$$Chemistry.` prefix check inside `isViewSymbol` never matches anything in current code. The branch is dead code or evidence of an earlier design where view symbols were prefixed differently.

## Observed

- The branch is never taken.

## Suspected fix

- *(TBD — remove the branch, or rediscover the original use case.)*

## See also

- [§ XV.2 `chemical.ts`][s-XV-2] — the source.

<!-- citations -->
[s-XV-2]: ../XV-implementation/02-chemical-ts.md
