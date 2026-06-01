---
kind: feature
title: $Particle
status: stable
related:
  - chemical
  - dollar-callable
  - reactive-bonds
  - lexical-scoping
  - lifecycle-phases
---

# `$Particle`

The leaf renderable, and — as of sprint-27 (Crystallization) — the framework's reactive-carrier base class. State via props or programmatic mutation. No children. JSX shape: `<Particle />` self-closing.

This page is a high-level overview. For the deep narrative — identity surface, construction sequence, lifecycle phases, particularization, lift, render filters, view, the `Component` getter — see the [`$Particle` book][particle-book].

## What it is

`$Particle` is the base class for anything renderable in chemistry. It owns the machinery that makes a chemical *act* like a chemical: identity (`$cid$`, `$symbol$`, `$type$`, plus template slots `$template$` / `$$template$$` / `$isTemplate$` / `$derived$`), reactive carriers (`$molecule$`, `$reaction$`, `$component$`), lifecycle (`next(phase)`), lexical scoping (the per-site derivatives registry), the `Component` getter, and the `view()` method that produces JSX. A particle is for things that are leaves in the JSX tree — no children declaration, no bond constructor parsing.

If you need children, you want [`$Chemical`][chemical] instead. If you're writing framework internals (`$Function$`, `$Html$`) or a wrapper around a non-particle object, `$Particle` is the right base.

Sprint-27 widened the base class. The reactive machinery (`$Molecule`, `$Reaction`, `Component`, the template-tracking slots) used to live on `$Chemical`; it now lives on `$Particle`. Every particle is a fully-reactive carrier in its own right, and `$Chemical` adds composition (children, synthesis, catalyst graph) on top. See the caveat: [particle allocates reactivity machinery][caveat-allocates] for the cost trade-off.

## How it works

A [`$Particle`][particle-class] subclass declares reactive props (any field whose name starts with `$`) and a `view()` method. At construction time the [particle constructor][particle-ctor] wires identity (allocates a `$cid$`, builds a `$symbol$`), allocates the reactive machinery (a fresh `$Molecule` and `$Reaction`), registers the class template (first instance becomes `cls[$$template$$]`), and only then runs particularization if a foreign object was passed. The bond machinery installs accessors as **own properties on the instance** — never on the prototype.

```typescript
class $Counter extends $Particle {
    $count = 0;
    view() {
        return <button onClick={() => this.$count++}>
            {this.$count}
        </button>;
    }
}
```

When you mount `<$Counter />` (via `$($Counter)` or `chemical.view`), the framework runs the lifecycle phases (`setup` → `mount` → `ready`), invokes `view()`, and renders the result. Writes to `$count` from event handlers fire reactivity — the bond accessor records the write, the scope finalizes, and the component re-renders.

A particle can be **lifted** to multiple sites. [`$lift`][particle-lift] produces a fresh derivative (`Object.create(parent)`) per render site, each with its own identity and `$backing$`. Reads cascade through the prototype chain to the parent's backing; writes shadow on the local backing. See [lexical scoping][lexical-scoping].

## Caveats

- [Particle allocates reactivity machinery][caveat-allocates] — every particle now allocates `$Molecule` and `$Reaction` at construction, even if it never forms bonds (sprint-27 trade-off).
- [Cross-chemical handler fanout][cross-chemical-handler-fanout] — writing a held particle's prop from another chemical's event handler used to skip the lifted-DOM repaint. Fixed in sprint 24.
- [Short prop name instability][short-prop-name] — single-letter reactive props (`$v`, `$x`) showed inconsistent behavior in regression tests. Use names ≥ 2 letters until proven safe.

## Related

- [`$Chemical`][chemical] — extends `$Particle` for containers with children.
- [`$()` callable][dollar-callable] — how to mount a particle at a site.
- [Reactive bonds][reactive-bonds] — how `$`-prefixed props become reactive.
- [Lifecycle phases][lifecycle-phases] — `setup`, `mount`, `ready`, `next(phase)`.
- [Lexical scoping][lexical-scoping] — multi-site rendering of one particle.

## See also

- Source: [particle.ts][particle-src]
- Specific: [`$Particle` class][particle-class] · [constructor][particle-ctor] · [`next(phase)`][particle-next] · [`$lift`][particle-lift]
- Tests: [particle test directory][particle-tests]

<!-- citations -->
[chemical]: ./chemical.md
[dollar-callable]: ./dollar-callable.md
[reactive-bonds]: ./reactive-bonds.md
[lifecycle-phases]: ./lifecycle-phases.md
[lexical-scoping]: ../concepts/lexical-scoping.md
[particle-book]: ../books/particle/index.md
[caveat-allocates]: ../caveats/particle-allocates-reactivity-machinery.md
[cross-chemical-handler-fanout]: ../caveats/cross-chemical-handler-fanout.md
[short-prop-name]: ../caveats/short-prop-name-instability.md
[particle-src]: ../../../../library/chemistry/src/abstraction/particle.ts
[particle-class]: ../../../../library/chemistry/src/abstraction/particle.ts#L25
[particle-ctor]: ../../../../library/chemistry/src/abstraction/particle.ts#L59
[particle-next]: ../../../../library/chemistry/src/abstraction/particle.ts#L110
[particle-lift]: ../../../../library/chemistry/src/abstraction/particle.ts#L229
[particle-tests]: ../../../../library/chemistry/tests/abstraction/
