# chemistry-basics

Domain knowledge for writing app code in `$Chemistry`. Loaded by roles whose work composes chemicals (e.g. `$Chemistry Developer`).

This ability does not duplicate the docs. It points at them, names the rules a developer must internalize before opening a file, and surfaces the *deciding* questions — the ones an author should ask of their own code.

## Required reading order

Before writing a single line of `$Chemistry`, read in order:

1. `.claude/docs/chemistry/index.md` — the entry point. The 30-minute reading path.
2. `.claude/docs/chemistry/for-component-authors.md` — the daily-author shape.
3. `.claude/docs/chemistry/coding-conventions.md` — the `$` grammar, export rule, formatting.
4. `.claude/docs/chemistry/composing-with-react.md` — the principle: chemicals compose with the React ecosystem, do not replace it.
5. `.claude/docs/chemistry/when-to-reach-for-a-chemical.md` — the function-vs-chemical decision.

If any rule below is unclear, the linked doc is the source of truth. Do not invent.

## Hard rules (non-negotiable)

1. **`$()` is the only public way to obtain a Component.** No `.Component` accessor in author code (the framework's internal accessor is symbol-keyed and not part of the public API). For class form: `export const Book = $($Book)`. For held instances: `export const Lab = $(lab)` with lowercase `lab` instance and capital `Lab` Component.
2. **Each chemical file exports its own Component.** Other files import that Component. Never instantiate a class to get a Component.
3. **Base classes (`$Particle`, `$Chemical`, `$Atom`) do not get exported as Components.** They have no useful view; they are extension points.
4. **No inline `style={{}}` in app code for styling decisions.** Styled-components co-located in `*.styled.ts` next to the chemical, reading from the `ThemeProvider` via `(p) => p.theme.X`. Inline styles for *truly dynamic per-element values* (drag x/y, computed CSS variables) are the only allowed exception.
5. **No React hooks in app code.** If you reach for `useState`, `useEffect`, `useMemo`, `useRef` — make a chemical instead. Reactive `$`-prefixed properties replace `useState`. `async effect() { await this.next('mount'); ... }` replaces `useEffect`. Plain class fields replace `useRef`.
6. **Compose, don't replace.** Routing → `react-router-dom`. Server state → `react-query`. Animation → `framer-motion`. UI primitives → `radix-ui` / `react-aria`. Markdown → `react-markdown`. Syntax highlighting → `prism-react-renderer`. `$Chemistry` is a component framework; reaching for the React-ecosystem package is correct, not a defeat.
7. **The two `$` conventions.** On a chemical, `$name` is the membrane (strip at the JSX boundary — consumer writes `name="x"`). On a styled-component, `$name` is styled-components' transient-prop convention (don't forward to DOM). Same character, unrelated systems. Watch for the collision.
8. **Doc-first.** If a pattern needed isn't documented, write the doc first, then the code. Discovering you need to extend the rules is a doc bug, not a code freedom.

## Decision questions (ask these before writing)

Before reaching for a hook:
- *Could a chemical with a `$`-reactive property hold this state?* — Yes 99% of the time.

Before plumbing a color/spacing/typography value as a prop:
- *Could a styled-component read this from theme directly?* — Yes if it's a theme value. Variant *selectors* (`$active`, `$variant: 'primary'`) are fine; variant *values* (`color: theme.X`) belong in the styled-component, not in props.

Before writing a function component for app code:
- *Does it have state, lifecycle, or take typed JSX children?* — If yes, make it a chemical. If no (pure render only), function component is fine.

Before reaching for `new $X().Component`:
- *Is the file I'm copying from a doc?* — The docs say `$()`. If you saw `.Component` somewhere, it's stale or framework-internal.

Before instantiating a chemical class repeatedly:
- *Am I trying to get the same Component identity?* — Don't instantiate. Import the exported `Name` once. `$()` caches.

Before writing in-app routing/state-mgmt/data-fetching/animation/markdown logic:
- *Does the React ecosystem already have a package for this?* — Yes, almost always. Use it.

## Where to place files

```
sections/
  {section-id}-{slug}.tsx         section module — composes Cases via $CaseShell
  {section-id}/
    case-1.tsx                     one Case demo per file (default-exported)
    case-2.tsx
    case-N.tsx
    case.styled.ts                 styled atoms shared across this section's Cases

apparatus/
  {chemical}.tsx                   the chemical class + $() export
  {chemical}.styled.ts             styled atoms reading from theme
```

The `?raw` import of each Case file's source feeds the source-toggle. Therefore: keep each Case file *self-contained*. The displayed code is the running code.

## OO discipline (DRY, simple, testable)

- **Subclass for variants.** `$Pass extends $Status`, `$Fail extends $Status` — each has its own `view()` returning a dedicated styled atom. No `$color`/`$bg` props plumbed into a generic styled component.
- **Method binding works.** Write `onClick={this.method}` — the framework intercepts. No `.bind(this)`, no arrow wrapper, no `useCallback`.
- **Reactive properties hold state, regular fields hold derived/internal values.** `$count` reactive (read in view, write triggers re-render). `_timer` non-reactive (`setInterval` handle, no `$`).
- **One chemical per concern.** Don't conflate the toggle's state with the Case's display logic with the section's composition logic. Each gets its own `$Chemical` if it has its own state.
- **`$check` validates at the bond-ctor boundary.** Inside `$Foo(...args)`, check each arg's type. Errors surface at bind time with formatted messages, not at render time as cryptic React errors.
- **Polymorphism through subclass property override.** If a chemical's view reads `this.MyStyled`, subclasses override `MyStyled` to change appearance without touching the parent's render code.

## Anti-patterns to recognize

| Smell | Why | Fix |
|-------|-----|-----|
| `useState` in app code | Framework solves this differently | Chemical with `$`-reactive property |
| `useEffect` in app code | Same | `async effect() { await this.next('mount'); ... }` |
| `useRef` for mutable instance state | The chemical *is* the instance | Plain (no `$`) class field |
| Function component growing 3+ hooks | Time to migrate | Chemical |
| `new $X().Component` | Framework-internal accessor leaked into author code | `$($X)` |
| Inline `style={{}}` for theme values | Drift inevitable | Styled atom reading from theme |
| `$color` / `$bg` plumbed as props on a generic styled-component | Theme passing through chemicals | Subclass per variant; each variant has its own dedicated styled atom |
| Custom router / event bus / focus trap / markdown parser | Reinventing React-ecosystem packages | Use the package |
| Hand-rolled keyboard shortcut listener | Same | Use a small package or `useHotkeys` (in a thin chemical wrapper) |
| `React.Children.toArray` | The framework parses typed JSX children for you | Bond ctor with typed parameters |

## When something can't be done in $Chemistry

If you genuinely hit a wall — a feature the framework should provide but doesn't — that is a *framework gap*. Surface it:

1. Don't reach for React as a workaround silently. Document the gap.
2. Pair with the framework engineer (Cathy) on whether to add the feature, work around with composition, or accept the limit.
3. Update this ability file with the gap once the decision lands so future authors see it.

The framework should be *easier* than React for the things it covers. If it isn't, that's a bug in the framework, the docs, or the author's mental model — figure out which one before writing your way around it.
