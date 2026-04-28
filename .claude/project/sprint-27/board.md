# Sprint 27 board

Last updated: 2026-04-29

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| A-1 | Move reactive-machinery members from `$Chemical` to `$Particle` | Cathy | story | depends on SP-1 |
| A-2 | Investigate `$Reactants`-as-late-binding-mirror; resolve or document | Cathy + Arthur | story | depends on SP-1 |
| A-3 | Resolve other late-binding-via-mirror patterns surfaced by SP-1 | Cathy | story | depends on SP-1 |
| A-4 | Update tests / imports broken by class-membership moves | Queenie | story | depends on A-1 |
| B-1 | Build the `particle/` book | Libby | story | depends on SP-2 |
| B-2 | Build the `chemical/` book | Libby | story | depends on B-1 |
| B-3 | Build the `bond/` book | Libby | story | depends on B-1 |
| B-4 | Build the `molecule/` / `reaction/` / `synthesis/` books | Libby | story | depends on B-1 |
| B-5 | Build the `atom/` book | Libby | story | depends on B-1 |
| B-6 | Catalogue — add "By book" section | Libby | story | depends on B-5 |
| C-1 | Survey & classify block comments in core source | Cathy + Libby | story | depends on B-1 |
| C-2 | Migrate "moves" comments to chapters; replace in code with pointers | Cathy + Libby | story | depends on C-1, B-2..B-5 |
| C-3 | Add "code → library" pointer convention to `coding-style.md` | Libby | story | depends on C-2 |
| L-7 | Source-path sweep on entry-tier docs (carry-forward from sprint-26) | Libby | story | independent |
| L-8 | Books in catalogue + status frontmatter coverage | Libby | story | depends on B-6 |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| SP-1 | Particle/chemical side-by-side audit | Cathy + Arthur | spike | 2026-04-29 | Migration table + late-binding-mirror investigation in `spikes/particle-chemical-audit.md`. Cleavage line: reactivity → $Particle; composition → $Chemical. A-2 reframed: $Reactants is information-hiding wrapper, not late-binding mirror — slim, don't eliminate. A-3 closes empty (no other mirror patterns). |
| A-2 | Slim `$Reactants` | Cathy | story | 2026-04-29 | Dropped dead `parameters` and `parameterIndex` fields and their constructor; class is now `{ values: any[] }`. Comment updated to explain its purpose as information-hiding boundary for bond ctor. |
| A-3 | Late-binding-mirror audit | Cathy | story | 2026-04-29 | Closed empty per SP-1 finding — no other instances in the codebase. |
| A-1 | Move reactive machinery from `$Chemical` to `$Particle` | Cathy | story | 2026-04-29 | All reactive-machinery moves landed: `[$molecule$]`, `[$reaction$]`, `[$template$]`, `[$$template$$]`, `[$isTemplate$]`, `[$derived$]`, `[$component$]` field declarations + initialization; async `mount/render/layout/effect/unmount`; `Component` getter (lift-path); `$isChemicalBase$` sentinel — all on `$Particle` now. `$Chemical.constructor` reduced to 4 lines (composition-only: `$$parent$$`, `$catalyst$`, `$synthesis$`). `$Chemical.Component` override remains (handles template path via `$createComponent`). `$parent` setter commented to explain catalyst-graph reaction rewiring. **Subtle behavior change**: every particle now carries `$Molecule` and `$Reaction` from construction; particularization now allocates these even for non-chemical carriers. Suite 428/428 green throughout. |
| SP-2 | Book structure dry-run on `particle/` | Libby | spike | 2026-04-28 | Six-chapter `particle/` book at `chemistry/books/particle/`; three migrated comments; pointer convention; chapter-split heuristic codified for B-2..B-5. Suite green at 428/428. See [`spikes/book-structure-dry-run.md`](./spikes/book-structure-dry-run.md). |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
