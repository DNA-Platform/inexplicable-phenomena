---
kind: catalogue-section
section: III.4
title: $check(arg, ...types)
status: stub
---

# § III.4 `$check(arg, ...types)`

## Definition

`$check` is the runtime parameter-validation entry point invoked from inside a binding constructor (§ III.3). It validates that an argument is an instance of one of the supplied types, accepts subclass instances, accepts unions, and on mismatch throws a formatted error (§ XII.3) naming the offending parameter and the expected signature.

## Rules

- *(TBD — accepts subclass instances.)*
- *(TBD — accepts union types.)*
- *(TBD — throws a formatted error on mismatch.)*

## Cases

- Accepts subclass.
- Accepts union.
- Throws on wrong type with formatted error.

## See also

- [§ III.3 The binding constructor][s-III-3] — where `$check` is invoked.
- [§ III.5 `$is<T>(ctor)`][s-III-5] — the type-only helper.
- [§ XII.1 `$check`][s-XII-1] — the error/validation framing.
- [§ XII.3 The error message format][s-XII-3] — the gallery.

<!-- citations -->
[s-III-3]: ./03-binding-constructor.md
[s-III-5]: ./05-is.md
[s-XII-1]: ../XII-errors/01-check.md
[s-XII-3]: ../XII-errors/03-error-message-format.md
