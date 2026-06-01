---
kind: index
title: Epistemology of $Chemistry
status: evolving
---

# Epistemology of $Chemistry

How we *know* `$Chemistry` works. Where the [ontology][ontology] is the spine of what *is*, the epistemology is the spine of what we have *verified*. The framework's behavior is not knowable by reading source; it must be confirmed.

Three confirmation surfaces, each with a different epistemic role:

| Surface | What it confirms | Where it lives |
|---|---|---|
| [The Lab][the-lab] | Interactive truths — surfaces the reader can poke and watch. | `library/chemistry/app/` (yet to be built) |
| [The test suite][the-test-suite] | Invariants — assertions that pin behavior across changes. | `library/chemistry/tests/` (428 tests) |
| [Caveats][caveats] | Negative epistemology — things we *thought* worked and didn't. | [`caveats/`][caveats] |
| [Open questions][open-questions] | Things we don't yet know. | [`open-questions/`][open-questions] |

The Lab and the test suite are *positive* epistemology: they assert truth. Caveats are *negative*: they document past misconceptions. Open questions are *unresolved*: they list what's unknown.

A claim about `$Chemistry`'s behavior is only as strong as the surface that confirms it. A behavior with no Lab specimen, no unit test, and no caveat is *speculation* — read source carefully before relying on it.

<!-- citations -->
[ontology]: ../ontology/index.md
[the-lab]: ./the-lab.md
[the-test-suite]: ./the-test-suite.md
[caveats]: ./caveats/index.md
[open-questions]: ./open-questions/index.md
