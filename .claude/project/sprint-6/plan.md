# Sprint 6: Canonical Examples

The framework is called $Chemistry. The test suite models chemistry. Each test component is an element, compound, or reaction — the framework testing itself by modeling its own namesake domain. The tests simultaneously prove the framework works, document how to use it, and verify the metaphor is load-bearing.

Each canonical test class also lives as a standalone example in `.claude/docs/chemistry/examples/` for Doug to review and give feedback on. The examples are the artifact; the tests wrap them with assertions. When Doug says "change this," we change the example and the test follows.

Tests go through the public interface. React rendering is tested once (smoke test); everything else tests the chemical directly via `view()`.

## Status: IN PROGRESS

Last updated: 2026-04-04

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Example components, tests, framework insights |
| Arthur | Architect | Metaphor fitness, structural observations |
| Libby | Librarian | Track insights, update docs, maintain examples directory |

## Spikes

### SP-1: Smoke test — DONE
- **Owner:** Cathy
- **Question:** Does the lifted framework render a chemical through React end-to-end?
- **Method:** `$Hydrogen` — the simplest atom. Extends `$Element` extends `$Chemical`. Rendered via `@testing-library/react`.
- **Decision gate:** Passes. The lift works.
- **Output:** `tests/smoke.test.tsx`
- **Finding:** The `$` prefix boundary naturally separates intrinsic identity (number, symbol, name, mass) from extrinsic context ($highlighted, $selected). This isn't just a naming convention — it's a semantic distinction between what something IS and how it's being VIEWED.

## Epics

### E1: Elements — particles and atoms

Build `$Element` and specific elements. Each element is a canonical example of a $Chemistry concept. The elements live in `examples/elements.tsx` and are tested in `tests/elements.test.tsx`.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | $Element and $Hydrogen — identity, props, the membrane | Cathy | SP-1 | NOT STARTED |
| E1-S2 | $Oxygen, $Carbon — multiple elements, template pattern | Cathy | E1-S1 | NOT STARTED |
| E1-S3 | $Element as $Atom — formation, the periodic table forms | Cathy | E1-S2 | NOT STARTED |

<!-- Note: Story status lives on the board, not here. -->

#### Story details

##### E1-S1: $Element and $Hydrogen
- **What:** `$Element` base class with intrinsic properties (number, symbol, name, mass) and extrinsic props ($highlighted, $selected). `$Hydrogen` as the simplest subclass. Tests identity, CID, `$`-prefix grammar, prop application, view output, Component membrane.
- **Example:** `examples/elements.tsx`
- **Tests:** `tests/elements.test.tsx`
- **Acceptance:** Hydrogen has atomic number 1. Its view renders its symbol. Props flow through the membrane. The `$` boundary is visually obvious in the code.

##### E1-S2: $Oxygen, $Carbon — template pattern
- **What:** More elements. Tests that each subclass gets its own template. Multiple instances share the template. CIDs are unique across element types.
- **Example:** `examples/elements.tsx` (extended)
- **Tests:** `tests/elements.test.tsx` (extended)
- **Acceptance:** Three element types, each with distinct identity. Template singleton per type.

##### E1-S3: $Element as $Atom — formation
- **What:** Evolve `$Element` from `$Chemical` to `$Atom`. Formation is literal: the element *forms*. `form()` initializes intrinsic properties. Tests the atom lifecycle: formation, formed flag, remembered state.
- **Example:** `examples/elements.tsx` (evolved)
- **Tests:** `tests/elements.test.tsx` (extended)
- **Acceptance:** Elements undergo formation. After formation, `formed` is true. The formation metaphor is natural — it doesn't feel forced.

### E2: Compounds — composition and bonding

Build `$Compound` and specific compounds. Each compound demonstrates chemical composition — the binding constructor, typed children, the orchestrator. Lives in `examples/compounds.tsx`.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | $Compound and $Water — binding constructor, typed children | Cathy | E1-S2 | NOT STARTED |
| E2-S2 | $Methane — variadic binding, array children | Cathy | E2-S1 | NOT STARTED |
| E2-S3 | Formula — molecule serialization of a compound | Cathy | E2-S1 | NOT STARTED |

#### Story details

##### E2-S1: $Compound and $Water
- **What:** `$Compound` with binding constructor receiving `$Element` children. `$Water` is `<Compound><Hydrogen /><Hydrogen /><Oxygen /></Compound>`. The binding constructor receives typed elements and stores them. `$check` validates that children are elements.
- **Example:** `examples/compounds.tsx`
- **Tests:** `tests/compounds.test.tsx`
- **Acceptance:** Water's binding constructor receives exactly three elements. The view renders H₂O. Type validation works.

##### E2-S2: $Methane — variadic binding
- **What:** `$Methane` = CH₄. Five element children. Tests spread parameters in binding constructor, array handling.
- **Example:** `examples/compounds.tsx` (extended)
- **Tests:** `tests/compounds.test.tsx` (extended)

##### E2-S3: Formula — molecule serialization
- **What:** A compound's `$Molecule.formula()` serializes its bonded state. Tests that the internal molecule accurately describes the compound's structure. Connects the framework's `$Molecule` to the chemistry concept of a molecular formula.
- **Tests:** `tests/compounds.test.tsx` (extended)
- **Acceptance:** The formula of a compound is a string representation of its bonds. The naming is not a coincidence — `formula()` returns a formula.

### E3: Isotopes and sharing — prototypal delegation

Demonstrate that the same element can appear in multiple contexts with different properties. This is the Self philosophy tested through chemistry.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Isotopes — same element, different mass | Cathy | E1-S2 | NOT STARTED |

#### Story details

##### E3-S1: Isotopes
- **What:** Hydrogen and Deuterium. Same element, different mass. One `$Hydrogen` instance rendered twice — once as H, once as D (with mass overridden). Tests prototypal shadowing: the mass shadows, the atomic number inherits.
- **Example:** `examples/isotopes.tsx`
- **Tests:** `tests/isotopes.test.tsx`
- **Acceptance:** Changing the name on the original updates both views. Changing the mass on the deuterium view only affects that view. The isotope metaphor is natural — isotopes ARE prototypal shadows of elements.

### E4: Reactions — lifecycle

Demonstrate async lifecycle through chemical reactions.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | $Reaction — async formation and lifecycle | Cathy | E2-S1 | NOT STARTED |

#### Story details

##### E4-S1: Reactions and lifecycle
- **What:** A reaction between elements. Uses async lifecycle: `await this.mount()` to begin, `await this.effect()` to observe results. The chemical reaction metaphor maps to the framework's lifecycle — a reaction proceeds through phases.
- **Example:** `examples/reactions.tsx`
- **Tests:** `tests/reactions.test.tsx`
- **Acceptance:** The lifecycle metaphor works. A chemical reaction has phases. The framework's reaction system models them.

### E5: Method binding and state

Demonstrate that methods bind correctly and state mutations work.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E5-S1 | $Counter — state, methods, bond system | Cathy | E1-S1 | NOT STARTED |

#### Story details

##### E5-S1: $Counter — the one non-chemistry example
- **What:** A counter. `count = 0`, `increment()`, view shows count. This is intentionally the one generic example — it proves the framework works for normal UI, not just self-referential chemistry. It's the bridge between the art and the utility.
- **Example:** `examples/counter.tsx`
- **Tests:** `tests/bond.test.ts`
- **Acceptance:** Method binding works. `this.increment` in JSX has correct `this`. State mutates and view reflects it.

### E6: Wrappers — interop

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E6-S1 | $wrap, $(), Include, Exclude | Cathy | E1-S1 | NOT STARTED |

### E7: Example extraction and doc links

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E7-S1 | Extract examples to examples/ directory | Libby | E1-S3, E2-S1 | NOT STARTED |
| E7-S2 | Link examples from overview and coding conventions | Libby | E7-S1 | NOT STARTED |

## Dependency graph

```
SP-1 (smoke — DONE)
 ├── E1-S1 ($Hydrogen) ─── E1-S2 (more elements) ─┬── E1-S3 ($Atom formation)
 │                                                   ├── E2-S1 ($Water) ─── E2-S2, E2-S3
 │                                                   └── E3-S1 (isotopes)
 ├── E4-S1 (reactions) ← E2-S1
 ├── E5-S1 ($Counter)
 └── E6-S1 (wrappers)

E7-S1, E7-S2 — after examples stabilize with Doug's feedback
```

## Verification checklist

- [ ] Smoke test renders hydrogen through React
- [ ] Each example class maps naturally to its chemistry concept
- [ ] The `$` boundary visibly separates intrinsic from extrinsic
- [ ] All tests go through the public interface
- [ ] Examples live in `examples/` as standalone reviewable files
- [ ] Doug has reviewed and given feedback on at least the element and compound examples
- [ ] Insights about framework design are documented by Libby
- [ ] Tests read like documentation of both $Chemistry and chemistry
