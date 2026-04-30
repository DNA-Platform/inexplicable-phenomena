---
kind: index
title: $Chemistry — start here
status: stable
---

# $Chemistry — start here

This is the entry point. If you are about to write $Chemistry code, read these documents in order before you touch a file. Following this path takes 30–45 minutes and is the difference between writing $Chemistry the way it was designed and reinventing it badly.

## Reading path

| # | Document | What you learn | Time |
|---|----------|----------------|------|
| 1 | [overview.md] | What $Chemistry is, the three audiences, the bet against The Good Parts. The *why*. | 5 min |
| 2 | [for-component-authors.md] | The daily-author shape: declare a chemical, write `view()`, export with `$()`. Where styled-components fit. When *not* to use a chemical. | 15 min |
| 3 | [coding-conventions.md] | The `$` grammar, the export pattern, formatting rules, what *not* to do. | 10 min |
| 4 | [composing-with-react.md] | $Chemistry composes with the React ecosystem — react-router, react-query, styled-components — it does not replace them. The principle behind every "don't roll your own" rule. | 5 min |
| 5 | [when-to-reach-for-a-chemical.md] | Decision rule: function component or chemical? Class form or instance form? Concrete examples. | 5 min |
| 6 | [examples/use/counter.tsx][counter] | A complete, working chemical end-to-end. The shape you copy from. | 5 min |

Do **not** skim. The team's last attempt to write $Chemistry from a partial reading produced 65 instances of the wrong export pattern, 61 inline-style violations, and a hand-rolled router. Reading in order prevents this.

## Reference (lookups, not reading-path)

- [glossary.md] — vocabulary. Every term: `$`-prefix, membrane, particle, chemical, atom, bond ctor, lift, particularization.
- [file-map.md] — where each piece of the framework lives in `library/chemistry/src/`.
- [reactivity-contract.md] — what reactivity guarantees the framework makes.
- [performance-contract.md] — what performance the framework promises.
- [books/] — chapter-length deep dives. Read after the path above; these explain *internals*, not author-facing shape.
- [caveats/] — historical bugs and the fixes. Read when you encounter symptoms that match.
- [examples/] — runnable examples; the canonical shape for elements, compounds, and lifecycle.

## Hard rules (locked in)

These are non-negotiable. If you find yourself about to violate one, stop and re-read the linked document.

1. **Export Components, not classes.** A `.tsx` file that defines a usable Component exports it: `export const Book = $($Book)`. Base classes (`$Particle`, `$Chemical`, `$Atom`) are not Components and are not exported as such. ([coding-conventions.md][cc-export])
2. **`$()` is the only way to obtain a Component.** There is no `.Component` property on a chemical — the internal accessor is symbol-keyed (`[$resolveComponent$]`) and not part of the public API. Author code uses `$()`, full stop. ([coding-conventions.md][cc-export])
3. **No inline styles for styling decisions in app code.** Colors, spacing, typography, layout — flow through styled-components co-located with the chemical (`header.tsx` next to `header.styled.ts`). Theme values come from `ThemeProvider`. The linter warns on inline `style={{}}`; the warning is the rule. Truly dynamic per-element values are the allowed exception. ([coding-conventions.md][cc-format])
4. **Compose, don't replace.** Use react-router for routing, react-query for data, styled-components for styles. $Chemistry composes with these — building our own undermines the thesis. ([composing-with-react.md])
5. **Doc-first.** If a pattern needed isn't documented, write the doc first, then the code. The docs are the source of truth.

## See also

- [When in doubt, ask the team.][team-registry] Cathy owns the framework, Libby owns the docs, Phillip and Gabby own the app's frontend, Queenie owns tests, Arthur orchestrates. The team registry has the full map.

<!-- citations -->
[overview.md]: ./overview.md
[for-component-authors.md]: ./for-component-authors.md
[coding-conventions.md]: ./coding-conventions.md
[composing-with-react.md]: ./composing-with-react.md
[when-to-reach-for-a-chemical.md]: ./when-to-reach-for-a-chemical.md
[counter]: ./examples/use/counter.tsx
[glossary.md]: ./glossary.md
[file-map.md]: ./file-map.md
[reactivity-contract.md]: ./reactivity-contract.md
[performance-contract.md]: ./performance-contract.md
[books/]: ./books/
[caveats/]: ./caveats/
[examples/]: ./examples/
[cc-export]: ./coding-conventions.md#export-pattern
[cc-format]: ./coding-conventions.md#formatting
[team-registry]: ../../team/agents/registry.json
