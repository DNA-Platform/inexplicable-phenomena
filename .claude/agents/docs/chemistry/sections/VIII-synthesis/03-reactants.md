---
kind: catalogue-section
section: VIII.3
title: $Reactants
status: stub
---

# § VIII.3 `$Reactants`

## Definition

`$Reactants` is the information-hiding wrapper passed to the binding constructor. It exposes a `.values` array — the typed arguments — and nothing else. The wrapper prevents the binding-constructor body from reaching synthesis internals.

## Rules

- *(TBD — exposes `.values` only.)*

## Cases

- A binding constructor reading `reactants.values`.

## See also

- [§ III.3 The binding constructor][s-III-3] — what receives `$Reactants`.

<!-- citations -->
[s-III-3]: ../III-composition/03-binding-constructor.md
