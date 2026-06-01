---
kind: catalogue-section
section: III.9
title: The HTML catalogue
status: stub
---

# § III.9 The HTML catalogue

## Definition

The HTML catalogue is a lazy-memoized map from HTML tag name (`'div'`, `'span'`, `'button'`) to a `$Html$` wrapper chemical. The `$('tagname')` callable form (§ II.7) looks up an entry; `$('tagname', X)` overrides the wrapper for one site.

## Rules

- *(TBD — entries are memoized on first lookup.)*
- *(TBD — the override form does not mutate the catalogue.)*

## Cases

- `$('div')` — basic lookup.
- `$('div', X)` — override.

## See also

- [§ II.7 The `$()` callable][s-II-7] — the string-form caller.

<!-- citations -->
[s-II-7]: ../II-primitives/07-dollar-callable.md
