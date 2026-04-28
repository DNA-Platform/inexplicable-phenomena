---
kind: feature
title: Render filters — the cross-cutting interception chain
status: stable
---

# Render filters

A **render filter** is a function that gets a chance to intercept a particle's render output before `view()` runs. Filters are consulted right after `$apply(props)` and before `$bond()` and `view()`. The first filter to return a non-undefined value wins: that value becomes the rendered output, `view()` is skipped.

The mechanism handles cross-cutting concerns — visibility (`$show`/`$hide`), loading states, error overlays, A/B gating, feature flags — without putting an explicit branch in every particle's `view()`.

## The chain

The filter chain is a module-scope array in [`particle.ts`][filter-registry]:

```typescript
const $$filters: $RenderFilter[] = [
    (p: any) => (p.$show === false || p.$hide === true) ? null : undefined,
];
```

The default filter is `$show`/`$hide` visibility: if a particle's `$show` is explicitly `false` or `$hide` is explicitly `true`, the filter returns `null` (rendered output is empty). Otherwise it returns `undefined` ("no opinion") and the next filter runs. Defaults are stamped on the [`$Particle` class body][show-hide-fields]: `$show?: boolean` and `$hide?: boolean` — both defaulting to undefined, so a particle with neither set is shown by default.

## The filter type

A filter is a function `(particle: $Particle) => ReactNode | undefined`. The semantics of the return value:

- **`undefined`** — "no opinion." The chain continues; the next filter runs.
- **Anything else** (including `null`) — "this is the rendered output." The chain short-circuits; `view()` is skipped; this value is returned as the particle's render.

`null` is a valid filter result — it means "render nothing." `undefined` is reserved for "pass."

## `registerFilter` — the framework-extender API

[`registerFilter(fn)`][register-filter] pushes a filter onto the chain. The order of registration is the order of consultation; the first registered filter sees the particle first.

`registerFilter` is part of the audience-1 surface (framework developer / framework extender). It is exported from `@dna-platform/chemistry/symbolic`, not the component-author entry point — a typical component developer never calls it. Plug-ins, instrumentation, and cross-cutting libraries import it deliberately.

## `applyRenderFilters` — the dispatch

[`applyRenderFilters(p)`][apply-filters] is what the render path calls. It walks `$$filters` in order, calling each one with the particle, and returns the first non-undefined result. If all filters return undefined, it returns undefined — the caller (the render body in `$lift`) takes that as "proceed to `view()`."

```typescript
export function applyRenderFilters(p: $Particle): ReactNode | undefined {
    for (const filter of $$filters) {
        const result = filter(p);
        if (result !== undefined) return result;
    }
    return undefined;
}
```

The chain is fast: it short-circuits on the first opinion, runs each filter as a single function call, and does no allocation per render unless a filter does.

## Why a registry, not a class hierarchy

The chain is module-scope, not on the class. This is deliberate: the filter mechanism is a *cross-cutting* concern, and putting it on the class would force every cross-cutting feature (visibility, loading, errors, gating, instrumentation) to ride down through inheritance or be glued onto the class via mixins. A flat module-scope registry lets each cross-cutting concern be its own export, registered once at module-load time, with no class-hierarchy entanglement.

It also keeps the `$Particle` class body clean. The class declares `$show` and `$hide` as render-state props but does not own the *interpretation* of them — the default filter does. A user who wants to suppress the default visibility filter can build a filter chain without it.

## How `$Function$` and `$Html$` fit in

The two passthrough wrappers (`$Function$`, `$Html$` — see [feature: render filters][feat-render-filters]) are *also* filter-shaped, in the conceptual sense: they wrap something React already understands and produce JSX that includes children verbatim. They are not registered as filters in `$$filters`; they are particle classes whose `view()` does the wrapping. The "filter" framing is wider than the `$$filters` chain — anywhere the framework consults something to short-circuit normal rendering, that is filter behavior.

## See also

- [feature: render filters][feat-render-filters] — the user-facing reference, including `$Function$` and `$Html$`.
- [view][] — where in the render flow `applyRenderFilters` is called.
- [lift][] — the render body that consults the chain.

<!-- citations -->
[view]: ./view.md
[lift]: ./lift.md
[feat-render-filters]: ../../features/render-filters.md

[show-hide-fields]: ../../../../../library/chemistry/src/abstraction/particle.ts#L40
[filter-registry]: ../../../../../library/chemistry/src/abstraction/particle.ts#L177
[register-filter]: ../../../../../library/chemistry/src/abstraction/particle.ts#L185
[apply-filters]: ../../../../../library/chemistry/src/abstraction/particle.ts#L192
