# Composition Model — Design Notes

Captured from design conversations with Doug, 2026-04-21. Notes for a future design decision, not yet committed.

## Two forms of Component

Doug clarified (correcting my earlier misread): the distinction is between the **template's Component** and the **instance's view-as-component**.

**Template Component.** This is what you use in TSX to create new instances. It takes props — those props are the initial state for a new chemical. `<$Book title="..." author="..." />` creates a new `$Book` instance with that state. The template's Component IS the constructor in TSX syntax.

**Instance view-as-component.** When you already hold a chemical instance, you use its view method as a component. No props — the instance is already initialized. `{existingBook.Component}` renders the book.

**Prototypal clone.** If you want a Component that takes props and creates instances derived from a specific existing chemical (not the template), you get one via prototypal cloning from that instance. It's a Component with props, prototypally related to the instance you cloned from.

Quoting Doug:

> the Component form has the props and you create a chemical with it. Remember that the template produces different instances. For them, perhaps you simply use the view explicitly as a component. No props. The chemical is already initialized. But if you want to get another component for the chemical that you can initialize, it has a prototypal relationship to the one you fetched it from. The constructor is in the TSX. That's the point

This shape is already partially in the current `chemical.ts` — `Component` (template) vs `$lift(instance)` (instance form) vs `.$bind(parent)` (prototypal-derived). The design isn't new; it's a sharpening of what exists.

## How chemicals interact

Chemicals interact freely:
- Set properties on each other.
- Call methods on each other.
- Read each other's state (including through `this.$parent`).
- Even change state in views (as long as it's idempotent — though the idiomatic place is the bond constructor or methods called from there).

Parents may or may not be dynamic. Doug is leaning toward stable-parent-edges (parent set once) but hasn't committed.

## Reactivity mechanisms

Two mechanisms working together:

1. **Reactive methods** (formerly called "bonded methods"): every method call on a chemical fires `$update` on that chemical after return (sync) or Promise resolution (async). This handles mutations within a chemical's own methods.

2. **View diff at post-lifecycle**: re-run view, compare output to what was rendered. This catches CROSS-CHEMICAL reads — when another chemical's state changed and this chemical's view reads it. Example: parent view renders `{this.$count} + {this.$child.$x}`; child mutates `$x`; parent's own method wasn't called, but parent's view output is now different. View diff detects it; parent re-renders.

Both are needed. They catch different things. Reactive methods handle intra-chemical mutation; view diff handles inter-chemical read propagation.

## Determinism contract

For view diff to be useful, view must be deterministic given chemical state. The framework idiom:

- **Non-determinism goes in the bond constructor, not in view.** `this.$random = Math.random()` in `$ClassName()`; view reads `this.$random`. Stable per instance. Same for `Date`, IDs, timestamps.
- **View is a pure read of chemical state.** Not strictly enforced but strongly idiomatic. Non-idempotent views cause infinite re-renders via the diff.

## Diff rules (from Cathy's earlier `equivalent()` design)

- **Primitives**: `===`.
- **Functions**: compare via `toString()`. Two closures with identical bodies are equal even if instance identity differs.
- **Plain objects and arrays**: recursive structural equality.
- **Class instances (including chemicals)**: reference compare. Trust identity.
- **React elements**: delegate to reconcile (type, key, props, children).

These rules are what make the view diff both correct (no missed changes) and non-degenerate (no infinite loop from inline closures).

## Status

Not committed. Design landed in the 2026-04-21 conversation:
- Reactive methods + view diff as the two mechanisms.
- Determinism-in-bond-constructor as the contract.
- Template Component vs instance view-as-component vs prototypal clone distinction.
- No Proxy required. Static analysis is a future perf optimization, not a correctness requirement.
