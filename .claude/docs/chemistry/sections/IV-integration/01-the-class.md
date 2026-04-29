---
kind: catalogue-section
section: IV.1
title: $Atom — the class
status: stub
---

# § IV.1 `$Atom` — the class

## Definition

`$Atom` extends `$Chemical` (§ III.1). Its constructor returns the class template — invoking `new $Atom()` returns the same instance every time. The class is the singleton-shaped integration layer above composition; subclassing it produces a stable, formed chemical with memory.

## Rules

- *(TBD — constructor returns the class template.)*
- *(TBD — `new $Atom()` is idempotent.)*

## Cases

- `new $Atom()` returns the same instance every time.
- `$Theme extends $Atom` — a singleton theme.

## See also

- [§ III.1 `$Chemical` — the class][s-III-1] — the base.

<!-- citations -->
[s-III-1]: ../III-composition/01-the-class.md
