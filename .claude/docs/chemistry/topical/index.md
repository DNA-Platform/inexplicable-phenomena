---
kind: index
title: Topical progression
status: evolving
---

# Topical progression

A reading route from "hello, particle" to the deeper machinery. Where the [ontology][ontology] is a flat map and the [epistemology][epistemology] is a confidence ledger, the topical progression is a **narrative arc** — read in order and the framework builds in your head one piece at a time.

## The arc

| Step | Topic | What you learn |
|---|---|---|
| 01 | [Hello, particle][t01] | The smallest possible chemical. |
| 02 | [Your first chemical][t02] | A `$Chemical` with state and a render. |
| 03 | [Reactive props][t03] | `$x` fields, why they wake the view. |
| 04 | [The bond constructor][t04] | The canonical surprise; mid-introduction pivot. |
| 05 | [Children and composition][t05] | JSX children as bond-ctor args. |
| 06 | [The lifecycle][t06] | Phase ordering, `next(phase)`, async. |
| 07 | [Particularization][t07] | Wrapping non-particles. |
| 08 | [Lexical scoping][t08] | Per-mount independence. |
| 09 | [Render filters][t09] | Cross-cutting view interception. |
| 10 | [The catalyst graph][t10] | Cross-chemical fan-out. |

After step 10, the [advanced][advanced] tier covers the framework-developer surface: synthesis internals, reflection, promise / await.

## Why the bond constructor lands at step 04

The bond constructor is the framework's most surprising feature ([surprising / bond-constructor][surprise-bond-ctor]). Introducing it too early (before reactive props) leaves the reader without the context to understand what fields are; introducing it too late leaves them confused about how composition works. Step 04 — after the reader has built one chemical with state — is when the bond ctor's name-based dispatch lands hardest, because the reader already knows what it would *normally* look like.

The teaching arc is therefore: **make the reader expect a normal constructor → reveal the bond constructor → teach the dispatch → cross-link to the [Lab specimen][the-lab] showing all four parameter shapes**.

<!-- citations -->
[ontology]: ../ontology/index.md
[epistemology]: ../epistemology/index.md
[t01]: ./01-hello-particle.md
[t02]: ./02-your-first-chemical.md
[t03]: ./03-reactive-props.md
[t04]: ./04-the-bond-constructor.md
[t05]: ./05-children-and-composition.md
[t06]: ./06-the-lifecycle.md
[t07]: ./07-particularization.md
[t08]: ./08-lexical-scoping.md
[t09]: ./09-render-filters.md
[t10]: ./10-the-catalyst-graph.md
[advanced]: ./advanced/index.md
[surprise-bond-ctor]: ../ontology/surprising/bond-constructor.md
[the-lab]: ../epistemology/the-lab.md
