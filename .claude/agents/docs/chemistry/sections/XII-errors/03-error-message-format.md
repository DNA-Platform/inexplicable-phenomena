---
kind: catalogue-section
section: XII.3
title: The error message format
status: stub
---

# § XII.3 The error message format

## Definition

`$ParamValidation` (§ XII.2) formats errors as multi-line strings designed to be read on a page. The message has a class-name heading, the expected signature, and a per-parameter actual-vs-expected line. The format is the framework's user-facing voice for a binding-constructor failure.

## Rules

- *(TBD — class name in heading.)*
- *(TBD — expected signature line.)*
- *(TBD — per-parameter actual vs expected.)*
- *(TBD — designed to be read on a page.)*

## Cases (the error gallery)

- Wrong type: `<Container><Recipe /></Container>` where `$Container` expects `$Item`.
- Wrong arity: too many or too few children.
- Class hierarchy violation: a chemical without a matching binding-ctor name when its parent has one.
- Component already created (double-mount of the same `$createComponent`).
- Cannot parse constructor: arrow-form bond ctor.
- Invalid chemical symbol: malformed string passed to `$$parseCid$$`.

## See also

- [§ XII.1 `$check`][s-XII-1] — the entry point.
- [§ XII.2 `$ParamValidation`][s-XII-2] — the singleton that formats.
- [§ III.3 The binding constructor][s-III-3] — where these errors originate.

<!-- citations -->
[s-XII-1]: ./01-check.md
[s-XII-2]: ./02-param-validation.md
[s-III-3]: ../III-composition/03-binding-constructor.md
