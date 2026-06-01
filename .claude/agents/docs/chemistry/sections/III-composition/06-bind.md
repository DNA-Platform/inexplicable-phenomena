---
kind: catalogue-section
section: III.6
title: bind(chemical, parent?)
status: stub
---

# § III.6 `bind(chemical, parent?)`

## Definition

`bind(chemical, parent?)` performs static binding without JSX. It is the programmatic-composition entry point — a chemical can be bound to a parent (or to none) without the JSX path's `$Synthesis` orchestration.

## Rules

- *(TBD — accepts a chemical and optional parent.)*
- *(TBD — wires the catalyst graph (§ III.8).)*

## Cases

- A programmatically composed chemical without JSX.

## See also

- [§ III.3 The binding constructor][s-III-3] — the JSX-path equivalent.
- [§ III.8 The catalyst graph][s-III-8] — what `bind` wires.

<!-- citations -->
[s-III-3]: ./03-binding-constructor.md
[s-III-8]: ./08-catalyst-graph.md
