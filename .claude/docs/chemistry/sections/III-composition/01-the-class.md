---
kind: catalogue-section
section: III.1
title: $Chemical — the class
status: stub
---

# § III.1 `$Chemical` — the class

## Definition

`$Chemical` extends `$Particle` (§ II.1) with the machinery for composition: parent-child relationships, the binding constructor, the catalyst graph, and the synthesis orchestrator. A `$Chemical` is the container that receives JSX children and binds them as typed arguments. The class is defined in `src/abstraction/chemical.ts` (§ XV.2).

## Rules

- *(TBD — extends `$Particle`.)*
- *(TBD — adds `$synthesis`, `$catalyst`, `$$parent$$`, `$lastProps$`, `$remove$`.)*
- *(TBD — overrides `Component` getter to take the template path.)*
- *(TBD — declares a binding constructor (§ III.3).)*

## Cases

- A minimal `$Chemical` subclass with a binding constructor.
- A `$Chemical` with a `$catalyst` graph wiring.

## See also

- [§ II.1 `$Particle` — the class][s-II-1] — the base.
- [§ III.2 The dual constructor][s-III-2] — the two-moment framing.
- [§ III.3 The binding constructor][s-III-3] — the render-time method.
- [§ III.8 The catalyst graph][s-III-8] — the parent-child wiring.

<!-- citations -->
[s-II-1]: ../II-primitives/01-the-class.md
[s-III-2]: ./02-dual-constructor.md
[s-III-3]: ./03-binding-constructor.md
[s-III-8]: ./08-catalyst-graph.md
