---
kind: catalogue-section
section: XIII.3
title: Particle allocates reactivity machinery
status: stable
---

# § XIII.3 Particle allocates reactivity machinery

## Definition

Sprint-27 reframe. Every `$Particle` instance now allocates `$Molecule` and `$Reaction` slots even when the particle is a particularization carrier or a leaf with no reactive properties. The allocation is constant per instance and provides uniform behavior across the particle hierarchy.

## Rules

- *(TBD — every `$Particle` allocates `$molecule$` and `$reaction$`.)*
- *(TBD — particularized carriers inherit the allocation.)*
- *(TBD — cost is constant per instance.)*

## Cases

- A particularized error has reactivity slots.

## See also

- [§ II.1 The class][s-II-1] — where the slots are listed.
- [§ VII.4 Reactivity machinery on carriers][s-VII-4] — the carrier-side framing.
- [chemistry caveat — particle allocates reactivity machinery][cav-alloc] — the original write-up.

<!-- citations -->
[s-II-1]: ../II-primitives/01-the-class.md
[s-VII-4]: ../VII-particularization/04-reactivity-on-carriers.md
[cav-alloc]: ../../caveats/particle-allocates-reactivity-machinery.md
