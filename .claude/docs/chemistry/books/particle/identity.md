---
kind: concept
title: Identity — cid, symbol, type, template, reactive carriers
status: stable
---

# Identity

Before a particle is reactive, before it has phases, before it can be rendered — it has *identity*. The fields stamped at construction let the framework refer to a particle uniquely, print it, recover its class from a string, distinguish a template from a derivative, and reach the reactive machinery the particle carries.

In sprint-27 (Crystallization), the reactive-carrier slots and the template-tracking surface moved down from `$Chemical` to `$Particle`. Identity now spans three layers: the **printable** layer (cid, symbol, type), the **template** layer (template pointer, `$$template$$` static, `$isTemplate$` / `$derived$` predicates), and the **reactive-carrier** layer (`$molecule$`, `$reaction$`, `$component$`). All three are present on every particle from the moment its constructor returns.

## The three printable fields

Every particle owns three identity fields, declared at the top of the [`$Particle` class body][particle-class-decl]:

- **`[$cid$]`** — a numeric chemical id. Allocated from a static counter (`$Particle[$$getNextCid$$]()`), monotonically increasing across the entire process. The cid is the only piece of identity that is *guaranteed unique*; everything else derives from it.
- **`[$type$]`** — a back-reference to the particle's constructor (`this.constructor`). Cheap to access, used wherever the framework needs the runtime class without a `Object.getPrototypeOf().constructor` walk. The type tag is also what `$Chemical` uses for its "look up bond ctor by class name" pattern (sprint-26 finding: `chemical[chemical[$type$].name]`).
- **`[$symbol$]`** — a printable string of the form `$Chemistry.{ClassName}[{cid}]`. Built at construction time by [`$Particle[$$createSymbol$$]`][create-symbol] from the type and the cid. This is what `toString()` returns; it is also how a chemical is recognized when its identity is serialized.

These three pieces of identity are bound together: the symbol is derived from cid and type, and a stored cid can be parsed back out of any symbol string via [`$Particle[$$parseCid$$]`][parse-cid].

## Template identity

A particle is either a **template** (the canonical instance for its class) or a **derivative** (an `Object.create(template)` produced by [`$lift`][lift] or by `$Chemical`'s synthesis path). Every particle carries the slots that distinguish the two:

- **`[$template$]`** — a self-reference that, on a derivative, *resolves through the prototype chain* to the template. A naturally-constructed particle sets `this[$template$] = this`; a derivative built by `Object.create(parent)` inherits the slot from the parent and so reads the parent. This is the primary "where do I look for shared state?" pointer.
- **`[$$template$$]`** — a *static* slot on the constructor itself. The first naturally-constructed instance of a class registers itself there: `cls[$$template$$] = this`. Subsequent constructions check whether the existing template is *of this exact class* (handles subclass cases where an ancestor's template was registered first) and overwrite if not. This is what `$()` dispatch consults to find "the template instance" without constructing a new one.
- **`get [$isTemplate$]`** — a getter that compares `this == this[$type$][$$template$$]`. True when this instance is the registered template for its class.
- **`get [$derived$]`** — the inverse-shaped predicate: `this !== this[$template$]`. True when this instance is a derivative produced by lifting or chemical-synthesis. Distinct from `!$isTemplate$` because the template *itself* satisfies `$isTemplate$ === true` and `$derived$ === false` simultaneously, but a freshly-constructed second instance of a class (which is its own template by the class-check above) satisfies neither cleanly — `$derived$` is the rigorous test for "I came from `Object.create`."

The template slots used to live on `$Chemical`. As of sprint-27 they belong to `$Particle`: every particle, whether or not it ever participates in synthesis, can answer "am I a template?" and "am I a derivative?" The same machinery now backs `$()` dispatch, `$lift`'s prototype-parent walk, and the molecule's stop-at-template prototype walk.

## Reactive-carrier slots

Every particle carries three reactive-machinery slots, allocated in the constructor:

- **`[$molecule$]`** — the particle's `$Molecule`, the bond graph that records reads, installs accessors, and propagates writes. Allocated unconditionally at construction (see [lifecycle][]).
- **`[$reaction$]`** — the particle's `$Reaction`, its single re-render entry point. Allocated unconditionally at construction. `$Chemical` rewires this when joining a catalyst graph; `$lift` allocates a fresh one per derivative.
- **`[$component$]`** — a cache for the React FC that renders this particle. Populated lazily by the `Component` getter on first access; subsequent reads return the cached value. The getter is the first reactive-carrier surface a user actually touches: `instance.Component` is what JSX consumers mount.

These slots used to be `$Chemical`-only. Their migration is the central change of sprint-27: a `$Particle` is now a fully-reactive carrier in its own right, and `$Chemical` adds composition (children, synthesis, catalyst graph) on top of an already-reactive base. See [lifecycle][] for the construction sequence that allocates them, and the caveat [particle allocates reactivity machinery][caveat-allocates] for the subtle behavior change this introduces.

## The marker

Identity also carries a structural field — the `$particleMarker$` symbol, stamped at module load on `$Particle.prototype`:

```typescript
($Particle.prototype as any)[$particleMarker$] = true;
```

Every naturally-constructed particle inherits the marker through the prototype chain. Particularized carriers (see [particularization][]) have the marker copied as an *own property* during construction because their prototype chain is severed to a foreign object. The [`isParticle(x)`][is-particle] predicate is the supported test for "is this a particle?" — `instanceof $Particle` is unreliable for particularized carriers because their prototype no longer points at `$Particle`.

`isParticle` is intentionally cheap: a null check, a type check, and a property lookup. No prototype-chain walk, no symbol scanning. Constructor code paths use it as a fast-path check for "did I receive an already-particularized object?" before doing any work.

## Allocation

The cid counter is a private static field on `$Particle`:

```typescript
static [$$getNextCid$$](): number { return $Particle.#nextCid++; }
static #nextCid = 1;
```

Cids start at 1 (not 0) so a falsy check distinguishes "no cid assigned" from "cid #0." The counter is module-singleton — shared across all subclasses, all particularized carriers, all `$lift`-produced derivatives. A derivative produced by `$lift` allocates its own fresh cid, separate from its parent's; this is what makes cross-site derivatives addressable independently.

The symbol-creation static is also exposed for derivatives, which need to produce a fresh symbol after they get their own cid:

```typescript
p[$cid$] = $Particle[$$getNextCid$$]();
p[$symbol$] = $Particle[$$createSymbol$$](p);
```

(See [lift][] for the full derivation flow.)

## Recovering identity from a string

Identity round-trips through the symbol. The pattern is fixed: `$Chemistry.{ClassName}[{cid}]`, anchored by a regex at the bottom of the class. [`$Particle[$$isSymbol$$]`][is-symbol] is the cheap prefix check; [`$Particle[$$parseCid$$]`][parse-cid] runs the regex and pulls the cid number out.

Recovery exists because chemical references can leak into places that only carry strings — error messages, log lines, debugger labels, serialized state. Given the symbol, the framework can locate the live instance via the reaction registry's cid lookup (`$Reaction.find(cid)`), used in [lift][]'s re-entry path when React re-runs a Component.

## See also

- See [particularization][] for why the marker has to be copied as an own property on particularized carriers.
- See [lifecycle][] for what happens to identity across phase transitions (it is stamped once and never changes; phases churn around it).
- See [lift][] for how derivatives get their own identity while inheriting state from a prototype parent.
- The [chemistry glossary][glossary] indexes every identity field by name.

<!-- citations -->
[particularization]: ./particularization.md
[lifecycle]: ./lifecycle.md
[lift]: ./lift.md
[glossary]: ../../glossary.md
[caveat-allocates]: ../../caveats/particle-allocates-reactivity-machinery.md

[particle-class-decl]: ../../../../../library/chemistry/src/abstraction/particle.ts#L25
[is-particle]: ../../../../../library/chemistry/src/abstraction/particle.ts#L21
[create-symbol]: ../../../../../library/chemistry/src/abstraction/particle.ts#L159
[is-symbol]: ../../../../../library/chemistry/src/abstraction/particle.ts#L164
[parse-cid]: ../../../../../library/chemistry/src/abstraction/particle.ts#L168
[template-slot]: ../../../../../library/chemistry/src/abstraction/particle.ts#L37
[is-template-getter]: ../../../../../library/chemistry/src/abstraction/particle.ts#L42
[derived-getter]: ../../../../../library/chemistry/src/abstraction/particle.ts#L43
[component-getter]: ../../../../../library/chemistry/src/abstraction/particle.ts#L54
[molecule-slot]: ../../../../../library/chemistry/src/abstraction/particle.ts#L36
[reaction-slot]: ../../../../../library/chemistry/src/abstraction/particle.ts#L35
