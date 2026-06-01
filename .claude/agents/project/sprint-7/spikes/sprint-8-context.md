# Sprint 8 Context: Particle Rendering

What we learned in sprint 7 that shapes sprint 8.

## Current state (will change)

1. **Two rendering models.** Particles use `use()` to become callable closures (no hooks). Chemicals use `$Component$` to wrap in a React FC (with hooks). Sprint 8 unifies: the particle handles being a React component directly.

2. **`$Component$` is a class.** It creates a React FC in its constructor, stores template/chemical references, manages bound vs unbound state, and provides `$bind(parent)`. Sprint 8 dissolves this class — its logic moves to the particle.

3. **`use()` creates a detached prototypal copy.** For chemicals, this copy is unused because chemicals render through `$Component$`. Sprint 8 redesigns `use()` — Doug wants it kept for "hoisting a function to a component," scoped to parameterless functions.

4. **Templates live on particle.** The `$$template$$` static, `$isTemplate$` getter, and template-auto-derive in `use()` are all particle-level. Doug says templates should be chemical-only. Sprint 8 moves them.

5. **The lifecycle hooks live in `$Component$`.** Three React hooks (`useEffect` x2, `useLayoutEffect` x1) drive five lifecycle phases. Sprint 8 moves these into the function that the particle produces.

6. **`$Reaction` does two things.** Lifecycle phase queues AND state change tracking. Sprint 8 needs the lifecycle part on particle. State tracking stays for sprint 10.

7. **`augmentView()` rewrites React elements.** Not yet fully traced. Sprint 8 needs to decide if this stays, moves, or simplifies.

## Design decisions for sprint 8

- **`await this.next('mount')`** — string-enum lifecycle API on `$Particle`, replacing separate named methods
- **`use()` stays** — scoped to parameterless view functions. Produces a React component from a function.
- **No templating on particle** — templates, `$isTemplate$`, template-auto-derive move to `$Chemical`
- **No binding constructor on particle** — orchestration stays chemical-only
- **The particle produces a React FC that includes lifecycle hooks** — identity tracked via `useState`, lifecycle driven via `useEffect`/`useLayoutEffect`

## Open questions for sprint 8

1. Does the particle's React FC still need the CID `useState`? Or is the particle's `$cid$` sufficient for identity?
2. What drives re-renders at the particle level? Chemicals have the bond/reaction/state system. Particles don't have bonds. Do they need a re-render trigger at all, or are they render-once?
3. Where does `augmentView()` live after the refactor? Does it move to chemical? Does it simplify?
4. The `$Reaction` class — does it split? Lifecycle queues → particle, state tracking → chemical?
