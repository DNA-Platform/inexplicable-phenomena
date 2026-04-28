---
kind: caveat
title: Particularization originally lost prototype identity
status: historical
related:
  - particularization
  - particularization-history
---

# Particularization originally lost prototype identity

The first version of `new $Particle(plainObject)` replaced the object's prototype, breaking `instanceof` checks for the object's original class. Resolved in sprint 22 by switching to a mixin-insertion design.

## The pitfall

The original implementation:

```typescript
// Pre-sprint-22 (broken)
class $Particle {
    constructor(particular?: object) {
        if (particular) {
            Object.setPrototypeOf(particular, this);
            return particular;
        }
    }
}
```

`new $Exception(myError)` set `myError`'s prototype to a `$Exception` instance. The error reference was preserved (you got back the same object), and it gained particle methods. But:

```typescript
const e = new $Exception(myError);
e === myError;            // true — identity preserved
e instanceof Error;       // FALSE — original prototype lost
e.message;                // worked because `message` is on the error's own properties,
                          // but Error.prototype methods (and any subclass's) were gone
```

Any consumer doing `instanceof Error` (a common pattern in catch blocks, logging libraries, framework code) silently failed to recognize the particularized error.

## Why it happens

`Object.setPrototypeOf(error, particle)` doesn't *insert* into the chain — it *replaces* the chain. `error → Error.prototype → Object.prototype` becomes `error → particle → $Particle.prototype → Object.prototype`. The `Error.prototype` link is gone; `instanceof Error` walks the chain, doesn't find `Error.prototype`, returns `false`.

The original design assumed users only cared about the object's identity-as-reference (does `=== myError` hold?) and didn't notice that *type* identity was a different invariant.

## What to do instead

This is fixed. Sprint 22 replaced prototype replacement with **mixin insertion**:

```
Before:  error -> Error.prototype -> Object.prototype
After:   error -> mixin -> Error.prototype -> Object.prototype
```

The mixin layer is a fresh object whose prototype *is* the user's original prototype, with particle methods copied as own properties. `instanceof Error` walks the chain, finds `Error.prototype`, returns `true`. See the [particularization history page][particularization-history] for the full design.

The trade-off: `instanceof $Particle` now returns `false` (there's no `$Particle.prototype` in the chain). Use `isParticle(x)` (a Symbol-marker check) as the supported test.

## History

- Pre-sprint-22 — original implementation; broke `instanceof Error`.
- 2026 sprint-22 — replaced with mixin insertion design. See [history page][particularization-history].

## Related

- [Particularization feature][particularization] — current API.
- [Particularization history][particularization-history] — the redesign story, including walked-back variants (global Error.prototype splice, carrier insertion).

<!-- citations -->
[particularization]: ../features/particularization.md
[particularization-history]: ../../history/particularization.md
