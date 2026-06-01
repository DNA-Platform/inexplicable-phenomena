---
kind: index
title: Caveats
status: evolving
---

# Caveats

Negative epistemology. A caveat is a behavior we *thought* worked and didn't, or a corner whose past failure earns naming.

The caveat pages themselves currently live at [`chemistry/caveats/`][cav-dir] (this directory is the epistemology spine's pointer; the substantive pages stay in their original location). When a caveat resolves, the page is preserved as institutional memory and (where appropriate) cross-linked to a [Lab][the-lab] specimen demonstrating the now-correct behavior.

## Existing caveats

- [cross-chemical handler fanout][cav-cross-chemical] — fixed sprint-24. The in-scope-write fast path used to skip fan-out across the catalyst graph.
- [short prop name instability][cav-short-prop] — fixed sprint-24. `$v`, `$x`, `$y` were silently inert because `>` in the regex should have been `>=`.
- [particularization prototype-loss][cav-particularization] — fixed sprint-22. The original `setPrototypeOf` design broke `instanceof` against the wrapped object.
- [particle allocates reactivity machinery][cav-alloc] — current. Every `$Particle` allocates a `$Molecule` and `$Reaction` even if particularized. Observable but not pathological.

## How caveats relate to open questions

A caveat documents a **resolved** misconception (or one we've decided to live with). An [open question][open-questions] documents an **unresolved** uncertainty. When an open question is investigated and the resolution is "the framework was wrong," it becomes a caveat.

<!-- citations -->
[cav-dir]: ../../caveats/
[the-lab]: ../the-lab.md
[cav-cross-chemical]: ../../caveats/cross-chemical-handler-fanout.md
[cav-short-prop]: ../../caveats/short-prop-name-instability.md
[cav-particularization]: ../../caveats/particularization-prototype-loss.md
[cav-alloc]: ../../caveats/particle-allocates-reactivity-machinery.md
[open-questions]: ../open-questions/index.md
