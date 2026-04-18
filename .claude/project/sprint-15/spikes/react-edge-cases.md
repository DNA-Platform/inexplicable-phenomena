# React Edge Cases for $Chemistry

Research from React docs, source code, and framework author discussions.

## 1. Strict Mode Double Rendering

**Source:** [React StrictMode docs](https://react.dev/reference/react/StrictMode)

React Strict Mode double-invokes: render functions, effect setup+cleanup, and ref callbacks. This is development-only.

**Impact on $Chemistry:**
- Our FC is called twice per mount. The `useRef` pattern handles this — ref persists.
- BUT: if `$Bonding` wraps a method that fires during render (e.g., a getter computed in the view), `$update$` is called during render → infinite loop.
- Our guard: `chemical[$phase$] !== 'setup'`. First render: phase is 'setup', guard prevents `$update$`. After mount effect: phase advances. Second render in strict mode: phase may have advanced → guard fails → potential loop.

**Action needed:** Test strict mode double-render explicitly. Verify the phase guard works for ALL strict mode scenarios.

## 2. Concurrent Mode Render Interruption

**Source:** [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)

Concurrent mode can pause, abort, or restart renders. Renders are NOT guaranteed to commit.

**Impact on $Chemistry:**
- Our `useRef` initialization creates an instance via `Object.create` during render.
- The `$Reaction` constructor registers the instance in a static map.
- If the render is discarded, the instance leaks in the static map.
- Effects don't run for discarded renders, so cleanup never fires.

**Action needed:** Move instance registration from render to mount effect. Or eliminate the static map entirely (see key elimination).

## 3. Keys and Fiber Reuse

**Source:** [React Reconciliation](https://legacy.reactjs.org/docs/reconciliation.html)

"The type and key of a fiber serve the same purpose as they do for React elements." Keys determine whether a fiber can be REUSED across renders.

**Impact on $Chemistry:**
- Without keys, React reconciles by position. Reordering destroys and recreates components.
- With keys, React moves fibers. State is preserved.
- Our `$List` fragment auto-keys children. This is ESSENTIAL for any list that can change order.
- For fixed-structure views, keys are optional but harmless.

**Action needed:** Implement `$List` with CID-based keys. Test reordering behavior.

## 4. setState During Render

**Source:** [React setState during render](https://github.com/facebook/react/issues/5591)

Calling setState during render triggers an immediate re-render. React limits the count (usually 25) to prevent infinite loops.

**Impact on $Chemistry:**
- `$Bonding` wraps methods and calls `$update$({})` after execution.
- If a bonded method is called DURING render (e.g., a computed property getter that the view accesses), `$update$` fires during render → immediate re-render → possible loop.
- We excluded `view` and `toString` from bonding. But what about OTHER methods called from the view? Computed getters? Helpers?

**Action needed:** Audit which methods can be called during render. Either exclude them from bonding or defer `$update$` to after render completes (queueMicrotask).

## 5. Effect Ordering

**Source:** [React StrictMode](https://react.dev/reference/react/StrictMode)

Effects in Strict Mode: setup → cleanup → setup. Parent effects run after child effects. Layout effects run before regular effects.

**Impact on $Chemistry:**
- Our lifecycle: mount (useEffect, []) → layout (useLayoutEffect) → effect (useEffect)
- In strict mode: mount → unmount → mount → layout → effect
- Does the second `$resolve$('mount')` resolve promises from the first?
- Our phase queues drain on resolve. If mount fires twice, the queue drains on first fire. Second fire has nothing to drain. Promises from the first fire are already resolved.

**Action needed:** Test lifecycle phase resolution in strict mode. Verify `next('mount')` resolves correctly when mount fires twice.

## 6. cloneElement and Key Injection

**Source:** React API docs

`React.cloneElement` creates a new element with merged props. Elements are frozen — cannot be modified in place. cloneElement is the only way to inject keys post-creation.

**Impact on $Chemistry:**
- Auto-key injection requires cloneElement for every chemistry element.
- One allocation per element per render.
- For the `$List` pattern, keys are injected in `$List.view()` — only for list items, not all elements.

**Action needed:** Implement key injection in `$List.view()`. Verify React uses the keys for fiber reuse during reorder.

## 7. Multiple Renders of Same Component Function

**Source:** React reconciliation algorithm

If the SAME function reference appears in multiple positions, React creates separate fibers for each. Each fiber has its own state (hooks). The function is shared, the state is not.

**Impact on $Chemistry:**
- `.Component` returns the same FC for all mounts. Each mount gets independent hooks state.
- `$lift(chemical)` captures one chemical but may be mounted multiple times.
- Each mount needs its own shadow for prop independence.

**Action needed:** Implement prototypal shadows in `$lift`. Test multi-mount with different props.

## Summary of Bugs Found

1. **Concurrent mode memory leak:** Instance registered in static map during render, never cleaned up if render is discarded.
2. **Potential setState-during-render loop:** Bonded methods called from view (computed getters) trigger `$update$` during render.
3. **Strict mode double-mount:** Phase queues may not handle mount → unmount → mount correctly.
4. **Multi-render prop clobbering:** `$lift` captures one instance, multiple mounts all write to it.

## Summary of Framework Design Questions

1. Should `$Bonding` defer `$update$` to a microtask instead of calling synchronously?
2. Should the static chemicals map be eliminated entirely?
3. Should `$List` be the only way to render arrays of chemicals?
4. Should shadows be created in `$lift`, in the orchestrator, or in a new mechanism?
