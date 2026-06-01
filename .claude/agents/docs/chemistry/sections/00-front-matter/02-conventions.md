---
kind: catalogue-section
section: 0.2
title: Conventions
status: stable
---

# § 0.2 Conventions

## Definition

The catalogue uses a precise set of conventions: the `$` membrane denotes representation, the chemistry register names framework concepts via real-chemistry analogy, and every section page follows a fixed shape (Definition, Rules, Cases, See also).

## Rules

### The `$` membrane

The `$` means *"representation of."* It marks the boundary between intrinsic identity and extrinsic context. Five forms (full grammar in § I.2):

- `$Name` — a representation type (class).
- `$name` — a representation of a prop.
- `$name$` — a Symbol key (instance-level internal slot).
- `$$name$$` — a Symbol key (class-level internal slot).
- No `$` — the user-visible thing on the consumer side.

### The chemistry register

The naming maps to real chemistry, not decoratively but precisely. A **particle** is the smallest thing with a heartbeat (identity, behavior, lifecycle). A **chemical** is what particles become when they bond (composition, parent-child, reactive bonds). An **atom** is a formed chemical with memory. The **molecule** is the bond graph; the **reaction** is the lifecycle.

### How to read this catalogue

Each section page has these headings:

- **Definition** — what the thing is. One paragraph, normative.
- **Rules** — how the thing behaves. Bulleted, terse, exhaustive.
- **Cases** — the Lab specimens that exhibit the thing. Each case is a single line; the full specimen lives in the Lab.
- **See also** — at least two cross-links to related sections.

Some pages add **Notes** for out-of-spec context, or **Cross-links** for forward and backward references.

### Voice

The catalogue is **normative**, not tutorial. *"`$Particle` instances carry `$cid$`, `$symbol$`, `$type$`."* Not *"You'll learn about `$cid$` next."* Imagine writing for the C++ standard or the Vue API reference.

### Section numbering

Roman numerals at the top (`§ III`), dotted decimals below (`§ III.3.1`). Cite section numbers in prose to point a reader at a specific entry.

## Cases

- The five forms of `$` shown side by side.
- A section page following the canonical Definition / Rules / Cases / See also shape.
- A normative-vs-tutorial sentence pair contrasting the two voices.

## See also

- [§ 0.1 What `$Chemistry` is][s-0-1] — the framing this catalogue documents.
- [§ I.2 The `$` membrane][s-I-2] — the full grammar.
- [§ I.1 Symbols][s-I-1] — `$x$` / `$$x$$` Symbol keys.
- [readme][readme] — the wiki's filesystem and link conventions.

<!-- citations -->
[s-0-1]: ./01-what-chemistry-is.md
[s-I-2]: ../I-foundation/02-the-dollar-membrane.md
[s-I-1]: ../I-foundation/01-symbols.md
[readme]: ../../../readme.md
