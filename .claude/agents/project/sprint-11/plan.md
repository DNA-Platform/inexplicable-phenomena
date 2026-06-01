# Sprint 11: Unification

Merge augmentation and diffing into a single chemistry-aware tree walk. The orchestrator's `augmentView()` already walks the view tree, transforms chemistry nodes, and tracks whether anything changed — returning original references when nothing did. That IS diffing. The separate `diff()` function does the same walk without the transform. One walk should do both.

The result: a single recursive function that transforms chemistry nodes (rebinding, key injection) AND compares against the cached view, using particle identity to skip untouched subtrees entirely. Unchanged branches return cached references. React sees `===` and skips reconciliation.

Doug's guidance: the orchestrator has some beautiful patterns (prototype-based context cloning, change-tracking in augmentNode, $lastProps$ memoization). Refactor with a mind for preservation. Let the art shine.

## Status: NOT STARTED

Last updated: 2026-04-09

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Unified walker, orchestrator refactor |
| Arthur | Architect | Dead code removal, dependency cleanup |
| Libby | Librarian | Document patterns, update overview |

## Deep read findings (spikes/orchestrator-deep-read.md)

1. `augmentNode()` is already a combined transform-and-diff. It maps children, tracks `changed`, returns originals when nothing changed. Reference equality is the fast path.
2. `$BondOrchestrationContext.clone()` is a prototype-based parser zipper. Beautiful. Preserve it.
3. The `$lastProps$` gate in `context.child()` is memoization at the child level. Preserve it.
4. `render()` is mostly dead — lifecycle and state tracking removed. Only `bond(props)` is live.
5. `bindProps()` overlaps with `$apply$`. Two prop-application paths for the same purpose.

## Architecture

### The unified walker

Replace `diff()` + `augmentView()` with a single function on the orchestrator (or as a free function):

```typescript
function reconcile(node: ReactNode, cached: ReactNode, chemical: $Chemical): ReactNode {
    if (node === cached) return cached;
    // ... handle null, primitives, arrays
    if (isChemistryComponent(node)) {
        const particle = node.$chemical;
        if (!particle.touched) return cached;     // particle-aware skip
        // rebind if needed, recurse into particle's view
    }
    // compare type, key, props
    // recurse children: reconcile(child, cachedChild)
    // if nothing changed in subtree, return cached
    // else return new element
}
```

### What changes

- `diff.ts` → deleted. Its logic folds into the unified walker.
- `augmentView()` / `augmentNode()` → replaced by the unified walker.
- `use()` → calls the unified walker instead of `diff()`.
- `orchestrator.render()` → deleted (dead code).
- `orchestrator.bindProps()` → evaluated for merge with `$apply$`.

### What's preserved

- `$BondOrchestrationContext` — the clone-based parser. Untouched.
- `$BondArguments` — parameter tracking. Untouched.
- `$BondOrchestrator.bond()` — children processing. Preserved.
- `$BondOrchestrator.parseBondConstructor()` — signature parsing. Preserved.
- `$ParamValidation` / `$check` — type validation. Preserved.
- The change-tracking pattern (`changed = changed || node !== child`). Absorbed into the walker.
- The `$lastProps$` gate. Preserved.

### Particle-aware short-circuiting

The framework knows things a generic differ can't. A particle has a CID. If a child chemical's view is in the cache AND no method has been called on it AND no props were applied to it, its subtree is unchanged. Skip it entirely.

This requires a way to know "has this particle been touched?" The `$Bonding` wrapper sets `$update$` after method calls. We can use a simple `$touched$` flag: set by `$Bonding` and `$apply`, cleared after render. Or — since `$update$` is only called when the particle is mounted, the walker can check whether the particle's `$viewCache$` exists and no re-render was triggered.

## Epics

### E1: The unified walker

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Design the reconcile() function signature and behavior | Cathy | — | NOT STARTED |
| E1-S2 | Implement reconcile() — merge augmentNode + diff logic | Cathy | E1-S1 | NOT STARTED |
| E1-S3 | Add particle-aware short-circuiting | Cathy | E1-S2 | NOT STARTED |
| E1-S4 | Wire reconcile() into use() FC, replacing diff() | Cathy | E1-S2 | NOT STARTED |

### E2: Orchestrator cleanup

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Delete orchestrator.render() — dead code | Arthur | E1-S4 | NOT STARTED |
| E2-S2 | Delete augmentView() / augmentNode() — replaced by walker | Arthur | E1-S4 | NOT STARTED |
| E2-S3 | Evaluate bindProps() vs $apply$ — merge or separate | Cathy | E1-S4 | NOT STARTED |
| E2-S4 | Delete diff.ts | Arthur | E1-S4 | NOT STARTED |
| E2-S5 | Clean orchestrator runtime wiring — reduce $setRuntime surface | Arthur | E2-S1 | NOT STARTED |

### E3: Tests

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Port diff.test.tsx to test reconcile() | Cathy | E1-S2 | NOT STARTED |
| E3-S2 | Test particle-aware short-circuiting | Cathy | E1-S3 | NOT STARTED |
| E3-S3 | Integration: re-render with unified walker | Cathy | E1-S4 | NOT STARTED |
| E3-S4 | Test preserved patterns: context cloning, $lastProps$ gate | Cathy | E2-S3 | NOT STARTED |

### E4: Review and examples

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | Code review — is the walker artful? | All | E2-S5 | NOT STARTED |
| E4-S2 | Update examples if API changed | Libby | E1-S4 | NOT STARTED |

## Verification

- [ ] diff.ts deleted — its logic lives in the unified walker
- [ ] augmentView() / augmentNode() deleted — replaced by walker
- [ ] orchestrator.render() deleted — dead code removed
- [ ] Unified walker transforms AND compares in one pass
- [ ] Particle-aware short-circuiting skips untouched subtrees
- [ ] $BondOrchestrationContext.clone() preserved
- [ ] $lastProps$ memoization preserved
- [ ] All 271 existing tests pass
- [ ] Integration test still proves the reactive loop
- [ ] The walker is something you'd want to read
