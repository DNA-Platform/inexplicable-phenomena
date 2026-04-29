---
kind: catalogue-section
section: X.2
title: $resolve propagation
status: stub
---

# § X.2 `$resolve` propagation

## Definition

`$resolve(phase)` walks up the prototype chain. At each ancestor that owns a phase queue, the corresponding entry is resolved. Derivative mounts therefore resolve their template's mount queue, ensuring code awaiting on the template observes the derivative's mount.

## Rules

- *(TBD — walks prototype chain.)*
- *(TBD — resolves each ancestor's owned queue.)*

## Cases

- A derivative mount resolves its template's `mount` queue.

## See also

- [§ X.1 The phase queue][s-X-1] — what is resolved.
- [§ VI.1 Per-mount derivatives][s-VI-1] — why this matters.

<!-- citations -->
[s-X-1]: ./01-phase-queue.md
[s-VI-1]: ../VI-lexical-scoping/01-per-mount-derivatives.md
