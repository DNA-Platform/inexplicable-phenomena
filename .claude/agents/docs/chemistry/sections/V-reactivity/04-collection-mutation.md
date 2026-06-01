---
kind: catalogue-section
section: V.4
title: In-place collection mutation
status: stub
---

# § V.4 In-place collection mutation

## Definition

In-place mutations of `Map`, `Set`, `Array`, and nested objects are detected via `$symbolize` (§ XI.3) snapshot diff. The framework records the value's serialized form on read; on `scope.finalize`, comparing the new serialization against the recorded snapshot reveals mutations even when the reference is unchanged.

## Rules

- *(TBD — `$symbolize` produces a deterministic serialization.)*
- *(TBD — Map / Set / Array methods are detected by snapshot diff.)*
- *(TBD — deep object writes are detected.)*

## Cases

- `Map.set`, `Set.add`, `Array.push`.
- Deep `obj.x.y.z = 1`.

## See also

- [§ XI.3 `$symbolize`][s-XI-3] — the serialization function.
- [§ V.2 Scope tracking][s-V-2] — where snapshots are taken.

<!-- citations -->
[s-XI-3]: ../XI-cross-cutting/03-symbolize.md
[s-V-2]: ./02-scope-tracking.md
