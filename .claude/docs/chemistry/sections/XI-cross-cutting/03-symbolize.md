---
kind: catalogue-section
section: XI.3
title: $symbolize(value)
status: stub
---

# § XI.3 `$symbolize(value)`

## Definition

`$symbolize(value)` produces a deterministic string serialization of a value, suitable for snapshot comparison. It handles `Map`, `Set`, `Array`, `Date`, and cyclic references. Two values with the same content produce the same string; a content change produces a different string.

## Rules

- *(TBD — Map / Set / Array / Date aware.)*
- *(TBD — cyclic-safe.)*
- *(TBD — deterministic.)*

## Cases

- Same Map content → same string.
- Map mutation → different string.
- Date round-trip.

## See also

- [§ XI.4 `$literalize`][s-XI-4] — the inverse.
- [§ V.4 In-place collection mutation][s-V-4] — the consumer.

<!-- citations -->
[s-XI-4]: ./04-literalize.md
[s-V-4]: ../V-reactivity/04-collection-mutation.md
