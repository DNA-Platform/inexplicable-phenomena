---
kind: catalogue-section
section: XIV.1
title: parseBondConstructor regex limits
status: provisional
---

# § XIV.1 `parseBondConstructor` regex limits

## Definition

`chemical.ts:220`. The regex that extracts a binding constructor's parameter list does not handle arrow-form constructors, default parameter values, or destructured parameters. The current behavior treats any of these as a parse failure.

## Observed

- Arrow-form binding constructors throw on parse.
- Default values are not recognized.
- Destructured parameters are not recognized.

## Suspected fix

- *(TBD — replace regex with a parser that handles all three cases.)*

## See also

- [§ VIII.4 Parameter parsing][s-VIII-4] — the function this describes.
- [§ XV.2 `chemical.ts`][s-XV-2] — the source.

<!-- citations -->
[s-VIII-4]: ../VIII-synthesis/04-parameter-parsing.md
[s-XV-2]: ../XV-implementation/02-chemical-ts.md
