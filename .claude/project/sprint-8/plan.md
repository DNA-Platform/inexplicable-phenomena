# Sprint 8: Particle Rendering

The particle becomes a React component. `$Component$` dissolves. Templates move to `$Chemical`. `next(phase)` lands on `$Particle`. The rendering model unifies: `use()` produces a React FC with lifecycle hooks, and `$Chemical` adds orchestration via the `$bond$` override.

## Status: NOT STARTED

Last updated: 2026-04-08

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Primary: particle rewrite, use() redesign, chemical adaptation |
| Arthur | Architect | Boundary review: what belongs on particle vs chemical, dependency graph |
| Libby | Librarian | Track insights, update docs, review examples |

## Architecture

### The new layering

```
$Particle                          $Chemical extends $Particle
─────────                          ────────────────────────────
Identity: CID, symbol, type        Templates: $$template$$, $isTemplate$
View: view(), use()                Bonds: $Molecule, $Bond, $Reflection
Lifecycle: next(phase)             Orchestration: $BondOrchestrator, binding constructor
Props: $apply$                     Parent/catalyst: $$parent$$, $catalyst$
Bond hook: $bond$ (no-op)          Overrides $bond$ with orchestration pipeline
                                   Component getter: template management, $bind()
                                   Destroy: $molecule.destroy(), $reaction.destroy()
```

### How use() changes

**Before (current):**
```
use(view) → bare closure: (props) => { apply; bond; view() }
```

**After (sprint 8):**
```
use(view) → React FC with hooks:
  (props) => {
    const [, update] = useState({});       // re-render trigger (stored on particle)
    useEffect(() => {                       // mount / unmount
      resolve('mount');
      return () => resolve('unmount');
    }, []);
    useLayoutEffect(() => {                 // layout
      resolve('layout');
    });
    useEffect(() => {                       // effect
      resolve('effect');
    });
    $apply(props);
    $bond();
    return view();
  }
```

The FC carries `$view` (implementation) and `$this` (instance) as before. Parameterless only — `use()` with args is deferred.

### How next(phase) works

On `$Particle`. Phase queues stored in a symbol-keyed map. `next(phase)` returns a promise. `resolve(phase)` drains the queue.

```typescript
// On $Particle:
next(phase: $Phase): Promise<void> {
    if (this[$phase$] === phase) return Promise.resolve();
    return $promise(resolve => {
        this[$phases$].get(phase)!.push(resolve);
    });
}

// Called by the hooks inside the use()-created FC:
[$resolve$](phase: $Phase) {
    const queue = this[$phases$].get(phase);
    while (queue && queue.length > 0) queue.shift()!();
    this[$phase$] = phase;
}
```

### How $Chemical adapts

`$Chemical` no longer needs `$Component$`. It:

1. Overrides `$bond$` with the orchestration pipeline:
   ```
   [$bond$]() {
     this[$molecule$].reactivate();
     this[$orchestrator$].bond(currentProps);
     this[$molecule$].reactivate();
   }
   ```

2. Moves template management to `Component` getter:
   ```
   get Component() {
     if (this[$isTemplate$]) return this.use(this.view);
     if (!this[$template$][$component$])
       this[$template$][$component$] = this[$template$].Component;
     return this[$component$] ?? this[$template$][$component$];
   }
   ```

3. Moves `createChemical` (the `Object.create(template)` pattern) to a chemical method, called by the `Component` getter or `$bind`.

4. Keeps `assertViewConstructors`.

5. The named lifecycle methods (`mount()`, `layout()`, etc.) become thin wrappers over `next()` for backwards compatibility, or are removed in favor of `next()` directly.

### What gets deleted

- `$Component$` class (component.ts) — dissolved into particle's `use()` and chemical's `Component` getter
- Template logic on `$Particle` — `$$template$$` static, `$isTemplate$` getter, template-auto-derive in `use()`
- The `$Reaction` class's state-tracking methods — `activate()`, `deactivate()`, `updateIf()`, `$State` class (deferred to sprint 10, but lifecycle queue part may simplify)

### What gets added

- `$phase$` symbol — current lifecycle phase on particle
- `$phases$` symbol — map of phase → callback queue on particle  
- `$resolve$` symbol — method to drain a phase queue
- `$update$` symbol — stores React's setState for re-render triggering
- `next(phase)` method on `$Particle`

## Epics

### E1: Particle lifecycle

Add lifecycle to `$Particle`. The particle can await its own phases.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Add lifecycle symbols ($phase$, $phases$, $resolve$, $update$) | Cathy | — | NOT STARTED |
| E1-S2 | Implement next(phase) and resolve on $Particle | Cathy | E1-S1 | NOT STARTED |
| E1-S3 | Redesign use() to produce React FC with lifecycle hooks | Cathy | E1-S2 | NOT STARTED |
| E1-S4 | Remove template logic from $Particle | Cathy | E1-S3 | NOT STARTED |

#### Story details

##### E1-S1: Add lifecycle symbols
- **What:** Add `$phase$`, `$phases$`, `$resolve$`, `$update$` to symbols.ts. Define `$Phase` type if not already in types.ts (it is — `'setup' | 'mount' | 'render' | 'layout' | 'effect' | 'unmount'`).
- **Files:** `src/symbols.ts`
- **Acceptance:** Symbols exist. Types exist. Build passes.

##### E1-S2: Implement next() and resolve
- **What:** `$Particle` gets `next(phase)` and `[$resolve$](phase)`. Phase queues initialized in constructor. `next()` returns a promise that resolves when `$resolve$` drains the queue. Smart resolution: if already at the requested phase, resolve immediately.
- **Files:** `src/chemistry/particle.tsx`
- **Acceptance:** `const p = new $Particle(); p[$resolve$]('mount'); await p.next('mount')` resolves immediately. `p.next('layout')` returns a pending promise until `p[$resolve$]('layout')` is called.
- **Notes:** Keep the code dense. No blank lines inside methods. The phase queue map is initialized once in the constructor.

##### E1-S3: Redesign use() to produce React FC with hooks
- **What:** `use(view)` creates a React FC that includes `useState` (re-render trigger), `useEffect` (mount/unmount), `useLayoutEffect` (layout), `useEffect` (effect). Props are applied via `$apply$`, then `$bond$()`, then `view()`. The FC carries `$view` and `$this`.
- **Files:** `src/chemistry/particle.tsx`
- **Acceptance:** `new $Particle().use(view)` returns a function React can render. Lifecycle hooks fire. `next('mount')` resolves after the component mounts.
- **Notes:** Parameterless view functions only. The FC is an arrow function (no `.prototype` — React treats it as a function component). The particle's `$update$` stores the `useState` setter for potential re-render triggering by subclasses.

##### E1-S4: Remove template logic from $Particle
- **What:** Remove `$$template$$` static, `$isTemplate$` getter, `$derived$`, template-auto-derive in `use()`, and the template-setting code in the constructor. These move to `$Chemical` in E2.
- **Files:** `src/chemistry/particle.tsx`
- **Acceptance:** `$Particle` has no concept of templates. Build passes. Existing particle tests updated.

### E2: Chemical adaptation

Adapt `$Chemical` to use particle's new lifecycle and handle its own template/binding concerns.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Move template logic to $Chemical | Cathy | E1-S4 | NOT STARTED |
| E2-S2 | Override $bond$ with orchestration pipeline | Cathy | E1-S3 | NOT STARTED |
| E2-S3 | Rewrite Component getter without $Component$ | Cathy | E2-S1, E2-S2 | NOT STARTED |
| E2-S4 | Move createChemical and $bind to $Chemical | Cathy | E2-S3 | NOT STARTED |
| E2-S5 | Adapt lifecycle methods to use next() | Cathy | E1-S2 | NOT STARTED |

#### Story details

##### E2-S1: Move template logic to $Chemical
- **What:** `$$template$$` static, `$isTemplate$` getter, template-auto-derive — all move to `$Chemical`. The chemical constructor sets up the template. `$Atom` constructor still returns the template.
- **Files:** `src/chemistry/chemical.ts`, `src/chemistry/atom.ts`
- **Acceptance:** Templates work on chemicals. Particles don't have templates. `$Atom` still works.

##### E2-S2: Override $bond$ with orchestration pipeline
- **What:** `$Chemical` overrides `[$bond$]()` (inherited no-op from particle) with: `molecule.reactivate()` → `orchestrator.bond(props)` → `molecule.reactivate()`. This is the step that the particle's `use()`-created FC calls between `$apply$` and `view()`.
- **Files:** `src/chemistry/chemical.ts`
- **Acceptance:** When a chemical's FC renders, the orchestration pipeline runs. Binding constructor is called. Bonds are formed.
- **Notes:** The `$bond$` override needs access to the current props. Consider storing them on the instance after `$apply$` runs, or passing through the closure.

##### E2-S3: Rewrite Component getter without $Component$
- **What:** The `Component` getter on `$Chemical` now handles template management directly. For the template: creates a bound instance via `Object.create()`, calls `use()` on it. For non-templates: returns the stored component. No `$Component$` class involved.
- **Files:** `src/chemistry/chemical.ts`
- **Acceptance:** `new $Water().Component` returns a React FC. The FC renders the chemical through the orchestration pipeline.

##### E2-S4: Move createChemical and $bind to $Chemical
- **What:** The `createChemical` logic from `$Component$` (Object.create, assign molecule/orchestrator/parent) becomes a method on `$Chemical`. `$bind(parent)` becomes a method on the Component interface or on `$Chemical` directly.
- **Files:** `src/chemistry/chemical.ts`
- **Acceptance:** Bound instances are created correctly. Parent-child relationships work. Catalyst system works.

##### E2-S5: Adapt lifecycle methods to next()
- **What:** The named methods `mount()`, `layout()`, `effect()`, `unmount()` on `$Chemical` become wrappers: `async mount() { return this.next('mount'); }`. Or they are removed entirely in favor of `next()`. Decision point: keep for ergonomics or remove for simplicity.
- **Files:** `src/chemistry/chemical.ts`
- **Acceptance:** `await this.next('mount')` works on chemicals. If named methods are kept, they delegate to `next()`.
- **Notes:** Doug prefers `next('mount')` with the string enum. Named methods may be kept temporarily for backwards compatibility during the transition, then removed.

### E3: Cleanup and deletion

Remove dead code. Delete `$Component$`. Clean up imports.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Delete component.ts ($Component$) | Cathy | E2-S3, E2-S4 | NOT STARTED |
| E3-S2 | Clean up $Reaction — remove state tracking methods | Cathy | E2-S5 | NOT STARTED |
| E3-S3 | Update index.ts exports | Arthur | E3-S1 | NOT STARTED |
| E3-S4 | Remove dead symbol imports across all files | Arthur | E3-S1 | NOT STARTED |

##### E3-S2: Clean up $Reaction
- **What:** The lifecycle queue mechanism that `next()` now handles was on `$Reaction`. Remove the duplicate. `$Reaction` keeps: state tracking (activate/deactivate/updateIf) for sprint 10, the static chemicals map, the system hierarchy. It loses: the phase queues, `resolve()`, the async phase methods.
- **Notes:** Or $Reaction simplifies to ONLY state tracking, and the lifecycle queues are fully on particle. Depends on how cleanly they separate.

### E4: Tests and examples

Test the new particle rendering path. Update examples. Copy examples into test project.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E4-S1 | Rewrite particle.test.ts for new lifecycle | Cathy | E1-S3 | NOT STARTED |
| E4-S2 | Update smoke.test.tsx for new rendering path | Cathy | E2-S3 | NOT STARTED |
| E4-S3 | Update elements.test.tsx | Cathy | E2-S3 | NOT STARTED |
| E4-S4 | Update compounds.test.tsx | Cathy | E2-S3 | NOT STARTED |
| E4-S5 | Write lifecycle.test.ts — next() probes | Cathy | E1-S2 | NOT STARTED |
| E4-S6 | Update examples in examples/ directory | Libby | E2-S3 | NOT STARTED |

##### E4-S5: Write lifecycle.test.ts
- **What:** Exploratory tests for `next()`. "What happens when I await next('mount') before the component mounts?" "What happens when I await next('mount') after?" "What happens when I await next('layout') from inside an effect?" These probe the mechanism, not assert known behavior.
- **Notes:** This is the "both" approach Doug approved — read and probe simultaneously.

### E5: Code review

Review all changed code through Cathy's lens. "Whimsically baffling, but anything baffling must have utility."

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E5-S1 | Review particle.tsx — density, naming, $ grammar | Cathy/Arthur | E3-S4 | NOT STARTED |
| E5-S2 | Review chemical.ts — clean separation from particle | Arthur | E3-S4 | NOT STARTED |

## Dependency graph

```
E1-S1 (symbols)
 └── E1-S2 (next/resolve)
      ├── E1-S3 (use() redesign) ─────────────────┐
      │    └── E1-S4 (remove templates from particle)│
      │         └── E2-S1 (templates to chemical)    │
      │              └── E2-S3 (Component getter) ───┤
      │                   └── E2-S4 ($bind)          │
      │                        └── E3-S1 (delete $Component$)
      │                             └── E3-S3 (exports)
      │                             └── E3-S4 (dead imports)
      ├── E2-S2 ($bond$ override) ──────────────────┘
      └── E2-S5 (lifecycle methods → next())
           └── E3-S2 (clean $Reaction)

E4-S1 through E4-S6: after their dependencies complete
E5-S1, E5-S2: after E3-S4
```

## Open questions (to ask Doug during execution)

1. **Named lifecycle methods:** Keep `mount()`, `layout()`, `effect()`, `unmount()` as wrappers over `next()`, or remove them? Wrappers add ergonomics; removal enforces the unified API.

2. **Particle re-render trigger:** The `useState({})` dummy is stored on the particle for subclasses to use. Should `$Particle` expose a `[$update$]()` method that chemicals call, or should the trigger mechanism stay hidden?

3. **`use()` with args:** Currently deferred (parameterless only). When we revisit, what's the use case? View functions that take extra arguments beyond the particle's state?

4. **`augmentView()`:** Currently on the orchestrator. Does it survive, move, or simplify? It rewrites the React element tree with chemistry keys for reconciliation stability. We need to understand its purpose before deciding.

## Verification checklist

- [ ] `$Particle` has `next(phase)` and lifecycle hooks in `use()`
- [ ] `$Particle` has no template logic
- [ ] `$Chemical` manages templates, overrides `$bond$`, provides `Component` getter
- [ ] `component.ts` is deleted — `$Component$` no longer exists
- [ ] All 240+ existing tests pass (or are updated to match new API)
- [ ] New lifecycle probe tests exercise `next()`
- [ ] Smoke test still renders hydrogen through React
- [ ] Element and compound examples compile and test
- [ ] Code review: particle.tsx is dense, artful, baffling-with-utility
- [ ] No dead imports, no dead code, no commented-out blocks
