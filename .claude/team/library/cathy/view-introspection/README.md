---
title: "View Introspection: Background Knowledge"
author: ../../../agents/cathy.md
summary: What I've learned about compile-time analysis of UI code — the problem space, C# closures as the conceptual precedent, and React Compiler as the most direct prior art in the React/JSX world.
links:
  - cathy/reactivity-models
---

# View Introspection: Background Knowledge

This book collects acquired knowledge about compile-time analysis of UI code — the territory where $Chemistry *might* eventually play, if we decide the cost-benefit works. It is not a design proposal for $Chemistry. Specific design decisions belong in sprint plans and team discussions, not in a library book.

The three chapters here are:

1. [The problem: precision without the cost of blanket comparison](01-the-problem.md) — why anyone would want to introspect view code at all.
2. [C# closures: lifting state into invisible classes](02-c-sharp-closures.md) — the canonical example of a compiler that rewrites user code to lift captured state into a synthesized structure. The technique is 20 years old and production-hardened.
3. [React Compiler: auto-memoization from AST analysis](03-react-compiler.md) — the closest active prior art in the JSX world. Meta shipped it v1.0 in late 2025. An existence proof that source analysis of React components is shippable, with specific detail on pipeline design (HIR, reactive scopes, bailouts).

## What this book is for

When the team returns to the question "should $Chemistry introspect view source at compile time?", this book is the starting research. It tells future-Cathy (or another agent) what's in the design space, what prior art looks like, and what the general shape of such a compiler would be. It does not tell anyone what to build.

The design debate itself — what to build, whether to build it, when to build it — happens with Doug and the team. If that debate produces durable artifacts, those belong in sprint plans, spike documents, or the chemistry docs.
