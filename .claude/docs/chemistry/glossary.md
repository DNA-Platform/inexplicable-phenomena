# $Chemistry Glossary

A concept glossary for the $Chemistry framework, organized by architectural layer.

---

## 1. Foundation

### Symbol

A JavaScript `Symbol` used as a property key to store internal state on $Chemistry objects. All framework-internal properties are keyed by symbols (e.g., `$cid$`, `$type$`, `$bond$`) so they never collide with user-defined properties. The [symbols module][symbols] exports every symbol used across the particle, chemical, atom, and reference layers.

Critically, symbol-keyed properties **travel with the prototype chain** — when `Object.create()` creates a prototypal view, symbol properties on the prototype are accessible through the view. This is why `$Particle` uses symbols rather than `#private` fields: `use()` creates views via `Object.create()`, and those views need to read `$cid$`, `$type$`, `$template$` from their prototype.

### Symbols vs #private

The codebase uses both symbols and `#private` fields for hidden state. The choice is not arbitrary:

- **Symbols** — used where prototype delegation matters. `$Particle`, `$Chemical`, `$ObjectiveRep`, and `$Referent` all use symbols because their core mechanics involve `Object.create()`. A prototypal view inherits symbol-keyed properties from its prototype.
- **`#private` fields** — used where encapsulation matters and delegation doesn't. `$Catalogue` uses `#private` because catalogues are standalone containers, never prototype-delegated. `#private` fields are lexically scoped to the declaring class and cannot leak through `Object.create()`.

If the object participates in `Object.create()` delegation: symbols. If it doesn't: `#private`.

### $ prefix (the membrane)

The `$` means "representation of." It marks the boundary between the framework's model and the consumer's reality. Read `$Chemical` as "representation of a chemical component." Read `$title` as "representation of the title prop."

The `$` density varies by audience:

- **Component consumers** never see `$`. They write `<Counter />` and pass `title="..."`. The membrane is invisible.
- **Component authors** use `$` as a simple grammar: `$props` in class definitions become bare props at the `.Component` boundary.
- **Framework developers** swim in `$`. Variables like `$this`, `$$this`, `$view$`, `$$$type` are normal. The density is part of the experience — and part of the humor.

When React props are applied via [`$apply$`][particle], each prop key is automatically prefixed with `$` before being set on the instance. The `$name$` double-dollar-sign bracketing convention marks Symbol keys, separate from user-facing `$name` properties.

### .Component boundary

The point where `$` disappears. A component author writes `class $Display extends $Chemical` with `$text` as a prop, then exports `const Display = new $Display().Component`. Consumers import `Display` and write `<Display text="Hello" />`. The `.Component` accessor (currently being reworked) produces a React component whose props interface mirrors the `$`-prefixed properties with the `$` stripped. This is the membrane made concrete.

### $Rep

The foundational representation interface, defined in [types][types]. A `$Rep<T>` is any object that carries a `$ref: string` identifier. It serves as the universal "reference ticket" that the [$Catalogue][catalogue] uses for indexing, lookup, and dereferencing. Both the reflection system's `$ObjectiveRep` and the semantics system's `$Referent` implement this interface.

### Type

A TypeScript utility type defined as `Constructor<T> & { name: string }` in [types][types]. It represents any named constructor function -- the intersection of being callable with `new` and having a `.name` property. This is $Chemistry's canonical way to refer to a class or type at runtime.

### Typeof

A string literal union type matching JavaScript's `typeof` operator results: `"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"`. Used by the [reflection system][reflection] to classify literals at the JavaScript language level before mapping them to richer `$ObjectiveRep` representations.

### PrimitiveType

A union of JavaScript primitive wrapper constructors: `typeof String | typeof Number | typeof BigInt | typeof Boolean | typeof Symbol`. The [types module][types] maintains a `primitives` map from `Typeof` strings to their corresponding `PrimitiveType` constructors, and a `primitiveTypes` set for membership checks. The reflection system uses these to bridge between `typeof` results and their constructor-based type representations.

---

## 2. Particle Layer

### $Particle

The base class for all framework objects, defined in [particle.tsx][particle]. A `$Particle` has identity ([`$cid$`](#cid), [`$symbol$`](#symbol-1)), a type reference ([`$type$`](#type-1)), a view function, and lifecycle (`await this.next('mount')` etc.). It is the smallest thing that lives in React — the irreducible unit with a heartbeat. Construction wires up identity, and the constructor supports the [particular pattern](#particular).

### particular

The pattern where `$Particle`'s constructor receives a non-Particle object as its argument, sets the particle as the object's prototype (via `Object.setPrototypeOf`), and **returns the original object** instead of `this`. The result is an object that has particle behavior (CID, symbol, view, `use()`) through prototype delegation but is not `instanceof $Particle`.

This is the Self philosophy made literal: any structural thing in the codebase can be made visible, renderable, and introspectable by wrapping it with particle behavior. Caught exceptions, middleware chains, scope objects — if it has structure, it can become a particle without changing what it is. The exact use cases are still being discovered; the pattern exists because the philosophy demands it.

### $cid$

The **chemical identity** symbol, storing a unique auto-incrementing integer on each `$Particle` instance. Generated by the static `$$getNextCid$$` method, starting from 1. The cid is embedded in the particle's string symbol (e.g., `$Chemistry.MyClass[42]`) and used as the primary identity discriminator across the framework.

### $symbol$

A symbol-keyed property storing the particle's human-readable string identifier, formatted as `$Chemistry.{ClassName}[{cid}]`. Generated by the static `$$createSymbol$$` method during construction. Particles also override `toString()` to return this value, so they can be used directly in string contexts and as map keys.

### $type$

A symbol-keyed property storing a reference to the particle's constructor function. Set during construction via `this.constructor`, it provides runtime type identity. The reflection system's `$type()` function and the particle's `$isTemplate$` check both rely on this property to navigate the type hierarchy.

### $template$

A symbol-keyed property pointing to the particle instance that serves as the prototype template for its view. During construction, each particle sets `$template$` to itself. The class-level template (the first instance created for each class) is stored separately on the static `$$template$$` property and is identified by the `$isTemplate$` getter.

### $isTemplate$

A computed getter that returns `true` when the particle is the static template singleton for its class. Specifically, it checks whether `this == this[$type$][$$template$$]`. Template instances receive special treatment in the `use()` method: when a template's view is invoked, it automatically creates a new derived instance rather than rendering on the template itself.

### view()

The primary render method on `$Particle`. By default it returns `this.toString()` (the particle's symbol string). Subclasses override `view()` to produce their own `ReactNode` output. The `use()` method wraps `view()` into a `$View` function that carries both the view implementation (`$view`) and the instance (`$this`), enabling view-instance decoupling and hot-swapping.

### use()

A method on `$Particle` that wraps a view function into a `$$Component` -- a callable React component carrying `$view` (the implementation) and `$this` (the instance). When the resulting component is called with props, it applies those props via [`$apply$`](#apply), runs [`$bond$`](#bond), then invokes the view implementation bound to the instance. If the particle already owns a view, `use()` creates a prototype-derived copy with a fresh cid, ensuring each `use()` call produces an independently identifiable component.

### $apply$

A symbol-keyed protected method on `$Particle` that receives React props and maps them onto the particle instance. It stores `props.children` into `$children$`, then iterates remaining props (skipping `children`, `key`, and `ref`) and sets each as `$` + propName on the instance. This is the mechanism by which React's declarative props become imperative state on a particle.

### $bond$

A symbol-keyed protected method on `$Particle` that serves as a lifecycle hook called after props are applied but before the view renders. The base implementation is a no-op. `$Chemical` overrides this to orchestrate reactive bonding, molecular reactivation, and other side effects that must run between prop application and rendering.

### Particle (the export)

The default module export from [particle.tsx][particle], defined as `new $Particle()`. This is the universal particle template instance -- the first `$Particle` ever created, which becomes `$Particle[$$template$$]`. It can be used directly as a React component (since `use()` was called during construction) or as the base template for prototype-derived particles.

---

## 3. Chemical Layer

### $Chemical

A subclass of `$Particle` defined in [chemical.ts][chemical] that adds parent-child relationships, component binding, lifecycle management, and the [dual constructor](#binding-constructor) pattern. Chemicals introduce the [`$parent$`](#parent) hierarchy, the [`$isBound$`](#isbound) state, and the [`$component$`](#component-1) binding. The planned integration with `$Molecule`, `$Reaction`, and `$BondOrchestrator` provides reactive state management and lifecycle phases (mount, render, layout, effect, unmount).

### binding constructor

A method on a `$Chemical` subclass named after the class itself (e.g., `$Book(...)` on class `$Book`). This is the second of two constructors every chemical has. The class constructor (`constructor()`) runs at object creation time; the binding constructor runs at render time when children arrive as JSX. The binding constructor receives bound children as typed arguments, validates them with `$check`, and stores references. The `$BondOrchestrator` discovers it at runtime by looking up `(chemical as any)[className]`.

This separation is what makes a chemical component fundamentally bigger than a React component: anything you can do at object creation time *plus* anything you can do at render time. Two moments, two constructors, one component.

### prototypal shadowing

The mechanism by which the same bound instance can appear in multiple places with different prop overrides. When a bound chemical is rendered with props, the framework creates a prototypal layer (via `Object.create()`) that shadows only the specified properties. Unshadowed properties inherit from the original instance through the prototype chain. Changing a non-shadowed property on the original updates all views; changing a shadowed property only affects the view that owns the shadow.

This is demonstrated in the sharing tests: one `$Card` rendered as `<Card />` and `<Card background="#ffe0b2" />`. The second render shadows `$background` but inherits `$border`, `$text`, etc. Change the border on the original and both update. Change the background on the original and only the first updates.

### $parent$

A symbol-keyed property on `$Chemical` providing the parent chemical in the composition hierarchy. The getter reads from the private `$$parent$$` backing field. The setter enforces two invariants: the parent must be defined, and it can only be set once. This creates a write-once parent link forming an immutable tree structure.

### $component$

A symbol-keyed property on `$Chemical` that holds the `$Component` instance this chemical is bound to. The `$Component` type (from [types][types]) is a React functional component augmented with `$bound`, `$chemical`, `$bind()`, and `$new()` methods. This property bridges the gap between $Chemistry's object model and React's component model.

### $isBound$

A computed getter on `$Chemical` that returns `true` when the chemical is the active backing instance of its component. Specifically, it checks `this == this[$component$]?.$chemical`. A chemical can exist without being bound (e.g., as a template or after being replaced), and this property distinguishes the live binding from detached instances.

### Bond

A reactive connection within the molecular system (from the v1 architecture, currently commented out). Bonds track individual reactive properties on a chemical, recording whether a property is a "prop" (externally driven) and caching its last value. The `$Molecule` aggregates bonds and reactivates them during rendering.

### Molecule

The reactive state container for a `$Chemical` (v1 architecture, referenced as `$Molecule` in commented-out code). A molecule owns the set of bonds for its chemical, handles reactivation (re-reading reactive values), and manages its own destruction lifecycle. It is the internal mechanism that makes chemical properties reactive.

### Reaction

The lifecycle coordinator for a `$Chemical` (v1 architecture, referenced as `$Reaction` in commented-out code). A reaction drives the chemical through its lifecycle phases: mount, render, layout, effect, and unmount. Each phase is async, allowing chemicals to perform asynchronous setup and teardown.

---

## 4. Atom Layer

### $Atom

A planned extension of the chemical hierarchy (symbols declared in [symbols.ts][symbols] but class not yet implemented). Atoms are chemicals that have undergone formation -- a one-time initialization process that transforms them from inert templates into active, stateful participants. The atom layer will add formation lifecycle and memory (remembered state) on top of the chemical's reactive bonding.

### $formed$

A symbol declared for the `$Atom` layer representing whether an atom has completed its formation process. Once formed, an atom is considered fully initialized and ready to participate in the system. This is a write-once flag analogous to `$isBound$` on chemicals.

### $formation$

A symbol declared for the `$Atom` layer representing the formation process or configuration that an atom undergoes during initialization. Formation is the atom-layer equivalent of a constructor body -- a lifecycle phase where the atom acquires its initial state and wires up its dependencies.

### $remembered$

A symbol declared for the `$Atom` layer representing persistent state that survives across an atom's lifecycle transitions. Remembered state is state the atom retains even when unmounted and remounted, distinguishing it from transient reactive state managed by bonds and molecules.

---

## 5. Catalogue

### $Catalogue

The knowledge-management class defined in [catalogue.ts][catalogue]. A catalogue is a key-value store keyed by `$Rep` references, organized into a topic chain for inheritance. It supports creating child catalogues (`$new`), isolated catalogues (`$empty`), multi-parent catalogues (`$including`), and full lifecycle management via `$deref`. Catalogues use private fields for their internal maps, guaranteeing that children cannot access or mutate parent internals directly.

### $lib

The root `$Catalogue` instance, constructed with the name `"$Chemistry"` and exported from [catalogue.ts][catalogue]. It serves as the global registry for the framework -- the reflection system indexes type representations here, and the semantics layer creates its own subject catalogue derived from it. All framework-level lookups start from `$lib`.

### $subject

A property on each `$Catalogue` instance that holds its subject identity. In the "elegant self-reference" pattern, a catalogue's `$subject` is itself -- creating a circular identity where the catalogue is simultaneously the container and the thing contained. Externally, `$subject` acts as an opaque capability token: passing it to another catalogue's `$find()` enables delegation without exposing internals.

### $find()

The lookup method on `$Catalogue`. Given a `$Rep` reference, it first checks its own literature (using the `$ref` string for canonical matching), then walks its topics chain in order. When called with a subject argument, it delegates to that subject if it is a known child catalogue. Returns `undefined` when no match is found. First-match-wins semantics mean topic order determines shadowing priority.

### $index()

The write method on `$Catalogue`. Given a `$Rep` reference and a literal value, it stores the value in its own literature, establishing a canonical `$Rep` for that `$ref` string on first write. When called with a subject argument, it delegates the write to that subject if recognized. Re-indexing the same `$ref` string overwrites the previous value.

### $deref()

The removal and destruction method on `$Catalogue`. With no arguments, it marks the catalogue as dereferenced, clears all internal state, and makes the catalogue permanently non-responsive (all subsequent operations return `undefined`). With a `$Rep` argument, it removes that specific reference. With a `$Catalogue` argument, it removes that catalogue from the topics chain. With both a `$Rep` and a subject, it delegates the removal.

### $new()

A method on `$Catalogue` that creates a child catalogue inheriting from the parent. The child's topics chain includes the parent as its sole topic, so `$find()` on the child falls through to the parent for missing references. The parent tracks the child in its subjects set, enabling delegation via `$find(ref, child)`. The child's name is derived from the parent's name with a `$` prefix.

### $empty()

A method on `$Catalogue` that creates a completely isolated catalogue with no inheritance. Unlike `$new()`, the resulting catalogue has an empty topics chain, so it cannot see the parent's literature. However, the parent still tracks it as a known subject for delegation purposes.

### $including()

A method on `$Catalogue` that creates a child catalogue inheriting from multiple topics. It accepts any number of catalogues as arguments, filters out non-`$Catalogue` values silently, and appends the parent itself as the last topic. Lookup walks topics in argument order, so the first topic's values take priority over later ones and the parent's.

### topic

A catalogue that appears in another catalogue's topics chain. Topics form the inheritance graph: when `$find()` does not match in a catalogue's own literature, it walks its topics in order, delegating the lookup to each. Topics are added via `$new()` (which adds the parent as the sole topic) or `$including()` (which adds multiple catalogues plus the parent).

### literature

The internal `Map<$Rep, any>` within a `$Catalogue` that stores the actual indexed values. Literature is private (a `#` field), so it is only accessible through the `$find()` and `$index()` API. Each entry maps a canonical `$Rep` instance to its stored literal value.

### reference

A mapping from a `$ref` string to its canonical `$Rep` object, maintained in the catalogue's private `#references` map. When multiple `$Rep` objects share the same `$ref` string, the catalogue treats them as equivalent by resolving them all to the first canonical `$Rep` encountered. This deduplication ensures that identity is based on the `$ref` string, not object identity.

---

## 6. Reflection

### $SubjectiveRep

The abstract base class for the reflection system, defined in [reflection.ts][reflection]. A `$SubjectiveRep` carries a role (`$role$`), a perspective (`$of$`), a reference string (`$ref$`), a canonical identity (`$canonical$`), and a map of role views (`$roles$`). It provides `$as(role)` and `$of(target)` methods that create prototypal views via `Object.create()`, allowing a single representation to be viewed from multiple perspectives without duplicating state. The "subjective" name reflects that the representation is always from a point of view — there is no view-from-nowhere.

### $ObjectiveRep

The concrete implementation class extending `$SubjectiveRep`, defined in [reflection.ts][reflection]. It adds a `literal` (the actual JavaScript value being represented), a `typeof` classification, and all the member introspection machinery. Despite the many interfaces it satisfies (`$Object`, `$Function`, `$Type`, `$Primitive`, `$Member`, etc.), there is only one implementation class. The different interfaces are **guard rails** — TypeScript constraints on valid transitions between roles. The JavaScript runtime can do anything; the interfaces constrain what we consider valid.

### role(of) pattern

The core abstraction of the reflection system. Every `$ObjectiveRep` has a **role** (what it is in this context) and an **of** (what it is relative to). The `$ref` string reads like natural language: `type(String)`, `prototype(String)`, `instance(type(String))`, `member(prototype(Array))`. Role transitions via `$as()` and perspective changes via `$of()` both create lightweight `Object.create()` views that share the underlying state.

### Self-referential type

A type whose `$type` property points back to itself. This occurs at the axiomatic foundations of the type system: `$type(undefined).$type === $type(undefined)`. These are the fixed points — types that have no metatype above them because they ground the system. `undefined`, `null`, and `Object.prototype` are the three axiomatic foundations from which all other type relationships derive.

### $type()

An entry-point function in the [reflection module][reflection] that takes a `Type` or `TypeofType` (constructor, primitive wrapper, null, or undefined) and returns a `$Type` or `$PrimitiveType` representation. It creates an `$ObjectiveRep` with the role `'type'` and registers it in `$lib`. This is the primary way to obtain a reflective type descriptor for a known constructor.

### $typeof()

An entry-point function in the [reflection module][reflection] that takes any literal value and returns the `$Type` or `$PrimitiveType` of that value. For primitives, it maps through the `primitives` table to the wrapper constructor. For objects, it walks the prototype chain to find the constructor. The result is a type representation with an instance-of relationship to the input value.

### $instanceof()

An entry-point function in the [reflection module][reflection] that takes any literal value and returns a role-specific representation: `$Primitive` for primitive values, `$Function` for functions, `$Array` for arrays, or `$Object` for everything else. It first obtains the type via `$$typeof`, then extracts the `$of` (instance) relationship from that type to return the appropriately-roled representation.

### $members()

A method on `$ObjectiveRep` and on the reflection interfaces (`$Object`, `$Type`, etc.) that returns an array of `$Member` representations for the object's properties. With `'own'` (the default), it returns only own property descriptors. With `'all'`, it includes inherited members from the type chain. Each member carries metadata about configurability, enumerability, readability, and writability.

### $fields()

A method on the reflection interfaces that returns an array of `$Field` representations -- members whose descriptors contain a `value` property (as opposed to getter/setter accessors) and are not methods. Fields represent data properties on an object.

### $methods()

A method on the reflection interfaces that returns an array of `$Method` representations -- members whose values are functions with a form of `'method'` or `'function'`. Methods carry additional metadata including async status, generator status, and parameter information.

### $Object

A reflection interface representing any JavaScript object. It exposes `$type`, `$prototype`, `$constructor`, and member introspection methods (`$member`, `$members`, `$fields`, `$methods`, `$properties`). It also provides role-checking (`$is`) and role-casting (`$as`) to navigate between the different facets (primitive, function, type, constructor, array, instance, prototype) of a single underlying value.

### $Type

A reflection interface representing a constructor function viewed as a type. It extends the object interfaces with `$parameters` (constructor parameter representations) and additional role checks for `'class'` and `'constructor'`. A `$Type` wraps a constructor and provides access to its prototype, its own type (metatype), and its members as seen from the type level rather than the instance level.

---

## 7. Semantics

### Prototypal view (Object.create pattern)

The design pattern shared across `$Particle.use()`, `$SubjectiveRep.$as()`, `$SubjectiveRep.$of()`, and `$Referent.$as()`. Instead of creating a new independent object, these methods create a lightweight prototype-linked copy via `Object.create(original)`. The new view inherits all state from the original through the prototype chain; only the differing property (role, perspective, or view function) is set directly on the new object. This means views are cheap, state is shared, and identity is preserved through the chain. It is the Self language's core mechanism brought into JavaScript.

### $Referent

The base class of the [semantics module][reference], representing anything that can be referred to. A referent has a `$ref` string identifier, a map of roles it can play (`$roles$`), and methods to project itself into different roles (`$as`) or to cast another referent as a part of itself (`$of`). Referents are interned in `$lib` -- constructing a `$Referent` with a `$ref` that already exists returns the existing instance. The `$canonical` property resolves to the identity-level referent, and `$equals` compares by canonical identity.

### $Reference

A semantic relation class (extending `$Relation`) that connects a symbol to its literal referent. It enforces that the symbol and its literal must be distinct referents. A `$Reference` captures the act of "this symbol stands for that thing" -- the fundamental sign-referent relationship.

### $Relationship

A semantic relation class (extending `$Relation`) that connects three distinct referents: a subject, an object, and a relationship type. It enforces that all three must be different. This is the general-purpose triple for expressing structured semantic facts like "X relates-to Y via Z."

### $Representative

A semantic relation class (extending `$Relation`) that connects a representative to its representation. It enforces that the two must be distinct. This captures delegation or proxy patterns where one referent stands in for another in some capacity.

### $Property

A semantic relation class (extending `$Relation`) that connects a property to the object it belongs to. It enforces that the property and object must be distinct referents. This models the structural relationship of "property P belongs to object O" at the semantic level, distinct from the reflection layer's `$Property` interface which models JavaScript property descriptors.

### $Identity

A semantic relation class (extending `$Relation`) that wraps a single referent in a self-referential triple. Unlike other relations, it does not require distinct participants -- the referent fills all three positions (cast into appropriate roles). This captures the concept of self-identity: a thing's relationship with itself.

### role

A core concept in the semantics layer, represented by the exported `$role` referent. Every `$Referent` can be projected into multiple roles via `$as(role)`, which creates a prototype-derived copy stored in the referent's `$roles$` map. Roles enable a single referent to participate in different semantic contexts (e.g., as a subject, an object, or a relationship) without losing its canonical identity. The reflection layer uses a parallel concept -- `$ObjectiveRole` strings like `'type'`, `'instance'`, `'member'` -- to achieve the same multi-faceted representation of JavaScript values.

<!-- citations -->
[symbols]: ../../../library/chemistry/src/symbols.ts
[types]: ../../../library/chemistry/src/types.ts
[catalogue]: ../../../library/chemistry/src/catalogue.ts
[particle]: ../../../library/chemistry/src/chemistry/particle.tsx
[chemical]: ../../../library/chemistry/src/chemistry/chemical.ts
[reflection]: ../../../library/chemistry/src/reflection.ts
[reference]: ../../../library/chemistry/src/semantics/reference.ts
