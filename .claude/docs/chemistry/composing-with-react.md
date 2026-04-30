---
kind: guide
title: Composing with the React ecosystem
status: stable
---

# Composing with the React ecosystem

$Chemistry is a *component framework*. It is not a routing framework, not a state-management framework, not a styling framework, not a data-fetching framework. **It composes with the React ecosystem; it does not replace it.**

This single sentence is the principle behind every "don't roll your own X" rule in the project. Every time we reach for a custom solution where a battle-tested package exists, we undermine the thesis that $Chemistry is a component framework that plays cleanly with React.

## The rule

> If a problem already has a well-supported React-ecosystem package, **use the package**.

There is no glory in writing your own router, your own focus trap, your own markdown parser. The glory is in writing components — that is what $Chemistry is for.

## Defaults

| Domain | Use this | Don't write your own |
|--------|----------|----------------------|
| Routing | **react-router-dom** | hash parsers, history wrappers, custom URL → state plumbing |
| Server state / fetching | **react-query** (TanStack Query) or **swr** | useEffect-fetch, custom cache, custom retry logic |
| Forms | **react-hook-form** | controlled-input plumbing, custom validation pipelines |
| Animations | **framer-motion** | requestAnimationFrame loops, custom easing |
| UI primitives | **radix-ui** or **react-aria** | dialogs, popovers, dropdowns, focus traps, tooltips |
| Drag/drop | **dnd-kit** | mousedown/mousemove/mouseup state machines |
| Markdown | **react-markdown** | regex parsers, AST walkers |
| Syntax highlighting | **prism-react-renderer** or **shiki** | tokenizers |
| Icons | **lucide-react** or similar | hand-traced SVGs |
| Date/time | **date-fns** or **dayjs** | manual `Date` math |
| Styling | **styled-components** | inline `style={{}}` patterns, custom CSS-in-JS |

This list isn't prescriptive on *which* package to choose where multiple exist (react-query vs. swr, radix vs. react-aria) — pick whichever fits the constraint. It is prescriptive on *whether* to use a package: yes, always, until you have a documented reason not to.

## Why chemicals compose cleanly

A chemical's `view()` returns a `ReactNode`. Anything that produces a `ReactNode` is fair game inside it:

```typescript
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

class $NavButton extends $Chemical {
    $to?: string;
    view() {
        const navigate = useNavigate();
        return (
            <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(this.$to!)}
            >
                {this.children}
            </motion.button>
        );
    }
}

export const NavButton = $($NavButton);
```

This is the canonical shape. Routing comes from react-router. Animation comes from framer-motion. The chemical owns the prop wiring (`$to`), the click handler glue, and the children composition. Each tool does what it does best.

## When the framework's reactive system *is* the right answer

There's one case where $Chemistry replaces a React-ecosystem tool intentionally: **per-chemical local state**.

React's hooks are a solution to a problem the framework solves differently. Inside a chemical, you don't reach for `useState`, `useEffect`, or `useMemo` — you declare `$`-prefixed reactive properties and lifecycle methods. The molecule/bond system handles re-renders, scope, and method binding.

```typescript
// Wrong — hooks in app code:
function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Right — chemical with reactive property:
class $Counter extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() { return <button onClick={this.increment}>{this.$count}</button>; }
}
export const Counter = $($Counter);
```

For *cross-chemical* state — state that spans many components — you reach for the React ecosystem again: react-context for ambient state, react-query for server state, zustand or jotai for client-state stores. Don't invent a custom event bus or pub/sub layer.

## When function components are the right answer

A purely visual atom — no state, no lifecycle, no typed children — can be a plain function component:

```typescript
function Divider() {
    return <hr style={{ /* don't, but you get the idea */ }} />;
}
```

Don't make a chemical for this. The chemical machinery has overhead the function component avoids. The moment the component grows state or lifecycle, *then* migrate it to a chemical.

See [when-to-reach-for-a-chemical.md][when-chemical] for the decision rule with worked examples.

## Anti-pattern — "we eat our own dogfood"

If you see code commented "no react-router, eats our own dogfood" or "no styled-components, custom CSS-in-JS" or any variant of "we built our own X" — that's the anti-pattern. The dogfood is *components*. Routing, fetching, animation, primitives — those are not what $Chemistry is for.

We had this exact comment in `apparatus/router.tsx` (now removed). It was a flag, not a feature.

## Doc-first rule for new tools

When you reach for a new package the project hasn't used before:

1. Add it to the table above with the domain it covers.
2. Write a short note in `references/` or in the relevant doc explaining the choice (which package, why over alternatives, any gotchas).
3. *Then* install and use it.

This keeps the team's mental model aligned: when someone needs animation later, they read this doc first and find the canonical answer, instead of evaluating from scratch.

## See also

- [for-component-authors.md][authors] — the daily-author shape.
- [when-to-reach-for-a-chemical.md][when-chemical] — function vs. chemical decision.
- [coding-conventions.md][cc] — the `$` grammar, formatting, anti-patterns.

<!-- citations -->
[authors]: ./for-component-authors.md
[when-chemical]: ./when-to-reach-for-a-chemical.md
[cc]: ./coding-conventions.md
