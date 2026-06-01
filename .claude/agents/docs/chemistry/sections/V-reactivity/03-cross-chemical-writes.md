---
kind: catalogue-section
section: V.3
title: Cross-chemical writes
status: stub
---

# § V.3 Cross-chemical writes

## Definition

A write to another chemical's reactive property from inside a handler triggers fan-out to that chemical's derivatives. The in-scope and no-scope paths are symmetric — both call `diffuse` (§ V.5), which gates fan-out on `hasOwnProperty($derivatives$)`. Sibling derivatives that prototype-inherit the registry do not leak writes.

## Rules

- *(TBD — in-scope writes call `diffuse` on finalize.)*
- *(TBD — no-scope writes call `diffuse` immediately.)*
- *(TBD — the ownership gate prevents sibling leaks.)*

## Cases

- Outer-button-writes-inner-`$value` causes inner DOM to repaint.
- Sibling derivatives unaffected.

## See also

- [§ V.5 `diffuse`][s-V-5] — the fan-out function.
- [§ VI.3 The ownership gate][s-VI-3] — the `hasOwnProperty` gate.
- [§ XIII.1 Cross-chemical handler fan-out][s-XIII-1] — the historical caveat.

<!-- citations -->
[s-V-5]: ./05-diffuse.md
[s-VI-3]: ../VI-lexical-scoping/03-ownership-gate.md
[s-XIII-1]: ../XIII-caveats/01-cross-chemical-fanout.md
