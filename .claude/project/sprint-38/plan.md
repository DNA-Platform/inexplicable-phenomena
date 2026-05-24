# Sprint 38 — Tests That Mean Something

## Framing

Every test should answer a developer's question: "What can I build with this?" Not "does this mechanism work" — "what does this mechanism let me do that I couldn't do before, or couldn't do as cleanly?"

The team reads `why-chemistry.md` before touching code. Every test is designed from the developer's perspective, not the framework engineer's.

## Audit of existing tests

### Tests that already work well (keep as-is)

| Test | Why it works | Developer question it answers |
|------|-------------|------------------------------|
| Todo list | A real app feature. The code reads like a domain model. | "Can I build CRUD features cleanly?" |
| Tag input | Real-world form pattern. Push/splice in place. | "Can I mutate arrays without spreading?" |
| FAQ accordion | Familiar UI pattern. Set-based toggle state. | "Can I build expandable sections?" |
| Weather card | Async lifecycle. Loading → data. | "Can I load data without useEffect?" |
| Contact form | Validation, computed errors, conditional submit. | "Can I build forms without react-hook-form?" |
| Notification toasts | Auto-dismiss, collection mutation, setTimeout. | "Can I build a toast system?" |
| Settings editor | Map mutation with key-value pairs. | "Can I use Maps reactively?" |
| Feature flags | Set mutation with toggles. | "Can I use Sets reactively?" |

### Tests that need redesign (mechanism-focused, not developer-focused)

| Test | Current problem | Redesign |
|------|----------------|----------|
| **II.1/1 Like button** | Shows cross-chemical write but the context (a post with a heart) is thin. The bond constructor receives a LikeButton — but why would a real developer compose this way instead of just putting a button in the view? | **Comment thread** — a `$Comment` with `$author`, `$text`, `$likes`. A `$CommentThread` receives `$Comment` children through the bond constructor. Click ♥ on any comment. The parent shows total likes. This demonstrates: typed children, cross-chemical reads, and a pattern a developer would actually build. |
| **II.1/2 Star rating** | Demonstrates per-mount independence but the "why" is unclear. Two identical ratings side by side isn't a real UI. | **Product comparison** — two `$ProductCard` components with `$name`, `$price`, and a `$StarRating` child each. The rating IS a separate chemical composed into the card via bond constructor. Independence is obvious because the products are different. |
| **II.5/1-4 Particularization** | Assertion grids with true/false. No app context. Doug can't interact. | **Error boundary log** — a `$SafeRunner` that wraps an operation. When it throws, the Error is particularized — it becomes a renderable particle that shows the error message, stack trace, and a "retry" button. Particularization isn't abstract — it's "any JavaScript object can become a renderable component." |
| **V.3/1 Volume slider** | Two speakers controlled by one slider. Demonstrates cross-chemical write but the speakers don't DO anything — they just show emoji. | **Theme builder** — a `$ThemeControls` with hue/saturation/lightness sliders. Two `$Preview` children receive the color values and render sample UI in the selected theme. The parent writes to children, children reflect the values visually. Same mechanism, real application. |
| **V.3/2 Dashboard cards** | Two metric cards with refresh. Demonstrates sibling isolation but the metrics are random numbers — not meaningful. | **Multi-timer** — two independent `$Stopwatch` components. Start one, the other stays at zero. The parent can "reset all." Sibling isolation is visible because the timers tick independently. |
| **VI.1/1 Emoji reactions** | Three emoji buttons with counts. Demonstrates per-mount independence but the context is minimal. | Keep as-is — emoji reactions ARE a real UI pattern. But add a "total reactions" line from the parent using the bond constructor to receive and aggregate. |
| **VI.1/2 Theme switcher** | Dark/light toggle propagating to two cards. Good pattern but the cards show lorem text. | Keep concept but make the cards show actual styled content — one with a code snippet, one with a form field. The theme toggle visibly changes both. |
| **Stress/rapid-fire** | 100 increments in a loop. Framework-internal test. | **Bulk import** — paste or load 100 items at once. The list renders all of them. Shows that $Chemistry handles bulk state changes gracefully. Real pattern: importing contacts, loading a large dataset. |
| **Conditional mount** | Toggle child on/off. The child is a bare counter. | **Lazy panel** — a settings panel that only mounts when the user opens it. When closed, it unmounts. When reopened, it starts fresh (or persists — show both patterns). Real pattern: modal dialogs, dropdown panels, tabbed interfaces. |
| **Prop-pass** | Chemical passed as prop. The widget is abstract. | Fold into Comment Thread or Product Comparison — chemical-as-child-via-bond-ctor IS the pattern. Remove the standalone test. |
| **Dynamic creation** | Add items dynamically. The items are generic. | **Kanban column** — add cards to a column. Each card has a title and a "done" toggle. Cards are created by rendering more `<KanbanCard />` in the view. Shows dynamic composition in a real context. |
| **Rekey** | Shuffle list items. State survives reorder. | **Sortable playlist** — songs with play counts. Shuffle or sort by count. Each song's play count survives reorder. Real pattern: any sortable list. |
| **Propchange** | Hue slider changes swatch color. | Fold into Theme Builder — it's the same pattern (parent prop drives child appearance). |
| **Async-bind** | setTimeout and Promise.then binding. | **Chat with typing indicator** — send a message, see "typing..." for 1.5s, then the reply appears. The typing delay uses setTimeout. The reply uses Promise.resolve. Real pattern: chat UIs, optimistic updates. |
| **Deep-nest** | 4-level nesting. | Fold into Comment Thread (comments can have replies — nested composition). |
| **Error-recover** | View throws, ErrorBoundary catches. | Fold into Error Boundary Log (particularization redesign). |
| **Cond-swap** | Tab switching between Editor/Viewer. | **Rich text modes** — write in markdown (editor), preview as formatted (viewer). Same component, two modes. The chemical preserves draft between switches. Real pattern: any editor with preview. |
| **Method-fc** | Method passed to React FC. | Fold into any test that uses styled-components (they're React FCs receiving onClick). Already demonstrated everywhere. Remove standalone test. |
| **Pomodoro timer** | Countdown timer. Good but isolated. | Keep — a pomodoro timer IS a real app. But enhance: add a "sessions completed" counter that persists across reset cycles. |
| **Nested book** | Book → Chapter → Page with likes. | Keep — it's the canonical bond-constructor example. Already demonstrates typed composition and polymorphism potential. |

## Redesigned test list (ordered by developer journey)

### Getting started — "What can I build?"
1. **Todo list** (keep) — the canonical first app
2. **Contact form** (keep) — forms without hooks
3. **Comment thread** (NEW) — typed composition, cross-chemical reads, nested replies

### Reactivity — "How does state work?"
4. **Counter** (keep V.1/1) — the simplest reactive property
5. **Greeting** (keep V.1/2) — reactive strings
6. **FAQ accordion** (keep V.1/3) — reactive Sets
7. **Tag input** (keep V.4/1) — reactive Arrays
8. **Settings editor** (keep V.4/2) — reactive Maps
9. **Feature flags** (keep V.4/3) — reactive Sets with toggles

### Composition — "How do chemicals work together?"
10. **Product comparison** (NEW, replaces star rating) — two products with star rating children
11. **Theme builder** (NEW, replaces volume slider + prop-change) — parent controls, child previews
12. **Kanban column** (NEW, replaces dynamic creation) — dynamic children via view rendering
13. **Nested book** (keep) — bond constructor with typed chapters

### Lifecycle — "How do I handle async?"
14. **Weather card** (keep) — await next('mount') then fetch
15. **Chat with typing indicator** (NEW, replaces async-bind) — setTimeout + Promise in real context
16. **Pomodoro timer** (keep, enhance) — countdown with session tracking
17. **Notification toasts** (keep) — auto-dismiss lifecycle

### Patterns — "What patterns does $Chemistry enable?"
18. **Rich text editor/preview** (NEW, replaces cond-swap) — mode switching with state preservation
19. **Lazy panel** (NEW, replaces conditional mount) — mount on demand, unmount on close
20. **Sortable playlist** (NEW, replaces rekey) — reorder with state preservation
21. **Error boundary log** (NEW, replaces II.5 + error-recover) — particularized errors as renderable components
22. **Multi-timer** (NEW, replaces dashboard cards) — independent siblings

### Edge cases (keep for framework verification)
23. **Rapid-fire / bulk import** (redesign) — 100 items at once
24. **Emoji reactions** (keep, enhance) — per-mount independence with parent aggregation

## Implementation plan

**Batch 1 (highest impact — redesign existing):**
- Comment thread (replaces Like Button + Deep Nest + Prop Pass)
- Product comparison (replaces Star Rating)
- Theme builder (replaces Volume Slider + Prop Change)

**Batch 2 (new patterns):**
- Chat with typing indicator
- Rich text editor/preview
- Kanban column

**Batch 3 (cleanup):**
- Remove standalone tests that were folded in (prop-pass, deep-nest, error-recover, method-fc, propchange)
- Enhance existing tests (emoji reactions + parent aggregation, pomodoro + sessions)

**Batch 4 (stretch):**
- Sortable playlist
- Lazy panel
- Error boundary log
- Bulk import

## Ownership

- **Queenie** — reviews each redesign for testing rigor
- **Phillip + Gabby** — build the demos with production polish
- **Cathy** — consults on bond-constructor and polymorphism patterns
- **Libby** — ensures the code in source panels matches doc examples

## Sprint goal

Every test in the Lab answers "what can I build with this?" through a real application context. The code is what a developer would copy. The interaction is what a user would do. The framework feature is invisible — it just makes the code cleaner.
