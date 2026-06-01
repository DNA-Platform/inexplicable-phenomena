# Sprint 5: The Lift

Lift the full v1 $Chemistry implementation from the archive monolith into the current modular codebase. Every feature transfers — molecule, bond, reaction, orchestrator, component factory, wrappers, helpers. The archive is the source of truth for behavior. The current module structure is the target for organization. Get comprehensive test coverage around it. Then we have a safe foundation to evolve.

## Status: IN PROGRESS

Last updated: 2026-04-04

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Primary on all `library/chemistry/` work — source lift, tests, integration |
| Arthur | Architect | Module boundaries, dependency graph, circular import resolution |
| Libby | Librarian | Update docs (glossary, overview, file-map) as implementation solidifies |

## Spikes

### SP-1: Module dependency graph — NOT STARTED
- **Owner:** Arthur
- **Question:** Can the archive monolith be split into the proposed modules without runtime circular dependency issues?
- **Method:** Map import dependencies for each proposed module. Prototype the split with type-only imports where needed. Verify the build compiles.
- **Decision gate:** If circular runtime deps exist, merge the offending modules. If clean, proceed with the proposed split.
- **Output:** `spikes/module-graph.md`
- **Finding:** —

## Epics

### E1: Module structure and foundation

Port the archive into the modular file layout. Fix symbol descriptions. Establish the module graph.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Fix symbol descriptions and typos | Cathy | — | NOT STARTED |
| E1-S2 | Create molecule.ts ($Molecule, $Bond, $Bonding, $Reflection) | Cathy | SP-1 | NOT STARTED |
| E1-S3 | Create reaction.ts ($Reaction, $State) | Cathy | SP-1 | NOT STARTED |
| E1-S4 | Create orchestrator.ts ($BondOrchestrator, $BondOrchestrationContext, $BondArguments, $ParamValidation) | Cathy | SP-1 | NOT STARTED |
| E1-S5 | Create component.ts ($Component$) | Cathy | SP-1 | NOT STARTED |
| E1-S6 | Uncomment and wire $Chemical to molecule, reaction, orchestrator | Cathy | E1-S2, E1-S3, E1-S4, E1-S5 | NOT STARTED |
| E1-S7 | Create wrappers.ts ($Function$, $Html$, $Include, $Exclude) | Cathy | E1-S6 | NOT STARTED |
| E1-S8 | Implement $Atom and $Persistent | Cathy | E1-S6 | NOT STARTED |
| E1-S9 | Create helpers.ts ($use, $check, $wrap, $, $is, $await, $promise, $symbolize, $literalize) | Cathy | E1-S6 | NOT STARTED |
| E1-S10 | Update index.ts exports | Arthur | E1-S6 | NOT STARTED |

<!-- Note: Story status lives on the board, not here. The plan is the design document.
     Don't update story status in the plan — move items on the board instead. -->

#### Story details

##### E1-S1: Fix symbol descriptions and typos
- **What:** Fix `$prototype$`, `$derived$`, `$particlar$` symbol descriptions (all say `$Particle.cid`). Rename `$particlar$` to `$particular$`. Update all references.
- **Files:** `src/symbols.ts`, `src/chemistry/particle.tsx`
- **Acceptance:** Each symbol has a unique, accurate description. `$particular$` spelled correctly. Build passes.
- **Notes:** `$$template$$` description says `$Particle.particlar` — also wrong.

##### E1-S2: Create molecule.ts
- **What:** Port `$Molecule`, `$Bond`, `$Bonding`, `$Reflection`, `$Parent` from archive. Add any new symbols needed.
- **Files:** `src/chemistry/molecule.ts` (new)
- **Acceptance:** Classes compile. `$Molecule` can be instantiated with a chemical. `reactivate()` walks properties and creates bonds. `formula()` serializes. `read()` deserializes.
- **Notes:** `$Bond.describe()` replaces properties via `Object.defineProperty`. This is the property interception we'll later evaluate for simplification — but for now, lift as-is. Watch for archive typos (`symnbolized`, `elelement`, `ellement`).

##### E1-S3: Create reaction.ts
- **What:** Port `$Reaction`, `$State` from archive.
- **Files:** `src/chemistry/reaction.ts` (new)
- **Acceptance:** `$Reaction` manages lifecycle phases. Async methods (`mount()`, `render()`, `layout()`, `effect()`, `unmount()`) resolve at correct phases. `$State` tracks changes.
- **Notes:** `$Reaction` has a static `_chemicals` map and `find()` method for CID lookup. Consider whether this should use the catalogue system eventually — but for the lift, port as-is.

##### E1-S4: Create orchestrator.ts
- **What:** Port `$BondOrchestrator`, `$BondOrchestrationContext`, `$BondArguments`, `$ParamValidation` from archive.
- **Files:** `src/chemistry/orchestrator.ts` (new)
- **Acceptance:** Orchestrator parses binding constructor signatures. `bond()` processes JSX children into typed arguments. `$check()` validates types. `assertViewConstructors` validates the prototype chain.
- **Notes:** The orchestrator's `augmentView()` method is complex — it rewrites the React element tree to inject keys and rebind components. Port faithfully, note areas for later simplification.

##### E1-S5: Create component.ts
- **What:** Port `$Component$` from archive — the React FC factory.
- **Files:** `src/chemistry/component.ts` (new)
- **Acceptance:** `new $Component$(template)` produces a React FC. `$bind(parent)` creates a bound instance. The FC uses `useState`, `useEffect`, `useLayoutEffect` internally to drive lifecycle phases. Component authors see none of this.
- **Notes:** This is where React hooks live — hidden inside the framework. The view function itself remains hook-free.

##### E1-S6: Uncomment and wire $Chemical
- **What:** Uncomment the molecule, reaction, orchestrator, lifecycle methods, `$render`, `$props`, `$destroy`, `$createComponent`, and `Component`/`$Component` getters in chemical.ts. Wire imports to new modules.
- **Files:** `src/chemistry/chemical.ts`
- **Acceptance:** `$Chemical` constructor creates molecule, reaction, and orchestrator. Lifecycle methods delegate to reaction. `Component` getter creates via `$Component$`. Build passes.
- **Notes:** The parent/catalyst system, `$isBound`, `assertViewConstructors` are already partially implemented. Merge carefully with existing code.

##### E1-S7: Create wrappers.ts
- **What:** Port `$Function$`, `$Html$`, `$Include`, `$Exclude` from archive.
- **Files:** `src/chemistry/wrappers.ts` (new)
- **Acceptance:** `$Function$(reactFC)` wraps a plain React FC as a chemical. `$Html$(type)` wraps a DOM element tag. `$Include` returns children. `$Exclude` returns undefined.
- **Notes:** `$Html$` uses the `@inert()` decorator from `$Reflection`. This is a dependency on the molecule system.

##### E1-S8: Implement $Atom and $Persistent
- **What:** Port `$Atom` and `$Persistent` from archive into the empty atom.ts.
- **Files:** `src/chemistry/atom.ts`
- **Acceptance:** `$Atom` returns its template from the constructor. `$Persistent` manages formation lifecycle, reads/writes localStorage via molecule formula.
- **Notes:** `$Persistent` has a missing `{` in the archive (`if (!this[$formed])` followed by four unbraced lines). Fix the control flow during port.

##### E1-S9: Create helpers.ts
- **What:** Port `$use`, `$check`, `$wrap`, `$`, `$is`, `$await`, `$promise`, `$symbolize`, `$literalize`, `$lookup`, `$load`, `$Represent` from archive.
- **Files:** `src/chemistry/helpers.ts` (new)
- **Acceptance:** All helper functions work. `$use(chemical)` returns a component. `$wrap(fc)` wraps a React FC. `$(type)` returns an HTML element wrapper. `$promise` supports cancellation.
- **Notes:** `$Represent` (serialization) is ~210 lines. Consider whether it belongs in helpers or its own module. For the lift, keep it with the helpers since `$symbolize` and `$literalize` are the public API.

##### E1-S10: Update index.ts exports
- **What:** Export all public types, classes, and functions from index.ts.
- **Files:** `src/index.ts`
- **Acceptance:** Consumers can import `$Chemical`, `$Atom`, `$use`, `$check`, `$wrap`, `$`, etc. from the package. Build produces complete `.d.ts` files.
- **Notes:** Only export what component authors and end-users need. Framework internals ($Molecule, $Bond, $Reaction, $BondOrchestrator) stay internal.

### E2: Test coverage

Write tests for each module. Tests define the API contract. Mirror the module structure.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Expand particle.test.ts | Cathy | E1-S1 | NOT STARTED |
| E2-S2 | Write molecule.test.ts | Cathy | E1-S2 | NOT STARTED |
| E2-S3 | Write reaction.test.ts | Cathy | E1-S3 | NOT STARTED |
| E2-S4 | Write orchestrator.test.ts | Cathy | E1-S4 | NOT STARTED |
| E2-S5 | Write component.test.ts | Cathy | E1-S5, E1-S6 | NOT STARTED |
| E2-S6 | Write chemical.test.ts | Cathy | E1-S6 | NOT STARTED |
| E2-S7 | Write wrappers.test.ts | Cathy | E1-S7 | NOT STARTED |
| E2-S8 | Write atom.test.ts | Cathy | E1-S8 | NOT STARTED |
| E2-S9 | Write helpers.test.ts | Cathy | E1-S9 | NOT STARTED |
| E2-S10 | Write integration.test.ts | Cathy | E2-S5, E2-S6 | NOT STARTED |

#### Story details

##### E2-S1: Expand particle.test.ts
- **What:** Re-enable and rewrite the disabled tests. Add coverage for: `use()` view wrapping, `$apply$` prop mapping, particular pattern, toString, module export.
- **Files:** `tests/particle.test.ts`
- **Acceptance:** All particle public behavior has tests. Disabled tests replaced with working ones.

##### E2-S2: Write molecule.test.ts
- **What:** Test bond creation, property interception, field/getter/method detection, molecule reactivation, formula serialization, read deserialization, template bond inheritance, bond doubling.
- **Files:** `tests/molecule.test.ts` (new)
- **Acceptance:** Coverage for $Molecule, $Bond, $Bonding, $Reflection, $Parent.

##### E2-S3: Write reaction.test.ts
- **What:** Test lifecycle phase transitions, async mount/render/layout/effect/unmount, state tracking, update scheduling, reaction systems, merge.
- **Files:** `tests/reaction.test.ts` (new)
- **Acceptance:** Each lifecycle phase resolves at the correct time. State change detection works.

##### E2-S4: Write orchestrator.test.ts
- **What:** Test binding constructor parsing, child element processing, parameter extraction, type validation ($check), Include/Exclude handling, array spreading.
- **Files:** `tests/orchestrator.test.ts` (new)
- **Acceptance:** Binding constructors receive correctly typed arguments from JSX children.

##### E2-S5: Write component.test.ts
- **What:** Test $Component$ creation, bound vs unbound instances, React rendering, prop forwarding, lifecycle hook integration.
- **Files:** `tests/component.test.ts` (new)
- **Acceptance:** A $Chemical renders in React via its Component. Props flow through. Lifecycle hooks fire.
- **Notes:** Uses @testing-library/react for render tests.

##### E2-S6: Write chemical.test.ts
- **What:** Test $Chemical construction, parent tracking, template pattern, Component getter, view delegation, destroy lifecycle.
- **Files:** `tests/chemical.test.ts` (new)
- **Acceptance:** Coverage for all $Chemical public API.

##### E2-S7: Write wrappers.test.ts
- **What:** Test $Function$ wrapping React FCs, $Html$ wrapping DOM elements, $Include/$Exclude behavior.
- **Files:** `tests/wrappers.test.ts` (new)
- **Acceptance:** Wrapped components render correctly in React.

##### E2-S8: Write atom.test.ts
- **What:** Test $Atom template return, $Persistent formation, localStorage read/write, reform/reflect lifecycle.
- **Files:** `tests/atom.test.ts` (new)
- **Acceptance:** Atoms form correctly. Persistent state survives serialize/deserialize cycle.

##### E2-S9: Write helpers.test.ts
- **What:** Test $use, $wrap, $, $is, $await, $promise (cancellation), $check, $symbolize/$literalize, $lookup/$load.
- **Files:** `tests/helpers.test.ts` (new)
- **Acceptance:** Each helper function has at least basic coverage.

##### E2-S10: Write integration.test.ts
- **What:** End-to-end tests: chemical renders, props update view, binding constructor receives typed children, prototypal shadowing works, method binding preserves `this`.
- **Files:** `tests/integration.test.ts` (new)
- **Acceptance:** The framework works as a whole. A component author can write a $Chemical subclass, export its Component, render it in JSX with props and children, and it behaves correctly.

### E3: Documentation update

Update existing docs to reflect the lifted implementation.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Update file-map.md with new modules | Libby | E1-S10 | NOT STARTED |
| E3-S2 | Review glossary accuracy against lifted code | Libby | E1-S10 | NOT STARTED |
| E3-S3 | Review overview accuracy against lifted code | Libby | E1-S10 | NOT STARTED |

## Dependency graph

```
SP-1 (module graph spike)
 ├─ E1-S1 (fix symbols) ─── E2-S1 (particle tests)
 ├─ E1-S2 (molecule) ────── E2-S2 (molecule tests)
 ├─ E1-S3 (reaction) ────── E2-S3 (reaction tests)
 ├─ E1-S4 (orchestrator) ── E2-S4 (orchestrator tests)
 ├─ E1-S5 (component) ─┐
 │                      ├── E1-S6 (wire chemical) ─┬── E2-S5 (component tests)
 │                      │                          ├── E2-S6 (chemical tests)
 │                      │                          ├── E1-S7 (wrappers) ── E2-S7
 │                      │                          ├── E1-S8 (atom) ────── E2-S8
 │                      │                          ├── E1-S9 (helpers) ─── E2-S9
 │                      │                          └── E1-S10 (exports) ── E3-S1, E3-S2, E3-S3
 │                      │
 │                      └── E2-S10 (integration) ← E2-S5, E2-S6
```

## Verification checklist

After all work completes:

- [ ] `npm run build` succeeds with no errors
- [ ] `npm run test` — all tests pass (target: 178 existing + new coverage)
- [ ] All archive classes have modular equivalents — no remaining imports from `@/archive/chemistry`
- [ ] chemical.ts has no commented-out code
- [ ] atom.ts is implemented (no longer empty)
- [ ] index.ts exports the full public API
- [ ] File-map, glossary, and overview docs are accurate to the lifted code
- [ ] 12 pre-existing particle test failures are addressed (fixed or documented)
