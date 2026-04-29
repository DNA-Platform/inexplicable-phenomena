---
kind: catalogue-section
section: XIII.1
title: Cross-chemical handler fan-out
status: stable
---

# § XIII.1 Cross-chemical handler fan-out

## Definition

Resolved sprint-24. `scope.finalize` was missing the derivative fan-out that the no-scope path always performed. Writes from inside a wrapped event handler landed the value but skipped repaint of lifted DOM. The fix added the same `diffuse` (§ V.5) call to `scope.finalize` so both paths fan out symmetrically.

## Rules

- *(TBD — pre-fix: `scope.finalize` did not call `diffuse`.)*
- *(TBD — post-fix: in-scope and no-scope paths are symmetric.)*

## Cases

- Outer button writes inner held instance; inner DOM repaints (post-fix).

## See also

- [§ V.3 Cross-chemical writes][s-V-3] — the post-fix behavior.
- [§ V.5 `diffuse`][s-V-5] — the fan-out function.
- [chemistry caveat — cross-chemical handler fanout][cav-cross-chemical] — the original write-up.

<!-- citations -->
[s-V-3]: ../V-reactivity/03-cross-chemical-writes.md
[s-V-5]: ../V-reactivity/05-diffuse.md
[cav-cross-chemical]: ../../caveats/cross-chemical-handler-fanout.md
