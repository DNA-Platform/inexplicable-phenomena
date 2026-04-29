---
kind: catalogue-section
section: VIII.1
title: $Synthesis class
status: stub
---

# § VIII.1 `$Synthesis` class

## Definition

`$Synthesis` is the per-chemical bond-constructor orchestrator. It parses the chemical's binding-constructor parameter list (§ VIII.4), processes JSX children (§ VIII.5), and invokes the binding constructor with typed arguments. One `$Synthesis` instance per chemical class.

## Rules

- *(TBD — one instance per chemical class.)*
- *(TBD — discovers the binding constructor by class name.)*
- *(TBD — invokes the binding constructor at render time.)*

## Cases

- A `$Synthesis` invocation with mixed children.

## See also

- [§ III.3 The binding constructor][s-III-3] — what `$Synthesis` invokes.
- [§ VIII.2 `$SynthesisContext`][s-VIII-2] — the per-call state.
- [§ VIII.3 `$Reactants`][s-VIII-3] — the wrapper passed to the bond ctor.

<!-- citations -->
[s-III-3]: ../III-composition/03-binding-constructor.md
[s-VIII-2]: ./02-synthesis-context.md
[s-VIII-3]: ./03-reactants.md
