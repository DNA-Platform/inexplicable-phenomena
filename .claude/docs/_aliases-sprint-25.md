---
kind: index
title: Sprint-25 alias index
status: temporary
---

# Sprint 25 alias index — old name → new name

This page exists for the duration of sprint-25 (Resonance) and is deleted at sprint close. Use it to map muscle-memory identifiers to their renamed forms.

## Renames

| Old | New | Where | Why | Page |
|-----|-----|-------|-----|------|
| `fanOutToDerivatives(parent)` | `diffuse(chemical)` | `bond.ts` private; same logic also inline in `scope.ts` | 4 words, networking jargon → 1 word, chemistry register (concentration gradient propagation) | [reactive-bonds][rb], [derivatives-and-fan-out][dfo] |
| `installReactiveAccessor(target, prop, initialValue)` | `activate(chemical, property, initial)` | `bond.ts` private | "install accessor" is generic IT jargon; "activate" describes what it does to the property (inert → reactive) | [reactive-bonds][rb] |
| `ensureBacking(chemical)` | `backing(chemical)` | `bond.ts` private | matches the lazy-noun-as-getter pattern (`bid`); "ensure" was redundant scaffolding | [reactive-bonds][rb] |
| `inertSpecifically(chemical, property, reactiveGenerally)` | `inertOf(chemical, property, general)` | `bond.ts` private | adverb-suffix style → noun-of style; matches `reactiveOf` sibling | [reactive-bonds][rb] |
| `reactiveSpecifically(chemical, property, reactiveGenerally)` | `reactiveOf(chemical, property, general)` | `bond.ts` private | same as above | [reactive-bonds][rb] |
| param `target` | `chemical` | `bond.ts` `activate()` body | every other identifier in the file says `chemical` for the same concept | — |
| param `prop` | `property` | `bond.ts` `activate()` body | matches `_property` field, no abbreviation | — |
| local `reactiveGenerally` | `general` | `bond.ts` `inertOf` / `reactiveOf` | shorter; the `general` vs `specific` distinction is enough without the suffix | — |
| local `parentBacking` | `parent` | `bond.ts` `backing()` body | already in scope of `backing()`; "Backing" suffix redundant | — |

| `$BondOrchestrator` | `$Synthesis` | class in `chemical.ts`; re-export from `symbolic.ts` | networking jargon (3 words) → chemistry-domain (1 word). Sibling to `$Reaction`: synthesis is setup-time, reaction is runtime. | [synthesis][syn] |
| `$BondOrchestrationContext` | `$SynthesisContext` | same | follows class rename | [synthesis][syn] |
| `$BondArguments` | `$Reactants` | same | "arguments" generic; "reactants" is what you put into a reaction. Single chemistry word. | [synthesis][syn] |
| `$orchestrator$` | `$synthesis$` | symbol in `symbols.ts`; uses across `chemical.ts`, `particle.ts` comments | follows class | — |
| `Scope` | `$Scope` | class in `scope.ts`; re-exports from `chemical.ts` and `symbolic.ts` | `$` membrane convention — every framework class has the prefix | — |
| `$Properties<T>` ∪ `$$Properties<T>` | `$Properties<T>` (single) | type in `types.ts` | the two were byte-identical duplicates | — |
| `$Bond.bid` | `$Bond.id` | bond.ts | sibling fields use full words; the "bond" prefix is redundant inside `$Bond` | [reactive-bonds][rb] |
| `$Bond.isProp` | (deleted; one call site inlined to `$Reflection.isSpecial(bond.property)`) | bond.ts → chemical.ts | confused with `$Bond.isProperty`; cluster shrank from 7 to 6 | [reactive-bonds][rb] |
| `$Synthesis.viewSymbol` | (deleted; was unused) | chemical.ts | dead code; companion `isViewSymbol` branch is also dead but kept with AUDIT pending external-consumer check | — |
| `$Reactants` (3 fields) | `$Reactants` (1 field, `values`) | chemical.ts | dropped dead `parameters` and `parameterIndex`; class is now an information-hiding wrapper for the bond ctor's args | [synthesis][syn] |
| `$Chemical.toString` | (deleted; inherits from `$Particle`) | chemical.ts | byte-identical duplicate | — |
| `$Chemical.[$molecule$]` etc. | `$Particle.[$molecule$]` (moved up) | particle.ts ⇄ chemical.ts (sprint-27) | reactive machinery moved to $Particle; composition stays on $Chemical | [particle book][pb], [chemical][chemical] |

<!-- new entries appended here as renames continue -->



<!-- citations -->
[rb]: chemistry/features/reactive-bonds.md
[dfo]: chemistry/concepts/derivatives-and-fan-out.md
[syn]: chemistry/features/synthesis.md
<!-- note: synthesis.md is planned (L-3 backlog), not yet written -->
[chemical]: chemistry/features/chemical.md
[pb]: chemistry/books/particle/index.md
