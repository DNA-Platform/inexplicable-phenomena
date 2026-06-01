# Sprint 5 board

Last updated: 2026-04-04 19:39

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| E2-S1 | Expand particle.test.ts | Cathy | story | |
| E2-S4 | Write orchestrator.test.ts | Cathy | story | |
| E2-S5 | Write component.test.ts | Cathy | story | Needs @testing-library/react |
| E2-S7 | Write wrappers.test.ts | Cathy | story | |
| E2-S8 | Write atom.test.ts | Cathy | story | |
| E2-S9 | Write helpers.test.ts | Cathy | story | |
| E2-S10 | Write integration.test.ts | Cathy | story | |
| E3-S1 | Update file-map.md | Libby | story | |
| E3-S2 | Review glossary accuracy | Libby | story | |
| E3-S3 | Review overview accuracy | Libby | story | |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| SP-1 | Module dependency graph | Arthur | spike | 2026-04-04 | Proved by building — circular deps resolved with setter pattern and dynamic import |
| E1-S1 | Fix symbol descriptions and typos | Cathy | story | 2026-04-04 | $prototype$, $derived$, $particular$ fixed; $$template$$ description fixed |
| E1-S2 | Create molecule.ts | Cathy | story | 2026-04-04 | $Molecule, $Bond, $Bonding, $Reflection, $Parent, decorators. @ts-nocheck for circular dep |
| E1-S3 | Create reaction.ts | Cathy | story | 2026-04-04 | $Reaction, $State. Uses helpers for $promise/$symbolize |
| E1-S4 | Create orchestrator.ts | Cathy | story | 2026-04-04 | $BondOrchestrator, context, args, validation. Runtime wiring via $setRuntime |
| E1-S5 | Create component.ts | Cathy | story | 2026-04-04 | $Component$ — React FC factory with hooks |
| E1-S6 | Wire $Chemical | Cathy | story | 2026-04-04 | All commented code removed. Chemical fully wired to molecule, reaction, orchestrator |
| E1-S7 | Create wrappers.ts | Cathy | story | 2026-04-04 | $Function$, $Html$, $Include, $Exclude |
| E1-S8 | Implement $Atom and $Persistent | Cathy | story | 2026-04-04 | Formation lifecycle, localStorage persistence |
| E1-S9 | Create helpers.ts | Cathy | story | 2026-04-04 | $Represent, all free functions |
| E1-S10 | Update index.ts exports | Arthur | story | 2026-04-04 | Full public API exported |
| E2-S2 | Write molecule.test.ts | Cathy | story | 2026-04-04 | $Reflection, $Molecule, $Bond — 11 tests |
| E2-S3 | Write reaction.test.ts | Cathy | story | 2026-04-04 | $Reaction lifecycle — 9 tests |
| E2-S6 | Write chemical.test.ts | Cathy | story | 2026-04-04 | $Chemical construction, subclassing — 11 tests |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
