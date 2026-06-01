---
kind: catalogue-section
section: X.3
title: Async bond ctors
status: stub
---

# § X.3 Async bond ctors

## Definition

A binding constructor declared `async` returns a Promise. The framework wraps the result in `$construction`, and the chemical's mount awaits it. Parents whose children are async-bound bundle their children's `$construction` promises via `Promise.allSettled` so the parent's mount waits on every child's construction.

## Rules

- *(TBD — `async` binding constructor returns a Promise.)*
- *(TBD — `$construction` is the bundled promise.)*
- *(TBD — parent bundles children via `Promise.allSettled`.)*

## Cases

- An async loader binding constructor.
- Awaiting `next('construction')`.

## See also

- [§ III.3 The binding constructor][s-III-3] — the synchronous form.
- [§ X.1 The phase queue][s-X-1] — where `construction` sits.

<!-- citations -->
[s-III-3]: ../III-composition/03-binding-constructor.md
[s-X-1]: ./01-phase-queue.md
