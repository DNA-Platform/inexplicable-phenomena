---
title: Academic papers as books
---

# Academic papers as books

A published academic paper can be turned into a book in the library — a reading companion that makes the paper navigable, findable, and connected to what the reader cares about. The PDF remains the authoritative source. The book wraps around it.

This convention was developed during the dna-library project while building the first paper book: Digital Twins of Visual Cortex (Cobos et al. 2022). The original book lives in [dna-library's neuroscience library](../../../../../../dna-library/library/neuroscience/digital-twins-tolias-2022/.cover.md). The convention itself is universal — any paper in any project can become a book using this format.

## Principles

**The book is the reading.** Writing the book *is* how you read the paper carefully. The chapters are the byproduct of having read, not a post-hoc summary.

**Reader-first.** The reader is someone learning, not someone reviewing. Every section needs: (1) a plain-language synthesis, (2) the paper's own words as direct quotes, (3) contextual links that help bridge gaps in background knowledge.

**Provenance is non-negotiable.** Every substantive claim carries a source tag:
- `[source: paper, p.X]` — directly from the paper
- `[source: paper, Fig N caption]` — from a figure caption
- `[source: web, URL]` — from an external source
- `[source: interpretation]` — our reading, not the paper's claim

**Figures are first-class chapters.** Each figure gets its own chapter using the resource pattern: `NN-figure-name.md` alongside `NN-figure-name.png`. The figure chapter contains the image, the full quoted caption, and an explanation of what you're looking at panel by panel. Text chapters link to figure chapters with inline links.

## Folder structure

```
paper-slug/
  .cover.md                         Title links to PDF. Author, summary, full TOC with synopses
  paper-filename.pdf                The artifact — untouched
  01-the-authors.md                 Who wrote this and where they work
  02-what-this-paper-claims.md      Abstract in plain language + direct quote + key terms
  03-topic-name.md                  Introduction section, descriptively named
  04-topic-name.md                  Methods section, descriptively named
  05-topic-name.md                  Results section, descriptively named
  06-topic-name.md                  Discussion section, descriptively named
  07-the-citation-network.md        All references with DOI/web links, grouped by topic
  08-figN-descriptive-name.md       Figure chapter (resource pattern)
  08-figN-descriptive-name.png      Figure resource (page crop from PDF with caption)
  ...more figures...
  15-deep-dive-topic.md             Optional: technical explanations linked from text chapters
```

## Cover conventions

The cover title is a markdown link to the PDF:

```yaml
title: "[Paper Title](paper-filename.pdf)"
```

Additional frontmatter for paper books:

```yaml
year: 2022
journal: bioRxiv (preprint)
doi: 10.1101/...
paper-authors: First Author, ..., Last Author
```

The TOC uses descriptive chapter names with synopses — not "Abstract" and "Methods" but names that tell the reader what each section is about. Synopses should be specific enough that a reader can decide whether to open the chapter.

## Figure extraction

Figures are extracted as page crops from the PDF using PyMuPDF (fitz), rendered at 3× zoom. Page crops include the caption text — the reader sees exactly what appears in the paper. The extraction script lives in `library/neuroscience/scripts/`.

## Chapter naming

Don't use the paper's section names as chapter titles. "Methods" tells the reader nothing. "How they built the digital twin" tells them everything. The chapter name should answer: "what will I learn if I read this?"

## Navigation

- The book link at the top of each chapter: `[Book: [Title](.cover.md)]`
- Previous/Next links at the **bottom** of each chapter, after a horizontal rule
- Figure chapters link back to the text chapters that reference them
- Text chapters link forward to figure chapters with inline resource links

## Deep-dive chapters

When a text chapter references a concept that needs more explanation than a parenthetical (e.g., "convolutional neural networks," "two-photon calcium imaging"), create a deep-dive chapter. Number it after the figures (15+). Link to it from the relevant paragraph in the text chapter. State the provenance at the top: where does this explanation come from?

## What comes next

- [ ] Build a scaffolding script: given a PDF, extract figures, create stub cover and chapter files
- [ ] Evolve the validator to check paper-book-specific conventions (figure resource pairs, provenance tags)
- [ ] Document the process for downloading a cited paper and bootstrapping its book

<!-- citations -->
[digital-twins]: ../../../../../../dna-library/library/neuroscience/digital-twins-tolias-2022/.cover.md
