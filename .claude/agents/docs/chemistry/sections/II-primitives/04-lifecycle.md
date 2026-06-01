---
kind: catalogue-section
section: II.4
title: The lifecycle
status: stub
---

# § II.4 The lifecycle

## Definition

A `$Particle` walks six phases — `setup`, `mount`, `render`, `layout`, `effect`, `unmount`. Each phase corresponds to a React rendering moment. User code awaits a phase with `next(phase)`, which returns a promise resolved by the framework when the corresponding React hook fires. `$resolve` propagates phase resolution up the prototype chain so derivatives resolve their template's queues.

## Rules

- *(TBD — six phases in order.)*
- *(TBD — `next(phase)` returns a promise.)*
- *(TBD — convenience wrappers: `mount()`, `render()`, `layout()`, `effect()`, `unmount()`.)*
- *(TBD — `$resolve` walks the prototype chain.)*
- *(TBD — `unmount` rejects after unmount.)*

## Cases

- Awaiting `mount`.
- Awaiting `unmount` (returns rejected after unmount).
- Phase ordering across a parent and its child.

## See also

- [§ X.1 The phase queue][s-X-1] — the queue mechanics.
- [§ X.2 `$resolve` propagation][s-X-2] — propagation up the prototype chain.
- [§ X.3 Async bond ctors][s-X-3] — `$construction` interaction.

<!-- citations -->
[s-X-1]: ../X-lifecycle-internals/01-phase-queue.md
[s-X-2]: ../X-lifecycle-internals/02-resolve-propagation.md
[s-X-3]: ../X-lifecycle-internals/03-async-bond-ctors.md
