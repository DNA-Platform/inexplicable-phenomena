# Sprint 30: First Functional Sprint — Real Cases

The Lab's apparatus stands. This sprint fills it with real content. Specifically: real **Definition + Rules** prose, real **Cases** that exercise the framework as running chemicals, the **`?raw` source-loading pipeline**, **library↔Lab cross-links**, and a **first visual polish pass** from Gabby (newly hired).

The constraint, from Doug: this is integration testing of `$Chemistry`. Each Case is a chemical that uses the feature it demonstrates; if the framework breaks, the Lab visibly breaks. **The Lab is its own in-vivo test suite.**

The team for this sprint includes the new hire:

| Agent | Roles | Sprint-30 scope |
|-------|-------|------------------|
| Cathy | Framework Engineer, Frontend Engineer | Authoring real Cases as `$Chemistry` chemicals; ensures each Case exercises the feature it documents |
| Phillip | Frontend Engineer + UX Designer | The `?raw` source-loading pipeline; the Code Panel; co-located case files; per-section data modules |
| Gabby | Graphic Designer + Frontend Engineer | Onboarding audit + spacing-token addition + hierarchy pass; styled-components migration completion (per Phillip's plan, starting with `$Status`) |
| Queenie | QA Engineer | Coverage matrix: every Case maps to a unit test; cross-link the test names; flag gaps |
| Libby | Librarian | Section-prose source lifted into per-section markdown; library↔Lab bidirectional cross-links |
| Arthur | Architect | Per-section data modules (split `catalogue.ts`); Code Panel API design; reviews migration order |

## Status: IN PROGRESS

Last updated: 2026-04-30

## Hard Constraints

1. **Real Cases.** Each Case is a `$Chemistry` chemical that exercises the feature. No mock data, no fake demos.
2. **Source visible.** Each Case file imports its own source via Vite `?raw` and the Code Panel renders it next to the demo. No hand-typed code strings.
3. **One unit test per Case.** Every Case has a corresponding test in `tests/` that pins the same behaviour. Bidirectional cross-link.
4. **Per-section data modules.** No single 600-line `catalogue.ts`. Each section is its own file under `data/sections/<id>.ts`, owning its prose, case list, and Case-component imports.
5. **Lab still loads fast.** Lazy-import per-section so `npm run dev` doesn't compile every Case on first load.
6. **Visual polish from Gabby.** A measurable spacing/hierarchy/typography pass on every section page before sprint close.

## Pilot — § II.5 particularization

Per the catalogue, § II.5 (`new $Particle(particular)` — the carrier construction) is the cleanest pilot. It has 4 named cases in the existing data, each demonstrable in a small chemical:

1. **`new $Particle(error)` returns a particularized carrier** — runs `new $Error(realError)` and renders the result.
2. **`instanceof Error` preserved** — the demo asserts `carrier instanceof Error === true`.
3. **Original object untouched** — demo shows the original error's prototype chain unmodified.
4. **No-op for existing particle** — demo `new $Particle(other)` where other is already a particle; result === other.

Why pilot here: small surface, dense framework usage, high "did the framework break" signal, every existing test under `tests/abstraction/particularization.test.ts` already pins the behaviour.

## Stories

### A — Infrastructure (Phillip, Arthur)

| ID | Story | Owner | Notes |
|----|-------|-------|-------|
| A-1 | Per-section data modules — split `catalogue.ts` into `data/sections/<id>.ts` | Arthur + Cathy | each section's file holds id, group, title, definitionMd, rulesMd, cases:[{name,Component,sourceCode}] |
| A-2 | `?raw` source-loading pipeline — Case files import their own source | Phillip | `import source from './II-5-instanceof-error.tsx?raw'` |
| A-3 | Code Panel renders source via prism-react-renderer | Phillip | unhide the panel when a Case is mounted |
| A-4 | Lazy-load section data — `import()` per active section | Arthur | dev-load is fast |
| A-5 | Library prose source — sections' definition + rules markdown lives in `.claude/docs/chemistry/sections/<id>.md` and is imported via `?raw` | Libby + Phillip | single source of truth |

### B — Real Cases for § II.5 (pilot)

| ID | Story | Owner | Notes |
|----|-------|-------|-------|
| B-1 | Case 1: particularized carrier for an Error | Cathy | mounts a real `$Error(new Error('boom'))`, renders the view, displays carrier symbol + cid |
| B-2 | Case 2: `instanceof Error` preserved | Cathy | demo prints `carrier instanceof Error` result; PASS pill if true |
| B-3 | Case 3: original untouched | Cathy | side-by-side: original error's prototype chain before and after particularization |
| B-4 | Case 4: no-op on existing particle | Cathy | demo: passes a fresh particle, asserts result === input |
| B-5 | Real Definition + Rules prose for § II.5 | Libby + Cathy | written in markdown |
| B-6 | Cross-links: each Case links to `tests/abstraction/particularization.test.ts:<line>`; the test names are listed alongside each Case | Queenie + Cathy | bidirectional |

### C — Visual / styled-components migration (Gabby + Phillip)

| ID | Story | Owner | Notes |
|----|-------|-------|-------|
| C-1 | Gabby onboarding audit — screenshots + 5-10 prioritized visual fixes | Gabby | screenshots to `perspective/gabby/` |
| C-2 | Add `spacing.ts` tokens — 4/8/12/16/20/24/32 scale | Gabby | tighten to a single rhythm |
| C-3 | First hierarchy pass on section page — fix h1 vs lead vs body weight competition | Gabby + Phillip | with the new card sized smaller |
| C-4 | `$Status` migration to styled-components (Phillip's pilot) | Phillip | variant components per v6 pattern |
| C-5 | `$Callout` migration | Gabby + Phillip | including PASS, FAIL, BROKEN border treatments |
| C-6 | `$Header`, `$Sidebar`, `$Case` migration | Phillip + Gabby | per Phillip's order in the design-pass spike |
| C-7 | Spacing audit across the apparatus — every padding/margin sits on the new spacing tokens | Gabby | one consistency pass at the end |

### D — Coverage matrix (Queenie)

| ID | Story | Owner | Notes |
|----|-------|-------|-------|
| D-1 | Coverage matrix for § II.5 — list each existing unit test in `particularization.test.ts`; tag each as "demonstrated in Case X" or "not in Lab; documented in section prose" | Queenie | committed to the sprint folder |
| D-2 | Cross-link convention: each Case shows the test name(s); each test gets a `// @case II.5/case-1` comment for grep-ability | Queenie + Cathy | bidirectional |
| D-3 | Suite still 428 green at every commit; no test changes required by sprint design | Queenie | gate every PR |

### E — Library reflection (Libby continuous)

| ID | Story | Owner | Notes |
|----|-------|-------|-------|
| E-1 | `chemistry/sections/II.5/` markdown files — `definition.md`, `rules.md`, `see-also.md`, one per Case | Libby | imported by the Lab via `?raw` |
| E-2 | The catalogue's section page in `.claude/docs/` cross-links to its Lab page (`/lab/#/II.5`) | Libby | bidirectional |
| E-3 | Cathy/Phillip's Case patterns (the chemical shape, naming, registration with `$Lab.$cases`) get documented as a chapter in `chemistry/books/case/` | Libby | next-sprint bench prep |

## Verification checklist

- [ ] `§ II.5` section page renders 4 real Cases — each is a working chemical
- [ ] Each Case displays its actual source via the Code Panel
- [ ] Each Case links to the unit test that pins its behaviour
- [ ] Definition + Rules render from `.claude/docs/chemistry/sections/II.5/*.md`
- [ ] Section data modules under `data/sections/` — `catalogue.ts` reduced to an index
- [ ] `npm run dev` cold-load measurably faster (qualitative — visible startup difference)
- [ ] All 428 chemistry tests still pass
- [ ] Gabby's spacing tokens applied across the apparatus
- [ ] `$Status`, `$Callout`, `$Header`, `$Sidebar`, `$Case` migrated to `*.styled.ts` files (per Phillip's order)
- [ ] Header `0/N cases` counter shows `4/N` after sprint
- [ ] Sprint retro at `reviews/retro.md`

## Sequencing

1. **Day 1 (today):** A-1 (per-section data modules), A-2 (`?raw` pipeline), C-1 (Gabby's audit).
2. **Day 2:** B-1 through B-4 (the four Cases for § II.5), C-4 (`$Status` migration).
3. **Day 3:** A-3 (Code Panel rendering), A-5 (markdown imports), B-5 (real prose), C-2/C-3 (Gabby's spacing + hierarchy passes).
4. **Day 4:** D-1/D-2 (coverage matrix + cross-links), C-5/C-6 (callout/header/sidebar migrations), B-6 (link wiring).
5. **Day 5:** C-7 (spacing audit), E-1/E-2/E-3 (library reflection), retro.

## Open questions

1. **Code Panel layout when a Case is selected** — does it slide in, or is it always present and shows source for the active Case? Phillip's call once A-3 is in progress.
2. **Should the Header `cases` counter reflect "implemented" (those with status PASS/PENDING/etc.) or "implemented + planned"?** Current implementation says implemented. Confirming with Doug.
3. **Per-section markdown render** — do we ship a markdown renderer (small dep) or hand-roll a minimal one? Cathy's call.

## Risk surfacing (Arthur)

- **Per-section module pattern is new** — verify with the pilot section before scaling. If it doesn't work cleanly for § II.5, course-correct before § II.5 informs the rest.
- **Source-loading via `?raw`** — Vite-only. Confirms can't migrate to a different bundler without rewriting Code Panel. Acceptable: we're committed to Vite.
- **Real Cases stress the framework** — particularization is well-tested but the running demo may surface a real bug. Be ready to fix the framework, not work around it.
- **Gabby learning `$Chemistry` mid-sprint** — her first real chemical-edits should pair with Phillip; flying solo too early means churn.

---

## Sign-off

This document is the sprint-30 plan. Doug's sign-off opens execution. Cathy + Phillip + Gabby + Queenie + Libby execute in parallel per their tracks.
