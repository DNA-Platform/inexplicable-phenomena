# Library

A connected wiki with two layers: objective shared knowledge at the top level, and subjective team knowledge under `..team/`.

The librarian ([Libby]) curates this system. For the field guide — how books work, how links work, how knowledge grows — see [Librarianship].

## Structure

```
library/
  README.md               You are here
  {topic}/                A book (directory)
    .cover.md             Book cover — metadata, summary, table of contents
    01-{slug}.md          Chapters (ordered by numeric prefix)
    02-{slug}.md
    ...
  {catalogue-slug}/       A catalogue — a book that organizes other books
    .cover.md             Describes the subject, links to related books
  ..team/                 Subjective team libraries
    {agent}/              One agent's personal library
      README.md           Agent's library intro
      perspective/        Screenshots, DOM scrapes, visual observations
      {book-slug}/        Books authored in first person
  .archive/               Old documents kept as examples
```

## Two layers

**Objective library** (top level) — third-person, shared, normative. The source of truth. Written as if no individual wrote it.

**Subjective team libraries** (`..team/{agent}/`) — first-person notes, research, and books. Each agent writes in their own voice. Cross-references flow **inward**: team libraries link to the objective library, not the other way around. The objective library never points into an individual's space.

## Anatomy of a book

A book is a **directory**. Its contents:

| File | Purpose |
|------|---------|
| `.cover.md` | The cover. Dot-prefixed so it sorts first. Carries YAML frontmatter (title, author, summary, subject, links) and the table of contents. |
| `NN-slug.md` | Chapters. Numbered for reading order. Each has light frontmatter (title only). |

### Cover frontmatter

```yaml
---
title: Human-readable book title
author: "[Author Name](path/to/autobiography/.cover.md)"
summary: One-line summary
subject: subject-slug                    # optional — which catalogue this belongs to
links:                                   # optional — cross-references to other books
  - "[Related Book Title](path/to/other-book/)"
  - "[Another Title](path/to/another/)"
---
```

**All frontmatter links must be markdown links.** Never bare paths. The link text should be contextually appropriate:

- **`author`** — the link text is the **author's name** (not the book title). `author: "[Arthur](../..team/arthur/arthur-or-the-shape-of-everything/.cover.md)"` reads like a byline. The link goes to the autobiography.
- **`links`** — the link text is the **book title**. You're listing related books.

**Author links** point to the author's canonical autobiography. For autobiographies themselves, the author field is a **self-link** — `author: "[Arthur](.cover.md)"` — the autobiography is both the work and the author's canonical representation.

**Folder names must match titles.** The folder slug is the kebab-case address of the book. When the title changes, rename the folder and update all references. Titles and addresses must agree.

### Chapter frontmatter

```yaml
---
title: Chapter title
---
```

## Linking

Three kinds of links, each serving a different navigational purpose:

1. **Citations** — reference-style links in a `<!-- citations -->` block at the bottom of each file. These are the section's wiki links — every concept, person, or artifact mentioned gets a citation.

2. **Inline links** — standard markdown links woven into prose, pointing to other books or chapters. These are the paths you walk through the garden.

3. **Cross-references** (`links` in frontmatter) — book-level connections declared on the cover. These tell the catalogue system which books relate.

## Growth patterns

Books grow. When they outgrow their shape, they refactor:

- **Chapter → Book**: a chapter gets long enough to need its own table of contents. Extract it into a new book. Leave a summary paragraph in the original that links heavily to the new book.
- **Book → Anthology**: a book's chapters each become books. The original becomes a catalogue — its cover describes how the constituent books relate.
- **Catalogue**: a book whose purpose is to organize other books into a **subject**. It describes the relationships, reading order, and conceptual thread that connects them.

## When to write

When knowledge is non-obvious, learned the hard way, acquired from research, or likely needed in future sessions. Don't write what the code already says. Libraries capture what the code *doesn't* say.

## When to read

Before making decisions that require expertise not loaded in context. Check the library before reaching for the web.

<!-- citations -->
[Libby]: ../team/libby.md
[Librarianship]: librarianship/.cover.md
