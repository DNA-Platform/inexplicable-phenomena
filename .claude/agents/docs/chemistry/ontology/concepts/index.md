---
kind: index
title: Concepts
status: evolving
---

# Concepts

The abstractions the entities instantiate. A concept is what an entity *means* — a model that lives in the reader's head and explains why the surface looks the way it does.

| Concept | One-line summary |
|---|---|
| [state] | What a particle remembers between events. |
| [reactivity] | How property writes wake the right consumers. |
| [composition] | How chemicals contain other particles. |
| [lifecycle] | The phase ordering: setup, mount, render, layout, effect, unmount. |
| [particularization] | Wrapping a non-particle so it behaves as one. |
| [lexical scoping] | Per-mount independence via prototypal derivation. |
| [render filtering] | Cross-cutting view interception. |

Concept pages are explanation-first — no API surface required to read them. Where an existing page already covers the concept (e.g., [lexical-scoping (concept)][concept-lex]), the ontology page is a redirect.

<!-- citations -->
[state]: ./state.md
[reactivity]: ./reactivity.md
[composition]: ./composition.md
[lifecycle]: ./lifecycle.md
[particularization]: ./particularization.md
[lexical scoping]: ./lexical-scoping.md
[render filtering]: ./render-filtering.md
[concept-lex]: ../../concepts/lexical-scoping.md
