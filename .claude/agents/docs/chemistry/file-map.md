---
kind: reference
title: $Chemistry File Map
status: evolving
---

# $Chemistry File Map

This document catalogues every source file in the [`library/chemistry/`][chemistry-root] package, grouped by architectural layer.

Package: `@dna-platform/chemistry` v0.1.0 -- "Objects that React!"

---

## Foundation Layer

These files provide the type system, symbol registry, and package entry point that everything else builds on.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/index.ts`][index] | Foundation | Public API entry point; re-exports `$Particle`, `$Chemical`, and all types | [particle], [chemical], [types] | (rollup entry) | none | Complete |
| [`src/types.ts`][types] | Foundation | Core type definitions (`$Props`, `$Component`, `$Properties`, `$View`, `$Parameter`, etc.) and primitive type maps | [archive/chemistry] (for `$Function$`, `$Html$`), [particle], [chemical] | [index], [particle], [chemical], [catalogue], [reflection] | none | Complete |
| [`src/symbols.ts`][symbols] | Foundation | Symbol registry for all internal property keys across `$Particle`, `$Chemical`, `$Atom`, `$Component$`, `$promise`, `$Referent`, and `$ObjectiveRep` | (none) | [particle], [chemical], [reflection], [reference], [archive/chemistry-new], [archive/chemistry-web] | none | Complete |

## Particle Layer

The base rendering primitive -- a lightweight object that can produce React nodes.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/chemistry/particle.tsx`][particle] | Particle | `$Particle` class -- base renderable with CID assignment, symbol naming, `use()` view binding, and `$apply`/`$bond` hooks | [symbols], [types] | [index], [chemical], [types] (type reference) | [particle.test] | Complete |

## Chemical Layer

Extends `$Particle` with parent-child relationships, component binding, and lifecycle scaffolding.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/chemistry/chemical.ts`][chemical] | Chemical | `$Chemical` class -- adds parent binding, component slot, children accessor, and view constructor validation on top of `$Particle` | [archive/chemistry] (for `$BondOrchestrator`, `$Component$`, `$Molecule`, `$Reaction`, `$Reflection`), [symbols], [types], [particle] | [index], [types] (type reference) | none | Skeleton |

## Atom Layer

Empty placeholder for the `$Atom` subclass (lifecycle formation). The working implementation currently lives in the archive.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/chemistry/atom.ts`][atom] | Atom | Reserved for `$Atom` class (formation lifecycle) | (none) | (none) | none | Empty |

## Catalogue Layer

A self-referential lookup table that maps `$Rep` references to values, with topic-chain delegation.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/catalogue.ts`][catalogue] | Catalogue | `$Catalogue` class and the global `$lib` instance -- supports `$find`, `$index`, `$deref`, `$new`, `$including`, and `$reset` | [types] | [reflection], [reference] | [catalogue.test] | Complete |

## Reflection Layer

A runtime type introspection system that builds a rich representation graph (`$SubjectiveRep` / `$ObjectiveRep`) from JavaScript values.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/reflection.ts`][reflection] | Reflection | `$instanceof`, `$typeof`, `$type` functions and the `$SubjectiveRep`/`$ObjectiveRep` class hierarchy -- models objects, functions, primitives, types, constructors, arrays, members, properties, fields, methods, and parameters as first-class rep objects | [types], [catalogue], [symbols] | (none -- not yet re-exported from index) | [reflection.test] | Complete |

## Semantics Layer

Reference identity and relational algebra built on the catalogue.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/semantics/reference.ts`][reference] | Semantics | `$Referent`, `$Relation`, `$Relationship`, `$Reference`, `$Representative`, `$Property`, and `$Identity` classes -- models semantic reference-by-role with canonical identity resolution | [catalogue], [symbols] | (none -- not yet re-exported from index) | none | Complete |

## Archive Layer

Earlier monolithic implementations preserved for reference and still imported by active code.

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`src/archive/chemistry.ts`][archive/chemistry] | Archive | Original monolith (2564 lines) -- contains `$Chemical`, `$Atom`, `$Persistent`, `$Reflection`, `$Component$`, `$Reaction`, `$State`, `$Molecule`, `$Bond`, `$Bonding`, `$BondOrchestrator`, `$Parent`, `$ParamValidation`, `$Represent`, `$Catalogue`, plus utility functions | react, react-dom | [types] (for `$Function$`, `$Html$`), [chemical] (for orchestrator types) | none | Archive |
| [`src/archive/chemistry-new.ts`][archive/chemistry-new] | Archive | Refactored monolith (2702 lines) -- uses symbol-based private fields from [symbols]; same class set as `chemistry.ts` but with symbol indirection | [symbols], react | [archive/chemistry-bonds], [archive/chemistry-web] | none | Archive |
| [`src/archive/chemistry-bonds.ts`][archive/chemistry-bonds] | Archive | `$Bond` and `$Molecule` type experiments (35 lines) -- type-level molecule extraction from `$Particle` subclasses | [archive/chemistry-new] | (none) | none | Archive |
| [`src/archive/chemistry-web.tsx`][archive/chemistry-web] | Archive | `$Persistent` subclass of `$Atom` (81 lines) -- adds formation lifecycle and remembered state | [archive/chemistry-new], [symbols] | (none) | none | Archive |

## Test Files

| Path | Layer | Purpose | Depends on | Depended on by | Test coverage | Status |
|------|-------|---------|------------|----------------|---------------|--------|
| [`tests/particle.test.ts`][particle.test] | Test | Tests `$Particle` template singleton, CID assignment, symbol creation, `use()` view binding, and `$apply` prop mapping | [particle], [types], [symbols] | -- | -- | Complete |
| [`tests/catalogue.test.ts`][catalogue.test] | Test | Tests `$Catalogue` self-reference, `$find`/`$index`/`$deref`, topic chains, `$including`, and `$reset` | [catalogue], [types] | -- | -- | Complete |
| [`tests/reflection.test.ts`][reflection.test] | Test | Tests `$instanceof`, `$typeof`, `$type`, `parseFunctionInfo`, and rep role transitions on classes, primitives, and functions | [reflection], [catalogue] | -- | -- | Complete |
| [`test-setup.ts`][test-setup] | Test | Global test teardown -- extends vitest with jest-dom matchers and runs `cleanup()` after each test | (vitest, testing-library) | -- | -- | Complete |

## Config Files

| Path | Layer | Purpose | Status |
|------|-------|---------|--------|
| [`package.json`][package] | Config | Package manifest -- defines `@dna-platform/chemistry`, entry points (`dist/chemistry.{js,cjs,d.ts}`), scripts (`build`, `test`), and dependencies (React, D, rollup, vitest) | Complete |
| [`tsconfig.json`][tsconfig] | Config | Development TypeScript config -- ES2020 target, react-jsx, bundler resolution, `@/*` path alias to `src/*`, includes tests | Complete |
| [`tsconfig.build.json`][tsconfig-build] | Config | Build TypeScript config -- extends tsconfig.json, enables declaration emit to `dist/`, excludes tests | Complete |
| [`rollup.config.js`][rollup] | Config | Rollup build config -- bundles `src/index.ts` into ESM + CJS with sourcemaps, generates rolled-up `.d.ts`, externalizes React | Complete |
| [`vitest.config.ts`][vitest] | Config | Vitest test runner config -- happy-dom environment, `@/` alias resolution, node14 esbuild target | Complete |

---

## Dependency Diagram

```
                          +-----------+
                          |  index.ts |  (public entry point)
                          +-----+-----+
                                |
                    +-----------+-----------+
                    |                       |
              +-----v-----+          +-----v------+
              | particle   |          |  types.ts  |
              | .tsx       |          +-----+------+
              +-----+------+                |
                    |               +-------+--------+
                    |               |                 |
              +-----v------+       |    +------------v-------------+
              | chemical   |       |    | archive/chemistry.ts     |
              | .ts        +-------+    | (monolith -- $Function$, |
              +-----+------+            |  $Html$, $Component$,    |
                    |                   |  $Reaction, $Molecule,   |
                    |                   |  $Bond, etc.)            |
                    |                   +--------------------------+
                    |
              +-----v------+
              |  atom.ts   |  (empty)
              +------------+

              +------------+          +----------------+
              | symbols.ts |----+---->| particle.tsx   |
              +-----+------+   |     | chemical.ts    |
                    |          |     | reflection.ts  |
                    |          |     | reference.ts   |
                    |          +---->| archive/*.ts   |
                    |                +----------------+
                    |
              +-----v--------+
              | catalogue.ts |
              +-----+--------+
                    |
          +---------+---------+
          |                   |
    +-----v-------+    +-----v---------+
    | reflection  |    | semantics/    |
    | .ts         |    | reference.ts  |
    +-------------+    +---------------+

  Archive (preserved, partially imported):

    archive/chemistry.ts
         ^
         |  (types imports $Function$, $Html$)
         |  (chemical imports orchestrator types)
         |
    archive/chemistry-new.ts
         ^              ^
         |              |
    chemistry-bonds.ts  chemistry-web.tsx
```

### Layer dependency order (bottom to top)

```
  Semantics    Reflection
      \           /
       Catalogue
           |
       Foundation (symbols, types)
           |
       Particle
           |
       Chemical
           |
       Atom (empty -- implementation in archive)
```

<!-- citations -->
[chemistry-root]: ../../../library/chemistry/
[index]: ../../../library/chemistry/src/index.ts
[types]: ../../../library/chemistry/src/types.ts
[symbols]: ../../../library/chemistry/src/symbols.ts
[particle]: ../../../library/chemistry/src/chemistry/particle.tsx
[chemical]: ../../../library/chemistry/src/chemistry/chemical.ts
[atom]: ../../../library/chemistry/src/chemistry/atom.ts
[catalogue]: ../../../library/chemistry/src/catalogue.ts
[reflection]: ../../../library/chemistry/src/reflection.ts
[reference]: ../../../library/chemistry/src/semantics/reference.ts
[archive/chemistry]: ../../../library/chemistry/src/archive/chemistry.ts
[archive/chemistry-new]: ../../../library/chemistry/src/archive/chemistry-new.ts
[archive/chemistry-bonds]: ../../../library/chemistry/src/archive/chemistry-bonds.ts
[archive/chemistry-web]: ../../../library/chemistry/src/archive/chemistry-web.tsx
[particle.test]: ../../../library/chemistry/tests/particle.test.ts
[catalogue.test]: ../../../library/chemistry/tests/catalogue.test.ts
[reflection.test]: ../../../library/chemistry/tests/reflection.test.ts
[test-setup]: ../../../library/chemistry/test-setup.ts
[package]: ../../../library/chemistry/package.json
[tsconfig]: ../../../library/chemistry/tsconfig.json
[tsconfig-build]: ../../../library/chemistry/tsconfig.build.json
[rollup]: ../../../library/chemistry/rollup.config.js
[vitest]: ../../../library/chemistry/vitest.config.ts
