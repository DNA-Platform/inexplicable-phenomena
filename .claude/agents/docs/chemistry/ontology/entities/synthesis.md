---
kind: stub
title: $Synthesis (entity)
status: planned
---

# `$Synthesis`

Bond-constructor orchestration. Runs once per chemical mount, parses the bond ctor's parameter shape, and processes JSX children into typed args.

**To be written.** This page should cover:

- `$Synthesis` vs `$SynthesisContext` (per-call state).
- `$Reactants` — the information-hiding wrapper exposing only `.values` to user code.
- The parsing-the-bond-ctor step (see [open question][oq-bond-parse] for the regex's brittleness).
- How JSX children become bond-ctor arguments (the type-driven dispatch).

For now, the canonical surprise is documented in [bond constructor][surprising-bond-ctor]; advanced internals will land in [synthesis-internals][topical-synthesis].

<!-- citations -->
[oq-bond-parse]: ../../epistemology/open-questions/bond-ctor-source-parsing.md
[surprising-bond-ctor]: ../surprising/bond-constructor.md
[topical-synthesis]: ../../topical/advanced/synthesis-internals.md
