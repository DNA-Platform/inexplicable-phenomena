---
kind: catalogue-section
section: XII.1
title: $check(arg, ...types)
status: stub
---

# § XII.1 `$check(arg, ...types)`

## Definition

`$check` is the runtime validation entry point invoked from inside binding constructors. It writes to the module-level `$ParamValidation` (§ XII.2) singleton, which accumulates errors and flushes via `evaluate()` on completion of the binding-constructor invocation.

## Rules

- *(TBD — writes to `$ParamValidation`.)*
- *(TBD — `evaluate()` throws if any error accumulated.)*

## Cases

- See the error gallery in § XII.3.

## See also

- [§ III.4 `$check`][s-III-4] — the chemical-level entry.
- [§ XII.2 `$ParamValidation`][s-XII-2] — the singleton.
- [§ XII.3 The error message format][s-XII-3] — the gallery.

<!-- citations -->
[s-III-4]: ../III-composition/04-check.md
[s-XII-2]: ./02-param-validation.md
[s-XII-3]: ./03-error-message-format.md
