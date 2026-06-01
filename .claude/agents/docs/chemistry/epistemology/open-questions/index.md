---
kind: index
title: Open questions
status: evolving
---

# Open questions

Things we *don't yet know* about `$Chemistry`. Each page names an uncertainty, the evidence we have, and the path to resolution.

These pages are the migration target for AUDIT comments — code-side annotations marking "this needs investigation" become wiki-side pages naming the question, the suspected behavior, and the verification path.

## Current open questions

- [bond-ctor source parsing][oq-bond-parse] — the regex-based parser breaks on default values, destructured params, and arrow-function ctors. (Sprint-26 AUDIT.)
- [isView symbol branch][oq-isview] — a code path in the view-detection logic that may be unreachable. (Sprint-26 AUDIT.)
- [instance quickening][oq-quickening] — the path by which a particularized particle gains its full machinery. The reframe is in flight. (Sprint-26 AUDIT, reframed.)
- [`$isChemicalBase$` inherited transitively][oq-ischembase] — Queenie's sprint-24 finding. The `$Reagent` wrapper for non-`$` user methods may be unreachable.

## How an open question resolves

- **Confirmed** — investigate, write a unit test pinning the behavior, retire the question.
- **Wrong** — investigate, find the framework misbehaves, fix it, write the [caveat][caveats] capturing the historical state, retire the question.
- **Living** — keep the question open and link it from any feature page where the uncertainty matters.

<!-- citations -->
[oq-bond-parse]: ./bond-ctor-source-parsing.md
[oq-isview]: ./isview-symbol-branch.md
[oq-quickening]: ./instance-quickening.md
[oq-ischembase]: ./isChemicalBase-inherited.md
[caveats]: ../caveats/index.md
