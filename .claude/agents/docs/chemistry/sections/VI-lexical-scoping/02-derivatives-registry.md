---
kind: catalogue-section
section: VI.2
title: The $derivatives$ registry
status: stub
---

# § VI.2 The `$derivatives$` registry

## Definition

`$derivatives$` is a Set owned by the parent chemical. It holds every derivative currently mounted from that parent. The framework's fan-out target (§ V.5) reads from this set when re-rendering after a write.

## Rules

- *(TBD — the parent owns the set as an own property.)*
- *(TBD — derivatives are added on mount, removed on unmount.)*

## Cases

- A parent's `$derivatives$` set grows on each mount.

## See also

- [§ V.5 `diffuse`][s-V-5] — what reads this set.
- [§ VI.3 The ownership gate][s-VI-3] — the own-vs-inherited distinction.

<!-- citations -->
[s-V-5]: ../V-reactivity/05-diffuse.md
[s-VI-3]: ./03-ownership-gate.md
