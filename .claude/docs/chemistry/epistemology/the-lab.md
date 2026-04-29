---
kind: concept
title: The $Chemistry Lab
status: evolving
---

# The `$Chemistry` Lab

Formal name: **`$Chemistry` Lab**. Casual: **the Lab**. The Lab is the framework's interactive proving ground — a running app where every claim about behavior can be confirmed by hand.

The Lab is to `$Chemistry` what a chemistry bench is to a real chemist: a place where the elements are at hand, the apparatus is at hand, and a hypothesis can be tried in seconds. Until a behavior is confirmed in the Lab, the framework's behavior on that point is *not known*. Source-reading is not confirmation; assertion-writing is not confirmation; only running the framework against a deliberate specimen and watching the result is confirmation.

## What the Lab is

A web app at `library/chemistry/app/` (yet to be built; sprint-28 is the foundation). Each section of the app is a **specimen** — a small running example pinned to a particular feature, relationship, or surprise. A specimen has three panels:

- **Demo** — the running chemical. Click the buttons. Watch the output.
- **Source** — the actual file the demo runs, loaded via Vite `?raw` import. The source you read is the source that runs.
- **Test note** — what to look for. Visual pass/fail prose. Optionally, a link to the unit test that pins the same behavior.

A reader exploring the Lab does not need to read source first; they can see the running framework, observe the behavior, and read the source if they want to know *why*. Specimens are organized along the [ontology][ontology] axes: by entity, by surprise, by topic.

## Why the Lab is epistemology, not documentation

A document describing how `$lift` works can be wrong. A unit test asserting that `$lift` returns a derivative can be brittle and fail to capture the user-facing effect. A specimen running `<Counter />` twice on the same page, where the reader clicks one and watches the other not change, is a *demonstration* — the kind of confirmation that survives codebase drift, that a framework developer can perform fresh, and that bears witness for itself.

The Lab is therefore not a *user guide* (Diátaxis tutorial) and not a *test runner* (CI surface). It is a third thing: an exhibit of confirmed behavior, where the audience is the framework's own developers.

## How the Lab differs from the test suite

| | The Lab | [The test suite][the-test-suite] |
|---|---|---|
| Audience | Framework developer reading the page | CI; future-developer-doing-refactor |
| Pass/fail | Visual prose; the reader judges | Programmatic assertions |
| Coverage shape | One specimen per *surprising or load-bearing feature* | One assertion per *invariant* |
| When it runs | When a developer opens the page | On every commit |
| What it proves | The feature *demonstrably works* | The feature *continues to work* |

The two are complementary. The Lab is the human-facing face; the test suite is the regression harness. Each specimen's test note can link to the corresponding `it(...)` block, so a Lab visitor can see the formal assertion alongside the visual confirmation.

## How the Lab differs from caveats

Caveats are *negative* epistemology: behaviors that were thought to work and didn't. A caveat names a past misconception, links to the fix, and (where appropriate) points at a Lab specimen demonstrating the now-correct behavior. The caveat tells the story of being wrong; the specimen tells the story of being right.

When a caveat resolves, the appropriate next step is often a Lab specimen — the demonstration that the corner is now flat.

## What the Lab cannot prove

The Lab is *witness*, not *guarantee*. A specimen confirms behavior under the conditions the specimen exhibits. Behaviors outside those conditions may differ. Edge cases the specimen doesn't exercise are not confirmed by the specimen. This is why the Lab and the test suite are paired: the test suite provides the breadth of invariant assertion; the Lab provides the depth of demonstrable behavior.

## Sprint-28 prep

Sprint-28 will build the Lab's foundation: the specimen-shell components, the source-loading via `?raw`, the sidebar organized by ontology section. The first subject (likely Identity, A) will land end-to-end as the methodology pilot. Subsequent sprints will fill out the rest.

<!-- citations -->
[the-test-suite]: ./the-test-suite.md
[ontology]: ../ontology/index.md
