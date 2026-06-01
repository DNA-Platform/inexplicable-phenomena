---
kind: feature
title: instanceof through a particularized carrier
status: stable
---

# `instanceof` through a particularized carrier

## The surprise

```ts
const err = new Error('boom')
const carrier = new $Particle(err)

carrier instanceof Error    // true
carrier instanceof $Particle // true
```

A particularized particle is `instanceof` *both* the wrapping particle class and the original object's class. Most wrap-and-decorate patterns lose `instanceof` against the original — the wrapper is a different prototype chain. `$Chemistry`'s particularization design preserves it.

## Why it works

Particularization sets the *original object* as the carrier's prototype, then lifts particle methods onto the carrier's own properties. The result: walking the prototype chain from the carrier finds `Error.prototype` (via the original object's chain), so `instanceof Error` succeeds. The particle methods are own properties on the carrier, so they don't shadow original behavior.

The original object is **untouched** — its prototype is not modified. The carrier is a new object whose `[[Prototype]]` *is* the original.

## Why it's surprising

In ES2015+ class syntax, `instanceof` is a prototype-chain walk. Most "wrap an object" approaches construct a new object whose prototype is the wrapper class — losing the original's chain. Some frameworks add `Symbol.hasInstance` overrides; particularization sidesteps the override and uses the language's native check by structural construction.

A reader expecting the wrapper to break `instanceof Error` will be surprised. A reader who knows particularization sets-the-original-as-prototype will expect this behavior.

## Where to confirm it

- The pattern: [particularization (feature)][feat-particularization].
- The book chapter: [`$Particle` book — particularization][book-particularization].
- The historical caveat (the original design *did* break `instanceof`): [particularization prototype-loss][cav-prototype-loss].

<!-- citations -->
[feat-particularization]: ../../features/particularization.md
[book-particularization]: ../../books/particle/particularization.md
[cav-prototype-loss]: ../../caveats/particularization-prototype-loss.md
