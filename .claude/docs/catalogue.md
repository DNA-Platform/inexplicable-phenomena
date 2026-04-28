---
kind: index
title: Catalogue
status: evolving
---

# Catalogue

The reading list. If you don't know where to look, start here.

The wiki is small enough that you could `ls` your way through it, but a small wiki rewards a curated spine: which pages address which subject, which pages are settled and which are still in motion, and which pages a particular kind of reader should find first. That's what this page is for.

It is hand-maintained. When a page is added, moved, or retired, this catalogue should change in the same commit. If something here points nowhere or nowhere points here, that is a bug.

## By book

A **book** is a per-class deep-dive — a small directory of chapter files under `chemistry/books/{class}/`. Where the feature, concept, and caveat pages give a single-page reference for one idea, a book lays out a full reading: identity, lifecycle, particularization, multi-site derivation, and the rendering boundary, each as its own chapter, in narrative order. Read the book's `index.md` first; it sets the reading order and the scope.

This shelf grows as classes are crystallized — sprint-27 begins with `particle/`; the others (`chemical/`, `bond/`, `molecule/`, `reaction/`, `synthesis/`, `atom/`) follow.

- [`$Particle` — book][book-particle] — the leaf-with-reactivity book. Identity, lifecycle, particularization, lift, render filters, view. Six chapters; status `evolving` while the chapter form is being settled.

## By subject

The taxonomy below is not the directory layout — it cuts across `features/`, `concepts/`, `caveats/`, and `history/`. A subject collects everything a reader would want to read together to understand a single theme.

### Identity and the `$` membrane

What `$` means, where identity lives, and how an object becomes a particle without losing what it already was.

- [coding style] — the `$` membrane as intrinsic-vs-extrinsic boundary; the `$$x$$` symbol pattern; `_` for privacy.
- [particularization (feature)][feat-particularization] — `new $Subclass(obj)` returns the same reference, with particle methods mixed in.
- [`$Error`][feat-dollar-error] — the canonical particularization use case.
- [particularization history][hist-particularization] — the prototype-mixin design and the variants that were walked back.
- [particularization prototype-loss caveat][cav-particularization] — what the original `setPrototypeOf` design broke.
- [`I<T>` history][hist-i-of-t] — the identity-shaped type, from `Omit<T, keyof Object>` to plain `T`.

### Reactivity

How property writes wake the right components.

- [reactive bonds (feature)][feat-reactive-bonds] — `$`-prefixed fields become bonds; setters fire `react()` and fan out.
- [derivatives and fan-out (concept)][concept-derivatives] — the `$derivatives$` registry, the two write paths, the unconditional fan-out rule.
- [reactivity contract] — the one-paragraph promise the framework makes to component authors.
- [cross-chemical handler fanout (caveat)][cav-cross-chemical] — the in-scope-write path used to skip fan-out. Fixed sprint-24.
- [short prop name instability (caveat)][cav-short-prop] — `$v`, `$x`, `$y` were silently inert pre-sprint-24.

### Composition (the `$()` callable, mounting, scoping)

How a chemical becomes JSX, how lifting works, and what happens when you mount the same instance twice.

- [`$()` callable (feature)][feat-dollar-callable] — instance form, class form, dispatch surface.
- [`$Particle` (feature)][feat-particle] — the leaf renderable.
- [`$Chemical` (feature)][feat-chemical] — the container with a bond constructor.
- [render filters (feature)][feat-render-filters] — `$Function$`, `$Html$`, the filter chain, passthrough patterns.
- [lexical scoping (concept)][concept-lexical-scoping] — multi-site rendering, derivatives, prototypal shadowing.

### Lifecycle

When a chemical is constructed, mounted, ready; how user code waits for a phase.

- [lifecycle phases (feature)][feat-lifecycle-phases] — `next(phase)`, async constructors, async bond ctors.
- [`$Particle`][feat-particle] — phase fields live here.
- [sprint-22 history][hist-sprint-22] — where the lifecycle-as-awaitable model landed.

### Architecture and the chemistry register

The metaphor itself. Why "chemistry," what the layers are, what name belongs where.

- [chemistry overview] — what `$Chemistry` is, the layered architecture, current status.
- [chemistry glossary] — every term, organized by layer.
- [chemistry file map] — every source file and its dependencies.
- [coding style] — the chemistry register; brevity and grammatical mood.
- [coding conventions] — Doug's source-level conventions (compression, no blank lines in methods).
- [performance contract] — what the framework costs at runtime.

### Project history

Sprint-shaped narratives. Read these to understand *why* the current API looks like it does.

- [sprint-22 — lexical scoping & the beautiful API][hist-sprint-22] — the structural rebuild.
- [sprint-23 — audit cleanup][hist-sprint-23] — audience boundaries, symbol-keying, vocabulary precision.
- [particularization history][hist-particularization] — the prototype-mixin redesign.
- [`$Error` history][hist-dollar-error] — the motivating particularization case.
- [`I<T>` history][hist-i-of-t] — the identity-shaped type.

### Project infrastructure

How the meta-project (collaboration, voice, desktop) is wired. Not framework code; the workshop.

- [init] — setting up a collaborator workspace.
- [voice] — the voice-mode protocol.
- [desktop] — Claude Desktop UI automation.
- [log format] — the conversation log protocol shared with the relay.

### The wiki itself

Pages about the wiki. Read these if you're adding to it.

- [readme] — page kinds, frontmatter, file naming, source links, citations conventions.
- [feature template][template-feature] — copy this for new features, concepts, guides.
- [caveat template][template-caveat] — copy this for new caveats.
- [L-2 backlog] — sprint-history pages still to write.
- [L-3 backlog] — chemistry-surface feature pages still to write.

## By kind

The same content, sorted by frontmatter `kind`.

### Feature pages

Component-author surface. What a thing is, how to use it, what to watch for.

- [`$Particle`][feat-particle]
- [`$Chemical`][feat-chemical]
- [`$()` callable][feat-dollar-callable]
- [reactive bonds][feat-reactive-bonds]
- [render filters][feat-render-filters]
- [particularization][feat-particularization]
- [`$Error`][feat-dollar-error]
- [lifecycle phases][feat-lifecycle-phases]

### Concept pages

Models the framework is built on. Pure explanation; no API surface required.

- [lexical scoping][concept-lexical-scoping]
- [derivatives and fan-out][concept-derivatives]
- [coding style] (technically marked `concept` — captures the naming model)

### Caveat pages

Pitfalls, gotchas, hard-won lessons. Each earns a URL because it gets cited.

- [cross-chemical handler fanout][cav-cross-chemical] — `stable` (resolved sprint-24).
- [short prop name instability][cav-short-prop] — `historical` (resolved sprint-24).
- [particularization prototype-loss][cav-particularization] — `historical` (resolved sprint-22).

### History pages

Durable narratives distilled from sprint folders. Sprint folders themselves stay the source of truth for process; these are the *result*.

- [sprint-22 — lexical scoping & the beautiful API][hist-sprint-22]
- [sprint-23 — audit cleanup][hist-sprint-23]
- [particularization history][hist-particularization]
- [`$Error` history][hist-dollar-error]
- [`I<T>` history][hist-i-of-t]

### Reference / contract pages

Larger reference documents that pre-date the per-page split. Not labelled `feature` because they cover surfaces, not single concepts.

- [chemistry overview]
- [chemistry glossary]
- [chemistry file map]
- [coding conventions]
- [reactivity contract]
- [performance contract]

### Project-infrastructure pages

The workshop. Identity-agnostic infrastructure for the team.

- [init], [voice], [desktop], [log format]

### Templates and scaffolding

- [feature template][template-feature], [caveat template][template-caveat]
- [L-2 backlog], [L-3 backlog]
- [sprint-25 alias index][aliases-sprint-25] — temporary; deletes at sprint-25 close.

## By status

`status` is set in frontmatter. The split lets a reader see at a glance what is settled and what is still moving.

### Stable

These describe the framework, the wiki, or the project as they currently are. Update if behavior changes.

- All eight feature pages: [particle][feat-particle], [chemical][feat-chemical], [dollar-callable][feat-dollar-callable], [reactive-bonds][feat-reactive-bonds], [render-filters][feat-render-filters], [particularization][feat-particularization], [dollar-error][feat-dollar-error], [lifecycle-phases][feat-lifecycle-phases].
- Both concept pages: [lexical-scoping][concept-lexical-scoping], [derivatives-and-fan-out][concept-derivatives].
- One caveat: [cross-chemical handler fanout][cav-cross-chemical] (resolved, kept stable as institutional memory).
- All five history pages.
- [coding style], [coding conventions], [reactivity contract], [performance contract].
- [chemistry overview], [chemistry glossary].
- [init], [voice], [desktop], [log format].

### Historical

Pages preserved as institutional memory. The bug or design they describe no longer applies, or the page has been superseded.

- [particularization prototype-loss caveat][cav-particularization]
- [short prop name instability caveat][cav-short-prop]
- [prototypal-scoping pattern][pattern-prototypal-scoping] — superseded by [lexical scoping][concept-lexical-scoping] and [derivatives and fan-out][concept-derivatives]; kept for the original framing.

### Evolving

Pages whose subject is in motion. Read with caution; surface may shift.

- This catalogue.
- [chemistry file map] — has stale source paths (cites `src/reflection.ts` and `src/chemistry/` subdirs that have moved). Flagged for a future sweep.

### Planned

Pages that exist as scaffolding for content not yet written.

- [L-2 backlog]
- [L-3 backlog]

### Temporary

- [sprint-25 alias index][aliases-sprint-25] — deletes when sprint-25 closes.

### Status not yet set

- [readme] (intentionally — describes the convention itself).

## By audience

The four readers, in order of how often they appear at the door.

### Component developer

Someone writing a `$Chemical` for the first time. They want to know what to type, what's reactive, and where the gotchas are.

1. [chemistry overview] — the metaphor and the layers, in fifteen minutes.
2. [reactivity contract] — the one-paragraph promise.
3. [`$Particle`][feat-particle], [`$Chemical`][feat-chemical] — the two base classes.
4. [`$()` callable][feat-dollar-callable] — how to mount.
5. [reactive bonds][feat-reactive-bonds] — what `$count = 0` actually does.
6. [lifecycle phases][feat-lifecycle-phases] — how `await this.next('mount')` works.
7. [render filters][feat-render-filters] — when you need `$Function$` or `$Html$`.

### Framework developer

Someone working inside `library/chemistry/src/`. They need the contracts and the semantics that aren't in the surface API.

1. [chemistry file map] — what depends on what.
2. [chemistry glossary] — every term, organized by layer.
3. [lexical scoping][concept-lexical-scoping] and [derivatives and fan-out][concept-derivatives] — the model in detail.
4. [particularization (feature)][feat-particularization] and [particularization history][hist-particularization] — the prototype-mixin design.
5. [reactivity contract], [performance contract] — what the framework guarantees.
6. [coding conventions] — Doug's source-level rules.
7. [coding style] — the naming register.
8. The active history pages — [sprint-22][hist-sprint-22], [sprint-23][hist-sprint-23] — for the rationale behind current shape.

### New contributor

Someone who has just cloned the repo and wants to understand what they're looking at.

1. [`../../CLAUDE.md`][project-claude-md] — the project's orientation file.
2. [readme] — how the wiki itself is organized.
3. [chemistry overview] — what the framework is.
4. [coding style] — the register the codebase reads in.
5. [project tracker][project-index] — where things stand now.
6. This catalogue — to find anything else.

### Doug

Project-level docs. The workshop, not the workpiece.

- [init], [voice], [desktop], [log format] — the collaboration infrastructure.
- [project tracker][project-index] — sprint state.
- [readme] — wiki conventions, when they need updating.
- This catalogue — when its taxonomy stops matching reality.

<!-- citations -->
[readme]: ./readme.md
[index]: ./index.md
[template-feature]: ./_template-feature.md
[template-caveat]: ./_template-caveat.md
[L-2 backlog]: ./_backlog-l2.md
[L-3 backlog]: ./_backlog-l3.md
[aliases-sprint-25]: ./_aliases-sprint-25.md

[chemistry overview]: ./chemistry/overview.md
[chemistry glossary]: ./chemistry/glossary.md
[chemistry file map]: ./chemistry/file-map.md
[coding conventions]: ./chemistry/coding-conventions.md
[reactivity contract]: ./chemistry/reactivity-contract.md
[performance contract]: ./chemistry/performance-contract.md
[coding style]: ./coding-style.md

[init]: ./init.md
[voice]: ./voice.md
[desktop]: ./desktop.md
[log format]: ./log-format.md

[feat-particle]: ./chemistry/features/particle.md
[feat-chemical]: ./chemistry/features/chemical.md
[feat-dollar-callable]: ./chemistry/features/dollar-callable.md
[feat-reactive-bonds]: ./chemistry/features/reactive-bonds.md
[feat-render-filters]: ./chemistry/features/render-filters.md
[feat-particularization]: ./chemistry/features/particularization.md
[feat-dollar-error]: ./chemistry/features/dollar-error.md
[feat-lifecycle-phases]: ./chemistry/features/lifecycle-phases.md

[concept-lexical-scoping]: ./chemistry/concepts/lexical-scoping.md
[concept-derivatives]: ./chemistry/concepts/derivatives-and-fan-out.md

[cav-cross-chemical]: ./chemistry/caveats/cross-chemical-handler-fanout.md
[cav-short-prop]: ./chemistry/caveats/short-prop-name-instability.md
[cav-particularization]: ./chemistry/caveats/particularization-prototype-loss.md

[pattern-prototypal-scoping]: ./chemistry/patterns/prototypal-scoping.md

[hist-sprint-22]: ./history/sprint-22-lexical-scoping.md
[hist-sprint-23]: ./history/sprint-23-audit-cleanup.md
[hist-particularization]: ./history/particularization.md
[hist-dollar-error]: ./history/dollar-error.md
[hist-i-of-t]: ./history/i-of-t.md

[project-claude-md]: ../../CLAUDE.md
[project-index]: ../project/index.md

[book-particle]: ./chemistry/books/particle/index.md
