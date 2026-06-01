---
kind: catalogue-section
section: III.8
title: The catalyst graph
status: stub
---

# § III.8 The catalyst graph

## Definition

The catalyst graph wires composed chemicals into a shared reaction system. Each `$Chemical` carries `$catalyst$` (its top-of-graph reference), `$$parent$$` (its parent), and a `$parent$` setter that rewires the graph on join. Composed chemicals share a reaction tree so writes in one chemical's handler can reach derivatives in another.

## Rules

- *(TBD — `$catalyst$` points at the graph root.)*
- *(TBD — `$$parent$$` is set by `$bind`.)*
- *(TBD — `$parent$` setter rewires on join.)*

## Cases

- Cross-chemical write through composition.
- The catalyst's reaction tree shape.

## See also

- [§ III.6 `bind`][s-III-6] — the static-binding entry.
- [§ V.3 Cross-chemical writes][s-V-3] — what the graph enables.
- [§ VIII.6 The catalyst graph wiring][s-VIII-6] — how synthesis wires it.

<!-- citations -->
[s-III-6]: ./06-bind.md
[s-V-3]: ../V-reactivity/03-cross-chemical-writes.md
[s-VIII-6]: ../VIII-synthesis/06-catalyst-wiring.md
