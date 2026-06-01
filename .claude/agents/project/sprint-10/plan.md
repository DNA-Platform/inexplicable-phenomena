# Sprint 10: View Diffing

The view is object-pure. Its output is determined entirely by the object's properties — no hooks, no context, no external state. This purity guarantee makes the entire state tracking system unnecessary. Don't track mutations. Don't flag dirty. Just diff.

When React calls the component: apply props, bond, call `view()`, compare output to the cached last view. If same, return the cached reference (React sees `===`, skips reconciliation). If different, cache the new output, return it (React updates the DOM). When a method mutates state between renders: tell React to check again. That's it.

Replace ~600 lines of property interception with: a view cache, a ReactNode comparator, and a re-render trigger on methods.

## Status: NOT STARTED

Last updated: 2026-04-09

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Comparator, $Bonding refactor, bond simplification, view cache |
| Arthur | Architect | Dead code removal, dependency cleanup, module simplification |
| Libby | Librarian | Doc updates, insight tracking |

## The purity guarantee

A `$Chemistry` view is a function from object-state to ReactNode. It reads from `this`, nothing else. The only mutation points are **methods** (intercepted by `$Bonding`) and **`$apply`** (runs inside the FC before view). If neither has fired, the view is unchanged.

## Architecture

### The render path (inside the FC that use() creates)

```
React calls FC(props):
  → $apply(props)                          // map props to $ properties
  → $bond()                                // orchestrate children (chemical override)
  → output = view()                        // always called — pure function of object state
  → if same(output, $viewCache$):          // fast tree comparison
      return $viewCache$                   // same reference → React skips reconciliation
  → else:
      $viewCache$ = output                 // cache new output
      return output                        // React diffs and updates DOM
```

Always call `view()`. Always return the most recent result. The cache is a reference-equality optimization — if the output matches, return the cached reference so React's `===` short-circuits. The view is never skipped and never stale.

### The method trigger (between renders)

```
Method called on chemical (increment, handleClick, etc.):
  → $Bonding intercepts → method runs → state mutates
  → call $update$({})                      // trigger React to call FC again
  → React calls FC (see above)             // pure diff handles the rest
```

No dirty flag. No state snapshots. No serialization. The comparator IS the intelligence.

### The ReactNode comparator

`same(a, b)` — walks two ReactNode trees, halts at first difference.

```typescript
function same(a: ReactNode, b: ReactNode): boolean {
    if (a === b) return true;
    if (a == null || b == null) return a == b;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return a === b;
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++)
            if (!same(a[i], (b as any[])[i])) return false;
        return true;
    }
    const ea = a as ReactElement, eb = b as ReactElement;
    if (ea.type !== eb.type || ea.key !== eb.key) return false;
    return sameProps(ea.props, eb.props);
}
```

### Bond simplification

**$Bond becomes structural metadata:**
- Keep: property, isField, isProp, isMethod, isReadable, isWritable, getter, setter, backingField
- Remove: describe() (Object.defineProperty), bondGet(), bondSet(), update(), replaceIf(), _lastSeenValue, _lastSeenArgs, _children

**$Bonding becomes method wrapper + dirty flag:**
- Keep: method wrapping, async handling
- Change: after method runs, set `$dirty$`, schedule microtask diff
- Remove: state recording, memoization via $symbolize (no serialization for rendering)

**$Molecule simplifies:**
- Keep: reactivate() to walk properties and create metadata, bonds map
- Remove: formula(), read() calls from rendering path (leave functions but don't call them)
- Change: reactivate() creates metadata bonds without Object.defineProperty

**$Reflection simplifies:**
- Keep: isSpecial() for `$`-prefix detection
- Remove: interception gating (isReactive is no longer about whether to intercept)

**Delete entirely:**
- $State class
- $Reaction.activate() / deactivate() / updateIf()
- $Bond.describe() / bondGet() / bondSet() / update()

### Catalyst correction

Moves from bondGet/bondSet to the $bond$ phase. Chemical's `[$bond$]` override:

```
[$bond$]() {
    this[$molecule$].reactivate();
    this[$orchestrator$].bond({ children: this[$children$] });
    this[$molecule$].reactivate();
    this.checkCatalysts();  // walk bonds, rebind cross-catalyst chemicals
}
```

## Epics

### E1: Foundation

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Add $viewCache$ symbol | Cathy | — | NOT STARTED |
| E1-S2 | Create diff.ts with same() and sameProps() | Cathy | — | NOT STARTED |
| E1-S3 | Test same() with unit tests for ReactNode comparison | Cathy | E1-S2 | NOT STARTED |

### E2: Bond simplification

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Strip $Bond to structural metadata | Cathy | — | NOT STARTED |
| E2-S2 | Refactor $Bonding — call $update$ after method runs | Cathy | E1-S1 | NOT STARTED |
| E2-S3 | Simplify $Molecule.reactivate() — metadata only, no Object.defineProperty | Cathy | E2-S1 | NOT STARTED |
| E2-S4 | Remove serialization calls from bond/molecule rendering paths | Cathy | E2-S1 | NOT STARTED |
| E2-S5 | Delete $State, simplify $Reaction | Arthur | E2-S2 | NOT STARTED |
| E2-S6 | Move catalyst correction to $bond$ phase | Cathy | E2-S1 | NOT STARTED |

### E3: Integration

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Wire view cache into use() FC — call view, compare, return cache or new | Cathy | E1-S2, E2-S2 | NOT STARTED |
| E3-S2 | Wire $Bonding to call $update$ after method runs | Cathy | E3-S1 | NOT STARTED |
| E3-S3 | Remove @ts-nocheck from molecule.ts | Arthur | E2-S3 | NOT STARTED |

### E4: Tests modeled on Doug's app

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | $Counter re-renders on increment() through React | Cathy | E3-S3 | NOT STARTED |
| E4-S2 | Prototypal sharing — same card, different props, correct propagation | Cathy | E3-S3 | NOT STARTED |
| E4-S3 | Async method completion triggers re-render | Cathy | E3-S3 | NOT STARTED |
| E4-S4 | @inert() property change doesn't trigger re-render | Cathy | E3-S3 | NOT STARTED |
| E4-S5 | Binding constructor receives typed children through orchestrator | Cathy | E3-S3 | NOT STARTED |

### E5: Cleanup and review

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E5-S1 | Dead code sweep — molecule.ts, reaction.ts | Arthur | E2-S5 | NOT STARTED |
| E5-S2 | Update examples for diffing model | Libby | E3-S3 | NOT STARTED |
| E5-S3 | Code review — is it clean, dense, pure, artful? | All | E5-S1 | NOT STARTED |

## Verification

- [ ] No Object.defineProperty for reactive property interception in the codebase
- [ ] same() comparator passes unit tests
- [ ] $Counter.increment() triggers re-render through $update$ → FC → view() → same() → React
- [ ] View cache returns same reference when output unchanged (React skips reconciliation)
- [ ] $State class deleted
- [ ] molecule.ts has no @ts-nocheck
- [ ] Serialization ($symbolize, $Represent) not called in any rendering path
- [ ] All existing tests pass
- [ ] New tests model Doug's app patterns
- [ ] ~600 lines interception → ~200 lines comparison
