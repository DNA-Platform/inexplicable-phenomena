---
title: Port gap analysis
---

# Port gap analysis

Side-by-side comparison of what the legacy bond system had vs what the current framework implements. Source: legacy `chemistry-new.ts` vs current `bond.ts` and `molecule.ts`.

## What was preserved

| Feature | Legacy | Current | Notes |
|---------|--------|---------|-------|
| `isMethod` | `$Bond._isMethod` | `$Bond._isMethod` | Identical |
| `isField` | derived getter | derived getter | Identical logic |
| `isProperty` | derived getter | derived getter | Identical logic |
| `isReadable` | derived getter | derived getter | Identical logic |
| `isWritable` | derived getter | derived getter | Identical logic |
| `$Reflection.isSpecial` | `$` + lowercase 2nd | Same | Current relaxed min length from `> 2` to `>= 2` |
| `$Reflection.isReactive` | constructor/underscore/dollar rules | Same | Identical |
| `@inert()` / `@reactive()` | decorator registries | Same | Identical |
| `$Bond.create()` factory | method -> $Bonding, else -> $Bond | method -> $Reagent, else -> $Bond | Renamed class |
| `$Bond.double()` | prototype-chain copy | Same | Identical |
| `$Molecule._reactivate()` | template/chemical bond walk | Same | Same pattern |
| `$Molecule.formBonds()` | reflection + create + form | Same | Nearly identical |

## What was dropped

### 1. `isProp` flag on $Bond

**Legacy**: Set in constructor via `$Reflection.isSpecial(property)`. Every bond knew whether its field was a prop (`$name` pattern) or internal state.

**Current**: Not tracked. `$Reflection.isSpecial()` exists but is only used in `isReactive()` to determine whether to bond at all. Once bonded, the prop/internal distinction is gone.

**Impact**: The framework cannot introspect which bonds are props vs internal state. This matters for: the `$Properties<T>` type computation, `$apply` prop diffing, any future serialization, and the proposed $ prefix inversion.

### 2. `isPure` flag on $Bonding / $Reagent

**Legacy**: Set on method bonds via `$Reflection.isSpecial(method)`. Methods named `$doSomething` were considered pure and their results were cached by argument identity. Cached values were stored in `_lastValue` (sync) and `_lastSeenActive` (async).

**Current**: Not tracked. `$Reagent` has no purity concept. Every method call re-executes unconditionally.

**Impact**: Loss of automatic memoization for `$`-prefixed methods. In the legacy system, `$computeTotal()` called twice with the same args returned cached results. Currently, it re-runs every time.

### 3. `isAsync` flag on $Bonding / $Reagent

**Legacy**: Detected in `form()` via `instanceof AsyncFunction`. Also escalated at call time if a sync-declared method returned a Promise. Tracked as a permanent flag on the bond.

**Current**: `$Reagent.form()` does detect promises at call time (`result instanceof Promise`) and chains `.then()` for scope cleanup, but does NOT track `isAsync` as a bond flag. There's no way to ask a bond "is this method async?"

**Impact**: No introspection for async methods. The bond constructor async handling (via `$construction` promise in `$Synthesis`) works at the chemical level, not the bond level. Individual method bonds don't know if they're async.

### 4. `isReadOnly` / `isWriteOnly` / `isEditable`

**Legacy**: Derived getters combining `isReadable` / `isWritable`.

**Current**: `isReadable` and `isWritable` exist but the convenience derivations don't.

**Impact**: Minor. Easy to recompute from existing flags.

### 5. `isParent` flag

**Legacy**: Only true on `$Parent` subclass bonds (for parent chemical reference).

**Current**: Parent wiring exists via `$parent$` symbol but not as a bond flag.

**Impact**: Minor. Parent bonds are handled differently in the current architecture.

### 6. `bondGet()` / `bondSet()` interceptors

**Legacy**: $Bond had dedicated `bondGet()`/`bondSet()` methods with parent delegation, child relationship tracking, and update triggering.

**Current**: Field interception is handled by the `activate()` function which installs scope-tracked get/set. The logic is equivalent but lives in a module function rather than on the bond instance.

**Impact**: Structural, not functional. Current approach works but bonds can't customize their own get/set behavior.

### 7. `$Molecule.formula()` — state serialization

**Legacy**: Iterates non-method bonds, reads values, serializes to JSON via `$symbolize()`. Supports referential and self-contained closure modes.

**Current**: Not implemented. No serialization API on $Molecule.

**Impact**: No state persistence, snapshot, or serialization capability. Would be needed for SSR hydration, state debugging, undo/redo, or state transfer.

### 8. `$Molecule.read()` — state deserialization

**Legacy**: Inverse of `formula()`. Reads JSON back into bond state.

**Current**: Not implemented.

**Impact**: Same as formula() — no deserialization path.

### 9. `$Bonding.bondCall()` — scoped method invocation with caching

**Legacy**: Full method call pipeline: pure method cache check, React event filtering, async wrapping via `handleAsync()`, scope activation, result caching.

**Current**: `$Reagent.form()` creates a simpler bound function: scope wrapping via `withScope()`, promise chaining for cleanup. No caching, no event filtering, no dedicated async handling pipeline.

**Impact**: Simpler but less capable. The pure method cache was a meaningful optimization. Event filtering may have prevented React synthetic event pooling issues.

## Priority assessment

| Gap | Severity | When it matters |
|-----|----------|-----------------|
| `isProp` | **High** | Now — needed for $ prefix inversion, prop typing, apply |
| `isPure` + caching | **Medium** | Performance — matters when `$method` semantics are defined |
| `isAsync` | **Medium** | Introspection — matters for tooling, debugging, lifecycle |
| `formula()` / `read()` | **Low now** | Future — SSR, state debugging, persistence |
| `isReadOnly` etc. | **Low** | Convenience — trivially derivable |
