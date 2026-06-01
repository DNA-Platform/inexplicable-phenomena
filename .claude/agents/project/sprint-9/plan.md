# Sprint 9: Deep Read II + Archive Cleanup

Deep read for the view-diffing refactor. Study the current state tracking system, design the ReactNode comparator, map what changes in the bond system, and delete the archive. Also: compare our tests against Doug's actual test app to identify semantic gaps.

## Status: IN PROGRESS

Last updated: 2026-04-09

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Diffing algorithm design, bond simplification analysis |
| Arthur | Architect | Dependency tracing, what dies vs what survives |
| Libby | Librarian | Document findings, track insights, update docs |

## Completed investigations

### Diffing analysis (spikes/diffing-analysis.md)
**Finding:** The current property interception system (~600 lines) can be replaced by view-level diffing (~200 lines). Method interception via `$Bonding` survives and becomes the trigger. Property bonds become structural metadata without getters/setters. `$State`, `$Reaction.activate/deactivate/updateIf`, and `$Bond.describe/bondGet/bondSet` die.

### Test gap analysis (spikes/test-gap-analysis.md)
**Finding:** Doug's `../chemistry` app tests 30+ patterns we don't cover: real re-rendering, @inert() decorators, complex child binding through the orchestrator, prototypal sharing, catalyst correction, async methods, module loading. Our tests cover foundation but not the reactive developer experience.

## Actions

### A-1: Delete archive — DONE
- **What:** Remove `library/chemistry/src/archive/` directory. No live code imports from it.
- **Verify:** No imports reference `@/archive` or `./archive`.

### A-2: Update docs with diffing design — NOT STARTED  
- **What:** Update the overview's re-render model section. Document the shift from property-reactive to view-reactive.
- **Owner:** Libby

### A-3: Write sprint 10 plan — NOT STARTED
- **What:** Based on the diffing analysis, plan the actual refactor sprint.
- **Owner:** Arthur/Cathy

## Sprint 10 architecture (from the deep read)

### The ReactNode comparator

A `same(a, b)` function that walks two ReactNode trees and halts at the first difference.

```typescript
function same(a: ReactNode, b: ReactNode): boolean {
    if (a === b) return true;
    if (a == null || b == null) return a == b;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        return a.every((child, i) => same(child, (b as any[])[i]));
    }
    const ea = a as React.ReactElement;
    const eb = b as React.ReactElement;
    if (ea.type !== eb.type) return false;
    if (ea.key !== eb.key) return false;
    return sameProps(ea.props, eb.props);
}
```

### The re-render flow

```
1. Method called on chemical
2. $Bonding intercepts → method runs → $Bonding schedules microtask
3. Microtask: call view(), compare to lastView via same()
4. If same: no-op
5. If different: cache as nextView, call $update$({})
6. React calls FC → FC returns cached nextView (not calling view() again)
```

### Bond system simplification

- `$Bond` becomes ~50 lines of metadata (property name, type, is-field/method/prop)
- `$Bond.describe()` deleted — no Object.defineProperty
- `$Bonding` wraps methods and schedules diffs after call — ~80 lines
- `$Molecule.reactivate()` walks properties, creates metadata — ~60 lines
- `$State` deleted
- `$Reaction` simplified to lifecycle + the static chemicals map

### Catalyst correction without property interception

Currently in `$Bond.replaceIf()` — checks during bondGet/bondSet. Without property interception, catalyst checks move to the `$bond$` phase (chemical's override, called before view). During bond phase: walk all bond metadata, check any chemical-valued properties for catalyst mismatch, rebind if needed.

### Test acceptance criteria (from Doug's app)

Sprint 10 tests must verify:
- `$Counter.increment()` triggers re-render showing new count
- `$Card` rendered twice with different prop overrides — changes propagate correctly
- Async method completion triggers re-render
- Binding constructor receives typed children through JSX (through orchestrator, not direct call)
- @inert() properties don't trigger re-renders
