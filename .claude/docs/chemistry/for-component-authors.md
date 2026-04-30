---
kind: guide
title: $Chemistry for component authors
status: stable
---

# $Chemistry for component authors

You are about to write a Component. This document is the daily-author cheatsheet: declare the chemical, write `view()`, export with `$()`, style with styled-components. If you read one document before coding, read this one.

## The minimum shape

A `.tsx` file that defines a Component:

```typescript
// book.tsx
import { $, $Chemical } from '@dna-platform/chemistry';

class $Book extends $Chemical {
    $title?: string;
    view() {
        return <h1>{this.$title}</h1>;
    }
}

export const Book = $($Book);
```

Three things to notice:

1. **`$Book` is the chemical class.** It is internal — never imported by consumers, never seen outside this file.
2. **`Book` is the Component.** Capital-first React convention. This is what the rest of the app imports.
3. **`$($Book)` is how you create the Component from the class.** Never `new $Book().Component`. That accessor is internal framework mechanism; `$()` is the public surface.

Consumers write:

```tsx
import { Book } from './book';

<Book title="Catch-22" />
```

The `$` on `$title` becomes a regular prop `title` at the boundary. The `$` never escapes the module.

## The two forms of `$()`

- **Class form** — `$($Book)`. Use this for **stateless templates**. Every mount runs the bond constructor fresh; React reconciliation manages identity. **This is the default.**
- **Instance form** — `$(lab)`. Use this *only* when one held instance owns state that must persist across mounts. The lowercase variable is the held instance; the capital export is the Component.

Example of when instance form is right:

```typescript
// lab.tsx — the app shell holds the active route across navigation
class $Lab extends $Chemical {
    $activeSection = '0.1';
    view() { /* renders the current section */ }
}

const lab = new $Lab();              // single held instance
export const Lab = $(lab);           // Component routes through $lift
```

If you find yourself reaching for the instance form, ask: *does this chemical genuinely own state that must persist between mounts of the same Component?* If no, use class form.

## What goes in `view()`

`view()` returns a `ReactNode`. JSX, arrays of JSX, a string, `null` — all valid. The chemical's `$`-prefixed properties are reactive: reading them inside `view()` registers a dependency, writing them triggers a re-render.

```typescript
class $Counter extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() {
        return <button onClick={this.increment}>{this.$count}</button>;
    }
}
```

Method binding works automatically. `onClick={this.increment}` does not lose `this` — the framework's molecule/bond system intercepts. This is one of the framework's biggest usability wins; it's why $Chemistry exists.

## Bond constructors — typed JSX children

When a Component takes children, declare a *binding constructor* — a method named after the class — with typed parameters. The framework parses the JSX child tree and matches it against the parameter types.

```typescript
class $Book extends $Chemical {
    chapters: $Chapter[] = [];
    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters;
    }
    view() { return <article>{this.chapters.map(c => c.view())}</article>; }
}
```

In JSX: `<Book><Chapter /><Chapter /></Book>`. The framework validates child types via `$check()` at bind time. No `React.Children.toArray()`, no type-guessing.

## Styling — co-located styled-components

Styling lives in a sibling `.styled.ts` file:

```typescript
// book.styled.ts
import styled from 'styled-components';

export const BookFrame = styled.article`
    padding: ${(p) => p.theme.size.bookPadding};
    background: ${(p) => p.theme.color.paper};
    color: ${(p) => p.theme.color.ink};
`;
```

```typescript
// book.tsx
import { BookFrame } from './book.styled';

class $Book extends $Chemical {
    view() { return <BookFrame>{this.$title}</BookFrame>; }
}
```

**No inline styles for styling decisions in app code.** Colors, spacing, typography, layout — flow through styled-components reading from theme. The linter warns on inline `style={{}}`; the warning is the rule. The only allowed exception is truly dynamic per-element values that styled-components can't reasonably express (CSS variables computed from runtime state, x/y from drag, etc.). Theme values come from the `ThemeProvider` set up at the app root; access them via the `(p) => p.theme.X.Y` callback.

For variant styling (e.g., a button that's primary or secondary), use styled-components' **transient props** with the `$` prefix:

```typescript
const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
    background: ${(p) => p.theme.color[p.$variant]};
`;
```

> **Two `$` conventions, same character.** Inside a chemical, `$name` on a class field is the `$Chemistry` membrane: the prop arrives as `name` (no `$`) at the JSX boundary. On a styled-component, `$name` in props is styled-components' **transient-prop** convention: the prop is *not* forwarded to the DOM (so you don't get `<span $color="..."`>` invalid HTML). Both happen to use `$`. They are unrelated systems with opposite directions: the chemical `$` is a *receiving* membrane (strip `$` from incoming props); the styled-component `$` is a *passing* signal (don't forward this to DOM). When you see `<StyledThing $color={...}>` inside a chemical's `view()`, the `$` is styled-components', not `$Chemistry`'s. Watch for it; the syntactic collision is real.

## Function components vs. chemicals

Not every visual atom needs to be a chemical. The decision rule:

| If… | Use |
|-----|-----|
| Pure render, no state, no lifecycle, no children-as-typed-args | **Function component** |
| Stateful, lifecycle hooks, reactive props, typed JSX children | **Chemical** |

A 5-line function that takes props and returns JSX is a function component. The moment you reach for `useState`, `useEffect`, or anything composing with the framework's reactive system — make it a chemical. **Never use React hooks in app code directly.** If you need state, you need a chemical.

See [when-to-reach-for-a-chemical.md][when-chemical] for worked examples.

## Composing with React

$Chemistry is a *component framework*. It is not a routing framework, a state-management framework, or a data-fetching framework. Use the React ecosystem for those:

- Routing: **react-router-dom**
- Server state: **react-query** / **swr**
- Animations: **framer-motion**
- UI primitives: **radix-ui** / **react-aria**
- Markdown: **react-markdown**
- Syntax highlighting: **prism-react-renderer**

A chemical can render any of these inside its `view()` and the framework will compose with them cleanly. See [composing-with-react.md][composing] for the principle and worked examples.

## What goes where in the file

Inside a single chemical file, the order is:

1. Imports (framework, React, packages, then local)
2. Helper types
3. The chemical class (`class $Book extends $Chemical { ... }`)
4. The Component export (`export const Book = $($Book)`)

The class stays internal. The Component is the only export from the file (unless you have multiple Components in one file, in which case all of them are exported via `$()`).

## Anti-patterns — recognize these

If you see one of these in the codebase, it is a bug:

| Bad | Why | Right |
|-----|-----|-------|
| `new $Book().Component` | `.Component` does not exist on chemicals (the internal accessor is symbol-keyed) | `$($Book)` |
| `<style={{ ... }}>` in app code | Theme values inaccessible, drift inevitable | styled-component reading from theme |
| `import { Chemical } from '@dna-platform/chemistry'` | `Chemical` is not exported (it's a base class, nothing to render) | Don't import; `$Chemical` is for extending only |
| `useState` in app code | Hooks are React's solution to a problem chemicals solve differently | Make it a chemical with a `$` reactive property |
| Custom hash router, custom event bus, custom focus trap | $Chemistry composes with React; reinventing undermines the thesis | Reach for the package: react-router-dom, etc. |

## Doc-first rule

Before writing any chemical, this document and `coding-conventions.md` are the source of truth. If you discover a pattern not documented here:

1. Stop coding.
2. Write the doc.
3. Get review on the doc.
4. *Then* write the code.

The team's last attempt to write $Chemistry from a partial reading produced extensive cleanup work. Doc-first prevents this.

## See also

- [coding-conventions.md][cc] — formatting rules, the `$` grammar, what not to do.
- [composing-with-react.md][composing] — the principle behind every "don't roll your own" rule.
- [when-to-reach-for-a-chemical.md][when-chemical] — function vs. chemical decision.
- [glossary.md][glossary] — vocabulary lookup.
- [examples/use/counter.tsx][counter] — a working example end-to-end.

<!-- citations -->
[cc]: ./coding-conventions.md
[composing]: ./composing-with-react.md
[when-chemical]: ./when-to-reach-for-a-chemical.md
[glossary]: ./glossary.md
[counter]: ./examples/use/counter.tsx
