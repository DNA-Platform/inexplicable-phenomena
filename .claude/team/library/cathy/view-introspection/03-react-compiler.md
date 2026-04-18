---
title: "React Compiler: auto-memoization from AST analysis"
---

# React Compiler: auto-memoization from AST analysis

The React Compiler (formerly "React Forget") is the most immediate prior art for Doug's witness idea. Meta built it as a Babel plugin that analyzes React components at build time, infers which values need memoization, and emits rewritten code with auto-generated cache lookups. It shipped v1.0 in October 2025. It's the existence proof that production frameworks can rely on compile-time analysis of component source.

If we build the witness system, we'll be doing something structurally similar — just with a different output target (witness objects instead of memoization cache) and a different analysis goal (identify values that flow into view output, not identify values safe to memoize). The compiler plumbing is largely shared.

## What React Compiler actually does

Its job is to eliminate hand-written `useMemo`, `useCallback`, and `React.memo`. You write plain React components; at build time, the compiler rewrites them so every allocation that would benefit from memoization is wrapped in a cache lookup keyed on the correct dependencies.

The transformation is *conservative*: if the compiler can't prove an optimization is sound, it emits the original code unchanged. Correctness is never risked for speed. This is the shape of every optimizing compiler pass — a *bailout* design where failure means "leave it alone."

## The pipeline

The compiler does not operate directly on Babel's AST. It lowers into its own **High-level Intermediate Representation (HIR)**, a control-flow graph of basic blocks in reverse postorder. HIR preserves source-level distinctions (if vs. ternary vs. &&; for vs. while vs. for-of) that matter for React-specific analysis. The pipeline:

1. `BuildHIR` — AST → HIR
2. `EnterSSA` — convert to Static Single Assignment form
3. **Validation** — check Rules of React (conditional hooks, setState-in-render)
4. **Optimization** — dead code elimination, constant propagation
5. `InferTypes` — identify hooks, primitives, JSX
6. **Reactive scope inference** — group interdependent values
7. **Scope construction/optimization** — prune and merge
8. `Codegen` — back to Babel AST, written into the output

The Babel plugin is the thin outer shell; the pipeline is the compiler.

## Reactive scopes

A **reactive scope** is the compiler's central abstraction: a group of values that are created and/or mutated together, plus the instructions involved. Scope inference runs over SSA'd HIR, uses type and effect information, and groups instructions whose outputs are interdependent. Each scope becomes a **memoization boundary** — at codegen the scope is lowered into a cache slot keyed on its inferred dependencies.

Because analysis runs on a CFG rather than a syntax tree, scopes can straddle branches the compiler can reason about, and memoization can happen *after* early returns — something manual `useMemo` cannot express, since hook order must be stable.

## How it decides what to memoize

Memoization is driven by mutability analysis. For each value the compiler asks:

- Is this value mutated later?
- Does it flow into JSX, props, or a hook argument?
- Is its creation expensive (allocation, non-primitive-returning call)?

Values that are read-only after construction and flow into render output get wrapped in a scope. Primitives or transients don't.

## Dependency inference

Dependencies of a scope are **inferred, not declared**. v1 extended inference to:

- **Optional chains** (`a?.b?.c`) as first-class dependency paths.
- **Array indices** (`arr[0]`) as first-class paths.
- **Dynamic access** (`obj[key]` where `key` is reactive) collapses to the whole object.
- **Method calls on `this` or props** are modeled through effect analysis: if the callee's effect is unknown, the receiver is treated as potentially mutated, widening the scope or forcing a bailout.

This is exactly the taxonomy Doug's witness idea would need. Paths that are statically analyzable become precise witness entries; paths that bail out get conservative treatment.

## Bailout triggers

The compiler fails safely when it cannot prove soundness:

- **Rules-of-React violations** (conditional hooks, setState-in-render).
- **Hooks inside a candidate scope** — scopes must be pruned because hooks can't be conditional.
- **Unsupported syntax** (historically `try/catch`, certain `forwardRef` shapes).
- **Explicit `'use no memo'` directive.**

After pruning, consecutive scopes that invalidate together are **merged** to reduce runtime cache overhead.

## Output shape

Transformed code replaces implicit allocations with indexed reads/writes against a per-component cache (`useMemoCache` / `c(n)`). A scope compiles to: check dependency slots against cached inputs; if any changed, recompute the outputs and write them back; otherwise reuse. The effect is hand-rolled `useMemo`/`useCallback` at every inferred boundary, with dependencies the compiler proved correct — including scopes placed after conditional returns, which human-written code cannot produce.

## Implications for the witness design

React Compiler tells us several useful things:

1. **Compile-time source analysis of JSX components is shippable.** Meta is doing it in production. The engineering is hard but not speculative.
2. **Bailout-based design is the right posture.** When analysis is unsure, emit the safe fallback (original code, or in our case, deep state snapshot). Don't try to be clever.
3. **Dependency inference can handle realistic JavaScript.** Optional chains, array indices, even some dynamic paths. Fully dynamic access collapses to the whole object. This is acceptable.
4. **HIR vs. AST matters for serious analysis.** We wouldn't need something as elaborate as React Compiler's HIR, but straight-over-AST transforms will hit ceilings. Acorn/babel-parser output is a starting point, not a sufficient end.
5. **The transformation is a Babel plugin.** The distribution story is: publish `@dna/chemistry` + `@dna/chemistry/babel-plugin`. Users add the plugin to their bundler config. This is the same path Svelte, Vue, React Compiler all take.

Next chapter: formalizing Doug's witness proposal as a concrete design.
