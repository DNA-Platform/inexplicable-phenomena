---
kind: concept
title: Particularization — the prototype-mixin design
status: stable
related:
  - sprint-22-lexical-scoping
  - particularization-feature
  - particularization-prototype-loss
---

# Particularization — the prototype-mixin design

The story of how `new $Particle(plainObject)` became identity-preserving. We tried prototype replacement, walked it back, settled on inserting a mixin between the object and its original prototype.

## The problem

You want any object — an `Error`, a domain entity, a parsed JSON blob — to be renderable as a particle without forcing it into a class hierarchy. The original `$Particle` constructor accepted a `particular?: object` argument and made the object a particle. The question: *how* does it become a particle?

## First attempt — replace the prototype

```typescript
// Original (broken) approach
class $Particle {
    constructor(particular?: object) {
        if (particular) {
            Object.setPrototypeOf(particular, this);
            return particular;
        }
    }
}
```

`new $Exception(myError)` would set `myError`'s prototype to a fresh `$Exception` instance, then return `myError` itself. The object kept its identity (same reference, same own properties), gained `view`, `$cid$`, `$symbol$`, the lifecycle phases, etc.

### Why it failed

`myError instanceof Error` became `false`. The original prototype was gone — replaced by `$Exception.prototype` (more accurately, a `$Exception` instance whose own prototype was `$Exception.prototype`). Any code downstream that did `instanceof` checks for `Error`, `MyDomainClass`, etc. silently broke. Library code was the worst affected: `try { ... } catch (e) { if (e instanceof MyError) ... }` started missing the cases that mattered.

This walked-back approach is captured as a caveat: see [particularization-prototype-loss] for the symptom-and-fix shape.

### Other discarded variants

- **Splice into `Error.prototype`** — patch `Error.prototype` itself with particle methods. Rejected: globally invasive, makes every `Error` instance partly-a-particle whether you wanted it or not.
- **Carrier insertion at the chain root** — swap `Object.prototype` for a particle-aware version. Rejected for similar globalness; also breaks pure objects.

## What worked — mixin between object and original prototype

The redesign:

```
Before:  error -> Error.prototype -> Object.prototype
After:   error -> mixin -> Error.prototype -> Object.prototype
```

`mixin` is a fresh object whose prototype **is** the user's original prototype, with particle methods *copied onto it as own properties*. The chain no longer goes through `$Particle.prototype` — that would force a single inheritance line. Instead, each particularized object gets its own mixin layer.

The mixin owns its own `$cid$`, `$symbol$`, `$phases$`, `$reaction$`, `$update$`. The user object owns nothing new — it just has a richer prototype chain.

## Trade-offs

What we gained:

- `error instanceof Error` survives. The original prototype is still in the chain.
- `error.message` resolves to `Error.prototype.message`. No shadowing.
- `error.view` resolves to `mixin.view`. Particle behavior works.
- `error === thatError`. Identity preserved — the user holds the same reference they passed in.

What we accepted:

- `error instanceof $Particle` is **false**. There's no `$Particle.prototype` on the chain anymore. We added `isParticle(x)` (a Symbol-marker check) as the supported test.
- Methods are copied at particularize-time. Post-hoc subclass mutation doesn't propagate to already-particularized objects. Acceptable; classes shouldn't mutate at runtime in production.

## The `$particular$` field

Sprint 22 declared a `$particular$` instance symbol but didn't read it anywhere. Sprint 23 finished the integration — `$particular$` is set on the mixin to point at the original carrier object, and lifecycle code consults it where the carrier-vs-mixin distinction matters. See [sprint 23][sprint-23-audit-cleanup] for the cleanup.

## Use case — `$Error`

The motivating example. `class $Exception extends $Particle { view() { ... } }`. Then `new $Exception(myError)` returns `myError` itself, now renderable. See [`$Error`][dollar-error] for the type design.

## Related

- [Particularization feature][particularization-feature] — current API surface.
- [Particularization prototype-loss caveat][particularization-prototype-loss] — the walked-back design as a discoverable lesson.
- [Sprint 22 — Lexical Scoping & The Beautiful API][sprint-22-lexical-scoping] — where this redesign landed.
- [Sprint 23 — Audit Cleanup][sprint-23-audit-cleanup] — where `$particular$` integration was finished.
- [`$Error` history][dollar-error] — the motivating use case.

<!-- citations -->
[sprint-22-lexical-scoping]: ./sprint-22-lexical-scoping.md
[sprint-23-audit-cleanup]: ./sprint-23-audit-cleanup.md
[dollar-error]: ./dollar-error.md
[particularization-feature]: ../chemistry/features/particularization.md
[particularization-prototype-loss]: ../chemistry/caveats/particularization-prototype-loss.md
