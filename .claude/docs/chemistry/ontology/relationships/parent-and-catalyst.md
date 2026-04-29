---
kind: stub
title: Parent and catalyst
status: planned
---

# Parent and catalyst

The catalyst graph. When a chemical is composed inside another, the `$parent` setter wires up a structural link — sibling chemicals under a common parent share a *catalyst* through which reactions propagate.

**To be written.** This page should cover:

- The `$parent` setter: when it runs, what it links.
- The catalyst graph: a structural overlay distinct from the React tree.
- How sibling fan-out works through the shared catalyst.
- The cross-chemical handler propagation rule (see [caveat][cav-cross-chemical]).

For now, see [topical / catalyst graph][topical-catalyst].

<!-- citations -->
[cav-cross-chemical]: ../../caveats/cross-chemical-handler-fanout.md
[topical-catalyst]: ../../topical/10-the-catalyst-graph.md
