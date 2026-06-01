---
kind: guide
title: When to reach for a chemical
status: stable
---

# When to reach for a chemical

Not every component should be a chemical. The framework gives you reactive properties, lifecycle, bond constructors, and method binding — but those features have weight. A purely visual atom that takes props and returns JSX doesn't need them, and using a chemical anyway adds machinery you'll never read.

## The decision rule

| If the component… | Use |
|------|-----|
| Has no state | **Function component** |
| Has no lifecycle hooks | **Function component** |
| Has no children-as-typed-args | **Function component** |
| Reads from `theme` and renders | **Function component** (or styled-component directly) |
| Has reactive state (`$`-prefixed properties read in `view()`) | **Chemical** |
| Needs lifecycle (mount, unmount, effect-like behavior) | **Chemical** |
| Takes typed JSX children via a binding constructor | **Chemical** |
| Reaches for `useState`, `useEffect`, `useMemo` | **Chemical** (the hooks are the smell) |

The rule in one sentence: **if you would otherwise reach for a React hook in app code, make it a chemical instead.**

## Worked examples

### Function component is right

A divider:

```typescript
import styled from 'styled-components';

export const Divider = styled.hr`
    border: 0;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    margin: 12px 0;
`;
```

A pill that displays a label and accent color:

```typescript
import { Pill } from './pill.styled';

export function StatusPill({ label, accent }: { label: string; accent: string }) {
    return <Pill $accent={accent}>{label}</Pill>;
}
```

These have no state, no lifecycle, no typed children. The chemical machinery would be overhead with no payoff.

### Chemical is right

A counter:

```typescript
import { $, $Chemical } from '@dna-platform/chemistry';

class $Counter extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() { return <button onClick={this.increment}>{this.$count}</button>; }
}

export const Counter = $($Counter);
```

The `$count` is reactive. `view()` reads it; `increment()` writes it; the framework re-renders. A function component would need `useState`, which is the smell.

A book that takes typed chapter children:

```typescript
class $Book extends $Chemical {
    chapters: $Chapter[] = [];
    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters;
    }
    view() { return <article>{this.chapters.map(c => c.view())}</article>; }
}

export const Book = $($Book);
```

The bond constructor `$Book(...chapters)` declares what children the Component accepts. The framework validates the JSX child tree against this signature at bind time. A function component would need `React.Children.toArray` plus runtime type-guessing.

A modal with mount/unmount lifecycle:

```typescript
class $Modal extends $Chemical {
    $open = false;
    async next(phase: string) { /* lifecycle awaiter */ }
    view() {
        if (!this.$open) return null;
        return <div role="dialog">{this.children}</div>;
    }
}

export const Modal = $($Modal);
```

The lifecycle and reactive state push this into chemical territory.

## The migration trigger

If a function component grows toward needing state or lifecycle, **migrate it to a chemical immediately** — don't reach for hooks. The pattern:

```typescript
// Before — function component, working fine:
export function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}</h1>;
}

// After — needs to track click count, migrate to chemical:
class $Greeting extends $Chemical {
    $name?: string;
    $clicks = 0;
    view() {
        return (
            <h1 onClick={() => this.$clicks++}>
                Hello, {this.$name} ({this.$clicks} clicks)
            </h1>
        );
    }
}
export const Greeting = $($Greeting);
```

The wrong move would be:

```typescript
// Wrong — hooks in app code:
export function Greeting({ name }: { name: string }) {
    const [clicks, setClicks] = useState(0);  // ← the smell
    return <h1 onClick={() => setClicks(c => c + 1)}>Hello, {name} ({clicks} clicks)</h1>;
}
```

## Class form vs. instance form

When you decide on a chemical, you have one more decision: **how to export the Component**.

```typescript
// Class form — the default. Stateless template.
export const Counter = $($Counter);

// Instance form — only when one held instance owns state across mounts.
const lab = new $Lab();
export const Lab = $(lab);
```

Class form is correct **unless** the chemical genuinely needs to persist state between mounts of the same Component. In practice this is rare — usually it's only the app shell that needs the instance form (one held instance carrying app-level state like the active route). Default to class form; reach for instance form when there's a documented reason.

## Anti-patterns to recognize

| Smell | Why | Fix |
|-------|-----|-----|
| `useState` in app code | The framework solves this differently | Chemical with `$`-reactive property |
| `useEffect` in app code | Same | Chemical with `next("mount")` lifecycle |
| `useMemo` for derived render values | Often unnecessary inside `view()` | Inline computation, or a getter on the chemical |
| `useRef` for mutable instance state | The chemical *is* the instance | Plain class field on the chemical (no `$`) |
| `useContext` for ambient state | Cross-chemical state belongs in a context provider — but the *consumer* should be a chemical reading the context inside `view()` | `view() { const x = useContext(MyCtx); ... }` is fine; the wrapping chemical preserves the framework's reactivity |
| Function component growing toward 3+ hooks | Time to migrate | Chemical |

If you see hooks accumulating in a function component in app code, migrate it. Don't try to "fix" the function component by adding more hooks — the smell is *that hooks are there at all*.

## See also

- [for-component-authors.md][authors] — the full author shape.
- [composing-with-react.md][composing] — chemicals compose with the React ecosystem.
- [coding-conventions.md][cc] — formatting, the `$` grammar.

<!-- citations -->
[authors]: ./for-component-authors.md
[composing]: ./composing-with-react.md
[cc]: ./coding-conventions.md
