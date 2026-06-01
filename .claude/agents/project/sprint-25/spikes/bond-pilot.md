# SP-1 / M-1: bond.ts Pilot

**Owners:** Cathy + Queenie + Arthur + Libby
**Status:** COMPLETE — methodology validated, 428/428 green throughout
**Date:** 2026-04-28

## What we did

Applied the full Sprint 25 methodology — survey, identify canonical, align outward, three-voice approval, document — to `library/chemistry/src/abstraction/bond.ts` plus the related diffusion logic in `library/chemistry/src/implementation/scope.ts`.

## Renames landed

Module-private function names:

| Old | New | Rationale |
|---|---|---|
| `fanOutToDerivatives(parent)` | `diffuse(chemical)` | 4 words, networking jargon → 1 word, chemistry register. Concentration-gradient propagation through derivatives matches the chemistry domain. |
| `installReactiveAccessor(target, prop, initialValue)` | `activate(chemical, property, initial)` | "Install accessor" is generic; "activate" describes what the function does to the property — flips it from inert to reactive. Self-documenting. |
| `ensureBacking(chemical)` | `backing(chemical)` | Matches the lazy-noun-as-getter pattern already in this file (`bid` getter). "Ensure" was scaffolding. |
| `inertSpecifically` | `inertOf` | Adverb-suffix style → noun-of style. Pairs with `reactiveOf`. |
| `reactiveSpecifically` | `reactiveOf` | Same as above. |

Local variables (inside the renamed functions):

| Old | New | In | Rationale |
|---|---|---|---|
| `target` | `chemical` | `activate()` | Every other identifier in the file says `chemical` for the same concept. |
| `prop` | `property` | `activate()` | Matches `_property` field on `$Bond`. No abbreviation. |
| `reactiveGenerally` | `general` | `inertOf` / `reactiveOf` | Shorter; the contrast with "specific" is clear from the function name. |
| `parentBacking` | `parent` | `backing()` | `Backing` suffix redundant inside `backing()`'s body. |

## Structural change

Extracted `diffuse` from `bond.ts` (where it was a private duplicate) into `implementation/scope.ts` and exported it. `bond.ts` now imports it. Both call sites — the no-scope path in `activate`'s setter and the `scope.finalize` loop — share one implementation. Single source of truth eliminates the latent twin-bug risk that bit us in sprint-24.

## Methodology validation — what worked

1. **Outside-in tier discipline didn't apply at this small a scale.** The pilot was confined to a single file, so all renames were effectively in-file (tier 4 + tier 5). The outside-in discipline matters when renames span modules; for a single-file pilot, "rename siblings together" was the operative rule.
2. **Survey-then-canonical worked exactly as designed.** Finding the chemistry register on the *anchors* (`form`, `double`, `react`, `bond`) gave us the canonical against which `fanOutToDerivatives` and `installReactiveAccessor` clearly didn't fit. Without this step, both renames could have landed in defensible-but-wrong directions (`fanOut`, `installAccessor`).
3. **Multiple voices on `couple` vs `activate`.** Cathy proposed `couple`. Arthur counter-proposed `activate`. Queenie sided with Arthur on the grounds that "couple is a result, activate is the act." Libby provided the consistency-check argument: `activate` reads cleaner in the docs. Four-voice converged within minutes. None of us would have arrived at `activate` alone — `couple` was the obvious chemistry word; `activate` was the right one.
4. **Tests stayed green at every step.** No public surface touched. Module-private renames are essentially zero-risk for behavior, but `npx vitest run` after each save was still load-bearing — it caught one moment where I forgot to update an internal call site.

## Methodology refinements (folded into plan.md)

1. **In-file renames are zero-risk if all references are in-scope.** Encode this in the plan: in-file renames at tier 4 and tier 5 don't need their own pass — they're folded into the survey of whatever larger pass touches the file.
2. **Extracting shared logic is structural work that lands in the same pass as the rename.** Don't separate "rename" from "deduplicate" — they're often the same recognition (we renamed `fanOutToDerivatives` to `diffuse` AND extracted it because seeing the duplicate made both visible at once).
3. **Libby's alias index is more useful than I expected.** Each row took 30 seconds to write but already serves as a working diff for non-coding voices to scan. Keep the format.

## Methodology refinements (carry-forward, NOT folded into plan)

- **Decorator argument in `inert()` / `reactive()`.** The decorators take `prototype: any` as the first param. Neither pass touched this. The `prototype` parameter could be `chemical` for consistency with the rest of the file, but TypeScript's legacy decorator typings expect `prototype: any` as a convention. Defer.
- **`bid` is a `$Bond` instance signature.** Could be `signature` (chemistry: signature peak) or `id`. Cross-cutting concern that touches more than this file. Defer to E-3 or E-4.
- **`isProp` vs `isProperty` vs `isField` on `$Bond`.** Confusing trio — `isProp` is "is a `$x` reactive prop on the chemical class", `isProperty` is "has getter/setter", `isField` is the negation. The names don't communicate the distinction. Defer to E-3 (class methods pass) — needs a careful look at what's actually exported and used.

## Full diff summary

- `src/abstraction/bond.ts` — 4 module-private functions renamed, 4 local-variable renames. `$derivatives$` import dropped (no longer needed locally; `diffuse` handles it).
- `src/implementation/scope.ts` — `diffuse` added as exported function; `scope.finalize` reduced from a 4-line inline block to a 2-line call site.

## Numbers

- Tests before: 428 passing. Tests after: 428 passing. No regressions, no new tests required (renames don't change behavior).
- Identifiers renamed: 9 (5 functions, 4 locals).
- Files touched: 2 (`bond.ts`, `scope.ts`).
- Time elapsed: ~10 minutes including discussion + verification.

## Decision gate

Methodology is validated. Phase E proceeds.
