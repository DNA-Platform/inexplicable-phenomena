---
kind: concept
title: Particularization — the carrier strategy
status: stable
---

# Particularization

The particle constructor has two modes. The default mode constructs a new particle from scratch — fresh identity, fresh phases map, prototype-chain everything from `$Particle.prototype`. The second mode, *particularization*, takes an existing object as its `particular` argument and turns *that object* into the carrier: the returned `this` is the user's original reference, with particle methods grafted on as own properties and the prototype chain re-pointed at the original object.

## The constructor-return identity trick

The first thing the [particle constructor][particle-ctor] checks is whether `particular` is already a particle:

```typescript
if (particular !== undefined && isParticle(particular)) {
    return particular as any;
}
```

JavaScript constructors that *return an object* discard the new `this` and use the returned object instead. Particularizing an already-particularized object is therefore a no-op: the user gets back the same reference, no work done. This makes `new $Subclass(x)` idempotent, which is the property the [particularization feature page][feat-particularization] depends on.

If `particular` is undefined, the constructor takes the default path: stamp [identity][] onto `this`, build the phases map, and return. This is the case for `new $Counter()`, `new $Particle()`, etc.

## Lift, sever, mark

The interesting case is `particular` being defined and not a particle. The constructor stamps identity onto `this` (which is the standard new-object) — *then* does something unusual: it lifts particle methods onto `this` as own properties, and re-points `this`'s prototype chain to the user's `particular` object.

The lift loop walks the prototype chain that `this` *currently has* (the one ending at `$Particle.prototype` and then `Object.prototype`), copying every key it finds onto `this` as own properties:

```typescript
let proto = Object.getPrototypeOf(this);
while (proto && proto !== Object.prototype) {
    for (const key of Reflect.ownKeys(proto)) {
        if (key === 'constructor') continue;
        if (Object.prototype.hasOwnProperty.call(this, key)) continue;
        const desc = Object.getOwnPropertyDescriptor(proto, key);
        if (desc) Object.defineProperty(this, key, desc);
    }
    proto = Object.getPrototypeOf(proto);
}
```

The `constructor` key is skipped (carrying it onto a foreign object's surface is asking for trouble); and any key the carrier already owns is left alone (don't shadow user data). `Object.defineProperty` with the original descriptor preserves accessor semantics — `view()` getters, bond accessors, anything that depends on getter-form survives the lift.

After the lift, the marker is stamped as an own property:

```typescript
(this as any)[$particleMarker$] = true;
```

The marker has to be an own property because the next line severs the prototype chain that previously connected to `$Particle.prototype` (where the marker is normally stamped):

```typescript
Object.setPrototypeOf(this, particular);
```

After this, `this`'s prototype chain runs `this → particular → particular's original prototype → ... → Object.prototype`. The carrier's surface looks exactly like a particle (every method present as own), but `instanceof OriginalClass` still passes because `particular`'s original prototype is still in the chain.

## What it preserves

Particularization is the framework's way of saying "make this object renderable without breaking what it already is." After particularization:

- **Identity preserved.** The reference the user passed in *is* the reference the framework hands back. No wrapping, no proxying.
- **`instanceof` against the original class still passes.** `particular`'s prototype is still in the chain (just one hop further down).
- **Own data on `particular` is reachable.** Reads that miss on `this` cascade through the chain to `particular`.
- **Particle methods work.** They live as own properties on the carrier; method dispatch finds them before the chain walk.
- **`isParticle()` returns `true`.** The marker is an own property, not chain-resolved.

What it does *not* preserve: `this instanceof $Particle` is **false**. The chain no longer goes through `$Particle.prototype`. This is why `isParticle()` exists — `instanceof $Particle` is unreliable for particularized carriers, and the framework needs a single test that works for both natural and particularized particles.

## When particularization is used

The canonical use case is [`$Error`][feat-dollar-error]: the framework lets you wrap an existing `Error` with `new $Exception(error)` and get back a renderable particle that *is still* the Error. Logs, stack traces, error-handler dispatch — all the things downstream code does with `instanceof Error` — keep working. The [particularization feature page][feat-particularization] covers the user-facing semantics; the [history page][hist-particularization] covers why the original `setPrototypeOf`-only design was walked back.

In the framework's internal layer, particularization is also how *carriers* in scoping graphs get particle behavior without inheriting from `$Particle` — the chemical layer particularizes shadow objects at lift-time when the prototype-parent is a foreign reference.

## See also

- [identity][] — why the marker has to be copied as an own property after the chain is severed.
- [feature: particularization][feat-particularization] — the user-facing semantics, with diagrams.
- [particularization history][hist-particularization] — design alternatives that were tried and walked back.
- [particularization prototype-loss caveat][cav-particularization] — what the original (replaced-prototype) design broke.

<!-- citations -->
[identity]: ./identity.md
[feat-particularization]: ../../features/particularization.md
[feat-dollar-error]: ../../features/dollar-error.md
[hist-particularization]: ../../../history/particularization.md
[cav-particularization]: ../../caveats/particularization-prototype-loss.md

[particle-ctor]: ../../../../../library/chemistry/src/abstraction/particle.ts#L45
