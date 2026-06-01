---
kind: catalogue-section
section: II.2
title: view()
status: stub
---

# § II.2 `view()`

## Definition

`view()` is the render contract on `$Particle`. A particle's `view()` returns a React node — a single element, an array, a string, or `null` — computed purely from the particle's state. The framework calls `view()` from inside a render and diffs the result against `$viewCache$` to decide whether React needs to update.

## Rules

- *(TBD — return type: `ReactNode`.)*
- *(TBD — purity expectation: no side effects, no hooks.)*
- *(TBD — the `$rendering$` flag and reentrancy guard.)*
- *(TBD — when `view()` returns `null`.)*

## Cases

- A `view()` returning a single element.
- A `view()` returning an array.
- A `view()` returning `null`.

## See also

- [§ II.1 The class][s-II-1] — `view()` lives on every `$Particle`.
- [§ X.4 The render loop][s-X-4] — where `view()` is called.

<!-- citations -->
[s-II-1]: ./01-the-class.md
[s-X-4]: ../X-lifecycle-internals/04-render-loop.md
