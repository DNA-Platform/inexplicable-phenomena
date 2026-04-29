---
kind: catalogue-section
section: VIII.2
title: $SynthesisContext
status: stub
---

# § VIII.2 `$SynthesisContext`

## Definition

`$SynthesisContext` is the per-call mutable state for a binding-constructor invocation. It tracks the current parameter index, accumulated arguments, and child contexts as the synthesis machinery walks JSX children.

## Rules

- *(TBD — per-call instance.)*
- *(TBD — tracks parameter index, accumulated args, child contexts.)*

## Cases

- A nested chemical synthesis with child contexts.

## See also

- [§ VIII.1 `$Synthesis` class][s-VIII-1] — the orchestrator.
- [§ VIII.5 JSX child handling][s-VIII-5] — the children walk.

<!-- citations -->
[s-VIII-1]: ./01-synthesis-class.md
[s-VIII-5]: ./05-jsx-child-handling.md
