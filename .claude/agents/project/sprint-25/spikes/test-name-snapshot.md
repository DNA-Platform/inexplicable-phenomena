# SP-2: Test-name snapshot

Pre-sprint catalogue of every `describe`/`it` string and every imported identifier per test file under `library/chemistry/tests/`. Captured at the start of Sprint 25, before any rename pass. Lets us tell missed-rename failures (an unchanged test still references the old name) from intended-rename failures (a test was deliberately renamed in lockstep) during the upcoming execution phase.

Snapshot date: 2026-04-28.

---

## tests/abstraction/async-construction.test.ts
- describes: "async bond ctor — sync prologue and async tail", "chemical.next(\"construction\") — awaitable from outside", "async bond ctor — error handling", "async bond ctor — sync prologue is visible to the next ctor", "async bond ctor — sync prologue runs synchronously", "async bond ctor — render after settle"
- its: "sync state set in prologue is visible at first render", "resolves after the async bond ctor settles", "resolves immediately for a sync bond ctor", "a failing async ctor does not break sibling renders", "a child's sync prologue state is visible inside the parent's bond ctor", "mixed sync and async siblings — earlier siblings' state visible to later", "the prologue runs at orchestrator-call time, before the ctor returns", "view re-renders when construction settles, not before"
- imports: describe, it, expect (from vitest); render, act (from @testing-library/react); React (from react); $Chemical, $ (from @/abstraction/chemical)

## tests/abstraction/chemical.test.ts
- describes: "$Chemical — subclasses define reactive state as fields", "$Chemical — subclasses can override view() to read any state"
- its: "reads a $-prefixed field as a property", "view() returns the computed output from state", "view() runs with this bound to the chemical instance"
- imports: describe, it, expect (from vitest); $Chemical (from @/abstraction/chemical)

## tests/abstraction/chemistry.test.ts
- describes: "$ — JSX form (<$>...</$>)", "$ — class form, empty constructor", "$ — class form, constructor with args", "$ — instance form (chemical reference)", "$ — dispatch boundaries", "$ — type contract (compile-time)"
- its: "renders <$ /> as an empty Fragment", "renders <$>text</$> as a Fragment containing the text", "renders <$>{a}{b}{c}</$> as a Fragment of multiple children", "preserves chemical children with non-colliding keys", "accepts a {key} prop without breaking (React extracts key before call)", "returns the template's Component when class has no ctor params", "returns a stable Component reference across multiple $ calls (cache)", "constructs the template implicitly if no `new $Class()` happened first", "isolates each subclass — `$Counter`'s template is not `$Chemical`'s", "returns a factory; each call constructs a fresh instance", "returns a Component-shape function for a chemical instance", "mounted $(chemical) renders the chemical's view", "caches the Component per instance — repeat calls return the same function", "does NOT re-run the bond constructor on mount (chemical is already built)", "null/undefined → empty Fragment", "plain object with `children` → JSX path (Fragment)", "plain object that is empty → JSX path (empty Fragment)", "plain object without children and non-empty → returns null (no fallback)", "strings route to the HTML catalogue (e.g. $(\"span\"))", "arbitrary non-object, non-function, non-particle, non-string → null", "accepts the documented overload shapes"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $ (from @/abstraction/chemical); $Chemical referenced inline via test bodies (re-imported above in chemistry.test.ts uses $ only — $Chemical referenced via local class extension after import). Actual import statement: $Chemical, $ (from @/abstraction/chemical)

## tests/abstraction/error.test.tsx
- describes: "$Error — a particle that wraps a real Error"
- its: "constructor takes an Error and produces a particle", "carrier exposes the original error message and name via prototype", "carrier still passes `instanceof Error`", "original error is left untouched", "view() renders error name and message", "static $Error.view(error) returns a typed carrier"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $Error (from ../specimens/error); isParticle (from @/abstraction/particle); type I (from @/implementation/types)

## tests/abstraction/html-catalogue.test.ts
- describes: "$(\"tagName\") — HTML catalogue lookup", "$(\"tagName\", override) — HTML catalogue registration", "$(\"tagName\") — used as a JSX-mountable component"
- its: "returns a Component for a known HTML tag", "renders into a real DOM element matching the tag", "caches: $(\"div\") twice returns the same Component reference", "different tags produce different Components", "registering an override replaces the cached Component for that tag", "subsequent lookups continue to return the override", "mounts inside a fragment with the right shape"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $ (from @/abstraction/chemical)

## tests/abstraction/lexical-scoping.test.ts
- describes: "lexical scoping — identity sanity", "lexical scoping — parent → derivatives propagation", "lexical scoping — derivative isolation on write", "lexical scoping — fan-out is unconditional", "lexical scoping — delete restores inheritance", "lexical scoping — three-level chain", "lexical scoping — bond-ctor pass-through (the Doug scenario)", "lexical scoping — different props at two sites", "lexical scoping — cleanup on unmount", "lexical scoping — mount/unmount cycle", "lexical scoping — class form runs bond ctor; instance form does not", "lexical scoping — clone unconditionally even without props", "lexical scoping — Component reference stability"
- its: "two mounts of the same instance both render its current state", "mutating parent's bond wakes all derivatives that read via prototype", "one derivative writing $tag does not affect siblings", "parent's bond change wakes all derivatives, but each renders its own value", "deleting derivative's own value lets parent's value show through again", "root write propagates through chain to grandchild", "a shared instance flows through three nested bond ctors and renders distinct derivatives", "each site applies its own props to its own derivative", "unmounting stops the derivative from reacting to parent state changes", "repeated mount/unmount at same site does not accumulate stale wake-ups", "$($Class) on first mount with valid children runs the bond ctor", "$(instance) does not run the bond ctor on mount", "mounting <C /> with no props still produces a renderable derivative", "mounting <C /> with no props but later parent updates flow through", "$(r) returns the same Component function across calls", "but each MOUNT of that Component creates a fresh derivative"
- imports: describe, it, expect (from vitest); render, act, fireEvent (from @testing-library/react); React (from react); $Chemical, $ (from @/abstraction/chemical)

## tests/abstraction/lifecycle.test.ts
- describes: "next(phase) — when the requested phase has already been reached", "next(phase) — when the requested phase is in the future", "next(phase) — special rules", "Chemical lifecycle methods — named shortcuts for phases"
- its: "resolves immediately if already at that phase", "resolves immediately if the phase has been passed", "the returned promise stays pending until the framework resolves", "all pending awaiters resolve together when the phase is reached", "unmount always waits even when later phases have been reached", "chemical.mount() awaits the mount phase", "async code can sequence through phases with await this.next()"
- imports: describe, it, expect (from vitest); $Particle (from @/abstraction/particle); $Chemical (from @/abstraction/chemical); $resolve$ (from @/implementation/symbols)

## tests/abstraction/molecule.test.ts
- describes: "Reactive property rules — which properties the framework tracks"
- its: "properties with a $ prefix and lowercase second character are reactive (\"special\" fields)", "properties with a $ prefix and uppercase second character are NOT reactive (reserved for Component-like exports)", "properties prefixed with $$ or $_ are NOT reactive (internal/escape-hatch convention)", "properties prefixed with _ are NOT reactive (user-marked private)", "the constructor property is NOT reactive", "regular properties (no special prefix) ARE reactive by default"
- imports: describe, it, expect (from vitest); $Reflection (from @/abstraction/chemical)

## tests/abstraction/particle.test.ts
- describes: "$Particle — identity", "$lift — turns a held particle into a renderable React component"
- its: "each particle stringifies to a unique $Chemistry symbol", "a particle is usable in string contexts via its symbol", "produces a component bound to the given particle"
- imports: describe, it, expect (from vitest); $Particle, $lift (from @/abstraction/particle)

## tests/abstraction/particularization.test.ts
- describes: "particularization — new $Particle(particular)"
- its: "isParticle is true for a naturally-constructed particle", "isParticle is false for a plain object / error / null", "carrier has its own fresh $cid (different from any other particle)", "carrier has $type, $symbol, $phases as own properties", "carrier has $particleMarker$ as an own property and isParticle is true", "carrier lifts particle methods as own properties", "original object becomes the carrier prototype", "carrier is `instanceof Error` (because Error.prototype is reachable via prototype chain)", "original object is left untouched (no marker, no lifted methods, no own particle props)", "carrier exposes own data of the original via prototype lookup", "particularizing a particle is a no-op (returns the same particle)", "particularizing a chemical is a no-op (chemicals are already particles)", "two particularizations of the same error get distinct cids", "particle methods on the carrier still produce a unique $Chemistry symbol"
- imports: describe, it, expect (from vitest); $Particle, isParticle (from @/abstraction/particle); $Chemical (from @/abstraction/chemical); $cid$, $type$, $symbol$, $phases$, $particleMarker$ (from @/implementation/symbols)

## tests/abstraction/render-filters.test.ts
- describes: "$show — default filter", "$show / $hide — reactive toggle", "$show / $hide — works on HTML elements via the catalogue", "$Particle.filter — registering custom filters"
- its: "renders by default (no $show, no $hide)", "hides when $show is explicitly false", "hides when $hide is explicitly true", "renders when $show is explicitly true (the default)", "hides when both $show=false AND $hide=true (both indicate hide)", "toggling $show from inside the chemical re-renders", "hiding an HTML element via $hide=true", "a custom filter can intercept rendering for arbitrary criteria", "filters that return undefined defer to normal rendering"
- imports: describe, it, expect (from vitest); render, act (from @testing-library/react); React (from react); $Chemical, $ (from @/abstraction/chemical); $Particle (from @/abstraction/particle); registerFilter (from @/symbolic)

## tests/env/pure-react.test.tsx
- describes: "Pure React: verify testing setup handles re-renders", "Pure React: external state update via closure"
- its: "single click", "two separate clicks", "three separate clicks", "external mutation + forced re-render"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React, useState (from react)

## tests/framework/load.test.ts
- describes: "$lookup with type \"{}\"", "$lookup with type \"[]\"", "$lookup error handling", "$load with type \"{}\"", "$load with type \"[]\""
- its: "extracts a chemical from a default export", "extracts a chemical from a named export", "extracts a chemical when the module itself is the component (default-imported form)", "extracts a chemical from a single-entry require.context", "throws when multiple modules are found with \"{}\"", "throws when the context is empty", "throws when no chemical is found in a module", "extracts every chemical from a record of modules", "extracts every chemical from a require.context", "skips modules that contain no chemical", "returns an empty array when no modules contain chemicals", "throws on an invalid type parameter", "awaits a single loader function that returns a module", "resolves loader functions inside a record", "passes through already-resolved modules", "awaits every loader in a record and returns all chemicals", "mixes loader functions and already-resolved modules in one record", "wraps a bare single module as a one-entry array", "handles a require.context passed directly"
- imports: describe, it, expect (from vitest); $Chemical (from @/abstraction/chemical); $lookup, $load (from @/framework/load)

## tests/implementation/catalogue.test.ts
- describes: "$Catalogue", "The Elegant Self-Reference", "Core Literature & References", "$empty() - Isolated Catalogues", "$new() - Inheritance Through Topics", "$including() - Multiple Topics", "Subject Delegation", "$deref() - Memory Management", "Privacy Guarantees", "Complex Scenarios"
- its: "should have itself as its own subject", "should allow self-delegation through $subject", "should treat $subject as opaque from outside perspective", "should index and find with canonical representations", "should overwrite on re-index", "should handle different value types", "should return undefined for missing representations", "should create catalogue with no inheritance", "should be completely isolated from root", "should create child that inherits from parent", "should allow child to shadow parent values", "should create inheritance chains", "should inherit from multiple catalogues in order", "should respect topic order for shadowing", "should include parent as last topic", "should filter non-catalogue topics silently", "should delegate to known subjects", "should ignore unknown subjects", "should allow indexing to known subjects", "should ignore indexing to unknown subjects", "should clear entire catalogue when called empty", "should remove specific reference", "should remove subject from topics", "should delegate deref with rep and subject", "should make catalogue non-responsive after deref", "should not expose parent internals to child", "should maintain isolation through export boundaries", "should use $subject as opaque capability token", "should handle deep inheritance with multiple branches", "should handle re-referencing after deref", "should maintain separate namespaces per catalogue"
- imports: describe, it, expect, beforeEach (from vitest); $lib (from @/implementation/catalogue); $Rep (from @/implementation/types)

## tests/implementation/reflection.test.ts
- describes: "$Reflection", "$ObjectiveRep", "$type function", "$typeof function", "$properties", "on instances", "on types", "on primitives", "$fields", "$methods", "$constructor", "$parameters", "$miscellaneous", "parseFunctionInfo", "async modifier", "generator modifier", "function forms", "naming", "named functions", "anonymous functions", "native functions", "unknown/unparseable", "comprehensive combinations", "parameter array structure"
- its: "should cache the same instances", "should return the right metadata for undefined", "should have the right metadata for null", "should have the right metadata for string", "should have the right metadata for number", "should have the right metadata for bigint", "should have the right metadata for boolean", "should have the right metadata for symbol", "should have the right metadata for function", "should have the right metadata for object", "should cache equivalent instances", "should have the right metadata for a string", "should list own properties of plain objects", "should list all properties including inherited", "should handle arrays correctly", "should handle functions as objects", "should list prototype properties of built-in types", "should list class prototype properties", "should delegate to type for primitive strings", "should return empty for null/undefined", "should find specific fields by name", "should return undefined rep for missing properties", "should find inherited properties with \"all\"", "should handle symbol properties", "should work with properties", "should identify field descriptors", "should identify method descriptors", "should handle getter-only properties", "should handle setter-only properties", "should transform property to field when appropriate", "should transform property to method when appropriate", "should handle getter/setter role transformations", "should maintain of relationship through transformations", "should filter only fields (non-function values)", "should correctly identify fields on class instances", "should return field rep for valid field", "should return undefined rep for non-field", "should filter only methods (function values)", "should find methods on class prototypes", "should return method rep for valid method", "should handle bound methods", "should return the right constructors the primitives", "should handle parameter literals with rest property", "should handle non-rest parameters", "should build parameters array from function info", "should detect hasRest on functions", "should handle nested object properties", "should handle properties on prototype chain correctly", "should handle property modifications through descriptors", "should handle objects with null prototype", "should handle frozen objects", "should handle property names that are numbers", "should handle empty objects", "async lambda", "async lambda with params", "async function", "async function named", "async method", "async generator function", "async generator method", "generator function", "generator function named", "generator method", "lambda no params", "lambda single param no parens", "lambda multiple params", "function anonymous", "function named", "method", "getter", "setter", "class named", "class anonymous", "function", "generator", "class", "lambda", "String constructor", "Array constructor", "Object constructor", "Array.prototype.map", "String.prototype.slice", "Math.pow", "bound function", "custom toString - gibberish", "custom toString - empty", "custom toString - unicode", "async lambda with rest params", "async generator with params and rest", "async generator method with rest", "no params - lambda", "no params - function", "no params - method", "single param - lambda", "single param - function", "single param - method", "two params - lambda", "two params - function", "two params - method", "three params - lambda", "three params - function", "three params - method", "four params - lambda", "four params - function", "four params - method", "rest only - lambda", "rest only - function", "rest only - method", "single param + rest - lambda", "single param + rest - function", "single param + rest - method", "two params + rest - lambda", "two params + rest - function", "two params + rest - method", "three params + rest - lambda", "three params + rest - function", "three params + rest - method", "four params + rest - lambda", "four params + rest - function", "four params + rest - method"
- imports: $lib (from @/implementation/catalogue); parseFunctionInfo, $FunctionInfo, $type, $typeof, $instanceof (from @/implementation/reflection); describe, it, expect, beforeEach (from vitest)

## tests/implementation/symbolize-audit.test.ts
- describes: "$symbolize — deterministic serialization contract"
- its: "primitives: string", "primitives: number", "primitives: boolean", "primitives: null and undefined", "plain object: same shape produces same string", "plain object: different values produce different strings", "array: same elements produce same string", "array: different length produces different string", "CRITICAL: Map with same contents produces same string", "CRITICAL: Map with different contents produces different string", "CRITICAL: Map mutation (set) is detected", "CRITICAL: Set with same elements produces same string", "CRITICAL: Set add is detected", "functions are skipped", "Date: same time same symbolization", "Date: different times different symbolization", "cyclic object handled", "chemical: same state produces same string", "chemical: state change detected", "nested chemical: inner state change detected in outer symbolize"
- imports: describe, it, expect (from vitest); $symbolize (from @/implementation/representation); $Chemical (from @/abstraction/chemical)

## tests/implementation/walk.test.tsx
- describes: "walk() — unified ReactNode tree traversal", "walk() — paired traversal", "reconcile() — built on walk"
- its: "passes through null", "passes through undefined", "passes through primitives", "visits element nodes", "visits nested elements depth-first", "walks arrays of elements", "provides walked children to visitor", "visitor can return original element (identity pass)", "visitor can transform elements", "passes pair to visitor", "pairs array elements by index", "pairs nested children", "returns cached when view unchanged", "returns new when view changed", "returns cached for matching nested trees", "returns new when nested content changes", "returns cached for matching arrays", "returns new for different arrays", "handles null correctly", "handles primitives", "same function reference returns cached"
- imports: describe, it, expect (from vitest); React, ReactNode, ReactElement (from react); walk, ElementVisitor (from @/implementation/walk); reconcile (from @/implementation/reconcile)

## tests/react/assumptions.test.tsx
- describes: "Clicking a button that calls a method updates the UI", "Lifecycle: awaiting next(phase) resolves after the framework reaches that phase", "Two rendered instances of the same chemical hold independent state", "Parent re-rendering with new props updates the child", "Consecutive state mutations each update the DOM", "Removing a component from the tree unmounts it"
- its: "clicking a button updates the UI", "method called on a held instance updates the UI", "next(\"mount\") resolves after a component mounts", "clicking one component does not affect the other", "new props from a parent re-render reach the child", "three clicks in sequence show three incremented values", "conditional rendering removes the DOM subtree"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical); $phase$, $resolve$ (from @/implementation/symbols)

## tests/react/augmentation.test.tsx
- describes: "View augmentation: handlers that mutate directly"
- its: "direct field mutation in onClick triggers re-render", "array push in onClick triggers re-render", "map set in onClick triggers re-render", "async handler triggers re-render after Promise resolves"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/contract.test.tsx
- describes: "Contract: deep path mutation (Doug's this.x.y.z = 10 case)", "Contract: computed getters work without useMemo", "Contract: multiple mutations in a single handler batch to one render", "Contract: async method with pre- and post-await mutations", "Contract: handler that throws still re-renders for mutations made before throw", "Contract: view reads are idempotent (no infinite loop)"
- its: "mutating a deep-nested property from an event-handler-driven method triggers re-render", "derived value from getter re-renders correctly", "three mutations in one click produce one re-render with all updated", "both mutations observed, sync shows pre-await, async shows post-await", "pre-throw mutation is reflected", "rendering many times doesn't diverge for deterministic view"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/instance-render.test.tsx
- describes: "Instance rendering via .Component"
- its: "template .Component works", "held instance .Component works", "held instance method from outside works"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/integration.test.tsx
- describes: "Integration: $Chemistry renders through React"
- its: "renders a book via template Component (reusable pattern)", "renders a book via held instance Component (stateful pattern)", "re-renders after method call on held instance"
- imports: describe, it, expect (from vitest); render, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/patterns.test.tsx
- describes: "Patterns: common idioms work", "Patterns: documented boundaries"
- its: "setInterval (started by a handler) calling a method updates view over time", "async method called from a handler does data loading", "Promise.then callback triggers re-render via direct write", "Map and array in the same chemical both reactive", "form input two-way binding via direct onChange write", "conditional render based on reactive state", "nested mutation inside a method triggers re-render", "Map.set INSIDE a method triggers re-render via scope-tracked snapshot diff", "direct scalar write outside any method/handler TRIGGERS re-render automatically"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/rendering-safety.test.tsx
- describes: "Views can read computed getters without causing re-render loops", "Views can call methods without causing re-render loops"
- its: "a getter referenced in view renders cleanly", "a method invoked from view renders cleanly"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/scope-tracking.test.tsx
- describes: "Mutations inside event handlers trigger re-render", "Mutations outside any handler still trigger re-render (direct writes)"
- its: "nested Map mutation inside handler triggers re-render", "nested array push inside handler triggers re-render", "Set add inside handler triggers re-render", "nested object property write inside handler triggers re-render", "cross-chemical write inside handler triggers re-render on target", "direct write from a setTimeout triggers re-render (via held instance)"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/smoke.test.tsx
- describes: "Smoke: $Chemistry renders through React"
- its: "renders hydrogen", "renders oxygen"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

## tests/react/validation.test.tsx
- describes: "Binding constructor validation"
- its: "accepts correct typed children", "$check returns the value for correct types", "$check accepts correct type", "$check accepts subclass"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $Chemical, $check (from @/abstraction/chemical)

## tests/regression/bond-behavior.test.tsx
- describes: "regression — instance state isolation", "regression — direct writes to reactive props", "regression — nested-structure writes through reactive props", "regression — write source: handler, timeout, external", "regression — cross-chemical writes target the right component", "regression — parent write fans out to all derivative mounts", "regression — lexical scoping invariants at the bond level", "regression — held-instance, held-derivative, lifted-component combinations", "regression — invariants from SP-1 audit + scope-finalize fix"
- its: "two instances of the same class hold independent values for the same reactive prop", "two mounted instances of the same class render independent values", "writing on one instance does not wake the other (observed via render counts)", "a direct assignment to $prop updates the DOM", "writing the same value still triggers at least one re-render (no eq short-circuit)", "a sequence of writes across separate ticks each updates the DOM", "Map.set inside a reactive prop triggers re-render and updates DOM", "Set.add inside a reactive prop triggers re-render and updates DOM", "Array.push inside a reactive prop triggers re-render and updates DOM", "plain object property write through a reactive prop triggers re-render", "deep-path write (this.$x.y.z = N) triggers re-render and updates DOM", "a write from an event handler triggers re-render", "a write from setTimeout triggers re-render", "a write from a Promise.then callback triggers re-render", "an external write (no handler, no timer, just code) triggers re-render", "writing inner.$v from outer's handler updates inner's observable value", "writing outer.$inner.$value targets ONLY inner (outer that does not read inner.$value does not re-render)", "a writing chemical that reads its OWN reactive prop alongside the cross-write re-renders", "two mounts of $(parent) both update on a parent write (DOM)", "three mounts: each derivative re-renders at least once on a single parent write", "parent write does NOT trigger renders for unmounted derivatives", "a derivative write does not bleed into a sibling derivative (DOM)", "a derivative write does not re-render the sibling derivative", "a parent write fans out to all derivatives, including shadowed ones (each shows its own value)", "a parent write reaches a derivative-of-a-derivative chain", "held instance: external write to its $prop reaches the mounted component", "lifted component ($($Class)) renders and reacts to internal handler writes", "held derivative: $(held) keeps Component identity stable; writes to held reach all mounts", "mixed: held instance mounted via .Component AND $() in same tree both react to one parent write", "handler on a derivative does not re-render the sibling derivative or the held .Component mount", "cross-chemical write from a scoped handler updates a side-by-side mounted inner (DOM)", "$Reagent assignment target is the instance, not the prototype", "constructor-static state is stable across many instantiations", "prototype is stable across N=10 instantiations + particularization does not taint Error.prototype"
- imports: describe, it, expect (from vitest); render, fireEvent, act (from @testing-library/react); React (from react); $Chemical, $ (from @/abstraction/chemical); $Particle (from @/abstraction/particle)

## tests/regression/short-prop-name.test.tsx
- describes: "regression — single-letter $-prefixed reactive props"
- its: "held .Component + single mount + external write", "$() dispatch + single mount + external write", "$() dispatch + two mounts + external write", "control: long name $value still works (regression sentinel)"
- imports: describe, it, expect (from vitest); render, act (from @testing-library/react); React (from react); $Chemical, $ (from @/abstraction/chemical)

## tests/spikes/sp1-prototype-mutation.test.tsx
- describes: "SP-1 — prototype mutation check"
- its: "reactive prop accessors do NOT land on the class prototype", "the reactive accessor IS installed as an own property on the instance", "two separate instances of the same class do not share state through the prototype"
- imports: describe, it, expect (from vitest); render (from @testing-library/react); React (from react); $Chemical (from @/abstraction/chemical)

---

## Identifiers heavily pinned by tests

These names appear in 3+ test files. They are the highest-leverage identifiers — a rename here ripples through many tests, and a missed-rename here looks like multiple unrelated failures.

| Identifier | Source module | Files |
|------------|---------------|-------|
| `$Chemical` | `@/abstraction/chemical` | 24 files (chemical, chemistry, error implicit, html-catalogue, lexical-scoping, lifecycle, molecule, particularization, render-filters, framework/load, symbolize-audit, assumptions, augmentation, contract, instance-render, integration, patterns, rendering-safety, scope-tracking, smoke, validation, async-construction, bond-behavior, short-prop-name, sp1-prototype-mutation) |
| `$` | `@/abstraction/chemical` | 8 files (chemistry, html-catalogue, lexical-scoping, render-filters, async-construction, bond-behavior, short-prop-name) |
| `React` | `react` | 23 files (every `.tsx` plus several `.ts`) |
| `render` | `@testing-library/react` | 23 files |
| `act` | `@testing-library/react` | 18 files |
| `fireEvent` | `@testing-library/react` | 13 files |
| `$Particle` | `@/abstraction/particle` | 4 files (lifecycle, particle, particularization, render-filters, bond-behavior) |
| `$resolve$` | `@/implementation/symbols` | 2 files (lifecycle, assumptions) — borderline; included for visibility because the symbol is identity-coupled to the `next(phase)` contract |
| `isParticle` | `@/abstraction/particle` | 2 files (error, particularization) — borderline |
| `$lookup` / `$load` | `@/framework/load` | 1 file each (load.test.ts) — concentrated, low-leverage |
| `.Component` (member access, not import) | (instance member) | 12+ files — appears as `instance.Component` or `new $X().Component` |
| `view()` (member access) | (chemical method) | 20+ files |
| `next(phase)` (member access) | (particle/chemical method) | 3 files (lifecycle, assumptions, async-construction) |

### Top 5 most-pinned identifiers

1. **`$Chemical`** — imported in 24 of 30 files. The single highest-leverage name in the suite. A rename here without test-suite alignment will surface as a flood of "Cannot find name '$Chemical'" failures.
2. **`React`** — imported in 23 files. Out-of-scope for chemistry renaming (third-party), but worth pinning so we don't confuse a React-side break with a chemistry rename failure.
3. **`render`** (from `@testing-library/react`) — 23 files. Same out-of-scope caveat.
4. **`$`** — the framework's main entry-point callable. Imported in 8 files; referenced through JSX/dispatch patterns in many more. Renaming `$` would be a sprint-defining decision; this snapshot makes the blast radius visible.
5. **`$Particle`** — 5 files. The other in-codebase identifier with cross-cutting reach. Often appears alongside `$Chemical` and shares its rename risks.

### Member-access identifiers worth tracking separately

These are not imports but appear so widely in test bodies that a rename of the underlying class member produces missed-rename failures spread across the suite. They are not captured in the import table above but are included here as a reminder for the upcoming class-member pass (E-4):

- `.Component` (chemical instance member)
- `.view()` (chemical/particle method)
- `.next(phase)` (lifecycle method)
- `$cid$`, `$type$`, `$symbol$`, `$phases$`, `$particleMarker$`, `$resolve$`, `$phase$` (implementation symbols)
- `$check`, `$Reflection`, `$Error`, `$lift`, `registerFilter`, `$lookup`, `$load`, `$lib`, `$symbolize`, `$type`, `$typeof`, `$instanceof`, `parseFunctionInfo`, `$FunctionInfo`, `walk`, `reconcile`, `ElementVisitor`, `$Rep`, `I` (type) — single- or low-file imports, lower leverage but still part of the rename surface
