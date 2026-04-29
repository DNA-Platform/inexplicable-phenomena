---
kind: catalogue-section
section: III.3
title: The binding constructor
status: stable
---

# § III.3 The binding constructor

## Definition

The **binding constructor** is a method on a `$Chemical` subclass named after the class itself. Class `$Book` declares a method `$Book(...)`; class `$CardContainer` declares `$CardContainer(title, card)`. It runs at **render time**, after the class constructor (§ III.2) has already produced an object, and receives the chemical's children — already bound and typed — as positional arguments.

The framework discovers it by looking up `(chemical as any)[chemical[$type$].name]`. The lookup is performed by `$Synthesis` (§ VIII.1) when a chemical's component is invoked with JSX children. The binding constructor's parameter list is parsed at runtime (§ VIII.4) to determine arity, types, and spread positions; arguments are validated with `$check` (§ III.4) and stored on the chemical.

This is the single most surprising feature in `$Chemistry`. React conflates object creation and child-binding into one function call; `$Chemistry` separates them because they answer different questions. The class constructor answers *"what does this component own?"*; the binding constructor answers *"what children did this instance receive?"*.

## Rules

- The binding constructor's name **must** equal the class name. The framework does no fall-back lookup; mis-naming the method silently disables it.
- The binding constructor is invoked **once per render** of the chemical's component, *after* `$apply` writes incoming React props to `$`-prefixed fields, *before* `view()` runs.
- Parameters are extracted from the method's source via regex (§ VIII.4 / § XIV.1). Arrow-form constructors, default parameter values, and destructured parameters are not currently supported.
- A spread parameter (`...items`) accumulates remaining children of the matching type into an array.
- Each non-spread parameter accepts exactly one child; arity mismatches raise validation errors (§ XII.3).
- Every parameter type is checked at runtime with `$check`. The first parameter with a wrong type produces a formatted error and aborts the binding (§ XII.3).
- The binding constructor's `this` is the chemical instance being bound for this mount. Writes to `this.$x` are writes to the bound instance, not to the template.
- The class hierarchy must be respected: if a parent class declares a binding constructor, every concrete subclass must also declare one with its own name. `assertViewConstructors` validates this at component-creation time.
- An `async` binding constructor is permitted; the framework awaits `$construction` before completing the bind (§ X.3).

## Cases

- A simple `$List(...items: $Item[])` accumulating spread children.
- `$CardContainer($Title, $Card)` with two positional parameters of different types.
- Mixing types via union: `$Toolbar(...controls: ($Button | $Spacer)[])`.
- The class-hierarchy violation: a `$VeganRecipe` subclass of `$Recipe` without its own `$VeganRecipe(...)` method — the error.
- The wrong-type case: `<Container><Recipe /></Container>` where `$Container` declares `$Container($Item)` — the formatted error message gallery (§ XII.3).
- An `async $AsyncList(...items: $Item[])` that awaits a fetch before binding.

## See also

- [§ 0.3 The dual constructor][s-0-3] — the teaser; this is the long form.
- [§ III.2 The dual constructor][s-III-2] — the two-moments framing.
- [§ III.4 `$check`][s-III-4] — runtime parameter validation invoked from inside this method.
- [§ III.5 `$is<T>(ctor)`][s-III-5] — the type-only helper for `$check` signatures.
- [§ VIII.1 `$Synthesis` class][s-VIII-1] — what discovers and invokes the binding constructor.
- [§ VIII.4 Parameter parsing][s-VIII-4] — the regex that extracts the parameter list.
- [§ X.3 Async bond ctors][s-X-3] — `async` binding constructors and `$construction`.
- [§ XII.3 The error message format][s-XII-3] — the error gallery for binding-constructor failures.
- [§ XIV.1 `parseBondConstructor` regex limits][s-XIV-1] — known parser limitations.

<!-- citations -->
[s-0-3]: ../00-front-matter/03-the-dual-constructor.md
[s-III-2]: ./02-dual-constructor.md
[s-III-4]: ./04-check.md
[s-III-5]: ./05-is.md
[s-VIII-1]: ../VIII-synthesis/01-synthesis-class.md
[s-VIII-4]: ../VIII-synthesis/04-parameter-parsing.md
[s-X-3]: ../X-lifecycle-internals/03-async-bond-ctors.md
[s-XII-3]: ../XII-errors/03-error-message-format.md
[s-XIV-1]: ../XIV-provisional/01-bond-ctor-regex.md
