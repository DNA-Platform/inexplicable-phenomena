---
kind: catalogue-section
section: 0.3
title: The dual constructor
status: stable
---

# § 0.3 The dual constructor

## Definition

Every `$Chemical` has **two** constructors corresponding to two fundamentally different moments. The class constructor (`constructor()`) runs once at object creation time and defines what the chemical owns. The **binding constructor** — a method named after the class — runs at render time when JSX children arrive, and defines what the chemical received. React conflates both moments into one function call; `$Chemistry` separates them because they answer different questions.

This is the single most surprising design choice in the framework. The teaser is here; the long form is in § III.2 / § III.3.

## Rules

- The class constructor runs **once per instance**, at object creation time. It defines properties, initializes state, and runs any setup that does not depend on children.
- The binding constructor runs **once per render**, at render time. It receives the chemical's children — already bound and typed — as positional arguments, validates them, and stores references.
- The class constructor can be `constructor()` (the JavaScript default) or omitted entirely if the class has only field initializers.
- The binding constructor is a method whose name equals the class's `.name`. For `class $Book` it is `$Book(...)`. For `class $CardContainer` it is `$CardContainer(...)`.
- The binding constructor's parameters are extracted at runtime by parsing the method's source (§ VIII.4); they declare the children's types and arity.
- One chemical can carry significant behavior across both constructors: anything a JavaScript class can do at creation time, plus anything that depends on incoming children.

## Cases

- A `$Counter` with only a class constructor: state on the object, no children expected.
- A `$Book($Title, $Author, ...$Chapters)` with both a class constructor (initial state) and a binding constructor (typed children).
- A side-by-side: the same composition expressed as a React function (one combined function) versus a `$Chemical` (two constructors, two moments).

## See also

- [§ III.2 The dual constructor][s-III-2] — the long form.
- [§ III.3 The binding constructor][s-III-3] — the binding-constructor mechanics.
- [§ VIII.1 `$Synthesis`][s-VIII-1] — what discovers and invokes the binding constructor.
- [§ 0.1 What `$Chemistry` is][s-0-1] — the framing the dual constructor sits inside.

<!-- citations -->
[s-III-2]: ../III-composition/02-dual-constructor.md
[s-III-3]: ../III-composition/03-binding-constructor.md
[s-VIII-1]: ../VIII-synthesis/01-synthesis-class.md
[s-0-1]: ./01-what-chemistry-is.md
