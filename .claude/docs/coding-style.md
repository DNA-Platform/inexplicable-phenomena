---
kind: concept
title: Coding style
status: stable
related:
  - chemistry-overview
  - chemistry-glossary
  - feat-particle
  - feat-chemical
---

# Coding style

How identifiers in this project are chosen. Observed in the parts of `particle.ts`, `chemical.ts`, `atom.ts`, and `symbols.ts` Doug authored.

## What it is

Names are chosen for *resonance* — they read with their neighbors, in a single shared register, with the shortest form that still carries the meaning. Reading the chemistry framework should feel like reading a chemistry text, not a software manual. If a name jars against its siblings, it is the name that is wrong.

This page captures the rules of that register so the team can apply them as a check rather than a feeling.

## The chemistry register

The framework's vocabulary is chemistry. Names should read as chemistry, not as networking, OS jargon, React, or generic software. Single words preferred whenever one fits.

Canonical examples already in the codebase:

- Classes: `$Particle`, `$Chemical`, `$Atom`, `$Bond`, `$Reagent`, `$Reflection`, `$Molecule`, `$Reaction`, `$Catalyst`, `$Orchestrator`.
- Methods: `react()`, `form()`, `double()`, `bond()`, `reactivate()`.
- Concepts: catalyst, reagent, derivative, fan-out (under review), construction.

A name like `fanOutToDerivatives` is the canonical bad smell — four words, mixed register (networking jargon), inside a chemistry framework. A single chemistry verb (e.g. `diffuse`) carries the whole meaning at the right register.

## The `$` membrane

`$` prefix means **intrinsic identity** — the part of a thing that belongs to it inherently, separated from extrinsic context. It is *not* a privacy marker.

```typescript
class $Particle {
    [$cid$]: number;        // intrinsic — part of every particle
    [$type$]: typeof this;
    $show?: boolean;        // intrinsic prop — cross-cutting render state
    $hide?: boolean;
}
```

When you see `$x` you should read "this `x` is part of `x`'s identity, not something passed in from outside." See the project memory's `project_dollar_membrane.md` concept for the longer discussion of how this was discovered through element examples.

## The `$$x$$` symbol-keyed pattern

When something must live below the type system — typically because it is `any` or `unknown` at the framework boundary, or because exposing it would pollute the public surface — it gets a `Symbol` named with the double-bracketed form.

```typescript
export const $$getNextCid$$ = Symbol("$Particle.static.getNextCid");
export const $$createSymbol$$ = Symbol("$Particle.static.createSymbol");
export const $$template$$    = Symbol("$Particle.static.template");

class $Particle {
    static [$$getNextCid$$](): number { return $Particle.#nextCid++; }
}
```

Read `$$x$$` as "this is `x`, but hidden — held by symbol so only the framework can name it." Public class surfaces stay clean; framework internals stay reachable.

## Brevity captures essence

Single-word verbs for methods. Single-word nouns for properties. Multi-word identifiers signal that the concept hasn't been compressed yet — and a long *method body* that won't compress is sometimes a sign the abstraction itself is wrong.

When a single word doesn't fit, write the longer form, then keep looking. The right word often arrives later, after the surrounding names have settled.

## Grammatical mood matters

Methods are verbs. Classes are nouns. Properties are nouns or noun-phrases. The mood is enforced as strictly as the vocabulary.

```typescript
bond.form()           // verb on a noun — correct
bond.formBond()       // redundant — `bond` already names the subject
bond.doFormation()    // gerund-ish — the verb has been smothered
```

`react()`, `next()`, `view()`, `mount()`, `render()`, `bond()` — all single verbs. `$Bond`, `$Molecule`, `$Reaction` — all single nouns.

## The `_` prefix means "private"

`_chemical`, `_property`, `_descriptor`, `_bondConstructor`, `_parameters`, `_isModified`. The `_` prefix is the conventional privacy marker — distinct from `$`.

```typescript
class $BondOrchestrator {
    private _chemical: T;
    private _bondConstructor?: Function;
}
```

Two prefixes, two meanings. `$` is intrinsic identity; `_` is privacy. They compose: a private intrinsic field is `_$x` (rare, but the membrane is honored).

## Local context drives canonical choice

At every scale — variable inside a method, method on a class, class in a module — the right name is what *fits* with its neighbors. The same word is right in one context and wrong in another.

This is why the rename methodology starts with **survey siblings**. You cannot pick a name in isolation; you can only pick one that resonates with what's already there. If nothing resonates, the implicit canonical may not yet be named — find it, name it, then align everything to it.

## Related

- [chemistry overview][chemistry-overview] — the layered architecture this style serves.
- [chemistry glossary][chemistry-glossary] — every term in the register, in one place.
- [`$Particle`][feat-particle], [`$Chemical`][feat-chemical] — canonical illustrations of the style.

## See also

- Source: [particle.ts][src-particle], [chemical.ts][src-chemical], [atom.ts][src-atom], [symbols.ts][src-symbols]

<!-- citations -->
[chemistry-overview]: ./chemistry/overview.md
[chemistry-glossary]: ./chemistry/glossary.md
[feat-particle]: ./chemistry/features/particle.md
[feat-chemical]: ./chemistry/features/chemical.md
[src-particle]: ../../library/chemistry/src/abstraction/particle.ts
[src-chemical]: ../../library/chemistry/src/abstraction/chemical.ts
[src-atom]: ../../library/chemistry/src/abstraction/atom.ts
[src-symbols]: ../../library/chemistry/src/implementation/symbols.ts
