# Sprint 8 board

Last updated: 2026-04-08 22:46

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| E2-S4 | Move createChemical/$bind | Cathy | story | Still on $Component$ static — needs to move to $Chemical |
| E3-S2 | Clean up $Reaction | Cathy | story | Lifecycle queues now on particle; $Reaction still has duplicate |
| E3-S3 | Update exports | Arthur | story | |
| E3-S4 | Remove dead imports | Arthur | story | |
| E4-S2 | Update smoke.test.tsx | Cathy | story | |
| E4-S6 | Update examples | Libby | story | |
| E5-S1 | Review particle.tsx | Cathy/Arthur | story | |
| E5-S2 | Review chemical.ts | Arthur | story | |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| E1-S1 | Lifecycle symbols | Cathy | story | 2026-04-08 | $phase$, $phases$, $resolve$, $update$ |
| E1-S2 | Implement next/resolve | Cathy | story | 2026-04-08 | Phase queues, smart resolution, promise-based |
| E1-S3 | Redesign use() | Cathy | story | 2026-04-08 | Produces React FC with hooks; view() stays pure |
| E1-S4 | Remove templates from particle | Cathy | story | 2026-04-08 | |
| E2-S1 | Move templates to chemical | Cathy | story | 2026-04-08 | $$template$$, $isTemplate$, $derived$ |
| E2-S2 | Override $bond$ on chemical | Cathy | story | 2026-04-08 | molecule.reactivate → orchestrator.bond → molecule.reactivate |
| E2-S3 | Component getter via use() | Cathy | story | 2026-04-08 | $createComponent$ calls this.use() |
| E2-S5 | Lifecycle methods → next() | Cathy | story | 2026-04-08 | mount/render/layout/effect/unmount delegate to next() |
| E3-S1 | Delete component.ts | Cathy | story | 2026-04-08 | $Component$ class eliminated |
| E4-S1 | Rewrite particle.test.ts | Cathy | story | 2026-04-08 | 13 tests: identity, phases, next(), use(), toString |
| E4-S3 | Update elements.test.tsx | Cathy | story | 2026-04-08 | |
| E4-S4 | Update compounds.test.tsx | Cathy | story | 2026-04-08 | |
| E4-S5 | Lifecycle tests | Cathy | story | 2026-04-08 | 9 probing tests for next() behavior |
| — | $Loader example | Cathy | story | 2026-04-08 | examples/lifecycle/loader.tsx |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
