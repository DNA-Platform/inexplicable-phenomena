# $Chemistry framework overview

## What it is

$Chemistry is a type-reflective, metadata-driven component framework built on React. It replaces React's functional-component-plus-hooks model with an object-oriented prototype chain where components are living objects that delegate behavior through prototypes, carry their own type metadata, and manage their own reactive state.

The framework draws from two language traditions that React itself does not: **Self's prototype delegation** (objects inherit directly from other objects, not from classes) and **Scheme's symbols and environments** (identity is carried by unforgeable symbol keys, and lookup walks a chain of scoped environments).

## Why it exists

React components are stateless functions. State lives in hooks, identity is a rendering concern, and type information is erased at runtime. $Chemistry inverts all three:

- **Objects are the components.** A `$Particle` is a real object with a prototype chain. Rendering is a method call on that object, not a function invocation by the framework.
- **Identity is intrinsic.** Every particle gets a unique CID (component identifier) and a symbolic name like `$Chemistry.MyThing[42]`. These are assigned at construction, not by the reconciler.
- **Type information survives.** The [reflection system][reflection] can inspect any JavaScript value -- objects, functions, primitives -- and produce a structured representation (`$Object`, `$Function`, `$Primitive`, `$Type`) that carries role, prototype chain, members, and constructor metadata.

## The $ prefix convention

The `$` prefix is the framework's core naming convention, borrowed from Scheme's approach to marking special forms:

- **`$Name`** (capital after `$`): a reactive type or component. `$Particle`, `$Chemical`, `$Catalogue`. These are the "live" parts of the system.
- **`$name`** (lowercase after `$`): a reactive property or accessor on an instance. Props flow in as `name` and are stored as `$name`, making the boundary between external input and internal state visible in the naming.
- **`$name$`** (trailing `$`): a Symbol key, defined in [symbols.ts][symbols]. These are unforgeable identity tokens used for internal slots -- `$cid$`, `$type$`, `$template$`, `$bond$`. The double-dollar variants (`$$name$$`) mark static/class-level symbols.
- **No `$` prefix**: inert. Plain JavaScript with no framework semantics.

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

The [reflection module][reflection] provides runtime type introspection for arbitrary JavaScript values. The core functions mirror JavaScript's own type operations but return rich, role-aware representations:

- `$instanceof(value)` -- returns a representation carrying the value's role (object, function, primitive, array), its type chain, and its members
- `$typeof(value)` -- returns the type representation, resolving primitives to their wrapper types
- `$type(Type)` -- returns a type representation from a constructor

These return interfaces (`$Object`, `$Function`, `$Primitive`, `$Type`) that support role-casting (`$as`), role-checking (`$is`), and member introspection (`$members`, `$methods`, `$properties`, `$fields`).

## Semantics layer

The [reference module][reference] builds a formal referent system on top of `$Catalogue`. A `$Referent` is an identity that can be viewed through different roles via `$as()` -- the same referent seen as a subject, an object, or a relationship. This supports `$Relation`, `$Relationship`, `$Reference`, `$Representative`, `$Property`, and `$Identity` -- the relational primitives for describing how things in the framework relate to each other.

## Current status

| Layer | Module | Status |
|-------|--------|--------|
| Foundation | [symbols.ts][symbols] | Complete -- all symbol keys defined |
| Foundation | [types.ts][types] | Complete -- full type vocabulary |
| Primitives | [$Particle][particle] | Working -- CID, symbols, `use()`, template, rendering |
| Primitives | [$Catalogue][catalogue] | Working -- scoped environments, topic chains, deref |
| Reflection | [reflection.ts][reflection] | Working (200+ lines) -- `$instanceof`, `$typeof`, `$type` |
| Semantics | [reference.ts][reference] | Working -- referents, roles, relations |
| Composition | [$Chemical][chemical] | Skeletal -- class exists, most body commented out |
| Integration | $Atom | Empty -- symbols defined, no implementation |

## The archive directory

The [archive][archive] contains the v1 implementations that the current codebase is being rewritten from. The commented-out code in `$Chemical` references archive types like `$Molecule`, `$Reaction`, `$BondOrchestrator`, and `$Component$`. The archive serves as both a working reference for the target behavior and a source of type imports during the migration. It is not part of the public API.

<!-- citations -->
[symbols]: ../../library/chemistry/src/symbols.ts
[types]: ../../library/chemistry/src/types.ts
[particle]: ../../library/chemistry/src/chemistry/particle.tsx
[catalogue]: ../../library/chemistry/src/catalogue.ts
[chemical]: ../../library/chemistry/src/chemistry/chemical.ts
[reflection]: ../../library/chemistry/src/reflection.ts
[reference]: ../../library/chemistry/src/semantics/reference.ts
[archive]: ../../library/chemistry/src/archive
