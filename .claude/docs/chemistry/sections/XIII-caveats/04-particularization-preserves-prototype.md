---
kind: catalogue-section
section: XIII.4
title: Particularization preserves prototype
status: stable
---

# § XIII.4 Particularization preserves prototype

## Definition

Earlier framework history. The original particularization design used `Object.setPrototypeOf` to install the particle layer, which broke `instanceof` for the original type. The current design *inserts* the particle layer into the prototype chain, leaving the original chain in place. `instanceof OriginalType` remains true (§ VII.2).

## Rules

- *(TBD — particle layer is inserted, not substituted.)*
- *(TBD — `instanceof OriginalType` remains true.)*

## Cases

- `new $Error(realErr) instanceof Error === true`.

## See also

- [§ VII.1 The pattern][s-VII-1] — the current design.
- [§ VII.2 `instanceof` preservation][s-VII-2] — the invariant.
- [chemistry caveat — particularization-prototype-loss][cav-particularization] — the original write-up.

<!-- citations -->
[s-VII-1]: ../VII-particularization/01-the-pattern.md
[s-VII-2]: ../VII-particularization/02-instanceof-preservation.md
[cav-particularization]: ../../caveats/particularization-prototype-loss.md
