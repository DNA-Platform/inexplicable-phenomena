---
title: Reactive patterns
---

# Reactive patterns

Cathy: $Chemistry's reactive model has three properties that shape how code should be written: scope-tracked reactivity, view purity, and safe composition.

## Scope-tracked reactivity

Cathy: When a chemical renders, its `view()` method runs inside a scope. The scope tracks which properties were read via getter interception. When a tracked property changes via its setter, the scope marks the chemical dirty and schedules a re-render. Only the properties that the view actually read trigger re-renders.

Cathy: This means: write `this.count = 5` and the view updates. No `.value`, no `ref()`, no `setState()`. The framework is invisible. The code reads as plain object mutation.

## View purity

Cathy: Views are object-pure. Same state in, same output out. The `view()` method reads `this` properties and returns React elements. No side effects, no ambient state, no hidden dependencies. The dirty flag + cache + diff model depends on this guarantee.

Cathy: This means: never mutate external state in `view()`. Never read from globals. Never call APIs. `view()` is a lens on the object's state — nothing more.

## Safe composition

Cathy: Two chemicals that share a particle both react when the particle changes. Neither knows about the other. This is safe because each view is a pure function of its own state, and no view can corrupt another's state through rendering.

Cathy: This means: chemicals compose freely. Nesting `$($Child)` inside a parent's `view()` is always safe. The parent and child have independent scopes, independent dirty flags, independent render cycles.

## The getter pattern for extensibility

Arthur: Styled components as overridable getter properties on chemicals. A chemical defines `get Card() { return DefaultCard; }` and subclasses override the getter to change the visual identity. Methods handle behavioral sub-components.

Arthur: This means: visual identity is inherited and extensible. A chemical's appearance can be changed by overriding a getter, without touching its behavior. This is what Doug meant by "a chemical can do what a function component simply can't" — the instance persists across renders, so getters and overrides work naturally.

## Template methods

Arthur: Chemicals use template methods for subclass-overridable rendering. The base class defines the render structure; subclasses override specific steps. `view()` calls `this.renderHeader()`, `this.renderBody()`, etc. Each method is a hook that subclasses can replace.

<!-- citations -->
[reactivity-models]: ../..team/cathy/reactivity-models/.cover.md
[view-introspection]: ../..team/cathy/view-introspection/.cover.md
