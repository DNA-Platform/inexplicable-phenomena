# Sprint 25 board

Last updated: 2026-04-28 (Phase E underway — pilot + E-1 dedup + E-3 partial; 428 tests green throughout)

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| E-2 | Pass 2 — module / file names under `src/` | All | story | survey done; no candidates surfaced |
| E-3 (remainder) | `$ParamValidation`, `$Function$`, `$Html$`, `$Represent`, `$Reflection` | All | story | needs more deliberate review |
| E-4 | Pass 4 — method / function / property names | All | story | the deepest pass; biggest blast radius |
| E-5 | Pass 5 — local variables re-walk | Cathy | story | folds into E-4 per refined methodology |
| L-2 | Per-pass docs reflection | Libby | continuous | runs alongside every E-pass |
| L-4 | "See also" footers on every chemistry doc page | Libby | story | depends on E-4 |
| L-5 | Alias index deletion + wiki audit at sprint close | Libby | story | depends on E-5 |
| ER (deferred) | `_reactivate` simplification, `$Chemical` ctor fragmentation, `$()` callable factor | Cathy | story | structural work surfaced during pilot review |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| L-1 | Alias index initialized | Libby | story | 2026-04-28 | stub at `.claude/docs/_aliases-sprint-25.md`; populated with pilot + E-1 + E-3 partial entries |
| L-3 | Coding-style page (`coding-style.md`) | Libby | story | 2026-04-28 | at `.claude/docs/coding-style.md`; cross-linked from wiki index |
| SP-2 | Test-name snapshot | Queenie | spike | 2026-04-28 | manifest at `spikes/test-name-snapshot.md`; 30 files, 91 describes, 330 its; top-pinned: `$Chemical`, `$`, `$Particle` |
| SP-1 / M-1 | bond.ts pilot — methodology validation | All | spike + story | 2026-04-28 | 9 renames + 1 structural extraction (`diffuse` lifted from `bond.ts` to `scope.ts`). Methodology refined and locked. See `spikes/bond-pilot.md`. |
| M-2 | Lock methodology | All | story | 2026-04-28 | refinements folded into plan.md: in-file renames don't need their own pass; rename + extract land together; outside-in with re-walk holds at cross-module scale only |
| E-1 | Pass 1 — public surface | All | story | 2026-04-28 | `$$Properties` collapsed into `$Properties` (byte-identical duplicate). Other public-surface names already passed methodology. |
| E-3 (partial) | Pass 3 — class names — first wave | All | story | 2026-04-28 | `$BondOrchestrator` → `$Synthesis`; `$BondOrchestrationContext` → `$SynthesisContext`; `$BondArguments` → `$Reactants`; `$orchestrator$` → `$synthesis$`; `Scope` → `$Scope`. Five renames, two files (`chemical.ts`, `symbolic.ts`) plus `scope.ts` and `symbols.ts`. Synthesis is now the chemistry-domain sibling to `$Reaction` (synthesis = setup-time, reaction = runtime). |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
