# Sprint 26: Distillation

A code-audit sprint. Where Sprint 25 (Resonance) made names align with their neighbors, Sprint 26 separates what shouldn't be together. Three lenses on the codebase: **duplication** (same thing in two places), **brittleness** (breaks easily under change, hidden coupling), **semantic confusion** (the name doesn't match what the code does, or two names point at the same thing). Each lens has its own audit method.

The sprint absorbs all sprint-25 deferred work — E-3 remainder, E-4 (methods), E-5 (locals), ER refactoring (`_reactivate`, `$Chemical` ctor, `$()` callable), L-2, L-4, L-5 — under whichever lens it most naturally fits. This isn't carry-forward in the apologetic sense; the sprint-25 retro made clear that the deferred items *are* duplication / brittleness / confusion, and they belong here.

The wiki gains a navigation tier in this sprint: feature pages link directly into source files. A reader on `reactive-bonds.md` should be able to follow a link straight into `bond.ts:121` to read `$Bond.form()`. Libby's continuous track makes this real.

## Status: IN PROGRESS

Last updated: 2026-04-29

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Audit + execute fixes; owns `library/chemistry/src/**` |
| Queenie | QA Engineer | Coverage maintained at every commit; flags brittleness via test-name + test-import surface analysis |
| Arthur | Architect | Veto / canonical selection on cross-module fixes; identifies hidden coupling |
| Libby | Librarian | Continuous wiki track — source-code links, audit findings as caveats, feature-page updates from sprint-25 carry-forward |

## Methodology

### Gate scales with blast radius (refined from sprint-25 retro)

- **Module-private fix** — Cathy executes; three voices read after.
- **Cross-module fix** — three voices propose, then Cathy executes.
- **Public-surface fix** — three voices propose, Doug signs off, then Cathy executes.

The audit *itself* is reading + flagging; it doesn't gate. Fixes gate.

### The three lenses

#### Duplication

Find: same logic, same shape, same name in two places. Same logic, different shape (harder to spot). Same intent, different implementation.

Method:
1. Walk each module. Read every function and method.
2. For each piece of logic, ask: "Have I seen this elsewhere?"
3. Flag duplicates with a `// AUDIT: duplicates X in Y` comment. Then triage: extract to shared helper, or document why the duplication is intentional.

Sprint-25 example (already resolved): `diffuse` was duplicated between `bond.ts` and `scope.ts`. Lifted to single home in `scope.ts`.

Anticipated candidates from sprint-25 review:
- `inertOf` / `reactiveOf` — twin recursive helpers in `bond.ts`. May factor through a single `lookupDecorator(map, chemical, property)` helper.
- `$Particle.constructor` and `$Chemical.constructor` setup logic — overlap on `$cid`, `$symbol`, `$phases`, `$type` initialization. May share a helper.

#### Brittleness

Find: code that breaks under reasonable change. Hidden coupling. Implicit invariants. Code that "happens to work" because of distant facts elsewhere.

Method:
1. For each cross-module reference (imports, symbol-keyed reads, property string keys), ask: "If I changed this name/symbol/string in the wrong place, would the test suite catch it?"
2. For each `as any` / `as unknown` cast, read the surrounding code: is the cast right, or is it papering over a real type problem?
3. For each prototype-chain read (`Object.getPrototypeOf`, `[symbol]` lookup that may inherit), ask: "Is this read assuming inherited or own? Is that decision documented?"

Sprint-24 example (already resolved): `scope.finalize` did not fan out to derivatives — silent reactivity gap. The brittleness was that nothing tested cross-chemical writes from inside event handlers.

Anticipated candidates:
- `$isChemicalBase$` inherited transitively in `collectProperties` — Queenie's sprint-24 finding that user methods like `bump()` never reach `$Reagent.form()`. Either intentional or dead code; either way, undocumented.
- `$Reagent` wrapper machinery may be unreachable for non-`$` methods. Verify or remove.
- `$Chemical` constructor body sets `this[$type$][$$template$$]` conditionally — race conditions with derived classes?

#### Semantic confusion

Find: names that don't match what the code does. Names that point at the same thing as a different name. Nouns where verbs belong, verbs where nouns belong.

Method:
1. For each public-surface name, read the implementation. Does the name describe what the function does, or what the author was thinking about while writing it?
2. For each cluster of similarly-named identifiers (e.g., `isProp` / `isProperty` / `isField` / `isMethod` / `isReadable` / `isWritable`), ask: "What would a fresh reader guess each one means? Is that what they actually mean?"
3. Flag confusion with the same `// AUDIT:` comment pattern. Triage: rename, document, or split.

Anticipated candidates (from sprint-25 deferred):
- `$Bond.bid` — abbreviated for "bond id". Could be `signature` or `id`.
- `$Bond.isProp` vs `isProperty` vs `isField` — confusing trio.
- `$Reflection.isReactive` vs `$Reflection.reactive` getter — name shadow.
- `$Function$`, `$Html$` — odd `$X$` shape for classes (vs the `$X` convention).
- `$ParamValidation`, `$paramValidation` — class + function with the same root.
- `$Represent` — verb-name on a class (vs noun convention).
- `_reactivate` underscore prefix on a public-ish method — distinct from `$` membrane meaning.

### Audit comment convention

Found-but-not-yet-fixed smells get a comment in source:

```typescript
// AUDIT: duplicates X (see file.ts:N) — kept because Y, OR planned fix Z.
// AUDIT: brittle — assumes inherited [$x$], not own. See caveat path-to-doc.
// AUDIT: semantic confusion — name says X, function does Y. Pending rename.
```

These are *temporary*. A green commit on a closed audit story removes the comment. Audit comments at sprint close go to caveat pages (Libby's track) or are deleted as resolved.

### Wiki navigation tier (Libby's track)

Feature pages link into source. The convention added to `.claude/docs/readme.md`:

```markdown
[$Bond.form]: ../../../library/chemistry/src/abstraction/bond.ts#L121
```

Markdown supports anchors but not line numbers across editors uniformly; Libby will try `#L121` style and confirm what GitHub-style and editor-side renderers honor.

Effect: a reader navigating the wiki can follow a link from prose directly into the function being described. The brain extends from page-to-page connections to page-to-code connections.

## Spikes

### SP-1: Audit-comment convention dry-run — NOT STARTED
- **Owner:** Cathy
- **Question:** Does the `// AUDIT: ...` comment pattern survive a real audit pass without becoming noise?
- **Method:** Run a 30-minute audit on `bond.ts` + `chemical.ts` using all three lenses. Add `// AUDIT:` comments wherever a smell is found. Don't fix anything yet.
- **Decision gate:** If the file becomes unreadable from comment density, methodology refines. If patterns emerge cleanly, proceed to story execution.
- **Output:** `spikes/audit-dry-run.md` summarizing what the lenses found.

### SP-2: Wiki source-link convention — NOT STARTED
- **Owner:** Libby
- **Question:** Does `[name]: path/to/file.ts#L<line>` actually navigate in our preview tools (VS Code, GitHub, Claude Code)?
- **Method:** Pick three feature pages. Add source links. Test in each previewer.
- **Decision gate:** If any previewer fails to honor line anchors, document fallback (link to file without anchor). If all work, codify in `readme.md`.
- **Output:** `spikes/wiki-source-links.md`.

## Epics

### ED: Duplication

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| D-1 | Audit pass — flag duplication candidates | Cathy | SP-1 | NOT STARTED |
| D-2 | Resolve `inertOf` / `reactiveOf` twin helpers | Cathy | D-1 | NOT STARTED |
| D-3 | Resolve `$Particle` / `$Chemical` constructor overlap | Cathy + Arthur | D-1 | NOT STARTED |
| D-4 | Resolve any other duplication surfaced by D-1 | Cathy | D-1 | NOT STARTED |

### EB: Brittleness

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| B-1 | Audit pass — flag brittleness candidates | Cathy + Arthur | SP-1 | NOT STARTED |
| B-2 | Resolve `$isChemicalBase$` inherited-vs-own gate (Queenie's sprint-24 finding) | Cathy | B-1 | NOT STARTED |
| B-3 | Audit `as any` / `as unknown` casts — fix or document | Cathy | B-1 | NOT STARTED |
| B-4 | Audit prototype-chain reads — own-vs-inherited each one | Cathy + Arthur | B-1 | NOT STARTED |

### EC: Semantic confusion (absorbs sprint-25 E-3 remainder + E-4)

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| C-1 | Audit pass — flag confusion candidates | All | SP-1 | NOT STARTED |
| C-2 | Resolve `$Bond` cluster (`bid`, `isProp`, `isProperty`, `isField`, `isReadable`, `isWritable`, `isMethod`) | All | C-1 | NOT STARTED |
| C-3 | Resolve `$Reflection` cluster (`isReactive` vs `reactive`, `isSpecial`) | All | C-1 | NOT STARTED |
| C-4 | Resolve `$Function$`, `$Html$` — drop trailing `$` or justify | All | C-1 | NOT STARTED |
| C-5 | Resolve `$ParamValidation` / `$paramValidation` / `$Represent` / `_reactivate` | All | C-1 | NOT STARTED |
| C-6 | Method-name pass across all classes (sprint-25 E-4 carry-forward) | All | C-1, SP-2 (test snapshot still valid) | NOT STARTED |

### ER: Refactoring (carry-forward from sprint-25)

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| R-1 | Refactor `_reactivate` in `molecule.ts` — match sibling shape (`form()`, `double()`) | Cathy | C-1 (rename first) | NOT STARTED |
| R-2 | Fragment `$Chemical` constructor body if multiple distinct phases | Cathy + Arthur | — | NOT STARTED |
| R-3 | Factor `$()` callable dispatch by arg shape | Cathy + Arthur | — | NOT STARTED |

### EL: Library / wiki — Libby's continuous track

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| L-1 | Source-link convention in `readme.md`; add to existing feature pages | Libby | SP-2 | NOT STARTED |
| L-2 | Per-pass docs reflection (sprint-25 carry-forward + sprint-26 work) | Libby | continuous | NOT STARTED |
| L-3 | "See also" footers across chemistry doc pages (sprint-25 L-4 carry-forward) | Libby | C-6 | NOT STARTED |
| L-4 | Audit-finding caveat pages — one per smell that doesn't get fixed this sprint | Libby | continuous | NOT STARTED |
| L-5 | Sprint-25 alias index audit — close out muscle-memory entries; final audit | Libby | C-6 | NOT STARTED |

## Verification checklist

- [ ] Every `// AUDIT:` comment in source either resolves into a fix-commit or migrates into a caveat page; none remain at sprint close.
- [ ] Every chemistry feature page in the wiki has at least one direct source-file link.
- [ ] All sprint-25 deferred work either lands or is consciously deferred (with caveat page) by sprint-26 close.
- [ ] All tests green at every commit; final test count documented.
- [ ] Sprint-25 alias index entries either still relevant (kept) or resolved (deleted with the index) — final state reflected in retro.
- [ ] Sprint retro at `reviews/retro.md`.
