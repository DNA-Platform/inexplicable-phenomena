---
kind: specification
title: $Chemistry Features Manifest
status: draft
---

# $Chemistry Features Manifest

This document specifies the promises $Chemistry makes to its users. Each section describes a feature, its invariants, its edge cases, and its governing principles. This is a specification, not a tutorial — it says what the framework guarantees, not how to use it.

When a test fails or a user reports unexpected behavior, this document is the source of truth for what *should* happen.

## Table of Contents

1. [Object identity](#1-object-identity)
2. [State persistence](#2-state-persistence)
3. [The `$()` membrane](#3-the--membrane)
4. [`$new()` — prototypal cloning](#4-new--prototypal-cloning)
5. [Reactive properties](#5-reactive-properties)
6. [Bond constructor](#6-bond-constructor)
7. [Lifecycle phases](#7-lifecycle-phases)
8. [Prototype composition](#8-prototype-composition)
9. [Particularization](#9-particularization)
10. [Developer mode](#10-developer-mode)
11. [React integration](#11-react-integration)

---

## 1. Object identity

### Promise

Every particle and chemical is a JavaScript object with a unique, stable identity. Identity is assigned at construction time and never changes.

### Invariants

- Every instance has a unique `$cid` (chemical id), a positive integer assigned once.
- Every instance has a unique `$symbol`, a string of the form `$Chemistry.ClassName[cid]`.
- No two live instances share a `$cid` or `$symbol`.
- `$cid` monotonically increases across the lifetime of the application.
- `$symbol` encodes both the class name and the `$cid`, making it human-readable and debuggable.

### Edge cases

- Templates (prototype singletons) are instances and have their own `$cid` and `$symbol`.
- Derivatives (created by `$()` template form or `$new()`) inherit class membership via prototype chain but have independent identity.
- After destruction, a `$cid` is never reused.

### Governing principle

Identity is intrinsic. It is not derived from position, props, render order, or React's reconciliation. A chemical knows who it is regardless of where it appears in the tree.

---

## 2. State persistence

### Promise

State lives in objects, not in React. When you set a property on a chemical, you get it back — regardless of whether the component was mounted, unmounted, conditionally rendered, or its parent re-rendered.

### Invariants

- **Direct instances** (`$(instance)`): state persists across unmount and remount. The object exists independently of React's component lifecycle.
- **Clones** (`instance.$new()`): state persists across unmount and remount, same as direct instances.
- **Template derivatives** (`$($Class)`): state is per-mount. Each mount creates a new derivative via `Object.create(template)`. Unmount destroys the derivative.
- **Bond-constructor children**: children bound by the synthesis engine are cached by identity (component type + React key). State persists across parent re-renders.
- **Mutating state while unmounted**: setting properties on a direct instance or clone while it is not mounted is valid. The new state appears when the component remounts.

### Edge cases

- Conditional rendering (`{show && <Panel />}`): for direct instances and clones, state survives the unmount/remount cycle. For template derivatives, each mount creates a fresh derivative.
- Tab patterns: switching between panels backed by held instances preserves state across tab switches because the objects persist even when their views are not mounted.
- Bond-constructor children with the same component type: when multiple children share the same type, explicit React `key` props are required for correct identity tracking. Without keys, the framework falls back to React's own positional semantics and will warn in developer mode.

### Governing principle

The object IS the state. React is the rendering layer, not the state layer. If you hold a reference to a chemical, its state is whatever you last set on it.

---

## 3. The `$()` membrane

### Promise

`$()` is the single function that bridges $Chemistry objects and React components. It has multiple forms, each serving a distinct purpose. There is no other public API for obtaining a Component.

### Forms

| Call | Returns | Semantics |
|------|---------|-----------|
| `$(instance)` | `Component` | Direct rendering. The instance IS the component. State persists. Bond constructor does NOT re-run. |
| `$($Class)` | `Component` | Template rendering. Each mount creates a derivative. Bond constructor runs per-mount. |
| `$(Component)` | instance | Inverse. Recovers the chemical from a Component. |
| `$('div')` | `Component` | HTML catalogue. Lazily creates a reactive wrapper for the HTML tag. |
| `$(<$ />)` | Fragment | JSX form. Renders children as a keyed fragment. |

### Invariants

- `$(instance)` returns the same Component function on every call for the same instance. React component identity is stable.
- `$($Class)` returns the same Component function on every call for the same class. Different classes produce different Components.
- `$($(instance))` is the identity: returns the original instance.
- `$()` never throws. Unrecognized arguments return `null`.

### Edge cases

- `$(instance)` skips the bond constructor. The instance was already constructed — re-bonding would overwrite user state.
- `$($Class)` with constructor parameters returns a factory function: `$($Class)(arg1, arg2)` calls the constructor and returns a Component.
- The template singleton is created lazily on first `$($Class)` call if it doesn't already exist.

### Governing principle

One function, every need. The `$` is the membrane between the $Chemistry world (objects, prototypes, methods) and the React world (components, props, JSX). Everything crosses through `$()`.

---

## 4. `$new()` — prototypal cloning

### Promise

`instance.$new()` creates a prototypal clone of any particle or chemical. The clone inherits current state, has independent identity, and is fully detached — writes to the clone do not affect the source, and vice versa.

### Invariants

- `$new()` is a method on `$Particle.prototype`. Every particle and chemical has it.
- The clone is created via `Object.create(source)`. The source becomes the clone's prototype.
- The clone gets a fresh `$cid`, `$symbol`, `$reaction`, `$molecule`, and `$phases`.
- The clone's `$template` points to the source.
- The clone inherits all properties from the source via the prototype chain.
- Writing a property on the clone shadows it — the source is unaffected.
- Writing a property on the source after cloning does NOT affect clones that have already shadowed that property. Clones that haven't written to that property still see the source's current value through the prototype chain.

### Edge cases

- Clone of a clone: `a.$new().$new()` creates a three-level prototype chain. Each level has independent identity and independent own-properties.
- Cloning after mutation: `source.count = 42; source.$new()` — the clone inherits `count = 42` through the prototype chain.
- `$(clone)` renders the clone as a direct instance. State persists across unmount/remount.
- Clones can be used as tab panel contents, list items, or any scenario where you need N independent copies of the same starting state.

### Governing principle

`$new()` is JavaScript's `Object.create` applied to the $Chemistry identity model. It is prototypal specialization — the Scheme/Self philosophy made concrete. The clone is not a copy; it is a delegation chain where writes shadow and reads delegate.

---

## 5. Reactive properties

### Promise

Properties prefixed with `$` are reactive. Changing a reactive property triggers a view update. No `setState`, no signals API, no subscription boilerplate.

### Invariants

- A property declared as `$name = value` on a chemical class is a reactive bond.
- Setting a reactive property triggers the molecule to mark the view as dirty.
- The view re-renders after the current scope completes — writes are batched within a scope.
- Reading a reactive property inside `view()` does not create subscriptions. The view always renders the current state of all properties.
- Non-`$`-prefixed properties are inert by default. They can be read and written but do not trigger re-renders.
- The `@inert` decorator suppresses reactivity on a `$`-prefixed property. The `@reactive` decorator adds reactivity to a non-`$` property.

### Edge cases

- Setting a reactive property to the same value it already holds: the molecule is still notified, but the view diff may short-circuit if the rendered output is identical.
- Setting reactive properties in bond-constructor children: the synthesis engine skips unchanged props (comparing against `$lastProps`) to avoid unnecessary reactive writes during parent re-renders.
- Setting reactive properties while unmounted: valid. The value is stored on the object. When the component remounts, the view reflects the current values.

### Governing principle

Properties are the API. A chemical's state is its properties. The framework's job is to keep the view consistent with the properties — the developer never has to think about "notifying" the framework that something changed.

---

## 6. Bond constructor

### Promise

A method with the same name as the class is the bond constructor. It receives typed, validated arguments extracted from the component's JSX children. The framework calls it on every render.

### Invariants

- The bond constructor signature declares what children the component accepts: `$Tabs(...panels: $TabPanel[])`.
- `$check()` inside the bond constructor validates argument types at runtime. Invalid arguments produce structured error messages showing expected vs actual types.
- The bond constructor runs on every parent render. It re-receives its arguments each time.
- Children passed to the bond constructor are bound to the parent via the synthesis engine. Their identity is preserved across parent re-renders using a cache keyed by (component type, React key).

### Edge cases

- Bond-constructor children with the same component type but no explicit keys: the framework uses React's auto-generated positional keys. This means reordering children without keys will swap their state. Developer mode warns about this.
- The bond constructor runs even when no children are passed — the arguments array is empty.
- Async bond constructors: if the bond constructor returns a Promise, it is tracked via `$construction` and the view re-renders when it resolves.
- Bond-constructor children that are plain React function components (not chemicals) are wrapped via `$wrap()` transparently.

### Governing principle

Children are typed arguments. The bond constructor turns JSX's untyped `children` prop into a validated, typed parameter list. The parent declares what it expects; the framework enforces it.

---

## 7. Lifecycle phases

### Promise

Chemicals have lifecycle phases — mount, layout, effect, unmount — declared as methods on the object. Phases are resolved in a defined order, synchronized with React's own lifecycle hooks.

### Invariants

- Phase order: `setup` → `mount` → `layout` → `effect` → (re-renders) → `unmount`.
- `mount()` fires once when the component first appears in the DOM.
- `layout()` fires synchronously after DOM mutations (maps to React's `useLayoutEffect`).
- `effect()` fires after paint (maps to React's `useEffect`).
- `unmount()` fires when the component is removed from the DOM.
- For direct instances: `unmount` does not destroy the object. Remounting the same instance re-enters the lifecycle from `mount`.
- For template derivatives: `unmount` marks the derivative for destruction.

### Edge cases

- React strict mode: React may mount, unmount, and remount in development. The lifecycle handles this via a two-strike destruction pattern — the first unmount sets a `$remove` flag, the second actually destroys.
- Phases registered via `this.next('mount')` return a Promise that resolves when that phase completes.

### Governing principle

Lifecycle is declarative. Methods on the object, not hook calls in a render function. The chemical tells the framework what it cares about; the framework calls it at the right time.

---

## 8. Prototype composition

### Promise

Classes compose through JavaScript's prototype chain. A chemical's behavior is the sum of its prototype chain — each link adds properties, methods, and reactive bonds.

### Invariants

- `class $B extends $A` — B inherits A's reactive properties, bond constructor, view, and lifecycle methods.
- Reactive property accessors are installed per-instance, not per-prototype. Each instance has its own getters/setters.
- The molecule walks the prototype chain to discover all reactive bonds. It stops at the `$Particle` boundary.
- View lookup follows standard JavaScript method resolution — the most-derived `view()` wins.
- Bond constructor lookup uses the class name: `$Tabs` looks for a method named `$Tabs` on the instance.

### Edge cases

- A subclass with no bond constructor inherits the parent's bond constructor if the parent has one.
- A subclass with its own bond constructor must declare one if any ancestor has one (enforced at template creation time).

### Governing principle

JavaScript's prototype chain IS the composition model. No configuration objects, no mixins, no `extends` with special semantics. `Object.create` and `Object.getPrototypeOf` are the primitives.

---

## 9. Particularization

### Promise

Particularization specializes a chemical's behavior through the prototype chain without requiring a new class. It is prototype-based polymorphism — the Self/Scheme philosophy applied to components.

### Invariants

- `Object.create(template)` creates a specialized instance that inherits all behavior.
- Overriding a property on the specialized instance shadows the prototype's value.
- `instanceof` still works: a particularized instance is an instance of the original class.

### Edge cases

- Particularized instances that override `view()` render the overridden view while still inheriting reactive properties and bond constructors from the prototype.
- See [particularization caveat] for the `instanceof` edge case with deeply nested chains.

### Governing principle

Specialization without subclassing. A chemical can be customized per-use through delegation, not through class proliferation.

---

## 10. Developer mode

### Promise

In development (`process.env.NODE_ENV !== 'production'`), the framework provides warnings, diagnostics, and visual error rendering to help developers find and fix problems. In production, all dev-mode code is tree-shaken to zero cost.

### Capabilities

- **Console warnings**: emitted once per unique message. Example: same-type bond-constructor children without explicit keys.
- **Visual error rendering**: bond-constructor validation failures render a styled diagnostic panel in place of the broken component, showing the expected signature and actual arguments.
- **`console.error`**: for errors that don't prevent rendering but indicate problems.

### Invariants

- Dev-mode code is gated by `process.env.NODE_ENV !== 'production'`. Bundlers (Vite, webpack) replace this at build time.
- All dev-mode functions are no-ops in production — no runtime cost.
- Warnings are deduplicated: the same message is only logged once per application lifetime.
- Visual error panels are rendered as React elements with inline styles (no CSS dependencies).

### Governing principle

Errors should be visible where they happen. A validation failure in a bond constructor should show up in the component's place in the DOM, not buried in a console the developer might not be watching.

---

## 11. React integration

### Promise

$Chemistry composes with the React ecosystem. It does not replace React — it extends it. React-router, styled-components, react-query, and other React libraries work alongside $Chemistry components.

### Invariants

- $Chemistry components are React function components. They can be used anywhere React components are used.
- Event handlers in views are wrapped to ensure reactive scope tracking. Writes inside `onClick` etc. trigger view updates.
- `$()` returns a standard React component type compatible with JSX, React.createElement, and all React APIs.

### Governing principle

Compose, don't replace. $Chemistry sits on top of React. The React ecosystem is an asset, not an obstacle.

---

<!-- citations -->
[particularization caveat]: caveats/particularization-prototype-loss.md
