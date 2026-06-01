---
kind: concept
title: I<T> — the identity-shaped type
status: stable
related:
  - particularization
  - dollar-error
  - sprint-22-lexical-scoping
---

# `I<T>` — the identity-shaped type

A short page on the `I<T>` type, its evolution from `Omit<T, keyof Object>` to plain `T`, and why the simpler form turned out to be enough.

## The problem

Particularization preserves identity at runtime: `new $Exception(myError)` returns `myError` with a richer prototype chain. But TypeScript needs to express the *type* of that returned value — it's an `Error` (or whatever the user passed) plus the particle methods, all on a single reference.

The naive type is `$Particle & T` where `T` is the user's input shape. That works, but the surface gets noisy fast:

```typescript
function particularize<T extends object>(thing: T): $Particle & T;
```

Doug wanted a single-letter alias. `I<T>` — the **identity shape** — short, evocative, captures the meaning that the result *is* the input but with framework methods composed in.

## First version — `Omit<T, keyof Object>`

The first definition tried to subtract the universal `Object` members from `T` to avoid double-counting:

```typescript
type I<T> = Omit<T, keyof Object>;
```

The reasoning: every type already extends `Object`. If we don't omit, intersections with `$Particle` re-merge methods like `toString`, `hasOwnProperty`, `valueOf`. The omit was an attempt to keep the type narrow.

In practice this was over-engineering. TypeScript's intersection mechanics already handle the merge correctly — the compiler doesn't double-count `toString` when computing `$Particle & T`. The `Omit` added a constant tax to type display ("`Omit<MyError, keyof Object>`" in error messages) for no real benefit.

## Second version — plain `T`

Doug's reasoning, after using the first version for a few weeks: *the type wrapper isn't doing work*. If the runtime guarantees identity, the type should just be `T`. The framework methods are added by intersection with `$Particle` at the call site that needs them.

```typescript
type I<T> = T;
```

This is almost a no-op type, but the *naming* still earns its keep. `I<MyError>` reads as "the identity-form of MyError" in function signatures, and its existence as a named alias signals to readers that the function is in the particularization family. The tiny indirection is intentional documentation.

```typescript
function particularize<T extends object>(thing: T): I<T>;
// reads as: "returns the identity-form of T"
// equivalent to: returns T (with framework methods accessible at runtime)
```

## Where `I<T>` lives

`src/types.ts` (audience-2 — exported from `@dna-platform/chemistry`). Used by `$Particle`'s constructor signature, `$Error`'s class shape, and any user code that wants to express "this returns the same thing it received, but particle-flavored."

## Why "I"?

Doug's call. The letter is short. The meaning is "identity." Spelling it `Identity<T>` in code felt heavy for what it does. Single-letter type names are unusual in TypeScript style guides, but the framework already uses single-letter generics extensively, and `I<T>` reads more like a Greek-letter math notation than a class name.

## Related

- [Particularization history][particularization] — where the type is consumed.
- [`$Error` history][dollar-error] — the motivating use case.
- [Sprint 22 — Lexical Scoping & The Beautiful API][sprint-22-lexical-scoping] — when this evolved.

<!-- citations -->
[particularization]: ./particularization.md
[dollar-error]: ./dollar-error.md
[sprint-22-lexical-scoping]: ./sprint-22-lexical-scoping.md
