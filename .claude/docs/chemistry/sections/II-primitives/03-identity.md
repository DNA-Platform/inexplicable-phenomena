---
kind: catalogue-section
section: II.3
title: Identity
status: stub
---

# § II.3 Identity

## Definition

A `$Particle` instance carries three identity fields: `$cid$` (an auto-incrementing integer), `$symbol$` (a printable string of the form `$Chemistry.{ClassName}[{cid}]`), and `$type$` (a reference to the constructor function). The symbol round-trips: `$$createSymbol$$` formats it; `$$parseCid$$` parses it back to recover the instance.

## Rules

- *(TBD — `$cid$` is auto-incremented from a class-level counter.)*
- *(TBD — `$symbol$` is the `toString()` value.)*
- *(TBD — `$type$` equals `instance.constructor`.)*
- *(TBD — round-trip: `$$createSymbol$$` ↔ `$$parseCid$$`.)*

## Cases

- Three instances of one subclass produce CIDs 1, 2, 3.
- Parsing `$Chemistry.Counter[42]` recovers the instance.
- Identity stability across re-renders.

## See also

- [§ II.1 The class][s-II-1] — identity fields are listed there.
- [§ I.1 Symbols][s-I-1] — the symbol mechanism.

<!-- citations -->
[s-II-1]: ./01-the-class.md
[s-I-1]: ../I-foundation/01-symbols.md
