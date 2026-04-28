---
kind: feature
title: Reactive bonds
status: stable
related:
  - particle
  - chemical
  - derivatives-and-fan-out
  - lifecycle-phases
---

# Reactive bonds

Property accessors that react to writes. Any `$`-prefixed instance field on a `$Particle` (or `$Chemical`) becomes a reactive *bond* — writes go through a setter that records the change, fires the chemical's `react()`, and fans out to derivatives.

## What it is

A [`$Bond`][bond-class] is the reactive layer for a single property. [`$Bond.form()`][bond-form] installs a get/set accessor (via the [`activate`][bond-activate] helper) that intercepts reads and writes:

- **Read** — looks through the chemical's `$backing$`, which cascades through the prototype chain (derivative → parent).
- **Write** — lands on the chemical's local `$backing$` (creating it if needed), records the write on the active scope (or fires `react()` immediately if no scope is active), and fans out to derivatives via the `$derivatives$` registry.

The bond accessors are **own properties on the instance, not on the class prototype.** This was confirmed by [SP-1][sp1] in sprint 24 — the framework already does the right thing here, contrary to a common misconception. Class objects stay inert; instances are self-describing.

## How it works

Declare a reactive prop. Use it in `view()`. Writes from any code path — including event handlers in other chemicals — trigger re-render.

```typescript
class $Counter extends $Particle {
    $count = 0;                          // reactive bond installed at instance reactivation
    view() {
        return <button onClick={() => this.$count++}>
            {this.$count}
        </button>;
    }
}
```

Two write paths:

- **Out-of-scope write** — direct setter call, no active scope. The setter calls `chem[$reaction$].react()` *and* [`diffuse(chem)`][scope-diffuse]. Sibling derivatives wake.
- **In-scope write** — setter records the write on the active scope, defers to [`$Scope.finalize()`][scope-finalize]. The finalizer fires `react()` per dirty chemical *and* fans out to derivatives via [`diffuse`][scope-diffuse]. Re-entrancy is safe because [`withScope`][scope-with-scope] clears `$currentScope` before calling `finalize()`.

Event handlers run inside an active scope (view augmentation wraps them in [`withScope`][scope-with-scope]), so handler writes use the in-scope path. Code outside the React tree (timers, promises) usually has no scope and uses the out-of-scope path.

## Caveats

- [Cross-chemical handler fanout][cross-chemical-handler-fanout] — historical bug where the in-scope path's finalizer didn't fan out to derivatives. Fixed in sprint 24. Documented because the symptom (write lands but DOM doesn't repaint) is recognizable and easy to misdiagnose.
- [Short prop name instability][short-prop-name] — `$v`, `$x`, `$y` and other single-letter reactive props show inconsistent behavior in some scenarios. Use names ≥ 2 letters after the `$` until investigated.

## Related

- [`$Particle`][particle] — reactive bonds live on every particle.
- [`$Chemical`][chemical] — same machinery, since `$Chemical extends $Particle`.
- [Derivatives and fan-out][derivatives-and-fan-out] — how parent writes propagate to derivative components.

## See also

- Source: [bond.ts][bond-src], [scope.ts][scope-src], [molecule.ts][molecule-src]
- Specific: [`$Bond` class][bond-class] · [`$Bond.form()`][bond-form] · [`activate` helper][bond-activate] · [`$Reagent`][bond-reagent] · [`$Reflection`][bond-reflection] · [`$Scope`][scope-class] · [`$Scope.finalize()`][scope-finalize] · [`diffuse`][scope-diffuse] · [`withScope`][scope-with-scope]
- SP-1 finding: [lift derivative compatibility][sp1]

<!-- citations -->
[particle]: ./particle.md
[chemical]: ./chemical.md
[derivatives-and-fan-out]: ../concepts/derivatives-and-fan-out.md
[cross-chemical-handler-fanout]: ../caveats/cross-chemical-handler-fanout.md
[short-prop-name]: ../caveats/short-prop-name-instability.md
[bond-src]: ../../../../library/chemistry/src/abstraction/bond.ts
[bond-class]: ../../../../library/chemistry/src/abstraction/bond.ts#L85
[bond-form]: ../../../../library/chemistry/src/abstraction/bond.ts#L120
[bond-activate]: ../../../../library/chemistry/src/abstraction/bond.ts#L164
[bond-reagent]: ../../../../library/chemistry/src/abstraction/bond.ts#L195
[bond-reflection]: ../../../../library/chemistry/src/abstraction/bond.ts#L33
[scope-src]: ../../../../library/chemistry/src/implementation/scope.ts
[scope-class]: ../../../../library/chemistry/src/implementation/scope.ts#L56
[scope-finalize]: ../../../../library/chemistry/src/implementation/scope.ts#L78
[scope-diffuse]: ../../../../library/chemistry/src/implementation/scope.ts#L107
[scope-with-scope]: ../../../../library/chemistry/src/implementation/scope.ts#L126
[molecule-src]: ../../../../library/chemistry/src/abstraction/molecule.ts
[sp1]: ../../../project/sprint-24/spikes/lift-derivative-compatibility.md
