# Sprint 15: Scoping, Keys, and the Comprehensive Audit

Three deep workstreams. Each requires research before implementation.

## Status: NOT STARTED

Last updated: 2026-04-14

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer | Multi-render scoping, key elimination |
| Arthur | Architect | Test audit, usage scenario mapping |
| Phillip | Frontend Engineer, UX Designer | App design (paused pending framework fixes) |
| Libby | Librarian | Doc restructuring, research documentation |

## Workstream 1: Multi-render prototypal scoping

### The problem
A chemical received through a binding constructor, rendered multiple times in the parent's view. Each rendering needs independent `$`-prefixed props but shared intrinsic state.

### Research findings (sprint-14/spikes/multi-render-analysis.md)
- `Object.create(chemical)` creates per-rendering shadows
- `$apply` writes `$`-prefixed props to the shadow (independent per rendering)
- Methods on the shadow write to the shadow (NOT shared)
- Broadcasting `$update$` from chemical to all mounted shadows solves re-render propagation

### Design decision needed
How do methods on a shadow interact with the chemical? Options:
A. Methods write to the prototype (shared) — requires wrapper changes
B. Methods write to the shadow (diverges) — simpler but breaks sharing
C. Methods on the chemical, shadows are read-only views — cleanest but restrictive
D. Broadcast model — chemical maintains set of `$update$` functions

### Implementation plan
1. Spike: write a test with same chemical rendered 3 times, different props
2. Implement shadow creation in `$lift` via `useRef` + `Object.create`
3. Test that `$apply` is independent per shadow
4. Test that method mutations propagate correctly
5. Test that re-renders propagate to all shadows

## Workstream 2: Key elimination

### The problem
`$use(chemical, 'key')` ceremony in views. Doug wants keys auto-injected.

### Research findings
- React elements are frozen — can't add key post-creation
- `React.cloneElement` creates new elements with keys — costs one allocation per element
- Keys only matter for LISTS that can reorder — fixed-structure views don't need them
- Auto-injection must happen BEFORE the FC returns — between view() and reconcile()

### Design decision needed
Where to inject keys:
A. Separate augment step between view() and reconcile() — regression from sprint 11
B. Inside reconcile() — makes it framework-aware
C. In the walk() visitor — keeps walk generic but adds a chemistry-specific visitor
D. Don't auto-inject — require the view author to use keys for lists (React's standard model)

### Implementation plan
1. Deep research: WHY did Doug's previous auto-injection fail? Read the legacy augmentView carefully.
2. Build a test: chemistry components in a list, reorder them, verify state persists
3. Try option B: reconcile injects keys for chemistry elements
4. If that fails, try option C
5. If both fail, document why and propose alternative API to `$use`

## Workstream 3: Comprehensive test audit

### Method
1. Map the entire $Chemistry API surface — every public method, every exported function, every class
2. For each: is it tested? How? In what scenario?
3. Identify composition scenarios — how chemicals interact when composed in different ways
4. For each untested scenario: can it be tested in vitest with @testing-library/react?
5. What's left requires browser verification — that's the app's test list

### Composition scenarios to consider
- Single chemical, simple props
- Single chemical, method mutation, re-render
- Parent-child binding constructor (one level)
- Parent-child-grandchild (nested binding, three levels)
- Same chemical in multiple binding constructors
- Same chemical rendered multiple times with different props (multi-render)
- Chemical passed through TWO levels of binding constructors (pipeline)
- Chemical whose parent changes (moved in the tree)
- Chemical with @inert() properties — mutation doesn't trigger re-render
- Polymorphic children — subclass passed where base class expected
- Computed properties derived from typed children
- Async lifecycle — next('mount'), next('effect'), continuous timers
- Unmount and cleanup — does state clean up? Memory leaks?
- Error cases — wrong types in binding constructor, missing required props
- Large collections — 100+ chemicals in one parent
- Concurrent independent subtrees — two unrelated component trees

### React assumptions to verify
- useState setter triggers re-render
- useRef persists across re-renders
- useEffect fires after mount (with []), after every render (without [])
- useLayoutEffect fires synchronously after DOM mutation
- Object.create instances work as component state
- Arrow function components work as React FCs
- Props received by FC match JSX attributes
- React reconciles by position when no keys, by identity when keyed
- Multiple mounts of same function are independent
- cloneElement preserves children and type
- React.Children.toArray normalizes children

### Output
- Updated test files covering all identified gaps
- A document listing what MUST be verified in the browser app
- The app's test list (10-20 items) with justification for why each needs in-vivo verification

## Verification
- [ ] Multi-render test: same chemical, 3 renderings, independent props
- [ ] Multi-render test: method on one shadow re-renders all
- [ ] Key research documented with findings and recommendation
- [ ] Every public API method has at least one test
- [ ] Composition scenarios tested (at least 10 of the 16 listed)
- [ ] Browser-only test list written with justifications
- [ ] No serialization ($symbolize, $literalize) in any rendering path
- [ ] All existing tests still pass
