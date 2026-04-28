---
kind: feature
title: Particularization
status: stable
related:
  - particle
  - dollar-error
  - particularization-history
---

# Particularization

Make any object renderable as a particle without forcing it into a class hierarchy. `new $Subclass(obj)` returns the same object reference, with particle methods composed in via prototype-mixin insertion.

## What it is

Particularization is the framework's answer to "how do I make this `Error` (or domain entity, or parsed JSON) renderable?" without wrapping it. The result is the same object reference the user passed in — same identity, same `instanceof` checks for the original class, plus `view()`, `$cid$`, `$symbol$`, lifecycle, reactivity.

## How it works

When `$Particle`'s constructor receives an existing object as its `particular` argument, it inserts a fresh particle-mixin between the object and its original prototype:

```
Before:  thing -> OriginalClass.prototype -> Object.prototype
After:   thing -> mixin -> OriginalClass.prototype -> Object.prototype
```

The mixin is a fresh object whose prototype is the user's *original* prototype. Particle methods (`view`, lifecycle, `$apply`, etc.) are copied onto the mixin as **own properties** — not inherited from `$Particle.prototype` — because the chain no longer goes through there. The mixin owns its own framework state: `$cid$`, `$symbol$`, `$phases$`, `$reaction$`, `$update$`.

```typescript
class $Exception extends $Particle {
    view() { return <div className="error">{this.message}</div>; }
}

const original = new Error("boom");
const e = new $Exception(original);

e === original;            // true — identity preserved
e instanceof Error;        // true — Error.prototype still in chain
e.message;                 // "boom" — resolves through chain to Error own prop
e.view();                  // runs $Exception.view
isParticle(e);             // true — Symbol-marker check
```

Two trade-offs to know:

- `e instanceof $Particle` is **false**. Use `isParticle(x)` instead (the supported test).
- Mixin methods are copied at particularize-time. Post-hoc subclass mutation does not propagate to already-particularized objects.

## Caveats

- [Particularization prototype-loss][particularization-prototype-loss] — the original (walked-back) design replaced the prototype and broke `instanceof Error`. Historical; documents *why* the framework now does mixin insertion.

## Related

- [`$Particle`][particle] — the base for particularizable classes.
- [`$Error`][dollar-error] — the canonical particularization use case.
- [Particularization history][particularization-history] — the design story, including discarded approaches.

## See also

- Source: [particle.ts][particle-src]

<!-- citations -->
[particle]: ./particle.md
[dollar-error]: ./dollar-error.md
[particularization-prototype-loss]: ../caveats/particularization-prototype-loss.md
[particularization-history]: ../../history/particularization.md
[particle-src]: ../../../../library/chemistry/src/abstraction/particle.ts
