# Sprint 35 — Comprehensive Test Coverage

## Purpose

Catalog every use case a $Chemistry developer would encounter, design a test for each, and prioritize for implementation. This is the "proof of correctness" sprint — when it's done, we'll know where the framework is solid and where it has gaps.

## Use Case Catalog

### A — Core reactivity (the basics that must always work)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| A1 | Number increments | Counter with + button | ✅ Done (II.1/1) |
| A2 | String updates live | Greeting that changes as you type | ✅ Done (V.1/2) |
| A3 | Boolean shows/hides | FAQ accordion with expand/collapse | ✅ Done (V.1/3) |
| A4 | Array push/pop/splice | Tag input with removable pills | ✅ Done (V.4/1) |
| A5 | Map set/delete | Settings editor with key-value pairs | ✅ Done (V.4/2) |
| A6 | Set add/delete | Feature flag toggles | ✅ Done (V.4/3) |
| A7 | Rapid-fire batching | 100 increments in one method call | ✅ Done (stress) |
| A8 | Negative numbers / decrement | Counter going below zero | Not yet |
| A9 | Object property mutation | `this.$config.theme = 'dark'` — nested object write | Not yet |
| A10 | Null/undefined transitions | Property goes from value → null → value | Not yet |

### B — Composition (chemicals using chemicals)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| B1 | Two chemicals via reference | Like button writes to post | ✅ Done (II.1/1) |
| B2 | Bond constructor with typed children | Book → Chapter → Page | ✅ Done (nested, III.3) |
| B3 | Cross-chemical write | Volume slider → speakers | ✅ Done (V.3/1) |
| B4 | Sibling isolation | Dashboard cards | ✅ Done (V.3/2) |
| B5 | Per-mount independence | Emoji reactions | ✅ Done (VI.1/1) |
| B6 | Host write to derivatives | Theme switcher | ✅ Done (VI.1/2) |
| B7 | Chemical passed as prop | Widget passed via JSX props | 🔨 Building |
| B8 | Dynamic chemical creation | Items created at runtime with `new` | 🔨 Building |
| B9 | Deeply nested (4+ levels) | App → Page → Section → Card → Button, write at leaf propagates | Not yet |
| B10 | Chemical renders chemical conditionally | `this.$mode === 'edit' ? <Editor /> : <Viewer />` | Not yet |
| B11 | Chemical array with mixed types | List containing `$Text` and `$Image` chemicals — heterogeneous | Not yet |
| B12 | Chemical passed through multiple layers | Grandparent creates, passes to parent, parent passes to child | Not yet |

### C — Lifecycle (mount, unmount, async)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| C1 | Async data loading | Weather card with `effect()` | ✅ Done (II.4/1) |
| C2 | Timer with start/stop | Pomodoro timer | ✅ Done (II.4/2) |
| C3 | Conditional mount/unmount | Toggle child on/off | ✅ Done (mount) |
| C4 | Mount → fetch → error → retry | A loader that fails once, then succeeds on retry | Not yet |
| C5 | Multiple async effects | Two independent fetches, both resolve | Not yet |
| C6 | Unmount cancels pending work | Start a timer, unmount, verify no leak | Not yet |
| C7 | Remount restores from props | Unmount chemical, remount with same props, verify state | Not yet |

### D — Props and the membrane (the $ boundary)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| D1 | Props changing over time | Color picker → swatch | 🔨 Building |
| D2 | Key-based reordering | Shuffle list items, state survives | 🔨 Building |
| D3 | Default prop values | Chemical with `$size = 'medium'`, rendered without prop, verify default | Not yet |
| D4 | Prop type coercion | Pass number `count={5}` → does `$count` receive number or string? | Not yet |
| D5 | Spread props | `<Widget {...config} />` — do multiple props arrive correctly? | Not yet |
| D6 | Children as ReactNode prop | `<Shell demo={<Counter />} />` — our CaseShell pattern | ✅ Done (CaseShell is a chemical) |

### E — Method binding (the headline promise)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| E1 | onClick={this.method} | Counter increment | ✅ Done (II.1) |
| E2 | Method in setTimeout | `setTimeout(this.tick, 1000)` — does `this` bind? | Not yet |
| E3 | Method in Promise.then | `fetch().then(this.handleResponse)` | Not yet |
| E4 | Method passed as prop to React FC | `<Button onClick={this.save} />` where Button is a function component | Not yet |
| E5 | Method on inherited class | `$Child extends $Parent`, child uses parent's method in onClick | Not yet |
| E6 | Method reference in array.map | `items.map(this.renderItem)` — does `this` bind in the callback? | Not yet |

### F — Error handling (what happens when things go wrong)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| F1 | Bond constructor $check fails | Wrong child type → formatted error | ✅ Done (III.3/2) |
| F2 | View throws during render | Chemical's view() throws — does ErrorBoundary catch it? | Not yet |
| F3 | Method throws during handler | onClick handler throws — does the app survive? | Not yet |
| F4 | Invalid prop value | Pass `count="not a number"` — what happens? | Not yet |

### G — The `$()` callable (all forms)

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| G1 | Class form `$($X)` | Used everywhere | ✅ Done |
| G2 | Instance form `$(x)` | Used in V.3, VI.1 for held instances | ✅ Done |
| G3 | Inverse form `$(Component)` | Tested in unit tests | ✅ Done (unit test) |
| G4 | String form `$('div')` | HTML catalogue — render a reactive div | Not yet |
| G5 | JSX form `<$>...</$>` | Fragment wrapper | Not yet |
| G6 | Class form with constructor args | `$($X)` where X takes constructor args | Not yet |

### H — Decorators and reflection

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| H1 | `@inert` opts out of reactivity | Field with `@inert` doesn't trigger re-render on write | Not yet |
| H2 | `@reactive` opts in for non-$ field | Field without `$` prefix but decorated `@reactive` triggers re-render | Not yet |
| H3 | Private-by-convention `_field` | Underscore field is not reactive | Not yet |

### I — Performance and scale

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| I1 | 100 increments batched | Rapid-fire counter | ✅ Done (stress) |
| I2 | 100-item list render | Render 100 chemicals, measure time | Not yet |
| I3 | Deep update propagation | 10-level deep chemical tree, write at root, measure leaf | Not yet |

### J — React ecosystem integration

| # | Use case | Test design | Status |
|---|----------|------------|--------|
| J1 | react-router inside chemical | Chemical reads useParams in view | ✅ Done (Lab) |
| J2 | styled-components composition | Used throughout | ✅ Done |
| J3 | prism-react-renderer in chemical | CaseShell renders Highlight | ✅ Done |
| J4 | Chemical inside React.memo | Does memoization interfere with reactive updates? | Not yet |
| J5 | Chemical inside Suspense boundary | Lazy-loaded chemical — does it work? | Not yet |
| J6 | React portal with chemical inside | Chemical rendered via createPortal | Not yet |

## Totals

- **Done:** 30 use cases covered
- **Building now:** 4 (adversarial edge cases)
- **Not yet:** 36 use cases identified

## Priority tiers for implementation

**Tier 1 — Must have (blocks confidence):**
E2 (setTimeout binding), E3 (Promise.then binding), B9 (4+ level nesting), D3 (default props), F2 (view throws), A9 (nested object mutation)

**Tier 2 — Should have (common patterns):**
C4 (fetch-error-retry), E4 (method as FC prop), B10 (conditional component swap), D5 (spread props), H1 (@inert), H2 (@reactive)

**Tier 3 — Nice to have (exotic scenarios):**
G4 ($('div')), G5 (<$>), J4 (React.memo), J5 (Suspense), J6 (portal), I2 (100-item list)

## Sprint goal

Design tests for all Tier 1 items. Implement as many as fit. Each test is a mini-application that teaches the pattern while verifying the mechanism.
