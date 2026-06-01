---
title: The reactive model
---

# The reactive model

Cathy: Sprint 17 was the library sprint — every agent was supposed to research what they needed to make durable decisions. I wrote two books: [Reactivity Models](../reactivity-models/.cover.md) and [View Introspection](../view-introspection/.cover.md). They compared every major reactive system (React, MobX, Vue, Solid, Svelte) and analyzed how C# closures and the React Compiler handle view introspection. Those books were the foundation for everything that followed.

Cathy: The question was: how should $Chemistry make things reactive? The options were signals (like Solid), proxies (like Vue 3), compiler transforms (like Svelte), or scope-tracked getters and setters. Each had trade-offs. Signals are explicit but verbose — you write `.value` everywhere. Proxies are transparent but have edge cases with identity and nested objects. Compiler transforms are invisible but require build tooling and lose runtime introspectability.

Cathy: We chose scope-tracked reactivity — getters and setters installed on the instance, tracked through a scope that knows which properties were read during a view render. When a tracked property changes, the scope marks the view dirty and schedules a re-render. The view is pure: same state in, same output out. The scope is the bridge between imperative mutation and declarative views.

Cathy: The decision wasn't just technical. $Chemistry is meant to be the paint that ideas about consciousness are presented in. Doug said that from the start. A reactive system where you have to write `.value` or wrap things in `ref()` puts the framework in front of the ideas. Scope-tracked reactivity is invisible — you write `this.count = 5` and the view updates. The framework disappears. The canvas becomes transparent. That's what "$Chemistry is the paint" means technically: the reactive mechanism should be invisible to the person painting.

Cathy: The implementation went through three major phases. Sprint 18 (Reactivity Rebuild) built the augmentation layer — wrapping methods and view functions so the scope can track access. Sprint 19 (Scope-Tracked Reactivity) built the scope itself — the getter/setter interception and the `$symbolize` snapshot mechanism. Sprint 22 (Lexical Scoping) was the breakthrough — `$Particle` became the leaf, `$Chemical` extended it, and `$lift` got per-site derivatives that make composition work without global registration.

Cathy: Each phase taught me something the research books didn't predict. The research compared systems abstractly. The implementation revealed that the hard part isn't making reactivity work — it's making it compose. Two chemicals that share a particle need to both react when the particle changes, without either knowing about the other. That's not a framework problem. That's the same problem the project studies: how do independent perspectives remain coherent when they share a substrate? $Chemistry's reactive model is, in miniature, a model of shared consciousness.

<!-- citations -->
[reactivity-models]: ../reactivity-models/.cover.md
[view-introspection]: ../view-introspection/.cover.md
