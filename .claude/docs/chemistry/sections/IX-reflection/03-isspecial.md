---
kind: catalogue-section
section: IX.3
title: $Reflection.isSpecial(name)
status: stub
---

# § IX.3 `$Reflection.isSpecial(name)`

## Definition

`isSpecial(name)` is the `$x` shape predicate. A name is special if it starts with `$` and has `length >= 2` (the sprint-24 fix; § XIII.2). The predicate identifies reactive `$`-prefixed properties on a chemical.

## Rules

- *(TBD — must start with `$`.)*
- *(TBD — `length >= 2` — single `$` is not special.)*

## Cases

- `$count` — special.
- `$x` — special (post sprint-24).
- `$` — not special.

## See also

- [§ IX.1 `$Reflection` class][s-IX-1] — where this predicate lives.
- [§ XIII.2 Single-letter `$<x>` props were inert][s-XIII-2] — the historical caveat.

<!-- citations -->
[s-IX-1]: ./01-reflection-class.md
[s-XIII-2]: ../XIII-caveats/02-single-letter-props.md
