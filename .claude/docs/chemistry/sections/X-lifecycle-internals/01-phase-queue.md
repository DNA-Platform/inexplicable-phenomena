---
kind: catalogue-section
section: X.1
title: The phase queue
status: stub
---

# § X.1 The phase queue

## Definition

`$phases$` is a Map keyed by phase name. `next(phase)` returns a Promise resolved by `$resolve(phase)` when the corresponding React lifecycle moment fires. The queue is allocated lazily — first `next()` for a given phase creates the queue entry.

## Rules

- *(TBD — `$phases$` is a Map.)*
- *(TBD — `next(phase)` returns a Promise.)*
- *(TBD — `$resolve(phase)` resolves the queue.)*

## Cases

- A particle awaiting `mount` and resolving on first React effect.

## See also

- [§ II.4 The lifecycle][s-II-4] — the phases.
- [§ X.2 `$resolve` propagation][s-X-2] — the chain walk.

<!-- citations -->
[s-II-4]: ../II-primitives/04-lifecycle.md
[s-X-2]: ./02-resolve-propagation.md
