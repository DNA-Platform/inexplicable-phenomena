---
kind: index
title: $Particle — book
status: evolving
---

# `$Particle` — book

The `$Particle` book is a deep-dive on the leaf-with-reactivity base class. It covers what every renderable in chemistry inherits before the composition layer arrives: identity (printable, template, reactive-carrier), the construction sequence, the awaitable lifecycle, prototype-mixin particularization, per-mount-site derivation via `$lift`, the cross-cutting render-filter chain, the `view()` boundary, and the `Component` getter that JSX consumers actually touch. The corresponding source lives in [`particle.ts`][particle-src]; this book is the narrative that source no longer carries inline.

Sprint-27 (Crystallization) widened the book's scope. The reactive machinery — `$Molecule`, `$Reaction`, the `Component` getter, the template-tracking slots (`$$template$$`, `$isTemplate$`, `$derived$`) — used to live one layer up in `$Chemical`. As of sprint-27 they all sit on `$Particle`, which means *every* particle is a fully-reactive carrier in its own right; `$Chemical` adds composition (children, synthesis, catalyst graph) on top of an already-reactive base. Several chapters here now cover surfaces that the chemical book used to own.

A reader new to `$Particle` should read in the order below — each chapter assumes the prior ones. A reader returning for a specific topic can jump straight to the relevant chapter; cross-links thread back to dependencies.

## Chapters in reading order

1. **[identity][]** — `$cid$`, `$symbol$`, `$type$`, the static symbol-creation machinery, `isParticle()`, and (sprint-27) the template slots (`$template$`, `$$template$$`, `$isTemplate$`, `$derived$`) plus the reactive-carrier slots (`$molecule$`, `$reaction$`, `$component$`). Read this first; everything downstream assumes a particle has identity.
2. **[lifecycle][]** — the construction sequence (sprint-27: now allocates molecule, reaction, and template registration), the phase order, `next(phase)`, `$resolve$`, the queued-resolver mechanism, and the prototype-chain propagation that lets a parent's `next('mount')` resolve when a derivative mounts. Includes the `'construction'` side-channel.
3. **[particularization][]** — the constructor's second mode: lift particle methods onto an existing object as own properties, then sever the prototype chain to point at that object. Preserves identity and `instanceof` against the original type.
4. **[lift][]** — `$lift`, the per-React-mount-site derivation pattern. Each mount produces a fresh `Object.create(parent)` derivative with its own identity, registered into `parent[$derivatives$]` for fan-out. Cross-links to the bond layer's write-time fan-out.
5. **[render filters][]** — the cross-cutting filter chain consulted between `$apply(props)` and `view()`. The default filter implements `$show`/`$hide`; `registerFilter` is the framework-extender API for cross-cutting concerns (loading, error, gating).
6. **[view][]** — the `view()` boundary, view augmentation (event-handler scope wiring), `$rendering$`, and `$viewCache$`.
7. **[component][]** — the lazily-cached `Component` getter: the JSX-facing entry point a consumer mounts. Covers the `$Particle` branch (always lifts) and the `$Chemical` override (template vs derivative dispatch), and how `$bind` re-binds under synthesis.

## Cross-links

- [Catalogue][] — the wiki's full reading list, with this book linked under "By book."
- [Chemistry overview][] — the framework's metaphor and layer model.
- [Concepts: lexical scoping][lexical-scoping] and [derivatives and fan-out][derivatives] — the model layer that the [lift][] chapter implements.
- [Feature: `$Particle`][feat-particle] — the surface-level reference page; this book replaces and expands its "How it works" section.

<!-- citations -->
[identity]: ./identity.md
[lifecycle]: ./lifecycle.md
[particularization]: ./particularization.md
[lift]: ./lift.md
[render filters]: ./render-filters.md
[view]: ./view.md
[component]: ./component.md

[Catalogue]: ../../../catalogue.md
[Chemistry overview]: ../../overview.md
[lexical-scoping]: ../../concepts/lexical-scoping.md
[derivatives]: ../../concepts/derivatives-and-fan-out.md
[feat-particle]: ../../features/particle.md
[particle-src]: ../../../../../library/chemistry/src/abstraction/particle.ts
