---
title: View purity
---

# View purity

Cathy: The most important architectural decision in $Chemistry is one that sounds simple: views are pure. Call `view()` with the same state and you get the same output. No side effects, no hidden dependencies, no ambient state that makes the output unpredictable. Object-pure, not referentially pure — the view reads `this` properties, so it's pure with respect to the object's state, not pure in the functional programming sense.

Cathy: This sounds obvious. React has the same principle. But $Chemistry's implementation is different in a way that matters. React re-renders by calling the function component again — the function IS the render. $Chemistry re-renders by calling `view()` on an object that persists across renders. The object has state. The view reads it. The scope tracks which state the view read and schedules re-renders when those specific properties change.

Cathy: The dirty flag plus cache plus diff model emerged from this. When a tracked property changes, the scope sets a dirty flag on the chemical. The next render checks the flag, calls `view()` if dirty, and diffs the output against the cached previous output. Only the differences propagate to the DOM. This means we get React's efficiency (minimal DOM updates) without React's re-execution model (calling the entire function again). The chemical persists. Its state persists. Only the view re-evaluates.

Cathy: Doug pushed hard on this. "Views are object-pure" was his formulation, not mine. I had been thinking about it in terms of caching and optimization — the dirty flag prevents unnecessary re-renders, the diff prevents unnecessary DOM mutations. Doug reframed it as a property of the system, not an optimization. A pure view is a mathematical guarantee: this function is a lens on the object's state. If the state hasn't changed, the view hasn't changed. That guarantee is what makes composition safe — you can nest chemicals freely because each view is a pure function of its own state, and no view can corrupt another's state through rendering.

Cathy: The connection to the project's purpose: a pure view on mutable state is how $Chemistry models perspective. Each chemical has its own state (private, mutable) and its own view (public, pure). The view is the chemical's perspective on its own state. Multiple chemicals can share particles — shared mutable substrate — and each renders its own pure perspective on that shared reality. That's not a metaphor I designed. It's a structural property that emerged from the implementation decisions and that Doug recognized as mirroring the problem the project studies.

<!-- citations -->
[sprint-18 plan]: ../../../../project/sprint-18/plan.md
[sprint-19 plan]: ../../../../project/sprint-19/plan.md
