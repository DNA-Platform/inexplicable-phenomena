# Functional Programming

**Used by:** Framework Engineer, Frontend Engineer, Librarian

Functional programming concepts relevant to $Chemistry and React development. The framework sits at the intersection of FP and prototype-based OOP — understanding both is essential.

## First-Class Functions

Functions are values — they can be stored, passed, returned, and reassigned.

**In $Chemistry:**
- `$Particle.use(viewFn)` — Assigns a view function to a particle. The function is a value, bound to the instance.
- View functions receive `this` binding — they're first-class but receiver-aware (a bridge between FP and OOP).
- `$Catalogue.$find()` returns values that may themselves be functions.

**In React:**
- Components are functions (FC)
- Hooks are functions that return state handles
- Event handlers are functions passed as props

## Closures

A function that captures variables from its enclosing scope.

**Key uses in $Chemistry:**
- View wrapper functions close over the particle instance and the original view function
- `$Catalogue` creates closures around its private fields (`#references`, `#topics`, `#subject`)
- Symbol references are captured in closures — the symbol itself is the "key" to the closure's data

**Gotcha:** Stale closures in React. A hook callback captures state at render time. If state changes, the closure still sees the old value. $Chemistry's reactivity model must account for this.

## Immutability

Values that don't change after creation.

**Where it applies:**
- `$cid$` — Component IDs are assigned once, never mutated
- `$symbol$` — Each particle's symbol is immutable after construction
- `$template$` — The template singleton is set once per class
- Props flowing into `$apply()` — the props object itself shouldn't be mutated

**Where it doesn't:**
- `$`-prefixed properties are explicitly mutable (that's what makes them reactive)
- `$Catalogue` mutates its reference map via `$index()` and `$deref()`

## Referential Transparency

A function always returns the same output for the same input, with no side effects.

**In React:** Pure render functions — given the same props, return the same JSX. $Chemistry's `view()` method aspires to this.

**In $Chemistry:** `$type()` and `$typeof()` cache their results — same input always yields same type object. This is memoization enforcing referential transparency.

## Higher-Order Functions

Functions that take or return other functions.

**In $Chemistry:**
- `use()` is a higher-order operation — it takes a view function and wraps it in a new function that binds `this`
- The reflection system's `$members()`, `$fields()`, `$methods()` are higher-order queries — they take a filter parameter and return filtered results
- `$Catalogue.$including()` takes topic catalogues and returns a new catalogue — composition via higher-order construction

## Algebraic Data Types (Conceptual)

**Sum types** (A | B): TypeScript unions model this. `$Properties<T>` uses conditional types to filter properties — it's a type-level function.

**Product types** (A & B): Intersection types. `$Chemical extends $Particle` — a chemical is a particle AND has parent/child relationships.

**In React:** Hooks are algebraic effects — `useState` returns a product type `[value, setter]`. `useEffect` is a controlled side effect with a cleanup function (like a continuation).
