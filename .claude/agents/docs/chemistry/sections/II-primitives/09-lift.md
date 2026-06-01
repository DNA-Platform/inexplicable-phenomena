---
kind: catalogue-section
section: II.9
title: $lift
status: stub
---

# § II.9 `$lift`

## Definition

`$lift` is the per-mount derivative-creation primitive. When a held particle is mounted into JSX, the framework invokes `$lift` to create a fresh `Object.create(parent)` derivative, stamp identity, and register the derivative in the parent's `$derivatives$` set. Each mount of the same instance produces an independent derivative with its own state.

## Rules

- *(TBD — `Object.create(parent)` produces the derivative.)*
- *(TBD — derivative receives a fresh `$cid$`.)*
- *(TBD — derivative is registered in parent's `$derivatives$`.)*

## Cases

- Two mounts of one held instance produce two derivatives.
- The two derivatives have independent state.
- The parent's `$derivatives$` set contains both.

## See also

- [§ VI.1 Per-mount derivatives][s-VI-1] — the lexical-scoping framing.
- [§ VI.2 The `$derivatives$` registry][s-VI-2] — the registry this writes to.
- [§ V.5 `diffuse`][s-V-5] — what reads the registry.

<!-- citations -->
[s-VI-1]: ../VI-lexical-scoping/01-per-mount-derivatives.md
[s-VI-2]: ../VI-lexical-scoping/02-derivatives-registry.md
[s-V-5]: ../V-reactivity/05-diffuse.md
