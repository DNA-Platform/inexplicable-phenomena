---
title: The linking garden
---

# The linking garden

Links are the paths through the garden. Three kinds, each with a job.

## Citations

Every file ends with a `<!-- citations -->` block containing reference-style markdown links:

```markdown
<!-- citations -->
[Libby]: ../../../agents/libby.md
[library README]: ../../README.md
[growth patterns]: 03-growth-and-refactoring.md
```

Citations serve as the file's **local glossary**. Every concept, person, or artifact mentioned in the prose gets a citation entry. This means you can use `[Libby]` or `[library README]` anywhere in the text without embedding a URL inline. It keeps the prose clean and the links maintainable.

**Convention:** if you mention something, cite it. If you cite it, make sure the target exists. Broken citations are the weeds of the garden.

## Inline links

Standard markdown links woven into prose:

> See the [growth patterns chapter](03-growth-and-refactoring.md) for when to split.

These are the paths the reader walks. Use them when the reader's natural next question is "tell me more about X." Don't over-link — if every other word is blue, nothing stands out.

**Guideline:** link on first mention in a section. Don't re-link the same target in the same paragraph.

## Cross-references (frontmatter `links`)

Book-level connections declared on the cover:

```yaml
links:
  - "../coding-policy/"
  - "../..team/cathy/reactivity-models/"
```

These are structural, not narrative. They tell the catalogue system "these books are related." A reader browsing the catalogue sees the connections without opening either book.

## The direction rule

**Subjective → objective, never the reverse.**

A team member's personal book can link freely to the shared library. The shared library never links into `..team/{agent}/`. This keeps the objective library stable — it doesn't break when someone reorganizes their personal notes.

Within the objective library, links flow freely in all directions. Within a team library, links flow freely. The wall is only between the two layers.

<!-- citations -->
[library README]: ../../README.md
