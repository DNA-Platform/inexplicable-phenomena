---
kind: report
title: React ↔ $Chemistry integration — how the two play together
status: draft
---

# React ↔ $Chemistry Integration

## The question

$Chemistry is built on React. Every chemical's `view()` returns `ReactNode`. Every Component produced by `$()` is a React function component. But React has its own ecosystem of components — react-router's `<Link>`, styled-components' styled atoms, third-party UI libraries, custom function components. How do these interoperate with chemicals, and what's the canonical interface?

## The current state

### Chemicals rendering React components (works cleanly)

A chemical's `view()` can render any React component:

```tsx
class $Nav extends $Chemical {
    view() {
        return (
            <nav>
                <Link to="/home">Home</Link>        {/* react-router */}
                <StyledButton>Click</StyledButton>   {/* styled-component */}
                <SomeLibraryWidget />                 {/* any React FC */}
            </nav>
        );
    }
}
```

This works because `view()` returns `ReactNode`. React doesn't know or care that the parent is a chemical — it just sees the elements in the tree.

### React components rendering chemicals (works cleanly)

A React function component can render a chemical's Component:

```tsx
function App() {
    return (
        <div>
            <Header />      {/* chemical via $($Header) */}
            <Counter />     {/* chemical via $($Counter) */}
        </div>
    );
}
```

The Component returned by `$()` IS a React function component. React reconciliation handles it normally — keys, props, unmounting all work.

### The grey area: chemicals as children of chemicals

When a chemical renders another chemical as a child, the framework's synthesis layer gets involved. Synthesis parses the JSX children and matches them to the bond constructor's typed parameters. This is the typed-composition system — it's what makes `<Book><Chapter /><Chapter /></Book>` validate types at bind time.

**This only happens when the parent has a bond constructor.** If the parent chemical has no bond constructor (no method named after the class), synthesis treats children as plain React children via `this.children`.

### What works today

| Pattern | Status | Notes |
|---------|--------|-------|
| Chemical renders React FC | ✅ | `view()` returns ReactNode; React handles it |
| React FC renders Chemical Component | ✅ | `$()` returns a React FC; React handles it |
| Chemical renders styled-component | ✅ | Styled-components are React FCs |
| Chemical renders react-router `<Link>` | ✅ | Link is a React FC |
| Chemical with bond ctor takes Chemical children | ✅ | Synthesis parses and type-checks |
| Chemical with bond ctor takes FC children | ⚠️ | Works since sprint-32 fix, but FC is wrapped as `$Function$` |
| Chemical without bond ctor takes FC children | ✅ | Fixed in sprint 32 (bug C3) |
| Chemical receives ReactNode as a `$`-prop | ✅ | Fixed — `$symbolize` handles it correctly |
| React hooks inside chemical's `view()` | ✅ | Works for ecosystem hooks (useParams, useNavigate) |
| $Chemistry hooks in React FC | ❌ | No equivalent — chemicals use class fields, not hooks |

### What the interface should be

**The rule: React components should be callable from $Chemistry, and chemicals should be callable from React. The boundary is the `$()` callable.**

From $Chemistry → React:
- Render any React component in `view()`. No wrapping needed.
- Pass props normally. The chemical's `$`-membrane doesn't affect outgoing props — it only transforms incoming props on the chemical itself.

From React → $Chemistry:
- Import the Component: `import { Counter } from './counter'`
- Render it: `<Counter count={5} />`
- The `$()` callable already produces a standard React FC. No adapter needed.

**There is no need to wrap React components to call them from $Chemistry.** A chemical's view can render any React component directly. The framework doesn't intercept outgoing JSX — it only intercepts incoming props (via `$apply$`) and outgoing handlers (via `augment`).

**There is no need to wrap chemicals to call them from React.** The `$()` Component is already a React FC.

### The one gap: React context

React context (`useContext`) works inside a chemical's `view()` because `view()` runs inside React's render cycle. `ThemeProvider` from styled-components is an example — every styled-component inside a chemical reads from the theme context, and it works.

However, a chemical cannot CREATE a context provider in the traditional React way (because `createContext` + `Provider` is a React pattern, not a $Chemistry pattern). If a chemical needs to provide ambient state to its subtree, the options are:

1. **Pass via props** — the chemical passes state to children through typed bond-ctor args or `$`-props.
2. **Use the catalyst graph** — `$catalyst` threads a root reference through the composition tree. Children read from the root chemical.
3. **Use a React context provider in `view()`** — the chemical renders a `<MyContext.Provider value={...}>` in its view, and descendant React components (or chemicals using `useContext` in their view) read from it.

Option 3 is the cleanest for React-ecosystem integration. It's how `ThemeProvider` already works — a chemical or FC at the root renders the provider, and everything below reads from it.

### Recommendation

**No new API needed.** The integration already works:

- `$()` is the bridge from $Chemistry → React (produces a React FC)
- `view()` returning `ReactNode` is the bridge from React → $Chemistry (accepts any React element)
- React context works inside `view()` for ecosystem-level ambient state
- The catalyst graph provides $Chemistry-native ambient state

The interface IS `$()` and `view()`. They're already the canonical boundaries. The framework doesn't need a new wrapping mechanism — it needs the existing boundaries to be well-documented and trusted.

### Action items

1. Document this in `for-component-authors.md` — a "Working with React components" section
2. Add a test to the Lab showing a chemical composing with a third-party React component (e.g., rendering a `<Link>` from react-router inside a chemical's view)
3. Consider adding a Lab test that shows a React FC rendering a chemical — the inverse direction
