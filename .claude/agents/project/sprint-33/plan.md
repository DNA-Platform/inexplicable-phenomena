# Sprint 33 — Rigorous Tests + Visual Upgrade

## Framing

Every test is also a teaching example. The code in the source panel is the code a developer would want to write. The tests should be compelling to look at, rigorous to verify, and instructive to read.

## Track A — Stress tests

Tests that push the framework past the happy path. Each one exercises a specific mechanism under pressure and teaches a real-world pattern.

| Test | What it stresses | What it teaches |
|------|-----------------|-----------------|
| Rapid-fire counter (click + 50 times) | Scope batching, reactive finalize | "Writes inside a handler are batched — the view updates once" |
| Todo list (add, complete, delete) | Collection mutation, conditional styling, composition | "Here's how you build a real app feature in $Chemistry" |
| Nested Book → Chapter → Page (3 levels) | Catalyst graph, diffuse fan-out across prototype layers | "Reactivity propagates through nested composition" |
| Show/hide chemical (conditional render) | Mount/unmount lifecycle, $derivatives$ cleanup | "Chemicals clean up when they leave the tree" |
| Reorder list items (swap by key) | React reconciliation + derivative identity | "Chemicals keep their state when reordered" |

## Track B — Compelling examples

Visual depth beyond counters and pills. Each example should look like something a real developer would build.

| Example | Visual richness | Framework features exercised |
|---------|----------------|------------------------------|
| Todo list | Strikethrough on complete, item count, clear completed | Array mutation, conditional class, method binding |
| Color picker (HSL sliders + preview) | Three range inputs, live color swatch | Continuous reactive input, computed values |
| Live form with validation | Input fields, error messages, submit button | Bond constructor validation, $check, reactive error state |

## Track C — Visual polish

| Item | What it does |
|------|-------------|
| Verdict animation | Gray → green pulse on pass |
| File path in code header | Shows `sections/II-1/case-1.tsx` when source is expanded |
| "Why this matters" caption | One sentence per test below the subject heading |
| Category visual identity | Subtle color accent per group (not heavy) |

## Track D — Framework correctness

| Test | Bug / mechanism | Why hard to unit-test |
|------|----------------|----------------------|
| Cross-chemical fan-out timing | Does inner update in same React commit as outer's write? | Timing-sensitive; depends on React's commit phase |
| Derivative cleanup on unmount | Does $derivatives$ shrink when a mount leaves? | Requires observing internal framework state |
| Prototype pollution check | Do reactive accessors on template X leak to unrelated template Y? | Requires two independent chemicals in one tree |
| $() inverse write-through | Write to $(Component) instance; verify view updates | Tests the held-instance reactive round-trip |

## Ownership

- **Queenie** — leads test design. Decides what each test checks, what the verdicts assert, what order they appear.
- **Phillip** — builds the test chemicals and UI. Writes the code that appears in the source panel.
- **Gabby** — visual design. Makes the examples look like real apps, not toy demos.
- **Cathy** — framework consultant. Advises on stress-test edge cases, verifies correctness claims.
- **Libby** — writes the "why this matters" captions and updates docs with new patterns.

## Sprint goal

The Lab teaches $Chemistry through real examples that are beautiful to look at and rigorous to verify. Every test could fail — and when it does, Doug sees it immediately.
