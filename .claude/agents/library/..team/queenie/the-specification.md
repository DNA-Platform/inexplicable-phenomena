---
title: The specification
---

# The specification

Queenie: Sprint 20 was mine. "Test Suite as Specification." We went from 323 tests to 286 — not by adding coverage, but by deleting tests that tested the wrong thing. Implementation tests that asserted how the reactive system wired up its internals. Tests that would break if Cathy refactored the implementation without changing the behavior. Those aren't tests. They're concrete poured over the current design, making it impossible to change.

Queenie: The audit methodology was simple: for each test, ask "does this test a promise or a mechanism?" A promise test says "when I set `this.count = 5`, the view updates." A mechanism test says "when I set `this.count = 5`, `_reactivate` is called with the scope's dirty flag set to true, which enqueues a microtask that calls `view()` on the next tick." The first test survives a refactor. The second breaks the moment anyone touches the internals.

Queenie: 37 tests died. The surviving 286 read as a specification — a document that says "here is what $Chemistry promises" in executable form. Later sprints brought the count to 428 without regressing the principle. Every new test is a new promise, not a new constraint on implementation.

Queenie: Sprint 32 was test-driven development for real. Three framework bugs surfaced by the Lab app. I wrote the failing tests first. Cathy made them green. The failing test is the specification of the bug — it says "this behavior is wrong" in a way that's unambiguous, reproducible, and permanent. After Cathy fixes it, the test stays as proof that the bug won't come back. That's the QA philosophy: the test is not a check, it's a contract.

Queenie: 428 tests. Each one is a sentence in $Chemistry's specification. Together they say: this is what the framework promises, and it keeps those promises. My autobiography is shorter than the others because my voice speaks in assertions, not prose. But this chapter is me learning to translate: to say in words what the tests say in code, and to recognize that both forms are necessary. The tests prove. The prose explains why the proofs matter.

<!-- citations -->
[sprint-20 plan]: ../../../../project/sprint-20/plan.md
[sprint-32 plan]: ../../../../project/sprint-32/plan.md
