---
kind: caveat
title: Cross-chemical writes inside event handlers must fan out to derivatives
status: stable
catalogue-home: XIII.1
related:
  - reactive-bonds
  - derivatives-and-fan-out
---

# Cross-chemical writes inside event handlers must fan out to derivatives

> **Catalogue home:** [§ XIII.1 Cross-chemical handler fan-out][s-XIII-1]. See also [§ V.3 Cross-chemical writes][s-V-3]. This page is preserved as the long-form companion.

[s-XIII-1]: ../sections/XIII-caveats/01-cross-chemical-fanout.md
[s-V-3]: ../sections/V-reactivity/03-cross-chemical-writes.md

Writing a held instance's reactive prop from inside *another* chemical's wrapped event handler used to land the value but skip the repaint. The fix: the scope finalizer now fans out to derivatives the way the no-scope path always did.

## The pitfall

You hold a `$Inner` instance, lift it into one site, and from a `$Outer` button's `onClick` you write `inner.$tag = 'changed'`. The new value is observably set on `inner`, but the lifted DOM stays on the old value until something else nudges the system.

```typescript
class $Inner extends $Chemical {
    $tag = 'default';
    view() { return <span>{this.$tag}</span>; }
}

class $Outer extends $Chemical {
    inner = new $Inner();
    view() {
        return <>
            <button onClick={() => { this.inner.$tag = 'changed'; }}>poke</button>
            {$(this.inner)()}
        </>;
    }
}
```

Click the button. `this.inner.$tag` is `'changed'`. The `<span>` keeps showing `default`.

## Why it happens

The bond setter in `bond.ts` has two paths:

- **No active scope** — call `chem[$reaction$].react()` *and* `fanOutToDerivatives(chem)`. Sibling derivatives wake.
- **Active scope** — record the write on the scope, defer everything to `scope.finalize()`. Event handlers run inside a scope (view augmentation wraps them in `withScope`), so this is the path that fires.

`scope.finalize()` used to call `chem[$reaction$].react()` for each dirty chemical and stop. It did *not* call `fanOutToDerivatives`. Held-instance components mounted via `$lift` (any `instance.Component` other than the class template) **are** derivatives — their `$update$` hook lives on the derivative, not on the held instance. The held instance's `react()` is a no-op without fan-out, so derivatives never woke.

## What to do instead

Nothing — the framework now does the right thing. `scope.finalize()` fans out to derivatives symmetrically with the no-scope path. Re-entrancy is safe because `withScope` clears `$currentScope` *before* calling `finalize()`, so any cascading reads or writes during fan-out fire as out-of-scope writes through the regular path.

If you see the symptom on a build that predates the fix, manually re-render the held component (e.g. force a parent state change) until you upgrade.

## History

- 2026-04-28 — discovered during [sprint-24][sprint-24 plan] regression-test development. Fixed in the same sprint by making `scope.finalize()` walk `$derivatives$` after firing each chemical's `react()`.

## Related

- [reactive bonds][reactive-bonds] — feature page describing how bond accessors install on the instance and how writes propagate.
- [derivatives and fan-out][derivatives-and-fan-out] — concept page explaining `$derivatives$` and the parent-write propagation rule.

<!-- citations -->
[reactive-bonds]: ../features/reactive-bonds.md
[derivatives-and-fan-out]: ../concepts/derivatives-and-fan-out.md
[sprint-24 plan]: ../../../project/sprint-24/plan.md
