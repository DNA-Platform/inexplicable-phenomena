# Sprint 16: Correctness

Fix the framework gaps found in the deep read. Audit and rewrite tests for behavior, not implementation. Think exhaustively about composition scenarios. Discuss as a team before coding.

## Status: NOT STARTED

Last updated: 2026-04-14

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer | $lift shadows, broadcast $update$, replaceIf equivalent |
| Arthur | Architect | Dependency review, module boundaries, dead code |
| Queenie | QA Engineer | Test audit, rewrite tests for behavior, design missing tests |
| Phillip | Frontend Engineer, UX Designer | App updates after framework fixes |
| Libby | Librarian | Document patterns, update docs with findings |

## Framework fixes (Cathy)

### 1. $lift prototypal shadows
Each mount of a `$lift`-created component creates an `Object.create(particle)` shadow. `$apply` writes to the shadow. Intrinsic state inherited from the particle. Each shadow has its own CID.

### 2. Broadcast $update$
A chemical that's rendered in multiple places maintains a Set of update functions — one per mount. When a bonded method fires, ALL mounts re-render. Individual `$update$` references stored per-shadow, collected on the chemical.

### 3. replaceIf equivalent
When the orchestrator binds a child to a parent, check the child's catalyst against the parent's. If mismatched, create a shadow via `Object.create`. This replaces the old bondGet/bondSet replaceIf with an orchestrator-level check.

### 4. Async promise cancellation
When a bonded async method is called while a previous async call is pending, cancel the previous. Stale results must not overwrite fresh state. Restore the `$promise.cancel()` pattern from the old code.

### 5. Dead code removal
Remove anything that exists but is never called. $symbolize, $literalize, $Represent — if nothing uses them, they go. The static `$Reaction._chemicals` map — verify it's still needed after the useState restoration.

## Test audit (Queenie)

### Phase 1: Classify existing tests
For each test file, classify every test as:
- **Behavior** — tests what the user sees. Keep.
- **Implementation** — tests internal mechanism. Evaluate: is the mechanism itself the subject? If not, rewrite or delete.
- **Stale** — tests something that's been removed or changed. Delete.

### Phase 2: Rewrite implementation tests as behavior tests
- "should have lifecycle methods" → test that `await next('mount')` resolves after rendering
- "should carry $view and $this" → test that the FC renders correctly
- "should create molecule, reaction, and orchestrator" → test that the chemical renders and re-renders

### Phase 3: Write the 10 missing critical tests
1. Binding constructor via JSX rendering
2. Polymorphic rendering in React
3. <$> auto-keying preserves state on reorder
4. Multi-render independent props (after Cathy implements shadows)
5. Strict mode lifecycle
6. Async next('mount') in React rendering
7. Performance: 50+ chemicals under threshold
8. Binding constructor error messages in browser
9. Unmount memory cleanup
10. Method binding stability across re-renders

### Phase 4: Composition scenario tests
Test the 16 scenarios identified in sprint 15:
- Single chemical, simple props
- Single chemical, method mutation, re-render
- Parent-child binding (one level)
- Three-level nesting
- Same chemical in multiple binding constructors
- Multi-render with different props
- Chemical through two levels of binding constructors
- Chemical whose parent changes
- @inert() property doesn't trigger re-render
- Polymorphic children
- Computed properties from typed children
- Async lifecycle
- Unmount cleanup
- Error cases
- Large collections
- Concurrent independent subtrees

## Deep read continuation (Cathy + Arthur)

### Old code methods still to compare:
- [ ] $Chemical parent setter — catalyst system correctness
- [ ] $Bonding.handleAsync — full async chain vs our simplified version
- [ ] $Component$.configureChemical — instance setup completeness
- [ ] $BondOrchestrationContext.child — $lastProps memoization
- [ ] Old augmentView — what exactly did the root Fragment key do?

### Write perspective docs for each comparison.

## Verification
- [ ] $lift creates shadows per mount — test with 3 mounts, independent props
- [ ] Broadcast $update$ — method on one shadow re-renders all
- [ ] replaceIf equivalent in orchestrator — cross-catalyst chemical is rebound
- [ ] Async cancellation — rapid calls, only last result persists
- [ ] Test audit complete — every test classified
- [ ] Implementation tests rewritten as behavior tests
- [ ] 10 missing critical tests written
- [ ] At least 10 of 16 composition scenarios tested
- [ ] No dead code in rendering path
- [ ] Team perspective docs written for each deep read comparison
