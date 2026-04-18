# Testing

Testing strategies and tools for $Chemistry. Covers unit testing, React integration testing, browser testing, and the specific challenges of testing a framework that sits on top of React.

---

## Testing a Framework on React

$Chemistry is a framework that depends on React. Testing it requires two distinct mindsets:

**Testing the framework itself:** Does `$Particle` assign CIDs correctly? Does `$Molecule.reactivate()` create bonds? Does `reconcile` return cached references? These are unit tests of OUR code.

**Testing the framework's contract with React:** Does `$update$` actually trigger a re-render? Does `useState` survive across renders? Does strict mode double-mount not break state? These test ASSUMPTIONS about React — they verify that React does what we expect.

A test that passes on broken React assumptions is WORSE than no test. It tells us everything is fine when it isn't.

---

## Vitest + @testing-library/react

The primary tool for React integration tests. [React Testing Library](https://testing-library.com/docs/learning/) philosophy: test what the user sees, not implementation details.

**render()** — renders a component into a simulated DOM
**fireEvent** — simulates user interactions (click, change, submit)
**act()** — flushes React's update queue (effects, state updates)
**screen** — queries the DOM (getByText, queryByRole)
**waitFor** — waits for async state changes

### Good test pattern
```typescript
it('counter increments on click', async () => {
    const Counter = new $Counter().Component;
    const { container } = render(<Counter />);
    expect(container.querySelector('.count')!.textContent).toBe('0');
    await act(async () => {
        fireEvent.click(container.querySelector('button')!);
    });
    expect(container.querySelector('.count')!.textContent).toBe('1');
});
```
This tests BEHAVIOR: click button → count increases. It doesn't test HOW ($Bonding, $update$, reconcile).

### Bad test pattern
```typescript
it('$Bonding calls $update$ after method', () => {
    const counter = new $Counter();
    counter.increment();
    expect(counter[$update$]).toHaveBeenCalled();  // implementation detail
});
```
This tests MECHANISM. If we change how re-renders work, this test breaks even if the behavior is correct.

---

## What to Test at Each Level

### Unit (no React)
- Particle identity, symbol, CID generation
- Lifecycle phase queues and `next()` resolution
- `$Reflection` reactive/inert classification
- `$Molecule` bond creation and metadata
- `reconcile` tree comparison
- `walk` tree traversal
- `$ParamValidation` error messages

### Integration (React simulation)
- Props flow through `$apply` and appear in DOM
- Method call → re-render → DOM updates
- Instance independence: two components, separate state
- Binding constructor receives typed children via JSX
- Lifecycle: `next('mount')` resolves after mount
- Unmount: cleanup fires, state is cleaned
- Polymorphism: subclass renders correctly where base expected

### E2E (browser app)
- Visual correctness: does it look right?
- Real event handling: click, scroll, focus
- Performance: no jank with many components
- Binding constructor validation error messages
- Lazy loading: content appears after mount
- Multi-render: same component in multiple places

---

## Testing $Chemistry-Specific Patterns

### The $ membrane
Test that `<Component prop="value" />` maps to `this.$prop === "value"` in the view output. Don't test that `$apply` was called — test the DOM.

### Binding constructors
Test that `<Cookbook><Recipe .../></Cookbook>` renders correctly — the cookbook shows the right count and total. Don't test that the orchestrator called the binding constructor — test the output.

### Polymorphism
Test that `<VeganRecipe />` looks different from `<Recipe />` when rendered. Don't test which styled-component class was applied — test the visual difference.

### Lifecycle
Test that content appears after mount (lazy loading). Don't test that `$resolve$('mount')` was called — test that the DOM changed.

---

## Performance Testing

Use `performance.now()` for timing in unit tests. Use real browser rendering for visual performance (jank detection). Benchmarks should have explicit thresholds:

```typescript
it('renders 100 items under 200ms', () => {
    const start = performance.now();
    render(<LargeList />);
    expect(performance.now() - start).toBeLessThan(200);
});
```

Be cautious: timing varies by machine. Set generous thresholds. The point is to catch REGRESSIONS, not to assert absolute performance.
