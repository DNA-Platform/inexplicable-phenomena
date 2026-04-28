# `.claude/docs/` — conventions

This directory is the project's wiki. The model was chosen in [SP-2][sp-2-survey] (sprint-24): **Diátaxis-shaped taxonomy, mdBook-style filesystem, caveats as first-class linkable files.**

## Page kinds

Every page is one of these. Mixing kinds in a single file is forbidden — split the file instead.

- **`feature`** — what a piece of the system does and how to use it. Reference + brief explanation.
- **`caveat`** — a pitfall, a gotcha, or a hard-won lesson. Linkable, durable, named. Has a URL because it gets cited.
- **`concept`** — an idea or model the system is built on. Pure explanation; no API surface required.
- **`guide`** — a how-to for a specific task. Step-by-step.

Tutorials (Diátaxis sense — "learn by following along") are deferred until there's an external audience.

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
  _template-feature.md     copy this for new features / concepts / guides
  _template-caveat.md      copy this for new caveats
  _backlog-l2.md           outline of sprint-history docs to be written
  _backlog-l3.md           outline of chemistry-surface docs to be written

  chemistry/               framework docs
    overview.md, glossary.md, file-map.md, ...
    features/              one feature page per concept (L-3)
    caveats/               one caveat page per pitfall (L-3)
    concepts/              one concept page per deep idea (L-3)

  history/                 durable narratives from sprint folders (L-2)

  init.md, voice.md, ...   project infrastructure docs
```

The split between **chemistry/features**, **chemistry/caveats**, and **chemistry/concepts** is the *only* hard subdivision under `chemistry/`. Existing flat files (`overview.md`, `glossary.md`, etc.) stay where they are — they predate this skeleton and serve as the entry-tier docs above the per-concept files.

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
[sp-2-survey]: ../project/sprint-24/spikes/doc-systems-survey.md
[sp-2-source-links]: ../project/sprint-26/spikes/wiki-source-links.md
[sprint-24 plan]: ../project/sprint-24/plan.md
