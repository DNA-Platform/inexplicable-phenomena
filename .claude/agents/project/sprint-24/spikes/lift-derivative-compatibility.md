# SP-1: $lift Derivative Compatibility & Prototype-Mutation Audit

**Owner:** Cathy
**Status:** COMPLETE
**Date:** 2026-04-28

## Question

The sprint plan asked: "When bond accessors are own properties of the parent instance (not the prototype), do `$lift`-created derivatives still find them via prototype lookup, and does `$derivatives$` fan-out still propagate writes correctly?"

I expanded the spike's first move into an audit of the *current* state, because the planning conversation assumed accessors are installed on the class prototype today and several agents (myself included) repeated that assumption. Before designing a refactor, I wanted to verify the premise.

## Finding (counter-intuitive — read carefully)

**The current architecture already installs reactive accessors on the instance, not on the class prototype.** There is no prototype mutation to remove. Doug's instinct ("we shouldn't change the prototype") was correct as a principle, but the concern as stated ("bond accessors are installed on the prototype") does not match the code.

### Evidence — code path

`installReactiveAccessor` (`src/abstraction/bond.ts:161`) is the only function in the framework that calls `Object.defineProperty` to install a get/set accessor for a reactive bond. It is called exactly once, from `$Bond.form()` (`src/abstraction/bond.ts:126`), with `target = this._chemical`.

`this._chemical` is set from the bond's constructor (`src/abstraction/bond.ts:111-116`), which in turn is given `chemical` from `$Bond.create(chemical, property, descriptor)` in `$Molecule._reactivate` (`src/abstraction/molecule.ts:54`). At that call site, `chemical = this._chemical`, the molecule's owning instance — not the prototype.

The molecule itself is constructed in `$Chemical`'s constructor: `this[$molecule$] = new $Molecule(this)` (`src/abstraction/chemical.ts:617`). `this` is the instance, so `_chemical` is always the instance.

There is no other call to `Object.defineProperty(prototype, ...)` in `src/abstraction/`. (Confirmed via grep: `defineProperty\(.*prototype`, `defineProperty\(prototype`, `defineProperty\(proto` — zero matches.)

### Evidence — runtime test

`tests/spikes/sp1-prototype-mutation.test.tsx` (3 tests, all passing on current `main`):

1. After `new $Foo() → render(<C />)`, the set of own property names + symbols on `$Foo.prototype` is unchanged from before construction. No `$count` accessor on the prototype.
2. The accessor is present as an *own* property on the instance, with `get` and `set` functions defined.
3. Two separate `new $Foo()` instances do not share state through any prototype-level structure: writing `a.$count = 7` does not change `b.$count`.

### Why the misconception persisted

When Doug raised "bond accessors on the prototype" he was extrapolating from older versions of the framework or from how reactive systems often work elsewhere (Vue 2, MobX-with-decorators), where the canonical pattern *is* prototype-level. The current chemistry implementation diverged from that pattern at some earlier point — likely sprint-18 or sprint-19's reactivity rebuild — without anyone explicitly noting "accessors moved to instance level" in durable docs. This is a clear signal for Track B (Libby): the reactivity reference page must call out *where accessors live* prominently.

## Derivative compatibility

The original SP-1 question is now hypothetical (since the current architecture already does what the refactor would have produced), but the answer is documented for the reactive-bonds doc:

`$lift` creates a derivative `D = Object.create(parent)`. `parent` already has the accessor as an own property. `D.$count` lookup finds the accessor on `parent` via prototype lookup and invokes it with `this = D`. The accessor's setter calls `ensureBacking(this)`, which gives `D` its own `[$backing$]` chained from `parent[$backing$]`. Subsequent reads on `D` see `D`'s own backing; reads on `parent` (or sibling derivatives) see `parent`'s backing. The `$derivatives$` registry on `parent` is walked unconditionally on parent writes (via `fanOutToDerivatives`) — this drives sibling re-renders.

Lexical scoping is preserved by the prototype-based backing chain, not by the accessor placement.

## Decision

**Track A's scope collapses.** There is no refactor to do. The remaining work is:

1. **Pin the invariant.** Promote the SP-1 spike test to the regression suite (Queenie's A-1 work). The test asserts: after any chemical instantiation + render, the class prototype's own keys (names + symbols) are unchanged from before. Any future code that reintroduces prototype mutation will fail this test loudly.
2. **Document the architecture.** Libby's L-3 reactive-bonds page must state explicitly: *accessors are installed on the instance, never on the prototype. Class objects are inert definitions.*
3. **Cancel A-2, A-3, A-4, A-5.** No bond-spec extraction, no per-instance stamping, no prototype-mutation removal — none of it is needed because the architecture is already what we wanted.

Recommend Doug review this finding before we close out Track A.

## Files

- `tests/spikes/sp1-prototype-mutation.test.tsx` — three tests, all green on current `main`. Will be promoted to `tests/regression/` as part of A-1.
- `src/abstraction/bond.ts:161` — `installReactiveAccessor` definition, target = instance.
- `src/abstraction/bond.ts:126` — only call site, passes `this._chemical` (instance).
- `src/abstraction/molecule.ts:54` — bond creation, `chemical` = instance.
