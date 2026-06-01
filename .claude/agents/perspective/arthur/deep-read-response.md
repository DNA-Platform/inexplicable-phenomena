# Arthur's Response to Cathy's Deep Read

## On the update storage difference

Cathy noted: old stores update on REACTION, new stores on CHEMICAL directly.

I think this matters more than Cathy suggests. The reaction system was designed so that a CATALYST (root of a component tree) could coordinate re-renders across its subtree. When a child chemical's method fired, the reaction's `updateIf` would compare the child's state, but the `_update` function belonged to the child's specific mount — not the catalyst's.

In our system, `$update$` is on the chemical. If a chemical is rendered in multiple places (Doug's multi-render scenario), each mount writes its own `$update$` to the SAME chemical. Last mount wins. Previous mounts lose their re-render trigger. This is the SAME bug we identified earlier — but storing on the reaction didn't have this problem because each mount created its own reaction via `$Component$.createChemical` → `new $Reaction(chemical)`.

**Action needed:** For multi-render, we need per-mount update functions. The broadcast pattern (Set of update functions) solves this. Or — restore per-mount reactions.

## On the effect dependencies

Cathy says no deps is "correct for our model." I'm not sure. The old code used `[chemical, token]` so effects only re-ran when:
- The chemical changed (new instance on first render)
- The token changed (re-render triggered by `reaction.update()`)

Our effects run on EVERY render including parent-triggered re-renders where nothing in THIS chemical changed. That's extra work. It means `$resolve$('layout')` and `$resolve$('effect')` fire even when the parent re-rendered and this child was unchanged.

Is that a problem? The phase queues are usually empty (nobody is awaiting). Draining an empty queue is a no-op. But it's wasteful and it means the phase tracking (`$phase$`) advances through layout/effect on every parent re-render.

**Potential issue:** If a chemical is awaiting `next('effect')` and a PARENT re-renders (nothing changed in this chemical), the effect hook fires, `$resolve$('effect')` drains the queue, and the awaiting promise resolves — even though the chemical itself didn't update. Is that correct? The component author said "await the next effect" — should that mean "MY next effect" or "any render cycle's effect"?

**Decision needed:** This is a semantic question for Doug.

## On replaceIf

Cathy's right that the orchestrator's processElement already calls `$bind(parent)`. But there's a subtlety: the old `replaceIf` ran on EVERY bond get/set, not just during orchestrator processing. That means it caught cases where a chemical was assigned to a property AFTER the initial binding — e.g., `this.card = someOtherCard` in a method. The orchestrator only processes children at render time. Mid-lifecycle property assignments don't go through the orchestrator.

With our simplified bonds (no get/set interception), mid-lifecycle property assignments are just plain JavaScript property writes. No catalyst check. No rebinding. If someone writes `this.dependency = chemicalFromAnotherTree`, the dependency is NOT rebound. It keeps its original catalyst.

**Is this a real scenario?** Yes — Doug's legacy test app has `$DataChemical` tests where chemicals are assigned to fields and then checked for catalyst correction. The member-tests.tsx file explicitly tests this.

**Decision:** This is a real gap. We need either bond interception for chemical-valued properties or a different mechanism to detect cross-catalyst assignment.

## On async handling

Cathy says promise cancellation is "not a framework-correctness issue." I disagree. Consider:

```typescript
class $Search extends $Chemical {
    results: string[] = [];
    async search(query: string) {
        const data = await fetch(`/api/search?q=${query}`);
        this.results = await data.json();
    }
}
```

User types "a", "ab", "abc" rapidly. Three fetch calls. Without cancellation, the results could arrive in any order. The last to arrive wins, which might be "a" (if the server was slower for single-character queries). The view shows wrong results.

The old code's `$promise.cancel()` handled this — when a new async call started, it cancelled the previous one. The `.then()` handler checked `this._lastSeenActive !== $action` and bailed if the promise was superseded.

This IS a framework-correctness issue for async methods. Users expect the last call to win deterministically, not the last response.

**Decision:** Promise cancellation needs to come back. Not in this sprint — but it must be prioritized.

## Summary of gaps

| Gap | Severity | Sprint |
|-----|----------|--------|
| Multi-render: per-mount update functions | HIGH | Next sprint |
| replaceIf: catalyst correction for property assignments | HIGH | Next sprint |
| Async: promise cancellation for rapid calls | MEDIUM | Future sprint |
| Effect deps: phase resolution on parent re-render | LOW | Needs Doug's input |
| $lastProps memoization in orchestrator | LOW | Performance optimization |
