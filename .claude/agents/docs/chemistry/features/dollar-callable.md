---
kind: feature
title: $() — the chemistry callable
status: stable
related:
  - particle
  - chemical
  - lexical-scoping
---

# `$()` — the chemistry callable

The framework's main entry point. A single callable with multiple TypeScript overloads, dispatched at runtime by `typeof`/`instanceof` checks on the first argument.

## What it is

[`$`][dollar-export] is dual-shape: a JSX Fragment-list component when used as `<$>...</$>`, and a callable when invoked as `$(thing)`. The callable form is how user code mounts chemicals at sites, constructs class instances, and asks for lexical-scoped derivatives.

The runtime lives in `chemical.ts`. The [`$Chemistry` interface][dollar-interface] declares the typed overloads; the [`Chemistry` class][dollar-class]'s [`view()` dispatch][dollar-dispatch] is where the runtime branches on argument shape; and `export const $` is the singleton entry point.

## How it works

Four overloads:

```typescript
// JSX Fragment-list (auto-keyed)
$(props: { children?: ReactNode }): ReactNode;

// Lexical-scoped derivative from an instance
$<T extends $Particle>(thing: T): $Component<T>;

// Class form — empty bond ctor returns an instance directly
$<T extends $Particle>(klass: $ClassWithEmptyCtor<T>): T;

// Class form — bond ctor with args returns a mounting function
$<T extends $Particle, A extends any[]>(
    klass: $ClassWithArgs<T, A>
): (...args: A) => $Component<T>;
```

The runtime dispatch:

```typescript
const a = $(myParticle);            // Component — lexical-scoped derivative per mount
const b = $($MyChemical);           // instance (empty bond ctor)
const C = $($MyChemicalWithArgs);   // function — call with args, returns Component
const c = C("Pasta", 5);            // Component — derivative with bond-ctor args
```

When you mount `$(instance)` at two JSX sites, each site gets its own derivative (`Object.create(instance)`). The derivatives share state with the parent through prototype-chain reads and shadow on local writes. See [lexical scoping][lexical-scoping].

```typescript
const counter = new $Counter();
function App() {
    return <>
        {$(counter)()}    {/* derivative A */}
        {$(counter)()}    {/* derivative B — independent of A */}
    </>;
}
```

Compare with `chemical.view`, which preserves identity (mounting at two sites uses the same instance).

## Related

- [`$Particle`][particle] — what gets passed to `$()`.
- [`$Chemical`][chemical] — also passable.
- [Lexical scoping][lexical-scoping] — what happens at multiple mount sites.

## See also

- Source: [chemical.ts][chemical-src] (the `$` callable lives here, not in `particle.ts`)
- Specific: [`$Chemistry` interface][dollar-interface] · [`Chemistry` class][dollar-class] · [`view()` dispatch][dollar-dispatch] · [`$` export][dollar-export]
- Related: [`$lift`][particle-lift] in `particle.ts` (instance-form dispatch routes through here)

<!-- citations -->
[particle]: ./particle.md
[chemical]: ./chemical.md
[lexical-scoping]: ../concepts/lexical-scoping.md
[chemical-src]: ../../../../library/chemistry/src/abstraction/chemical.ts
[dollar-interface]: ../../../../library/chemistry/src/abstraction/chemical.ts#L838
[dollar-class]: ../../../../library/chemistry/src/abstraction/chemical.ts#L860
[dollar-dispatch]: ../../../../library/chemistry/src/abstraction/chemical.ts#L861
[dollar-export]: ../../../../library/chemistry/src/abstraction/chemical.ts#L934
[particle-lift]: ../../../../library/chemistry/src/abstraction/particle.ts#L215
