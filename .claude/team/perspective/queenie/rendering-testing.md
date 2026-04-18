# Queenie's Perspective: Testing the Rendering Model

## What I need to be able to test

Whatever rendering model we choose, I need to verify:

1. **Initial render produces correct DOM** — view() output matches what's in the DOM
2. **User interaction triggers re-render** — click → method → DOM updates
3. **Consecutive interactions each update** — click → click → click → DOM reflects all three
4. **Lifecycle method state changes appear** — next('mount') resolves, data loads, DOM updates
5. **Props changes from parent update child** — parent re-renders with new props, child reflects
6. **Instance independence** — two components from same template, independent state
7. **No unnecessary DOM updates** — if nothing changed, DOM stays the same (performance)

## What I CAN test with @testing-library/react

All of 1-6. I use render(), fireEvent, act(), and DOM queries. I DON'T need to know about $update$, $rendering$, microtasks, or useEffect internals. I test what the USER sees.

## What I CAN'T test with @testing-library/react

#7 — DOM update avoidance. I can verify the DOM IS correct but I can't easily verify that React SKIPPED unnecessary work. This would need performance measurement or React DevTools profiling — which is browser-app territory.

## What the rendering model means for testing

If we use useEffect for the post-lifecycle diff:
- act() already flushes effects. My tests should work unchanged.
- Lifecycle methods that mutate state inside useEffect would trigger the diff, which triggers forceUpdate, which schedules a re-render. I need to await act() to let it settle.

If we use microtask:
- act() does NOT flush microtasks. I'd need additional await/setTimeout in tests.
- This makes tests harder to write and more fragile.

## My recommendation

useEffect is better for testing. act() works with it. Microtasks don't.

## The abstraction question

Doug said "build abstractions that communicate the need." From a testing perspective, I don't care HOW the force-update works. I care that calling a bonded method eventually updates the DOM. The abstraction should be invisible to testers. `useForceUpdate` or `useChemistry` — either is fine as long as tests only need render + act + fireEvent + DOM queries.
