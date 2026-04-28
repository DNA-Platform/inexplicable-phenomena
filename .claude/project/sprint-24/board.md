# Sprint 24 board

Last updated: 2026-04-28 (sprint complete — 428 tests passing, no .todos)

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| L-4 | Update reactive-bonds doc when Track A lands | Libby | story | resolved — `reactive-bonds.md` already states accessors-on-instance per SP-1 finding. Effectively a no-op. |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| SP-1 | $lift derivative compatibility + prototype-mutation audit | Cathy | spike | 2026-04-28 | **Finding: current architecture already installs accessors on the instance, not the prototype.** No refactor needed. See `spikes/lift-derivative-compatibility.md`.
| SP-2 | Doc systems survey | Libby | spike | 2026-04-28 | Surveyed Diátaxis, mdBook, Tailwind, React, MDN, Vue, Stripe. Chose Diátaxis-shaped taxonomy + mdBook-style filesystem + caveats as first-class linkable files. See `spikes/doc-systems-survey.md`. |
| L-1 | Docs skeleton | Libby | story | 2026-04-28 | Scaffolded `.claude/docs/{index, readme, _template-feature, _template-caveat, _backlog-l2, _backlog-l3}.md` plus `chemistry/{features,caveats,concepts}/` and `history/` subdirs with index pages. L-2/L-3 outlines stubbed. |
| A-1 | Regression coverage — pin current bond behavior + instance-state-isolation invariant | Queenie | story | 2026-04-28 12:06 PT | 30 behavioral tests in `tests/regression/bond-behavior.test.tsx` covering: instance state isolation (3), direct writes (3), nested-structure writes (5), write-source variety (4), cross-chemical writes (2), derivative fan-out (3), lexical-scoping invariants (4), held/lifted-component combinations (5). All assertions are observable (DOM, render counts, observable values); no internal-symbol imports. Each scenario asserts both final DOM state and a render-count window so silent over-rendering is caught. Full suite: 31 files / 420 tests passing. |
| L-2 | Sprint history capture | Libby | story | 2026-04-28 | Five history pages under `.claude/docs/history/`: `sprint-22-lexical-scoping.md`, `sprint-23-audit-cleanup.md`, `particularization.md` (the prototype-mixin redesign + walked-back approaches), `dollar-error.md`, `i-of-t.md`. Project tracker `index.md` updated — sprints 22 and 23 now have proper rows linking to their history pages, replacing the L-2 capture-pending placeholders. |
| L-3 | Chemistry surface reference | Libby | story | 2026-04-28 | Eight feature pages under `.claude/docs/chemistry/features/`: `particle.md`, `chemical.md`, `dollar-callable.md`, `reactive-bonds.md` (explicitly states accessors-on-instance per SP-1), `render-filters.md`, `particularization.md`, `dollar-error.md`, `lifecycle-phases.md`. Two concept pages under `.claude/docs/chemistry/concepts/`: `lexical-scoping.md`, `derivatives-and-fan-out.md`. Plus three caveat pages under `.claude/docs/chemistry/caveats/`: `cross-chemical-handler-fanout.md` (status: stable, fix landed sprint 24), `short-prop-name-instability.md` (status: evolving, suspicion only), and `particularization-prototype-loss.md` (status: historical) — the third was filed during L-3 because the particularization feature page needed a caveat to link to. Cross-links between features, caveats, concepts, and history pages all resolve. |
| A-1 broadening + scope.finalize fanout fix verification | Regression follow-up — pin scope.finalize derivative fan-out fix + SP-1 audit blind-spots | Queenie | story | 2026-04-28 12:25 PT | 4 new tests appended to `tests/regression/bond-behavior.test.tsx` under describe `regression — invariants from SP-1 audit + scope-finalize fix`: (1) cross-chemical DOM fanout test re-instated, green after Cathy's `scope.finalize()` fix gated by `hasOwnProperty($derivatives$)`; (2) prototype-stability invariant for class methods; (3) constructor-static state stable across 5 instantiations; (4) prototype byte-stability across 10 `new $Wrapped()` particularizations + Error.prototype taint-check. **Surprise**: `collectProperties` halts at `$Foo.prototype` because `$isChemicalBase$` is inherited transitively — non-$ class methods never reach the bond-formation/$Reagent-wrapping path. Logged in test 2 comments for next-sprint follow-up. |
| Short-prop-name `$v` bug — root cause + fix | Bug — single-letter `$<x>` reactive props were silently inert | Cathy | bug | 2026-04-28 | Reproduced cleanly: `$Reflection.isSpecial` required `property.length > 2`, demoting any `$<one-char>` name to non-reactive without warning. One-character fix in `src/abstraction/bond.ts`: `>` → `>=`. Pinned by 4 tests in `tests/regression/short-prop-name.test.tsx` covering held `.Component`, `$()` dispatch, single mount, two mounts, plus a `$value` regression sentinel. Caveat at `.claude/docs/chemistry/caveats/short-prop-name-instability.md` upgraded from `evolving / suspicion` to `historical / fixed`. `.todo` removed from `bond-behavior.test.tsx`. Final suite: 32 files / 428 tests / 0 todos. |

## Cancelled (closed 2026-04-28 — SP-1 finding made these obsolete)
| ID | Item | Owner | Type | Reason |
|----|------|-------|------|--------|
| A-2 | Extract bond spec | Cathy | story | SP-1 proved accessors already live on the instance — nothing to extract |
| A-3 | Per-instance accessor stamping | Cathy | story | already true in current code |
| A-4 | Remove prototype mutation | Cathy | story | nothing to remove |
| A-5 | Performance gate | Queenie | story | no refactor to gate; A-1's prototype-stability invariant covers the regression risk |
