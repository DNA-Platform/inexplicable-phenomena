---
kind: philosophy
title: Why $Chemistry exists
status: stable
---

# Why $Chemistry exists

## The problem with React

React components are functions. They run, they return JSX, they have no memory between calls. Hooks give them memory — but through an API designed for a functional language, implemented in a language that isn't functional.

JavaScript has no enforced immutability. No enforced purity. No algebraic types. No pattern matching. The "rules of hooks" exist because JavaScript can't enforce call-order constraints structurally. `useState` returns a tuple because that's how functional languages return multiple values — but JavaScript destructuring is syntactic sugar, not a type-theoretic guarantee. `useCallback` exists because functions in JavaScript create new references on every call — a problem that doesn't exist in languages with referential transparency.

Hooks are a clever solution to giving functions memory. But they're a workaround for functions not naturally having memory. JavaScript objects naturally have memory. `this.count` persists between method calls. Methods are stable references. State is fields. That's not an opinion — that's the language.

## What $Chemistry is

$Chemistry is a way of writing React components using JavaScript the way it was designed — with objects that have state, methods, and identity.

```typescript
class $Counter extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() {
        return <button onClick={this.increment}>{this.$count}</button>;
    }
}

export const Counter = $($Counter);
```

`$count = 0` — state, declared as a class field. `increment()` — a method. `this.$count++` — direct mutation. `onClick={this.increment}` — a method reference that binds automatically. No `useState`. No `useCallback`. No dependency arrays. No rules about call order.

The output is `Counter` — a standard React component. Import it, render it, pass it props. It composes with react-router, styled-components, framer-motion, react-query — anything in the React ecosystem. The consumer never knows it's a chemical. The `$` disappears at the boundary.

## What $Chemistry is NOT

$Chemistry is not the only way OOP could work in React. It's not a claim that OOP is universally better than hooks. It's a specific design that sits on top of React in an interesting way, using JavaScript's natural object model to produce standard React components with less ceremony.

React evolved from class components to hooks for real reasons — `this` binding was confusing, lifecycle methods were a maze, mixins polluted the prototype chain. $Chemistry keeps the benefits of objects (persistent identity, methods, encapsulation) while fixing the problems React abandoned classes over:

- **Method binding** — the molecule installs bound-method getters automatically. `onClick={this.increment}` works. No `.bind(this)`, no arrow wrapping.
- **Lifecycle** — `async effect() { await this.next('mount'); ... }` is linear code. No `componentDidMount` / `componentDidUpdate` / `componentWillUnmount` maze. No `useEffect` dependency arrays.
- **Reactivity** — write `this.$count++` and the view updates. No `setCount(c => c + 1)`. No setter functions. No stale closure bugs.

## The bond constructor

React has no elegant way for a component to control how it receives children.

`props.children` is an opaque `ReactNode`. You get whatever the consumer passes. If you want to know that your Book received Chapters and not arbitrary divs, you write `React.Children.toArray()`, do runtime instanceof checks, and hope. There's no contract. There's no type enforcement. There's no way to say "this component accepts exactly these kinds of children."

The bond constructor solves this:

```typescript
class $Book extends $Chemical {
    chapters: $Chapter[] = [];
    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters.map(c => $check(c, $Chapter));
    }
    view() { /* the Book controls how Chapters display */ }
}
```

When you write `<Book><Chapter /><Chapter /></Book>`, the framework parses the JSX children, matches them to the typed parameters of `$Book(...)`, and validates with `$check`. The Book doesn't receive opaque ReactNode — it receives typed, validated Chapter instances.

This is construction through rendering. `<Chapter />` in JSX isn't "rendering a chapter component" — it's bringing a Chapter into existence within a Book. The Book receives the Chapter through its bond constructor because that's when the Chapter becomes real. The bond constructor IS composition — typed, validated, controlled by the parent.

## Polymorphism

React struggles with reusable abstractions. Consider a component library: a `<Card>` that can contain different kinds of content, a `<List>` that renders different item types, a `<Form>` with different field types. In React, you pass render props, use compound components with context, or resort to `as` prop patterns. None of these give you polymorphism — the ability to substitute one implementation for another while the parent's code stays the same.

In $Chemistry, polymorphism is natural:

```typescript
class $Chapter extends $Chemical {
    $title = '';
    view() { return <section><h3>{this.$title}</h3>{this.children}</section>; }
}

class $IllustratedChapter extends $Chapter {
    $image?: string;
    view() {
        return (
            <section>
                {this.$image && <img src={this.$image} />}
                <h3>{this.$title}</h3>
                {this.children}
            </section>
        );
    }
}
```

`$Book(...chapters: $Chapter[])` accepts both `$Chapter` and `$IllustratedChapter`. The Book's code doesn't change. The Chapter subclass overrides `view()` to add illustration support. The parent renders chapters without knowing which kind it received. That's polymorphism — and React has no simple equivalent.

This matters in component libraries. It matters in design systems. It matters anywhere you want to define a contract ("this slot accepts Chapters") and allow implementations to vary. React's answer is typically "pass a render function" or "use context." $Chemistry's answer is: subclass, override view, done.

## The chemical metaphor

The name isn't decorative.

A **particle** (`$Particle`) is the simplest thing that can render — an object with a `view()`. It has identity (a unique CID), lifecycle (mount/unmount/effect), and reactivity (write a `$`-field, view updates). It's an atom of UI.

A **chemical** (`$Chemical`) is a particle that composes with other particles. It has a bond constructor — typed children that participate in its structure. It has synthesis — the framework process that parses JSX children into typed bonds. It has a catalyst graph — the tree of parent-child relationships that enables reactive propagation.

The metaphor maps: particles are fundamental. Chemicals are compounds — particles bonded together. The bond constructor is the bonding mechanism. The view is the observable behavior. Reactivity is energy transfer through bonds. It's a coherent metaphor for component composition, and it gives the framework a vocabulary that isn't borrowed from React or OOP — it's its own.

## The integration story

$Chemistry produces React components. That's the entire integration story.

`export const TodoApp = $($TodoApp)` — that's a React function component. Put it in a Next.js page, a Remix route, a plain `createRoot` call. Wrap it in `<ThemeProvider>`, `<QueryProvider>`, `<BrowserRouter>`. It doesn't know and doesn't care. React's ecosystem works because everything is components, and $Chemistry outputs components.

Going the other direction: a chemical's `view()` can render any React component. styled-components, react-router's `<Link>`, a headless `<Combobox>` from radix — just put them in the JSX. The chemical owns the state; the React ecosystem provides the UI primitives.

A developer can use components built with $Chemistry without knowing $Chemistry exists. A developer can build with $Chemistry while using every React library available. The `$` is internal. The Component is external. The boundary is clean.

## Who it's for

$Chemistry is for developers who think in objects — who model their domain as things with properties, methods, and relationships — and want that mental model to be the code they write, producing standard React components that work everywhere React works.

It's not for everyone. Developers who prefer functional composition, who think in data transformations, who like the explicitness of hooks — React serves them well. $Chemistry is an alternative, not a replacement. It adds OOP-based component authoring to the React ecosystem for the developers who want it.

The bet: that JavaScript is an object-oriented language, that objects are a natural model for UI components, and that a framework can use this to produce cleaner component code while maintaining full React compatibility. $Chemistry is that framework.
