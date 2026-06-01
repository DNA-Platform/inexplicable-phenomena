---
kind: catalogue-section
section: VI.3
title: The ownership gate
status: stub
---

# § VI.3 The ownership gate

## Definition

`diffuse` (§ V.5) walks `$derivatives$` only when the chemical *owns* the set as an own property. Derivatives prototype-inherit the set from the parent but do not own it; writes from a derivative therefore do not leak fan-out to its siblings. This is the fix landed in sprint-24 (§ XIII.1) for the cross-chemical handler fan-out caveat.

## Rules

- *(TBD — `hasOwnProperty($derivatives$)` gates fan-out.)*
- *(TBD — derivatives inherit but do not own.)*

## Cases

- A write from a derivative does not fan out to siblings.
- A write from the parent fans out to all derivatives.

## See also

- [§ V.5 `diffuse`][s-V-5] — the gating function.
- [§ XIII.1 Cross-chemical handler fan-out][s-XIII-1] — the historical caveat.

<!-- citations -->
[s-V-5]: ../V-reactivity/05-diffuse.md
[s-XIII-1]: ../XIII-caveats/01-cross-chemical-fanout.md
