# `.claude/docs/` — conventions

This directory is the project's wiki. **The primary structure is the [`$Chemistry` Reference Catalogue][catalogue]** — a Roman-numeral hierarchy modeled on Vue's API Reference (granular, hierarchical, semantic grouping) with Rust Reference's normative voice. The catalogue is the framework's source of truth.

The full pages of the catalogue live under `chemistry/sections/`, one file per section, organized by Roman-numeral directory (`00-front-matter/`, `I-foundation/`, `II-primitives/`, …, `XVI-why-chemistry/`). Each page follows a fixed shape: **Definition / Rules / Cases / See also**, with optional Notes. The voice is normative-reference, not tutorial.

The older taxonomies (ontology / epistemology / topical / features / concepts / caveats) remain as **alternate views**. They exist to support cross-axis lookup but are no longer the primary navigation.

## Page kinds

Every page is one of these. Mixing kinds in a single file is forbidden — split the file instead.

- **`catalogue-section`** — a numbered entry in the `$Chemistry` Reference Catalogue. Lives under `chemistry/sections/`. Definition / Rules / Cases / See also. **Normative voice.**
- **`feature`** — what a piece of the system does and how to use it. Reference + brief explanation. (Most existing feature pages are now alternate-view companions to a catalogue section.)
- **`caveat`** — a pitfall, a gotcha, or a hard-won lesson. Linkable, durable, named. Has a URL because it gets cited.
- **`concept`** — an idea or model the system is built on. Pure explanation; no API surface required.
- **`guide`** — a how-to for a specific task. Step-by-step.

Tutorials (Diátaxis sense — "learn by following along") are deferred until there's an external audience.

## Catalogue voice

A catalogue-section page is **normative**, not tutorial. *"`$Particle` instances carry `$cid$`, `$symbol$`, `$type$`."* Not *"You'll learn about `$cid$` next."* Imagine writing for the C++ standard or the Vue API reference.

Cross-link sections in prose by their number: `§ III.3`, `§ VI.1`. Use reference-link form for the actual URL in the citations block.

## Frontmatter

YAML at the top of every file:

```yaml
---
kind: feature        # feature | caveat | concept | guide
title: $Particle     # human-facing title
status: stable       # stable | evolving | deprecated | planned
related:             # other docs pages, by reference-link key
  - $chemical
  - reactive-bonds
---
```

Frontmatter is **lightly used.** Don't add fields that aren't load-bearing. Markdown previewers and Claude Code both ignore unknown YAML harmlessly, but every field on every page is one more thing to maintain in sync.

## File naming

- Lowercase, kebab-case.
- `.md` extension.
- Filename ≈ slug. `particle.md`, `lexical-scoping.md`, `particularization-replaced-prototype.md`.
- Template files start with `_`: `_template-feature.md`, `_template-caveat.md`.
- Backlog stubs start with `_backlog-`: `_backlog-l2.md`, `_backlog-l3.md`.

## Cross-linking

Markdown **reference links**. Define them in a `<!-- citations -->` block at the bottom of each file:

```markdown
See the [glossary] and the [particularization caveat].

<!-- citations -->
[glossary]: ./chemistry/glossary.md
[particularization caveat]: ./chemistry/caveats/particularization-prototype-loss.md
```

This keeps prose readable and link maintenance localized to one block per file.

### Source links

Wiki pages can link directly into source files. A reader on a feature page should be able to follow a link straight into the function being described — the brain extends from page-to-page connections to page-to-code connections.

**Convention:** reference link with a GitHub-style `#L<line>` anchor where the line is meaningful.

```markdown
The bond is forged at [`$Bond.form()`][bond-form].

<!-- citations -->
[bond-form]: ../../../library/chemistry/src/abstraction/bond.ts#L120
```

Previewer behavior (verified in [SP-2][sp-2-source-links], sprint-26):

- **GitHub web** — honors `#L<line>` fully; clicking jumps to / highlights the line.
- **VS Code preview** — opens the file but **ignores the line anchor**. Graceful fallback to file-level navigation.
- **Claude Code (CommonMark)** — renders the link; Claude parses `#L<line>` as a hint and passes `offset` to `Read`.

**When to use which form:**

- **Reference link with `#L<n>`** — default for any prose citation that points at a function, method, or definition. Keeps prose readable; centralizes maintenance in the `<!-- citations -->` block.
- **Inline link** — one-shot citations like footer "Source:" lines where the link text and path tell the whole story. If the same path appears more than once, promote it to a reference.
- **Plain path, no anchor** — when the whole file is relevant (index page, single-file module). No fragile line numbers to maintain.

**Drift mitigation.** Line numbers shift under refactor. Three habits:

1. Write the link text as the function name (`[$Bond.form()][bond-form]`) — reader intent survives stale anchors.
2. Prefer file-level links for stable surfaces (class declarations, exports, top-of-module banners).
3. On rename, sweep the wiki for citations to the old name (sprint-25 alias-index pattern, applied to source).

## Directory layout

```
.claude/docs/
  index.md                 wiki entry — read this first
  readme.md                this file — conventions
  catalogue.md             the $Chemistry Reference Catalogue (the primary index)
  _template-feature.md     copy this for new features / concepts / guides
  _template-caveat.md      copy this for new caveats
  _backlog-l2.md           outline of sprint-history docs to be written
  _backlog-l3.md           outline of chemistry-surface docs to be written

  chemistry/               framework docs
    overview.md, glossary.md, file-map.md, ...

    sections/              THE CATALOGUE — primary structure
      00-front-matter/      § 0 — what, conventions, dual constructor
      I-foundation/         § I — symbols, $ membrane, types
      II-primitives/        § II — $Particle and its surface
      III-composition/      § III — $Chemical, binding constructor
      IV-integration/       § IV — $Atom
      V-reactivity/         § V — reactive properties, scope, diffuse
      VI-lexical-scoping/   § VI — derivatives, registry, ownership gate
      VII-particularization/ § VII — pattern, instanceof, I<T>
      VIII-synthesis/       § VIII — synthesis, reactants, parsing
      IX-reflection/        § IX — $Reflection, isReactive, isSpecial
      X-lifecycle-internals/ § X — phase queue, resolve, render loop
      XI-cross-cutting/     § XI — promise, await, symbolize
      XII-errors/           § XII — check, validation, error gallery
      XIII-caveats/         § XIII — resolved historical bugs
      XIV-provisional/      § XIV — observed-but-not-confirmed behaviors
      XV-implementation/    § XV — module-by-module orient
      XVI-why-chemistry/    § XVI — capstone

    ontology/              ALTERNATE VIEW: what $Chemistry IS
      entities/             $Particle, $Chemical, $Atom, $Bond, ...
      relationships/        the structural connections
      concepts/             abstractions the entities instantiate
      surprising/           corners that demand explicit teaching

    epistemology/          ALTERNATE VIEW: how we KNOW it works
      the-lab.md            the $Chemistry Lab
      the-test-suite.md     the regression harness
      caveats/              negative epistemology
      open-questions/       unresolved uncertainties

    topical/               ALTERNATE VIEW: a narrative arc
      01-hello-particle.md … 10-the-catalyst-graph.md
      advanced/

    features/, concepts/, caveats/, patterns/
                            ALTERNATE VIEW: per-page references
                            Now: secondary; new content lands in sections/
    books/                 per-class deep-dive directories
                            $Particle book is a *complementary* long-form reading

  history/                 durable narratives from sprint folders (L-2)

  init.md, voice.md, ...   project infrastructure docs
```

### The catalogue as primary structure

The `$Chemistry` Reference Catalogue at `catalogue.md` indexes every section. Each section page lives at `chemistry/sections/{roman}-{name}/{NN}-{slug}.md`.

A new entry on a framework concept lands in the catalogue first. If the concept also benefits from an alternate-view treatment (a tutorial-shaped narrative, a long-form per-class book), that companion lives under `topical/`, `ontology/`, `books/`, etc., and cross-links back to the catalogue section.

### The three alternate-view axes

The older organization remains useful for cross-axis lookup:

- **[ontology][ontology-axis]** — what `$Chemistry` *is*. Static, flat, indexed.
- **[epistemology][epistemology-axis]** — how we *know* it works.
- **[topical][topical-axis]** — a narrative arc.

Existing flat files (`overview.md`, `glossary.md`, `file-map.md`) stay where they are; they serve as long-form companions above the catalogue.

### Migrating existing content

Existing feature / concept / caveat pages that map cleanly to a catalogue section will, over the prose-writing sprints, gradually be folded into their catalogue homes. The originals remain as redirects with a single line pointing at the new home. The `$Particle` book (`chemistry/books/particle/`) stays as a *complementary* long-form reading; it is not the catalogue.

## How feature and caveat pages relate

A feature page describes how something works. A caveat page describes a way it can go wrong, a historical bug, or a hard-won lesson. They cross-link both ways:

```
features/particularization.md
   └─→ related: [particularization-prototype-loss]

caveats/particularization-prototype-loss.md
   └─→ related: [particularization]
```

When a feature changes (e.g., reactive bonds move from prototype to instance per [sprint-24 Track A][sprint-24 plan]), the feature page updates, and a *new* caveat page captures the historical "why it used to be that way." The old design is *named* and *linked*, not deleted.

## What this is not

- Not a public docs site. No build step, no MDX, no rendering pipeline. Plain Markdown read in any editor or by Claude Code.
- Not a blog or changelog. Sprint folders capture per-sprint discussion; this directory captures *durable* knowledge distilled from those sprints.
- Not exhaustive auto-generated reference. Hand-written, hand-curated, hand-organized.

<!-- citations -->
[catalogue]: ./catalogue.md
[sp-2-survey]: ../project/sprint-24/spikes/doc-systems-survey.md
[sp-2-source-links]: ../project/sprint-26/spikes/wiki-source-links.md
[sprint-24 plan]: ../project/sprint-24/plan.md
[ontology-axis]: ./chemistry/ontology/index.md
[epistemology-axis]: ./chemistry/epistemology/index.md
[topical-axis]: ./chemistry/topical/index.md
