# Scheme and Self

**Used by:** Framework Developer, Librarian

The philosophical and technical foundations that $Chemistry draws from. Understanding these two languages is essential to understanding why $Chemistry is designed the way it is — not as a class-based component framework, but as a prototype-delegating, symbol-oriented, meta-circular system.

## Self: Prototype-Based Objects

Self (1986, David Ungar & Randall B. Smith) eliminated the class/instance distinction. Everything is an object. Objects have slots. Slots contain either data or behavior. Objects delegate to parent objects.

### Slots

In Self, an object is a collection of **slots**. Each slot has a name and a value. There's no distinction between a "field" and a "method" — both are just slots.

**In $Chemistry:** The `$` prefix convention is slot annotation:
- `$name` = a reactive slot (like Self's assignable slots marked with `:`)
- `name` = an inert slot
- `$method()` = a behavior slot that may trigger reactivity
- `method()` = a behavior slot that never triggers reactivity

### Delegation (not inheritance)

When Self looks up a slot and doesn't find it, it **delegates** to parent objects. This is dynamic — you can change an object's parent at runtime.

**In $Chemistry:**
- `$Catalogue.$new()` creates a child that delegates lookups to its parent via `$find()`
- `$Catalogue.$including()` composes multiple delegation chains (like Self's multiple parents)
- `$Particle`'s template system — instances delegate their view to a class-level template

### No Classes

Self has no classes. There's no blueprint/instance distinction. An object IS the thing, and other objects can delegate to it. A "class" is just an object that happens to be delegated to by many other objects.

**In $Chemistry:** While TypeScript uses `class` syntax, the runtime behavior is prototype-based:
- `$template$` is a prototype — one per class, shared by all instances
- `$Catalogue.$subject` is a capability token, not a class identity
- The reflection system treats types as objects with properties, not as abstract blueprints

## Scheme: Symbols and Meta-Circularity

Scheme (1975, Sussman & Steele) brought lexical scoping, first-class continuations, and a commitment to minimalism. Its influence on $Chemistry is primarily through symbols, environments, and meta-circular evaluation.

### Symbols

In Scheme, a symbol is a named, unique, interned value. Symbols are not strings — they are identity, not content.

**In $Chemistry:** `Symbol()` creates unforgeable keys:
- `$cid$`, `$symbol$`, `$template$` — each is a unique symbol, used as a property key
- Symbols as capability tokens — if you don't have the symbol, you can't access the slot
- `$Referent` uses symbols for role-based identity — a referent's symbol defines what it IS

### Environments and Scoping

In Scheme, an environment maps names to values. Environments chain — a child environment inherits from its parent but can shadow bindings.

**In $Chemistry:** `$Catalogue` IS an environment:
- `$index(ref, value)` binds a name to a value
- `$find(ref)` looks up a binding, delegating to parent catalogues
- `$new()` creates a child environment
- `$deref()` is garbage collection — clearing an environment's bindings
- `$empty()` creates an isolated environment with no parent (like Scheme's `null-environment`)

### Meta-Circular Evaluation

Scheme's evaluator can be written in Scheme. The language can describe itself. This self-reference is not a trick — it's the core design principle.

**In $Chemistry:**
- The reflection system (`$type()`, `$typeof()`, `$instanceof()`) lets the framework describe its own types
- `$Catalogue` is its own subject — `lib.$subject === lib` (self-reference)
- `$Referent` represents itself via its own system — a referent IS a reference
- Types are objects that have types — `$type(String)` returns a `$Type` object that itself has a type

### Continuations (Conceptual)

In Scheme, a continuation is "the rest of the computation." `call/cc` captures this as a first-class value.

**In $Chemistry v1:** The `$Promise<T>` type with `cancel()` echoes continuations — you can capture and abort "the rest of the async operation." The bond system's reaction lifecycle (setup → mount → render → layout → effect → unmount) is a structured continuation.

## Why This Matters

$Chemistry is not "React with extra steps." It's an attempt to bring Self and Scheme's ideas into the browser:

| Classical frameworks | $Chemistry |
|---------------------|-----------|
| Class hierarchies | Prototype delegation |
| String-based keys | Symbol-based identity |
| Explicit state management | Slot-based reactivity |
| Configuration objects | Catalogue environments |
| instanceof checks | Reflection queries |
| Private keyword | Symbol privacy |

Understanding this distinction prevents falling into "normal OOP" patterns that fight the framework's design.
