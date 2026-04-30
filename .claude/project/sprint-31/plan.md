# Sprint 31 — The Test Harness

## What sprint 30 got wrong

The Lab was designed as a documentation browser with 84 catalogue sections, 76 of which were empty. The tests were buried below lorem-ipsum prose and periodic-table cards. Doug clicked 5-6 times and didn't find a test. The app's only purpose is testing — and the navigation was 90% dead space.

## What sprint 31 fixes

Strip the app to its purpose: a test harness for $Chemistry. Every page has tests. Every sidebar entry leads to something Doug can verify. No empty shells, no placeholder prose, no documentation scaffolding.

## The test template

Each test on screen has three stacked panels:

### Panel 1 — The Code (top)
Syntax-highlighted source via `prism-react-renderer` + `?raw`. This IS the test — the chemical class, the setup, the assertions. Always visible (no toggle). Doug reads this first.

### Panel 2 — The Live Result (middle)
The chemical is mounted and running. Doug interacts here — clicks buttons, types inputs, watches values change. This is where manual verification happens.

### Panel 3 — The Verdict (bottom)
Automated assertions rendered as ✓/✗ lines. Each assertion mirrors an `expect()` from the corresponding vitest test. Reactive — verdicts update as Doug interacts. Shows "expected X, got Y, ✓" in real-time.

Includes a "see also" link to the framework test file + line that backs this visual test.

### Why this order
The vitest tests read: define → render → act → assert. The visual test reads the same: read the code → see it running → check the result. Same flow, visual instead of terminal.

## Sidebar organization

Groups by framework concept, ordered simple-to-complex:

1. **The basics** — click a button, number goes up. `onClick={this.method}` works.
2. **Reactivity** — write `$count`, view re-renders. Strings, numbers, booleans. Collection mutation (Array, Map, Set).
3. **Composition** — typed JSX children via bond constructor. `$check` validation.
4. **Cross-chemical** — outer writes inner's state, inner re-renders. Sibling isolation.
5. **Lifecycle** — `await this.next('mount')`. Timer. Async data loading.
6. **Scoping** — two mounts, independent state. Held instance, shared writes.
7. **Particularization** — Error becomes particle. `instanceof` preserved.

Each group shows its test count. Only groups with tests appear. Empty groups are hidden.

## Visual design

- **Code panel:** dark background (near-terminal), syntax-highlighted, generous height
- **Live result:** neutral `paperRecessed` background — the stage
- **Verdict:** `paperRaised` with `ok`/`fail` colored verdict lines, high contrast
- **Each test:** single card frame, self-contained, stacks vertically
- **No chrome between tests** other than spacing. Page scrolls through them.

## Technical approach

- `prism-react-renderer` for syntax highlighting (already installed as devDep)
- `?raw` imports for source code (already working from sprint 30)
- Verdict assertions as reactive chemical properties — the chemical IS the test
- `$CaseShell` rewritten to the three-panel template
- Code is **read-only** — displayed code IS the running code via `?raw`. No editability this sprint.
- File naming: React convention (capital-first for Component files: `Lab.tsx`, `Header.tsx`)

## What we carry from sprint 30

- The 20 existing Case demos (refactored into the new template)
- The `sectionModules` registry pattern
- The styled-components infrastructure + theme
- react-router-dom integration
- The `$()` callable (including the new inverse overload)
- The `$Chemistry Developer` role + ability for Phillip and Gabby

## What we remove

- The 84-section catalogue browser layout
- Periodic-table cards on test pages
- Definition/Rules callouts
- Body prose / lorem ipsum
- "PLANNED" case pills
- Any page without tests

## Ownership

- **Queenie** — leads. Decides what gets tested, in what order, what the verdict assertions check.
- **Phillip** — builds the test template, the three-panel layout, the prism code panel.
- **Gabby** — visual design of the panels, the sidebar, the verdict styling.
- **Cathy** — consultant on framework gaps. Fixes the FC-children-in-bond-ctor-less-chemicals issue. Adds any framework features the test harness surfaces as needed.
- **Libby** — updates docs as the test surface reveals what's underdocumented. Documents the `$()` inverse overload.
- **Arthur** — orchestrates.

## Sprint goal

**Open the app. Every link leads to a test. Every test has code, a live demo, and a verdict. Doug can verify the framework by clicking through, top to bottom.**
