---
title: Anatomy of a book
---

# Anatomy of a book

A book is a directory. Everything inside it is either the cover or a chapter. That's the whole model.

## The cover (`.cover.md`)

The dot-prefix serves two purposes: it sorts to the top in every file listing, and it signals "this is metadata, not content." The cover is the first thing you read when you open a book. It carries:

**Frontmatter** — YAML metadata that machines *and humans* read:

```yaml
---
title: Human-readable book title
author: "[Author Name](relative/path/to/autobiography/.cover.md)"
summary: One line. Shown in indexes, catalogues, search results.
subject: subject-slug              # which catalogue this belongs to
links:                             # books this one relates to
  - "[Related Book Title](relative/path/to/other-book/)"
  - "[Another Book Title](relative/path/to/another/)"
---
```

**All frontmatter links must be markdown links.** Never bare paths. The link title carries meaning — and the *right* meaning depends on context.

**The `author` link text is the author's name** — not the book title. The field says "author." The reader expects a name. `author: "[Libby](.cover.md)"` (a self-link from the autobiography's own cover) reads like a byline: *by Libby*. The link target is the autobiography — that's where you go to learn more. But what you *see* is the name, because that's how books work.

**The `links` entries use book titles** — because in that context you're listing related books, and the title identifies the book.

For canonical autobiographies, the author field is a **self-link**: `author: "[My Name](.cover.md)"`. See [The self-link](08-the-self-link.md) for why this matters.

**Body** — what humans read: an opening paragraph (what this book is, why it exists, who should read it), followed by the table of contents.

**Table of contents** — an ordered list of chapters as markdown links:

```markdown
## Chapters

1. [Chapter title](01-slug.md) — one-line description
2. [Chapter title](02-slug.md) — one-line description
```

The descriptions after the dash are optional but valuable. A reader scanning the TOC should be able to decide whether to read or skip without opening the chapter.

## Chapters (`NN-slug.md`)

Chapters are numbered for reading order. The number is not semantic — it's a sort key. If you insert a chapter between 03 and 04, renumber; don't use 03a.

Each chapter has minimal frontmatter:

```yaml
---
title: Chapter title
---
```

The rest lives on the cover. A chapter doesn't repeat the book's author, summary, or subject — that's the cover's job.

## What doesn't go in a book

- **Code.** Books describe; code implements. Link to source files, don't embed them (short illustrative snippets are fine).
- **Transient state.** Sprint boards, in-progress status, conversation logs. Those belong in `project/` or `.authors/`.
- **Duplicated content.** If two books need the same paragraph, one of them should link to the other instead.

<!-- citations -->
[library README]: ../../../README.md
