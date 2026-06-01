---
kind: feature
title: $Chemical
status: stable
related:
  - particle
  - dollar-callable
  - reactive-bonds
  - lifecycle-phases
---

# `$Chemical`

The container renderable. Extends `$Particle` and adds the bond constructor — the named-after-the-class method that parses typed JSX children into args. JSX shape: `<Chemical>...</Chemical>`.

## What it is

`$Chemical extends $Particle`. Where `$Particle` is for leaves, `$Chemical` is for containers — components that take JSX children and want them parsed into typed arguments (rather than passed through opaquely as `props.children`).

The headline feature is the **bond constructor**: a method whose name matches the class. It runs once per mount, receives the children as typed args (validated and coerced by the orchestrator), and binds them to typed instance fields.

## How it works

```typescript
class $List extends $Chemical {
    items: $Item[] = [];
    $List(...items: $Item[]) {
        this.items = items;
    }
    view() {
        return <ul>{this.items.map(i => $(i)())}</ul>;
    }
}

// JSX usage
<List>
    <Item />
    <Item />
</List>
```

The [orchestrator][chemical-synthesis] parses the bond ctor's parameter list at class-definition time. At mount, [`$Synthesis.bond()`][chemical-synthesis-bond] processes `props.children`, validates each against the parameter types, calls `$List(...children)` once, and binds the args to typed fields. On re-render with different children, the orchestrator refreshes the typed fields **without re-executing the body** — React owns mount/unmount; the bond ctor hooks the *mount* event, not the *render* event.

[`$Chemical`][chemical-class] adds: [`$Synthesis`][chemical-synthesis] (the parser), [`$ParamValidation`][chemical-param-validation], [`$Include`][chemical-include] (for forward declarations of nested types), and the parent/catalyst graph (the [`$parent` setter][chemical-parent-setter]) that lets a chemical track its context parent. The [`$Chemical` constructor][chemical-ctor] wires identity, molecule, reaction, and synthesis at instance creation.

## Caveats

- [Cross-chemical handler fanout][cross-chemical-handler-fanout] — writes from one chemical's event handler to another chemical's reactive prop must propagate through the scope finalizer's fan-out path. Fixed in sprint 24.

## Related

- [`$Particle`][particle] — the leaf base class.
- [`$()` callable][dollar-callable] — how to mount or construct a chemical from code.
- [Reactive bonds][reactive-bonds] — the reactive-prop machinery shared with `$Particle`.
- [Lifecycle phases][lifecycle-phases] — when the bond ctor runs vs. when the body re-binds.

## See also

- Source: [chemical.ts][chemical-src]
- Specific: [`$Chemical` class][chemical-class] · [constructor][chemical-ctor] · [`Component` getter][chemical-component] · [`$Synthesis`][chemical-synthesis] · [`$Synthesis.bond()`][chemical-synthesis-bond] · [`$ParamValidation`][chemical-param-validation] · [`$Include`][chemical-include] · [`$parent` setter][chemical-parent-setter]
- Tests: [chemical test directory][chemical-tests]

<!-- citations -->
[particle]: ./particle.md
[dollar-callable]: ./dollar-callable.md
[reactive-bonds]: ./reactive-bonds.md
[lifecycle-phases]: ./lifecycle-phases.md
[cross-chemical-handler-fanout]: ../caveats/cross-chemical-handler-fanout.md
[chemical-src]: ../../../../library/chemistry/src/abstraction/chemical.ts
[chemical-class]: ../../../../library/chemistry/src/abstraction/chemical.ts#L556
[chemical-ctor]: ../../../../library/chemistry/src/abstraction/chemical.ts#L619
[chemical-component]: ../../../../library/chemistry/src/abstraction/chemical.ts#L604
[chemical-synthesis]: ../../../../library/chemistry/src/abstraction/chemical.ts#L141
[chemical-synthesis-bond]: ../../../../library/chemistry/src/abstraction/chemical.ts#L159
[chemical-param-validation]: ../../../../library/chemistry/src/abstraction/chemical.ts#L318
[chemical-include]: ../../../../library/chemistry/src/abstraction/chemical.ts#L802
[chemical-parent-setter]: ../../../../library/chemistry/src/abstraction/chemical.ts#L576
[chemical-tests]: ../../../../library/chemistry/tests/abstraction/
