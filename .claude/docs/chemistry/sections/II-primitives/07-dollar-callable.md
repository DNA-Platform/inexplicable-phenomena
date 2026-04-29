---
kind: catalogue-section
section: II.7
title: The $() callable
status: stub
---

# § II.7 The `$()` callable

## Definition

The framework exports `$` as a callable with three forms. Called with a class, it returns the React Component for that class. Called with an instance, it lifts the instance into a derivative for the current site. Called with a string, it looks up an HTML catalogue entry (§ III.9). The callable is the framework's primary JSX entry point.

## Rules

- *(TBD — class form: `$($Counter)` returns the Component.)*
- *(TBD — instance form: `$(counter)` returns the lift Component.)*
- *(TBD — string form: `$('div')` returns the HTML catalogue entry.)*
- *(TBD — string form with override: `$('div', X)` overrides the wrapper.)*

## Cases

- `$($Counter)` — class form.
- `$(counter)` — instance form.
- `$('div')` — string form, HTML catalogue.
- `$('div', X)` — string form, override.

## See also

- [§ II.9 `$lift`][s-II-9] — what the instance form invokes.
- [§ II.10 The Component getter][s-II-10] — what the class form returns.
- [§ III.9 The HTML catalogue][s-III-9] — the string-form lookup table.

<!-- citations -->
[s-II-9]: ./09-lift.md
[s-II-10]: ./10-component-getter.md
[s-III-9]: ../III-composition/09-html-catalogue.md
