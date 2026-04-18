# I-1: The Render Pipeline

Traced 2026-04-08. Findings from code reading, not assumptions.

## Two rendering models

$Chemistry has two distinct rendering paths. This is not documented in the overview.

### 1. Particle rendering (lightweight)

`$Particle.use()` creates a closure. The particle becomes a callable function. No React hooks. No lifecycle. The closure does: `$apply(props)` → `$bond()` → `view.apply($this)`. This is what `proof.tsx` demonstrated.

- Created during `$Particle` constructor via `$this.use($this.view)` (line 34)
- `use()` creates a prototypal copy via `Object.create(this)` (line 48)
- The copy gets its own CID and symbol
- A `$view` arrow function is created and stored on the copy as `.view`
- The `$view` function carries `$view.$view` (the original implementation) and `$view.$this` (the instance)
- If the particle is a template, invoking the view auto-creates a fresh derived instance (line 54-55)

### 2. Chemical rendering (full-featured)

`$Component$` creates a React FC that wraps the chemical. Uses `useState`, `useEffect`, `useLayoutEffect`. The orchestrator manages the render pipeline.

- Created lazily via `.Component` getter → `$createComponent$` → `new $Component$(template)`
- `$Component$` constructor creates a React FC (arrow function) and returns it (constructor-return pattern)
- `Object.setPrototypeOf(Component, this)` — the function delegates to the `$Component$` instance

### Open question

**The particle-level `use()` call runs during `$Chemical` construction (via `super()`), but chemicals render through `$Component$`, not through the `use()`-created view function. Is the `use()` call dead weight for chemicals?** The prototypal copy it creates has no reference stored to it and may be garbage collected.

## Chemical render path (step by step)

When React calls the Component function:

```
1. useState(-1)  → cid state
2. if not bound:
   a. first render (cid === -1): createChemical(template)
      - Object.create(template) → new bound instance
      - new $Molecule(chemical)
      - new $BondOrchestrator(chemical)
      - [$parent$] = parent || self
   b. subsequent renders: $Reaction.find(cid) → retrieve existing
3. if new: setChemicalId(cid)  → stores CID in React state
4. useState({})  → update token for re-renders
5. reaction.bind(update)  → stores React's setState
6. useEffect(mount):
   - reaction.resolve('mount')
   - cleanup: resolve('unmount'), two-check destroy for strict mode
7. useLayoutEffect: reaction.resolve('layout')
8. useEffect: reaction.resolve('effect')
9. chemical[$render$](props)  → orchestrator pipeline
```

### The orchestrator pipeline (inside $render$)

```
orchestrator.render(props):
  1. reaction.activate()     — push onto active stack, start state tracking
  2. molecule.reactivate()   — create bonds for all reactive properties
  3. orchestrator.bond(props) — process children, call binding constructor
  4. molecule.reactivate()   — refresh bonds after binding
  5. view = chemical.view()  — THE PURE TSX CALL
  6. view = augmentView(view) — rewrite React element tree with chemistry keys
  7. reaction.deactivate()   — pop from active stack
  8. reaction.updateIf()     — compare state snapshots, trigger re-render if changed
  9. return view
```

## Prototype chain of a rendered chemical

```
bound instance (own: $cid$, $symbol$, $molecule$, $orchestrator$, reactive props)
  └── template (own: $cid$, $symbol$, $type$, $molecule$, $reaction$, $orchestrator$, default prop values, methods)
      └── $Water.prototype (own: view method, binding constructor, class methods)
          └── $Chemical.prototype (own: mount, render, layout, effect, unmount, [$render$], etc.)
              └── $Particle.prototype (own: use, toString, [$apply$], [$bond$])
```

The bound instance inherits default values and methods from the template via prototype chain. It owns only what differs: its identity (CID, symbol) and its infrastructure (molecule, orchestrator). Prop values set via `$apply` or the binding constructor are set on the bound instance, shadowing the template's defaults.

## Reaction system structure

Each chemical has its own `$Reaction` instance with its own `_update` (React's `setState`). But reactions share a `_system` — the root reaction of the catalyst tree. The `activate()`/`deactivate()` stack lives on the system. Each chemical triggers its own React re-render independently.

When a child chemical is added to a parent (via `$parent$` setter):
- If the child has no parent (self-parented): it becomes its own catalyst, creates its own reaction system
- If the child has a parent: it joins the parent's catalyst's reaction system via `catalyst[$reaction$].add(this)`

## Insights

1. **Two rendering models exist.** Particles are functions. Chemicals are wrapped in functions. The particle model is `proof.tsx`. The chemical model is the full framework. This duality should be explicit in docs.

2. **The object IS the component state.** React's `useState` is used for exactly two things: CID tracking and re-render triggering. ALL application state lives on the chemical object. This is the fundamental inversion of React's model — state moves from React hooks into OOP objects.

3. **`Object.create()` is the instantiation mechanism.** `new` is only called at entry points (template creation). All bound instances are born via `Object.create(template)`. This is Self's delegation model.

4. **The view is called at step 5 of 9.** Five steps of setup (activate, reactivate, bond, reactivate again), the view call, then three steps of teardown (augment, deactivate, check). The view itself is the pure part. Everything else is framework orchestration around it.
