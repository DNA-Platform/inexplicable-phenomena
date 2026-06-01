---
kind: catalogue-section
section: XVI
title: Why $Chemistry
status: stable
---

# § XVI Why `$Chemistry`

## Definition

The capstone. `$Chemistry` re-states the bet against *The Good Parts* in concrete terms: prototype delegation over class instantiation, constructor return as a design pattern, symbols as a grammatical system, OOP and FP as complements rather than rivals. The framework's value emerges where these are taken seriously together.

## The four-question pitch

- **What is `$Chemistry`?** An object-oriented component framework on top of React. Components are real objects; rendering is a method; identity is intrinsic.
- **Why does it exist?** Because React conflates the answer to *what does this component own?* with *what children did it receive?*. `$Chemistry` separates them into two constructors (§ III.2 / § III.3), making one component fundamentally bigger than a React component.
- **What is its relationship to React?** `$Chemistry` is a layer *on top of* React. React reconciles the DOM; `$Chemistry` reconciles the objects.
- **When should I reach for it?** When component identity matters more than functional purity. When the same instance must appear at multiple JSX sites with independent state (§ VI.1). When children must be typed and validated (§ III.3 / § III.4).

## The bet, restated

JavaScript's lineage — Self's prototypes, Scheme's closures, Java's syntax — gives the language capabilities that neither the OOP camp nor the FP camp takes seriously. `Object.create()` is not `new`. A constructor returning a different object is not a bug. `$Chemistry` builds on these capabilities.

## See also

- [§ 0.1 What `$Chemistry` is][s-0-1] — closes the loop.
- [§ III.3 The binding constructor][s-III-3] — the load-bearing surprising feature.
- [§ VI.1 Per-mount derivatives][s-VI-1] — the load-bearing scoping feature.
- [§ VII.1 The pattern][s-VII-1] — the load-bearing identity feature.

<!-- citations -->
[s-0-1]: ../00-front-matter/01-what-chemistry-is.md
[s-III-3]: ../III-composition/03-binding-constructor.md
[s-VI-1]: ../VI-lexical-scoping/01-per-mount-derivatives.md
[s-VII-1]: ../VII-particularization/01-the-pattern.md
