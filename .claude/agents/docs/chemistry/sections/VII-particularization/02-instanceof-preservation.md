---
kind: catalogue-section
section: VII.2
title: instanceof preservation
status: stub
---

# § VII.2 `instanceof` preservation

## Definition

A particularization carrier passes `instanceof OriginalType` because the original type's prototype is preserved in the carrier's prototype chain. The particle layer is *inserted* into the chain, not substituted for it.

## Rules

- *(TBD — the original prototype chain is preserved.)*
- *(TBD — the particle layer sits between the carrier and the original prototype.)*

## Cases

- `new $Error(realErr) instanceof Error === true`.

## See also

- [§ VII.1 The pattern][s-VII-1] — the pattern this preserves.
- [§ XIII.4 Particularization preserves prototype][s-XIII-4] — the historical caveat.

<!-- citations -->
[s-VII-1]: ./01-the-pattern.md
[s-XIII-4]: ../XIII-caveats/04-particularization-preserves-prototype.md
