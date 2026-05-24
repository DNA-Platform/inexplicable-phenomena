# SSR Analysis — Framework Internals

**Cathy** (Framework Engineer): Here is my analysis of what happens mechanically when you try to render a chemical on the server. I walked every file in the rendering path. The picture is mixed — some things work cleanly, some are fundamentally blocked.

## What works today

**`view()` is DOM-free.** The base `$Particle.view()` (particle.ts:101) returns `this.toString()`. `$Chemical.view()` (chemical.ts:669) returns `this.children`. Neither touches `document` or `window`. User `view()` methods return JSX — React elements, not DOM nodes. The rendering path through `augment()` (augment.ts:5-46) only walks the React element tree and wraps event handlers. No browser APIs anywhere. This means `renderToString()` can call `view()` without crashing.

**`$apply()` works without hooks.** The prop membrane (particle.ts:149-157) is pure assignment: `this['$' + prop] = props[prop]`. No hooks, no effects, no DOM. Server-side initial render can map JSX props to $-prefixed properties.

**`$Represent` is environment-agnostic.** `$symbolize`/`$literalize` (representation.ts) use `JSON.stringify`/`JSON.parse` with custom replacers. No DOM dependencies. These could serialize chemical state for transfer from server to client.

## What breaks

**`$lift` is hook-dependent.** This is the critical blocker. `$lift` (particle.ts:238-335) is the FC factory — it IS the React component. It calls `useState` (lines 241, 268), `useEffect` (lines 271, 303), and `useLayoutEffect` (line 300). During SSR, `useState` works, but `useEffect` and `useLayoutEffect` do NOT fire. This means:

- **Lifecycle resolution never happens.** `$resolve('mount')` (line 276), `$resolve('layout')` (line 301), `$resolve('effect')` (line 304) — none of these fire on the server. The phase stays at `setup`. Any chemical that relies on `$form()` to set initial state will render with pre-form values.
- **The post-render diff never runs.** The `useEffect` at line 303-310 that calls `augment(p.view(), react)` and `diff()` to detect view changes — skipped. This is fine on the server (no re-renders), but it means the `$viewCache$` is set only from the synchronous path at line 326-327, which does run.
- **Cleanup never fires.** The unmount return at lines 291-298 is irrelevant on the server. No leak risk since the chemical is GC'd with the request.

**Bond formation has cost but no payoff.** `$Molecule.reactivate()` (molecule.ts:36-65) walks the prototype chain via `collectProperties()`, creates `$Bond` instances, and calls `bond.form()`. For reactive fields, `form()` (bond.ts:117-128) calls `activate()` which installs get/set descriptors via `Object.defineProperty` (bond.ts:161-187). The getters call `currentScope()` and `scope.recordRead()`. The setters call `scope.recordWrite()` and `this[$reaction$]?.react()`. On the server, scope tracking is wasted work — there is no scope active during `renderToString`, so `currentScope()` returns null and the read/write recording is a dead branch. The bonds form, the descriptors install, but nothing ever reads the scope data. This is pure overhead. Bonds should be skippable on the server.

**Scope tracking is harmless but unnecessary.** `$Scope` (scope.ts:56-107) is a plain JS class — no DOM, no hooks. `withScope()` (scope.ts:133-143) uses a module-level `$currentScope` variable. If nothing enters a scope on the server, `currentScope()` returns null and all the getter branches short-circuit. The `augment()` function wraps event handlers in `withScope()`, but those handlers never fire during SSR. Safe but pointless.

**CIDs are a mismatch problem.** `$Particle.#nextCid` (particle.ts:160) is a module-level sequential counter starting at 1. The server process and the client process each start their own counter. `$lift` creates derivatives with `$Particle[$$getNextCid$$]()` (particle.ts:249), and `$Reaction.find(cid)` (reaction.ts:64) uses this CID to look up chemicals. During hydration, React will re-run the component function — `$lift`'s FC will call `useState(-1)`, get `-1`, create a new derivative with a NEW CID (not the server's CID). This is actually fine because `$Reaction.find` is client-local — the client never needs to find the server's chemical. But if we ever serialize CIDs into the HTML for identification, they will not match.

## The hydration question

During `hydrateRoot`, React re-runs component functions but reuses existing DOM. When `$lift`'s FC runs on the client:

1. `useState(-1)` returns `-1` (first mount).
2. A new derivative is created via `Object.create(parent)` with a fresh CID.
3. `$apply(props)` maps JSX props to $-prefixed properties.
4. `view()` runs and must produce HTML that matches the server's output.

This will work IF the chemical's `view()` is a pure function of its props. If `view()` depends on state set by `$form()` (which runs in `useEffect`, so it did not run on the server either), both server and client skip it — they match. But if a chemical sets state in its constructor (lines 662-667 of chemical.ts), that state exists on both sides and the views match.

The real risk is chemicals that call `$form()` and render differently based on its result. On the server, `$form` never runs, so the initial render uses defaults. On the client, `$form` runs after mount via `useEffect`, triggers a re-render, and the UI updates. This is the standard React pattern for data fetching — the flash is expected. But if someone puts synchronous initialization in `$form` expecting it to be reflected in the first render, they will get a hydration mismatch.

## Recommendation

The machinery is closer to SSR-ready than I expected. The two real work items from the internals perspective are: (1) a server-mode flag that skips bond formation and scope tracking to eliminate wasted work, and (2) a strategy for `$form()` — either make it run synchronously on the server (which means awaiting promises before `renderToString` returns), or document clearly that `$form` is client-only and initial render must work without it.
