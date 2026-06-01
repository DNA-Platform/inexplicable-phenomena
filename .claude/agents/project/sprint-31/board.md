# Sprint 31 board — The Test Harness

Last updated: 2026-04-30

## Stories

| ID | Item | Owner | Effort | Notes |
|----|------|-------|--------|-------|
| A-1 | Fix II.1 — restore CaseShell (currently bare headings, no chrome) | Phillip | easy | app bug — every other section has CaseShell |
| A-2 | Unify test layout — all 8 sections use CaseShell consistently | Phillip | easy | removes the TestCard / bare-heading inconsistency |
| A-3 | Code-first panel — prism-react-renderer, always visible, dark background | Phillip + Gabby | medium | replaces the `{ } source` toggle; code IS the test |
| A-4 | Automated verdicts — live ✓/✗ assertions that update on interaction | Queenie + Phillip | hard | the core infrastructure change; verdicts as reactive computations |
| A-5 | Pass/fail/untested border color on each test card | Gabby | medium | green/red/gray left-border; depends on A-4 |
| B-1 | V.1 $text — distinguish display from input visually | Gabby | easy | different background/border for the display span |
| B-2 | Shorten verbose pass/fail criteria text across all sections | Phillip | easy | content cleanup; terse criteria |
| B-3 | Label casing consistency ($OUTER vs $count) | Gabby | easy | pick one convention |
| B-4 | Sidebar — deemphasize section IDs, lead with title | Gabby | easy | style change in sidebar.styled.ts |
| B-5 | Per-test URL anchors (#V.1/1) for linking/bookmarking | Phillip | medium | hash fragment per test within a section |
| C-1 | `$()` inverse overload — write tests | Queenie | easy | $(Component) → instance |
| C-2 | `$()` inverse overload — document in coding-conventions + for-component-authors | Libby | easy | |
| C-3 | Doc updates — method binding now works, explain getter mechanism | Libby | easy | coding-conventions.md, for-component-authors.md, chemistry-basics.md |
| C-4 | Changelog entry for sprint 30-31 breaking changes | Libby | medium | .Component removed, Chemical/bind de-exported, method binding, hasOwn fix |
| C-5 | II.5 assertions → automated verdicts (low-hanging, already computed at mount) | Queenie + Phillip | easy | depends on A-4 infrastructure |

## Ownership

- **Queenie** leads test design (what the verdicts check, what order, what the infrastructure looks like)
- **Phillip** builds the UI (code panel, verdict panel, CaseShell fixes)
- **Gabby** owns the visual design (border colors, spacing, label conventions, sidebar)
- **Libby** owns doc updates
- **Cathy** consults on framework questions only — does NOT write app code

## Sprint goal

Every test in the Lab has: visible code (always), a live interactive demo, and automated verdicts that tell Doug whether it passed. No manual reading required for pass/fail.
