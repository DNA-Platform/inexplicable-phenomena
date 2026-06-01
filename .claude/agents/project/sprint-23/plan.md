# Sprint-23 — Audit Cleanup: Audience Boundaries & Loose Ends

## Goal

After sprint-22's structural rebuild (lexical scoping, async ctors, `$()` redesign, render-filter pattern, audience split into `@dna-platform/chemistry` + `@dna-platform/chemistry/symbolic`), the framework has accumulated minor leaks, vestigial code, and mismatched naming. This sprint is **a polish pass** — no new behavior, no design changes. We tighten what already exists.

## Audit findings (input to this sprint)

Conducted via codebase walk after sprint-22 closed. Findings fall into six categories:

### A. Leaked internals (audience-2 surface contains audience-1 stuff)

The package's root entry (`src/index.ts`) exposes some symbols a component developer should not see in autocomplete.

- **A1.** `$lift` and `$phaseOrder` — framework machinery, exported to component devs. *Medium.*
- **A2.** `$check` / `$is` — used in user bond ctors today, but they're thin wrappers around `$paramValidation`. Worth a closer look at whether they belong in audience-2 or are scaffolding.
- **A3.** `export * from './implementation/types'` — dumps `$SymbolFeature`, `$Particular<T>`, `$MethodComponent`, `$Bound<T>` onto the audience-2 surface alongside legitimate types. *Medium.*
- **A4.** `$Represent` (the class) — exported, but only `$symbolize` / `$literalize` are user-facing. The class is implementation. *Low.*
- **A5.** `Particle` singleton (lowercase) — exported but never referenced anywhere. Vestigial. *Low.*

### B. Public statics that should be symbol-keyed or private

Static class members on `$Bond`, `$ParamValidation`, `$Reflection` are publicly accessible string-keyed surfaces but are framework machinery.

- **B2.** `$Reflection.inertDecorators` / `$Reflection.reactiveDecorators` — public `static Map<...>`. Anyone can mutate them and corrupt framework state. Should be symbol-keyed or private. *Medium.*
- **B3.** `$ParamValidation.describeType` / `describeActual` / `isPrimitiveType` / `isValidReactNode` / `validateArgument` / `validatePrimitive` — six public static helpers; framework plumbing exposed as public API. *Medium.*
- **B4.** `$Bond.isMethod` / `$Bond.create` — internal property classification, public statics. *Low.*

### C. Naming inconsistencies

- **C1.** "derivative" vs "child" — comments use "derivative" (correct for `Object.create` instances); orchestrator code mixes "child" (JSX child) with "context parent" terminology. Two parents (prototype + context); two child senses. Worth a vocabulary pass. *Low.*
- **C2.** Symbol naming — convention is `$xxx$` for instance fields, `$$xxx$$` for class statics. Broken by `$lifted$` (instance), `$derivatives$` (instance), `$catalyst$` (instance) — these match instance form and are fine. But `$$template$$` / `$$getNextCid$$` use `$$xxx$$`. Audit and document the rule, or rename strays. *Low.*
- **C3.** `$apply$` vs ad-hoc prop assignment — `$Particle.[$apply$]` exists but the orchestrator at `chemical.ts:167-169` manually does `chemical['$' + prop] = props[prop]`. Should call `$apply` for consistency. *Low.*

### D. Tests testing implementation rather than behavior

- **D1.** `tests/abstraction/lexical-scoping.test.ts` directly imports `$derivatives$` symbol. Internal-coupling. Tests should observe behavior; using the symbol pins them to a specific implementation. *Medium.*
- **D2.** `tests/implementation/symbolize-audit.test.ts` — correctly in `tests/implementation/`, but the existence is worth re-evaluating now that scope tracking uses snapshot diff (not symbolize). Possibly stale. *Low.*
- **D3.** `tests/react/scope-tracking.test.tsx` — frames as testing internal "scope" rather than user-facing "mutation in handler causes re-render." Rename or refocus. *Low.*
- **D4.** `tests/react/contract.test.tsx` — title implies a public contract; tests pin the scope-based reactivity engine. Tests are valuable; the labeling could better describe the user contract being asserted. *Low.*

### E. Awkward abstractions

- **E1.** `$Particle.constructor(particular?: object)` — the "particularization" pattern. Symbol `$particular$` is set but never read anywhere. Either a dead feature or an incomplete one. *Medium.*
- **E2.** `Component` getter and `$Component` getter — both on `$Chemical`, returning the same value with different types. The `$Component` getter just casts. Redundant. *Low.*
- **E3.** Two component caches (`[$component$]` and `[$lifted$]`) — both store React-component-shaped values. Templates cache `[$component$]`; instances cache `[$lifted$]`. The two-cache model isn't documented. *Low.*

### F. Vestigial code

- **F1.** `Particle` singleton never used (same as A5; tagged here for scope).
- **F2.** `$particular$` symbol declared but never read in any branch. (Connects to E1.)
- **F3.** Comments referencing "react() to re-render" where the actual call is `[$reaction$]?.react()`. Outdated mental model in docstrings. *Low.*
- **F4.** `$Include` / `$wrap` — not documented whether they're permanent framework primitives or build-up scaffolding for a future feature. Inconclusive without a design intent stated somewhere. *Low.*

## Stories

### S1 — Tighten audience-2 surface (`src/index.ts`)

Remove leaked framework internals from the root entry. Move them to `src/symbolic.ts` if they're audience-1, delete if vestigial.

Actions:
- Move `$lift`, `$phaseOrder` from `index.ts` → `symbolic.ts`.
- Stop `export * from './implementation/types'`. Replace with a curated list — only the types component devs need (`Component`, `Element`, `$Component`, `$Element`, `$Phase`, `$Promise`, `$Properties`, `$Props`, `Constructor`). Move framework-internal types (`$SymbolFeature`, `$Particular<T>`, `$MethodComponent`, `$Bound<T>`, `$ParameterType`) to `symbolic.ts`.
- Move `$Represent` class → `symbolic.ts` (keep `$symbolize`/`$literalize` as audience-2 functions).
- Delete `Particle` singleton export and its declaration in `particle.ts`.
- Audit `$check` / `$is`: confirm they belong in audience 2 (component dev API) or move to symbolic.

**Acceptance:** `index.ts` is short, unambiguous, audience-2 only. Tests still pass (some specimens may need `@/symbolic` imports).

### S2 — Symbol-key the leaky public statics

Move public string-keyed static members to symbol-keyed where they're framework machinery.

Actions:
- `$Reflection.inertDecorators` / `$Reflection.reactiveDecorators` → use new `$inertDecorators$` / `$reactiveDecorators$` symbols. Decorator setters write through symbols. Public string access removed.
- `$ParamValidation.describeType` / `describeActual` / `isPrimitiveType` / `isValidReactNode` / `validateArgument` / `validatePrimitive` → mark as `private` or move to module-level helpers (not class statics). Re-export through `symbolic.ts` if needed.
- `$Bond.isMethod` / `$Bond.create` → similar treatment. Module-level helpers or symbol-keyed statics.

**Acceptance:** No public string-keyed statics on framework classes that aren't legitimately part of the audience-1 API. Tests still pass.

### S3 — Vocabulary pass on parent/child terminology

Rationalize "derivative" / "child" / "parent" / "context parent" / "prototype parent" usage across docstrings and code.

Rules to enforce:
- **derivative** = `Object.create(parent)` instance (prototype-derived).
- **prototype parent** = the chemical the derivative was created from.
- **context parent** = the chemical containing this one in the JSX tree (set via `$bind`).
- **child** = JSX child, only used in orchestrator processing, not for derivatives.

Sweep `src/abstraction/chemical.ts` and `src/abstraction/particle.ts` for misuse. Update docstrings.

**Acceptance:** A reader can tell the two senses of "parent" apart from comments alone.

### S4 — Decouple lexical-scoping tests from `$derivatives$` symbol

Refactor `tests/abstraction/lexical-scoping.test.ts` to assert behavior rather than internal symbol state.

Actions:
- Tests that read `(r as any)[$derivatives$]?.size` should instead assert *observed* behavior: parent state change wakes derivatives, mutations are isolated, etc.
- Mount-count and registry-size assertions become render-count assertions or DOM-level observations.

**Acceptance:** Test suite still covers all lexical-scoping contracts. No `import` of `$derivatives$` from test files.

### S5 — Resolve `$particular$` — finish or delete

Investigate whether the particularization feature (`new $Particle(plainObject)`) is used or planned.

Actions:
- If used / planned per the sprint-22 plan ("particularization preserves identity"), document the feature, finish reading the `$particular$` flag where appropriate.
- If unused, remove the constructor parameter, the `$particular$` field, and the `$particular$` symbol.

**Open question for Doug:** sprint-22 plan included "Particularization (identity-preserving)" as S10. Is that still on the roadmap, or quietly deferred? If deferred, S5 deletes; if planned, S5 documents.

### S6 — Collapse `Component` / `$Component` getters

`Component` getter returns the typed Component; `$Component` getter casts the same return to a different type. Two getters, one value. Redundant.

Actions:
- Pick one. Rename the other to a static type alias if needed.
- Update specimens / app / tests that reference both.

**Lean:** Keep `Component` getter. Drop `$Component` getter; provide `$Component<T>` *type* via the existing element.ts type alias. Users do `const C: $Component<MyChem> = chemical.Component as $Component<MyChem>` or use `$()` which already returns `$Component<T>`.

### S7 — Document or unify the two component caches

`[$component$]` and `[$lifted$]` both cache React components. The relationship isn't documented.

Actions:
- Either unify (one cache symbol, branch on path), or document why two exist with a clear rule for which is used when.

**Lean:** Document. They serve different purposes — `[$component$]` is the chemical's "primary" Component (template's `$createComponent` result, runs bond ctor at mount); `[$lifted$]` is the cache for `$()` instance lookup (skips bond ctor). Document the distinction inline.

### S8 — Re-frame implementation-specific tests

`scope-tracking.test.tsx` and `contract.test.tsx` test important contracts but the framing is internal-mechanism-focused.

Actions:
- Rename test descriptions to user-observable behavior. "Scope tracking — withScope catches mutations" → "Mutations inside event handlers cause re-render."
- No test logic changes; just label refresh.

### S9 — Cleanup outdated docstrings

Comments referring to the removed `react()` escape hatch, the old singleton-Atom semantics, the `Component` getter (when it changes per S6), etc.

Actions:
- Sweep docstrings; update any references to API that's been replaced.
- Particularly: comments in `chemical.ts` and `particle.ts` mentioning "the chemical's react() method" or "react() escape hatch."

### S10 — `symbolize-audit.test.ts` resolution

Determine if this test file is still relevant after scope tracking moved from `$symbolize` to deep-clone snapshot.

Actions:
- If still useful (audits `$symbolize`'s contract for users who use it directly), keep but rename to clarify it's testing the public `$symbolize` function.
- If stale (was about scope's internal use of symbolize), delete.

## Open questions for Doug

1. **A2 — `$check` / `$is` placement.** Are these used inside user bond ctors as the typical way to validate args? Or are they scaffolding nobody calls? Determines audience-2 vs audience-1.
2. **E1 / S5 — particularization.** Active feature or vestigial?
3. **F4 — `$Include` / `$wrap`.** Documented as permanent framework primitives, or under reconsideration?
4. **S6 — `Component` vs `$Component` getter.** Confirm dropping `$Component` getter (using `$()` for the optional-props variant instead).

## Out of scope

- New features (no new directives, no new wrappers, no new APIs).
- Renaming user-visible classes (`$Chemical`, `$Atom`, `$Particle`, `$Reagent` stay).
- Test reorganization (mirror is fine; don't touch).
- Performance work (separate concern; sprint-21 still holds).

## Risks

- **S2 (symbol-key publics) might break specimens or external consumers.** Specimens import via `@/symbolic` already where needed; verify no audience-2 specimen reaches for `$Bond.create` or `$Reflection.inertDecorators`.
- **S4 (decouple lexical-scoping tests) — risk of weakening test coverage.** The `$derivatives$.size` checks proved the registry mechanism works; replacing with behavior assertions must cover the same ground.
- **S9 (docstring sweep) is easy to accidentally break example code in comments.** Verify `npx tsc --noEmit` after.

## Sprint-23 grade rubric

- 0 medium-severity findings remaining.
- Audience-2 surface is small enough to fit on one screen.
- Tests don't import from `@/implementation/symbols` directly (lexical-scoping.test the only current offender).
- No vestigial exports.
- Pipeline green: tsc, vitest, rollup × 2 bundles.
