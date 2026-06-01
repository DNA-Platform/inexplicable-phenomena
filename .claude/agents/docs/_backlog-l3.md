---
kind: guide
title: L-3 backlog — chemistry surface reference
status: planned
related:
  - _backlog-l2
---

# L-3 — chemistry surface reference

Story L-3 documents the **current chemistry surface** — every public concept a component author encounters — as feature pages. One page per concept. Each is short, self-contained, cross-linked to caveats and source.

The [overview] and [glossary] stay as the entry-tier — feature pages link back to them for the broader context.

## Audience

Audience-2 (component authors) is the primary reader. Pages assume the reader has skimmed the [overview] but not memorized it. Audience-1 (framework developers) is served by the [concepts directory][concepts] and the source files.

## Planned feature pages

Under `.claude/docs/chemistry/features/`. Source location is the `library/chemistry/src/` tree (Cathy's territory; read-only here).

### Particle layer

| File | Concept | Source |
|---|---|---|
| `particle.md` | `$Particle` — leaf renderable, identity, `view()`, `use()`, `$apply` | [particle.ts] |
| `cid-and-symbol.md` | `$cid$` and `$symbol$` — how identity is assigned and rendered | [particle.ts] |
| `template-and-instances.md` | Template singleton per class; instances derived via `Object.create()` | [particle.ts] |
| `dollar-lift.md` | `$lift` — per-site derivative entry point | [particle.ts] |

### Chemical layer

| File | Concept | Source |
|---|---|---|
| `chemical.md` | `$Chemical` — container renderable, parent/child, dual constructor | [chemical.ts] |
| `binding-constructor.md` | The named-after-class method; bond-ctor-runs-once-at-mount rule | [chemical.ts] |
| `chemical-view.md` | `chemical.view` — identity-preserving Component | [chemical.ts] |
| `dollar-callable.md` | `$()` — instance form, class form, dispatch | [particle.ts] |
| `prototypal-shadowing.md` | Same instance, different prop overrides via prototype shadow | [particle.ts] [chemical.ts] |
| `lexical-scoping.md` | Multi-site rendering produces per-site derivatives | [particle.ts] (and L-4's later update for the bond-accessor-on-instance shape) |

### Reactivity

| File | Concept | Source |
|---|---|---|
| `reactive-bonds.md` | How `$bond$` props wire reactive accessors; current installation site | [bond.ts] [molecule.ts] |
| `bond-fan-out.md` | Parent write fans out to derivatives; shadowing semantics | [bond.ts] |
| `next-and-phases.md` | `await this.next('mount')` — async lifecycle | [particle.ts] |
| `async-ctors.md` | Constructors that await | [particle.ts] |
| `render-filters.md` | `$Function$`, `$Html$`, passthrough patterns | [reflection.ts] |

### Atom layer

| File | Concept | Source |
|---|---|---|
| `atom.md` | `$Atom` — formed chemical with memory; current state vs. planned | [atom.ts] |

### Cross-cutting

| File | Concept | Source |
|---|---|---|
| `dollar-membrane.md` | The `$` prefix as the boundary between intrinsic and extrinsic | (cross-references overview) |
| `error-renderable.md` | `$Error` — making errors renderable | (post-21; see L-2) |
| `identity-i-of-t.md` | `I<T>` — the identity-shaped type | (post-21; see L-2) |
| `particularization.md` | Making any object renderable via prototype-mixin insertion | [particle.ts] |
| `audience-split.md` | `@dna-platform/chemistry` root vs. `/symbolic` subpath | [index.ts] [symbolic.ts] |

## Conventions L-3 must follow

- Each page is short. If it's growing past two screens, split.
- Each page links to its caveats — never repeats them.
- Each page lists its source file(s) in the *See also* section.
- Each page's frontmatter `status` honestly reflects reality: `stable`, `evolving`, `deprecated`, `planned`. Pages on planned features (`$Atom` integration, `I<T>` if not yet shipped) use `status: planned`.

## Sequencing

1. Start with the *layer* pages: `particle.md`, `chemical.md`, `atom.md`. These anchor everything else.
2. Then the *cross-cutting* pages — `dollar-membrane.md`, `dollar-callable.md`, `lexical-scoping.md` — since the per-concept pages will link into these.
3. Then the *per-concept* pages, working layer by layer.
4. Last, audit: every glossary term should be reachable in at most one click from the index, and every public symbol in `index.ts` should be backed by a feature page.

## Acceptance for L-3

- Pages exist under `.claude/docs/chemistry/features/` for every concept above.
- Each page is short and self-contained.
- Cross-links work; an outsider can find each feature from the [docs index].
- Every public export in `library/chemistry/src/index.ts` has a feature page.

## Coupling with sprint-24 Track A

When [sprint-24 Track A][sprint-24 plan] lands (A-4 specifically), `reactive-bonds.md` and possibly `prototypal-shadowing.md` need a one-paragraph update: bond accessors move from class prototype to per-instance own properties. Story L-4 covers that update.

<!-- citations -->
[overview]: ./chemistry/overview.md
[glossary]: ./chemistry/glossary.md
[concepts]: ./chemistry/concepts/
[docs index]: ./index.md
[sprint-24 plan]: ../project/sprint-24/plan.md
[particle.ts]: ../../library/chemistry/src/abstraction/particle.ts
[chemical.ts]: ../../library/chemistry/src/abstraction/chemical.ts
[atom.ts]: ../../library/chemistry/src/abstraction/atom.ts
[bond.ts]: ../../library/chemistry/src/abstraction/bond.ts
[molecule.ts]: ../../library/chemistry/src/abstraction/molecule.ts
[reflection.ts]: ../../library/chemistry/src/implementation/reflection.ts
[index.ts]: ../../library/chemistry/src/index.ts
[symbolic.ts]: ../../library/chemistry/src/symbolic.ts
