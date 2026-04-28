# Project documentation

The wiki. Every durable piece of knowledge about this project lives under `.claude/docs/` as a small, cross-linked Markdown file.

**If you don't know where to look, start with the [catalogue].** It groups every page by subject, kind, status, and audience — curated, not auto-generated. The rest of this index is a flat directory for when you already know what you want.

## How this is organized

Pages have a **kind**, declared in YAML frontmatter:

| Kind | Purpose | Template |
|---|---|---|
| `feature` | What a piece of the system does and how to use it | [_template-feature] |
| `caveat` | A pitfall, gotcha, or hard-won lesson | [_template-caveat] |
| `concept` | An idea or model the system is built on | (use feature template, set kind: concept) |
| `guide` | A how-to for a specific task | (use feature template, set kind: guide) |

Each file is small. If it's growing past a few screens, split it. If two pages keep linking to each other, look for a third concept they're both expressing — and write *that* page.

See the [readme] for full conventions, or the [SP-2 survey] for the reasoning behind the model.

## Index

### Chemistry framework

The framework that lives in `library/chemistry/`. Internal organization is layer-based; the docs entry points are:

- [chemistry overview] — what `$Chemistry` is, why it exists, the layered architecture
- [chemistry glossary] — every term, organized by layer
- [chemistry file map] — every source file, what depends on what
- [coding conventions], [reactivity contract], [performance contract]

#### Features (per concept)

- [`$Particle`][feat-particle] — the leaf renderable
- [`$Chemical`][feat-chemical] — the container renderable
- [`$()` callable][feat-dollar-callable] — instance form, class form, dispatch surface
- [Reactive bonds][feat-reactive-bonds] — how property writes wake the right derivatives (accessors-on-instance per SP-1)
- [Render filters][feat-render-filters] — `$Function$`, `$Html$`, passthrough patterns
- [Particularization][feat-particularization] — making any object renderable
- [`$Error`][feat-dollar-error] — renderable errors
- [Lifecycle phases][feat-lifecycle-phases] — `next(phase)` and async ctors

Concept pages:

- [Lexical scoping][concept-lexical-scoping] — multi-site rendering of a single instance
- [Derivatives and fan-out][concept-derivatives] — `$derivatives$` registry, parent-write propagation

#### Caveats

- [Cross-chemical handler fanout][cav-cross-chemical] — write from one chemical's event handler to another's reactive prop didn't repaint lifted DOM. Fixed in sprint 24.
- [Short prop name instability][cav-short-prop] — historical. `$v`, `$x`, `$y` were silently inert. Resolved in sprint 24.
- [Particularization prototype-loss][cav-particularization] — historical. Original `setPrototypeOf` design broke `instanceof Error`. Resolved by mixin insertion in sprint 22.

### Project infrastructure

- [coding style] — how identifiers are chosen across the project (chemistry register, `$` membrane, `$$x$$` symbol pattern, brevity, mood, `_` privacy)
- [init] — project initialization
- [voice] — voice-mode collaboration
- [desktop] — Claude Desktop integration
- [log format] — log protocol shared with the relay

### Sprint history

Sprint folders under `.claude/project/sprint-N/` are the source of truth for process; durable narrative summaries live in `.claude/docs/history/`:

- [Sprint 22 — Lexical Scoping & The Beautiful API][hist-sprint-22]
- [Sprint 23 — Audit Cleanup][hist-sprint-23]
- [Particularization — the prototype-mixin design][hist-particularization]
- [`$Error` — making errors renderable][hist-dollar-error]
- [`I<T>` — the identity-shaped type][hist-i-of-t]

## Contributing

Pages live under `.claude/docs/`. Lowercase kebab-case filenames. Markdown reference links between pages (citations block at the bottom of each file). Templates exist for the two most common kinds.

If you can't find what you're looking for, the page hasn't been written. Add it.

<!-- citations -->
[catalogue]: ./catalogue.md
[readme]: ./readme.md
[SP-2 survey]: ../project/sprint-24/spikes/doc-systems-survey.md
[SP-22 plan]: ../project/sprint-22/plan.md
[sprint-24 plan]: ../project/sprint-24/plan.md
[L-2 outline]: ./_backlog-l2.md
[L-3 outline]: ./_backlog-l3.md
[_template-feature]: ./_template-feature.md
[_template-caveat]: ./_template-caveat.md
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
[hist-sprint-22]: ./history/sprint-22-lexical-scoping.md
[hist-sprint-23]: ./history/sprint-23-audit-cleanup.md
[hist-particularization]: ./history/particularization.md
[hist-dollar-error]: ./history/dollar-error.md
[hist-i-of-t]: ./history/i-of-t.md
