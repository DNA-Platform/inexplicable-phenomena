# SP-1: Audit-Comment Convention Dry Run

**Owner:** Cathy
**Status:** COMPLETE — 428/428 tests green throughout
**Date:** 2026-04-29

## What we did

Walked `bond.ts` and `chemical.ts` with the three-lens audit (duplication, brittleness, semantic confusion). Used the `// AUDIT: ...` comment convention to flag findings in source. Applied three small safe fixes immediately. Catalogued the rest for triage.

## Findings — in priority order

### Duplication

1. **Instance setup duplicated four times** (chemical.ts, particle.ts).
   - `$Chemical.constructor` (chemical.ts:614)
   - The Component closure inside `$createComponent` (chemical.ts:670-682)
   - `bind()` (chemical.ts:748)
   - `$lift` in particle.ts:178-200
   - All do nearly identical work: stamp `$cid$`, `$symbol$`, `$molecule$`, `$synthesis$`, `$reaction$`, `$phases$`, `$phase$`. Four places to keep in sync.
   - **Fix candidate:** extract `quicken(chemical, template?)` helper. Probably ER-1 in this sprint.
   - **Status:** AUDIT comment placed in `$Chemical.constructor`.

2. **`$Chemical.toString()` was byte-identical to inherited `$Particle.toString()`.**
   - Both checked `this[$symbol$]`, fell through to `$Particle[$$createSymbol$$]`.
   - **Status: FIXED.** Removed the override; inheritance handles it.

3. **`$Reactants` and `$SynthesisContext` hold overlapping state.**
   - `$Reactants.values` aliases `$SynthesisContext.args`.
   - `$Reactants.parameters` aliases `$SynthesisContext.parameters`.
   - `$Reactants.parameterIndex` is initialized but never read — it's effectively dead state.
   - **Fix candidate:** $Reactants reduces to `{ values: any[] }`, or disappears entirely.
   - **Status:** Catalogued. Public-symbolic-API surface; needs cross-module review before fix.

4. **`$htmlInstances` Map (chemical.ts:140) and `$catalogue` Map elsewhere are the same pattern.**
   - Both: module-level cache keyed by HTML tag, lazy-populated.
   - **Status:** Catalogued. Possibly the same map already; needs verification.

### Brittleness

5. **`$Synthesis.parseBondConstructor()` regex-parses function source.**
   - chemical.ts:220 — `this._bondConstructor.toString().match(/\(([^)]*)\)/)`.
   - Breaks under arrow ctors, default values, destructured params, multiline params, TypeScript-emitted decorate wrappers.
   - **Fix candidate:** use `Function.length` for arity + an explicit `@spread` decorator for spread params.
   - **Status:** AUDIT comment placed.

6. **`$paramValidation` is a module-level singleton.**
   - Shared across all bond ctor invocations. Two ctors running concurrently (async setup) would clobber each other's state.
   - `reset()` is a band-aid.
   - **Fix candidate:** instance-per-ctor.
   - **Status:** Catalogued. Touches B-3 / C-5.

7. **`$SynthesisContext.isModified` setter had a dead expression.**
   - chemical.ts:66 — `if (value) this.parent?.isModified;` — read result discarded. Looked like an intended-but-incomplete propagation.
   - **Status: FIXED.** Line removed. (Behavior: identical, since the read had no side effects.)

### Semantic Confusion

8. **`$Synthesis.bond()` collides with `$Bond` class.**
   - The verb-method shares its name with a class elsewhere. `synthesis.bond(props, ctx)` is ambiguous.
   - **Fix candidate:** rename to `synthesize()` (recursive but honest) or `compose()`.
   - **Status:** Catalogued. C-cluster work.

9. **`$Synthesis.viewSymbol` getter was unused.**
   - Defined at chemical.ts:147; no consumer.
   - **Status: FIXED.** Removed.

10. **`isViewSymbol` branch in `process()` is dead code.**
    - chemical.ts:255 calls `isViewSymbol(key)`. The check looks for a `$$Chemistry.` prefix that **nothing in the codebase produces** — `viewSymbol` (the only producer) was unused and removed in #9.
    - **Status:** AUDIT comment placed. Needs verification that no external consumer constructs such keys before removing the branch.

11. **`$SynthesisContext.parent: $SynthesisContext = this`** — initialized self-referentially.
    - "No parent" is encoded as "I am my own parent." Forces a `parent === this` check at every read site.
    - **Fix candidate:** `parent?: $SynthesisContext = undefined`. Touches every consumer.
    - **Status:** Catalogued.

12. **`$Bond.bid` is "bond id" abbreviated.**
    - Sibling fields use full words (`property`, `descriptor`, `chemical`); `bid` alone is abbreviated.
    - Already tagged for sprint-25 carry-forward (now C-2).
    - **Status:** Catalogued.

13. **`$Bond.isProp` / `isProperty` / `isField` / `isMethod` / `isReadable` / `isWritable`** — six overlapping predicates with confusing semantics.
    - Already tagged for sprint-25 carry-forward (now C-2).
    - **Status:** Catalogued.

## Methodology validation

The `// AUDIT: ...` comment convention worked. Two qualities matter:

1. **Comment density stayed readable.** Three AUDIT comments per ~800 lines of `chemical.ts` is signal, not noise. The ratio felt right — each AUDIT block names a *category of smell* with a planned-fix line, not just "this is bad."
2. **Comments fork into two paths.** The dead `if (value) this.parent?.isModified;` got *fixed* (deleted) within the same audit pass — the AUDIT comment never needed to land. The bigger findings (parseBondConstructor, instance-setup duplication) got AUDIT comments because their fixes have non-trivial blast radius and need their own stories. This fork — *"is the fix small? do it now. Is it big? AUDIT-comment it."* — became the working rule mid-pass.

The **discipline** the rule enforces is:

- AUDIT comments must name a specific fix candidate, not just describe the smell.
- AUDIT comments must reference a caveat page (even a TBD one) so they're trackable.
- AUDIT comments must be removed by sprint close — either resolved into a fix-commit, or migrated wholesale into a caveat page that names the deferred work.

## Fixes landed this pass

| File | Change | Lines | Risk | Result |
|------|--------|-------|------|--------|
| `chemical.ts` | Drop redundant `$Chemical.toString()` (byte-identical to `$Particle.toString()`) | -4 | none — pure inheritance | 428/428 green |
| `chemical.ts` | Remove dead expression in `$SynthesisContext.isModified` setter | -1 | none — read with no side effects | 428/428 green |
| `chemical.ts` | Remove unused `$Synthesis.viewSymbol` getter | -1 | none — no consumer in codebase | 428/428 green |

## AUDIT comments planted

| File / Line | Smell | Caveat page (TBD) |
|-------------|-------|-------------------|
| `chemical.ts:217` | `parseBondConstructor` regex brittleness | bond-ctor-source-parsing |
| `chemical.ts:609` | Instance-setup duplicated four times | instance-quickening-duplicated |
| `chemical.ts:148` | Dead `isViewSymbol` branch | dead-view-symbol-branch |

## Decision gate

Methodology is validated. Phase E proceeds — the comment convention is the right tool for triage. Story flow:

1. AUDIT comments stay in source through the sprint as work-in-progress markers.
2. Each fix-story removes its AUDIT comment when the fix lands.
3. Any AUDIT comment that doesn't get a fix-commit by sprint close migrates into a caveat page (Libby's L-4) and the comment is removed.
4. By sprint close: zero AUDIT comments remain in source.
