# Sprint 13: Test Architecture + Exemplar App

Three levels of testing, each testing what it's suited for. A beautiful app that proves $Chemistry enables patterns React can't match. Styled-components for visual composition. Polymorphism as the style API.

## Status: NOT STARTED

Last updated: 2026-04-13

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Book components with styled-components, React simulation tests |
| Arthur | Architect | Test restructure, assumption identification, app scaffolding |
| Libby | Librarian | Pattern documentation, misuse checklist |

## Three test levels

### Level 1: Framework unit tests (no React)

Test $Chemistry's internal logic in plain JavaScript. No DOM, no rendering.

**What belongs here:**
- Particle identity, CID generation, symbol parsing
- Lifecycle phase queues, `next()` resolution, smart phase ordering
- `reconcile()` — pure ReactNode tree comparison
- `walk()` — pure tree traversal
- `$Reflection` — reactive/inert classification, decorator registration
- `$Molecule` — property walking, bond creation, metadata
- `$Bond` / `$Bonding` — structural metadata, method wrapping logic
- `$Catalogue` — scoped environments (93 existing tests)
- Reflection — type introspection (100+ existing tests)
- `$ParamValidation` — type checking, error message formatting

### Level 2: React simulation tests (@testing-library/react)

Test that $Chemistry's assumptions about React hold true. Controlled, repeatable.

**What belongs here — every React assumption we make:**
- `useState` setter triggers re-render → `$update$({})` works
- `useEffect` fires after mount → `$resolve$('mount')` timing
- `useLayoutEffect` fires synchronously before paint → `$resolve$('layout')` timing
- `useRef` persists across re-renders → instance survives
- Two `<Book />` renders create independent instances → `Object.create` isolation
- Parent re-render with new props → child `$apply` receives them
- `fireEvent.click` → bonded method → `$update$` → DOM updates
- `reconcile` returning cached ref → React skips child reconciliation
- Unmount cleanup → `$resolve$('unmount')` fires, `$destroy$` cleans up
- Error boundaries → `$check` validation produces readable messages

### Level 3: Browser app (exemplar + validation)

For Doug. Beautiful book code. Proves $Chemistry enables patterns React can't. Tests assumptions that simulation can't verify.

**What belongs here:**
- Visual elegance — styled-components, typography, layout
- Polymorphism as style API — subclass changes presentation, parent doesn't know
- Render performance in real browser — frame timing, jank detection
- Caching behavior in vivo — expand/collapse chapters, verify responsiveness
- Complex composition — nested binding constructors across multiple levels
- The $Chemistry experience — browsable, appreciable, demonstrable

## The app's thesis

The app proves: $Chemistry makes OO-style composition work in React. Specifically:

1. **Polymorphic styling.** A `$Chapter` has semantic methods (`container()`, `heading()`, `content()`). A subclass overrides them. The view uses them. The parent doesn't know the subclass. Style changes through inheritance, not prop drilling.

2. **Typed composition.** A `$Book` receives `$Chapter[]` as typed objects. It can count content, generate a table of contents, reorder — because chapters are objects, not DOM blobs.

3. **Instance independence.** Two `<Book />` components on the same page have separate state. Expand chapters in one, the other is unaffected.

4. **Clean consumer code.** No `$` in JSX. No hooks. No render props. No context for styling. Just `<Book><Chapter title="..." /></Book>`.

## Epics

### E1: Restructure existing tests

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Move pure framework tests to tests/framework/ | Arthur | — | NOT STARTED |
| E1-S2 | Separate React simulation tests to tests/react/ | Arthur | — | NOT STARTED |
| E1-S3 | Delete tests that test application code instead of framework | Arthur | E1-S1 | NOT STARTED |
| E1-S4 | Establish misuse detection checklist in review process | Libby | — | NOT STARTED |

### E2: React assumption tests

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | $update$ triggers re-render | Cathy | E1-S2 | NOT STARTED |
| E2-S2 | Lifecycle phase timing (mount → layout → effect) | Cathy | E1-S2 | NOT STARTED |
| E2-S3 | Instance independence (two renders, separate state) | Cathy | E1-S2 | NOT STARTED |
| E2-S4 | Props re-application on parent re-render | Cathy | E1-S2 | NOT STARTED |
| E2-S5 | fireEvent → method → re-render cycle | Cathy | E1-S2 | NOT STARTED |
| E2-S6 | Reconcile cache effectiveness (React skips on ===) | Cathy | E1-S2 | NOT STARTED |
| E2-S7 | Unmount cleanup | Cathy | E1-S2 | NOT STARTED |

### E3: Book components with styled-components

Redesign the book hierarchy with semantic styling methods. No `$Page`. Web-native content model.

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Install styled-components, configure for vitest and vite | Arthur | — | NOT STARTED |
| E3-S2 | $Chapter with semantic style methods (container, heading, content) | Cathy | E3-S1 | NOT STARTED |
| E3-S3 | $Book with typed composition and table of contents | Cathy | E3-S2 | NOT STARTED |
| E3-S4 | $FancyChapter — polymorphic style override via subclassing | Cathy | E3-S2 | NOT STARTED |
| E3-S5 | $Textbook — demands $TextbookChapter, adds exercises | Cathy | E3-S2 | NOT STARTED |
| E3-S6 | Fix prop defaults — required props have no empty defaults | Cathy | E3-S2 | NOT STARTED |

### E4: The beautiful app

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | App shell with styled-components — sidebar, content area | Cathy | E3-S1 | NOT STARTED |
| E4-S2 | "The Selfish Gene" — full book with chapters, expandable | Cathy | E3-S3 | NOT STARTED |
| E4-S3 | "Biology 101" — textbook with exercises, polymorphic chapters | Cathy | E3-S5 | NOT STARTED |
| E4-S4 | Side-by-side: same book structure, different chapter styles | Cathy | E3-S4 | NOT STARTED |
| E4-S5 | Performance page — large book, visible render timing | Cathy | E3-S3 | NOT STARTED |

## Verification

- [ ] All existing framework tests pass in tests/framework/
- [ ] React assumption tests pass in tests/react/
- [ ] No test calls a binding constructor directly on application code
- [ ] No test imports $lift or any internal function
- [ ] Book components use styled-components, semantic method names
- [ ] Polymorphic styling works — subclass changes appearance
- [ ] App runs with npx vite, Doug can browse it
- [ ] Two Book instances on one page are independent
- [ ] App demonstrates patterns impossible in plain React
- [ ] Required props don't have empty-string defaults
- [ ] No abbreviations in names
