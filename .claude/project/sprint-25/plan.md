# Sprint 25: Resonance

A naming + structural sprint. The codebase has settled into a chemistry register — `$cid`, `$type`, `$bond`, `$reagent`, `$catalyst`, `$molecule`, `react()`, `form()`, `double()` — but a handful of identifiers don't *resonate* with their neighbors. `fanOutToDerivatives` is the canonical example: four words, mixed register (networking jargon), inside a chemistry framework. Sprint 25 finds the rest of these and aligns them.

The sprint runs in two phases. **Phase M (Methodology)** designs the audit machinery — the scales, the rules for deciding a rename, the documentation rhythm, the rename discipline — and pilots it on one small surface (`bond.ts`) to validate. **Phase E (Execution)** applies the methodology in five tiered passes, outside-in, with a re-walk after each tier.

Throughout: three coding voices (Cathy, Queenie, Arthur) on every rename decision. Libby runs a continuous fourth track building the wiki's associative link graph as renames land — she's the project's memory, the consistency check, and the brain-builder. The wiki ends the sprint with associative "see also" links between related concepts, not just categorical citation blocks.

## Status: COMPLETE (with carry-forward to sprint-26)

Last updated: 2026-04-29. Retro at `reviews/retro.md`. Sprint-25 closed at the methodology + initial-passes mark; deferred work (E-3 remainder, E-4, E-5, ER refactoring, L-2/L-4/L-5) absorbed into sprint-26 (Distillation) under the broader audit umbrella.

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Code surgery — proposes renames, executes refactors, owns `library/chemistry/src/**` |
| Queenie | QA Engineer | Coverage — pre-sprint test-name snapshot; verifies every pass keeps tests green; audits `describe`/`it` strings as part of the rename surface |
| Arthur | Architect | Veto / canonical sibling selection — keeps the register coherent at the cross-module level |
| Libby | Librarian | Memory and link-builder — maintains an alias index for the duration; adds associative cross-links between docs as renames land; one "see also" footer per page by sprint close |

## Methodology — established up front, refined per pilot

### Five identifier scales

Renames are tiered. We work **outside-in** to minimize redo, with a **re-walk** after each tier because higher-tier renames change context for lower tiers.

1. **Public surface** — `src/index.ts`, `src/symbolic.ts` exports. Names that escape the package.
2. **Module names** — file names under `src/`, exported groupings.
3. **Class names** — `$Particle`, `$Chemical`, `$Atom`, `$Bond`, `$Reagent`, `$Reflection`, `$Molecule`, `$Reaction`, `$Orchestrator`, etc.
4. **Method / function / property names** within a class or module.
5. **Local variables** — short-lived names inside methods. Sometimes leak intent.

After completing a tier we re-walk the tiers below it because the new context exposes candidates that didn't read as wrong before.

### Rename decision rules

1. **Survey before propose.** For every candidate identifier, list its siblings — other methods on the same class, other classes in the same module. Read the names together.
2. **Identify the canonical.** Which sibling reads cleanest, most concise, most chemistry-true? That's the anchor.
3. **Align outward.** Rename siblings to match the anchor's *register* (single-word-ness, vocabulary, grammatical mood). Don't pick a name in isolation.
4. **The anchor is up for renaming too.** If the anchor is wrong but everything else hints at an implicit canonical, find the implicit canonical and rename *all* of them.
5. **Never rename in private.** Three coding voices on every decision. Doug signs off on the rename plan *per pass* before keystrokes.

### Style checkpoints (Doug's voice, derived from particle / chemical / atom)

- **Single words preferred** when one fits the concept. Multi-word identifiers signal that the concept hasn't been compressed yet.
- **Chemistry register is the canonical.** Names should read as chemistry — not networking, not OS jargon, not React.
- **The `$` prefix means "intrinsic identity"** (private membrane separating from extrinsic context).
- **The `$$x$$` symbol-keyed pattern means "this lives below the type system"** — used when something must be `any` / `unknown` and gets a symbol-named handle.
- **Methods are verbs.** Classes are nouns. Properties are nouns or noun-phrases. The grammatical mood matters as much as the vocabulary.
- **Brevity captures essence.** Long methods and long names both signal under-compressed thinking. A long method that won't compress is sometimes a sign the abstraction is wrong.

### Structural refactoring rules

Same shape as naming.

1. **Survey siblings.** For each long method, list its siblings.
2. **Find the canonical structural pattern.** Which sibling embodies the cleanest shape — small, single-purpose, verb-named?
3. **Refactor to match.** Pull the canonical pattern into the long method. If no sibling is canonical, copy the pattern from another class where it reads better.

### Documentation rhythm (Libby's track)

1. **Every rename produces a docs change.** The renamed identifier's feature/concept/caveat page updates; every other docs page that mentioned the old name updates too.
2. **Associative cross-links land alongside renames.** When `fanOutToDerivatives` becomes `diffuse` and the rename touches `reactive-bonds.md`, Libby adds an associative link from `reactive-bonds.md` to `derivatives-and-fan-out.md` (concept) and to the historical caveat (if any) — not just the categorical citation.
3. **Alias index for the sprint duration.** `.claude/docs/_aliases-sprint-25.md` maps `old name → new name → page link`, so anyone reading the docs during the sprint can resolve muscle memory. Deleted at sprint close.
4. **"See also" footer per page** by sprint end. Three associative links each, hand-picked.
5. **Libby is the consistency check.** When a coding voice is uncertain what to call a thing, the first move is "what does the wiki already call it nearby?" — Libby answers.

### Rename discipline

- Pre-sprint: Queenie commits a test-name snapshot (SP-2 output).
- Per pass: rename plan → 3-voice review → Doug sign-off → execute → tests green → Libby reflects in wiki.
- Tests must be green before commit. A red test post-rename is a missed site.
- No commit chains across passes — each pass commits and stabilizes before the next begins.

## Spikes

### SP-1: Pilot — vocabulary-and-structure pass on `bond.ts` — NOT STARTED
- **Owner:** Cathy + Queenie + Arthur + Libby (all four voices)
- **Question:** Does the methodology work on a small contained surface? What needs refinement before we scale?
- **Method:** Apply the full methodology to one file. Survey identifiers. Decide canonicals. Propose renames + at least one structural refactor (`fanOutToDerivatives` → `diffuse` is the canonical example). Land it. Libby builds the docs reflection in real time. After the pilot, refine the methodology in `plan.md` if anything didn't fit.
- **Decision gate:** Methodology is locked → proceed to Phase E. Methodology needs another iteration → second pilot on a sibling file (e.g., `molecule.ts`).
- **Output:** `spikes/bond-pilot.md` — what we did, what we learned, what changed in methodology.

### SP-2: Test-name snapshot — NOT STARTED
- **Owner:** Queenie
- **Question:** What identifier does each test pin? (So we can tell a missed-rename failure from a renamed-test failure during execution.)
- **Method:** Catalogue every `describe`/`it` string + every imported identifier per test file. Output a manifest.
- **Decision gate:** Manifest committed → execution phase can start.
- **Output:** `spikes/test-name-snapshot.md`.

## Epics

### EM: Methodology

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| M-1 | Pilot bond.ts (SP-1 execution + methodology refinement) | All | SP-2 | NOT STARTED |
| M-2 | Lock methodology in plan.md based on pilot findings | All | M-1 | NOT STARTED |

### EE: Execution — five tiered passes, outside-in

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E-1 | Pass 1 — public surface (`index.ts`, `symbolic.ts`) | Cathy + Queenie + Arthur | M-2 | NOT STARTED |
| E-2 | Pass 2 — module / file names under `src/` | Cathy + Queenie + Arthur | E-1 | NOT STARTED |
| E-3 | Pass 3 — class names | Cathy + Queenie + Arthur | E-2 | NOT STARTED |
| E-4 | Pass 4 — method / function / property names | Cathy + Queenie + Arthur | E-3 | NOT STARTED |
| E-5 | Pass 5 — local variables (re-walk only — surfaces candidates from prior passes) | Cathy | E-4 | NOT STARTED |

Each pass: rename plan → 3-voice review → Doug sign-off → execute → tests green → Libby reflects in wiki → commit.

### ER: Refactoring (matching-neighbors)

Discovered during execution passes — not pre-planned. Each candidate gets its own story when surfaced.

#### Anticipated candidates (will become stories as confirmed)

- `_reactivate` in `molecule.ts` — heavy with conditionals; compare to `form()` / `double()` in `bond.ts` for the canonical "small verb-method" shape.
- `$Chemical` constructor body — multiple distinct setup phases; could fragment into named helpers.
- `$()` callable dispatch in `chemical.ts` — large branchy function; possibly factor by arg shape.

### EL: Library / wiki — Libby's continuous track

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| L-1 | Alias index initialized | Libby | M-1 | NOT STARTED |
| L-2 | Per-pass docs reflection | Libby | continuous | NOT STARTED |
| L-3 | Coding-style page — capture Doug's style as a durable doc | Libby | M-2 | NOT STARTED |
| L-4 | Associative "see also" footers added to every chemistry doc page | Libby | E-4 | NOT STARTED |
| L-5 | Alias index deleted; wiki audit at sprint close | Libby | E-5 | NOT STARTED |

## Dependency graph

```
SP-2 ──> SP-1 ──> M-2 ──> E-1 ──> E-2 ──> E-3 ──> E-4 ──> E-5
                  │       └─> L-2 (continuous, runs alongside every E-pass)
                  ├─> L-1
                  └─> L-3
                                                       L-4 ──> L-5
ER (refactoring stories) added as discovered during E-passes
```

## Verification checklist

After all work completes:

- [ ] `fanOutToDerivatives` is gone from the codebase, replaced by a single-word verb in the chemistry register
- [ ] No identifier in `src/**` exceeds three words without an explicit justification documented in the rename plan
- [ ] Every `src/**` class/method name passes the "would this read on a periodic-table chart?" sniff test
- [ ] `_reactivate` (or its rename) is at most three nested-conditional levels and under ~30 lines
- [ ] All tests green at every pass commit; final test count documented
- [ ] Coding-style page (`L-3`) exists at `.claude/docs/coding-style.md` and captures Doug's style explicitly
- [ ] Every chemistry doc page has a "see also" footer with three associative links
- [ ] Alias index deleted; `git log` shows the renames as their own commits
- [ ] Sprint retro at `reviews/retro.md`
