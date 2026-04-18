# Framework Design

Programming paradigms and architecture principles for $Chemistry development. Covers OOP patterns (especially prototype delegation), functional programming, the Scheme/Self philosophical foundations, and framework-level architecture.

---

## OOP Patterns

Object-oriented design patterns relevant to framework development — with emphasis on the patterns that matter for $Chemistry's prototype-delegation model rather than classical inheritance.

### Prototype Delegation

The core OOP pattern in $Chemistry. Objects delegate behavior to prototypes rather than inheriting from classes. This is Self's model, not Java's.

**Key distinction:** In classical OOP, a class is a blueprint — instances are copies. In prototype delegation, there are no blueprints — objects delegate to other objects directly.

```typescript
// Classical: class as blueprint
class Chemical { render() { } }
const c = new Chemical(); // c is a copy of the blueprint

// Delegation: object delegates to object
// $Particle's template pattern is delegation —
// one template per class, instances delegate view behavior to it
```

**Why this matters for $Chemistry:**
- `$Particle` uses static templates — one template per class, not per instance
- `$Catalogue` uses subject delegation — a child catalogue delegates lookups to its parent
- The `$` prefix convention is a slot annotation (from Self), not a decorator

### Composition Over Inheritance

Prefer combining simple objects over building deep inheritance trees.

- **Mixins via `$including()`** — $Catalogue composes behavior from multiple topics without multiple inheritance
- **View composition via `use()`** — $Particle separates identity from presentation by allowing view function swapping
- **Symbol-based capabilities** — Private symbols act as capability tokens, granting access without inheritance

### Encapsulation

$Chemistry uses three encapsulation boundaries:

1. **Symbol privacy** — `Symbol()` creates unforgeable keys. Only code with the symbol reference can access the property. Stronger than `private` keyword.
2. **$ prefix convention** — `$property` is reactive/public-facing; plain `property` is inert/internal.
3. **Catalogue subjects** — The `$subject` token is an opaque capability. You can only interact with a catalogue's internals if you hold its subject.

### The Expression Problem

A framework must support both adding new types without modifying existing code (OOP strength) and adding new operations without modifying existing types (FP strength).

$Chemistry addresses this through reflection (`$type()`, `$members()`), symbol extension (new symbols on existing objects), and catalogue indexing (new references in existing catalogues).

### Design Patterns in $Chemistry

| Pattern | Where it appears | Purpose |
|---------|-----------------|---------|
| Singleton | `$template$` per class | One view template shared across instances |
| Flyweight | `$cid$` counter | Lightweight identity without UUID overhead |
| Observer | Bond system (v1) | Reactive property change notification |
| Proxy | `$apply()` | Props → $-prefixed property assignment |
| Chain of Responsibility | `$Catalogue.$find()` | Delegation chain through parent catalogues |
| Memento | `$deref()` | Clean teardown / memory management |

---

## Functional Programming

Functional programming concepts relevant to $Chemistry and React development. The framework sits at the intersection of FP and prototype-based OOP — understanding both is essential.

### First-Class Functions

Functions are values — stored, passed, returned, reassigned.

**In $Chemistry:** `$Particle.use(viewFn)` assigns a view function to a particle. View functions receive `this` binding — first-class but receiver-aware (a bridge between FP and OOP). `$Catalogue.$find()` returns values that may themselves be functions.

**In React:** Components are functions (FC). Hooks are functions that return state handles. Event handlers are functions passed as props.

### Closures

A function that captures variables from its enclosing scope.

**In $Chemistry:** View wrapper functions close over the particle instance and the original view function. `$Catalogue` creates closures around private fields. Symbol references are captured in closures — the symbol itself is the "key."

**Gotcha:** Stale closures in React. A hook callback captures state at render time. If state changes, the closure still sees the old value. $Chemistry's reactivity model must account for this.

### Immutability

**Where it applies:** `$cid$` (assigned once), `$symbol$` (immutable after construction), `$template$` (set once per class), props flowing into `$apply()`.

**Where it doesn't:** `$`-prefixed properties are explicitly mutable (that's what makes them reactive). `$Catalogue` mutates its reference map via `$index()` and `$deref()`.

### Higher-Order Functions

**In $Chemistry:** `use()` takes a view function and wraps it. `$members()`, `$fields()`, `$methods()` take filter parameters and return filtered results. `$Catalogue.$including()` takes topic catalogues and returns a new catalogue — composition via higher-order construction.

### Algebraic Data Types

**Sum types** (A | B): TypeScript unions. `$Properties<T>` uses conditional types to filter properties — a type-level function.

**Product types** (A & B): Intersection types. `$Chemical extends $Particle` — a chemical is a particle AND has parent/child relationships.

**In React:** Hooks are algebraic effects — `useState` returns a product type `[value, setter]`. `useEffect` is a controlled side effect with a cleanup function.

---

## Scheme and Self

The philosophical and technical foundations that $Chemistry draws from. Understanding these two languages is essential to understanding why $Chemistry is designed the way it is — not as a class-based component framework, but as a prototype-delegating, symbol-oriented, meta-circular system.

### Self: Prototype-Based Objects

Self (1986, David Ungar & Randall B. Smith) eliminated the class/instance distinction. Everything is an object. Objects have slots. Slots contain either data or behavior. Objects delegate to parent objects.

**Slots in $Chemistry:** The `$` prefix convention is slot annotation:
- `$name` = a reactive slot (like Self's assignable slots marked with `:`)
- `name` = an inert slot
- `$method()` = a behavior slot that may trigger reactivity
- `method()` = a behavior slot that never triggers reactivity

**Delegation (not inheritance):** When Self looks up a slot and doesn't find it, it delegates to parent objects. This is dynamic — you can change an object's parent at runtime.

In $Chemistry: `$Catalogue.$new()` creates a child that delegates lookups to its parent via `$find()`. `$Catalogue.$including()` composes multiple delegation chains. `$Particle`'s template system — instances delegate their view to a class-level template.

**No Classes:** Self has no classes. An object IS the thing, and other objects delegate to it. While TypeScript uses `class` syntax, $Chemistry's runtime behavior is prototype-based: `$template$` is a prototype, `$Catalogue.$subject` is a capability token not a class identity, the reflection system treats types as objects with properties.

### Scheme: Symbols and Meta-Circularity

Scheme (1975, Sussman & Steele) brought lexical scoping, first-class continuations, and minimalism.

**Symbols:** In Scheme, a symbol is a named, unique, interned value — identity, not content. In $Chemistry: `Symbol()` creates unforgeable keys. `$cid$`, `$symbol$`, `$template$` are unique symbols used as property keys. Symbols as capability tokens — no symbol, no access. `$Referent` uses symbols for role-based identity.

**Environments:** In Scheme, an environment maps names to values, chaining to parents. `$Catalogue` IS an environment: `$index()` binds, `$find()` looks up (delegating to parents), `$new()` creates a child, `$deref()` clears bindings, `$empty()` creates an isolated environment.

**Meta-Circular Evaluation:** Scheme's evaluator can be written in Scheme. In $Chemistry: the reflection system lets the framework describe its own types. `$Catalogue` is its own subject. `$Referent` represents itself via its own system. Types are objects that have types.

### Why This Matters

$Chemistry is not "React with extra steps." It's an attempt to bring Self and Scheme's ideas into the browser:

| Classical frameworks | $Chemistry |
|---------------------|-----------|
| Class hierarchies | Prototype delegation |
| String-based keys | Symbol-based identity |
| Explicit state management | Slot-based reactivity |
| Configuration objects | Catalogue environments |
| instanceof checks | Reflection queries |
| Private keyword | Symbol privacy |

---

## Framework Architecture

Principles for building programming frameworks — API design, layered abstractions, and test-driven development at the framework level.

### Layered Abstraction

```
User-facing:    class MyComponent extends $Chemical { $name = '...' }
Mid-level:      $Chemical (lifecycle, parent/child, reactivity)
Low-level:      $Particle (identity, view, props), $Catalogue (environments), Symbols
Foundation:     Types, Reflection, Referent/Reference
```

Each layer should be independently testable and usable. You can use `$Particle` without `$Chemical`. You can use `$Catalogue` without `$Particle`.

### API Surface Design

**Three audiences:** Beginners (clear defaults), intermediate (composability and escape hatches), advanced (internals and extension points).

**Convention over configuration:** The `$` prefix convention — `$bar = 'baz'` instead of `@reactive() bar = 'baz'`. Convention is discoverable through reading code.

**Least surprise:** `$find()` finds or returns undefined (doesn't throw). `$deref()` with an argument removes one reference; without removes all. `view()` returns something renderable — always.

### Test-Driven Framework Development

**Tests as specification:** Each test suite documents a concept. Tests should read like documentation.

**Test layering:** Unit tests for primitives → integration tests for composition → contract tests for API stability → example tests for documentation.

**Red-Green-Refactor:** At framework scale, the test IS the design decision. Changing a test means changing the API contract.

### Migration Patterns

**Strangler fig:** `archive/` is v1, `chemistry/` is v2. Both exist. Tests define when v2 is ready.

**Test-first migration:** Port v1 tests to v2. If v2 passes v1's tests, migration preserves behavior.
