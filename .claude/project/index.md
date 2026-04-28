# Project Tracker

Read this file first when resuming work. It tells you where we are.

## Current sprint: sprint-27 (Crystallization — particle/chemical alignment + library books) — IN PROGRESS

**Plan:** [sprint-27 plan] — two coupled motions. **Motion 1 (Cathy + Arthur):** realign `$Particle` and `$Chemical` — reactivity moves to `$Particle`, composition stays on `$Chemical`. Eliminate dynamic binding (the bond-ctor-by-class-name lookup is the canonical example). **Motion 2 (Cathy + Libby):** code becomes sparse — block comments migrate into per-class **books** under `docs/chemistry/books/{class}/` with chapters as separate files. Library structure mirrors source where it helps readers. Code → library pointers replace migrated comments. Sprint-26 deferred work (Distillation lenses) continues in parallel as discovered.

## Previous sprint: sprint-26 (Distillation — code audit) — PARTIAL

**Plan:** [sprint-26 plan] — three lenses on the codebase: duplication, brittleness, semantic confusion. Each lens has its own audit method and produces a triage decision (fix this sprint, or document as caveat). Absorbs sprint-25 deferred work — E-3 remainder, E-4 (methods), E-5, ER refactoring (`_reactivate`, `$Chemical` ctor, `$()` callable), L-2/L-4/L-5 — under the audit umbrella. New: Libby's wiki gains a navigation tier, with feature pages linking directly into source files. Methodology refinement: gate scales with blast radius (module-private = one voice; cross-module = three voices propose; public surface = three voices + Doug sign-off).

## Previous: sprint-25 (Resonance — naming, structure, and the wiki brain) — COMPLETE

**Plan:** [sprint-25 plan] — naming sprint. Methodology validated on bond.ts pilot. 14 renames + 1 structural extraction landed (`fanOutToDerivatives` → `diffuse`, `installReactiveAccessor` → `activate`, `$BondOrchestrator` family → `$Synthesis` family, `Scope` → `$Scope`, `$$Properties` collapsed into `$Properties`). Wiki gained alias index + coding-style page. Deferred work (E-3 remainder, E-4 methods, E-5 locals, ER refactoring, L-2/L-4/L-5) absorbed into sprint-26. 428 tests green throughout. Retro at [sprint-25 retro].

## Previous: sprint-24 (Instance-Owned Bond Accessors + Library Docs Organization) — COMPLETE

**Plan:** [sprint-24 plan] — two parallel tracks. Track A's planned refactor (move bond accessors off prototypes) was *cancelled* after SP-1 proved the architecture already installs accessors on the instance — Cathy, Queenie, and Arthur misremembered. Track A pivoted to pinning the invariant + fixing two real bugs found along the way: (1) `scope.finalize()` was missing derivative fan-out so cross-chemical writes inside event handlers didn't update held-instance DOM (gated fix with `hasOwnProperty($derivatives$)` to preserve lexical scoping); (2) `$Reflection.isSpecial` required `length > 2`, silently demoting single-letter `$<x>` props to inert (one-character `>` → `>=` fix). Track B built the `.claude/docs/` wiki-style docs system with Diátaxis-shaped taxonomy + caveats as first-class linkable files, captured sprints 22-23 history + particularization narrative, and documented the chemistry surface in 8 feature pages + 2 concept pages + 3 caveat pages. Final: 428 tests / 0 todos / 32 files green; benchmarks healthy.

## Previous: sprint-21 (Performance Baseline and Targets) — B1 COMPLETE, SHIP DECISION MADE

**Plan:** [sprint-21 plan] — three-tier benchmark plan. Micro-benchmarks (B1) landed and **v1 ship criteria all met**. Accessor overhead ~1x, scope cost ~5μs, $symbolize small state <500ns. Performance contract documented. Component-level and macro benchmarks (B2, B3) remain as follow-up; not v1-blocking.

## Previous: sprint-20 (Test Suite as Specification) — COMPLETE

**Plan:** [sprint-20 plan] — test-by-test audit and cleanup. 323 → 286 tests. Unrelated subsystems relocated; ~37 IMPLEMENTATION tests deleted or rewritten as BEHAVIOR. Test suite now reads as a specification.

## Previous: sprint-19 (Scope-Tracked Reactivity) — IN PROGRESS (foundation complete)

**Plan:** [sprint-19 plan] — scope tracking via getter/setter interception, $symbolize snapshots. Foundation landed with 323 tests green. R6, R8–R17 pending.

## Previous: sprint-18 (Reactivity Rebuild) — PARTIAL (foundation landed)

**Plan:** [sprint-18 plan] — built reactive methods + view augmentation + view diff. Foundation for sprint-19. Methods wrappers, handler augmentation, and equivalent() all in place. 281 tests green.

## In-progress: sprint-17 (The Library Sprint)

**Plan:** [sprint-17 plan] — every agent researches what they need to make durable, framework-level decisions. Cathy's books (reactivity-models, view-introspection) are written. Other agents' books in progress.

## Next: sprint-14 (The Showcase) — NOT STARTED

**Plan:** [sprint-14 plan] — professional app with guided tests, inline code preview, React assumption verification, and visual design language.

## Previous: sprint-13 (Test Architecture + Exemplar App) — COMPLETE

**Result:** Tests restructured into framework/ and react/. React assumption tests (6). Cookbook with styled-components and polymorphism. App verified working via Puppeteer. Bugs fixed: orchestrator child flattening, child prop application, require() in browser. 261 tests.

## Previous: sprint-12 (Books) — COMPLETE

**Result:** .Component pattern fixed. $lift replaces use (internal). $Bonding uses this correctly. view/toString excluded from bonding. Instance management via useRef.

## Previous: sprint-11 (Unification) — COMPLETE

**Result:** walk.ts centralizes React DOM traversal (39 lines). reconcile built on walk. Orchestrator uses walk. Performance optimizations: zero-allocation for unchanged arrays, no Object.keys in reconcile, $Bonding stores wrapper once instead of per-access. 280 tests.

## Previous: sprint-10 (View Diffing) — COMPLETE

**Result:** Property interception eliminated. molecule.ts 681→307, reaction.ts 245→34, $State deleted, diff.ts created, component.ts deleted. Integration test proves reactive loop works. Review identified orchestrator as next target.

## Previous sprint: sprint-6 (Canonical Examples) — PAUSED

**Status:** PAUSED — examples exposed comprehension gaps. Smoke test and element tests valid. Compound tests encode incorrect API usage. Sprint 7 builds the understanding needed to resume.

## Previous sprint: sprint-5 (The Lift) — COMPLETE

**Status:** COMPLETE

**Result:** Archive monolith split into 8 modules. 214 tests passing. Chemical fully wired. Atom implemented. All E1 stories done. E2/E3 deferred to sprint-6+.

## Sprint history

| Sprint | Name | Status |
|--------|------|--------|
| sprint-1 | Exploration | Complete — proved UIA polling is the only viable approach |
| sprint-2 | Relay Refactor | Complete — all phases implemented, commands integrated |
| sprint-3 | [Workspaces][sprint-3 plan] | Closed — workspace infrastructure established, library spike deferred |
| sprint-4 | [$Chemistry][sprint-4 plan] | Complete — 33 stories, framework lifted, building, tested, documented |
| sprint-5 | [The Lift][sprint-5 plan] | Complete — archive split into 8 modules, 214 tests, chemical wired |
| sprint-6 | [Canonical Examples][sprint-6 plan] | Paused — exposed comprehension gaps, resumed after sprint 7 |
| sprint-7 | [Deep Read I][sprint-7 plan] | Complete — render pipeline, lifecycle bridge, enduring insights documented |
| sprint-8 | [Particle Rendering][sprint-8 plan] | Complete — use()/bind() free functions, $Component$ deleted, lifecycle on particle |
| sprint-9 | [Deep Read II][sprint-9 plan] | Complete — diffing analysis, test gaps, archive deleted, sprint 10 planned |
| sprint-10 | [View Diffing][sprint-10 plan] | Complete — property interception eliminated, pure view diffing works |
| sprint-11 | [Unification][sprint-11 plan] | Complete — walk.ts centralizes traversal, performance optimized |
| sprint-12 | [Books][sprint-12 plan] | Complete — .Component fix, $lift, instance management, book components |
| sprint-13 | [Test Architecture][sprint-13 plan] | Complete — test restructure, React assumptions, app bugs fixed |
| sprint-17 | [Library Sprint][sprint-17 plan] | In progress — Cathy's books written, others pending |
| sprint-18 | [Reactivity Rebuild][sprint-18 plan] | Partial — foundation landed (augment + bond + diff); 281 tests green |
| sprint-19 | [Scope-Tracked Reactivity][sprint-19 plan] | In progress — foundation landed (scope + accessor + $symbolize); 323 tests green |
| sprint-20 | [Test Suite as Specification][sprint-20 plan] | Complete — 323 → 286 tests; implementation-heavy tests deleted or rewritten as behavior |
| sprint-21 | [Performance Baseline and Targets][sprint-21 plan] | B1 complete — v1 ship criteria met; accessor ~1x, scope ~5μs; contract doc written |
| sprint-22 | [Lexical Scoping & The Beautiful API][sprint-22 history] | Complete — `$Particle` becomes leaf, `$Chemical` extends it, `$lift` per-site derivatives, `$()` dispatch surface, particularization redesign |
| sprint-23 | [Audit Cleanup][sprint-23 history] | Complete — audience-2 surface tightened, public statics symbol-keyed, vocabulary pass, `$particular$` finished, `Component`/`$Component` getter collapse |
| sprint-24 | [Instance-Owned Bond Accessors + Docs Organization][sprint-24 plan] | Complete — Track A refactor cancelled (SP-1 found it already done); 2 real bugs fixed (scope.finalize fan-out, single-letter prop reactivity); Track B docs system live with 13 pages + 3 caveats; 428 tests / 0 todos |
| sprint-25 | [Resonance][sprint-25 plan] | Complete — methodology validated, 14 renames landed, 428 tests green; deferred work absorbed into sprint-26 |
| sprint-26 | [Distillation][sprint-26 plan] | Partial — methodology validated, 6 fixes landed (3 dead-code deletions, $Bond cluster cleanup, `_reactivate` refactor, AUDIT comments); catalogue + see-also footers built; 428 tests green; remaining audit lenses carry forward to sprint-27 as discovered |
| sprint-27 | [Crystallization][sprint-27 plan] | In progress — particle/chemical realignment + library books |

## Next considerations

- $Chemistry v2 classes don't work together yet — particle, chemical, and atom need integration stories
- 12 pre-existing particle test failures from the `$use` refactor remain unfixed
- Curated hand-written examples of target $Chemistry code (Doug's workflow) haven't started
- No CI/CD pipeline exists yet (David's `.github/**` territory is empty)
- Team system review (2026-03-31) suggested: add path validation to `/organize`, consider a role structural template

## Team

Read the [role files][roles] and their [abilities] before executing as any teammate. The role files explain what to load and how context-loading works.

### Roles

Roles are **perspectives on code**, not operational procedures. Each role shapes how an agent approaches a story that changes or extends the code they maintain. The abilities a role loads encode the specific knowledge that makes that perspective effective.

| Name | Lens | Mantra |
|------|------|--------|
| [Architect] | Package architect — workspace boundaries, dependency graphs, monorepo structure | Every package earns its boundary |
| [DevOps Engineer] | Operations engineer — scripts, build pipelines, cross-language tooling | Automate the obvious, document the rest |
| [Automation Engineer] | Automation engineer — relay system, listener loop, message processing | Every message arrives exactly once |
| [Frontend Engineer] | Component builder — React, view composition, component APIs | The component is the API |
| [Framework Engineer] | Language designer — type systems, metaprogramming, prototype delegation | The abstraction must be faithful to the concept |
| [Librarian] | Knowledge curator — documentation, reference materials, terminology | If they can't find it, it doesn't exist |

### Agents

| Name | Roles | Territory |
|------|-------|-----------|
| [Arthur] | Architect | Catch-all owner (**), primary for workspaces, global structure, team system |
| [David] | DevOps Engineer | .github/, CI/CD, build pipelines |
| [Adam] | Automation Engineer | Relay scripts, listen/hear/speak skills, .authors/*/src/ |
| [Cathy] | Framework Engineer, Frontend Engineer | library/chemistry/**, primary developer for $Chemistry |
| [Libby] | Librarian | .claude/docs/**, all documentation |

See the [agent registry] for path patterns. Use `/responsible` to query ownership.

<!-- citations -->
[sprint-3 plan]: sprint-3/plan.md
[sprint-4 plan]: sprint-4/plan.md
[sprint-5 plan]: sprint-5/plan.md
[sprint-5 board]: sprint-5/board.md
[sprint-6 plan]: sprint-6/plan.md
[sprint-6 board]: sprint-6/board.md
[sprint-7 plan]: sprint-7/plan.md
[sprint-7 board]: sprint-7/board.md
[sprint-8 plan]: sprint-8/plan.md
[sprint-8 board]: sprint-8/board.md
[sprint-9 plan]: sprint-9/plan.md
[sprint-10 plan]: sprint-10/plan.md
[sprint-11 plan]: sprint-11/plan.md
[sprint-12 plan]: sprint-12/plan.md
[sprint-13 plan]: sprint-13/plan.md
[sprint-14 plan]: sprint-14/plan.md
[sprint-17 plan]: sprint-17/plan.md
[sprint-18 plan]: sprint-18/plan.md
[sprint-19 plan]: sprint-19/plan.md
[sprint-20 plan]: sprint-20/plan.md
[sprint-21 plan]: sprint-21/plan.md
[sprint-22 history]: ../docs/history/sprint-22-lexical-scoping.md
[sprint-23 history]: ../docs/history/sprint-23-audit-cleanup.md
[sprint-24 plan]: sprint-24/plan.md
[sprint-25 plan]: sprint-25/plan.md
[sprint-25 retro]: sprint-25/reviews/retro.md
[sprint-26 plan]: sprint-26/plan.md
[sprint-27 plan]: sprint-27/plan.md
[roles]: ../team/roles/
[abilities]: ../team/abilities/
[Architect]: ../team/roles/architect.md
[DevOps Engineer]: ../team/roles/devops-engineer.md
[Automation Engineer]: ../team/roles/automation-engineer.md
[Frontend Engineer]: ../team/roles/frontend-engineer.md
[Framework Engineer]: ../team/roles/framework-engineer.md
[Librarian]: ../team/roles/librarian.md
[Arthur]: ../team/agents/arthur.md
[David]: ../team/agents/david.md
[Adam]: ../team/agents/adam.md
[Cathy]: ../team/agents/cathy.md
[Libby]: ../team/agents/libby.md
[agent registry]: ../team/agents/registry.json
