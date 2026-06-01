---
kind: concept
title: Lift — per-mount-site derivation
status: stable
---

# Lift

`$lift` is the framework's per-React-mount-site derivation function. Given a parent particle, it returns a React Component that, on each mount, creates a fresh derivative of the parent — `Object.create(parent)` with its own identity — and renders it. The same parent mounted at two JSX sites produces two derivatives; the parent's reactive writes fan out to both.

This chapter covers the lift mechanism on the `$Particle` layer. The model layer — what derivatives mean, what fan-out is — lives in the [lexical scoping][] and [derivatives and fan-out][derivatives] concept pages, which this chapter assumes.

## Two parents

`$lift` composes two distinct notions of "parent":

- **The prototype parent.** The `parent` argument to `$lift`. State inheritance flows through the prototype chain — a derivative reads `$prop` and the lookup cascades to `parent`'s backing if the derivative has no own backing for it. Bond accessors are inherited from the prototype parent (which had them installed at `molecule.reactivate()` time). Fan-out flows through the prototype parent's `[$derivatives$]` Set.
- **The context parent.** An optional second argument, set by the synthesis layer when it processes a chemical's children inside another chemical's bond. The context parent is what the *catalyst graph* needs — the chemical containing this one in the JSX tree, used by the reaction system. It is set via the `$parent` setter, which threads catalysts. The context parent does not appear in the prototype chain; it is purely a graph-edge.

These two parents are independent. A particle can have a prototype parent without a context parent (top-level mount), a context parent without a special prototype parent (a `$Chemical.prototype`-typed lift), or both (typical nested mount).

## What happens on first mount

[`$lift`][lift-fn] returns a React function-component closure. The closure uses `useState(-1)` to gate first-mount work behind a "have I created the derivative yet?" check.

On first mount, the Component:

1. **Reactivates the parent's molecule.** This is idempotent — the molecule's accessor-installation is the operation; calling it on an already-reactivated molecule is a no-op. Reactivation has to happen before `Object.create(parent)` because the bond accessors live on the parent's prototype after reactivation, and the derivative inherits them through the chain.
2. **Creates the derivative.** `p = Object.create(parent)`. Empty object whose prototype is the parent.
3. **Stamps fresh identity onto the derivative.** New cid, new symbol, fresh phases map, phase reset to `'setup'`. (See [identity][].) The derivative's identity is independent of the parent's; reads of `$cid`, `$symbol`, `$phase` find the derivative's own values, not chain-resolved.
4. **Creates a fresh `$Reaction`.** Each derivative is reactively independent. Its reaction registers in the cid-keyed reaction registry so `$Reaction.find(cid)` can recover the live derivative on React re-render.
5. **Wires the context parent.** If a context parent was provided and the derivative's surface includes a `$parent` setter (the chemical-layer marker), assign through the setter. The try/catch is there because the lift function lives on the particle layer, but the setter is chemical-layer; a particle-only derivative skips this branch silently.
6. **Registers with the parent's derivatives set.** `parent[$derivatives$] ??= new Set()` and `.add(p)`. This is what makes parent writes fan out to this site.
7. **Stores the derivative's cid.** `setCid(p[$cid$])` triggers a re-render; on the next render, the cid is non-negative, and the closure takes the re-entry branch.

## Re-entry on re-render

When React re-renders the same site without unmounting, the closure is called again. The `useState(-1)` is now a real cid, and the closure recovers the derivative via `$Reaction.find(cid)!`. No new derivative; same identity, same backing, same registered fan-out edge.

## The render hooks

Every render — first or re-entry — runs through the same hook sequence:

- **`useState(0)` for re-render token.** Stored on `p[$update$]` as the closure that increments the token. This is what fires when the derivative's reaction calls `react()`. The closure signature must be consistent across renders, so `p[$update$]` is reassigned every render.
- **`useEffect` (mount/unmount).** The mount path resolves the `'mount'` phase. The unmount path resolves `'unmount'`, sets the destroyed flag, and removes the derivative from `parent[$derivatives$]`. Empty deps array — runs once at mount, once at unmount.
- **`useLayoutEffect`.** Resolves the `'layout'` phase. Runs after every render. (The phase resolves multiple times in a row are harmless; `[$resolve$]` only does work if the phase queue has resolvers waiting.)
- **`useEffect` (effect / view-cache reconciliation).** Resolves `'effect'`. Then re-runs `view()` under augmentation, diffs against the cached output, and forces a re-render if the view changed. This is what makes a derivative respond to deferred state changes that didn't go through bond setters.

## The render body — augment, filter, view

After the hooks, the body of the render does the actual work:

1. **`p[$rendering$] = true`** — the rendering flag is consulted by the bond-setter logic to suppress re-entrant `react()` calls during view computation.
2. **`p[$apply$](props)`** — copies React props onto the derivative as own properties (`$`-prefixed). See `view()` chapter for the apply mechanism.
3. **`applyRenderFilters(p)`** — consult the cross-cutting filter chain. If any filter returns non-undefined, that value is the rendered output; skip view. (See [render filters][].)
4. **`augment(p.view(), react)`** — call `view()`, then walk the result and wrap event handlers with `withScope(react)`. This is what installs the per-render reactivity scope that lets handlers' bond writes be batched.
5. **Cache and return.** `p[$viewCache$] = output`, `p[$rendering$] = false`, return.

## The cleanup path

Unmount runs the inner cleanup of the first `useEffect`. Three things happen:

- Resolve the `'unmount'` phase. Anyone awaiting `next('unmount')` wakes.
- Stamp `[$destroyed$] = true`. Subsequent operations on the derivative can short-circuit on this flag.
- Remove the derivative from `parent[$derivatives$]`. The Set's growth is bounded by the number of live mount sites; cleanup keeps it that way.

## The `$bind` escape hatch

The Component returned by `$lift` exposes a `$bind(contextParent)` method. The synthesis layer calls this when it processes the Component as a child element of another chemical's bond — at synthesis time, the framework knows the context parent that the lift call did not have. `$bind` returns a *fresh* Component (calling `$lift` again with the new context parent), which when mounted threads the catalyst graph correctly.

`$bound` is a flag on the Component indicating whether the context parent was set; this is used by the synthesis layer to detect already-bound Components that should not be re-bound.

## Cross-link: fan-out

What `$lift` registers, the bond layer's setter walks. When `parent.$prop = x`, the bond setter fans out by walking `parent[$derivatives$]` and firing each derivative's reaction. See the bond book's `diffuse` chapter (forthcoming) and the [derivatives and fan-out][derivatives] concept page for the full picture.

## See also

- [identity][] — what each derivative gets fresh (and what it inherits).
- [lifecycle][] — what the React hooks resolve at each phase.
- [view][] — what `view()` does, what augmentation wraps, what the cache compares.
- [render filters][] — the chain consulted between `$apply` and `view`.
- [feature: lexical scoping][lexical-scoping] — the model.
- [feature: derivatives and fan-out][derivatives] — the mechanism.

<!-- citations -->
[identity]: ./identity.md
[lifecycle]: ./lifecycle.md
[view]: ./view.md
[render filters]: ./render-filters.md
[lexical-scoping]: ../../concepts/lexical-scoping.md
[derivatives]: ../../concepts/derivatives-and-fan-out.md

[lift-fn]: ../../../../../library/chemistry/src/abstraction/particle.ts#L215
