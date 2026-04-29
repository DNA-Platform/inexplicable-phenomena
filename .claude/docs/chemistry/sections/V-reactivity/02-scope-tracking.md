---
kind: catalogue-section
section: V.2
title: Scope tracking
status: stub
---

# § V.2 Scope tracking

## Definition

Event handlers wrapped via `augment` run inside a `withScope` block. Reads are recorded for snapshot; writes are recorded as dirty. On `scope.finalize()`, reactions fire and fan out to derivatives via `diffuse` (§ V.5). Code outside a scope (e.g., a `setTimeout`) takes the no-scope write path with the same fan-out semantics.

## Rules

- *(TBD — `withScope` opens a tracking frame.)*
- *(TBD — reads recorded for snapshot.)*
- *(TBD — writes recorded as dirty.)*
- *(TBD — `scope.finalize` fires reactions.)*

## Cases

- Click handler triggering re-render.
- `setTimeout` write outside scope (no-scope path).

## See also

- [§ V.5 `diffuse`][s-V-5] — the fan-out function.
- [§ XV.8 `scope.ts`][s-XV-8] — the source.
- [§ XV.11 `augment.ts`][s-XV-11] — the handler-wrapping.

<!-- citations -->
[s-V-5]: ./05-diffuse.md
[s-XV-8]: ../XV-implementation/08-scope-ts.md
[s-XV-11]: ../XV-implementation/11-augment-ts.md
