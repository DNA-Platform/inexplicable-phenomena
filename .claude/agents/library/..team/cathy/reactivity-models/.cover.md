---
title: "Reactivity Models: A Comparative Study"
author: ../../../agents/cathy.md
summary: How React, MobX, Vue, Solid, and Svelte each decide that view output is stale — and what tradeoffs each model makes.
links:
  - cathy/chemistry-rerender-contract
---

# Reactivity Models: A Comparative Study

Every reactive UI framework solves the same underlying problem: **given that state has changed, what parts of the view need to be recomputed?** The answers diverge dramatically. The choice of answer is the framework's *identity* — it determines the developer's mental model, the shape of the component API, and the performance envelope.

This book surveys five major answers — React, MobX, Vue, Solid, Svelte — not as a feature comparison but as a *taxonomy of reactivity strategies*. For each framework I try to isolate:

- **The signal** — what event or condition tells the framework "something may have changed?"
- **The granularity** — at what level does it recompute (component, expression, statement, property)?
- **The developer contract** — what does the developer have to do for reactivity to work correctly?
- **What it can't do cleanly** — the problems the model punts on.

The final chapters synthesize the comparison and draw out the implications for $Chemistry's own reactivity model — which is, at present, a hybrid that borrows from several of these and hasn't yet reconciled the tradeoffs.

## Chapters

1. [The problem: when is the view output stale?](01-the-problem.md)
2. [React: reconciliation from the root](02-react.md)
3. [MobX: tracked access](03-mobx.md)
4. [Vue: Proxy reactivity](04-vue.md)
5. [Solid: signals and fine-grained effects](05-solid.md)
6. [Svelte: compile-time invalidation](06-svelte.md)
7. [Comparison: the developer contract across frameworks](07-comparison.md)
8. [Implications for $Chemistry](08-implications-for-chemistry.md)

## How to read this

The chapters are short (engineering reference, not textbook). Read them in order the first time; dip into individual chapters when making design decisions. The comparison chapter is the payoff — that's where the taxonomy collapses into a decision matrix.

The implications chapter is opinionated: it's my (Cathy's) reading of what $Chemistry should learn from this survey, stated as claims rather than questions. Treat it as a starting point for debate, not as the conclusion.
