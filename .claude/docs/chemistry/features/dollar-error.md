---
kind: feature
title: $Error
status: stable
related:
  - particle
  - particularization
  - dollar-error-history
---

# `$Error`

A `$Particle` subclass that turns any `Error` into a renderable particle while preserving its `instanceof Error` identity. Built on particularization.

## What it is

`$Error` is the canonical case of particularization: a class that takes an existing `Error` and gives it a `view()` method without changing the error's identity. Same reference, same instanceof checks, plus rendering machinery.

It exists so that the rest of your codebase can keep treating errors as `Error` (catch blocks, logging, type guards) while UI code can render them as proper components — no wrapping, no double-references.

## How it works

```typescript
class $Error extends $Particle {
    view() {
        return <div className="error">
            <span>{this.message}</span>
        </div>;
    }
}

const original = new Error("failed to load");
const e = new $Error(original);

e === original;       // true
e instanceof Error;   // true
e.message;            // "failed to load"
e.view();             // runs the particle view
```

Subclass `$Error` for per-error-class views:

```typescript
class $NetworkError extends $Error {
    view() {
        return <div className="network-error">
            Network: {this.message}
        </div>;
    }
}
```

Throw, catch, particularize, render. The error reference flows through unchanged.

The constructor uses [particularization][particularization] under the hood. The TypeScript shape uses the [`I<T>`][i-of-t-history] identity-shaped type so call sites read as "give me back the identity-form of T."

## Related

- [`$Particle`][particle] — the base class.
- [Particularization][particularization] — the mechanism `$Error` builds on.
- [`$Error` history][dollar-error-history] — design context and the `I<T>` story.

## See also

- Source: [particle.ts][particle-src]

<!-- citations -->
[particle]: ./particle.md
[particularization]: ./particularization.md
[dollar-error-history]: ../../history/dollar-error.md
[i-of-t-history]: ../../history/i-of-t.md
[particle-src]: ../../../../library/chemistry/src/abstraction/particle.ts
