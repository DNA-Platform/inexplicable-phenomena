---
kind: catalogue-section
section: XI.4
title: $literalize(symbol)
status: stub
---

# § XI.4 `$literalize(symbol)`

## Definition

`$literalize(symbol)` is the inverse of `$symbolize` (§ XI.3). It parses a serialized string and reconstructs the value. Round-trips through Map / Set / Array / Date are exact.

## Rules

- *(TBD — round-trips Map / Set / Array / Date.)*

## Cases

- A `$symbolize`/`$literalize` round-trip on a `Map`.

## See also

- [§ XI.3 `$symbolize`][s-XI-3] — the forward direction.

<!-- citations -->
[s-XI-3]: ./03-symbolize.md
