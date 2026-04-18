# Prototypal Scoping

When a chemical is rendered multiple times in different contexts, each rendering needs independent `$`-prefixed properties (extrinsic) while sharing intrinsic state.

## The mechanism

`Object.create(chemical)` creates a shadow that inherits from the chemical. `$apply` writes `$`-prefixed props to the shadow. Intrinsic state on the chemical is accessible through the prototype chain. Each rendering gets its own shadow. The chemical is untouched.

## When it applies

- A chemical received through a binding constructor, rendered multiple times in the parent's view
- A chemical passed as a prop and rendered with different `$`-prefixed overrides in each location
- A shared chemical rendered in different component trees

## Related concepts

- [The $ membrane](./../overview.md) — `$` marks extrinsic properties that are per-rendering
- Template pattern — `.Component` creates instances via `Object.create(template)` in the FC
- `$bind(parent)` — creates a shadow under a specific parent
