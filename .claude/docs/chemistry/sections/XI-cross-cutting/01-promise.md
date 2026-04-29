---
kind: catalogue-section
section: XI.1
title: $promise(executor)
status: stub
---

# § XI.1 `$promise(executor)`

## Definition

`$promise(executor)` produces a cancellable promise. The promise carries a `cancel()` method and a `$cancelled$` sentinel; chained `.then` handlers carry cancellation through. The framework uses cancellable promises for any async work that may be invalidated by a re-render or unmount.

## Rules

- *(TBD — `cancel()` propagates the `$cancelled$` sentinel.)*
- *(TBD — chained `.then` carries cancel through.)*

## Cases

- Cancel mid-flight.
- Chained `.then` carrying cancel.

## See also

- [§ XI.2 `$await`][s-XI-2] — the synchronous read.
- [§ XV.15 `promise.ts`][s-XV-15] — the source.

<!-- citations -->
[s-XI-2]: ./02-await.md
[s-XV-15]: ../XV-implementation/15-promise-ts.md
