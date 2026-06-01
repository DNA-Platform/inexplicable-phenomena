---
kind: concept
title: Lexical scoping
status: stable
catalogue-home: VI
related:
  - derivatives-and-fan-out
  - reactive-bonds
  - dollar-callable
  - particle
---

# Lexical scoping

> **Catalogue home:** the normative treatment of this concept now lives in [§ VI Lexical Scoping][s-VI] — see [§ VI.1 Per-mount derivatives][s-VI-1], [§ VI.2 The `$derivatives$` registry][s-VI-2], and [§ VI.3 The ownership gate][s-VI-3]. This page is preserved as the long-form companion.

[s-VI]: ../sections/VI-lexical-scoping/
[s-VI-1]: ../sections/VI-lexical-scoping/01-per-mount-derivatives.md
[s-VI-2]: ../sections/VI-lexical-scoping/02-derivatives-registry.md
[s-VI-3]: ../sections/VI-lexical-scoping/03-ownership-gate.md

The model that makes multi-site rendering of a single chemical correct. Mounting one instance at two JSX sites produces two **derivatives** — fresh `Object.create(parent)` instances with their own backing, identity, and lifecycle — that share state via the prototype chain.

## The problem

Before lexical scoping, a chemical rendered at two sites collided: both Component invocations wrote to the same instance. A user holding a reference to a chemical and putting it into JSX twice got bizarre cross-talk.

## The model

A chemical mounted at site A and site B gets two derivatives, `D_A` and `D_B`, each `Object.create(parent)`:

```
parent (the original instance)
  ├── D_A (rendered at site A)
  └── D_B (rendered at site B)
```

- **Reads cascade**. `D_A.$prop` walks the prototype chain to `parent`'s backing if `D_A` has no own backing for `$prop`.
- **Writes shadow**. `D_A.$prop = 'x'` lands on `D_A`'s own backing. `D_B`'s read still sees `parent`'s value.
- **Parent writes fan out**. `parent.$prop = 'y'` walks `parent[$derivatives$]` and fires `react()` on each derivative. Both `D_A` and `D_B` re-render. The shadowed one (if it had its own value) reads its own; the unshadowed reads parent's new value.
- **Each derivative has its own identity**. Fresh `$cid$`, `$symbol$`, `$reaction$`, `$update$`, `$phases$`. Inherits `$molecule$` and `$orchestrator$` from parent.
- **Chains compose**. A derivative can itself be a parent. Three-level chains fan out the same way: parent writes wake direct children → those children's setters fire their own derivatives → propagation continues.

## How derivatives are produced

`$lift` is the per-site entry point. The framework's [`$()`][dollar-callable] callable, when given an instance, returns a Component that calls `$lift` on first render. Each React mount of that Component creates a fresh derivative bound to that React position via `useState`. Subsequent re-renders at the same site reuse the derivative; unmount cleans it up from `parent[$derivatives$]`.

`chemical.view` is the contrast: identity-preserving. Mounting `chemical.view` at two sites uses the *same* instance — no derivative, no isolation. Use `chemical.view` for "this chemical literally appears here"; use `$(chemical)` for "give each site its own state-isolated derivative."

## Why this works

Prototypal shadowing — the same mechanism JavaScript classes use for inheritance — gives lexical scoping for free at runtime. The framework just has to:

1. Make derivatives via `Object.create`.
2. Register them with the parent (`$derivatives$` Set).
3. Fan out parent writes to registered derivatives.

Reads naturally find the right value via the prototype chain. Shadowing happens automatically when a derivative writes its own backing. Cleanup is bounded — derivatives remove themselves from the registry on unmount.

## Related

- [Derivatives and fan-out][derivatives-and-fan-out] — the mechanism in detail.
- [Reactive bonds][reactive-bonds] — what gets propagated.
- [`$()` callable][dollar-callable] — the API that creates derivatives.
- [`$Particle`][particle] — where lexical scoping lives.

<!-- citations -->
[derivatives-and-fan-out]: ./derivatives-and-fan-out.md
[reactive-bonds]: ../features/reactive-bonds.md
[dollar-callable]: ../features/dollar-callable.md
[particle]: ../features/particle.md
