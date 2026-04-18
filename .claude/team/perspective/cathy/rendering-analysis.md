# Cathy's Rendering Analysis

This is me THINKING, not coding. Every claim is sourced or reasoned.

## What React guarantees

Source: [React docs on useState](https://react.dev/reference/react/useState), [React effect ordering](https://react.dev/reference/react/useLayoutEffect), [React batching](https://react.dev/learn/queueing-a-series-of-state-updates)

### The render cycle

```
1. React calls the FC (render phase)
   — FC runs synchronously
   — hooks register (useState, useEffect, useLayoutEffect)
   — FC returns ReactNode
   — this is PURE — no DOM mutations allowed

2. React commits to DOM (commit phase)
   — DOM mutations happen
   — refs are attached

3. useLayoutEffect fires (synchronous, before paint)
   — can read layout (getBoundingClientRect etc.)
   — blocks painting

4. Browser paints

5. useEffect fires (asynchronous, after paint)
   — non-blocking side effects
```

### Batching

React batches ALL state updates within event handlers. Multiple `setState` calls produce ONE re-render. The DOM is committed once, after all updates are processed.

React 19 (and 18+): batching applies EVERYWHERE — event handlers, promises, setTimeout, native events. Not just React synthetic events.

### Functional updates

`setState(prev => prev + 1)` is guaranteed to use the LATEST state. Each functional update in the queue receives the result of the previous one. This is how we should force updates — `useState(0)` + `setState(t => t + 1)` guarantees a new value and React WILL re-render.

## What $Chemistry needs from React

### During the render phase (FC body):
1. `useState` gives us state that persists across renders
2. The FC body runs SYNCHRONOUSLY — we can call `$apply`, `$bond$`, `view()` and return the result
3. We MUST NOT call `setState` during render (causes re-render loop or gets batched unpredictably)

### During the commit phase:
4. DOM is updated with our returned ReactNode

### During the effect phase:
5. `useLayoutEffect` fires — we resolve 'layout' phase
6. `useEffect` fires — we resolve 'mount' (first time) and 'effect' (every time)

### Between renders (event handlers):
7. User clicks something → onClick fires → bonded method runs → `setState` triggers re-render
8. React batches the update → calls FC again → new output → commits

## The $Chemistry rendering algorithm

### What we do NOW:

```
FC called by React:
  → useState(0) for force-update token
  → store update closure on chemical
  → register lifecycle hooks
  → $apply(props)        // map JSX props to $-prefixed properties
  → $bond$()             // molecule.reactivate() + orchestrator.bond()
  → output = view()      // PURE — reads from this, returns ReactNode
  → return output        // React commits to DOM
```

### What Doug described:

"In a microtask for something that guarantees execution AFTER the full lifecycle is over, we call view again, diff, and if different, we call update, forcing an update."

### Analysis: do we need the microtask?

The microtask would fire AFTER all useEffect callbacks. Its purpose: catch state changes that happened DURING lifecycle methods (e.g., `await this.next('mount')` resolved and set new state).

But React ALREADY handles this. If a lifecycle method (running inside useEffect) calls `setState`, React schedules a re-render. The re-render calls the FC, which calls view(), which returns fresh output. React commits the new DOM. No microtask needed.

UNLESS — the state change doesn't go through setState. In $Chemistry, lifecycle methods mutate the object directly (`this.items = data`). React doesn't know. The object changed but React wasn't told. THAT is why we need either:

A. `$Bonding` to call setState after lifecycle methods (but lifecycle methods run inside useEffect, and calling setState inside useEffect is allowed — it schedules a re-render for the next frame)

B. A post-lifecycle microtask that calls view(), diffs, and calls setState if different

Option A is simpler and uses React's built-in scheduling. Option B is what Doug described.

### Which is correct?

Doug's microtask approach has one advantage: it ONLY triggers a re-render if the view actually changed. If a lifecycle method mutated state but the view output is identical, no re-render. This is the "diff" part.

Option A triggers a re-render whenever a bonded method fires — even if the view didn't change. The FC runs, view() returns the same output as before, React diffs against the DOM and finds no changes. Wasted work, but React handles it efficiently.

The microtask approach is MORE EFFICIENT (skips the FC call entirely when nothing visible changed) but MORE COMPLEX (requires post-lifecycle scheduling and a separate diff pass).

### My recommendation

For correctness: Option A is sufficient. React handles the scheduling.
For efficiency: Doug's microtask approach is better for lifecycle-heavy components.

We should start with A (what we have, simplified) and add the microtask optimization when profiling shows it's needed.

BUT — Doug specifically asked for the microtask model. He designed it. He wants it. I should implement what he asked for, not argue against it.

## The force-update abstraction

Doug said: "build abstractions that communicate the need."

`useState(0)` + `setState(t => t + 1)` is a HACK. It's an implementation detail that leaks React's API into our framework. We need an abstraction:

```typescript
function useForceUpdate(): () => void {
    const [, setToken] = useState(0);
    return () => setToken(t => t + 1);
}
```

This is used ONCE in each FC. The returned function is stored on the chemical as `$update$`. The name `useForceUpdate` communicates intent. The implementation is hidden.

## Open questions I need to think more about

1. Can the diff happen inside useEffect instead of a microtask? useEffect fires after paint. We could call view(), diff, and setState inside useEffect. That's a React-sanctioned way to trigger a conditional re-render.

2. What about useLayoutEffect for the diff? It fires before paint. If the diff triggers a re-render, the second render happens before the user sees the first. No visual glitch.

3. What happens when a bonded method is called from an onClick handler AND a lifecycle method resolves in the same frame? Two setState calls. React batches them. One re-render. Is that correct? Yes — the single re-render sees the latest state from both mutations.

4. What about unmount during async? A lifecycle method awaits something. The component unmounts. The await resolves. The method mutates state. setState fires on an unmounted component. React 18+ handles this gracefully (ignores the setState). But the mutation still happens on the chemical object. Is that a problem? Only if the chemical is reused — but unmounted chemicals should be cleaned up.
