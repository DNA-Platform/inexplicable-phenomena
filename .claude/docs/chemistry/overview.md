---
kind: reference
title: $Chemistry framework overview
status: stable
---

# $Chemistry framework overview

## What it is

$Chemistry is an object-oriented component framework built on React. It replaces React's functional-component-plus-hooks model with living objects that delegate behavior through prototypes, carry their own identity, and manage their own reactive state.

The framework draws from two language traditions that React itself does not: **Self's prototype delegation** (objects inherit directly from other objects, not from classes) and **Scheme's symbols and environments** (identity is carried by unforgeable symbol keys, and lookup walks a chain of scoped environments).

**The heart of $Chemistry is the React layer**: `$Particle` -> `$Chemical` -> `$Atom`. This is what we are building — a layer on top of React for the project's GitHub Pages site. Everything else (reflection, catalogue, semantics) is supporting infrastructure that will earn its keep through dependency injection and framework self-expression over time.

## Why it exists

React components are stateless functions. State lives in hooks, identity is a rendering concern, and type information is erased at runtime. $Chemistry inverts all three:

- **Objects are the components.** A `$Particle` is a real object with a prototype chain. Rendering is a method call on that object, not a function invocation by the framework.
- **The object IS the state.** React uses `useState` to manage state outside the component. $Chemistry puts state on the object itself. The framework uses React hooks for exactly two things: tracking identity and triggering re-renders. All application state lives on the particle.
- **Identity is intrinsic.** Every particle gets a unique CID (component identifier) and a symbolic name like `$Chemistry.MyThing[42]`. These are assigned at construction, not by the reconciler.
- **Lifecycle is awaitable.** A particle can `await this.next('mount')` — linear async code that resolves at the correct React lifecycle phase. No callback nesting, no dependency arrays, no stale closures.
- **Views are pure.** The `view()` method is a pure function of the object's state. No hooks. No side effects. The framework orchestrates everything around the view call.
- **Type information survives.** The [reflection system][reflection] can inspect any JavaScript value and produce a structured representation through role composition — the same value viewed as an object, a function, a type, a constructor, depending on context.

## The $ membrane

The `$` is the framework's core symbol. Read it as **"representation of."** A `$Chemical` is a representation of a component. A `$name` property is a representation of a prop. The `$` marks the boundary between intrinsic identity and extrinsic context — between what something IS and how it is being VIEWED.

On a component class, `$highlighted = false` is extrinsic — it flows in from the consumer via props. `count = 0` is intrinsic — the object owns it. The `$apply` mechanism maps incoming props by adding the `$` prefix: `highlighted` → `$highlighted`. Intrinsic properties are unreachable through props.

The framework has three audiences, and the `$` density changes at each layer:

1. **Component consumers** — write JSX. `<Counter />`, `<Book title="..." />`. They never see a `$`. The membrane is invisible.
2. **Component authors** — subclass `$Chemical`, declare `$props` with `$` prefixes, write `view()` methods. They see the `$` but it's a simple grammar: "put `$` on your props, write your view, export `$($YourClass)`."
3. **Framework developers** — work inside `$Particle`, `$ObjectiveRep`, `$Catalogue`. The `$` density is high, the patterns are strange, and the code is a piece of art. If this doesn't stretch your mind, you're not reading carefully enough.

### The grammar

- **`$Name`** (capital after `$`): a representation type. `$Particle`, `$Chemical`, `$Catalogue`. These are the machinery behind the glass.
- **`$name`** (lowercase after `$`): a representation of a prop. `$title` on a chemical becomes `title` on the component. The `$` appears in the class definition and vanishes at the `$()` boundary.
- **`$name$`** (trailing `$`): a Symbol key, defined in [symbols.ts][symbols]. Unforgeable identity tokens for internal slots — `$cid$`, `$type$`, `$template$`, `$bond$`. The double-dollar variants (`$$name$$`) mark static/class-level symbols.
- **`$x$`** (used as a local variable): a compilation artifact. When you need `const y = x as any`, the convention is `$x$` — it names the relationship ("I am the representation of x, for TypeScript's benefit") and the trailing `$` marks it as internal mechanism.
- **No `$` prefix**: the real thing. The component. The prop. What the consumer touches.

### Why so many dollars?

Because it's funny. The core codebase has variables like `$this`, `$$this`, `$view$`, `$$$type`, `$$$instance`. To comprehend this code you need to reason about what happens when a constructor returns another object, about a reflection system where every type of structural object is the same class, about a catalogue that is simultaneously a library and its own subject.

This is intentional. The framework's *use* is pragmatic — clean JSX, no ceremony. The framework's *implementation* is art. If you want to help write the core, let it stretch your mind. The `$` density is part of the experience.

## The bet against The Good Parts

The React community ran from classes. `class MyComponent extends React.Component` became the cautionary tale; hooks were the liberation. The consensus is that OOP in JavaScript was a mistake — Crockford's *The Good Parts* told us to use the good bits and pretend the rest doesn't exist.

$Chemistry burns that book.

Not because OOP-vs-FP is a real war, but because it isn't. JavaScript's lineage — Self's prototypes, Scheme's closures, Java's syntax — means the language can do things that neither the OOP camp nor the FP camp takes seriously. `Object.create()` is not a constructor call. A constructor that returns a different object is not a bug. Prototype delegation is not inheritance. Symbols are not "private fields by another name."

$Chemistry takes all of this seriously:

- **Prototype delegation over class instantiation.** `$Particle.use()` creates views via `Object.create()`, not `new`. `$ObjectiveRep.$as()` creates role views the same way. The only `new` calls are at the top-level entry points. Inside the framework, objects are born by delegation.
- **Constructor return as a design pattern.** `$Particle`'s constructor can return a different object than `this` — the "particular" pattern, where any structural thing in the codebase can be wrapped with particle behavior and made visible, renderable, introspectable.
- **Symbols as a grammatical system.** Not just for privacy — for creating a vocabulary of internal slots that participate in prototype delegation (unlike `#private` fields, which don't cross `Object.create()` boundaries). Symbols travel with the prototype chain; `#private` fields stay with their declaring class. The framework uses symbols where delegation matters and `#private` where encapsulation matters.
- **OOP and FP as complements.** A `$Chemical` is an object — it has state, identity, a prototype chain. Its `view()` method is a pure function of that state. The object model manages identity and lifecycle; the functional model manages rendering. They are not at odds.

React developers will look at this and say "you can't do that." Then they'll watch it work.

## The dual constructor

Every `$Chemical` has two constructors, corresponding to two fundamentally different moments:

1. **The class constructor** (`constructor()`) — runs once, at object creation time. Defines properties, initializes state. The template is born here. This is what the component *always* has.

2. **The binding constructor** (a method named after the class: `$Book(...)`, `$CardContainer(title, card)`) — runs at render time when children arrive as JSX. Receives bound children as typed arguments, validates them with `$check`, stores references. This is where the component becomes real — where it binds to its specific children.

React smooshes both moments into one function call. $Chemistry separates them because they are different things. One chemical can represent an enormous amount of behavior across these two constructors: anything you can do at instance creation time, and anything you can do at render time.

The binding constructor is discovered at runtime: `$BondOrchestrator` looks up `(chemical as any)[className]` — a method named after the class. The `assertViewConstructors` validation walks the prototype chain ensuring the convention is followed up the hierarchy.

## Coding style

The code is dense, the names are short, and the `$` count is high. This is deliberate.

- **Compression.** No whitespace between logical units. No blank lines inside methods. Each line carries maximum meaning. "If the code can't be compressed, it must not be simple enough."
- **Short, specific names.** `$this`, `$view`, `$lib` — not `currentParticleInstance` or `viewFunctionWrapper`. Context provides meaning; longer names add noise.
- **Variable layering.** `$this`, `$$this`, `$$$type`. Each `$` marks a level of indirection or transformation. The `$` count *is* the documentation.
- **Constructor return tricks.** `$Particle` can return a different object than `this`. `$Component$` returns a function. `$Catalogue` returns itself as its own subject. What you construct and what you get back are not the same thing. That is the lesson.
- **Everything earns its existence.** No explanatory comments. No blank lines for "readability." No utility functions. If something is there, it is load-bearing. If it is not there, you do not need it.
- **Prototype delegation over instantiation.** `Object.create()` appears in `$Particle.use()`, `$Component$.createChemical()`, `$ObjectiveRep.$as()`, `$Referent.$as()`. The only `new` calls are at entry points. Inside the framework, objects are born by delegation.

See [coding conventions][conventions] for the complete style guide.

## Chemistry as metaphor

The naming is not decorative. It is a precise mapping.

A **particle** is the smallest thing that can live in React. In physics, a particle has identity (spin, charge) and behavior (it interacts). In $Chemistry, `$Particle` has identity (CID, symbol), behavior (view), and lifecycle (mount, layout, effect, unmount). It is the irreducible unit — the smallest thing with a heartbeat.

A **chemical** is what happens when particles bond. Chemistry is the science of how things combine, react, and transform. `$Chemical` is what happens when particles get parent-child relationships, reactive bonds, and lifecycle. The molecule is the bond graph. The reaction is the lifecycle. The bond orchestrator orchestrates how children bind to parents.

An **atom** is a formed chemical — something that has undergone formation and has memory. In chemistry, atoms are the stable building blocks that participate in reactions. In $Chemistry, `$Atom` is a chemical that has been formed, initialized, and remembers its state across lifecycle transitions.

Chemistry is the intersection of object and function. In real chemistry, a molecule is a structure (object) that undergoes reactions (functions). The structure determines what reactions are possible; the reactions transform the structure. That is exactly what a `$Chemical` is: an object whose `view()` is a pure function of its state, and whose reactive bonds transform that state in response to events.

OOP people see the object. FP people see the function. Chemists see both, because chemistry does not distinguish between what something *is* and what it *does*.

*Chemistry is the science of how objects react. $Chemistry is the framework.*

## The re-render model

**Call `view()`. Diff the output. If it changed, tell React to update.**

The v1 framework used property interception — every reactive field was replaced with a getter/setter via `Object.defineProperty`, and reads/writes were tracked to decide whether to re-render. The new design eliminates this entirely. Methods are the mutation points. When a method runs (`increment()`, `handleClick()`, `loadData()`), the framework calls `view()`, compares the output to the last rendered output with a fast ReactNode comparator, and triggers React only if something changed.

This means:
- `view()` is truly **stateless relative to React**. No `useState`, no `useEffect`, no hooks inside views. The chemical object holds all the state. React just receives the output.
- The **decision to re-render** is purely "did the view output change?" — not "which properties were accessed during the last render?" The ReactNode comparator walks the virtual DOM tree and halts at the first difference.
- **Bonds become structural metadata.** A bond still knows whether a property is a field, a getter, or a method. It still supports serialization via `formula()`. But it no longer replaces the property with interceptors.
- **Methods are the trigger.** `$Bonding` wraps method calls and schedules a diff check after each. Properties don't trigger anything — they're just properties.
- The **lifecycle** (mount, layout, effect, unmount) is on `$Particle` via `next(phase)`. Async operations await lifecycle phases with linear code: `await this.next('mount')`.

This is the big architectural bet. It replaces ~600 lines of property interception with a single tree walk that simultaneously transforms chemistry nodes and detects changes. Unchanged subtrees return cached references — React's reconciler sees `===` and skips them entirely. The framework's identity model (CIDs, particle phase state) enables particle-aware short-circuiting: if a child chemical hasn't been touched since the last render, its entire subtree is skipped without walking into it.

## Layer architecture

The framework is organized in four layers, each building on the one below.

### Foundation: symbols and types

[symbols.ts][symbols] defines the Symbol keys that serve as internal slots on framework objects. These are grouped by owner -- `$Particle` symbols, `$Chemical` symbols, `$Atom` symbols, `$ObjectiveRep` symbols -- and are the mechanism that keeps framework internals invisible to normal property enumeration.

[types.ts][types] defines the TypeScript type vocabulary: `$Props`, `$Component`, `$View`, `$Properties` (which extracts the `$`-prefixed properties from a class and maps them to a props interface), and `$Parameter` (a recursive type that maps constructor types to their resolved forms).

### Primitives: $Particle and $Catalogue

**[$Particle][particle]** is the base class for all framework objects. It provides:

- CID assignment and symbolic naming (`$Chemistry.ClassName[n]`)
- A prototype-delegating `use()` method that creates derived views via `Object.create()`
- Template tracking -- the first instance of each type becomes its template, and rendering a template auto-derives a fresh instance
- Prop application through the `$apply` protocol (maps `{name: value}` to `$name = value`)
- A `view()` method that returns `ReactNode`, making every particle directly renderable

The `use()` method is the heart of the Self influence. Rather than creating a new component, it creates a new prototype-linked object that delegates to the original. The view function closes over this derived object, so rendering forks identity without duplicating state.

**[$Catalogue][catalogue]** is the environment/scope system, inspired by Scheme's environment model. A catalogue is a key-value store where keys are `$Rep` references (anything with a `$ref` string). Catalogues form chains via `$new()` and `$including()` -- a child catalogue delegates `$find()` lookups to its parent topics, walking the chain until a match is found. The global `$lib` catalogue is the root of the framework's type registry.

The catalogue also tracks subjects (who can access it) and supports `$deref()` for cleanup, making it a scoped, garbage-collectible environment.

### Composition: $Chemical

**[$Chemical][chemical]** extends `$Particle` with the machinery for reactive component composition: parent-child relationships, component binding, lifecycle phases (mount, render, layout, effect, unmount), a molecule (reactive bond system), and an orchestrator.

Currently, `$Chemical` is **skeletal**. The class exists and establishes the extension point, but most of its body is commented out -- the molecule, reaction, orchestrator, lifecycle methods, prop generation, and component creation are all present as commented code referencing the [archive][archive] implementations. The parent tracking and view constructor validation are live.

### Integration: $Atom (planned)

The [symbols file][symbols] defines `$Atom` symbols (`$formed$`, `$formation$`, `$remembered$`), but no `$Atom` class exists yet. This is the planned top layer where formed, stateful components with memory would live.

## Reflection system

The [reflection module][reflection] provides runtime type introspection for arbitrary JavaScript values. It is **supporting infrastructure** — not the point of the framework, but the mechanism that will power dependency injection and framework self-expression.

### Architecture: one class, many roles

The reflection system uses a **single implementation class** (`$ObjectiveRep`, extending `$SubjectiveRep`) rather than a multi-class hierarchy. Every JavaScript value — object, function, primitive, type, constructor, parameter, member — is represented by the same class, distinguished only by its **role**.

The `role(of)` pattern is the core abstraction. A representation carries a role (what it is in this context) and an `of` (what it is relative to). For example:
- `type(String)` — String viewed as a type, in the context of JavaScript
- `prototype(String)` — String's prototype, in the context of the String type
- `instance(type(String))` — a string instance, in the context of its type
- `member(prototype)` — a member, in the context of a prototype

Role transitions use `$as(role)` and `$of(target)`, both of which create lightweight **prototypal views** via `Object.create()`. The underlying literal and shared state are inherited through the prototype chain; only the role and perspective change. This mirrors the same `Object.create()` pattern used in `$Particle.use()`.

### Self-referential types

Types that have no type above them (like `undefined`, or `Object`) point their `$type` back to themselves. This is not a bug — it is the axiomatic foundation. `$type(undefined).$type === $type(undefined)`. These are the fixed points of the type system.

### Entry points

- `$type(Constructor)` — obtain a type representation from a known constructor
- `$typeof(value)` — obtain the type of a runtime value
- `$instanceof(value)` — obtain a role-specific representation of a value

### Future direction

The reflection system exists to support **dependency injection**. The ability to introspect types, parameters, constructors, and members at runtime is the foundation for a DI container that can resolve dependencies by type. Framework code will also be expressible reflectively — the bet is that the framework's own structure can be described and manipulated through this system.

## Semantics layer

The [reference module][reference] provides the **theoretical primitives** from Semantic Reference Theory (SRT) out of which the more standard reflection system was built. A `$Referent` is an identity that can be viewed through different roles via `$as()` — the same referent seen as a subject, an object, or a relationship.

The SRT layer models:
- `$Reference` — "this symbol stands for that thing" (x =x> y where x != y)
- `$Relationship` — a subject-object-relationship triple (all three must differ)
- `$Identity` — a self-referential triple (a thing's relationship with itself)
- `$Representative` — delegation (one thing standing in for another)
- `$Property` — structural membership (a property belongs to an object)

The design principle: structure is dynamic in JavaScript and always was. The type system is dynamic. People can build new ones and use a reflection system built on these primitives to do so. Eventually, $Chemistry will have its own domain-specific reflection system built on these foundations.

## Current status

| Layer | Module | Status |
|-------|--------|--------|
| Foundation | [symbols.ts][symbols] | Complete -- all symbol keys defined |
| Foundation | [types.ts][types] | Complete -- full type vocabulary |
| Primitives | [$Particle][particle] | Working -- CID, symbols, `use()`, rendering. Lifecycle moving here (sprint 8) |
| Primitives | [$Catalogue][catalogue] | Working -- scoped environments, topic chains, deref |
| Reflection | [reflection.ts][reflection] | Working -- `$instanceof`, `$typeof`, `$type`, `$ObjectiveRep` |
| Semantics | [reference.ts][reference] | Working -- referents, roles, relations |
| Composition | [$Chemical][chemical] | Lifted -- molecule, reaction, orchestrator, lifecycle, component creation all wired |
| Integration | [$Atom][atom] | Lifted -- formation lifecycle, $Persistent with localStorage |

## The archive directory

The v1 archive (a monolithic implementation file) was the source for the current modular codebase, lifted in sprint 5. The archive has been deleted — the modular source in `library/chemistry/src/chemistry/` is the living code. The original `../chemistry` repo preserves the v1 source and a Next.js test app with visual component tests.

## See also

- [chemistry glossary] — every term, organized by layer.
- [chemistry file map] — every source file, what depends on what.
- [reactivity contract] — the one-paragraph behavioural promise.
- [performance contract] — what the framework costs at runtime.
- [coding conventions], [coding style] — the code-level register.
- The eight per-concept feature pages under `features/` — start with [`$Particle`][feat-particle].

> Note: some source-link paths in the citations below predate the sprint-23 module reshuffle (`src/reflection.ts` → `src/implementation/reflection.ts`, `src/chemistry/*` → `src/abstraction/*`). They are accurate-in-spirit, stale-in-detail. Sweep is on the L-3 carry-forward list.

<!-- citations -->
[chemistry glossary]: ./glossary.md
[chemistry file map]: ./file-map.md
[reactivity contract]: ./reactivity-contract.md
[performance contract]: ./performance-contract.md
[coding style]: ../coding-style.md
[feat-particle]: ./features/particle.md
[conventions]: ./coding-conventions.md
[symbols]: ../../library/chemistry/src/symbols.ts
[types]: ../../library/chemistry/src/types.ts
[particle]: ../../library/chemistry/src/chemistry/particle.tsx
[catalogue]: ../../library/chemistry/src/catalogue.ts
[chemical]: ../../library/chemistry/src/chemistry/chemical.ts
[atom]: ../../library/chemistry/src/chemistry/atom.ts
[reflection]: ../../library/chemistry/src/reflection.ts
[reference]: ../../library/chemistry/src/semantics/reference.ts
[archive]: ../../library/chemistry/src/archive
