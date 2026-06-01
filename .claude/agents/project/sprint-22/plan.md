# Sprint-22 — Lexical Scoping & The Beautiful API

## Goal

Make multi-site use of chemicals correct and natural. Today, handing a chemical reference around and mounting it at two sites collides — both Component invocations write to the same instance. The fix introduces *lexical scoping* via prototype-chain derivatives, and replaces `.Component` with a smaller, more elegant API surface anchored on `$`.

## Pre-work (already landed in this sprint)

- `$Bonding` → `$Reagent`, `$Parent` dropped, `@books` → `@specimens` alias fix. Commit `13b4a0d`.

## The mental model

### What `$Particle` and `$Chemical` mean now

Today, `$Particle` is broken: it has lifecycle + identity but no bonds, so its `$apply(props)` does plain assignments and multi-site renders collide. We're fixing this by clarifying what each layer is *for*:

> **`$Particle` = a *leaf* renderable. State via props or programmatic mutation. No children. JSX shape: `<Particle />` self-closing.**
>
> **`$Chemical extends $Particle` = a *container* renderable. Adds the bond constructor — typed JSX children parsed into args via the named-after-the-class method. JSX shape: `<Chemical>...</Chemical>`.**

`$Particle` owns: bonds, reactivity, lifecycle, lexical scoping, identity, derivatives registry. **No `$children$` field, no children prop on the generated Component.** Use cases: simple components, programmatic state wrappers, framework internals like `$Function$` and `$Html$`, the `particular?: object` "make any object renderable" pattern (see below).

`$Chemical` owns: `$BondOrchestrator`, `$ParamValidation`, the named bond-constructor method, `$Include`, parent/catalyst graph. The bond constructor is the *only* path raw JSX children take into a chemical — they become typed args, never a stored `this.children` field. Reading raw children directly from a chemical instance is also gone; if you want children, you declare their shape in the bond ctor.

### Particularization (the `particular?: object` pattern, fixed)

Today `new $Particle(plainObject)` does `Object.setPrototypeOf(plainObject, particle)`, replacing the object's prototype entirely — `error instanceof Error` becomes false. Lost identity.

The fix: insert the particle-mixin *between* the object and its original prototype:

```
Before:  error → Error.prototype → Object.prototype
After:   error → mixin → Error.prototype → Object.prototype
```

`mixin` is a fresh object whose prototype is the user's original prototype, with particle methods copied onto it as own properties (because the chain no longer goes through `$Particle.prototype`). It owns its own `$cid$`, `$symbol$`, `$phases$`, etc.

Trade-offs:
- `error instanceof Error` survives ✓
- `error.message` resolves to `Error.prototype.message` ✓
- `error.view` resolves to mixin.view ✓
- `error instanceof $Particle` is *false*; we expose `isParticle(x)` (Symbol-marker check) as the supported test
- Methods are copied at particularize-time, so post-hoc subclass mutation doesn't propagate

Use case: `class $Exception extends $Particle { view() { ... } }` then `new $Exception(myError)` returns `myError` itself — same identity, now renderable.

### The lexical scoping rules — agreed design

Lexical scoping is a problem for *anything renderable*. Lives at `$Particle`. Resolved into the following design (from the team discussion):

1. **Bonds are installed once on the parent's prototype.** Setter/getter live there. Derivatives inherit the accessors via the prototype chain — no per-derivative re-installation.
2. **Each chemical/particle has its OWN lazy `$backing$`.** Reads cascade through the prototype chain (derivative → parent → grandparent...). Writes land on the local backing (creating it via `ensureBacking` if needed). Shadowing is automatic.
3. **Each parent tracks its derivatives** via a `[$derivatives$]` symbol — a `Set` of live derivative instances. Lazily created.
4. **Bond setter on parent fans out unconditionally.** After writing its own backing, walk `this[$derivatives$]` and fire `react()` on every derivative — *no shadowing check at fan-out time*. Shadowing is dynamic (writes/deletes/prop-omission can shift it across renders), so trying to gate fan-out on shadowing tracks a moving target. Just propagate; React's reconciler will short-circuit if the view diff is empty.
5. **Bond setter on derivative is local.** Writes own backing, fires own `react()`. Does NOT fan up to parent. Children writes don't push up.
6. **Chains compose.** A derivative can ITSELF be a parent (have its own `[$derivatives$]`). Three-level chains fan out the same way: parent writes wake direct children → those children's setters fire their own derivatives → propagation continues.
7. **Each derivative gets fresh identity** — new `$cid$`, `$symbol$`, `$reaction$`, `$update$`, `$phases$`, `$phase$`. Inherits `$molecule$` and `$orchestrator$` from parent (bond schema is parent-defined).
8. **Cleanup:** derivative removes itself from parent's `[$derivatives$]` on `$destroy$` / React unmount. Bounded growth.
9. **`$lift` is the per-site derivation entry point.** Creates `Object.create(parent)` on first render at each React site, wires identity, registers with parent, sets up React `useState` to hold the cid. Skips bond ctor (passing instance through `$()` is a *reuse*, not a re-construction).

**Original (template):** the canonical user-constructed instance. No parent → no inherited reads. All bonds resolve to its own backing. Has its own `[$derivatives$]` set as derivatives are created via `$lift`.

**Read shadowing semantics** (just to be explicit):
```
derivative.$x                 → installed getter → reads this[$backing$]?.[$x]
                                this[$backing$] cascades via prototype → parent's backing if no own
derivative.$x = 'A'            → installed setter → ensureBacking(this) → this[$backing$].$x = 'A'
                                derivative now has own $backing with own $x
derivative.$x                 → reads this[$backing$].$x → 'A' (own value, parent shadowed)
delete derivative[$backing$].$x → derivative re-inherits parent's value
```

## API surface

Replace `.Component` with three callable forms:

```typescript
chemical.view              // identity-preserving Component, no props.
                           // Mounting at two sites → same instance, shared state.

$(chemical)                // $$Component<T>, all props optional.
                           // Mounting at two sites → two derivatives, lexical-scoped.

$($Chemical)               // class form. TS magic:
                           //   if bond-ctor is empty (no args)  → returns instance directly
                           //   if bond-ctor takes args          → returns (...args) => $$Component<T>

$($Chemical)("Pasta", 5)   // construct + mount a derivative with bond-ctor args
```

`$List` is renamed `$Chemistry`. The exported `$` is dual-shape: usable as a Fragment-list Component (`<$>...</$>`), and callable as `$(chemical)` / `$($Chemical)`.

## Test surface — the passed-through-bond-ctors scenario

Before any implementation: Queenie writes the tests. Tests describe what a sensible developer would *expect*, not what the framework does today. Implementation must match the tests.

The headline scenario Doug called out: **a chemical/particle flows through three nested bond constructors as a child**, getting rendered more than once with different props. That produces a tree of derivatives all rooted at one instance.

```typescript
class $Outer extends $Chemical {
    middles: $Middle[] = [];
    $Outer(...middles: $Middle[]) { this.middles = middles; }
    view() { return <>{this.middles.map(m => $(m)())}</>; }
}

class $Middle extends $Chemical {
    inners: $Inner[] = [];
    $Middle(...inners: $Inner[]) { this.inners = inners; }
    view() { return <>{this.inners.map(i => $(i)())}</>; }
}

class $Inner extends $Chemical {
    $tag = 'default';
    view() { return <span>{this.$tag}</span>; }
}

const sharedInner = new $Inner();
sharedInner.$tag = 'root';

// User code: shared instance flows through nested bond ctors, each `$(sharedInner)`
// site at the leaf creates its own derivative.
<Outer>
    <Middle>{sharedInner} {sharedInner}</Middle>   {/* two leaf sites */}
    <Middle>{sharedInner}</Middle>                  {/* one leaf site */}
</Outer>
```

Three derivative branches of `sharedInner` exist concurrently. Mutations on `sharedInner` propagate to all three. Mutations on any one branch are isolated.

### Test matrix

| # | Scenario | What a sensible developer expects |
|---|---|---|
| 1 | Two `<r.lifted/>` mounts of the same `r` (instance form), no writes | Both mounts render `r`'s state. (Identity sanity.) |
| 2 | `r.$x = 'A'` after both mounts exist | Both derivatives re-render and read `'A'` via prototype chain. |
| 3 | One derivative writes `$x = 'B'`; sibling derivative still reads parent | The sibling reads parent's value (unchanged); the writer reads `'B'`. |
| 4 | Parent writes `$x = 'C'` after derivative shadowed `$x` | All derivatives wake (fan-out is unconditional); the shadowed one's view still reads its own `'B'`. |
| 5 | `delete derivative[$backing$].$x` | Derivative now reads parent's `$x` again on next read. |
| 6 | Derivative writes its own `$x` | Only that derivative re-renders; parent and siblings untouched. |
| 7 | **Three-level chain** (root → derivative-A → derivative-A1) | Root write wakes A; A's setter fires A1; A1 reads through full chain. |
| 8 | **Bond-ctor pass-through** (Doug's scenario above) | Each leaf `$(sharedInner)` site has its own derivative; mutations on `sharedInner` wake all leaves; mutations on one leaf affect only that leaf. |
| 9 | Same instance rendered with different props at two sites | Each derivative gets its own props applied via `$apply`; no collision. |
| 10 | Derivative unmounts | Removed from parent's `[$derivatives$]`. Future parent writes don't try to wake it. |
| 11 | Parent unmounts while derivative still live | Derivative continues with its own state. (Edge case; document behavior.) |
| 12 | Cycle of mounts and unmounts at the same React site | Each mount creates a fresh derivative with fresh cid; old one cleaned up. No leak in `$Reaction._chemicals`. |
| 13 | Derivative count after N mounts/unmounts | Parent's `[$derivatives$]` has exactly the live count — no stale entries. |
| 14 | `$($Class)` (class form) vs `$(template)` (instance form) | Class form runs bond ctor on first mount; instance form does not. Both create derivatives. |
| 15 | The bond-ctor scenario **with** prop overrides at the leaf | Leaf derivatives each take their own props on top of inherited state. Parent state changes still propagate. |

These tests get written FIRST in `tests/abstraction/lexical-scoping.test.ts`. Audit the test list with Doug before implementation. Implementation matches the tests, not vice versa.

## Stories

### S1 — Pre-flight: failing tests for the current bugs (particle AND chemical)

Two failing baseline tests that demonstrate the multi-site collision today, *one per layer*:
- **Particle case** — two `<x.Component title="X"/>` and `<x.Component title="Y"/>` mounts of the same lifted `x` particle; assert state/prop collision.
- **Chemical case** — same shape with a `$Chemical` subclass.

Both should demonstrate bad behavior on `main`. Confirm we know what we're fixing.

### S2 — Lexical scoping: per-site derivatives in `$lift`, parent-tracks-derivatives, fan-out

This is the heart of the sprint. Implementation order:

**S2.1 — Tests first (Queenie).** Write `tests/abstraction/lexical-scoping.test.ts` with the 15 cases from the test matrix above. Tests fail against current code (because the mechanism doesn't exist yet). Audit with Doug before implementation.

**S2.2 — Add `[$derivatives$]` symbol in `implementation/symbols.ts`.** A per-instance `Set<derivative>`, lazy.

**S2.3 — Update bond setter (`installReactiveAccessor` in `bond.ts`).** After writing local backing, walk `this[$derivatives$]` (if set) and fan out `react()` to each. Unconditional — no shadowing check.

**S2.4 — Rewrite `$lift` (in `particle.ts`).** Per-site derivation:
```typescript
function $lift(parent: $Particle): $Component<$Particle> {
    return (props) => {
        const [cid, setCid] = useState(-1);
        let p: any;
        if (cid === -1) {
            p = Object.create(parent);
            p[$cid$] = $Particle[$$getNextCid$$]();
            p[$symbol$] = $Particle[$$createSymbol$$](p);
            p[$reaction$] = new $Reaction(p);
            p[$update$] = () => setToken(...);
            p[$phases$] = new Map(...);
            p[$phase$] = 'setup';
            // Register with parent's derivatives set
            (parent as any)[$derivatives$] ??= new Set();
            (parent as any)[$derivatives$].add(p);
            setCid(p[$cid$]);
        } else {
            p = $Reaction.find(cid);
        }
        // useEffect: lifecycle phases, $apply props, view, augment, return
        // Cleanup: parent[$derivatives$].delete(p); $destroy$.
    };
}
```
Skip `$bond$` — bond ctor doesn't run. Inherits `$molecule$` and `$orchestrator$` from parent via prototype chain (no fresh allocation needed).

**S2.5 — `$(instance)` cache (`[$lifted$]`) returns the lifted Component factory.** The factory creates per-site derivatives on each mount. Same Component reference (stable React identity), different derivative per mount.

**S2.6 — Run the test matrix. Iterate until 15/15 pass.**

**Acceptance:**
- `lexical-scoping.test.ts` 15/15 green.
- Existing 326 tests still pass (no regressions).
- Test scenario #8 (Doug's bond-ctor pass-through) passes — proves the design works on a real-world tree.

### (Deferred) — Move bonds + remove `$children$`

The original S2 plan combined "move bonds to `$Particle`" with "drop `$children$`". Both are still on the table but split out for clarity:

This is the structural change. Migrate the bond machinery (`$Bond`, `$Reagent`, `$Reflection`, `$Molecule`, the reactive accessors, scope integration) from `$Chemical` down to `$Particle`. `$Chemical` keeps the bond-constructor orchestration (`$BondOrchestrator`, `$ParamValidation`, named-method parsing).

**Remove `$children$` from `$Particle`.** `$apply` no longer writes children. The generated Component for a particle has no `children?` prop — passing children to a particle is a TypeScript error. JSX `<Particle />` is self-closing only.

After this story, `$Particle.$apply(props)` writes through bond accessors, not plain assignment.

`$Particle` also owns lexical scoping: `$lift` produces a Component that creates `Object.create(particle)` per site, binds that derivative to the React mount via `useState`, and writes `$apply` props to the *derivative*. Same particle reference at two sites → two derivatives → no collision.

`$Particle` exposes the derivatives registry: `addDerivative(child)` / `removeDerivative(child)` / `walkDerivatives(prop, fn)` — used in S3 by bond-shaped fan-out.

The "formed" concept enters here: a particle's derivative is unformed until first render; becomes formed when machinery wires up and it joins its parent's registry.

**Acceptance:**
- All existing bond / reactivity tests still pass (relocated, not broken).
- Two `<lifted/>` mounts of the same `$Particle` subclass instance don't share state.
- Registry primitive exposed and unit-tested independently.
- `<MyParticle>foo</MyParticle>` is a TypeScript compile error.
- Particle-variant of T1 and T2 from S6 pass.

### S3 — Bond-shaped propagation (lives at `$Particle` now too)

Implement the propagation rule:
> When `parent.$bond = X` is written, walk parent's derivatives registry. For each derivative `D`: if `Object.hasOwn(D, '$bond') === false`, fire `D[$reaction$].react()`.

Edge cases to nail:
- **Shadow add** — `D.$bond = Y` for the first time → register D as "shadows $bond"; future parent updates skip D.
- **Shadow delete** — `delete D.$bond` → D resumes inheriting; future parent updates wake D again.
- **Per-prop indexing** — a parent change to `$title` should only walk derivatives that depend on `$title`. No flat list of derivatives.

**Acceptance:** Tests T1–T5 from S6 pass.

### S4 — `chemical.view` (identity-preserving Component)

Each chemical exposes a `view` property that IS its no-props Component (function value, stable identity). Mounting `<chemical.view/>` at two sites uses the same instance.

**Open question:** is `view` a property that returns a Component each access (lazy), or stored on the instance (eager, stable identity)? **Recommendation: stored on the instance** — stable React identity, no remount on prop access. Lazy creation but cached.

**Acceptance:** Test T1 from S6 passes (multi-site `view` mounts share state).

### S5 — `$(chemical)` callable (lexical-scoped derivative)

`$(chemical)` returns a `$$Component<T>` that, when mounted, creates a fresh `Object.create(chemical)` derivative bound to that React position. The derivative becomes formed on first render. Override fields via props; everything else delegates.

**Acceptance:** Test T2 from S6 passes (multi-site `$()` mounts have independent state).

### S6 — Test suite for lexical scoping

Each test runs against both a `$Particle` subclass and a `$Chemical` subclass where applicable, to confirm the particle-level mechanism works for both.

| # | Scenario | Layer | Asserts |
|---|----------|-------|---------|
| T1 | Two `<x.view/>` mounts; mutate state | both | both reflect change (shared identity) |
| T2 | Two `<$(x)/>` mounts; mutate one | both | the other does NOT reflect change (lexical scoping) |
| T3 | Mutate parent's `$title`; derivative has no `$title` | both | derivative re-renders (bonds at particle now) |
| T4 | Mutate parent's `$title`; derivative shadows `$title` | both | derivative does NOT re-render |
| T5 | `delete D.$title` | both | next parent change wakes D |
| T6 | `$($(x, {a:1}), {b:2})` | both | three-level chain reads/writes correctly |
| T7 | `$($X)` (no bond-ctor args) | both | returns an instance directly |
| T8 | `$($X)("Pasta")` (with bond-ctor args) | both | returns a Component, mounts with args applied |
| T9 | Original receives no propagation from itself | both | original has no parent, gets no fan-out |
| T10 | `<$>...</$>` Fragment AND `$(x)` callable | both | same exported symbol, both shapes |
| T11 | Pre-flight failing test: current multi-site collision | both | demonstrates the bug pre-fix; goes green after S2 |

### S7 — `$($Chemical)` class form with TS magic

Type-level overload that distinguishes empty-bond-ctor classes from arg-taking ones, and returns either instance or `(...args) => Component` accordingly.

**Approach:** marker-based. Class declares its bond-ctor shape via something like `implements $Args<[string, number]>` or a static type alias. Smallest user-facing surface wins; we'll prototype both before locking.

**Open question for Doug:** which marker shape — `implements $Args<[...]>`, a static field, or something else?

### S8 — `$List` → `$Chemistry`; `$` as dual-shape callable

Rename the class. Make the exported `$` a function that:
- If invoked with React-element-like props (children, key, ...), behaves as the Fragment list.
- If invoked with a chemical or class as first arg, dispatches to lexical-scoping (`$(chemical)` / `$($Chemical)`).

**Approach:** wrap the React FC with a dispatch function. React still sees `$` as a valid component because it's a function returning ReactNode.

**Research item:** the old `$Chemistry` archive (`b8811f4^:library/chemistry/src/archive/chemistry.ts`) had a hack for the dual-shape. Find it, evaluate, apply or improve.

### S9 — Drop `.Component`

Once S2–S8 land and tests are migrated to use `chemical.view` and `$(...)`, remove the `.Component` getter from `$Chemical`. Update all internal call sites and specimens.

**Order-of-operations question for Doug:** ship lexical scoping with `.Component` still alive (safer), then drop in a follow-up — or drop in this same sprint (cleaner)?

### S10 — Particularization (identity-preserving)

Implement the prototype-chain-insertion mechanism. `new $Particle(particularObject)` (or `new $Subclass(particularObject)`) inserts a fresh particle-mixin between the object and its original prototype. The user keeps the same object reference and its `instanceof OriginalClass` check; gains `view`, `$cid$`, `$symbol$`, lifecycle, etc.

`isParticle(x)` helper exported as the supported "is this a particle?" check (since `instanceof $Particle` no longer reliably works for particularized objects).

**Acceptance:**
- `const e = new $Exception(new Error("oops"))` returns the same error reference (`e === thatError`).
- `e instanceof Error` is true.
- `e.message` reads the Error's own message.
- `e.view()` runs the `$Exception` view.
- Mounting `<lift(e)/>` works.
- Tests cover: idempotent re-particularization, particularizing an already-particle of a different class (decision: error), particularizing a frozen object (decision: error).

### S11 — Bond constructor runs at mount only

**Confirmed rule (Doug, this turn):**
> The bond constructor body runs **once at mount** (when React first creates the Component instance at this site). Subsequent re-renders update typed-field bindings but do NOT re-execute the ctor body. React owns mount/unmount; the bond ctor hooks the *mount* event, not the *render* event.

**Orchestrator's split role:**

- **At mount** — process `props.children`, build typed args, call the bond ctor body once, bind args to typed fields.
- **On re-render** — process `props.children` again, refresh typed fields with new args, **skip** the body. (This handles React's "children may change between renders" case without re-executing user init logic.)

**Implementation:** the orchestrator parses the bond ctor's parameter list (it does this today) and uses that as the binding declaration. The ctor body is invoked exactly once per formation. Subsequent renders apply the args to typed fields directly via the parsed binding map, bypassing the ctor body.

**Acceptance:**
- Bond ctor body executes exactly once per derivative (test: count invocations across multiple re-renders).
- Children changing between renders updates typed fields (test: parent re-renders with extra child; child appears in chemical's typed field).
- Original/template's bond ctor: runs at construction time only (the original's lifetime is the module's lifetime).

### S12 — Specimens + app migration

Update `tests/specimens/*.tsx` and `app/src/main.tsx` to use the new API. The specimens use `(new $X()).Component` patterns extensively — those become `$($X)` or instance-of-class reads.

## Component / Element type family — landed

The React-FC types live where Chemistry meets React, so they take React/web/UI vocabulary. The naming is now:

| | required props (public — JSX-mounted) | all-optional props (framework — `$(x)` returns this) |
|--|--|--|
| Particle (leaf, no children) | `Element<T>` | `$Element<T>` |
| Chemical (container, children?) | `Component<T>` | `$Component<T>` |

`Component<T> = Element<T> & { children?: ReactNode }`. The `$`-prefix means "framework-decorated, all-optional" — what `$(chemical)` or `$(particle)` returns. The unprefixed forms are what consumers see when they JSX-mount a chemistry-built thing without engaging the framework's `$()` callable.

**Why no `$$X` convention:** Doug dropped a `$` level. There's no `$$Component` / `$$Element` anymore — just `Component` / `$Component` (and `Element` / `$Element`).

**Possible third shape — passthrough.** `$Function$` and `$Html$` have children prop (the wrapped React FC or HTML tag does) but don't run bond ctors — they pass children through unchanged. Open question whether they get a distinct type (`Passthrough<T>`?) or are just `Component<T>` with no bond-ctor declared.

**Internal marker interface name still TBD.** `$Bound<T>` is a placeholder. Doug rejected the name. The framework-attached surface (`$bound`, `$chemical`, `$bind`, etc.) needs a final name — candidates: `$Marked<T>`, `$Bindable<T>`, `$Producer<T>`, or absorb inline.

## `$` — the dispatch and surface

`$` is the framework's main entry point — a single callable with multiple TS overloads, dispatched at runtime by `typeof`/`instanceof` checks on the first argument.

**Overloads:**

```typescript
// JSX usage: <$>...</$> — Fragment-list with auto-keys
$(props: { children?: ReactNode }): ReactNode;

// Lexical-scoped derivative from an instance
$<T extends $Particle>(thing: T): $Component<T>;

// Class form — empty bond ctor → instance
$<T extends $Particle>(klass: $ClassWithEmptyCtor<T>): T;

// Class form — arg-taking bond ctor → mounting function
$<T extends $Particle, A extends any[]>(
    klass: $ClassWithArgs<T, A>
): (...args: A) => $Component<T>;
```

`$List` (renamed `$Chemistry`?) stays as a separate class for the Fragment-list rendering; `$` invoked as JSX delegates to it.

**`$.namespace` utilities — exploratory, jQuery homage:**

- `$.react(chemical)` — manual react trigger.
- `$.is(x)` — type check, replacing `isParticle`/`isChemical`.
- `$.where(parent)` — scoped variant that auto-binds to a parent context.

The `$.foo` surface should grow organically; we lock no shape up front, but we reserve the convention.

## Open questions for Doug

*Resolved (recorded for the record):*
- ~~**Bond ctor shape**~~ — orchestrator parses parameter list as binding declaration; body runs once at mount; bindings refresh on re-render. *(S11)*
- ~~**Children changing between renders**~~ — re-bind typed fields with new args. React-compatible. *(S11)*
- ~~**Free up `Component<T>`**~~ — original interface renamed to `$Bound<T>` placeholder; final name TBD.
- ~~**`Control` rejected**~~ — Doug's call.
- ~~**Public type naming**~~ — `Element<T>` (no children) and `Component<T>` (with children) for public; `$Element<T>` and `$Component<T>` for framework-decorated/all-optional. Landed.
- ~~**`react()` escape hatch**~~ — removed entirely. The framework auto-reacts via scope + bond accessors; no manual trigger ever.

*Still open:*

1. ~~Element / Component naming~~ — done.
2. **Derivation prototype** — `Object.create(chemical)` (chain) or `Object.create(template)` (collapse)? *Cathy/Arthur recommend chain.*
3. **`chemical.view` shape** — eager-stored Component (stable identity) vs lazy-property getter? *Cathy/Arthur recommend eager.*
4. **TS marker shape for `$($Chemical)` magic** — `implements $Args<[...]>`, static type alias, or something else?
5. **`$Chemistry` class scope** — just renamed `$List` with dual callable, or absorbs more (e.g., `$wrap` / FC adapter)?
6. **Order of operations** — drop `.Component` this sprint (cleaner) or follow-up (safer)?
7. **`isParticle(x)` helper** — public export, or framework-internal only?
8. **Re-particularizing an object that's already a particle of a *different* class** — error, or re-target the mixin?
9. **Particularizing a frozen object** — error, or fail silently?
10. **`$Function$` and `$Html$` typing** — they're hybrids: have children (typed by the wrapped FC / HTML tag) but no bond-ctor orchestration. Distinct type (`Passthrough<T>`)? Or just `Component<T>` with no bond ctor declared? Or stay as a chemical sub-pattern?
11. **Migration shape for S2** — one big rip (bonds move from `$Chemical` to `$Particle` in one PR) or two-pass (bonds at both temporarily, then remove from chemical)?
12. **Internal marker interface name** — replace `$Bound<T>` placeholder. Candidates: `$Marked<T>`, `$Bindable<T>`, `$Producer<T>`, `$ComponentSurface<T>`, or absorb inline (no name).
13. **`$` namespace utilities** — what `$.foo` helpers are worth carving out? `$.react`, `$.is`, `$.where`? Lock the surface or grow it organically?

## Out of scope

- Persistent state / `$Persistent` lifecycle (deferred indefinitely).
- Storage adapters (no $Persistent, no need).
- Cross-tab coordination, hydration, SSR.

## Risks

- **Performance of fan-out** — naive walk over all derivatives on every parent write would scale badly. Per-prop indexing in S3 is mandatory, not optional.
- **TS magic complexity** — if the marker pattern bleeds into every chemical's declaration, the API stops being beautiful. Iterate until the marker is invisible or trivially small.
- **`$` dispatch correctness** — false dispatches (treating a chemical reference as JSX props or vice versa) would be subtle. Tight tests around the dispatch boundary in S8.
