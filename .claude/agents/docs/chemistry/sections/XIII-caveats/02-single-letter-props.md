---
kind: catalogue-section
section: XIII.2
title: Single-letter $<x> props were inert
status: stable
---

# § XIII.2 Single-letter `$<x>` props were inert

## Definition

Resolved sprint-24. `$Reflection.isSpecial` required `name.length > 2`, so `$v`, `$x`, `$y` were silently classified as non-special and never received the reactivity machinery. The fix loosened the check to `length >= 2`, making single-letter `$<x>` props reactive as expected.

## Rules

- *(TBD — pre-fix: `length > 2` excluded `$x`.)*
- *(TBD — post-fix: `length >= 2` includes `$x`.)*

## Cases

- `$v`, `$x`, `$y` reactive (post-fix).

## See also

- [§ IX.3 `isSpecial`][s-IX-3] — the predicate.
- [chemistry caveat — short prop name instability][cav-short-prop] — the original write-up.

<!-- citations -->
[s-IX-3]: ../IX-reflection/03-isspecial.md
[cav-short-prop]: ../../caveats/short-prop-name-instability.md
