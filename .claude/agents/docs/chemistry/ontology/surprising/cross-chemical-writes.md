---
kind: feature
title: Cross-chemical writes
status: stable
---

# Cross-chemical writes

## The surprise

A handler attached to chemical A can write `B.$x = value` against a sibling chemical B, and B re-renders correctly — even though the write is happening *inside A's scope*, not B's.

```ts
class $Toggle extends $Chemical {
  $on = false
  $Toggle(other: $Light) {
    this.onClick = () => { other.$on = !other.$on }
  }
}
```

Click the toggle: the light wakes. Across instances, across the JSX tree, regardless of where the handler was registered.

## Why it works

Reactive writes don't only fan out within the writer's scope — they walk the *catalyst graph*, the structural overlay that links composed chemicals through their `$parent` relationship. A write to `B.$x` finds B's scope, fires B's reactions, and propagates through B's derivatives. The writing handler's scope is irrelevant to who wakes.

This was not always true. The pre-sprint-24 code had an in-scope-write fast path that *skipped* fan-out when the writer was already inside a scope. See [cross-chemical handler fanout caveat][cav-fanout].

## Why it's surprising

In many reactive systems, "the scope you're in" decides what wakes. Writing to a foreign property feels like reaching across a boundary the system doesn't track. `$Chemistry` tracks the boundary structurally — through the catalyst graph, not the call stack — so the cross-chemical write *is* tracked.

A reader who expected scope-boundedness will be surprised by the propagation. A reader who knows the catalyst graph exists will expect it.

## Where to confirm it

- The mechanism: [parent and catalyst (relationship)][rel-parent-catalyst].
- The historical bug (and its fix): [cross-chemical handler fanout caveat][cav-fanout].

<!-- citations -->
[rel-parent-catalyst]: ../relationships/parent-and-catalyst.md
[cav-fanout]: ../../caveats/cross-chemical-handler-fanout.md
