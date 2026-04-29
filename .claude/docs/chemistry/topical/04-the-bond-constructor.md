---
kind: stub
title: 04 — The bond constructor
status: planned
---

# 04 — The bond constructor

The canonical surprise. By this point the reader has built a `$Chemical` with reactive state; they're ready to compose. They expect a normal `constructor`. The framework offers something else.

**The teaching arc:**

1. **Set up the expectation.** A reader writes a `$Cookbook` with children and tries `constructor(title, ...recipes)`. It doesn't work the way they expect.
2. **Reveal the surprise.** The constructor must be named after the class — `$Cookbook(title, ...recipes)`.
3. **Explain the dispatch.** Show how the framework finds the method by name, parses its parameter shape, and routes JSX children.
4. **Show the four parameter shapes** — positional, spread, array, scalar.
5. **Cross-link to the Lab specimen** that demonstrates all four side by side.

**To be written.** This page is one of the **load-bearing** topical pages — the surprise demands real prose. The current substantive treatment is in [surprising / bond-constructor][surprise-bond-ctor]; the topical page should adopt the teaching arc above and reuse the example syntax from there.

<!-- citations -->
[surprise-bond-ctor]: ../ontology/surprising/bond-constructor.md
