---
kind: catalogue-section
section: I.2
title: The $ membrane
status: stable
---

# § I.2 The `$` membrane

## Definition

The `$` is `$Chemistry`'s core symbol. It marks the boundary between **intrinsic identity** — what an object IS — and **extrinsic context** — how an object is being VIEWED. Read `$` as *"representation of."* `$Chemical` is "representation of a chemical component." `$title` is "representation of the title prop."

The membrane has three audiences and three densities. At each layer the `$` count rises.

1. **Component consumers** write JSX. They never see a `$`. The membrane is invisible.
2. **Component authors** subclass `$Chemical`, declare `$`-prefixed props, write `view()` methods. They see the `$` as a simple grammar.
3. **Framework developers** work inside `$Particle`, `$Synthesis`, `$Reflection`. The `$` density is high; variables like `$this`, `$$this`, `$$$type` are normal.

## Rules

The membrane uses a precise grammar:

- **`$Name`** (capital after `$`) — a representation **type**. `$Particle`, `$Chemical`, `$Atom`, `$Synthesis`. These are the framework's classes.
- **`$name`** (lowercase after `$`) — a representation of a **prop**. `$title` on a chemical becomes `title` on the React component. The `$` appears in the class definition and vanishes at the `.Component` boundary.
- **`$name$`** (trailing `$`) — a **Symbol key**, defined in `symbols.ts` (§ I.1, § XV.9). Unforgeable identity tokens for internal slots: `$cid$`, `$type$`, `$template$`, `$molecule$`, `$reaction$`, `$component$`, `$derivatives$`.
- **`$$name$$`** (double `$` brackets) — a **static / class-level symbol**. `$$template$$` lives on the class; `$template$` lives on the instance.
- **`$x$`** (used as a local variable) — a **compilation artifact**. Where one would write `const y = x as any`, the framework's convention is `const $x$ = x as any`. The form names the relationship ("I am the representation of `x`, for TypeScript's benefit") and the trailing `$` marks the variable as internal mechanism.
- **No `$` prefix** — the **real thing**. The component the consumer touches. The bare prop. The user-visible value.

The `$` density at any line of code is a reliable index of the layer being touched.

## The `.Component` boundary

The `$` vanishes when a class crosses to a React component. A component author writes `class $Display extends $Chemical { $text = '' }` and exports `const Display = new $Display().Component`. Consumers import `Display` and write `<Display text="Hello" />`. The `$apply` mechanism (§ X.4) maps incoming props by adding the `$` prefix: `text` becomes `$text`. Intrinsic instance state (`count`, `_internal`) never reaches the component's props interface.

## Why the density

The density is part of the experience. The framework's *use* is pragmatic — clean JSX, no ceremony. The framework's *implementation* is art. Variables like `$this`, `$$this`, `$view$`, `$$$type` are intentional; each `$` marks a level of indirection or transformation. The `$` count *is* the documentation. If this stretches the reader, it is meant to.

## Cases

- A consumer-side component invocation: `<Counter initial={0} />` — no `$` visible.
- An author-side class with `$count` and `$step`, exporting `.Component`. Same JSX shape on the consumer side.
- A framework-internal site with `$$this`, `$view$`, `$type$` — the high-density register.
- The `$apply` mapping: `props.title` → `instance.$title`.

## See also

- [§ 0.2 Conventions][s-0-2] — the catalogue's voice and the chemistry register.
- [§ I.1 Symbols][s-I-1] — the unforgeable identity tokens denoted `$x$` / `$$x$$`.
- [§ I.3 Types][s-I-3] — `$Properties<T>`, `$Component<T>`, `$Element<T>`, `I<T>`.
- [§ X.4 The render loop][s-X-4] — where `$apply` strips and adds `$` prefixes.
- [§ V.1 Reactive properties][s-V-1] — the `$x` convention as the reactivity trigger.
- [§ IX.3 `$Reflection.isSpecial(name)`][s-IX-3] — the `$x` shape predicate.

<!-- citations -->
[s-0-2]: ../00-front-matter/02-conventions.md
[s-I-1]: ./01-symbols.md
[s-I-3]: ./03-types.md
[s-X-4]: ../X-lifecycle-internals/04-render-loop.md
[s-V-1]: ../V-reactivity/01-reactive-properties.md
[s-IX-3]: ../IX-reflection/03-isspecial.md
