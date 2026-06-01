# Sprint 4: $Chemistry

Lift the $Chemistry framework from `../chemistry` into `library/chemistry/`. This is a copy-and-configure sprint — no new code, just getting the existing framework into this repo with a working build and green tests. The framework is a type-reflective, metadata-driven component system built on React with Scheme/Self influences. Documentation follows code.

## Status: COMPLETE

Last updated: 2026-03-30
Completed: 2026-03-30 — all 33 stories done. Framework lifted, building, tests matching original.

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Primary: all `library/chemistry/` — source, tests, build config |
| Libby | Librarian | Primary: `.claude/docs/chemistry/` — framework documentation |
| Arthur | Architect | Secondary: workspace integration, root package.json, dependency graph |

## Epics

### E1: Foundation layer

Copy the zero-dependency foundation files that everything else builds on.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Copy symbols.ts | Cathy | — | NOT STARTED |
| E1-S2 | Copy types.ts | Cathy | E1-S1 | NOT STARTED |
| E1-S3 | Copy catalogue.ts | Cathy | E1-S2 | NOT STARTED |
| E1-S4 | Copy semantics/reference.ts | Cathy | E1-S3 | NOT STARTED |

#### Story details

##### E1-S1: Copy symbols.ts
- **What:** Copy `src/symbols.ts` (73 lines) — all private Symbol() definitions for the framework
- **From:** `../chemistry/src/symbols.ts`
- **To:** `library/chemistry/src/symbols.ts`
- **Acceptance:** File exists, no modifications needed (pure exports, no imports)
- **Notes:** Foundation — everything depends on this. Tier 1.

##### E1-S2: Copy types.ts
- **What:** Copy `src/types.ts` (139 lines) — TypeScript type definitions ($Properties, $$Properties, $Component, etc.)
- **From:** `../chemistry/src/types.ts`
- **To:** `library/chemistry/src/types.ts`
- **Acceptance:** File exists. Note: has imports from `./archive/chemistry` ($Function$, $Html$) and from `./chemistry/particle` and `./chemistry/chemical` — these will be broken until those files are copied.
- **Notes:** Copy as-is. Import resolution comes in E3.

##### E1-S3: Copy catalogue.ts
- **What:** Copy `src/catalogue.ts` (178 lines) — the $Catalogue environment/delegation system
- **From:** `../chemistry/src/catalogue.ts`
- **To:** `library/chemistry/src/catalogue.ts`
- **Acceptance:** File exists. Imports from `./types` only.
- **Notes:** Fully working, fully tested. One of the two most complete v2 subsystems.

##### E1-S4: Copy semantics/reference.ts
- **What:** Copy `src/semantics/reference.ts` (125 lines) — $Referent, $Reference, $Relationship, $Representative
- **From:** `../chemistry/src/semantics/reference.ts`
- **To:** `library/chemistry/src/semantics/reference.ts`
- **Acceptance:** File exists. Imports from `@/catalogue` and `../symbols`.
- **Notes:** Depends on catalogue and symbols being present.

---

### E2: Core classes

Copy the framework's main classes — the chemistry layer itself.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Copy particle.tsx | Cathy | E1-S1, E1-S2 | NOT STARTED |
| E2-S2 | Copy chemical.ts | Cathy | E2-S1 | NOT STARTED |
| E2-S3 | Copy atom.ts | Cathy | E2-S2 | NOT STARTED |
| E2-S4 | Copy reflection.ts | Cathy | E1-S2, E1-S3 | NOT STARTED |
| E2-S5 | Copy index.ts | Cathy | E2-S1, E2-S2 | NOT STARTED |

#### Story details

##### E2-S1: Copy particle.tsx
- **What:** Copy `src/chemistry/particle.tsx` (111 lines) — $Particle base class with identity, view, props
- **From:** `../chemistry/src/chemistry/particle.tsx`
- **To:** `library/chemistry/src/chemistry/particle.tsx`
- **Acceptance:** File exists. Imports from `../symbols` and `../types`.
- **Notes:** The most stable v2 class. 20+ passing tests. Tier 2.

##### E2-S2: Copy chemical.ts
- **What:** Copy `src/chemistry/chemical.ts` (106 lines) — $Chemical with parent/child, extends $Particle
- **From:** `../chemistry/src/chemistry/chemical.ts`
- **To:** `library/chemistry/src/chemistry/chemical.ts`
- **Acceptance:** File exists. Imports from `../symbols`, `../types`, `./particle`, and `@/archive/chemistry`.
- **Notes:** Skeleton — most features commented out. Has archive dependency that needs the archive present.

##### E2-S3: Copy atom.ts
- **What:** Copy `src/chemistry/atom.ts` (empty file) — placeholder for atomic operations
- **From:** `../chemistry/src/chemistry/atom.ts`
- **To:** `library/chemistry/src/chemistry/atom.ts`
- **Acceptance:** File exists (will be empty).
- **Notes:** Placeholder. Symbols for it ($formed$, $formation$, $remembered$) already exist in symbols.ts.

##### E2-S4: Copy reflection.ts
- **What:** Copy `src/reflection.ts` (1063 lines) — $type(), $typeof(), $instanceof(), member introspection
- **From:** `../chemistry/src/reflection.ts`
- **To:** `library/chemistry/src/reflection.ts`
- **Acceptance:** File exists. Imports from `./types` and `./catalogue`.
- **Notes:** Largest single file. Fully functional with tests. Tier 2, parallel to particle.

##### E2-S5: Copy index.ts
- **What:** Copy `src/index.ts` (2 lines) — public API re-exports
- **From:** `../chemistry/src/index.ts`
- **To:** `library/chemistry/src/index.ts`
- **Acceptance:** File exists. Exports from `./chemistry/particle`, `./chemistry/chemical`, `./types`.
- **Notes:** Entry point for the package. May need adjustment when we configure package.json exports.

---

### E3: Archive layer

Copy the v1 archive code that the v2 code still depends on. This is a reference dependency, not active development.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Copy archive/chemistry.ts | Cathy | — | NOT STARTED |
| E3-S2 | Copy archive/chemistry-new.ts | Cathy | E1-S1 | NOT STARTED |
| E3-S3 | Copy archive/chemistry-bonds.ts | Cathy | E3-S2 | NOT STARTED |
| E3-S4 | Copy archive/chemistry-web.tsx | Cathy | E3-S2 | NOT STARTED |

#### Story details

##### E3-S1: Copy archive/chemistry.ts
- **What:** Copy `src/archive/chemistry.ts` (2564 lines) — the original v1 framework, standalone
- **From:** `../chemistry/src/archive/chemistry.ts`
- **To:** `library/chemistry/src/archive/chemistry.ts`
- **Acceptance:** File exists. No internal imports (standalone).
- **Notes:** `chemical.ts` and `types.ts` import from this. Required for compilation.

##### E3-S2: Copy archive/chemistry-new.ts
- **What:** Copy `src/archive/chemistry-new.ts` (2702 lines) — transition implementation
- **From:** `../chemistry/src/archive/chemistry-new.ts`
- **To:** `library/chemistry/src/archive/chemistry-new.ts`
- **Acceptance:** File exists. Imports React and symbols.
- **Notes:** Largest file in the codebase. Needed by chemistry-bonds and chemistry-web.

##### E3-S3: Copy archive/chemistry-bonds.ts
- **What:** Copy `src/archive/chemistry-bonds.ts` (34 lines) — bond type definitions
- **From:** `../chemistry/src/archive/chemistry-bonds.ts`
- **To:** `library/chemistry/src/archive/chemistry-bonds.ts`
- **Acceptance:** File exists. Imports from `./chemistry-new`.

##### E3-S4: Copy archive/chemistry-web.tsx
- **What:** Copy `src/archive/chemistry-web.tsx` (395 lines) — web component version
- **From:** `../chemistry/src/archive/chemistry-web.tsx`
- **To:** `library/chemistry/src/archive/chemistry-web.tsx`
- **Acceptance:** File exists. Imports from `./chemistry-new` and symbols.

---

### E4: Test suite

Copy all test files and the test setup.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | Copy test-setup.ts | Cathy | — | NOT STARTED |
| E4-S2 | Copy particle.test.ts | Cathy | E2-S1 | NOT STARTED |
| E4-S3 | Copy catalogue.test.ts | Cathy | E1-S3 | NOT STARTED |
| E4-S4 | Copy reflection.test.ts | Cathy | E2-S4 | NOT STARTED |

#### Story details

##### E4-S1: Copy test-setup.ts
- **What:** Copy `test-setup.ts` (8 lines) — test environment setup (@testing-library/react, jest-dom)
- **From:** `../chemistry/test-setup.ts`
- **To:** `library/chemistry/test-setup.ts`
- **Acceptance:** File exists.

##### E4-S2: Copy particle.test.ts
- **What:** Copy `tests/particle.test.ts` (262 lines) — 9 test suites, 20+ tests for $Particle
- **From:** `../chemistry/tests/particle.test.ts`
- **To:** `library/chemistry/tests/particle.test.ts`
- **Acceptance:** File exists. Uses `@/` path alias for imports.
- **Notes:** Tests template singleton, view swapping, symbol uniqueness, props application, children handling.

##### E4-S3: Copy catalogue.test.ts
- **What:** Copy `tests/catalogue.test.ts` (395 lines) — 12 test suites, 40+ tests for $Catalogue
- **From:** `../chemistry/tests/catalogue.test.ts`
- **To:** `library/chemistry/tests/catalogue.test.ts`
- **Acceptance:** File exists. Imports from `../src/catalogue` and `@/types`.
- **Notes:** Tests self-reference, topic inheritance, subject delegation, deref, privacy.

##### E4-S4: Copy reflection.test.ts
- **What:** Copy `tests/reflection.test.ts` (997 lines) — comprehensive reflection/type system tests
- **From:** `../chemistry/tests/reflection.test.ts`
- **To:** `library/chemistry/tests/reflection.test.ts`
- **Acceptance:** File exists. Imports from `@/catalogue`, `@/reflection`.
- **Notes:** Largest test file. Tests type caching, primitives, built-ins, custom classes, member queries.

---

### E5: Build configuration

Configure the workspace so it compiles, tests run, and the package builds.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E5-S1 | Create package.json | Arthur + Cathy | — | NOT STARTED |
| E5-S2 | Create tsconfig.json | Cathy | E5-S1 | NOT STARTED |
| E5-S3 | Create vitest.config.ts | Cathy | E5-S1 | NOT STARTED |
| E5-S4 | Create rollup.config.js | Cathy | E5-S2 | NOT STARTED |
| E5-S5 | Register workspace in root package.json | Arthur | E5-S1 | NOT STARTED |
| E5-S6 | Run npm install | Arthur | E5-S5 | NOT STARTED |

#### Story details

##### E5-S1: Create package.json
- **What:** Create `library/chemistry/package.json` based on `../chemistry/package.json`. Scope as `@dna-platform/chemistry`.
- **Files:** `library/chemistry/package.json`
- **Acceptance:** Valid package.json with correct dependencies (react >=18, typescript, vitest, rollup, testing-library).
- **Notes:** Reference the original for dependency versions. Add build, test, dev scripts.

##### E5-S2: Create tsconfig.json
- **What:** Create `library/chemistry/tsconfig.json` based on `../chemistry/tsconfig.json`. Configure `@/` path alias to `./src/`.
- **Files:** `library/chemistry/tsconfig.json`
- **Acceptance:** TypeScript recognizes all source files and the `@/` alias resolves correctly.
- **Notes:** Original uses ES2020, strict mode, JSX react-jsx. May need `tsconfig.build.json` too.

##### E5-S3: Create vitest.config.ts
- **What:** Create `library/chemistry/vitest.config.ts` based on `../chemistry/vitest.config.ts`. Configure path aliases and test setup.
- **Files:** `library/chemistry/vitest.config.ts`
- **Acceptance:** `vitest` discovers all test files.
- **Notes:** Original references test-setup.ts and uses `@/` alias.

##### E5-S4: Create rollup.config.js
- **What:** Create `library/chemistry/rollup.config.js` based on `../chemistry/rollup.config.js`. Configure for package build output.
- **Files:** `library/chemistry/rollup.config.js`
- **Acceptance:** `npm run build -w library/chemistry` produces distributable output.
- **Notes:** Original uses rollup with TypeScript plugin.

##### E5-S5: Register workspace in root package.json
- **What:** Add `library/chemistry` to root `package.json` workspaces array (if not already covered by `library/*` glob).
- **Files:** Root `package.json`
- **Acceptance:** `npm ls -w library/chemistry` recognizes the workspace.
- **Notes:** Root already has `library/*` glob — verify it picks this up.

##### E5-S6: Run npm install
- **What:** Run `npm install` from root to install all dependencies and link workspaces.
- **Acceptance:** No errors. `node_modules` populated. Cross-workspace links resolved.

---

### E6: Integration — make it work

Fix imports, get TypeScript compiling, get tests green, verify the build.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E6-S1 | Fix import paths | Cathy | E1-E4, E5-S2 | NOT STARTED |
| E6-S2 | TypeScript compiles clean | Cathy | E6-S1 | NOT STARTED |
| E6-S3 | Particle tests pass | Cathy | E6-S2, E5-S3 | NOT STARTED |
| E6-S4 | Catalogue tests pass | Cathy | E6-S2, E5-S3 | NOT STARTED |
| E6-S5 | Reflection tests pass | Cathy | E6-S2, E5-S3 | NOT STARTED |
| E6-S6 | Full test suite green | Cathy | E6-S3, E6-S4, E6-S5 | NOT STARTED |
| E6-S7 | Build output verified | Arthur + Cathy | E6-S6, E5-S4 | NOT STARTED |

#### Story details

##### E6-S1: Fix import paths
- **What:** Adjust any import paths broken by the move. The `@/` alias should still work if tsconfig is set up correctly. Check relative paths.
- **Acceptance:** No red squiggles on imports (TypeScript resolves everything).
- **Notes:** Main risk: `chemical.ts` imports from `@/archive/chemistry` — needs archive present.

##### E6-S2: TypeScript compiles clean
- **What:** Run `tsc --noEmit` in the chemistry workspace. Fix any type errors.
- **Acceptance:** Zero TypeScript errors.
- **Notes:** Don't change framework logic — only fix path/config issues from the move.

##### E6-S3: Particle tests pass
- **What:** Run particle.test.ts. Fix any failures caused by the move.
- **Acceptance:** All 20+ particle tests pass.

##### E6-S4: Catalogue tests pass
- **What:** Run catalogue.test.ts. Fix any failures caused by the move.
- **Acceptance:** All 40+ catalogue tests pass.

##### E6-S5: Reflection tests pass
- **What:** Run reflection.test.ts. Fix any failures caused by the move.
- **Acceptance:** All reflection tests pass.

##### E6-S6: Full test suite green
- **What:** Run the complete test suite. Confirm everything passes together.
- **Acceptance:** `npm test -w library/chemistry` — all tests pass, zero failures.

##### E6-S7: Build output verified
- **What:** Run the build. Verify output exists and exports resolve.
- **Acceptance:** `npm run build -w library/chemistry` succeeds. Package exports are correct.

---

### E7: Documentation

Write initial docs so the team can understand $Chemistry. Deeper docs come after a conversation with Doug about framework philosophy.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E7-S1 | Framework overview | Libby + Cathy | E2-S5 | NOT STARTED |
| E7-S2 | Concept glossary | Libby | E7-S1 | NOT STARTED |
| E7-S3 | File map | Libby | E6-S6 | NOT STARTED |

#### Story details

##### E7-S1: Framework overview
- **What:** Single document: what $Chemistry is, Scheme/Self influences, layer architecture, how pieces relate.
- **Files:** `.claude/docs/chemistry/overview.md`
- **Acceptance:** A team member can read this and understand the framework's purpose and design.

##### E7-S2: Concept glossary
- **What:** Quick-reference: $Particle, $Chemical, $Atom, $Catalogue, Bond, Reaction, $ prefix, symbols, etc.
- **Files:** `.claude/docs/chemistry/glossary.md`
- **Acceptance:** Every term in the codebase has a one-paragraph definition.

##### E7-S3: File map
- **What:** Document mapping each source file to its purpose, layer, dependencies, and test coverage.
- **Files:** `.claude/docs/chemistry/file-map.md`
- **Acceptance:** Given a filename, you can look up what it does and what depends on it.

---

## Dependency graph

```
E1 Foundation          E3 Archive              E5 Config
┌──────────────┐      ┌──────────────┐        ┌──────────────┐
│ S1 symbols   │      │ S1 chemistry │        │ S1 pkg.json  │
│   ↓          │      │   ↓          │        │   ↓    ↓   ↓ │
│ S2 types  ───┤──→   │ S2 chem-new  │        │ S2   S3   S5 │
│   ↓          │      │   ↓      ↓   │        │ ts   vi   ws │
│ S3 catalogue │      │ S3 bonds S4  │        │   ↓         ↓│
│   ↓          │      │      web     │        │ S4 rollup  S6│
│ S4 reference │      └──────────────┘        │        install│
└──────────────┘                              └──────────────┘
       ↓                    ↓                        ↓
E2 Core classes                              E4 Tests
┌──────────────┐                            ┌──────────────┐
│ S1 particle  │                            │ S1 setup     │
│   ↓          │                            │ S2 particle  │
│ S2 chemical  │                            │ S3 catalogue │
│   ↓          │                            │ S4 reflection│
│ S3 atom      │                            └──────────────┘
│ S4 reflection│                                   ↓
│   ↓          │                     E6 Integration
│ S5 index     │                    ┌──────────────────────┐
└──────────────┘                    │ S1 fix imports       │
       ↓                            │   ↓                  │
       └────────────────────────→   │ S2 tsc clean         │
                                    │   ↓     ↓      ↓     │
                                    │ S3    S4     S5      │
                                    │ part  cat    refl    │
                                    │   ↓     ↓      ↓     │
                                    │ S6 full suite green  │
                                    │   ↓                  │
                                    │ S7 build verified    │
                                    └──────────────────────┘
                                              ↓
                                    E7 Documentation
                                    ┌──────────────┐
                                    │ S1 overview   │
                                    │   ↓           │
                                    │ S2 glossary   │
                                    │ S3 file map   │
                                    └──────────────┘
```

## Verification checklist

After all work completes:

- [ ] All v2 source files present in `library/chemistry/src/`
- [ ] All archive files present in `library/chemistry/src/archive/`
- [ ] All test files present in `library/chemistry/tests/`
- [ ] `npm install` from root succeeds
- [ ] TypeScript compiles with zero errors
- [ ] All particle tests pass (20+)
- [ ] All catalogue tests pass (40+)
- [ ] All reflection tests pass
- [ ] Full test suite green: `npm test -w library/chemistry`
- [ ] Build succeeds: `npm run build -w library/chemistry`
- [ ] `.claude/docs/chemistry/overview.md` exists and is readable
- [ ] `.claude/docs/chemistry/glossary.md` exists with all key terms
- [ ] `.claude/docs/chemistry/file-map.md` maps every source file
- [ ] Agent registry updated with Cathy and Libby
- [ ] Project tracker reflects sprint-4

<!-- citations -->
[old version]: ../../../chemistry/src/archive/
[new version]: ../../../chemistry/src/chemistry/
[chemistry repo]: ../../../chemistry/
