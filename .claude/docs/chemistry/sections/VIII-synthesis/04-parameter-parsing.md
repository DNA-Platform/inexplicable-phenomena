---
kind: catalogue-section
section: VIII.4
title: Parameter parsing
status: stub
---

# § VIII.4 Parameter parsing

## Definition

The framework parses the binding constructor's parameter list with a regex. Spread parameters (`...items`) are recognized; positional parameters are recognized. The parser is brittle (§ XIV.1) — arrow-form constructors, default values, and destructured parameters break it.

## Rules

- *(TBD — regex extracts the parameter list.)*
- *(TBD — spread vs positional are distinguished.)*

## Cases

- A spread `...items: $Item[]` parameter.
- A mix of positional and spread parameters.

## See also

- [§ III.3 The binding constructor][s-III-3] — what owns the parameter list.
- [§ XIV.1 `parseBondConstructor` regex limits][s-XIV-1] — known limitations.

<!-- citations -->
[s-III-3]: ../III-composition/03-binding-constructor.md
[s-XIV-1]: ../XIV-provisional/01-bond-ctor-regex.md
