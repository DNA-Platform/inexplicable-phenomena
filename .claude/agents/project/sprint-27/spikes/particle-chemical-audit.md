# SP-1: Particle / Chemical Side-By-Side Audit

**Owners:** Cathy + Arthur
**Date:** 2026-04-29
**Status:** COMPLETE — migration table below drives A-1; late-binding investigation below drives A-2

## Reading

- `library/chemistry/src/abstraction/particle.ts` (~290 lines) — read in full this session
- `library/chemistry/src/abstraction/chemical.ts` (~934 lines) — read this session and prior
- Cross-reference: `bond.ts`, `molecule.ts`, `reaction.ts`, `atom.ts`

## Cleavage line — proposal

The framework's design intent (per Doug, sprint-25 history, and the post-particularization picture) is:

- **`$Particle`** = anything with reactive properties, identity, lifecycle, and a view. Particularizable. Liftable. Has `Component`.
- **`$Chemical`** = a particle that *contains* other particles. Adds children processing, JSX-as-bond-args, the bond ctor lookup, the catalyst graph for cross-chemical reaction propagation.

The current code violates this line: `$Chemical` carries reactive machinery (`$molecule`, `$reaction`, instance setup, template tracking, async lifecycle helpers) that should be on `$Particle`.

## Migration table

| Member | Current home | Proposed home | Reason |
|---|---|---|---|
| `[$molecule$]` field | `$Chemical` | **`$Particle`** | Reactive machinery — particles need it for reactive `$show`/`$hide`/user props |
| `[$molecule$]` initialization | `$Chemical.constructor` | **`$Particle.constructor`** | Same — particles need molecules from construction |
| `[$reaction$]` field | `$Chemical` (also stub on `$Particle`) | **`$Particle`** (consolidate) | Already on `$Particle` as optional; promote to required-after-construction |
| `[$reaction$]` initialization | `$Chemical.constructor` | **`$Particle.constructor`** | Same |
| `[$template$]` field | `$Chemical` | **`$Particle`** | `$lift` derivatives inherit `[$template$]`; particles can be lifted |
| `[$$template$$]` static | `$Chemical` | **`$Particle`** | Same — `$lift` machinery is particle-level |
| `[$isTemplate$]` getter | `$Chemical` | **`$Particle`** | Depends on `$$template$$` |
| `[$derived$]` getter | `$Chemical` | **`$Particle`** | Depends on `[$template$]` |
| `async mount/render/layout/effect/unmount` | `$Chemical` | **`$Particle`** | Thin wrappers around `next(phase)`; phase API already on `$Particle` |
| `Component` getter (lift path only) | `$Chemical` | **`$Particle`** (basic) + override on `$Chemical` (template path) | Particles need `Component` for particularization (`$Error.Component`); overrides for chemical templates use `$createComponent` |
| `[$component$]` field | `$Chemical` | **`$Particle`** | Backing for `Component` getter |
| `[$destroy$]` | `$Chemical` | Split: molecule/reaction cleanup → `$Particle`; composition cleanup stays on `$Chemical` | Each layer owns its own cleanup |
| `[$bond$]` template method | empty stub on `$Particle`; real on `$Chemical` | **STAYS** as is | Stub-on-particle / override-on-chemical is the right shape; the chemical override does composition work |
| `[$synthesis$]` field + initialization | `$Chemical` | **STAYS** | Composition-specific (bond ctor + JSX children processing) |
| `$Synthesis` class itself | `chemical.ts` | **STAYS** | Same |
| `[$$parent$$]`, `[$parent$]` getter/setter | `$Chemical` | **STAYS** | Catalyst-graph parent — composition |
| `[$catalyst$]`, `[$isCatalyst$]` | `$Chemical` | **STAYS** | Catalyst graph — composition |
| `[$createComponent$]` | `$Chemical` | **STAYS** | Template-path Component creation; depends on synthesis |
| `assertViewConstructors` | `$Chemical` | **STAYS** | Validates composition tree |
| `[$lastProps$]` | `$Chemical` | **STAYS** | Bond-ctor caching; composition-specific |
| `[$remove$]` | `$Chemical` | **STAYS** | Composition lifecycle |
| `bind()` function | `chemical.ts` module | **STAYS** | Composition helper |
| `$()` callable | `chemical.ts` module | **STAYS** | Composition dispatch |

### Symbols that follow the move

- `$template$`, `$$template$$`, `$molecule$`, `$reaction$`, `$component$` — already in `symbols.ts`; their *meaning* changes (now particle-level), but the symbols themselves don't move.

### Side-effect of the move on `$lift` and Component closures

The four-way instance-setup duplication identified in sprint-26 (Cathy's chemical constructor, the Component closure in `$createComponent`, `bind()`, and `$lift` in particle.ts) collapses naturally once reactive setup lives on `$Particle.constructor`. Per-mount derivative paths can simply call into a single setup primitive on the parent. **A-1 absorbs the D-1 carry-forward from sprint-26.**

## Late-binding-via-mirror investigation

### `$Reactants` — verdict: NOT the late-binding pattern

Read `chemical.ts` lines 37-45 and all usages of `context.arguments.values`.

`$Reactants` is created inside `$SynthesisContext.constructor` and exposes `.values` as the array passed to the bond ctor. The `parameters` and `parameterIndex` fields are written but never read — true dead state (sprint-26 finding stands).

The class exists as an **information-hiding wrapper** — the bond ctor receives a typed handle that exposes only `.values`, not the entire `$SynthesisContext` (which would expose parent contexts, child contexts, parameter parsing state, etc. that the ctor has no business touching). That is *not* the late-binding-via-mirror anti-pattern. It's an intentional surface narrowing.

**Action:** slim `$Reactants` to literally `{ values: any[] }`. Remove the dead `parameters` and `parameterIndex` fields. The class stays as a real surface boundary. **A-2 reframed: slim, not eliminate.**

### `$BondParameter` interface — verdict: legitimate shared structure

Used by `$Reactants` and `$SynthesisContext` to describe parameter shape. Genuinely shared, not duplicated for late-binding purposes.

### Other places to check

Walked the rest of `chemical.ts`. No other interfaces / adapter classes appear to exist solely to enable late binding. The framework's surface is direct — classes import each other when they need to. The only mirror-shaped thing in the codebase is `$Reactants`, and it's an information-hiding wrapper, not a late-binding workaround.

**A-3 likely closes empty.** The audit found nothing.

## A-1 — execution plan (mechanical)

Order (each step keeps tests green):

1. Move `[$molecule$]`, `[$reaction$]`, `[$template$]`, `[$$template$$]` field declarations to `$Particle`.
2. Move `[$molecule$] = new $Molecule(this)`, `[$reaction$] = new $Reaction(this)`, `this[$template$] = this`, the class-template-set-on-first-instance logic to `$Particle.constructor`.
3. Remove the same lines from `$Chemical.constructor`. Verify tests.
4. Move `[$isTemplate$]`, `[$derived$]` getters to `$Particle`. Verify.
5. Move async `mount/render/layout/effect/unmount` helpers to `$Particle`. Verify.
6. Move `Component` getter (without the `$createComponent` template path) to `$Particle`. Override on `$Chemical` to handle templates. Verify.
7. Move `[$component$]` field declaration to `$Particle`. Verify.
8. Split `[$destroy$]`: extract molecule/reaction cleanup to `$Particle.[$destroy$]()` (virtual); `$Chemical.[$destroy$]()` calls super then does composition cleanup. Verify.
9. Update `$lift` in `particle.ts` to call into the consolidated reactive-setup primitive on the parent rather than re-creating fields manually. Verify.
10. Update `$createComponent` Component closure similarly. Verify.

After all steps, the four-way instance-setup duplication is gone; `$Chemical` is meaningfully shorter; `$Particle` carries reactive machinery directly.

**Risk gradient:** steps 1-5 are safe (no behavior change, tests should remain green). Step 6 is medium (Component getter logic differs). Step 8 is medium (destroy splits across classes). Steps 9-10 are the highest leverage and the highest test impact — `$lift` and the Component closure are the hot paths for derivative creation.

## Decision gate

A-1's checklist is the migration table above. A-2 is reduced to slimming `$Reactants`. A-3 is empty (no further late-binding mirrors found). Cathy proceeds with A-1 step by step, running tests between each step.
