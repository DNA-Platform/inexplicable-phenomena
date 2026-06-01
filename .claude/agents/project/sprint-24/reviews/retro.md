# Sprint 24 Retro

**Closed:** 2026-04-28. Final: 428 tests / 0 todos / 32 files green.

## What we set out to do

Move reactive bond accessors off the class prototype onto each instance. Build a wiki-style docs system in parallel.

## What actually happened

Track A's premise was wrong. SP-1 proved accessors *already* live on the instance. The whole team — Cathy, Queenie, Arthur — had a shared misconception, traceable to older sprints (likely sprint-18/19 reactivity rebuild) that moved accessors without capturing the change in durable docs.

Track A pivoted to *pinning the invariant*. The audit became the deliverable. Along the way we found and fixed two real bugs neither of us knew about:

- **`scope.finalize` missing derivative fan-out.** Cross-chemical writes inside event handlers landed on the instance but didn't repaint the DOM. Asymmetric with the no-scope path. Fixed with `hasOwnProperty($derivatives$)` gate; same gate retrofitted to the latent twin in `bond.ts`.
- **Single-letter `$<x>` props silently inert.** `$Reflection.isSpecial` required `length > 2`. `$v`, `$x`, `$y` were demoted to non-reactive without warning. One-character fix.

Track B shipped the docs system (Diátaxis-shaped + mdBook-filesystem + caveats as first-class), 5 history pages, 8 feature pages, 2 concept pages, 3 caveats, plus tracker fixes for sprints 22-23.

## What worked

- **Coverage-first.** Queenie writing the regression suite *before* code touched paid off twice — caught Cathy's first broken fix attempt within seconds, and provided cover for the `$v` repro.
- **Multiple voices in the planning conversation.** Arthur's three blind spots (reagent target, constructor-static stability, N>1 idempotence) became real tests. Without him the audit would have been narrower than its conclusion.
- **Background agents.** Libby's two parallel runs and Queenie's two ran while Cathy worked in the foreground. End-to-end wall time was a fraction of what serial would have been.
- **Caveat-as-file pattern.** Both bugs got named, durable URLs before the fix landed. The `historical` status now backstops the test that pins the fix.

## What didn't

- **The shared misconception.** All three of us walked into the sprint sure that bond accessors were on the prototype. None of us re-read the bond/molecule code before agreeing. Lesson: when the planning conversation sounds confident, that's the moment to verify, not the moment to commit.
- **Initial fix was wrong.** Cathy's first fan-out fix walked the prototype chain via property lookup, leaking writes to siblings. Queenie's existing tests caught it instantly — but it should have been caught in code review before the test run. Lesson: prototype-chain reads in framework code need an explicit own-vs-inherited decision every time.
- **`.todo` masquerading as test coverage.** Queenie's `.todo` named the symptom but deferred the work. Doug pushed back on it ("what's not right?") and the bug was reproduced + fixed in minutes. Lesson: a `.todo` for an unverified suspicion is technical debt; reproduce first, then decide between fix and caveat.

## Carry-forward to sprint-25

- **Own-vs-inherited audit.** At least three sites in the framework treat inherited prototype lookups as equivalent to own properties (`$isChemicalBase$` check in `collectProperties`, the original fan-out gate, and possibly more). Recommend a sprint-25 spike to sweep the codebase for `proto[symbol]` reads and decide each case explicitly.
- **`$Reagent` wrapper may be dead code.** Queenie's surprise: `collectProperties` halts at `$Foo.prototype` because `$isChemicalBase$` is inherited transitively, so user methods like `bump()` never reach `$Reagent.form()`. Either it's intended (handler augmentation handles all the cases reagents would have) or it's a real gap. Worth investigating before the carry-forward audit lands.
- **L-4** noted as effective no-op since `reactive-bonds.md` already states accessors-on-instance. Closeable on sight.

## Numbers

- Tests: 387 → 428 (+41), 0 todos
- Bugs fixed: 2 (scope.finalize fan-out, single-letter prop demotion)
- Stories planned: 9 (4 in Track A, 5 in Track B)
- Stories shipped: 6 (1 in Track A — A-1 broadened; 4 in Track B — L-1, L-2, L-3, plus 2 unplanned bug fixes)
- Stories cancelled: 4 (A-2, A-3, A-4, A-5 — premise-falsified)
- Docs added: 18 (1 readme, 2 templates, 5 history, 8 feature, 2 concept, 3 caveat — minus templates already counted)
