---
name: library
description: Browse an agent's library — list books with summaries, or show the chapter list of a specific book
argument-hint: "[agent] [book-slug]"
---

Browse an agent's library. Libraries live at `.claude/team/library/{agent}/`. Each agent folder contains book subdirectories. Each book has a `README.md` with frontmatter (title, author, summary) and chapters as `NN-slug.md` files.

## Modes

**No arguments** — list all agent libraries with book counts.

**One argument (`{agent}`)** — list that agent's books with title and summary from the book's README frontmatter.

**Two arguments (`{agent} {book-slug}`)** — show the book's chapter list (the table of contents) and the summary from frontmatter.

## Steps

1. **Parse $ARGUMENTS.** Split on whitespace. Zero, one, or two tokens.

2. **Zero args — all libraries.**

   List every directory under `.claude/team/library/` excluding the top-level `README.md`. For each agent, count the number of book subdirectories (directories that contain a `README.md`). Output:

   ```
   ## Libraries

   | Agent | Books |
   |-------|-------|
   | cathy | 4 |
   | arthur | 2 |
   ```

   Then: "Use `/library {agent}` to see a specific library's books."

3. **One arg — agent's books.**

   Look in `.claude/team/library/{agent}/`. For each subdirectory that contains a `README.md`, parse the frontmatter of that `README.md`. Extract `title`, `summary`, and (if present) `author`. Output:

   ```
   ## {agent}'s library

   - **{title}** (`{book-slug}`) — {summary}
   - **{title}** (`{book-slug}`) — {summary}
   ```

   End with: "Use `/library {agent} {book-slug}` to see a book's chapters."

   If the agent directory doesn't exist, say: "No library for agent `{agent}`. Known agents: {list}."

   If it exists but has no books yet, say: "Agent `{agent}` has a library but no books yet."

4. **Two args — book chapters.**

   Read `.claude/team/library/{agent}/{book-slug}/README.md`. If missing, say: "No book `{book-slug}` in {agent}'s library. Available books: {list or 'none'}."

   Parse frontmatter (title, summary, author, links). List all `.md` files in the book directory except `README.md`, sorted alphabetically (the `NN-` numeric prefix orders them). For each chapter file, parse its frontmatter for `title`. Output:

   ```
   ## {book title}
   _{summary}_

   Author: {author path}

   ### Chapters
   - {chapter title} (`{chapter-slug}`)
   - {chapter title} (`{chapter-slug}`)
   ...

   ### Cross-links
   - {agent/book-slug}
   - {agent/book-slug}
   ```

   Omit "Cross-links" if the book has no `links` field. If a chapter file lacks frontmatter `title`, use the filename slug.

## Notes

- Book slugs are the directory names (kebab-case).
- Chapter slugs are filenames without extension (e.g., `03-signals-solid.md` → slug `03-signals-solid`, title from frontmatter).
- Use `Read`, `Glob`, `Bash` (for `ls`). Read-only skill; do not modify files.

<!-- citations -->
[library]: ../../team/library/

$ARGUMENTS
