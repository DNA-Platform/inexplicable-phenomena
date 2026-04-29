---
kind: catalogue-section
section: VIII.6
title: The catalyst graph wiring
status: stub
---

# § VIII.6 The catalyst graph wiring

## Definition

`$Synthesis` calls `$bind` on each child Component to thread the parent into the catalyst graph (§ III.8). The wiring happens during the synthesis walk, before the binding constructor is invoked, so the binding constructor sees children whose `$$parent$$` is already set.

## Rules

- *(TBD — `$bind` is called on each child Component.)*
- *(TBD — wiring precedes the binding-constructor invocation.)*

## Cases

- A child chemical's `$$parent$$` set before its binding constructor runs.

## See also

- [§ III.8 The catalyst graph][s-III-8] — the graph being wired.
- [§ III.6 `bind`][s-III-6] — the static-binding form.

<!-- citations -->
[s-III-8]: ../III-composition/08-catalyst-graph.md
[s-III-6]: ../III-composition/06-bind.md
