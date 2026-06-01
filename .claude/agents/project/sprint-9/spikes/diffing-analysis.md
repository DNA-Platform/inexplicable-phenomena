# Diffing Analysis: What Changes and What Survives

## The current state tracking system

The v1 approach: intercept every property read and write to track what changed.

```
$Bond.describe() → Object.defineProperty(chemical, property, { get: bondGet, set: bondSet })
  bondGet() → record read in reaction.state
  bondSet() → store value, record in state, propagate to child bonds
  Bond.update() → reaction.activate/deactivate/updateIf
    $State.changed() → compare JSON snapshots
      → setState({}) → React re-renders
```

This is ~500 lines of interception machinery whose only job is answering: "did anything change since the last render?"

## The diffing approach

Replace property-level tracking with view-level comparison.

```
Method called on chemical (increment, handleClick, etc.)
  → $Bonding intercepts the call (already does this)
  → After method returns, schedule a diff check
  → Call view() on the chemical
  → Compare output to last rendered output
  → If different, call $update$({}) → React re-renders
```

Properties become plain properties. No interception. The ONLY interception is on methods — and $Bonding already wraps methods. The change is: instead of methods triggering state recording, they trigger view diffing.

## What the diff check looks like

The view returns ReactNode. Two ReactNodes can be compared:
- Shallow: same type, same props keys, same primitive prop values
- Deep: recursive comparison of children

React already does this in its reconciler. But React does it AFTER we trigger a re-render. The question is: can we do a fast pre-check to AVOID triggering unnecessary re-renders?

Option 1: Always re-render after method call. Let React diff the DOM. Simple but wasteful — methods that don't change visible state still trigger React work.

Option 2: Diff the ReactNode output. Call view(), compare to cached last output. Only trigger React if different. Requires a ReactNode comparator.

Option 3: Diff a serialization. Call view(), serialize to string (renderToStaticMarkup), compare strings. Expensive but simple.

Doug's direction: "super-fast diffing algorithm — reuse and improve React DOM enumeration logic." This points to Option 2 — a custom ReactNode comparator that walks the virtual DOM tree.

## What survives the refactor

| Concept | Survives | Form |
|---------|----------|------|
| $Bond — structural metadata | Yes | Fields: isField, isProp, isMethod, property name, descriptor |
| $Bonding — method wrapping | Yes, modified | Wraps methods, schedules diff after call |
| $Molecule — bond collection | Yes, simplified | Walks properties, creates metadata bonds, no interception |
| formula() / read() | Yes | Serializes/deserializes bond metadata |
| $Reflection — reactive/inert | Simplified | Marks serializable properties, not interception gates |
| $BondOrchestrator — children processing | Yes | Unchanged — binding constructors still work |
| replaceIf — catalyst correction | Transformed | Moves to bond phase or explicit check |

## What dies

| Concept | Why |
|---------|-----|
| $Bond.describe() — Object.defineProperty | No property interception |
| bondGet() / bondSet() | No property interception |
| $Bond.update() — state recording | No state tracking |
| $State class | No snapshot comparison |
| $Reaction.activate() / deactivate() / updateIf() | No state tracking lifecycle |
| $Reflection.isReactive() gating for interception | No interception to gate |

## Open design questions

1. **The ReactNode comparator.** How do you efficiently compare two ReactNode trees? React elements are plain objects: `{ type, props, key }`. Props contain children (nested elements). A recursive walk with early termination on first difference could be fast.

2. **When to diff.** After every method call? After a microtask batch? The timing affects performance vs responsiveness. Method calls that happen in sequence (e.g., `this.a = 1; this.b = 2; this.c = 3` inside a method) should produce ONE diff check, not three.

3. **replaceIf without property interception.** Catalyst correction currently happens inside bondGet/bondSet. Without those, when does it happen? During the $bond$ phase? During view rendering? This needs careful thought.

4. **@inert() decorator.** Currently used to mark properties that should NOT be intercepted. If nothing is intercepted, is @inert() still needed? It might still mark "not serializable" for formula().

5. **$Bonding async handling.** Async methods return promises. When the promise resolves, the result needs to trigger a diff. Currently $Bonding.handleAsync() chains onto the promise and calls update(). The diffing version would chain and schedule a diff check.

## The simplification

The current bond system: ~600 lines ($Molecule 140 + $Bond 250 + $Bonding 140 + $State 45 + parts of $Reaction).

After diffing: $Bond becomes ~50 lines of structural metadata. $Bonding becomes ~80 lines of method wrapping + diff scheduling. $Molecule.reactivate() becomes ~60 lines of property walking. $State and the tracking parts of $Reaction are deleted.

Estimated: ~600 lines → ~200 lines. The complexity reduction is real.
