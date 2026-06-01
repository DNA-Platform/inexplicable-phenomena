---
kind: catalogue-section
section: III.2
title: The dual constructor
status: stub
---

# § III.2 The dual constructor

## Definition

Every `$Chemical` has two constructors. The class constructor (`constructor()`) runs at object creation time and defines what the chemical owns. The binding constructor (a method named after the class) runs at render time and binds the chemical to its received children. The two constructors answer different questions: *"what does this component own?"* versus *"what children did this instance receive?"*. React conflates both into one function call; `$Chemistry` separates them deliberately.

## Rules

- *(TBD — the class constructor runs once per instance.)*
- *(TBD — the binding constructor runs once per render.)*
- *(TBD — the binding constructor is a method whose name equals the class's `.name`.)*
- *(TBD — both constructors can carry significant behavior.)*

## Cases

- A `$Counter` with only a class constructor.
- A `$Book` with both a class constructor (initial state) and a binding constructor (typed children).

## See also

- [§ 0.3 The dual constructor][s-0-3] — the front-matter teaser.
- [§ III.3 The binding constructor][s-III-3] — the binding-constructor mechanics.

<!-- citations -->
[s-0-3]: ../00-front-matter/03-the-dual-constructor.md
[s-III-3]: ./03-binding-constructor.md
