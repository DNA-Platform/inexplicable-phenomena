# Orchestrator Deep Read

## What it does

The orchestrator has three jobs:

1. **`bond(props)`** — process JSX children into binding constructor arguments. Walk children, identify types (chemical, function, HTML, array, primitive), bind chemicals to parent, extract typed arguments, call the binding constructor with validated args.

2. **`augmentView(view)`** — rewrite the view's React element tree. Walk every node, rebind chemistry components (inject `$symbol$` keys, `$bind()` if parent differs), recurse children. Return the original node reference when nothing changed.

3. **`render(props)`** — the full pipeline. Currently calls `reaction.activate()`, `molecule.reactivate()`, `bond(props)`, `molecule.reactivate()`, `view()`, `augmentView(view)`, `reaction.deactivate()`, `reaction.updateIf()`. Most of this is now dead — lifecycle is on particle, state tracking is deleted. Only `bond(props)` is actively used (from chemical's `$bond$` override).

## Beautiful patterns to preserve

### Prototype-based context cloning ($BondOrchestrationContext.clone)
```typescript
private clone(): this {
    const context = Object.create(Object.getPrototypeOf(this));
    Object.assign(context, this);
    context.parent = this;
    return context;
}
```
Each step in children processing creates a new context via prototype delegation. The context chain forms a linked list where each step can access its parent. Self's delegation pattern applied to parsing. Beautiful.

### Change-tracking in augmentNode
```typescript
let changed = false;
const augmented = node.map(child => {
    const node = this.augmentNode(child);
    changed = changed || node !== child;
    return node;
});
return (changed || first) ? React.createElement(...) : node;
```
Only allocates new elements when the subtree actually changed. Reference equality as the fast path. Zero allocation for unchanged subtrees. This IS diffing — it's just diffing against the pre-transformation version of the same tree.

### The $lastProps$ gate ($BondOrchestrationContext.child)
```typescript
child(chemical, props): any {
    if (chemical[$lastProps$] === props) return props;
    props = chemical[$orchestrator$].bond(props, this);
    chemical[$lastProps$] = props;
    return props;
}
```
Memoization at the child level. If the same props reference arrives, skip reprocessing. Simple, effective.

## Dead code in the orchestrator

- `render()` method — calls `reaction.activate/deactivate/updateIf` which no longer exist on the stripped `$Reaction`. Only `bond(props)` and `view()` are live. The chemical's `$bond$` override calls `bond()` directly.
- `augmentView()` — called from `render().view()`, but `render()` is dead. Currently unused.
- `bindProps()` — called from `bond()`, applies props with `$lastProps$` change detection. Overlaps with `$apply$` on particle. Two prop-application paths for the same purpose.

## Unification opportunity

`augmentView()` walks the view tree and transforms chemistry nodes.
`diff()` walks the view tree and compares nodes.
Both produce the same output pattern: return cached/original reference when nothing changed, new nodes when something did.

Unified walk: one function that transforms AND compares, with particle-aware short-circuiting for untouched chemicals.

## What the orchestrator's render() used to do

```
activate → reactivate → bond → reactivate → view → augmentView → deactivate → updateIf
```

What it needs to do now:

```
bond(props)  → process children, call binding constructor
```

That's it. The view call is in `use()`. The augmentation folds into the diff. The reaction lifecycle is on particle. The orchestrator's role shrinks to: children processing and binding constructor invocation.
