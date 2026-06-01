# Cathy's Deep Read Notes

Reading the old archive and new code side by side. Thinking out loud.

## $Chemical constructor — old vs new

### Old (archive chemistry.ts:259-271)
```
constructor() {
    this[$cid] = $Chemical[$$getNextCid]();
    this[$type] = this.constructor;
    if (!this[$type][$$template]) this[$type][$$template] = this;
    this[$parent$] = this;
    this[$template] = this;
    this[$catalyst] = this;
    this[$symbol] = this.toString();
    this[$molecule] = new $Molecule(this);
    this[$reaction] = new $Reaction(this);
    this[$orchestrator] = new $BondOrchestrator(this);
}
```

### New (chemical.ts:63-74)
```
constructor() {
    super();
    const $this = this as any;
    if (!$this[$type$][$$template$$] || !($this[$type$][$$template$$] instanceof $this[$type$]))
        $this[$type$][$$template$$] = this;
    this[$template$] = this;
    this[$$parent$$] = this;
    this[$catalyst$] = this;
    this[$molecule$] = new $Molecule(this);
    this[$reaction$] = new $Reaction(this);
    this[$orchestrator$] = new $BondOrchestrator(this);
}
```

### Differences I notice:
1. Old sets CID and type BEFORE template check. New calls super() which does CID/type in $Particle.
2. Old has simpler template check: `if (!this[$type][$$template])`. New has `|| !(instanceof)` — more defensive.
3. Old sets `this[$symbol]` via `this.toString()`. New inherits symbol from $Particle constructor.
4. Old doesn't call super() — $Chemical WAS the base class. New calls super() because $Particle is the base.

### Concern: The old code set symbol AFTER template, so the template's symbol was set. Our particle sets symbol before chemical constructor runs. Is the order important? I don't think so — the symbol is based on CID and type name, both of which are set by the time $Particle constructor runs.

## $Component$ constructor — the FC creation

### Old (archive chemistry.ts:509-556)
The FC does:
1. `useState(-1)` — CID tracking
2. If cid === -1: create instance via `this.createChemical()`, call `setCid()`
3. Else: `$Reaction.find(cid)` to retrieve
4. `useState({})` — update trigger
5. `reaction.bind(update)` — store setState on the REACTION
6. Three hooks: useEffect mount/unmount, useLayoutEffect layout, useEffect effect
7. `chemical[$render](props)` — orchestrator.render()

### What we have now
1. `useState(-1)` — CID tracking ✓ (restored)
2. Instance creation ✓
3. `$Reaction.find(cid)` ✓
4. `useState({})` — update trigger ✓
5. We store update on the CHEMICAL via `chemical[$update$] = update`. Old stored on REACTION via `reaction.bind(update)`. **DIFFERENCE.**
6. Three hooks ✓ (though our layout and effect don't have `[chemical, token]` deps — they run EVERY render. Old code had `[chemical, token]` which meant they ran when token changed.)
7. We call `$apply` → `$bond$` → `view()` → `reconcile`. Old called `chemical[$render](props)` which went through orchestrator.render().

### Key difference on update storage:
Old: `reaction.bind(update)` stores on reaction. `reaction.update()` calls `this._update!({})`.
New: `chemical[$update$] = update`. `$Bonding` wrapper calls `this[$update$]`.

### Why it matters:
In the old system, the REACTION held the update trigger. The reaction was per-instance (created in $Component$.createChemical). Multiple reactions could share a system (catalyst tree), but each had its own `_update`. In our system, the update is on the chemical directly. Same effect but different indirection.

### Key difference on effect dependencies:
Old: `useLayoutEffect(() => { resolve('layout') }, [chemical, token])` — fires when token changes.
New: `useLayoutEffect(() => { resolve('layout') })` — fires EVERY render (no deps).

This is actually correct for our model. In the old model, `token` was the re-render trigger (when `reaction.update()` set `setState({})`). The token changed on every update-triggered re-render, so layout/effect fired on updates. In our model, we want them to fire on every render too, because the FC is called on every render. So no deps is correct — but for a different reason than "we forgot to add them."

## $Bond.replaceIf — catalyst correction

### Old (archive chemistry.ts:1176-1187)
```
protected replaceIf(dependency: $Chemical, update: boolean) {
    const chemical = this._chemical;
    let $dependency = dependency[$destroyed] ? undefined : 
        dependency[$catalyst] !== chemical[$catalyst] ?
        dependency.Component.$bind(chemical[$parent$] || chemical).$chemical :
        dependency;
    if (update && dependency !== $dependency)
        this.bondSet($dependency);
    return $dependency;
}
```

### What this does:
When a bond reads/writes a value that IS a chemical:
1. If the chemical is destroyed → undefined
2. If the chemical's catalyst doesn't match the current chemical's catalyst → REBIND it under the current parent. `$bind` does `Object.create` and creates a new component.
3. If catalysts match → keep as-is.

### What we have: NOTHING.
We removed bondGet/bondSet which called replaceIf. The catalyst correction is entirely gone.

### When does this matter?
When a chemical is passed from one component tree to another. Example: a `$Card` created in component A is stored in a shared state and rendered by component B. Component B has a different catalyst (different root reaction). The card needs to be rebound under B's catalyst for the reaction system to work correctly.

### Do we need this with the new diffing model?
The catalyst system is used for:
1. Grouping chemicals into reaction systems (who shares an update trigger)
2. Determining when a chemical crosses boundaries

With our new model, each chemical has its own `$update$` stored directly. There's no shared reaction system. So catalyst GROUPING is less important. But the REBINDING — creating a prototypal shadow when a chemical is rendered in a new context — IS still needed for the multi-render scenario Doug described.

### Decision: replaceIf's rebinding should happen in the orchestrator's processElement, not in bond get/set. When the orchestrator binds a child to a parent, it already calls `$bind(parent)` which does `Object.create`. The catalyst check could be added there: if the child's catalyst doesn't match the parent's, rebind.

## $Bonding.handleAsync — old vs new

### Old (archive chemistry.ts:1299-1340)
Complex async handling:
1. `.then()` chains with replaceIf on results
2. `this._lastSeenActive` tracks the active promise
3. Cancellation via `$promise.cancel()` — cancels previous promise when new one starts
4. `this._lastSeenRender = this.chemical.render()` — waits for RENDER to complete before updating
5. Compares `this._lastSeenValue !== result` before calling `this.update()`

### What we have (molecule.ts:273-281)
```
this._chemical[this._property] = function (this: any, ...args: any[]) {
    const result = action.apply(this, args);
    if (this[$rendering$] || this[$phase$] === 'setup') return result;
    const trigger = this[$update$];
    if (!trigger) return result;
    result instanceof Promise ? result.then(() => { if (!this[$rendering$] && trigger) trigger({}); }) : trigger({});
    return result;
};
```

### What we lost:
1. Promise cancellation — old code cancelled previous async operation when new one started
2. Render-awaiting — old code waited for the current render to finish before triggering update
3. Value comparison — old code only triggered if the result was different from last seen
4. Chemical result handling — old code called replaceIf on chemical-valued results

### What we gained:
Simplicity. The wrapper is 6 lines. It triggers `$update$` unconditionally (except during render). The diff in `reconcile` handles "did anything actually change?" at the view level.

### Is the simplicity correct?
For synchronous methods: yes. Method runs, state mutates, `$update$` triggers, React re-renders, `reconcile` compares.
For async methods: PROBABLY yes for simple cases. But promise cancellation was solving a real problem — rapid async calls where only the last result matters. Without cancellation, stale async results can overwrite fresh state. This is the "race condition" that Doug's legacy test app explicitly tested.

### Decision: Promise cancellation IS a correctness issue (Arthur is right). Deferred but prioritized.

## augmentView — the old key injection and prototypal scoping

### Old (archive chemistry.ts:1662-1718)
Walked the ENTIRE view output tree. For each chemistry element:
1. Injected `$symbol$` as React key
2. Merged `$lastProps` with view-provided props
3. Called `$bind()` to create a prototypal shadow when extra props present
4. Wrapped root in a keyed Fragment

### What we have: NOTHING (removed in sprint 11).

### What we lost:
1. Auto-keying of ALL chemistry elements — now only `$List` handles lists
2. Prop merging from view — handled by `$apply` in the FC, differently but functionally
3. **Rebinding on prop override — THIS was the multi-render prototypal scoping mechanism. When a parent's view rendered `<card.Component background="red" />`, augmentView created a `$bind()` shadow. The shadow got the props. The original was untouched.**
4. Root keyed Fragment wrapper — React used this for reconciliation identity

### The key insight:
augmentView was NOT just about keys. It was the MECHANISM for prototypal scoping. The multi-render problem Doug described? augmentView solved it. We deleted the solution.

### Decision: 
The `$List` fragment or the FC itself needs shadow creation when props differ from the template. This is not optional — it's how $Chemistry components can be rendered with different props without clobbering.
