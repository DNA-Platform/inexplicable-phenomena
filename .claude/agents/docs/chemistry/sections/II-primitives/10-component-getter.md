---
kind: catalogue-section
section: II.10
title: The Component getter
status: stub
---

# § II.10 The Component getter

## Definition

The `Component` getter on a `$Particle` produces the React functional component that renders the particle. On `$Particle`, the getter takes the lift path: each mount creates a derivative via `$lift` (§ II.9). On `$Chemical`, the getter is overridden to take the template path: `$createComponent` produces a Component bound to the class template, and the binding constructor (§ III.3) runs at each render.

## Rules

- *(TBD — `$Particle.Component` uses `$lift`.)*
- *(TBD — `$Chemical.Component` uses `$createComponent`.)*
- *(TBD — `$component$` is set on first access.)*

## Cases

- `class.Component` for a `$Particle` subclass.
- The difference for `$Chemical`.

## See also

- [§ II.9 `$lift`][s-II-9] — the lift path.
- [§ III.1 `$Chemical` — the class][s-III-1] — the override.
- [§ VIII.1 `$Synthesis`][s-VIII-1] — what the chemical-side Component invokes.

<!-- citations -->
[s-II-9]: ./09-lift.md
[s-III-1]: ../III-composition/01-the-class.md
[s-VIII-1]: ../VIII-synthesis/01-synthesis-class.md
