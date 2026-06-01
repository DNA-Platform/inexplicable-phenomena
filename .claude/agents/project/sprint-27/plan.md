# Sprint 27: Crystallization

A structural sprint in two coupled motions. **Motion 1 — particle/chemical alignment:** the cleavage line between `$Particle` and `$Chemical` is currently *not* where the framework's design says it should be. Reactivity (`$Molecule`, `$Reaction`, instance setup) lives on `$Chemical` even though particles are now reactive too. Composition (the bond ctor, JSX children processing, `$Synthesis`) lives there with it, when it should be the chemical-specific part. Sprint 27 separates them: **reactivity → `$Particle`; composition → `$Chemical`**. This makes `chemical.ts` shorter, `particle.ts` more capable, and removes the architectural reason particularization felt awkward.

**Motion 2 — library crystallization:** the wiki currently has feature pages, concept pages, caveat pages, history pages, and a catalogue. It does *not yet* have **books** — per-major-class deep-dives organized as small directories of chapter files. Doug's directive: code becomes *sparse*; the library carries the explanation. Cathy and Libby work side-by-side to migrate code comments into chapter files. Library structure mirrors source structure where it helps readers; not where it forces.

**Subordinate to Motion 1: no dynamic binding (corrected).** "Dynamic binding" in this project's sense means *the bad pattern* where a class can't cleanly split, so an ugly interface duplicates the class's semantics to enable late binding through a structural type. This is NOT the same as `chemical[chemical[$type$].name]` — that lookup leverages the runtime class name as a *feature* of having the type tag. The framework respects the user's `class $Foo extends $Chemical { $Foo(arg) { ... } }` syntax by finding the bond ctor via the class name; nothing about that duplicates class semantics. **Audit target:** find places where an interface or adapter class exists *only* to enable late binding when a static dependency wasn't possible. Suspicion to verify: `$Reactants` and `$SynthesisContext` overlap (sprint-26 finding) — does `$Reactants` exist as a stand-in interface, or is it an essential shared structure?

## Status: IN PROGRESS

Last updated: 2026-04-29

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Code surgery — particle/chemical realignment, dynamic-binding removal, comment migration |
| Arthur | Architect | Architectural calls on what moves where; identifies hidden dependencies; reviews dispatch redesign |
| Queenie | QA Engineer | Coverage-shape audit (members that move between classes must stay test-pinned by behavior); listens to architectural debates and flags brittleness |
| Libby | Librarian | Book/chapter structure; comment migration into chapter files; navigation links code↔library both directions |

## Methodology

### The "what should move" decision rule (Track A)

For each member currently on `$Chemical`, ask:
1. **Does a non-composing particle need this?** A particularized `$Error` carrier should support `.next('mount')`, view augmentation, scope tracking. If yes → move to `$Particle`.
2. **Does it require children / bond ctor / JSX-as-args?** If yes → stays on `$Chemical`.
3. **Is it pure boilerplate that runs on every reactive instance?** Move to `$Particle`.

Anticipated moves (proposed; verify in SP-1):
- `$molecule` getter, `$reaction` getter, instance setup (`$Reaction`, `$Molecule` construction) → `$Particle`
- `$bond$()` template method (the reactivate-then-bond-ctor-then-reactivate dance) → split: reactivate parts to `$Particle`, bond-ctor part stays on `$Chemical`
- `mount`/`render`/`layout`/`effect`/`unmount` async helpers → `$Particle` (already mostly there via `next(phase)`)

Anticipated stays on `$Chemical`:
- `$Synthesis` and `$SynthesisContext`
- The bond ctor lookup + invocation
- `assertViewConstructors`
- `bind()`, `$()` callable, the `Component` getter logic for templates

### The "no dynamic binding" rule (Track A subordinate)

Find places where a class's semantics get duplicated by an interface / adapter class / wrapper *only* to enable late binding. The ugly form: "I couldn't import X here, so I made an interface IX that mirrors X, and now the consumer late-binds to IX when X is what's actually needed."

NOT the target: `chemical[chemical[$type$].name]` and similar uses of `$type$.name` as runtime data. Having the type tag is a feature; using it for class-aware dispatch is fine.

Audit candidates from sprint-26's findings:
- `$Reactants` — fields overlap with `$SynthesisContext`. Does it exist to give the bond-ctor a typed handle on its arguments without coupling to `$SynthesisContext`? If so, that's the late-binding-via-mirror pattern.
- Anywhere else this audit surfaces them.

### The "what should move (comments)" decision rule (Track B/C)

For each block comment in `particle.ts`, `chemical.ts`, `atom.ts`, `bond.ts`, `molecule.ts`, `reaction.ts`:

- **Stays in code:** comments that explain *why a specific line is the way it is* — workarounds, invariants, non-obvious constraints, "happens because of unrelated fact at file:line."
- **Moves to library:** comments that explain *what code does* in a way that reads as narrative — multi-paragraph explanations, design rationale, lifecycle descriptions, "see also X."
- **Replaces inline:** the moved comment leaves a single-line pointer in code: `// see [docs/chemistry/books/particle/lifecycle.md].`

### Library books — structure (Track B)

A **book** is a directory under `.claude/docs/chemistry/books/{class}/`. Each major class gets a book:
- `particle/` — the leaf-with-reactivity book
- `chemical/` — the composition book
- `atom/` — the singleton book
- `bond/` — the reactive-property book (covers `$Bond`, `$Reagent`, `$Reflection`, decorators)
- `molecule/` — the structural-bond-graph book
- `reaction/` — the reactivity-unit book
- `synthesis/` — the bond-ctor-orchestration book

A **chapter** is a file inside a book. Chapter naming follows the topic (`lifecycle.md`, `particularization.md`, `view-augmentation.md`), not the file structure. Each chapter:
- Has the standard frontmatter (`kind: concept` or `kind: feature`)
- Cross-links to the source files it describes (continuing sprint-26's source-link convention)
- Lives in a `<!-- citations -->` block at the bottom

Each book has an `index.md` that lists chapters in narrative reading order.

The catalogue (`docs/catalogue.md`) gets a new top-level "By book" section.

### Code↔library navigation (Track B continuous)

- **Library → code:** anchored source links in chapters (sprint-26 convention; already in use).
- **Code → library:** every block comment that moved leaves a single-line pointer in code that names the chapter. Example: `// see books/particle/lifecycle.md`. Convention added to `coding-style.md`.

## Spikes

### SP-1: Particle/chemical side-by-side audit — NOT STARTED
- **Owner:** Cathy + Arthur
- **Question:** Member by member, which currently lives on `$Chemical` that should live on `$Particle`? Where is dynamic binding hiding?
- **Method:** Read `particle.ts` and `chemical.ts` in parallel. Tabulate every member of `$Chemical`'s class body with its dependency on composition vs. reactivity. Tabulate every dynamic-binding pattern (`(x as any)[<string>]`) in both files.
- **Output:** `spikes/particle-chemical-audit.md` — two tables (member migration plan, dynamic-binding instances).
- **Decision gate:** the migration table becomes A-1's checklist; the late-binding-mirror table (if any patterns surface) becomes A-3's checklist.

### SP-2: Book structure dry-run — NOT STARTED
- **Owner:** Libby
- **Question:** Does the books-with-chapters structure feel right when populated for one class? Do chapters split naturally, or do they fight the topic?
- **Method:** Build the `particle/` book end-to-end. Pick chapter splits. Move 2-3 substantial code comments from `particle.ts` into chapters. Replace the comments in code with single-line pointers.
- **Output:** `spikes/book-structure-dry-run.md` plus the `particle/` book itself.
- **Decision gate:** the chapter-split heuristic becomes the rule for L-2 (other books).

## Epics

### EA: Particle / Chemical alignment

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| A-1 | Move identified reactive-machinery members from `$Chemical` to `$Particle` | Cathy | SP-1 | NOT STARTED |
| A-2 | Investigate `$Reactants`-as-late-binding-mirror; resolve or document | Cathy + Arthur | SP-1 | NOT STARTED |
| A-3 | Resolve any other late-binding-via-mirror patterns surfaced by SP-1 | Cathy | SP-1 | NOT STARTED |
| A-4 | Update tests and imports broken by class-membership moves (if any) | Queenie | A-1 | NOT STARTED |

### EB: Library books

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| B-1 | Build the `particle/` book (chapter set + index) | Libby | SP-2 | NOT STARTED |
| B-2 | Build the `chemical/` book | Libby | B-1 | NOT STARTED |
| B-3 | Build the `bond/` book (covers `$Bond`, `$Reagent`, `$Reflection`) | Libby | B-1 | NOT STARTED |
| B-4 | Build the `molecule/`, `reaction/`, `synthesis/` books | Libby | B-1 | NOT STARTED |
| B-5 | Build the `atom/` book | Libby | B-1 | NOT STARTED |
| B-6 | Catalogue updated — new "By book" section, books cross-linked from subject taxonomy | Libby | B-5 | NOT STARTED |

### EC: Comment migration

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| C-1 | Survey block comments in core source files; classify (stays / moves / inline-pointer) | Cathy + Libby | B-1 | NOT STARTED |
| C-2 | Migrate "moves" comments into book chapters; replace in code with pointers | Cathy + Libby | C-1, B-2..B-5 | NOT STARTED |
| C-3 | Add "see books/X" pointer convention to `coding-style.md` | Libby | C-2 | NOT STARTED |

### EL: Continuous library track

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| L-7 (carry-forward) | Source-path sweep — entry-tier docs (`overview`, `glossary`, `file-map`) cite stale post-sprint-23 paths | Libby | — | NOT STARTED |
| L-8 | Coverage of new books in catalogue, status frontmatter on every chapter | Libby | B-6 | NOT STARTED |

## Dependency graph

```
SP-1 ──┬─> A-1 ──> A-4
       └─> A-2, A-3 (parallel with A-1)

SP-2 ──> B-1 ──┬─> B-2 ─┐
               ├─> B-3 ─┤
               ├─> B-4 ─┼─> B-6 ──> L-8
               └─> B-5 ─┘

C-1 ──> C-2 ──> C-3
   (depends on B-1+B-2..B-5)

L-7 runs in parallel
```

## Verification checklist

- [ ] Every member of `$Chemical` that doesn't require composition now lives on `$Particle`
- [ ] No interface / adapter exists *solely* to enable late binding around an unsplittable class. Each surviving "structural mirror" is documented with a real reason.
- [ ] Each major class has its own book under `chemistry/books/`
- [ ] Each book has a narrative `index.md` and 2+ chapter files
- [ ] Block comments in `particle.ts` / `chemical.ts` / `atom.ts` / `bond.ts` are sparse — only invariants and pinpoints remain in code
- [ ] Every removed comment's content lives in a chapter that's reachable from the catalogue
- [ ] Every chapter has at least one anchored source link
- [ ] `coding-style.md` documents the "code → library" pointer convention
- [ ] Catalogue updated with new "By book" section
- [ ] Suite at 428 (or higher) green throughout
- [ ] Sprint retro at `reviews/retro.md`
