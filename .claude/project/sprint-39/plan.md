# Sprint 39 — Deepening

## Direction

The app demonstrates $Chemistry. The tests verify it. The docs explain it. What's missing: depth. The tests are wide but shallow — they prove features work in isolation. Real apps combine features under pressure. A developer who picks up $Chemistry will hit the intersections: polymorphic components that load data asynchronously, typed composition with conditional children, reusable base classes extended across a design system.

This sprint builds deeper tests, polishes the app, and establishes the pattern for testing future features.

## How to test future features

When a new $Chemistry feature is proposed or implemented:

1. **Read the code.** Understand what the feature does mechanically — what it changes in the render path, the reactive system, or the composition model.

2. **Form a hypothesis.** Before writing a test, ask: "What could go wrong? What existing features might this interact with? What would a developer try to do with this?"

3. **Write a unit test first** (vitest) if the behavior can be verified without a browser — prop handling, type checking, reactive updates, serialization.

4. **Write an app test** if the behavior needs visual confirmation, user interaction, or demonstrates a pattern a developer would copy. The app test should be embedded in a real-world context — not "does this mechanism work" but "can I build this thing cleanly."

5. **Use bond-constructor composition.** Every multi-class test passes children through JSX and receives them in the bond constructor. Never `new $X()` for composition.

6. **Design for polymorphism.** If the feature involves a new base class or pattern, show it being subclassed. The test should demonstrate that the parent's code doesn't change when the child evolves.

7. **Run verify-all.** The automated runner clicks through every test. If it doesn't pass, the feature isn't shipped.

## Tests to build this sprint

### Deeper composition tests

| Test | What it proves | Context |
|------|---------------|---------|
| **Widget dashboard** | Polymorphic bond constructor with 3+ card types, each loading data independently via `async effect()`. Tests: typed children + async lifecycle + polymorphism together. | A dashboard with MetricCard (fetches a number), ChartCard (fetches series data), and StatusCard (polls for status). All extend $DashboardCard. The dashboard receives them through `$Dashboard(...cards: $DashboardCard[])`. |
| **Form with dynamic fields** | Bond constructor receives field chemicals. Field types are polymorphic: $TextField, $SelectField, $CheckboxField all extend $FormField. The form validates all fields through the base class interface. | A registration form where field types are mixed. Add a new field type by subclassing — the form doesn't change. |
| **Tabbed interface** | Conditional rendering of bond-constructor children. The tab bar shows titles, clicking a tab shows that child. Tests: mount/unmount of typed children + per-tab state preservation. | A settings panel with tabs. Each tab is a chemical with its own state. Switching tabs preserves state (the chemical persists in the bond array even when not rendered). |

### React ecosystem integration tests

| Test | What it proves | Context |
|------|---------------|---------|
| **Chemical with framer-motion** | `<motion.div>` inside a chemical's view. Animate on mount, exit on unmount. | A notification that slides in from the right and fades out on dismiss. Tests: does framer-motion's AnimatePresence work with chemical mount/unmount? |
| **Chemical reading from React context** | `useContext()` inside view() reads a theme or auth context provided by a React wrapper above. | A chemical that reads a user's name from an AuthContext and displays a greeting. Tests: do React context providers work across the chemical boundary? |

### Visual polish

| Item | What it improves |
|------|-----------------|
| Verdict dots larger (9px) | Visibility on laptop screens |
| Group headers sentence case | Less aggressive than ALL CAPS |
| Content area breathing room | Wider margins on large screens |
| Code panel file path header | Shows which file the source comes from |
| Smooth scroll to section on nav | Content scrolls to top when switching sections |

## Ownership

- **Queenie** — designs each test's hypothesis and verdict assertions
- **Phillip + Gabby** — build the demos with production polish
- **Cathy** — consults on framework behavior at intersections
- **Libby** — updates docs when tests reveal new patterns or gaps

## Sprint goal

The app tests $Chemistry at the intersections where real apps live: polymorphic composition with async data, dynamic typed forms, tabbed interfaces with state preservation, React ecosystem integration. Each test is a thing a developer would build, written the way $Chemistry intends.
