---
kind: catalogue-section
section: VIII.5
title: JSX child handling
status: stub
---

# § VIII.5 JSX child handling

## Definition

`$Synthesis` walks JSX children with type-specific rules. Strings pass through as text; arrays recurse; nested chemicals become typed binding-constructor arguments; spread arguments accumulate into an array. Mixed children walk in source order.

## Rules

- *(TBD — strings pass through.)*
- *(TBD — arrays recurse.)*
- *(TBD — nested chemicals become typed args.)*
- *(TBD — spread args accumulate.)*

## Cases

- Mixed children.
- Nested compositions.
- Spread accumulating.

## See also

- [§ VIII.1 `$Synthesis` class][s-VIII-1] — the orchestrator.
- [§ III.3 The binding constructor][s-III-3] — what receives the result.

<!-- citations -->
[s-VIII-1]: ./01-synthesis-class.md
[s-III-3]: ../III-composition/03-binding-constructor.md
