# Queenie's Test Audit

## Test distribution (inverted pyramid)
- Reflection: 75 tests — supporting infrastructure, low risk
- Catalogue: 31 tests — supporting infrastructure, low risk
- Walk/reconcile: 21 tests — rendering support, medium risk
- Particle: 14 tests — identity/lifecycle, medium risk
- Molecule: 14 tests — bond metadata, medium risk
- Chemical: 12 tests — STRUCTURAL only, no rendering
- Lifecycle: 9 tests — phase resolution, useful
- React assumptions: 6 tests — CRITICAL, too few
- Rendering safety: 5 tests — CRITICAL, too few
- Reaction: 4 tests — gutted class, possibly meaningless
- Integration: 3 tests — CRITICAL, too few
- Validation: 4 tests — binding constructor, useful
- Smoke: 2 tests — basic rendering, useful

**The problem: 106 tests for infrastructure, 16 for the React interface.**

## Tests that verify BEHAVIOR (good)
- "click → bonded method → $update$ → DOM update" — tests the reactive loop
- "two Book components have separate state" — tests instance independence
- "parent re-render with new props updates child" — tests prop flow
- "computed getter in view does not trigger infinite loop" — tests rendering safety
- "renders a book via template Component" — tests the .Component pattern

## Tests that verify IMPLEMENTATION (suspicious)
- "should carry $view and $this on the component" — internal properties
- "should have lifecycle methods" — type signature, not behavior
- "should create molecule, reaction, and orchestrator" — construction details
- "should start non-reactive" / "should become reactive after reactivate()" — internal state

## Tests that might be STALE
- reaction.test.ts: tests registration and cleanup of a class that's been gutted to 34 lines
- "should serialize state with formula()" — DELETED already, but were there other formula-dependent tests?

## Missing tests (CRITICAL)
1. Binding constructor via JSX (not direct call)
2. Polymorphic rendering in React
3. <$> auto-keying preserves state on reorder
4. Multi-render independent props
5. Strict mode lifecycle
6. Async next('mount') in React
7. Performance: large tree
8. Binding constructor error messages
9. Unmount memory cleanup
10. Method binding stability across re-renders

## Recommendation
Rewrite the test suite with a behavior-first approach. For every test, ask: "if I refactored the internals but kept the behavior, would this test still pass?" If not, the test is fragile. Replace implementation tests with behavior tests. Add the 10 missing critical tests. Cut or rewrite the stale ones.
