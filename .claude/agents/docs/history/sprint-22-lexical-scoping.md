---
kind: concept
title: Sprint 22 — Lexical Scoping & The Beautiful API
status: stable
related:
  - sprint-23-audit-cleanup
  - particularization
  - lexical-scoping
  - reactive-bonds
  - dollar-callable
---

# Sprint 22 — Lexical Scoping & The Beautiful API

The structural rebuild. `$Particle` becomes a leaf renderable, `$Chemical` extends it for containers, `$lift` produces per-site derivatives, and `.Component` is replaced by a small dispatch surface anchored on `$`.

## Context

Before sprint 22, handing a chemical reference around and mounting it at two JSX sites produced state collisions — both Component invocations wrote to the same instance. The framework had no concept of a derivative; multi-site rendering wasn't a supported pattern. Sprint 22 introduced **lexical scoping** as the structural answer.

## What shipped

### `$Particle` as the leaf, `$Chemical` as the container

The split:

- **`$Particle`** — leaf renderable. State via props or programmatic mutation. No children. Owns bonds, reactivity, lifecycle, lexical scoping, identity, derivatives registry. JSX shape: `<Particle />` self-closing.
- **`$Chemical extends $Particle`** — container renderable. Adds the bond constructor (the named-after-class method that parses typed JSX children into args), `$BondOrchestrator`, `$ParamValidation`, `$Include`, parent/catalyst graph. JSX shape: `<Chemical>...</Chemical>`.

`$Particle` lost its `$children$` field. Children must be declared via the bond constructor's parameter list — there's no implicit `this.children`.

### Lexical scoping via prototype-chain derivatives

Each chemical now gets per-site derivatives. The mechanism:

1. **Bonds install once on the parent** as own-property accessors. Derivatives inherit accessors via the prototype chain.
2. **Each instance has its own lazy `$backing$`**. Reads cascade through the prototype chain (derivative → parent → grandparent...). Writes land on the local backing. Shadowing is automatic.
3. **Each parent tracks its derivatives** via a per-instance `$derivatives$` Set.
4. **Bond setter on parent fans out unconditionally** — walks `$derivatives$`, fires `react()` on each. No shadowing check at fan-out time (shadowing is dynamic; let React's reconciler short-circuit empty diffs).
5. **Derivatives can themselves be parents.** Three-level chains compose.
6. **Each derivative has fresh identity** — new `$cid$`, `$symbol$`, `$reaction$`, `$update$`, `$phases$`, `$phase$`. Inherits `$molecule$` and `$orchestrator$` from parent.
7. **`$lift` is the per-site derivation entry point.** Creates `Object.create(parent)` on first render at each React site, wires identity, registers with parent, sets up `useState` to hold the cid.

### The `$` dispatch surface

`.Component` was replaced by three callable forms:

```typescript
chemical.view              // identity-preserving Component, no props.
                           // Mounting at two sites -> same instance, shared state.

$(chemical)                // $Component<T>, all props optional.
                           // Mounting at two sites -> two derivatives, lexical-scoped.

$($Chemical)               // class form. TS magic:
                           //   empty bond ctor -> instance directly
                           //   bond ctor takes args -> (...args) => Component
```

`$List` was renamed `$Chemistry`. The exported `$` is dual-shape — usable as a JSX Fragment-list (`<$>...</$>`) and callable as `$(thing)`.

### Bond-ctor-runs-once-at-mount

The bond constructor body executes **once** when React first creates the Component instance at a site. Subsequent re-renders refresh typed-field bindings from new args but do not re-execute the body. The orchestrator parses the bond ctor's parameter list as the binding declaration; mount calls the body, re-render rebinds.

### Component / Element type family

| | required props (public — JSX-mounted) | all-optional props (framework — `$(x)` returns this) |
|--|--|--|
| Particle (leaf, no children) | `Element<T>` | `$Element<T>` |
| Chemical (container, children?) | `Component<T>` | `$Component<T>` |

`Component<T> = Element<T> & { children?: ReactNode }`. The `$` prefix means "framework-decorated, all-optional."

### Particularization (identity-preserving)

`new $Particle(plainObject)` no longer replaces the prototype. It now inserts a fresh particle-mixin **between** the object and its original prototype. See [particularization history][particularization].

### `$Error` and `I<T>`

Two post-21 surfaces folded into sprint 22's API: `$Error` as a renderable error type, and `I<T>` as the identity-shaped type. See [dollar-error] and [i-of-t].

## What was walked back

- **`react()` escape hatch removed.** The original framework let user code call `chemical.react()` to manually trigger a re-render. Scope tracking + bond accessors made it unnecessary; the manual API was deleted.
- **Original particularization (prototype replacement).** The `Object.setPrototypeOf(plainObject, particle)` approach broke `instanceof Error` and lost identity. Replaced by mixin insertion. See [particularization].
- **`.Component` getter on `$Chemical`.** Replaced by `chemical.view` (identity-preserving) and `$(chemical)` (lexical-scoped).
- **`$children$` on `$Particle`.** Particles are leaf renderables; they don't have children. Chemicals declare children through the bond ctor's parameter list.

## Enduring decisions

- **Derivatives chain.** `Object.create(parent)` was chosen over `Object.create(template)`. The chain preserves the prototypal-shadowing semantics that make lexical scoping work without extra bookkeeping.
- **Eager-stored `chemical.view`.** Stable React identity beats lazy creation. Cached on the instance, returned as the same function reference each access.
- **Fan-out is unconditional.** No "is this prop shadowed?" check at fan-out time. React diffs the result; if nothing changed, the reconciler short-circuits.
- **Bond ctor hooks mount, not render.** This is the key insight that made the orchestrator clean — separating the once-per-formation init from the per-render rebinding.

## Open at end of sprint

A few questions deferred to sprint 23 or later:

- Whether `$Function$` and `$Html$` (passthrough shapes) need their own type or fit `Component<T>`.
- The exact TS marker for `$($Chemical)` class-form magic.
- Whether `$Include` and `$wrap` are permanent primitives or scaffolding.

## Related

- [Sprint 23 — Audit Cleanup][sprint-23-audit-cleanup] — the polish pass that followed.
- [Particularization history][particularization] — the prototype-mixin design.
- [`$Error` history][dollar-error] — renderable errors.
- [`I<T>` history][i-of-t] — the identity-shaped type.
- [Lexical scoping concept][lexical-scoping] — the model in current terms.
- [Reactive bonds feature][reactive-bonds] — the surface that lexical scoping powers.

<!-- citations -->
[sprint-23-audit-cleanup]: ./sprint-23-audit-cleanup.md
[particularization]: ./particularization.md
[dollar-error]: ./dollar-error.md
[i-of-t]: ./i-of-t.md
[lexical-scoping]: ../chemistry/concepts/lexical-scoping.md
[reactive-bonds]: ../chemistry/features/reactive-bonds.md
[dollar-callable]: ../chemistry/features/dollar-callable.md
[sprint-22 plan]: ../../project/sprint-22/plan.md
[sprint-22 notes]: ../../project/sprint-22/notes.md
