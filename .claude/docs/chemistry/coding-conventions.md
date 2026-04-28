---
kind: reference
title: $Chemistry coding conventions
status: stable
---

# $Chemistry coding conventions

This document describes Doug's coding style as observed across the `library/chemistry` source and the `../chemistry` app. These are not aspirational guidelines — they are patterns extracted from the existing code. When contributing to $Chemistry, match these conventions.

## The compression principle

The code is dense by design. "If the code can't be compressed, it must not be simple enough."

- **No blank lines inside methods.** A method is one thought. If it needs blank lines, it is doing too many things.
- **No blank lines between related declarations.** Symbol declarations, property declarations, and short methods stack vertically without gaps.
- **Blank lines between *conceptual* sections only.** Between the interface block and the class. Between the class and the exports. Between test suites. These mark architectural boundaries, not "readability."
- **No explanatory comments.** The code is the explanation. If the code needs a comment, the code should be rewritten until it doesn't. The only comments in the codebase are structural markers (e.g., `{// $SubjectiveRep` on an import line to label a group of symbol imports).
- **No utility functions.** If something is done once, write it inline. If something is done twice, consider whether the duplication is actually clearer than the abstraction. Three similar lines are better than a premature helper.

## The $ grammar

The `$` is a linguistic system, not a naming prefix. Read `$` as "representation of."

### Type names: `$Name`

Every framework class and interface starts with `$`. `$Particle`, `$Chemical`, `$Catalogue`, `$ObjectiveRep`, `$Referent`. These are representations — the machinery behind the glass. A component consumer never sees these names; a component author sees them as the base classes they extend; a framework developer lives inside them.

When a class is *about* an existing concept, the name mirrors it: `$Particle` represents a particle, `$Chemical` represents a chemical, `$Catalogue` represents a catalogue. The `$` doesn't add a prefix to an arbitrary name — it marks that this class *represents* the concept its name describes.

### Prop fields: `$name`

A lowercase `$`-prefixed property on a chemical is a representation of a prop. `$title`, `$color`, `$background`. When React props arrive, `$apply$` maps `title` → `$title`. The `$` is the boundary between external input (no `$`) and internal state (`$`). At the `.Component` boundary, the `$` is stripped — consumers write `<Display text="Hello" />`, not `<Display $text="Hello" />`.

Default values are set directly: `$text = 'initial'`. Optional props use `$name? = default`. Non-prop instance state has no `$`: `count = 0`, `id = Math.random()...`. This convention makes the prop/state boundary visible at a glance.

### Symbol keys: `$name$`

A `$`-bracketed name is a Symbol constant, defined in [symbols.ts][symbols]. `$cid$`, `$type$`, `$template$`, `$bond$`, `$apply$`. These are unforgeable identity tokens for internal slots. The double-dollar variants (`$$name$$`) mark static/class-level symbols: `$$template$$`, `$$getNextCid$$`, `$$createSymbol$$`.

Symbols are used (rather than `#private` fields) when the property must travel through `Object.create()` prototype delegation. See [symbols vs #private][overview] for the full rationale.

### Cast variables: `$x$`

When TypeScript requires a type assertion for compilation reasons:

```typescript
const $this$: any = this;  // compilation artifact
const $$type: (type: Type | TypeofType) => $ObjectiveRep = $type as any;
```

The `$x$` convention names the relationship: "I am the representation of x, for TypeScript's benefit, and the trailing `$` marks me as internal mechanism." These variables exist only because the type system requires them, not because the runtime does.

### Variable layering: `$this`, `$$this`, `$$$type`

Each `$` marks a level of indirection or transformation:

- `$this` — the representation of `this` (often the canonical version, or a typed alias)
- `$$this` — a view of the representation (e.g., after `Object.create()`, or after a role transition)
- `$$$type` — a further derivation (e.g., a type looked up from a type looked up from a literal)

The `$` count *is* the documentation. If you see `$$$`, you know you are three levels deep. This replaces names like `derivedTypeFromPrototype` which would be longer but not clearer.

### No `$`: reality

Anything without a `$` is real. The component. The prop. The class constructor argument. What the consumer touches. `const Display = new $Display().Component` — `Display` is real. `$Display` was the representation. The framework's success is measured by how much `$` disappears at the boundary.

## Structural patterns

### Constructor return

A constructor may return a different object than `this`. This is not a hack — it is a design pattern. In $Chemistry:

- `$Particle(particular)` — when passed a non-Particle object, sets the particle as the object's prototype and returns the original object. Any structural thing can become a particle without changing what it is.
- `$Component$` — returns `this.Component`, a function. The `$Component$` instance itself is never exposed; only the callable React component escapes.
- `$Catalogue.constructor` — sets `this.$subject = this`, making the catalogue its own subject. Not a different-object return, but the same principle: construction establishes identity relationships that are not obvious from the `new` call.

When reading $Chemistry code, never assume `new X()` returns an `X`.

### Object.create() over new

Inside the framework, objects are born by prototype delegation, not class instantiation:

- `$Particle.use()` — creates a derived view of a particle for rendering
- `$Component$.createChemical()` — creates the bound chemical that actually renders
- `$SubjectiveRep.$as()` / `$of()` — creates role views in the reflection system
- `$Referent.$as()` — creates role views in the semantics system
- `$BondOrchestrationContext.clone()` — creates child orchestration contexts

The only `new` calls are at top-level entry points: `new $Particle()`, `new $Chemical()`, `new $ObjectiveRep(...)`, `new $Catalogue(...)`. Everything downstream is `Object.create()`.

This is not an optimization. It is the statement that identity is perspectival — the same underlying object viewed from different angles, sharing state through the prototype chain, diverging only where they must.

### Template-instance pattern

The first instance of each `$Particle` subclass becomes its static template (`$$template$$`). All subsequent rendered instances are prototypal views of this template, created by `Object.create(template)` during binding.

- **Template**: holds class-defined default state. Shared prototype for all instances.
- **Bound instance**: inherits from template, adds render-time bindings from the binding constructor.
- **Shadowed instance**: inherits from bound instance, adds per-render prop overrides.

The `$isTemplate$` getter identifies templates. Templates receive special treatment: rendering a template's view auto-derives a fresh instance rather than mutating the template. This prevents accidental state pollution of the shared prototype.

### Dual constructor

Every `$Chemical` subclass has two constructors:

1. **Class constructor** (`constructor()`) — object creation time. What the component *always* has.
2. **Binding constructor** (`$ClassName(...)`) — render time. What *specific children* were given.

The binding constructor is a method named after the class. `$BondOrchestrator` discovers it at runtime via `(chemical as any)[className]`. This convention requires no registration, no decorators, and no configuration — but it does mean a typo in the method name silently omits the binding constructor.

`assertViewConstructors` validates the prototype chain to ensure that if a child class has a binding constructor, its parent classes do too. This catches hierarchy violations but not missing-method typos.

### Self-reference and circularity

$Chemistry embraces self-reference:

- `$Catalogue.$subject = this` — a catalogue is its own subject
- `$type(undefined).$type === $type(undefined)` — types that ground the system refer to themselves
- `$Identity` — a referent's relationship with itself fills all three positions in the triple

These are not accidents. They are axiomatic foundations. When you encounter a circular reference in $Chemistry, it is likely intentional and load-bearing.

### Method binding on chemicals

In React, `onClick={this.method}` loses `this` binding. In $Chemistry, it works:

```typescript
class $Counter extends $Chemical {
    count = 0;
    increment() { this.count++; }
    view() {
        return <button onClick={this.increment}>+</button>;
    }
}
```

The molecule/bond system intercepts property access and method calls to maintain correct `this` binding and trigger reactivity. This is one of the framework's strongest usability wins — component authors write natural OO code and it just works in React.

### Export pattern

Components are exported as React components, never as `$Chemical` classes:

```typescript
// Inside the module:
class $Book extends $Chemical { ... }
const Book = new $Book().Component;

// Exported:
export { Book };
// or
export default function Page() { return <Book>...</Book>; }
```

The `$` never escapes the module boundary. Consumers import `Book`, not `$Book`. The `.Component` accessor is the membrane.

### Children as typed constructor arguments

React components receive children as `ReactNode` — an opaque blob. $Chemistry chemicals receive children as **typed binding constructor arguments**:

```typescript
class $Book extends $Chemical {
    chapters: $Chapter[] = [];
    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters;
    }
}
```

In JSX: `<Book><Chapter /><Chapter /></Book>`. The framework's `$BondOrchestrationContext` parses the JSX children tree and matches them against the binding constructor's parameter types. `$check()` validates types at bind time.

This means the component author *declares* what children it accepts, and the framework *enforces* it. No `React.Children.toArray()`, no type-guessing, no `as` casts.

### Reactive access via $use

The `$use()` free function (from the archive) extracts a renderable component from a bound chemical:

```typescript
const [Chapter, key] = $use(this.chapter, 'key');
return <Chapter key={key} />;
```

Without the `'key'` argument: `const Card = $use(this.card)` returns just the component. This bridges the gap between the chemical object model (where children are typed references) and React's rendering model (where components are functions).

## Formatting

- **No spaces inside parentheses.** `$check(label, $Label)` not `$check( label, $Label )`.
- **No spaces before colons in type annotations.** `name: string` not `name : string`.
- **Minimal semicolons.** Present on statements, absent on declarations where TypeScript doesn't require them. The code follows whatever the existing file does.
- **Single-line getters for simple properties.** `get $name(): string { return this[$name$]; }` — the entire accessor on one line.
- **Chained member access on one line.** `this[$of$] instanceof $ObjectiveRep ? this[$of$].isNullOfUndefined() : false` — ternaries stay inline unless they genuinely need wrapping.
- **Import groups.** Symbol imports use structural comments: `import {// $SubjectiveRep ... } from './symbols'`. This labels the group without adding a separate comment line.
- **JSX inline styles.** The app tests use inline `style={{}}` objects rather than CSS classes or styled-components. This keeps the examples self-contained.

## What not to do

- **Don't add blank lines for "readability."** The compression is intentional.
- **Don't add JSDoc or docstring comments.** The code documents itself.
- **Don't rename `$` variables to "clearer" names.** The `$` layering is the naming system.
- **Don't refactor `Object.create()` into class instantiation.** Delegation is the design.
- **Don't add type annotations where TypeScript can infer.** Explicit types on every variable adds noise.
- **Don't create helper functions for one-time operations.** Inline is fine. Inline is preferred.
- **Don't add error handling for impossible states.** Trust the framework's invariants internally. Validate at boundaries (`$check`, `assertViewConstructors`).
- **Don't expose `$`-prefixed names in consumer-facing APIs.** The membrane is sacred.

## See also

- [coding style] — the naming register; `$` membrane; brevity and grammatical mood.
- [chemistry overview][overview] — the architecture these conventions serve.
- [chemistry glossary] — the canonical vocabulary.

<!-- citations -->
[coding style]: ../coding-style.md
[chemistry glossary]: ./glossary.md
[symbols]: ../../../library/chemistry/src/symbols.ts
[overview]: ./overview.md
