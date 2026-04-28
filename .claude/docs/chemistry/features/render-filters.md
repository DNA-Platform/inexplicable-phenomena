---
kind: feature
title: Render filters — $Function$, $Html$, passthrough patterns
status: stable
related:
  - particle
  - chemical
---

# Render filters — `$Function$`, `$Html$`, passthrough patterns

Framework-internal particles that wrap React function components and HTML tags so they participate in the chemistry render pipeline without going through bond-ctor orchestration. They pass children through unchanged.

## What it is

A render filter is a `$Particle` that *wraps* something React already understands — a function component or an HTML tag — and renders it with the chemistry framework's identity, lifecycle, and reactivity, while leaving the children prop alone.

Two canonical filters:

- **`$Function$`** — wraps a plain React function component (`(props) => JSX`). Useful when you want a chemistry-flavored particle that delegates rendering to an existing FC.
- **`$Html$`** — wraps an intrinsic HTML tag (`<div>`, `<span>`, etc.). Useful for low-level building blocks where the bond-ctor parsing pipeline would be overhead.

Both have **children**, which is what makes them different from `$Particle` itself (which is a leaf). The children flow through the wrapped FC or HTML tag verbatim; the framework doesn't try to parse them as bond-ctor args.

## How it works

[`$Function$`][function-class] and [`$Html$`][html-class] skip the `$Synthesis` step. Their `view()` reads `this.props.children` and produces JSX that includes them — typically `<TagOrFc {...rest}>{children}</TagOrFc>`. Reactivity, identity, lifecycle phases, and the derivatives registry all still work — they're inherited from `$Particle`.

The wrapping itself is one piece of a broader pattern. The framework also runs an explicit **filter chain** during render — see [`$RenderFilter`][render-filter-type] (the type), [the filter registry][filter-registry] (`$$filters` array), [`registerFilter`][register-filter] (the framework-extender API), and [`applyRenderFilters`][apply-filters] (the dispatch consulted right after `$apply(props)`, before `$bond()` and `view()`). Returning `undefined` from a filter means "no opinion"; anything else short-circuits the render. The default filter implements `$show` / `$hide` visibility; `$Function$` and `$Html$` are themselves filter-shaped wrappers around what React already understands.

```typescript
// Conceptual shape
class $Html$ extends $Particle {
    view() {
        return React.createElement(this.tag, this.props, this.props.children);
    }
}

class $Function$ extends $Particle {
    view() {
        return React.createElement(this.fc, this.props, this.props.children);
    }
}
```

These are called *passthrough* shapes because children pass through untouched. Whether they should be a distinct TypeScript type (`Passthrough<T>`) or just `Component<T>` was an open question at end of sprint 22; the practical answer is they fit `Component<T>` shape because they have a `children?` prop, even though no bond ctor declared it.

## Related

- [`$Particle`][particle] — the base class these wrap behavior around.
- [`$Chemical`][chemical] — the *non-passthrough* shape with bond-ctor parsing.

## See also

- Source: [particle.ts][particle-src] (filter machinery), [chemical.ts][chemical-src] (`$Function$`, `$Html$` wrappers)
- Specific: [`$RenderFilter` type][render-filter-type] · [filter registry][filter-registry] · [`registerFilter`][register-filter] · [`applyRenderFilters`][apply-filters] · [`$Function$`][function-class] · [`$Html$`][html-class]

<!-- citations -->
[particle]: ./particle.md
[chemical]: ./chemical.md
[particle-src]: ../../../../library/chemistry/src/abstraction/particle.ts
[chemical-src]: ../../../../library/chemistry/src/abstraction/chemical.ts
[render-filter-type]: ../../../../library/chemistry/src/abstraction/particle.ts#L175
[filter-registry]: ../../../../library/chemistry/src/abstraction/particle.ts#L177
[register-filter]: ../../../../library/chemistry/src/abstraction/particle.ts#L185
[apply-filters]: ../../../../library/chemistry/src/abstraction/particle.ts#L192
[function-class]: ../../../../library/chemistry/src/abstraction/chemical.ts#L773
[html-class]: ../../../../library/chemistry/src/abstraction/chemical.ts#L788
