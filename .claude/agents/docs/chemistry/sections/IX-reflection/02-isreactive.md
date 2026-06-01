---
kind: catalogue-section
section: IX.2
title: $Reflection.isReactive(name)
status: stub
---

# § IX.2 `$Reflection.isReactive(name)`

## Definition

`isReactive(name)` is the name predicate that determines whether a property name is eligible for reactivity. It excludes names starting with `_` (the privacy convention) and the literal `constructor`. The predicate is one input to the per-instance decision; decorator state is the other.

## Rules

- *(TBD — `_`-prefixed names excluded.)*
- *(TBD — `constructor` excluded.)*

## Cases

- `$count` — reactive.
- `_internal` — excluded.
- `constructor` — excluded.

## See also

- [§ IX.1 `$Reflection` class][s-IX-1] — where this predicate lives.
- [§ IX.3 `isSpecial`][s-IX-3] — the shape predicate.

<!-- citations -->
[s-IX-1]: ./01-reflection-class.md
[s-IX-3]: ./03-isspecial.md
