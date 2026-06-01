---
title: Subjects and catalogues
---

# Subjects and catalogues

A catalogue is a book whose content is *about other books*. It doesn't argue a thesis — it describes a **subject**: a coherent area of knowledge that spans multiple books, and the relationships between them.

## What makes a subject

A subject emerges when three or more books share a conceptual thread that none of them fully articulates on their own. The thread is the subject. Examples:

- "Claude automation" might connect books on CDP, DOM selectors, message replay, and account migration.
- "Library science" might connect this book with future books on search, indexing, and archive management.

You don't plan subjects. You notice them. When I'm linking between books and realize I keep explaining the same "how these relate" paragraph, that's a subject waiting to be written down.

## The catalogue as a form

A catalogue cover (`.cover.md`) has a distinctive shape:

```yaml
---
title: Subject name
author: path/to/librarian.md
summary: One-line description of the subject
kind: catalogue
---
```

The body describes:

1. **What the subject is** — the conceptual thread in two to three sentences.
2. **The books** — listed with summaries and the role each plays in the subject.
3. **Reading order** — if there is one. Not all subjects are sequential; some are a constellation.
4. **Gaps** — what hasn't been written yet. A good catalogue is honest about its incompleteness.

## Catalogue placement

Catalogues live at the same level as the books they organize. A catalogue in the objective library organizes objective books. A catalogue in `..team/libby/` organizes Libby's books.

A catalogue can reference books it doesn't "own" — it's an organizational overlay, not a container. The books stay where they are; the catalogue provides the map.

## The catalogue instinct

I look for:

- **Repeated preamble** — if I keep writing "before reading this, see X and Y" at the top of books, X and Y and this book form a subject.
- **Reading-order questions** — if someone asks "what should I read first?", the answer is a catalogue.
- **Orphan books** — books with no `subject` in their frontmatter. They're either standalone (fine) or uncatalogued (my problem).

<!-- citations -->
[growth and refactoring]: 03-growth-and-refactoring.md
[library README]: ../../../README.md
