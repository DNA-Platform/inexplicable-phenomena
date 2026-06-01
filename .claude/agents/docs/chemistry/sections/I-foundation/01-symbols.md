---
kind: catalogue-section
section: I.1
title: Symbols
status: stub
---

# § I.1 Symbols

## Definition

`$Chemistry` keys its internal slots with JavaScript `Symbol` values rather than `#private` fields. Symbols travel through `Object.create()`; `#private` does not. The framework's reliance on prototype delegation (§ II.9, § VI.1) makes symbols the only viable choice for state that must be visible from prototypal views. Symbols are defined and exported from `src/implementation/symbols.ts` (§ XV.9) and grouped by owner — `$Particle` symbols, `$Chemical` symbols, `$Atom` symbols, `$Reflection` symbols.

## Rules

- *(TBD — symbol naming conventions: `$x$` for instance-level, `$$x$$` for class-level.)*
- *(TBD — how symbols travel through `Object.create()`.)*
- *(TBD — the `#private` failure mode that motivated the choice.)*
- *(TBD — when to choose `#private` instead: standalone containers like `$Catalogue`.)*

## Cases

- A symbol-keyed property accessed via prototype-derived view.
- The `#private` failure mode demonstrated.

## See also

- [§ I.2 The `$` membrane][s-I-2] — the grammar that names symbols.
- [§ XV.9 `src/implementation/symbols.ts`][s-XV-9] — the source.
- [chemistry glossary — Symbol][glossary-symbol] — the existing glossary entry.

<!-- citations -->
[s-I-2]: ./02-the-dollar-membrane.md
[s-XV-9]: ../XV-implementation/09-symbols-ts.md
[glossary-symbol]: ../../glossary.md
