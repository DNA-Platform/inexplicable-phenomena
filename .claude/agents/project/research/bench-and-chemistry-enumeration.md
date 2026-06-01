---
kind: research
title: $Chemistry Lab — old-app analysis and Lab/library co-organization
status: research
authors: cathy, arthur, queenie, libby
---

# `$Chemistry` Lab — old-app analysis and Lab / library co-organization

## What this document is now

This was originally a three-part research note. **Part 2 — the 12-subject enumeration of `$Chemistry` features — has been migrated to the library** as the foundation of the new ontology spine. See:

- [chemistry/ontology/][ontology] — entities, relationships, concepts, surprises.
- [chemistry/epistemology/][epistemology] — the Lab, the test suite, caveats, open questions.
- [chemistry/topical/][topical] — the narrative arc.

What remains here is the **scaffolding for sprint-28 planning**: critical analysis of the old `library/chemistry/app/` (worth keeping vs worth redesigning), and the proposal for how the Lab and the library co-organize. The library reorg has now landed; the Lab build is sprint-28's track.

The artifact's name has changed: what we called "the Bench" is now formally **`$Chemistry` Lab** (casual: **the Lab**). Substantive treatment: [the-lab.md][the-lab].

---

## Part 1 — Critical analysis of the old app

`library/chemistry/app/` is 331 lines of `main.tsx` plus a `vite.config.ts`, `index.html`, and an empty `src/books/` directory. It was the first attempt at a framework showcase. Two books are wired up: `HomeCooking` and `TwoKitchens`.

### Worth keeping

- **The bookshelf metaphor.** Sidebar of shelves containing books. Already aligns with the per-class book pattern in the wiki where each major class has a book with chapters. Same mental model.
- **The `TestNote` pattern.** Each book has a panel describing what's demonstrated and what to look for (visual pass/fail). This is the "clear UI guidance" Doug asked for. Direct keep.
- **The `ViewSource` pattern.** Collapsible side-by-side preview ↔ source code. Uses `prism-react-renderer` for highlighting. The mechanism is correct.
- **Specimen sharing via `@specimens` Vite alias.** The app imports `Cookbook`, `Recipe`, etc. from `tests/specimens/recipe`. The same fixtures power tests *and* the Lab. Single source of truth — keep this.
- **`vite.config.ts` is already wired** — `@` for `src/`, `@specimens` for `tests/specimens/`.

### Worth redesigning

- **Source-as-string.** `<ViewSource code={"...long template literal..."}>` requires hand-copying the source into a string. Brittle, tedious, error-prone. **The fix: Vite's `?raw` import** — `import src from '@specimens/recipe.tsx?raw'` returns the file's text at build time. Zero new dev deps; the `prism-react-renderer` we already have just consumes the string.
- **Coverage is tiny.** Two books for a framework with 30+ features. The new Lab needs comprehensive coverage organized along the [ontology spine][ontology], not by metaphor.
- **No subject grouping.** Both books sit on a "Cookbooks" shelf. There's no "Reactivity" or "Lifecycle" or "Particularization" axis. The Lab should organize by `$Chemistry` feature (entity / surprise / topic), not by example domain.
- **Pass/fail is visual prose, not assertions.** Acceptable for an exhibit, but should cross-link to the unit test that pins the same behavior. Bidirectional cross-linking with [the test suite][the-test-suite].
- **No relationship to the wiki.** The Lab and the wiki should share organization (same ontology axes) and link both directions: Lab specimen → wiki page, wiki page → Lab specimen.
- **The "author" column.** Each book has a fake author. Replace with the actual subject (e.g., "Reactivity / Cross-chemical writes") and let the metaphor live in the *content* of each specimen.

### What the old app does that the new Lab should NOT do

- **No clever loading-by-default of every demo.** Doug specifically said "we need the app to be convenient to run so that 900 tests don't load at once." Lazy-import each specimen module so the React tree doesn't construct everything on mount.

---

## Part 2 — Enumeration

**Migrated to the library.** The enumeration is now the canonical [ontology spine][ontology], with the three sub-spines: [entities][ont-entities], [relationships][ont-relationships], [concepts][ont-concepts], and [surprising][ont-surprising]. Caveats moved to the [caveats spine][ep-caveats] under epistemology; AUDIT-comment items moved to [open questions][ep-open].

The 12-subject grouping (A through L) was a useful discovery vehicle but the final shape is *richer* — entities and relationships split apart, surprises got their own teaching directory, and the Lab/test-suite distinction became its own epistemology axis.

---

## Part 3 — Lab / library co-organization

### Shared organization

Both the Lab and the wiki use the **same ontology axes** as their top-level organization:

- A reader who sees "Surprising / bond constructor" in the wiki sees the same category as a Lab specimen.
- A reader who sees "Entities / `$Particle`" in the Lab finds the same page in the wiki's [ontology][ont-entities].

### Two presentation modes

- **Lab: behavior-first.** Each specimen is a small running example with three panels: the demo (interactive), the source (loaded via Vite `?raw`), and the test note (what to look for + link to the corresponding unit test).
- **Wiki: explanation-first.** Each page is narrative prose with anchored source links. Caveats and open questions sit alongside as separate first-class pages.

### Cross-linking convention

- Each Lab specimen has a "Read the page" link → the corresponding wiki page (ontology entity / surprising feature / etc.).
- Each wiki page has a "See it in the Lab" link → the corresponding specimen.
- Caveat pages link to specimens that demonstrate the corner case.

### Lab file structure (proposal)

```
library/chemistry/app/
  index.html
  vite.config.ts
  src/
    main.tsx                — App shell, sidebar, routing
    framework/
      Specimen.tsx           — One specimen: demo + source + testnote
      ViewSource.tsx         — Refactored to load from raw imports
      TestNote.tsx
      OntologyIndex.tsx      — Section-level page (lists specimens in section)
    sections/
      surprising/
        bond-constructor.tsx
        particularization-instanceof.tsx
        cross-chemical-writes.tsx
        ...
      entities/
        particle.tsx
        chemical.tsx
        ...
      topical/
        01-hello-particle.tsx
        ...
```

Each specimen is a single `.tsx` file containing one or two chemical declarations + the demo render + a description. The Lab's `Specimen.tsx` framework component reads the source via `?raw` import and renders the demo + source side-by-side.

### Source-loading mechanism

**No new dev dep needed beyond what's already pulled.** Vite has built-in `?raw` query: `import src from './bond-constructor.tsx?raw'` returns the file's text at build time. `prism-react-renderer` (already in the old app's deps) handles syntax highlighting. The author writes the file once. The Lab finds it, loads it, displays it. Source can never rot relative to running code.

### Lab as exhibit, not test runner

The Lab is an exhibit, not a CI surface. Pass/fail criteria are visual prose for framework developers reading the page. Each specimen's test note links to the unit test(s) that pin the same behavior, so the rigorous verification lives in the existing 428-test suite ([the test suite][the-test-suite]) and the Lab is the human-readable face.

---

## Open questions for sprint planning

1. **Specimen target count for the first sprint.** All ~60? A subset? Recommendation: pick one ontology section (probably [surprising][ont-surprising] — small, high-value, and Doug specifically called out the bond constructor as the canonical surprise) to land end-to-end as the methodology pilot.
2. **What about the old `HomeCooking` and `TwoKitchens` demos?** Migrate into appropriate sections (composition, lexical scoping) or rebuild from scratch?
3. **Routing:** URL hashes per specimen so a developer can deep-link?
4. **Test-suite cross-links:** how do we surface "see the unit test" without making the Lab depend on the test runner? Proposal: a curated map in `lab/test-cross-links.json` maintained by hand.
5. **Caveat specimens:** how do we present "this used to be broken; here's the fix"? Maybe a single specimen per caveat that demonstrates the now-correct behavior with a callout to the historical caveat page.

---

## Recommendation for sprint planning

When we plan sprint-28:

- **Two tracks**, like sprint-27 had. **Track A**: Lab foundation + first ontology section end-to-end (likely `surprising/`, with `bond-constructor` as the keystone specimen). **Track B**: open-questions + caveat reconciliation in the wiki.
- **No comment-migration in this sprint.** Sprint-27 didn't finish; doing it alongside the Lab would be too much.
- **Methodology pilot:** pick the surprising section, do every specimen end-to-end with source loading, wiki cross-link, test cross-link. Validate the pattern. THEN expand to other sections.

Sprint-28 working name candidates: **The Lab**, **Walkthrough**, **Witness**. My vote: **The Lab** — names the artifact directly.

---

## Files referenced

- `library/chemistry/app/src/main.tsx` — old app, 331 lines
- `library/chemistry/app/vite.config.ts` — Vite config with `@`/`@specimens` aliases
- `library/chemistry/tests/specimens/recipe.tsx` — fixture imported by the old app
- [catalogue][catalogue] — the wiki's reading list, now organized along the three axes
- [the-lab.md][the-lab] — the substantive epistemology page describing the Lab

<!-- citations -->
[ontology]: ../../docs/chemistry/ontology/index.md
[epistemology]: ../../docs/chemistry/epistemology/index.md
[topical]: ../../docs/chemistry/topical/index.md
[ont-entities]: ../../docs/chemistry/ontology/entities/index.md
[ont-relationships]: ../../docs/chemistry/ontology/relationships/index.md
[ont-concepts]: ../../docs/chemistry/ontology/concepts/index.md
[ont-surprising]: ../../docs/chemistry/ontology/surprising/index.md
[ep-caveats]: ../../docs/chemistry/epistemology/caveats/index.md
[ep-open]: ../../docs/chemistry/epistemology/open-questions/index.md
[the-lab]: ../../docs/chemistry/epistemology/the-lab.md
[the-test-suite]: ../../docs/chemistry/epistemology/the-test-suite.md
[catalogue]: ../../docs/catalogue.md
