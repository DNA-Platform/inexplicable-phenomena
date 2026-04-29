---
kind: catalogue-section
section: XII.2
title: $ParamValidation
status: stub
---

# § XII.2 `$ParamValidation`

## Definition

`$ParamValidation` is the module-level singleton that accumulates `$check` calls during a binding-constructor invocation. It tracks `index`, `count`, `types`, and `errors`; on `evaluate()`, it formats and throws if any errors accumulated.

## Rules

- *(TBD — module-level singleton.)*
- *(TBD — `evaluate()` formats and throws on error.)*

## Cases

- A binding constructor with one wrong-type argument; the formatted error.

## See also

- [§ XII.1 `$check`][s-XII-1] — the entry point.
- [§ XII.3 The error message format][s-XII-3] — the format.

<!-- citations -->
[s-XII-1]: ./01-check.md
[s-XII-3]: ./03-error-message-format.md
