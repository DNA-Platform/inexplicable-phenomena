---
kind: concept
title: Component — the lazily-cached React FC
status: stable
---

# Component

`instance.Component` is the React function-component a particle hands to JSX. It is the entry point a consumer reaches for when they want to mount a particle: `<instance.Component />` in JSX, or `$(instance)` via the `$` callable, both ultimately resolve to this getter.

The getter is a recent migration. Before sprint-27, `Component` lived only on `$Chemical`; particles had to be lifted manually to obtain a Component, or they reached one through `$()` dispatch's instance-form path. As of sprint-27 (Crystallization), `$Particle` exposes the getter directly, and `$Chemical` overrides it with a richer implementation. The two implementations have different dispatch rules — knowing which one you're touching matters.

## The `$Particle` implementation

The [`$Particle.Component` getter][particle-component-getter] is one branch. Cache check, fall back to lift:

```typescript
get Component(): Component<this> {
    if (this[$component$]) return this[$component$];
    return this[$component$] = $lift(this) as any;
}
```

Every read returns the same Component; the cache is keyed on `[$component$]`. The Component is built by [`$lift`][lift] — meaning every particle-level `Component` is a *lifted* Component. There is no template-vs-instance dispatch at the particle layer, because particles do not have synthesis or bond ctors to run. A pure-particle subclass treats every site as a fresh derivative of the (sole) instance you happen to be holding.

## The `$Chemical` override

`$Chemical` overrides the getter to handle the template-vs-derivative split. The full [`$Chemical.Component` getter][chemical-component-getter]:

```typescript
get Component(): Component<this> {
    if (this[$component$]) return this[$component$];
    if (this[$isTemplate$]) {
        this[$component$] = this[$createComponent$]() as any;
        return this[$component$]!;
    }
    this[$component$] = $lift(this) as any;
    return this[$component$]!;
}
```

Three cases, in order:

1. **Cache hit.** Return the stored Component.
2. **Template.** If the chemical *is* its class's template (per [`$isTemplate$`][is-template-getter]), build the Component via `$createComponent$` — the chemical-specific path that runs the bond ctor on first mount and the full chemical lifecycle. The template's Component is what `$($Chemical)` (the class form) produces.
3. **Derivative.** Otherwise, fall through to `$lift`. A derivative's Component does *not* run the bond ctor again; it reuses the already-constructed instance state inherited through the prototype chain.

The `$Chemical` rules thus distinguish `$($Foo)` (mount the template, run bond ctor) from `$(fooInstance)` (mount the held instance, skip bond ctor). The particle layer can't make that distinction because particles have no bond ctor. (See the chemical book's `dispatch` chapter for the full $-callable picture.)

## Why both layers carry the cache

The `[$component$]` slot is declared on `$Particle`, but `$Chemical`'s override populates it via a different path. The slot is shared; the *policy* differs. This means: read `instance.Component` once on a `$Particle` subclass and you get a lifted Component forever (idempotent, fast); on a `$Chemical` subclass, you get either the template's full-lifecycle Component or a lifted Component depending on what role the instance plays.

There is also a separate cache — `[$lifted$]` — used by `$()` dispatch's instance form. It always routes through `$lift` and never runs the bond ctor. The two caches coexist because `$(template)` and `template.Component` are *intentionally* different: the latter runs the bond ctor on mount; the former reuses an already-constructed instance. (See the chemical-layer dispatch chapter.)

## Re-binding under synthesis

The Component returned by either branch carries a `$bind(parent)` method. The synthesis layer calls this when it processes the Component as a child element of another chemical's bond — at synthesis time, the framework knows the context parent that the original Component construction did not have. `$bind` returns a *fresh* Component (re-running `$lift` or `bind()` with the new context parent) which, when mounted, threads the catalyst graph correctly. (See [lift][] for the particle-layer mechanism and the chemical book's `synthesis` chapter for chemical-layer binding.)

## See also

- [identity][] — `[$component$]`, `[$isTemplate$]`, `[$derived$]`, the slots the getter reads.
- [lift][] — the per-mount-site derivation flow that backs the particle-layer branch and the derivative-instance branch of the chemical override.
- [view][] — what runs *inside* the Component on each render.

<!-- citations -->
[identity]: ./identity.md
[lift]: ./lift.md
[view]: ./view.md

[particle-component-getter]: ../../../../../library/chemistry/src/abstraction/particle.ts#L54
[chemical-component-getter]: ../../../../../library/chemistry/src/abstraction/chemical.ts#L603
[is-template-getter]: ../../../../../library/chemistry/src/abstraction/particle.ts#L42
