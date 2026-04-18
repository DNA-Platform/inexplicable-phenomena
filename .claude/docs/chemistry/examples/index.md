# $Chemistry Examples

Canonical examples of the $Chemistry framework. Each file is a compilable component that demonstrates one concept. Import from `@dna-platform/chemistry`.

## Elements — identity and the $ membrane

| File | Concept | What it shows |
|------|---------|---------------|
| [elements/element.tsx](elements/element.tsx) | **Intrinsic vs extrinsic** | `number = 1` is intrinsic (the element). `$highlighted = false` is extrinsic (flows in via props). The `$` marks the boundary. |
| [elements/hydrogen.tsx](elements/hydrogen.tsx) | **Subclassing, the membrane** | `$Hydrogen` extends `$Element`. `use(new $Hydrogen())` → `Hydrogen`. The `$` disappears. |
| [elements/helium.tsx](elements/helium.tsx) | **Template per type** | Each element type gets its own template. |
| [elements/carbon.tsx](elements/carbon.tsx) | **Element identity** | Carbon is atomic number 6. |
| [elements/oxygen.tsx](elements/oxygen.tsx) | **Element identity** | Oxygen is atomic number 8. |

## Compounds — binding constructors and typed children

| File | Concept | What it shows |
|------|---------|---------------|
| [compounds/water.tsx](compounds/water.tsx) | **Binding constructor as formula** | `$Water(h1: $Hydrogen, h2: $Hydrogen, o: $Oxygen)` — the signature IS H₂O. `$check` validates at runtime. |
| [compounds/methane.tsx](compounds/methane.tsx) | **Variadic binding** | `$Methane(c: $Carbon, ...hydrogens: $Hydrogen[])` — spread parameters for variable-count children. |

## Lifecycle — next() and async phases

| File | Concept | What it shows |
|------|---------|---------------|
| [lifecycle/loader.tsx](lifecycle/loader.tsx) | **await this.next('mount')** | Wait for mount, then fetch data. Linear async code, no hooks. |
| [lifecycle/async-effect.tsx](lifecycle/async-effect.tsx) | **Ongoing async lifecycle** | A timer that starts after mount. `while` loop with `await`. |

## use() — hoisting particles to components

| File | Concept | What it shows |
|------|---------|---------------|
| [use/counter.tsx](use/counter.tsx) | **use() as free function, mutable state** | `use(new $Counter())` produces a React component. `count = 0`, `increment()`, view reads state. |

## API quick reference (from the examples)

```typescript
// Subclass $Chemical, declare $ props, write view()
class $Thing extends $Chemical {
    count = 0;               // intrinsic state (no $)
    $label = 'default';      // extrinsic prop ($ prefix)
    view() { return <div>{this.$label}: {this.count}</div>; }
}

// Hoist to React component — $ disappears
const Thing = use(new $Thing());
// <Thing label="Score" />

// Await lifecycle phases
async effect() {
    await this.next('mount');
    // runs after mount — linear async, no hooks
}

// Binding constructor — typed children
class $Container extends $Chemical {
    items: $Item[] = [];
    $Container(...items: $Item[]) {
        this.items = items.map(i => $check(i, $Item));
    }
}
// <Container><Item /><Item /></Container>
```
