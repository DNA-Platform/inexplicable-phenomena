# Sprint 30 board

Last updated: 2026-04-30 (post-cleanup)

## Backlog (live work — what's left to ship the sprint)

| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| **B-7** | § II.1 — minimal $Particle subclass + identity (3 Cases) | Cathy | story | next pilot section after II.5 |
| **B-8** | § II.7 — the `$()` callable (4 Cases: class form, instance form, string tag, JSX form) | Cathy | story | most-used API — high value |
| **B-9** | § III.3 — the binding constructor (4 Cases: method-named-after-class, typed JSX children, spread args, async) | Cathy | story | distinctive feature |
| **B-10** | § V.1 — reactive properties (3 Cases) | Cathy | story | shows the reactivity payoff |
| A-3 | Code Panel renders source via prism-react-renderer | Phillip | story | currently `<pre>` — works, but unstyled |
| A-4 | Lazy-load section data via `import()` | Arthur | story | small win once 4+ sections have modules |
| A-5 | Library markdown prose source for section bodies | Libby + Phillip | story | replaces lorem-ipsum |
| B-5 | Real Definition + Rules prose for § II.5 | Libby + Cathy | story | depends on A-5 |
| B-6 | Test cross-links — `// @case II.5/1` markers in framework tests pointing at the Case files | Queenie + Cathy | story | depends on B-1..B-4 (done) |
| C-1 | Gabby onboarding audit (5-10 prioritized visual fixes) | Gabby | story | post-cleanup, surface anything still off |
| C-2 | `spacing.ts` tokens | Gabby | story | spacing values currently inline in styled atoms |
| C-3 | Hierarchy pass — h1/lead/body type ramp | Gabby + Phillip | story | typography pass |
| C-7 | Spacing audit across apparatus | Gabby | story | end of sprint |
| D-2 | `// @case II.5/case-1` comment cross-links in tests | Queenie + Cathy | story | depends on D-1 |
| D-3 | 428 tests still green at every commit | Queenie | continuous | **gate** |
| E-1 | `chemistry/sections/II.5/*.md` library prose | Libby | story | source for B-5 |
| E-2 | Catalogue ↔ Lab bidirectional links | Libby | story | depends on E-1 |
| E-3 | Case-pattern documentation in `books/case/` | Libby | story | next-sprint prep |

## In Progress

| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|
| D-1 | § II.5 coverage matrix | Queenie | story | 2026-04-30 | parallel with B-track |

## Done

| ID | Item | Owner | Completed | Notes |
|----|------|-------|-----------|-------|
| Pre-sprint | Gabby hired | Arthur | 2026-04-30 | role + agent + registry |
| Pre-sprint | Card sized down to 132×132; content max-width 1080px | Cathy | 2026-04-30 | |
| B-1..B-4 | § II.5 particularization — 4 Cases | Cathy | 2026-04-30 | live demos, ✓/✗ criteria, source toggle |
| A-1 | Per-section data modules; `catalogue.ts` shape index | Phillip + Cathy | 2026-04-30 | `Section.cases` → `Section.planned`; registry at `sections/index.ts` |
| A-2 | `?raw` source-loading pipeline | Phillip | 2026-04-30 | per-Case files at `sections/{id}/case-{n}.tsx` |
| **CLEANUP-1** | Framework: `Component` getter renamed to `[$resolveComponent$]` symbol | Cathy | 2026-04-30 | public API: `$()` only; getter removed |
| **CLEANUP-2** | Public API: `Chemical` Component export and `bind` re-export removed | Cathy | 2026-04-30 | `$Particle`/`$Chemical` are bases; not exported as Components |
| **CLEANUP-3** | App: hand-rolled `$Router` deleted; `react-router-dom` integrated | Phillip | 2026-04-30 | path-based routing, deep links |
| **CLEANUP-4** | App: all 12 inline-`style={{}}` files migrated to styled-components | Phillip + Cathy + Gabby | 2026-04-30 | 61 inline-style sites → styled atoms reading theme |
| **CLEANUP-5** | App: every chemical file exports its own Component via `$()`; no `new $X().Component` anywhere | Phillip + Cathy | 2026-04-30 | 11 app sites + 51 test sites + framework internal sites |
| **CLEANUP-6** | `$Status`, `$Callout` made zero-prop; theme bound at the styled-component | Cathy | 2026-04-30 | per Doug's "minimize `$` props" feedback |
| C-4 | `$Status` styled-components migration | Phillip | 2026-04-30 | folded into CLEANUP-6 |
| C-5 | `$Callout` migration | Phillip + Cathy | 2026-04-30 | folded into CLEANUP-6 |
| C-6 | `$Header`, `$Sidebar`, `$Case` migration | Phillip + Cathy | 2026-04-30 | folded into CLEANUP-4 |
| **DOCS** | Author curriculum: index, for-component-authors, composing-with-react, when-to-reach-for-a-chemical | Libby | 2026-04-30 | 30-min reading path; doc-first rule locked in |
| **DOCS** | `coding-conventions.md`, `glossary.md`, `overview.md` updated for `$()` form; `books/particle/component.md` demoted | Libby | 2026-04-30 | + 10 example .tsx files migrated |

## Blocked

(none)
