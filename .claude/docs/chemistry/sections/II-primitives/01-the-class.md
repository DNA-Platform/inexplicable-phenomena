---
kind: catalogue-section
section: II.1
title: $Particle — the class
status: stable
---

# § II.1 `$Particle` — the class

## Definition

`$Particle` is the base class for every renderable thing in `$Chemistry`. A `$Particle` instance is the irreducible unit of the framework: it carries identity, owns its reactive state, owns its lifecycle, and produces a React element through `view()`. Sprint-27 widened the base — every particle, including ones that will never render children, allocates the full reactive carrier (`$Molecule`, `$Reaction`, `$component$`, the template-tracking slots). Composition (children, the binding constructor, the catalyst graph) is added by `$Chemical` (§ III.1) on top of this base.

The class is defined in `src/abstraction/particle.ts` (§ XV.1) and exported as `$Particle`.

## Rules

- A `$Particle` instance is constructed either with no argument (a fresh particle) or with one `particular` argument (particularization, § II.5 / § VII.1).
- Every instance receives a unique `$cid$` (§ II.3) at construction. CIDs are auto-incremented from a class-level counter.
- Every instance carries a printable `$symbol$` of the form `$Chemistry.{ClassName}[{cid}]`. The instance's `toString()` returns this symbol.
- `$type$` references the constructor function. `instance[$type$] === instance.constructor`.
- Every instance owns a `$phases$` Map keyed by phase name. Phase queues are lazily allocated on first `next(phase)` (§ II.4 / § X.1).
- Every instance owns `$molecule$` and `$reaction$` — the reactive carriers — even when they will never be exercised (§ XIII.3).
- `$template$` points to the instance that serves as the prototype template for the particle's view; the class-level template lives at `class[$$template$$]`.
- `$component$` holds the React functional component this instance is bound to; it is set by the `Component` getter (§ II.10) on first access.
- `$derivatives$` is the parent's registry of mounted derivatives (§ VI.2). It is allocated lazily and is read by `diffuse` (§ V.5) for fan-out.
- The instance's prototype is the constructor's `prototype` chain except in the particularization case, where the constructor returns the `particular` argument with the particle layer inserted into its prototype chain.

## Fields

| Field | Kind | Purpose |
|---|---|---|
| `$cid$` | symbol | Unique integer identity (§ II.3) |
| `$symbol$` | symbol | Printable identity string (§ II.3) |
| `$type$` | symbol | Reference to the constructor (§ II.3) |
| `$phases$` | symbol | Lifecycle phase queues (§ II.4, § X.1) |
| `$molecule$` | symbol | Reactive carrier — bonds and reaction set (§ XV.5) |
| `$reaction$` | symbol | Per-instance reaction unit (§ XV.6) |
| `$template$` | symbol | The prototype-template instance for this particle's view |
| `$component$` | symbol | Bound React functional component (§ II.10) |
| `$derivatives$` | symbol | Per-mount derivative registry (§ VI.2) |

## Cases

- A minimal `$Particle` subclass with a `view()` returning a single `<span>`.
- The CID sequence: three instances of the same subclass produce CIDs 1, 2, 3.
- The symbol round-trip: `instance.toString()` parses back via `$$parseCid$$` to the original instance.

## See also

- [§ II.2 `view()`][s-II-2] — the render contract a particle satisfies.
- [§ II.3 Identity][s-II-3] — the identity surface in detail.
- [§ II.4 The lifecycle][s-II-4] — phases, `next(phase)`, `$resolve`.
- [§ II.5 The `particular` argument][s-II-5] — particularization at the constructor level.
- [§ III.1 `$Chemical` — the class][s-III-1] — the composition layer above this one.
- [§ XIII.3 Particle allocates reactivity machinery][s-XIII-3] — the sprint-27 reframe.
- [`$Particle` book][book-particle] — the long-form reading on identity, lifecycle, particularization, lift, render filters, view, and component.

<!-- citations -->
[s-II-2]: ./02-view.md
[s-II-3]: ./03-identity.md
[s-II-4]: ./04-lifecycle.md
[s-II-5]: ./05-particular-argument.md
[s-III-1]: ../III-composition/01-the-class.md
[s-XIII-3]: ../XIII-caveats/03-particle-allocates-reactivity.md
[book-particle]: ../../books/particle/index.md
