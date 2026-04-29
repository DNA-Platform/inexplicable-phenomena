---
kind: feature
title: The bond constructor
status: stable
---

# The bond constructor

This is the canonical surprise of `$Chemistry`. A reader who internalizes one feature from this directory should make it this one — the rest of the framework's character follows from it.

## The surprise in one paragraph

In a `$Chemical` subclass, **a method named after the class itself is the constructor for JSX children**. The framework calls this method *bond constructor*. Its parameters declare the typed shape of the JSX tree the chemical accepts; its body runs once per mount, with the child instances passed in as arguments.

```ts
class $Cookbook extends $Chemical {
  $title: string
  $recipes: $Recipe[] = []

  $Cookbook(title: string, ...recipes: $Recipe[]) {
    this.$title = title
    this.$recipes = recipes
  }
}
```

When this class is mounted as JSX:

```tsx
<Cookbook title="Vegan classics">
  <Recipe name="Chickpea curry" />
  <Recipe name="Lentil soup" />
</Cookbook>
```

…the framework parses the bond ctor's parameter shape (`title: string, ...recipes: $Recipe[]`), reads the JSX children, types and routes each one — `title` becomes the string prop, `recipes` becomes the spread of two `$Recipe` instances — and calls `$Cookbook("Vegan classics", recipe1, recipe2)`.

## Why it's surprising

Most languages do not dispatch by class name. JavaScript's `constructor` keyword is fixed. React uses props (a single object) for child shape. Web Components use a `connectedCallback` lifecycle hook with no children-as-args concept. The `$Chemical` design borrows its idea from XML schema (parameter shapes describing child element types) and mounts it on a familiar class-syntax surface — but the *binding* between the method's name and the class's name is the framework's choice, not a language feature.

A reader who didn't know to look for the bond ctor would see a `$Cookbook` method on a `$Cookbook` class and read it as a coincidence or a self-call. It isn't either. It's *load-bearing*. The framework finds the method by name; renaming the class without renaming the method silently breaks construction.

## Exact syntax

- The method name **must match the class name including the `$` prefix**: class `$Cookbook` → method `$Cookbook`.
- Parameters are typed in TypeScript. The types are read at runtime — the framework parses the source of the method to extract them.
- Allowed parameter shapes: positional (`name: string`), spread (`...items: $Item[]`), array (`items: $Item[]`).
- The bond ctor may be `async`. See [the lifecycle][lifecycle].
- Default values, destructuring, and arrow-function shapes are **not** currently supported by the parser. See [open question][oq-bond-parse].

## What gets passed

The framework reads the JSX children, instantiates each one (recursively, via the same dispatch), then walks the bond ctor's typed parameter list and matches children to parameters by type:

- Scalar JSX prop on the parent element → the parameter of matching name (e.g., `title="..."` → `title`).
- A JSX child whose type matches a positional parameter → that argument.
- A spread parameter (`...items: $Item[]`) → all subsequent matching children collapsed into an array.
- A typed array parameter → all matching children grouped into an array.

The orchestration is owned by [`$Synthesis`][ent-synthesis]; the runtime parameter validation surface is [`$check`][feat-check].

## Connection to the rest of the framework

- The bond ctor runs once per mount. Repeated mounts of the same class against different JSX produce independent chemicals.
- The bond ctor's `this` is the chemical instance; reactive writes inside it set initial state.
- Async bond ctors integrate with the [lifecycle][lifecycle]: the `'construction'` phase awaits the chain.
- The arguments passed in are the chemical's *children* in the catalyst graph. See [parent and catalyst][rel-parent-catalyst].

## Where to confirm it

- **Formal pin**: the unit-test suite asserts the dispatch — see [test suite][the-test-suite].
- **Interactive confirmation**: the [Lab][the-lab] (when built) will host a bond-ctor specimen showing all four parameter shapes side by side.
- **Lifecycle context**: [`$Particle` book — lifecycle][book-lifecycle] for how bond-ctor execution sits in the phase ordering.

## Open questions

- The parser is regex-based and breaks on default values, destructured params, and arrow-function ctors. See [bond-ctor source parsing][oq-bond-parse].

<!-- citations -->
[lifecycle]: ../../features/lifecycle-phases.md
[oq-bond-parse]: ../../epistemology/open-questions/bond-ctor-source-parsing.md
[ent-synthesis]: ../entities/synthesis.md
[feat-check]: ../../features/chemical.md
[rel-parent-catalyst]: ../relationships/parent-and-catalyst.md
[the-test-suite]: ../../epistemology/the-test-suite.md
[the-lab]: ../../epistemology/the-lab.md
[book-lifecycle]: ../../books/particle/lifecycle.md
