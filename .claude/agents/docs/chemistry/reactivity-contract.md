---
kind: reference
title: $Chemistry Reactivity Contract
status: stable
---

# $Chemistry Reactivity Contract

**One paragraph for the impatient:** Write a class. Put state in fields. Write methods. Wire events in TSX. The UI updates when state changes. You will never write `setState`, never spell out dependency arrays, never wrap components in `React.memo`. If you mutate state from a callback the framework doesn't already see (like a raw `setInterval`), either wrap the mutation in a method or call `react(chemical)`.

That's the contract. Everything else is a footnote.

---

## The mental model

A `$Chemical` is a JavaScript class. Its fields are its state. Its methods act on the state. Its `view()` produces JSX.

When state changes, the view is re-computed and React updates the DOM. That's reactivity.

The framework observes state changes in three ways, forming a layered safety net:

1. **Event handler augmentation.** Every event handler in your view is wrapped so that, after it runs, any state mutations it caused are reconciled with the UI.
2. **Reactive method wrappers.** Every method on a chemical is wrapped the same way, so method calls (from anywhere — handlers, other methods, tests, `setTimeout` callbacks) trigger the re-render.
3. **Property accessors.** Each reactive field on a chemical has a getter/setter installed. Direct writes to reactive fields trigger a re-render immediately (even from external callbacks).

These three layers cover the common patterns you'll write.

---

## The contract, precisely

### 1. State lives on the chemical as fields

```tsx
class $Counter extends $Chemical {
    $count? = 0;
}
```

Fields prefixed with `$` are reactive. Other fields (no prefix, or underscore prefix `_`) are not.

**Name length matters.** `$`-prefixed field names must be at least 3 characters total — `$ab` is reactive, `$a` is not. (Two-character names like `$a` collide with framework-reserved single-letter conventions.) Use descriptive names: `$count`, `$name`, `$data`.

**Fields need initializers.** `$data = 'pending'` creates a reactive field. `$data?: string` without an initializer doesn't create a runtime field — TypeScript just strips the type declaration and there's nothing for the accessor to bind to. If you want an initially-undefined field, use `$data? = undefined` explicitly.

Reactive fields get a getter/setter installed. Writes are observed.

### 2. Mutations in handlers trigger re-render

```tsx
view() {
    return <button onClick={() => this.$count++}>+</button>;
}
```

The handler is augmented by the framework. When the user clicks, the handler runs inside a reactivity scope. At the end of the scope, any chemical that was written (directly or via nested mutation) is re-rendered.

Nested mutations work:

```tsx
<button onClick={() => this.$items.push('x')}>add</button>
<button onClick={() => this.$map.set(k, v)}>set</button>
<button onClick={() => this.$config.mode = 'dark'}>toggle</button>
```

All three cause a re-render. The scope snapshots the state on read and detects in-place changes on finalize.

### 3. Mutations in methods trigger re-render

```tsx
class $Counter extends $Chemical {
    $count? = 0;
    increment() { this.$count++; }
    view() { return <button onClick={() => this.increment()}>+</button>; }
}
```

Method calls are also wrapped. Inside `increment()`, mutations are observed. On return, re-render fires. Async methods work too — the re-render fires when the returned Promise resolves.

### 4. Cross-chemical mutations work within a handler or method

```tsx
class $App extends $Chemical {
    $user!: $User;
    view() {
        return <button onClick={() => this.$user.$name = 'Alice'}>rename</button>;
    }
}
```

The scope isn't chemical-scoped; it observes mutations on any chemical. `$user`'s state change triggers re-render on `$user`. If `$user` is rendered as part of `$App`'s view tree, React's cascade handles the DOM update.

### 5. External callbacks: direct writes work automatically; nested mutations need a method

Direct scalar writes work from anywhere:

```tsx
$Clock() {
    setInterval(() => { this.$time = Date.now(); }, 1000);  // works!
}
```

When the setter fires outside any scope, it calls `react()` immediately on the chemical.

In-place mutations (Map.set, array.push, etc.) DON'T fire outside a scope because the underlying `set` or `push` doesn't go through our accessor. Wrap them in a method:

```tsx
$Chat() {
    socket.on('message', msg => this.receive(msg));  // call a method
}
receive(msg: string) {
    this.$messages.push(msg);  // method scope catches the push
}
```

The method wrapper opens a scope when called. The push happens inside the scope. Scope finalize detects the change and fires re-render.

### 6. Views must be pure

View reads `this` and returns JSX. That's it. No mutation. No non-determinism.

```tsx
// GOOD
view() {
    return <div>{this.$count}</div>;
}

// BAD — every render produces a new Date
view() {
    return <div>{new Date().toLocaleTimeString()}</div>;
}

// BAD — mutating in view is a contract violation; infinite re-render
view() {
    this.$hits++;
    return <div>{this.$hits}</div>;
}
```

Non-deterministic reads (time, randomness) go in the **bond constructor**, where they run once per instance:

```tsx
class $Clock extends $Chemical {
    $startTime? = Date.now();  // field initializer runs once per instance
    $Clock() {
        setInterval(() => this.tick(), 1000);  // bond constructor
    }
    $now? = Date.now();
    tick() { this.$now = Date.now(); }
    view() {
        const elapsed = (this.$now ?? 0) - (this.$startTime ?? 0);
        return <div>{elapsed}ms</div>;
    }
}
```

### 7. The escape hatch: `react(chemical)`

If you mutate state from a context the framework can't observe, call `react`:

```tsx
import { react } from '@dna/chemistry';

// Somewhere outside a handler/method:
chemical.$state = newValue;
react(chemical);  // tell the framework
```

This is the last-resort API. Most code never needs it. Use when:
- Writing test helpers that need to flush updates.
- Integrating with external libraries whose callbacks do in-place mutations.
- You've understood the contract and know you're outside it.

---

## What you will never write

- `setState()` — state is on the class, mutate directly.
- `useState(initial)` — use a field initializer.
- `useEffect(() => ..., [deps])` — override a lifecycle method (`mount`, `unmount`, etc.) or await `this.next(phase)`.
- `useMemo(() => ..., [deps])` — use a getter.
- `useCallback(fn, [deps])` — use a method.
- `useRef()` — use a class field, usually underscore-prefixed.
- `useContext()` — reach into `this.$parent` or hold a reference.
- `React.memo(Component)` — not applicable; chemicals manage their own rendering.
- `useSyncExternalStore()` — put the external store on a chemical.

Every React primitive has a natural OO replacement.

---

## What the framework does for you

Behind the scenes, when you write:

```tsx
<button onClick={() => this.increment()}>+</button>
```

The framework:
1. Wraps `onClick` in a scope-aware wrapper.
2. When clicked: opens a scope.
3. `this.increment()` runs. Method wrapper sees the active scope, doesn't open a new one (nested scopes flatten).
4. `this.$count++` — getter fires (scope records read with snapshot), setter fires (scope records write).
5. Method returns. Wrapper checks for a Promise; if not, scope is about to finalize.
6. Handler returns. Scope finalizes: for this chemical, the write was observed; fire `react()`.
7. React's scheduler sees the `setState`, commits, and re-renders.

You wrote three lines and got full reactivity. That's the design.

---

## Known limits

These are the honest boundaries of the framework:

- **In-place mutations outside any scope don't react.** The setter we install only fires on replacement writes. `this.$map.set(k, v)` outside a method or handler is a no-op for reactivity. Workaround: wrap in a method.
- **Non-deterministic views cause infinite re-renders.** `new Date()` in view, `Math.random()` in view. Document, don't do.
- **Chemicals reading each other's state outside a common React ancestor** stay stale. If A's view reads B's state, A and B need to share a React ancestor that re-renders on changes, or you explicitly re-render A after changes to B.
- **Bound functions have opaque equality.** `this.handler.bind(this)` — two instances look identical to the diff. Use arrows (`() => this.handler()`) instead.
- **The framework makes its state accessible as fields; deeply-nested non-chemical objects aren't tracked below the top level**, except via the read-snapshot + scope-finalize mechanism. In a scope, nested changes are caught. Outside, not.

These limits are documented, not bugs. Work within them and everything else Just Works.

---

## Philosophy

React externalized state. $Chemistry puts it back on the object where it belongs. React turned components into functions. $Chemistry makes them classes again. React decomposed lifecycle into hooks. $Chemistry gives you methods for each phase.

The cost: you accept some framework magic (scope tracking, method wrapping, view augmentation) to eliminate the per-line ceremony (setState, memo, dep arrays). The trade is intentional.

## See also

- [reactive bonds (feature)][feat-reactive-bonds] — the surface this contract describes.
- [derivatives and fan-out (concept)][concept-derivatives] — how parent writes propagate.
- [cross-chemical handler fanout (caveat)][cav-cross-chemical] — the path that almost broke this contract.
- [performance contract] — what this costs at runtime.

<!-- citations -->
[feat-reactive-bonds]: ./features/reactive-bonds.md
[concept-derivatives]: ./concepts/derivatives-and-fan-out.md
[cav-cross-chemical]: ./caveats/cross-chemical-handler-fanout.md
[performance contract]: ./performance-contract.md
