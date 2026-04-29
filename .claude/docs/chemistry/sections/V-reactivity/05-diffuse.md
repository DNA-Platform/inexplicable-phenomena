---
kind: catalogue-section
section: V.5
title: diffuse(chemical)
status: stub
---

# § V.5 `diffuse(chemical)`

## Definition

`diffuse(chemical)` is the fan-out function in `scope.ts` (§ XV.8). It walks the chemical's `$derivatives$` set — but only when the chemical *owns* the set (`hasOwnProperty($derivatives$)`) — and re-renders each derivative.

## Rules

- *(TBD — gated on `hasOwnProperty($derivatives$)`.)*
- *(TBD — re-renders each registered derivative.)*

## Cases

- A chemical whose own derivatives are fanned out.
- A derivative that prototype-inherits `$derivatives$` and does not fan out.

## See also

- [§ VI.2 The `$derivatives$` registry][s-VI-2] — the set this reads.
- [§ VI.3 The ownership gate][s-VI-3] — the gate.
- [§ XV.8 `scope.ts`][s-XV-8] — the source.

<!-- citations -->
[s-VI-2]: ../VI-lexical-scoping/02-derivatives-registry.md
[s-VI-3]: ../VI-lexical-scoping/03-ownership-gate.md
[s-XV-8]: ../XV-implementation/08-scope-ts.md
