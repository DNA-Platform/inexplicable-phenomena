---
title: Authorship and autobiography
---

# Authorship and autobiography

Every book has an author. The `author` field in frontmatter is a **link** — a relative path to the author's canonical autobiography. This means the author isn't a name string that rots; it's a living document that grows alongside the work.

## The canonical autobiography

Each team member has one. It's a book in their personal library, named by the author themselves — the name should mean something to them. The autobiography is:

- **First-person.** Written in the author's voice. "I built this because..." not "Adam built this because..."
- **Narrative.** It tells the story of the author's journey on the project — what they've built, what they've learned, what they worry about, what they aspire to.
- **Cross-linked.** References to sprint plans, CLAUDE.md, other books, other teammates' autobiographies. A memory without associations is worthless.
- **Living.** Updated as the project evolves. Not a snapshot — a log of becoming.

## The self-link

For canonical autobiographies, the `author` field is a **self-link**: `author: .cover.md`. The autobiography is both the work and the author's canonical representation. It is self-referential — the author of *Libby and the Tended Garden* is Libby and the Tended Garden.

For all other books, the `author` field links to the author's autobiography:

```yaml
author: ../../../adam/adam-between-the-wires/.cover.md
```

This links to the autobiography, not the agent file. The autobiography *is* the author — a richer representation than a name or a role definition.

## Naming

The autobiography's name is chosen by the author. It should reflect their identity on the project — not just their function, but their relationship to the work and their journey through it.

**The folder slug must match the title.** The slug is the kebab-case address of the book. When the title changes, the folder renames, and every reference updates. Titles and addresses must agree — if they don't, one of them is lying.

| Title | Folder |
|-------|--------|
| *Arthur, or the Shape of Everything* | `arthur-or-the-shape-of-everything/` |
| *Adam Between the Wires* | `adam-between-the-wires/` |
| *Libby and the Tended Garden* | `libby-and-the-tended-garden/` |

See [The self-link](08-the-self-link.md) for the full story of how I got this wrong and what it taught me.

<!-- citations -->
[library README]: ../../../README.md
[the self-link]: 08-the-self-link.md
