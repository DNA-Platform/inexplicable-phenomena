# I-8: The $Component$ Lifecycle Bridge

Traced 2026-04-08. Findings from code reading.

## How React hooks drive lifecycle phases

Three React hooks in `$Component$` create the bridge:

| React hook | Phase | Fires when |
|-----------|-------|-----------|
| `useEffect([], [chemical])` | mount, unmount | Once on enter, cleanup on leave |
| `useLayoutEffect([], [chemical, token])` | layout | Every render, sync before paint |
| `useEffect([], [chemical, token])` | effect | Every render, async after paint |

Each calls `reaction.resolve(phase)`, which drains the callback queue for that phase.

## The async await mechanism

The lifecycle methods (`mount()`, `layout()`, `effect()`, `unmount()`) on `$Reaction` create promises:

```
component author calls:  await this.mount()
  → $Reaction.mount() creates a $promise
  → pushes resolve callback onto this._mount queue
  → returns the promise (component author is now awaiting)

React fires useEffect:
  → reaction.resolve('mount')
  → drains _mount queue: calls resolve()
  → promise resolves
  → component author's async function continues
```

This maps linear async code onto React's hook lifecycle. The component author writes `await this.mount()` and it reads as "wait until I'm mounted." No callbacks, no dependency arrays.

## Phase state machine

`$Reaction.resolve()` tracks the current phase via `this._phase`:
- `setup` → initial state
- `mount` → immediately transitions to `effect` (line 128-129)
- `render` → during view call
- `layout` → after DOM mutations, before paint
- `effect` → after paint
- `unmount` → cleanup

The `_renderCount` tracks how many times the component has rendered. `_updateScheduled` prevents double-updates.

## Smart resolution

Each async method has phase-aware logic:
- `mount()`: if already past mount and in effect phase with renderCount == 1, resolves immediately. If not yet mounted, waits for effect. Otherwise rejects.
- `layout()`: if already in layout, resolves immediately. If in effect, waits for next cycle. Otherwise pushes onto queue.
- `effect()`: if already in effect, resolves immediately. Otherwise pushes onto queue.
- `unmount()`: if already unmounting, resolves immediately. Otherwise pushes onto queue.

This means `await this.mount()` works whether called before or after the mount has occurred — it's not just a one-shot event, it's a phase query.

## The two-check unmount (strict mode)

React strict mode mounts, unmounts, and remounts components in development. The code handles this:

```typescript
if (!chemical[$remove$]) chemical[$remove$] = true;     // first unmount: flag it
else if (!chemical[$destroyed$]) chemical[$destroy$]();  // second unmount: destroy
```

First unmount sets `$remove` flag. Second unmount (the real one, after strict mode's re-mount and final unmount) actually destroys.

## The update trigger

`reaction.bind(update)` stores React's `useState` setter. When `reaction.update()` fires, it calls `this._update!({})` — passing an empty object to force React to re-render. This is the ONE place React hooks are used for state: a dummy `useState({})` whose sole purpose is triggering re-renders.

## What moves to $Particle (for sprint 8)

The lifecycle mechanism (phase queues, resolve, async awaiting) moves to $Particle. The new API: `await this.await('mount')` with a string enum.

What stays chemical-only:
- Templating (the `createChemical` / `Object.create(template)` pattern)
- Binding constructor invocation
- The orchestrator pipeline

What needs design:
- How does the particle produce the React FC? `use()` currently does this but doesn't include hooks.
- Where do the three React hooks live? Inside the function that `use()` returns?
- The `$Reaction` class or equivalent — does it stay as-is, move to particle, or simplify?

## Insight: the lifecycle IS the particle

Doug said lifecycle goes on particle because it's "essential to making a react component." The particle isn't just identity + view — it's identity + view + lifecycle. A particle can await its own mount. That makes it a full React citizen even without bonds, templates, or binding constructors.

This redefines what a particle IS: not "the smallest renderable thing" but "the smallest thing that lives in React." It has birth (mount), existence (layout, effect), and death (unmount). It has a heartbeat.
