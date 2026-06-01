# SP-2 — Doc systems survey

**Owner:** Libby
**Status:** Done
**Date:** 2026-04-28

## Question

How do mature documentation systems organize feature / caveat / reference content into many small cross-linked files? Which model is **isomorphic to how we want to inform users of features** in `$Chemistry`?

This is *not* a GitHub-Pages choice. It's an internal organization decision: how the directory tree, frontmatter, and link style under `.claude/docs/` should be shaped so that a feature page, a caveat page, and a reference page each have an obvious home and an obvious link target.

## Method

Surveyed six systems via WebFetch + prior knowledge: the **Diátaxis framework** (the underlying theory), the **Rust mdBook** model (used by The Rust Book and many Rust tools), **Tailwind**, **React's** docs (`react.dev`), **MDN**, **Vue**, and **Stripe's** API reference. For each, the points of comparison are:

- Directory structure and file naming
- Frontmatter conventions
- Cross-link style
- Navigation aids (sidebar, index, tags, search)
- How feature description vs. caveat / pitfall content is separated

## Findings

### 1. Diátaxis framework

The conceptual backbone. Four content modes — **tutorials**, **how-to guides**, **reference**, and **explanation** — distinguished by whether the reader is *learning* vs. *doing* and *practical* vs. *theoretical*. The framework is intentionally implementation-agnostic: it tells you what *kinds* of pages you need; it does *not* tell you about file naming or frontmatter.

- **Naming / structure:** none prescribed. Most adopters create a directory per mode.
- **Frontmatter:** none prescribed.
- **Cross-link:** none prescribed.
- **Feature vs. caveat:** Diátaxis itself doesn't carve out caveats as a separate kind. Caveats fit naturally into *reference* (formal limits) or *explanation* (why a thing is the way it is).

The value of Diátaxis here: it pressures you to ask, *for each new page,* "is this teaching, doing, looking up, or understanding?" — and to refuse to mix them in one file.

### 2. mdBook (Rust Book, Cargo Book, etc.)

A very simple file-per-chapter model with a hand-curated `SUMMARY.md` that defines the entire navigation tree.

- **Structure:** flat or shallowly nested directories under `src/`. Each chapter is one `.md` file. Sub-chapters indent under their parent in `SUMMARY.md`.
- **Naming:** kebab-case file names, no enforced convention.
- **Frontmatter:** none.
- **Cross-link:** plain relative-path Markdown links, plus the rendered sidebar built from `SUMMARY.md`.
- **Feature vs. caveat:** caveats live inline; sometimes a dedicated sub-chapter ("Common pitfalls") sits next to its parent.

The strength of mdBook is that the navigation is **explicit and hand-maintained** — the `SUMMARY.md` is the authoritative table of contents. This matches the Librarian mantra: *if they can't find it, it doesn't exist.*

### 3. Tailwind CSS docs

A heavily categorized sidebar (Layout, Flexbox & Grid, Typography, …) with one page per utility class. Pages follow a strong template: short description, quick reference table, examples, then a few collapsible sections.

- **Structure:** kebab-case `/<category>/<feature>` URLs. Implementation is Next.js + MDX but the *organizational* lesson is the **strict per-feature page model**: one feature, one page, never combined.
- **Frontmatter:** YAML in MDX (title, description, sidebar group).
- **Cross-link:** category-relative links.
- **Feature vs. caveat:** caveats are inline as small "Note" or "Tip" callouts, never as a separate page.

Strength: predictable, scannable, easy to deep-link. Weakness for our use: heavily UI-flavored and tied to MDX rendering.

### 4. React docs (`react.dev`)

Two top-level branches: **Learn** (tutorials + explanation) and **Reference** (one page per API). Pages have a strong recurring section template: an `<Intro>`, a `<YouWillLearn>` list, then content. Pitfalls live inline as italicized callouts and named **Pitfall** boxes.

- **Structure:** kebab-case URLs, two-tree split (`/learn/...`, `/reference/...`).
- **Frontmatter:** custom JSX tags (`<Intro>`, `<YouWillLearn>`, `<Pitfall>`) — not portable Markdown.
- **Cross-link:** absolute paths within site, plus inline "See also" sections at the bottom.
- **Feature vs. caveat:** **the strongest "caveat as a first-class concept" model surveyed.** A `Pitfall` is a specific, named callout style. They don't live on a separate page, but they are *visually distinguished* and *consistently named*.

The lesson: caveats need to be **a recognizable kind**, not just italicized prose. Whether they're inline callouts (React's choice) or separate files (our choice) is secondary.

### 5. MDN

Single comprehensive reference page per concept. Each page has a fixed section order: **Description → Constructor → Static methods → Instance methods → Examples → Specifications → Browser compatibility → See also.**

- **Structure:** deeply hierarchical (`/Web/JavaScript/Reference/Global_Objects/Promise/all`).
- **Frontmatter:** YAML — `title`, `slug`, `tags`, `browser-compat`.
- **Cross-link:** absolute paths, breadcrumbs at top, sidebar lists siblings, "See also" at bottom.
- **Feature vs. caveat:** **Note** boxes inline (`**Note:**` prefix). Browser-compat and Specifications give a structural place for "what it doesn't do" / "what's flaky."

Strong points: the per-page section template and the explicit "See also" discipline. Weak point for our use: heavy frontmatter that only pays off if rendered to a docs site.

### 6. Vue, Stripe (briefly)

Vue follows the Tailwind / mdBook pattern: hand-curated sidebar, one page per concept, caveats as inline callout boxes.

Stripe pioneered the **two-column layout** for API reference (prose left, code right), with caveats as inline sidebars. The structure is hierarchical-resource-oriented; the *insight* for us is that **caveats can live as small sidebars adjacent to the thing they constrain**, rather than buried in prose.

## Comparison table

| System | One-page-per-concept? | Caveats split out? | Frontmatter | Index | Cross-link style |
|---|---|---|---|---|---|
| Diátaxis | yes (per mode) | sometimes (in *reference*) | none specified | none specified | none specified |
| mdBook | yes | inline / sub-chapter | none | `SUMMARY.md` | relative paths |
| Tailwind | yes | inline callouts | YAML/MDX | sidebar (auto) | relative |
| React | yes | **named `Pitfall` callouts** | JSX tags | sidebar (curated) | absolute |
| MDN | yes | inline `Note`, plus structural sections | YAML | sidebar + breadcrumbs | absolute |
| Vue | yes | inline callouts | YAML/MDX | sidebar | relative |

## Recommendation: Diátaxis-shaped, mdBook-style, with caveats as first-class files

Adopt a **hybrid**:

1. **Diátaxis as the conceptual taxonomy.** Every page is one of: *concept* (explanation), *feature* (reference / how it behaves), *guide* (how-to), *caveat* (pitfalls / lessons). Mixing is forbidden. Tutorials are out of scope until we have an external audience.

2. **mdBook-style filesystem.** Flat-ish directories under `.claude/docs/`. One `.md` file per concept / feature / caveat. No build step; Markdown reads natively in any editor and on GitHub. A hand-curated `index.md` plays the role of `SUMMARY.md`.

3. **Caveats as their own files, not just callouts.** This is the place where we deviate most from React / MDN. Reasoning: our caveats are *first-class historical artifacts* (e.g., "particularization originally replaced the prototype, lost identity, and was re-designed to insert a mixin instead"). These have URLs, are linked from features, and are durable lessons — not asides. React's "Pitfall" callouts work for inline emphasis; ours need to be linkable destinations.

4. **YAML frontmatter, lightly used.** `kind: feature | caveat | concept | guide`, `title:`, `status:`, `related:` — and that's it. Frontmatter survives the no-build-step constraint because Markdown previewers ignore it harmlessly.

5. **Markdown reference links** between docs (per CLAUDE.md). The `<!-- citations -->` block at the bottom of each file holds the link map.

6. **Lowercase kebab-case filenames** (per CLAUDE.md).

### Why this fits "isomorphic to how we want to inform users"

Component consumers, component authors, and framework developers (the three audiences from `overview.md`) need different things at different moments:

- A consumer arriving at "what does `$Chemical` do?" wants a **feature** page with examples.
- An author hitting "wait, why did `$($X)` mean two different things?" wants a **caveat** page that names the pitfall and links to the feature it constrains.
- A framework developer maintaining the codebase wants a **concept** page that explains the deeper why.

Our page kinds map onto those three audiences directly. A feature page links to its caveats; a caveat page links to the feature it haunts; both link up to the concept they share.

### Why **not** Tailwind / Stripe / MDN's heavier models

- We have no docs site (yet). MDX frontmatter and JSX callouts pay off only when rendered. Plain Markdown wins on read-anywhere portability — including inside Claude Code itself, which is the primary reader for the foreseeable future.
- We don't need browser-compat tables, deprecation matrices, or two-column code panes. These belong to public, versioned API references, not internal organization systems.

### Decisions locked

- **Page kinds:** `feature`, `caveat`, `concept`, `guide`. (Tutorial deferred.)
- **Frontmatter:** YAML with `kind`, `title`, `status`, `related`.
- **Cross-link:** Markdown reference links via the `<!-- citations -->` block at the bottom of each file.
- **Filenames:** lowercase, kebab-case, `.md`.
- **Index:** `docs/index.md` is the hand-curated wiki entry, mdBook-style.
- **Templates:** `_template-feature.md`, `_template-caveat.md` at the root of `docs/`. Concept and guide pages use light variants of the same shape.

## Output

This document. Story L-1 builds the skeleton from these decisions.

<!-- citations -->
[diátaxis]: https://diataxis.fr/
[mdbook]: https://rust-lang.github.io/mdBook/format/summary.html
[react-docs]: https://react.dev/learn
[tailwind-docs]: https://tailwindcss.com/docs/installation
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[vue-docs]: https://vuejs.org/guide/introduction.html
[stripe-api]: https://docs.stripe.com/api
[overview]: ../../../docs/chemistry/overview.md
