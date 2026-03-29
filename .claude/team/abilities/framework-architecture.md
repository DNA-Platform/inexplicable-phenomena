# Framework Architecture

**Used by:** Framework Developer

Principles for building programming frameworks — API design, layered abstractions, and test-driven development at the framework level. Frameworks are different from applications: every decision constrains everyone downstream.

## Layered Abstraction

A framework should have clear layers, each building on the one below:

```
User-facing patterns     (what developers write)
    ↑
Mid-level constructs     (composable building blocks)
    ↑
Low-level primitives     (foundational types, symbols, identity)
```

**In $Chemistry:**
```
User-facing:    class MyComponent extends $Chemical { $name = '...' }
Mid-level:      $Chemical (lifecycle, parent/child, reactivity)
Low-level:      $Particle (identity, view, props), $Catalogue (environments), Symbols
Foundation:     Types, Reflection, Referent/Reference
```

Each layer should be independently testable and usable. You can use `$Particle` without `$Chemical`. You can use `$Catalogue` without `$Particle`. This is the composability test.

## API Surface Design

### The Rule of Three Audiences

Every framework API serves three audiences:
1. **Beginners** — need clear defaults and obvious patterns
2. **Intermediate** — need composability and escape hatches
3. **Advanced** — need access to internals and extension points

**In $Chemistry:**
- Beginners: `class Foo extends $Chemical { $bar = 'baz' }` — just works
- Intermediate: `particle.use(customView)` — swap behavior
- Advanced: Symbol access, reflection queries, catalogue manipulation

### Convention Over Configuration

The `$` prefix convention is a perfect example. Instead of:
```typescript
@reactive() bar = 'baz'      // configuration
```
The framework uses:
```typescript
$bar = 'baz'                  // convention
```

Convention is discoverable through reading code. Configuration requires reading docs.

### Principle of Least Surprise

Framework behavior should match what the name implies:
- `$find()` finds or returns undefined — it doesn't throw
- `$deref()` with an argument removes one reference; without removes all
- `$new()` creates a child; `$empty()` creates an isolated instance
- `view()` returns something renderable — always

## Test-Driven Framework Development

Framework TDD is different from application TDD because the tests define the API contract, not just correctness.

### Tests as Specification

Each test suite documents a concept:
```
particle.test.ts
  → "template is a singleton per class" = API contract
  → "view can be swapped with use()" = API contract
  → "props are applied as $-prefixed fields" = API contract
```

These tests should read like documentation. A developer should be able to understand the framework by reading the tests alone.

### Test Layering

Test the layers independently:
1. **Unit tests** for primitives — $Particle, $Catalogue, reflection
2. **Integration tests** for composition — $Chemical using $Particle's template system
3. **Contract tests** for API stability — "this public method exists and accepts these arguments"
4. **Example tests** for documentation — real-world usage patterns that also serve as docs

### Red-Green-Refactor at Framework Scale

1. **Red:** Write a test showing how you want the API to work
2. **Green:** Implement the minimum to pass
3. **Refactor:** Clean up without changing the API

At framework scale, step 1 is the most important — the test IS the design decision. Changing a test later means changing the API contract.

## Migration Patterns

When evolving a framework (v1 → v2):

### Strangler Fig
Keep the old version working while building the new one alongside it. Users migrate gradually.

**In $Chemistry:** The `archive/` directory is the old version. The new `chemistry/` directory is the replacement. Both exist. Tests define when the new version is ready.

### API Compatibility Layers
If v1 users exist, provide adapters. If no users exist (internal framework), just build v2 and delete v1 when ready.

### Test-First Migration
Port v1 tests to v2 first. If v2 passes v1's tests, the migration preserves behavior. New tests capture new capabilities.
