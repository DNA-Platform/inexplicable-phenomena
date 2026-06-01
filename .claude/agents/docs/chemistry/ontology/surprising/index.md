---
kind: index
title: Surprising features
status: evolving
---

# Surprising features

The corners of `$Chemistry` that demand explicit teaching. Most of the framework reads as a sensible JS/TS library: classes, fields, methods. The pages in this directory are the parts that *don't* — features whose surface looks like one thing and behaves like another, or whose behavior would not be guessed from the syntax.

A reader who skips this directory will eventually be surprised. A reader who starts here is forearmed.

| Feature | The surprise |
|---|---|
| [bond constructor][bond-ctor] | A method named after the class is the constructor for JSX children. Most languages don't dispatch by name. **The canonical surprise.** |
| [particularization & instanceof][instanceof] | `new $Particle(error) instanceof Error` is `true`. Particularization preserves the original prototype chain. |
| [cross-chemical writes][cross-writes] | Writing to another chemical's `$x` from inside a handler propagates correctly across the catalyst graph. |
| [the `$` membrane][membrane] | `$x` (user-reactive) vs `$$x$$` (framework-internal symbol) vs `_x` (private) — three naming registers, one underscore convention. |
| [`$()` shape dispatch][dispatch] | `$(thing)` selects behavior by `typeof thing` — class, instance, JSX, string each route differently. |

The teaching arc is: **introduce the surprise → explain the mechanism → show the canonical example → cross-link to the formal feature page**.

<!-- citations -->
[bond-ctor]: ./bond-constructor.md
[instanceof]: ./particularization-instanceof.md
[cross-writes]: ./cross-chemical-writes.md
[membrane]: ./dollar-membrane.md
[dispatch]: ./dollar-dispatch.md
