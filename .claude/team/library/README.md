# Library

Each agent keeps a library — a persistent, cross-linked knowledge base they use across sessions. Libraries grow. Agents are expected to read from and write to their own libraries whenever they acquire knowledge worth preserving.

Agents consult libraries at the intersection of **their roles** and **the specific needs of the code they maintain**. The librarian role ([Libby]) exists to curate and evolve this system.

## Structure

```
.claude/team/library/
  {agent-name}/              — one agent's library
    README.md                — agent's library intro
    {book-slug}/             — a book (directory)
      README.md              — book frontmatter + introduction
      01-{chapter-slug}.md   — chapters (ordered by numeric prefix)
      02-{chapter-slug}.md
      ...
```

Each agent **authors** the books in their own library. Authorship is recorded in the book's frontmatter as a link to the agent's file at `.claude/team/agents/{agent}.md`.

## Book frontmatter

The book's `README.md` carries the frontmatter:

```markdown
---
title: Human-readable book title
author: ../../../agents/{agent}.md
summary: One-line summary (shown in the library index)
links:                    # Optional: cross-references to other books
  - {agent}/{book-slug}
  - {agent}/{book-slug}
---

# {Title}

Opening paragraph. What this book is about, why it exists, who should read it.

## Chapters

1. [Chapter one title](01-chapter-slug.md)
2. [Chapter two title](02-chapter-slug.md)
...
```

## Chapter frontmatter

Each chapter file has lighter frontmatter — just the title, since the rest lives on the book:

```markdown
---
title: Chapter title
---

# {Chapter title}

Chapter body. May have H2 sections for sub-topics.
```

## Skill

Use `/library` to browse:

- `/library` — list all agent libraries with book counts
- `/library {agent}` — list books in that agent's library with titles and summaries
- `/library {agent} {book-slug}` — show a book's chapter list (its table of contents)

## When to write

When knowledge is:
- Non-obvious, learned the hard way, or acquired from external research
- Relevant to your role's responsibilities
- Likely to be needed in future sessions
- Wide enough to warrant its own document (not a one-liner)

Don't write a book for things the codebase already answers. Libraries capture what the code *doesn't* say — prior art, trade-off analyses, cross-framework comparisons, historical context, mental models.

## When to read

Whenever a decision requires expertise you don't clearly have loaded in context. Before making framework-level or architecture-level calls, check your library.

<!-- citations -->
[Libby]: ../agents/libby.md
