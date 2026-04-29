---
kind: catalogue-section
section: II.8
title: Render filters
status: stub
---

# § II.8 Render filters

## Definition

A render filter is a function in a chain that runs before `view()` and can short-circuit rendering. The framework ships `$show` and `$hide` filters; consumers register more via `registerFilter()`. The chain runs in registration order; the first non-`undefined` return value wins.

## Rules

- *(TBD — filters run before `view()`.)*
- *(TBD — first non-`undefined` return wins.)*
- *(TBD — `$show` / `$hide` are built-in.)*
- *(TBD — `registerFilter()` adds a filter.)*

## Cases

- Toggling `$show`.
- A custom filter for an error placeholder.
- Filter chain ordering.

## See also

- [§ II.2 `view()`][s-II-2] — what filters precede.
- [§ X.4 The render loop][s-X-4] — where filters fit.

<!-- citations -->
[s-II-2]: ./02-view.md
[s-X-4]: ../X-lifecycle-internals/04-render-loop.md
