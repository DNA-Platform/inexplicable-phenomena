# Sprint 26 board

Last updated: 2026-04-28

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| SP-1 | Audit-comment convention dry-run on bond.ts + chemical.ts | Cathy | spike | gates story execution |
| D-1 | Duplication audit pass | Cathy | story | depends on SP-1 |
| D-2 | Resolve `inertOf` / `reactiveOf` twin helpers | Cathy | story | depends on D-1 |
| D-3 | Resolve `$Particle` / `$Chemical` constructor overlap | Cathy + Arthur | story | depends on D-1 |
| D-4 | Resolve any other duplication surfaced by D-1 | Cathy | story | depends on D-1 |
| B-1 | Brittleness audit pass | Cathy + Arthur | story | depends on SP-1 |
| B-2 | Resolve `$isChemicalBase$` inherited-vs-own gate | Cathy | story | depends on B-1; Queenie's sprint-24 finding |
| B-3 | Audit `as any` / `as unknown` casts | Cathy | story | depends on B-1 |
| B-4 | Audit prototype-chain reads — own-vs-inherited | Cathy + Arthur | story | depends on B-1 |
| C-1 | Semantic confusion audit pass | All | story | depends on SP-1 |
| C-2 | Resolve `$Bond` cluster (`bid`, `isProp`, …) | All | story | depends on C-1 |
| C-3 | Resolve `$Reflection` cluster (`isReactive` vs `reactive`) | All | story | depends on C-1 |
| C-4 | Resolve `$Function$`, `$Html$` trailing-`$` | All | story | depends on C-1 |
| C-5 | Resolve `$ParamValidation` / `$Represent` / `_reactivate` | All | story | depends on C-1 |
| C-6 | Method-name pass across all classes | All | story | sprint-25 E-4 carry-forward |
| R-1 | Refactor `_reactivate` in `molecule.ts` | Cathy | story | depends on C-1 (rename first) |
| R-2 | Fragment `$Chemical` constructor body | Cathy + Arthur | story | sprint-25 ER carry-forward |
| R-3 | Factor `$()` callable dispatch by arg shape | Cathy + Arthur | story | sprint-25 ER carry-forward |
| L-2 | Per-pass docs reflection | Libby | continuous | runs alongside every E-pass |
| L-4 | Audit-finding caveat pages (one per unfixed smell) | Libby | continuous | runs alongside audit passes |
| L-5 | Sprint-25 alias index audit + final close | Libby | story | depends on C-6 |
| L-7 | Source-link sweep on entry-tier docs (overview, glossary, file-map) | Libby | story | overview/glossary/file-map cite `src/reflection.ts` and `src/chemistry/*` paths that have moved post-sprint-23. Catalogue surfaced this. |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|
| C-2 (partial) | $Bond cluster cleanup | Cathy | story | 2026-04-29 | `isProp` removed (one inline call site at chemical.ts:658), `bid` → `id`. `isField`/`isProperty`/`isMethod`/`isReadable`/`isWritable` cluster left intact (parallel with $ObjectiveRep cluster). |
| R-1 (partial) | `_reactivate` refactor in `molecule.ts` | Cathy | story | 2026-04-29 | 22 lines → 16 lines + 2 small helpers (`formBonds`, `inheritBonds`). Branch logic now reads as two clear paths (template / derivative). |

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| SP-2 | Wiki source-link convention test in 3 previewers | Libby | spike | 2026-04-28 | Reference link with `#L<line>` anchor; GitHub honors fully, VS Code degrades to file-level, Claude Code reads as offset hint. See `spikes/wiki-source-links.md`. |
| L-1 | Source-link convention + apply to existing feature pages | Libby | story | 2026-04-28 | Convention codified in `docs/readme.md`; six chemistry feature pages got anchored source links (particle, chemical, reactive-bonds, dollar-callable, render-filters, lifecycle-phases). |
| SP-1 | Audit-comment convention dry-run on bond.ts + chemical.ts | Cathy | spike | 2026-04-29 | 13 findings catalogued across 3 lenses. 3 small safe fixes landed (drop redundant `$Chemical.toString`; remove dead expression in `$SynthesisContext.isModified` setter; remove unused `$Synthesis.viewSymbol` getter). 3 AUDIT comments planted (`parseBondConstructor` regex brittleness, instance-setup duplicated 4x, dead `isViewSymbol` branch). Methodology validated: comment-or-fix fork rule emerged ("small fix? do it now. Big? AUDIT-comment it"). 428/428 green throughout. Full report in `spikes/audit-dry-run.md`. |
| L-3 | "See also" footers across chemistry doc pages | Libby | story | 2026-04-28 | Added See also sections to the four entry-tier chemistry pages that lacked them (overview, glossary, reactivity-contract, performance-contract); per-concept pages already had them. Also added status frontmatter to every entry-tier page. Surfaced L-7 (stale source paths in overview/glossary/file-map). |
| L-6 | Wiki catalogue (subject / kind / status / audience) | Libby | story | 2026-04-28 | Created `docs/catalogue.md` — curated entry point grouping all ~31 content pages by 7 subjects, by kind, by 5 statuses, and by 4 audiences. Updated `docs/index.md` to point at it as the first stop. Marked `prototypal-scoping.md` historical (orphan, superseded by `lexical-scoping.md`). |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
