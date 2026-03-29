# OOP Patterns

**Used by:** Framework Developer, Frontend Engineer, Librarian

Object-oriented design patterns relevant to framework development — with emphasis on the patterns that matter for $Chemistry's prototype-delegation model rather than classical inheritance.

## Prototype Delegation

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

## Composition Over Inheritance

Prefer combining simple objects over building deep inheritance trees.

**Patterns:**
- **Mixins via `$including()`** — $Catalogue composes behavior from multiple topics without multiple inheritance
- **View composition via `use()`** — $Particle separates identity from presentation by allowing view function swapping
- **Symbol-based capabilities** — Private symbols act as capability tokens, granting access without inheritance

## Encapsulation

$Chemistry uses three encapsulation boundaries:

1. **Symbol privacy** — `Symbol()` creates unforgeable keys. Only code with the symbol reference can access the property. Stronger than `private` keyword.
2. **$ prefix convention** — `$property` is reactive/public-facing; plain `property` is inert/internal. Convention-based, not enforced.
3. **Catalogue subjects** — The `$subject` token is an opaque capability. You can only interact with a catalogue's internals if you hold its subject.

## The Expression Problem

A framework must support both:
- Adding new types without modifying existing code (OOP is good at this)
- Adding new operations without modifying existing types (FP is good at this)

$Chemistry addresses this through:
- **Reflection** — `$type()`, `$members()` let you query any object's capabilities at runtime
- **Symbol extension** — New symbols can be added to existing objects without modifying their definition
- **Catalogue indexing** — New references can be registered in existing catalogues

## Design Patterns in $Chemistry

| Pattern | Where it appears | Purpose |
|---------|-----------------|---------|
| Singleton | `$template$` per class | One view template shared across instances |
| Flyweight | `$cid$` counter | Lightweight identity without UUID overhead |
| Observer | Bond system (v1) | Reactive property change notification |
| Proxy | `$apply()` | Props → $-prefixed property assignment |
| Chain of Responsibility | `$Catalogue.$find()` | Delegation chain through parent catalogues |
| Memento | `$deref()` | Clean teardown / memory management |
