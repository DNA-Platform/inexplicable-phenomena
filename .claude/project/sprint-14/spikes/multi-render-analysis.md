# Multi-Render Scoping Analysis

## The problem

A chemical arrives through a binding constructor. The parent renders it multiple times in its view, each time with different props. Each rendering needs independent props without clobbering the others, while sharing the chemical's intrinsic state.

## Current behavior (broken)

`$lift(chemical)` creates an FC that captures the chemical directly. If mounted three times, all three mounts write `$update$` and `$apply` to the same object. Last mount wins for `$update$`. Last `$apply` wins for props. Multi-render is broken.

## Proposed solution: prototypal shadows

Each mount creates `Object.create(chemical)` — a shadow that inherits from the chemical. `$apply` writes `$`-prefixed props to the shadow. Intrinsic state lives on the chemical and is shared.

## The mutation problem

JavaScript's `Object.create` delegation means:
- READS walk the prototype chain (shadow → chemical → template → prototype)
- WRITES create own properties on the target

If a method does `this.count++` on a shadow, it writes to the shadow, not the chemical. The shadows diverge. This may or may not be desired:

| Operation | Who should own it | Why |
|-----------|------------------|-----|
| `$apply` sets `$background` | Shadow (per-rendering) | Different visual context |
| `increment()` sets `count++` | Chemical (shared) | One counter, multiple views |
| Binding constructor sets `chapters = [...]` | Shadow (per-usage) | Different parent, different children |
| `view()` reads `this.$background` | Shadow's own | Correct per-rendering value |
| `view()` reads `this.count` | Chemical's (shared) | All views see same count |

## Design options

### Option A: $Bonding writes to the prototype

The method wrapper applies the method on the chemical (the prototype), not on the shadow:

```
const target = Object.getPrototypeOf(this) || this;
action.apply(target, args);
```

Pro: Methods modify shared state. All shadows see updates.
Con: The wrapper needs to know whether `this` is a shadow. Deep prototype chains break.

### Option B: $-prefixed are shadow, others are shared

`$apply` writes to the shadow (it already only writes `$`-prefixed properties).
Methods write to wherever `this` points — if on a shadow, the shadow gets the own property.
The chemical is the single source of truth for intrinsic state.

To make methods write to the chemical, the shadow could have a getter/setter trap... but that requires Proxy, which is slow.

### Option C: Simple rule — shadows are read-only for intrinsic state

The shadow only receives `$`-prefixed props from `$apply`. It NEVER calls methods directly. Method calls go through the original chemical. Re-render triggers propagate to all mounted shadows.

This means: `onClick` in a shadow's view calls `this.increment()` where `this` is the shadow. But the wrapper redirects to the chemical. All shadows re-render because the chemical's `$update$` fires... but each shadow has its own `$update$`.

### Option D: Each shadow has its own `$update$`, chemical broadcasts

When the chemical's method is called, instead of calling one `$update$`, it calls ALL registered `$update$` functions. The chemical maintains a SET of update functions, one per mount.

This solves: method on any shadow triggers re-render on ALL shadows.

## The `$update$` broadcasting problem

Currently `$update$` is a single reference on the particle. For multi-render:

```typescript
// On the chemical:
$updates: Set<Function> = new Set();

// In each shadow's FC:
const [, update] = useState({});
chemical.$updates.add(update);
useEffect(() => () => chemical.$updates.delete(update), []);

// In $Bonding wrapper:
chemical.$updates.forEach(u => u({}));
```

This is clean. Each mount registers its update function. Method calls broadcast to all mounts. Each mount re-renders independently. `$apply` on each shadow is independent.

## Recommendation

Option D (broadcast) + shadows for `$apply`. The chemical is the shared identity. Shadows are the per-rendering prop spaces. Methods modify the chemical (shared). `$Bonding` broadcasts re-renders to all mounted shadows. `$apply` writes to the shadow.

## Open questions

1. When binding constructor runs on a shadow, do `this.chapters = [...]` persist on the shadow or the chemical?
2. If a chemical is in two different parents, which parent does `this.$parent$` point to?
3. Can a shadow have its own molecule and orchestrator, or does it share the chemical's?
4. How do keys work for shadows? Each shadow needs a unique key for React, but they share a CID.
