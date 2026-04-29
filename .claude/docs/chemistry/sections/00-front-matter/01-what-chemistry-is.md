---
kind: catalogue-section
section: 0.1
title: What $Chemistry is
status: stable
---

# § 0.1 What `$Chemistry` is

## Definition

`$Chemistry` is an object-oriented component framework built on React. It replaces React's functional-component-plus-hooks model with living objects that delegate behavior through prototypes, carry their own identity, and manage their own reactive state. The framework draws from two language traditions React itself does not: **Self's prototype delegation** (objects inherit directly from other objects, not from classes) and **Scheme's symbols and environments** (identity is carried by unforgeable symbol keys, lookup walks scoped chains).

The heart of `$Chemistry` is the React layer: `$Particle` → `$Chemical` → `$Atom`. A reader who finishes § 0 has the framing for everything below.

## Rules

- **Objects are the components.** A `$Particle` is a real object with a prototype chain. Rendering is a method call on that object — `view()` — not a function invocation by the framework.
- **The object IS the state.** React's `useState` keeps state outside the component; `$Chemistry` puts state on the object. The framework uses React hooks for exactly two things: tracking identity and triggering re-renders.
- **Identity is intrinsic.** Every particle gets a unique CID and a symbolic name like `$Chemistry.MyThing[42]`. Identity is assigned at construction, not by the reconciler.
- **Lifecycle is awaitable.** A particle awaits `next('mount')` — linear async code that resolves at the correct React lifecycle phase. No callback nesting, no dependency arrays.
- **Views are pure.** `view()` is a pure function of the object's state. No hooks. No side effects. The framework orchestrates everything around the view call.
- **The framework documents itself by using itself.** The Lab is built front-to-back with `$Chemistry`.

## The bet against *The Good Parts*

The React community ran from classes. `class extends React.Component` became the cautionary tale; hooks were the liberation. The consensus is that OOP in JavaScript was a mistake.

`$Chemistry` burns that book. Not because OOP-vs-FP is a real war, but because it isn't. JavaScript's lineage — Self's prototypes, Scheme's closures, Java's syntax — means the language can do things that neither camp takes seriously. `Object.create()` is not a constructor call. A constructor that returns a different object is not a bug. Prototype delegation is not inheritance. Symbols are not "private fields by another name."

`$Chemistry` takes all of this seriously. Prototype delegation over class instantiation. Constructor return as a design pattern (the particularization carrier — § VII). Symbols as a grammatical system (§ I.1). OOP and FP as complements: a `$Chemical` is an object whose `view()` is a pure function of its state.

## Cases

- The four-question pitch: what is it (a React-layer OOP component framework), why does it exist (state, identity, lifecycle on the object), how does it relate to React (it sits on top), when to reach for it (when component identity matters more than functional purity).
- A minimal `$Counter`: 12 lines of class, no hooks, full reactivity.
- A side-by-side comparison: the same component as a React function, then as a `$Chemical`.

## See also

- [§ 0.2 Conventions][s-0-2] — the `$` membrane and how to read this catalogue.
- [§ 0.3 The dual constructor][s-0-3] — the most surprising design choice.
- [§ I.2 The `$` membrane][s-I-2] — the grammar of `$`.
- [§ XVI Why `$Chemistry`][s-XVI] — the capstone argument.
- [chemistry overview][overview] — the long-form framing.

<!-- citations -->
[s-0-2]: ./02-conventions.md
[s-0-3]: ./03-the-dual-constructor.md
[s-I-2]: ../I-foundation/02-the-dollar-membrane.md
[s-XVI]: ../XVI-why-chemistry/index.md
[overview]: ../../overview.md
