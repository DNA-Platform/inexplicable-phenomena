---
kind: guide
title: L-2 backlog — sprint history capture
status: planned
related:
  - _backlog-l3
---

# L-2 — sprint history capture

Story L-2 distills sprints 22 and 23, plus the post-sprint-21 work threaded through the conversation (particularization, `$Error`, `I<T>`), into durable pages under `.claude/docs/history/` and `.claude/docs/chemistry/`. The sprint folders stay where they are — this work *summarizes* them, doesn't move them.

## Inputs

- [sprint-22 plan] — Lexical Scoping & The Beautiful API. The big rebuild: `$Particle` becomes a leaf renderable, `$Chemical` extends it for containers, `$lift` produces per-site derivatives, `.Component` is replaced by `chemical.view` and `$()`.
- [sprint-22 notes] — raw mid-discussion thoughts. Useful for the *why* behind some sprint-22 decisions.
- [sprint-23 plan] — Audit Cleanup. Audience boundaries (`@dna-platform/chemistry` root vs. `/symbolic`), public statics that should be private, vocabulary on parent / child / derivative, particularization clarification, `Component` / `$Component` getter collapse.
- The `.env`-private conversation logs covering particularization (the prototype-insertion redesign), `$Error` (the renderable-error type), and `I<T>` (the identity-shaped type).

## Planned pages

### Under `.claude/docs/history/`

| File | Captures |
|---|---|
| `sprint-22-lexical-scoping.md` | The structural rebuild. Per-site derivatives, `$lift`, `$()` callable, `chemical.view`, the `$` dispatch surface, the bond-ctor-runs-once-at-mount rule, Element/Component type family. |
| `sprint-23-audit-cleanup.md` | Audience boundary tightening, symbol-keying public statics, vocabulary pass, `$particular$` resolution, `Component`/`$Component` collapse, docstring sweep. |
| `post-21-particularization.md` | The pre-sprint-22 redesign of `new $Particle(plainObject)` from "replace prototype" to "insert mixin between object and original prototype." Why the original lost identity; how the new shape preserves it. |
| `post-21-error.md` | `$Error` as a renderable error type. Decision context, shape, integration with `view()`. |
| `post-21-identity.md` | `I<T>` — the identity-shaped type. What problem it solves; where it sits in `types.ts`. |

### Under `.claude/docs/chemistry/caveats/`

Each historical lesson worth its own caveat page, linked from features and from the relevant history page:

- `particularization-prototype-loss.md` — the original `Object.setPrototypeOf` approach broke `instanceof Error`. Status: `historical` (resolved by sprint-22 redesign).
- `multi-site-render-collision.md` — pre-sprint-22 behavior where a chemical mounted at two sites shared state via the same instance. Status: `historical`.
- `react-escape-hatch-removed.md` — the `react()` manual trigger was removed in sprint-22 because scope + bond accessors auto-react. Status: `historical`.
- `prototype-bond-installation.md` — bond accessors are installed on the class prototype today; merely instantiating a chemical mutates the shared prototype. Status: `evolving` (being moved to instances in [sprint-24 Track A][sprint-24 plan]).
- `component-getter-vs-callable.md` — `.Component` and `$Component` getters were redundant; collapsed in sprint-23. Status: `resolved`.

### Under `.claude/docs/chemistry/features/`

L-3 builds the per-feature pages. L-2 only adds enough features to back-link the new caveats and history entries. Concretely: stub pages for `lexical-scoping`, `particularization`, `dollar-callable` if not already produced by L-3.

## Update to project tracker

[project tracker] currently lists sprints 22 and 23 with the placeholder *"undocumented in tracker — see sprint-N folder; capture pending in L-2."* L-2 closes that loop:

- Replace the placeholder rows with proper one-line summaries.
- Link each row to its `.claude/docs/history/sprint-NN-...md` page.

## Process for executing L-2

1. Read each sprint-22 / sprint-23 plan top-to-bottom. Identify *enduring* decisions vs. process discussion. Discard the latter — sprint folders preserve them.
2. Write the history pages. Three to five sections each: *what shipped*, *what was walked back*, *enduring decisions*, *open questions*.
3. Write the caveat pages. Use the [caveat template]. Cross-link feature ↔ caveat.
4. Update [project tracker] sprint-history table and the `.claude/docs/index.md` history section.
5. Run a final pass: every cross-link resolves; every feature page touched mentions its caveats.

## Acceptance for L-2

- Reading the new pages gives context the per-sprint folders alone don't.
- Sprints 22 and 23 appear in the project tracker history with proper links and summaries.
- The four post-21 narratives (particularization, `$Error`, `I<T>`, plus the sprint-23 audit clean) are each represented as durable docs.
- Every walked-back idea has a caveat page; every caveat page is linked from the feature it haunts.

<!-- citations -->
[sprint-22 plan]: ../project/sprint-22/plan.md
[sprint-22 notes]: ../project/sprint-22/notes.md
[sprint-23 plan]: ../project/sprint-23/plan.md
[sprint-24 plan]: ../project/sprint-24/plan.md
[project tracker]: ../project/index.md
[caveat template]: ./_template-caveat.md
