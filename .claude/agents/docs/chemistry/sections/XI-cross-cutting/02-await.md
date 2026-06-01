---
kind: catalogue-section
section: XI.2
title: $await(promise)
status: stub
---

# § XI.2 `$await(promise)`

## Definition

`$await(promise)` synchronously reads the `result` of a settled `$promise`. It throws if the promise is unsettled; it returns the value if resolved, or throws the rejection if rejected. The function is the synchronous read counterpart to `$promise`.

## Rules

- *(TBD — throws if unsettled.)*
- *(TBD — returns value if resolved.)*
- *(TBD — throws rejection if rejected.)*

## Cases

- A settled promise read in `view()`.

## See also

- [§ XI.1 `$promise`][s-XI-1] — what produces the promise.

<!-- citations -->
[s-XI-1]: ./01-promise.md
