---
kind: concept
title: $Error — making errors renderable
status: stable
related:
  - particularization
  - sprint-22-lexical-scoping
  - i-of-t
  - dollar-error-feature
---

# `$Error` — making errors renderable

A `$Particle` subclass that turns any `Error` into a renderable particle while preserving its `instanceof Error` identity. Designed alongside particularization in sprint 22 as the first real test of the prototype-mixin pattern.

## The problem

Errors are everywhere in a UI: validation, network, render-time exceptions. You want to display them — not as `String(error)` but as a proper component with structure, possibly different views per error class, possibly with actions ("retry", "dismiss"). A class that *is* an error and *is* a particle, holding the same reference the rest of your code already has.

Two non-options:

- **`class $Error extends Error implements $Particle`** — TypeScript multiple inheritance via interface only; the `$Particle` machinery (lifecycle, reactivity, identity) doesn't compose through interfaces.
- **`class $Error extends $Particle` and store the error inside** — wraps. Now you have two references: the error and the wrapper. Every consumer has to know which one to pass around.

## The shape

`$Error` is a particle that uses **particularization** to attach to an existing `Error`:

```typescript
class $Error extends $Particle {
    view() {
        return <div className="error">
            <span>{this.message}</span>
        </div>;
    }
}

const e = new $Error(new Error("failed to load"));
e instanceof Error           // true (preserved)
e.message                    // "failed to load"
e.view                       // function — runs the particle view
e === thatError              // true if you held the inner reference, but $Error was constructed with `new`
```

Because particularization preserves identity, the `Error` reference *is* the `$Error`. There's only one object: the error you passed in, now with a richer prototype chain that includes particle methods.

## Integration with `view()`

`$Error.view()` reads `this.message` (which resolves through the chain to `Error.prototype.message` — i.e. the actual error message), and renders it. The view is a regular particle view; it can use bonds, lifecycle phases, the `$()` callable, anything.

When an `$Error` instance is rendered as JSX (`{error}` in a parent's view), the framework's render pipeline detects it as a particle (via `isParticle(x)`), calls `view()`, and emits the result.

## The `I<T>` type intersection

`$Error` is one of the original motivators for `I<T>`. The class extends `$Particle` but the *runtime* shape is `$Particle & Error & T` (where `T` is the user's specific error subclass). TypeScript needs a way to express that — *the identity shape* — without forcing the user to write `$Error & MyError` everywhere.

`I<T>` evolved across the sprint from `Omit<T, keyof Object>` (subtract the object surface) to plain `T` (just the type, the framework guarantees identity via the runtime shape). See [`I<T>` history][i-of-t] for that story.

## Use cases

- **Render validation failures.** `class $ValidationError extends $Error { view() { return <div>...</div>; } }`. Throw, catch, render.
- **Per-error-class views.** Different `$Error` subclasses for `$NetworkError`, `$ParseError`, etc. — same rendering pipeline, different views.
- **Pass through unchanged.** Code that holds an `Error` reference doesn't care that it's also a particle. Consumers that check `instanceof Error` keep working.

## Related

- [Particularization history][particularization] — the prototype-mixin design that makes `$Error` possible.
- [`I<T>` history][i-of-t] — the type that captures particularized identity.
- [Sprint 22 — Lexical Scoping & The Beautiful API][sprint-22-lexical-scoping] — when this landed.
- [`$Error` feature page][dollar-error-feature] — current API surface.

<!-- citations -->
[particularization]: ./particularization.md
[i-of-t]: ./i-of-t.md
[sprint-22-lexical-scoping]: ./sprint-22-lexical-scoping.md
[dollar-error-feature]: ../chemistry/features/dollar-error.md
