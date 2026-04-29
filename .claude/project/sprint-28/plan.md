# Sprint 28: The Anatomy & The Lab — App Design and Comprehensive Tour

A design-heavy sprint that produces three artifacts and zero shipped code:

1. **A multi-sprint program** — a planned series of sprints that, executed in order, will deliver `$Chemistry Lab` end-to-end. This sprint plans the program; subsequent sprints execute parts.
2. **A comprehensive tour curriculum for `$Chemistry`** — the actual content the Lab will eventually walk a framework developer through. Long, hierarchical, organized for progressive disclosure. Goes into the library as durable docs.
3. **A site architecture** — how the Lab is structured, how code examples enter, how navigation works at full-browser-on-laptop size, what the visual language is. This is the *design document* for the application that subsequent sprints will build.

**The Lab is built front-to-back with `$Chemistry` itself.** The framework documents itself by using itself. This is a hard constraint, not a stretch goal — it forces every framework feature to be exercised by the application that demonstrates it.

## Status: IN PROGRESS

Last updated: 2026-04-29

## Team

| Agent | Roles | Scope this sprint |
|-------|-------|-------------------|
| Cathy | Framework Engineer, Frontend Engineer | Site architecture, the visual language, eat-our-own-dogfood ledger |
| Arthur | Architect | The multi-sprint program; dependency graph between sprints; risk surfacing |
| Queenie | QA Engineer | Coverage matrix — which framework features the tour exercises and where they're tested |
| Libby | Librarian | Curriculum order, hierarchical content structure, library-to-Lab cross-link convention |

## Methodology

**This sprint produces no shipped code.** The methodology is *design*. Multi-voice deliberation produces:

- A `tour.md` — long, hierarchical, the actual curriculum content (lives in library).
- A `site-architecture.md` — the Lab's structure, build, navigation, code-presentation, visual language.
- A `program.md` — the sequence of subsequent sprints that will build the Lab.

Reviews are by reading and discussion. Doug's sign-off on the `program.md` becomes the runway for the next several sprints.

---

# Part 1 — Web research findings (briefly, then forward)

We surveyed React.dev, Vue.js docs, and Solid's tutorial pattern. Patterns to adopt:

- **Multiple top-level entry paths.** React: Quick Start / Tutorial / Reference / Installation. Vue: Tutorial / Guide / Examples / Playground / API. Different audiences want different doors.
- **Hierarchical sidebar, expandable sections.** Both use deep nested sidebars (Vue: 9 top-level groups, ~50 sub-pages).
- **Live interactive editors inline.** React's Sandpack, Vue's Playground link, Solid's lesson editor. Code is *runnable* on the page.
- **Tabbed API preference** (Vue's Options API ↔ Composition API). Two ways to do the same thing, both shown.
- **Visual callouts**: `<Intro>`, `<YouWillLearn>`, "Pitfalls" boxes, "Deep Dive" expandables.
- **In-page TOC** ("On this page") for long pages.
- **Progressive disclosure**: each chapter assumes only what came before; no forward references.

Patterns to *not* adopt:
- **Sandpack-style runtime code execution in the browser.** We have a stronger constraint: the source IS the running app. Vite's `?raw` import gives us source-from-file at build time; the chemical declared in the file IS what's rendered next to it. No transpiler in the browser.
- **Separate playground.** The Lab IS the playground. Every page is interactive.

---

# Part 2 — The `$Chemistry` Catalogue

**Revised after Doug feedback.** The original draft was a tutorial-style tour ("Hello, particle"). The catalogue is a **reference manual** organized by layer — modeled on Vue's API Reference (granular, hierarchical, semantic grouping) with Rust Reference's formal voice (normative, not tutorial-friendly). The layer architecture comes from `chemistry/overview.md`: Foundation → Primitives → Composition → Integration → Cross-cutting → Reflection → Semantics. Each entry has **Definition / Rules / Cases / See also**. Cases are the Lab specimens.

A reader at any entry sees: what the thing is (Definition), how it behaves (Rules), what it looks like in working code (Cases), and where else to look (See also). Cases ARE the Lab specimens — the same source, two presentations.

The catalogue presents `$Chemistry` **bottom-up** (foundation upward) but supports lookup from any axis. The library uses the same hierarchy as its backbone.

## The Catalogue

### § 0. Front matter

- **§ 0.1 What `$Chemistry` is.** The framework's reason-for-being. Object-oriented component layer atop React; Self prototype delegation + Scheme symbols/environments; the bet against *The Good Parts*. A reader who finishes § 0 has the framing for everything below.
- **§ 0.2 Conventions.** The `$` membrane (`$Name`, `$name`, `$name$`, `$$name$$`); the chemistry register; how to read this catalogue (Definition / Rules / Cases / See also).
- **§ 0.3 The dual constructor.** The single most surprising design choice — every `$Chemical` has *two* constructors. Introduced here as a teaser; the binding constructor itself is documented in § III.1.3.

### § I. Foundation

- **§ I.1 Symbols.** The Symbol-keyed internal slots that hide framework state from property enumeration. Naming conventions (`$x$`, `$$x$$`). How symbols travel through `Object.create()` — the reason the framework uses symbols rather than `#private`.
  - **Cases:** A symbol-keyed property accessed via prototype-derived view; the `#private` failure mode that motivated the choice.
- **§ I.2 The `$` membrane.** Three audiences (consumer / author / framework dev), three densities. The grammar.
- **§ I.3 Types.** The TypeScript vocabulary: `$Properties<T>`, `$Component<T>`, `$Element<T>`, `I<T>`. How types survive the `.Component` boundary.

### § II. Primitives — `$Particle`

- **§ II.1 The class.** Definition. Constructor. The fields (`$cid$`, `$symbol$`, `$type$`, `$phases$`, `$molecule$`, `$reaction$`, `$template$`, `$component$`, `$derivatives$`).
  - **Cases:** A minimal `$Particle` subclass; the symbol it produces; the cid sequence.
- **§ II.2 `view()`.** The render contract. Return type. Purity expectation. The `$rendering$` flag.
  - **Cases:** A `view()` returning a single element; returning an array; returning null.
- **§ II.3 Identity.** `$cid$` (auto-increment), `$symbol$` (printable), `$type$` (the constructor). Round-trip via `$$createSymbol$$` / `$$parseCid$$`.
  - **Cases:** Parsing a symbol back to its instance; identity stability across re-renders.
- **§ II.4 The lifecycle.** Six phases (`setup`, `mount`, `render`, `layout`, `effect`, `unmount`). `next(phase)`. Convenience wrappers (`mount()`, `render()`, etc.). `$resolve` propagation up the prototype chain.
  - **Cases:** Awaiting `mount`; awaiting `unmount` (returns rejected after unmount); phase ordering.
- **§ II.5 The `particular` constructor argument.** Particularization. Lift methods + reparent. Marker stamping. No-op for existing particles. Original untouched.
  - **Cases:** `new $Particle(error)` carrier; `instanceof Error` preserved; original object unchanged. (Specimen forward-references § VII for full treatment.)
- **§ II.6 `isParticle(x)`.** The marker check. Why prototype-chain inheritance vs own-property both work.
- **§ II.7 The `$()` callable.** Class form returns the Component for the class. Instance form lifts a held instance. String form looks up an HTML catalogue entry.
  - **Cases:** `$($Counter)` (class form); `$(counter)` (instance form); `$('div')` (string form, HTML); `$('div', X)` (string form, override).
- **§ II.8 Render filters.** The cross-cutting interception chain. `$show` / `$hide`. `registerFilter()`. Filter ordering (first non-undefined wins).
  - **Cases:** Toggling `$show`; a custom filter for an error-placeholder; filter chain order.
- **§ II.9 `$lift`.** Per-mount derivative creation. `Object.create(parent)`. Identity stamping. `$derivatives$` registry.
  - **Cases:** Two mounts of one held instance; their independent state; the parent's `$derivatives$` set.
- **§ II.10 The Component getter.** Lift-path on `$Particle` (uses `$lift`); template-path override on `$Chemical` (uses `$createComponent`).
  - **Cases:** `class.Component` for a `$Particle` subclass; the difference for `$Chemical`.

### § III. Composition — `$Chemical`

- **§ III.1 The class.** Extends `$Particle`. Adds `$synthesis`, `$catalyst`, `$$parent$$`, `$lastProps$`, `$remove$`. Rules around composition.
- **§ III.2 The dual constructor.** The class constructor (object creation time) vs the binding constructor (render time). Why two moments.
- **§ III.3 The binding constructor.** The method named after the class. Discovered at runtime via `chemical[$type$].name`. Receives JSX children as typed args.
  - **Cases:** A simple `$List(...items: $Item[])`; spread args; mixing types via union.
  - **Note:** This is the single most surprising feature in `$Chemistry`. Cross-link to § 0.3.
- **§ III.4 `$check(arg, ...types)`.** Runtime parameter validation invoked from inside a binding constructor.
  - **Cases:** Accepts subclass; accepts union; throws on wrong type with formatted error.
- **§ III.5 `$is<T>(ctor)`.** Type-only helper for `$check` signatures.
- **§ III.6 `bind(chemical, parent?)`.** Static binding without JSX. Programmatic composition.
- **§ III.7 Polymorphism without props.** Subclass property overrides change appearance without changing parent render code.
  - **Cases:** `$VeganRecipe extends $Recipe { Card = VeganCard }`; the visual difference.
- **§ III.8 The catalyst graph.** `$catalyst$`, `$$parent$$`, `$parent$` setter. How composed chemicals share a reaction system. The rewiring-on-join pattern.
  - **Cases:** Cross-chemical write through composition; the catalyst's reaction tree.
- **§ III.9 The HTML catalogue.** The lazy-memoized `$Html$` wrapper map. The `$('tagname')` and `$('tagname', X)` forms.

### § IV. Integration — `$Atom`

- **§ IV.1 The class.** Extends `$Chemical`. Constructor returns the class template. The singleton pattern.
  - **Cases:** `new $Atom()` returns the same instance every time; `$Theme extends $Atom`.

### § V. Reactivity

- **§ V.1 Reactive properties.** The `$x` convention. Class field syntax. Get/set accessor installation. Why mutation triggers re-render without `setState`.
  - **Cases:** `$count = 0` with `this.$count++`; `$map = new Map()` with `this.$map.set(...)`; `$arr.push(...)`.
- **§ V.2 Scope tracking.** Event handlers wrapped via `augment` run inside `withScope`. Reads recorded for snapshot. Writes recorded as dirty. `scope.finalize()` fires reactions and fans out to derivatives.
  - **Cases:** Click handler triggering re-render; `setTimeout` write outside scope (no-scope path).
- **§ V.3 Cross-chemical writes.** Writing to another chemical's reactive prop from inside a handler. The fan-out symmetry between in-scope and no-scope paths. The `hasOwnProperty($derivatives$)` ownership gate.
  - **Cases:** Outer-button-writes-inner-`$value` causes inner DOM to repaint; sibling derivatives unaffected.
- **§ V.4 In-place collection mutation.** Map/Set/Array methods detected via `$symbolize` snapshot diff.
  - **Cases:** `Map.set`, `Set.add`, `Array.push`, deep `obj.x.y.z = 1`.
- **§ V.5 `diffuse(chemical)`.** The fan-out function in `scope.ts`. Walks `$derivatives$` only when own.
- **§ V.6 Decorators.** `@inert()` (opt-out for `$x` props). `@reactive()` (opt-in for non-`$` props). `$Reflection`'s decorator registries.
  - **Cases:** `@inert $cache = new WeakMap()`; `@reactive count = 0`.

### § VI. Lexical Scoping

- **§ VI.1 Per-mount derivatives.** Two mounts of one held instance produce two derivatives via `Object.create()`. Each has its own state.
  - **Cases:** Two `<inner.Component />` mounts; expand on one, the other unaffected.
- **§ VI.2 The `$derivatives$` registry.** Owned by the parent chemical. Holds mounted derivatives. The framework's fan-out target.
- **§ VI.3 The ownership gate.** A write only fans out from the chemical that *owns* its `$derivatives$` set; derivatives don't leak writes to siblings via prototype-inherited sets. (Reference to the sprint-24 fix.)

### § VII. Particularization

- **§ VII.1 The pattern.** `new $Particle(particular)`. Lift methods from prototype. Stamp marker. Reparent.
- **§ VII.2 `instanceof` preservation.** The carrier passes `instanceof OriginalType` because the original is in the prototype chain.
  - **Cases:** `new $Error(realErr) instanceof Error === true`; original.message reachable via the carrier.
- **§ VII.3 The `I<T>` type.** `I<$Error> & I<Error>` intersection naming.
- **§ VII.4 Reactivity machinery on particularized carriers.** Every particle now allocates `$Molecule` and `$Reaction` (sprint-27 reframe). Particularized carriers inherit this; usually unused but allocated.
  - **Cross-link:** caveat page.

### § VIII. Synthesis (the bond ctor orchestration)

- **§ VIII.1 `$Synthesis` class.** Per-chemical bond-ctor orchestrator. Parses ctor parameters. Processes JSX children.
- **§ VIII.2 `$SynthesisContext`.** Per-call mutable state. Tracks parameter index, accumulated args, child contexts.
- **§ VIII.3 `$Reactants`.** The information-hiding wrapper passed to the bond ctor. `.values` array; nothing else.
- **§ VIII.4 Parameter parsing.** Regex-based parsing of the bond ctor's parameter list. Spread vs positional.
  - **Cross-link:** § XIV provisional behavior — the regex is brittle.
- **§ VIII.5 JSX child handling.** Strings (passed through). Arrays (recursive). Nested chemicals (typed bond-ctor args). Spread args.
  - **Cases:** mixed children; nested compositions; spread accumulating.
- **§ VIII.6 The catalyst graph wiring.** How `$Synthesis` calls `$bind` on child Components to thread the `$parent` graph.

### § IX. Reflection (property classification)

- **§ IX.1 `$Reflection` class.** Per-property classifier. Decorator registries. Per-instance reactivity decision.
- **§ IX.2 `$Reflection.isReactive(name)`.** Name predicate. The `_` prefix exclusion. The `constructor` exclusion.
- **§ IX.3 `$Reflection.isSpecial(name)`.** The `$x` shape predicate. The `length >= 2` rule (sprint-24 fix).
  - **Cross-link:** § XIII caveat — single-letter `$<x>` names.

### § X. Lifecycle Internals

- **§ X.1 The phase queue.** `$phases$` Map. `next(phase)` returns a Promise resolved by `$resolve(phase)`.
- **§ X.2 `$resolve` propagation.** Walks up the prototype chain, resolving each ancestor's queue if it owns one. Why derivative mounts resolve their template's mount.
- **§ X.3 Async bond ctors.** `async $Foo()`. `$construction` promise. Bundling parent's construction via `Promise.allSettled`.
  - **Cases:** Async loader; awaiting `next('construction')`.
- **§ X.4 The render loop.** `$apply` → `$bond` → filter chain → `view()` → augment → diff against `$viewCache$` → maybe `$update$()`.

### § XI. Cross-cutting helpers

- **§ XI.1 `$promise(executor)`.** Cancellable promises with chained `then`. The `$cancelled$` sentinel.
  - **Cases:** Cancel mid-flight; chained `.then` carries cancel through.
- **§ XI.2 `$await(promise)`.** Synchronous read of a settled `$promise`'s `result`.
- **§ XI.3 `$symbolize(value)`.** Deterministic serialization for snapshot comparison. Map/Set/Array/Date aware. Cyclic-safe.
  - **Cases:** Same Map content → same string; Map mutation detected; Date round-trip.
- **§ XI.4 `$literalize(symbol)`.** Inverse of `$symbolize`.

### § XII. Errors and Validation

- **§ XII.1 `$check(arg, ...types)`.** The validation entry point. Used inside binding constructors.
- **§ XII.2 `$ParamValidation`.** The module-level singleton. `index`, `count`, `types`, `errors`. `evaluate()` throws formatted error if invalid.
- **§ XII.3 The error message format.** Multi-line. Class name in heading. Expected signature. Per-parameter actual vs expected. Designed to be read on a page.
  - **Cases (the error gallery):**
    - Wrong type: `<Container><Recipe /></Container>` where `$Container` expects `$Item`.
    - Wrong arity: too many or too few children.
    - Class hierarchy violation: a chemical without a matching binding-ctor name when its parent has one.
    - Component already created (double-mount of the same `$createComponent`).
    - Cannot parse constructor: arrow-form bond ctor.
    - Invalid chemical symbol: malformed string passed to `$$parseCid$$`.

### § XIII. Caveats (resolved)

Each entry: the historical bug, the resolution, the test that pins the fix.

- **§ XIII.1 Cross-chemical handler fan-out.** Sprint-24. `scope.finalize` was missing derivative fan-out.
- **§ XIII.2 Single-letter `$<x>` props were inert.** Sprint-24. `isSpecial` required `length > 2`; fixed to `>= 2`.
- **§ XIII.3 Particle allocates reactivity machinery.** Sprint-27. Every particle now allocates `$Molecule` and `$Reaction` even if particularized.
- **§ XIII.4 Particularization preserves prototype.** Earlier framework history. Original object's prototype chain is left untouched.

### § XIV. Provisional behaviors

(Renamed from "Open questions" — these are behaviors observed in current code that haven't been confirmed as the right design. Each entry has the source location, the observed behavior, and the suspected fix or alternative.)

- **§ XIV.1 `parseBondConstructor` regex limits.** `chemical.ts:220`. Arrow ctors / default values / destructured params break parsing.
- **§ XIV.2 `isViewSymbol` unreachable branch.** `chemical.ts:148`. The `$$Chemistry.` prefix check never matches anything in current code.
- **§ XIV.3 `$isChemicalBase$` inherited resolution.** `molecule.ts:79`. The walk halts via inherited rather than own; user methods on subclass prototypes never reach `$Reagent.form()`.
- **§ XIV.4 `$Reagent` reachability.** Open question whether non-`$` user methods are ever wrapped given § XIV.3.

### § XV. Implementation modules (framework-developer reference)

For framework developers who need to read the source. Each entry is a one-paragraph orient + a source link.

- **§ XV.1 `src/abstraction/particle.ts`** — particle, lift, render filters, isParticle.
- **§ XV.2 `src/abstraction/chemical.ts`** — chemical, synthesis, $() callable, $check, bind.
- **§ XV.3 `src/abstraction/atom.ts`** — atom singleton.
- **§ XV.4 `src/abstraction/bond.ts`** — bond, reagent, reflection, decorators, activate.
- **§ XV.5 `src/abstraction/molecule.ts`** — bond graph collection.
- **§ XV.6 `src/abstraction/reaction.ts`** — per-chemical reaction unit.
- **§ XV.7 `src/abstraction/element.ts`** — React FC type definitions.
- **§ XV.8 `src/implementation/scope.ts`** — scope tracking, diffuse.
- **§ XV.9 `src/implementation/symbols.ts`** — every symbol.
- **§ XV.10 `src/implementation/types.ts`** — TypeScript vocabulary.
- **§ XV.11 `src/implementation/augment.ts`** — handler wrapping.
- **§ XV.12 `src/implementation/reconcile.ts`** — view diff.
- **§ XV.13 `src/implementation/walk.ts`** — tree traversal.
- **§ XV.14 `src/implementation/representation.ts`** — `$symbolize`/`$literalize`.
- **§ XV.15 `src/implementation/promise.ts`** — `$promise`, `$await`.

### § XVI. Why `$Chemistry`

A capstone section. Re-states the bet against *The Good Parts*. The four-question pitch (what, why, relationship to React, when to reach for it). Closes the loop on § 0.

---

## Catalogue mechanics

- **Section numbering** uses Roman numerals at the top, dotted decimals below (`§ III.3.1`). This is Vue/Rust-style and grep-friendly.
- **Each section** has Definition / Rules / Cases / See also at minimum. Some have Notes (out-of-spec context). Most have Cross-links (forward and backward).
- **Cases ARE the Lab specimens.** A case in the catalogue corresponds 1:1 to a Lab specimen file. The catalogue's case description and the Lab's specimen are bound by name.
- **Case naming** is descriptive, not friendly. *"Case: bond constructor receives typed JSX children."* Not *"Hello, particle."*
- **No tutorial voice.** The catalogue is normative. *"`$Particle` instances carry `$cid$`, `$symbol$`, `$type$`."* Not *"You'll learn about `$cid$` next."*


# Part 3 — Site Architecture

Where the tour content lives and how it's presented.

## Constraints (from Doug)

- **Built front-to-back with `$Chemistry`.** The Lab is the framework's biggest specimen. Every page is a chemical. Sidebar navigation is a chemical tree. Code-and-preview panels are chemicals. Cross-chemical writes happen between sidebar selection and content panel.
- **Full-browser viewing on a coding-laptop.** Designed for ~1440px wide. Full-screen, no mobile-responsive optimization (a developer reading docs is at their workstation). This unlocks generous side-by-side layouts.
- **Easy navigation, default page, page-by-page navigation.**
- **Convenient to run; not all 900 tests load at once.** Lazy import per tour stop.
- **Source code visible.** Vite `?raw` imports.
- **Beautiful canonical versions of source.** The specimen file IS the canonical example. No hand-typed code strings.
- **Visual language indicating expected/unexpected behavior.** Designed below.

## Top-level layout

```
+----------------------------------------------------------------------------------+
|  [$ Chemistry Lab]   [Topical] [Ontology] [Epistemology] [Index]      [search]  |  ← header
+--------------+----------------------------------------+--------------------------+
|              |                                        |                          |
|  Sidebar     |  Content panel                         |  Code panel              |
|  (250px)     |  (flexible, ~700px target)             |  (flexible, ~480px)      |
|              |                                        |                          |
|  ▾ Topical   |  ## 3. The bond constructor            |  ┌─────────┐             |
|    0. Why   |                                        |  │ source  │ ← prism-     |
|    1. Hello |  > Headline prose                       |  │ code    │   highlighted |
|    2. Props |                                        |  │ ...     │   from `?raw`|
|  ▶ 3. Bond  |  [interactive demo — running chemical]  |  │         │             |
|    4. Errs  |                                        |  └─────────┘             |
|             |                                        |                          |
|  ▾ Ontology |  > More prose, callouts, deep dives    |  [Specimen file path:    |
|    Entities |                                        |   subjects/.../bond.tsx] |
|    Relat... |  [test note: what to look for]          |                          |
|    Concepts |                                        |  [🧪 see the unit test]  |
|    Surpri.. |                                        |                          |
|             |                                        |  [📖 read the chapter]   |
|  ▾ Epistem. |  ──────────────────────────             |                          |
|    Lab      |  ◀ 2. Reactive props        4. Errors ▶ |                          |
|    Tests    |                                        |                          |
|    Caveats  |                                        |                          |
|             |                                        |                          |
+-------------+----------------------------------------+--------------------------+
```

Three-pane layout. Sidebar fixed. Content panel scrolls. Code panel is sticky at the right (its own scroll if source is long).

## Visual language

### Color and shape coding

The Lab uses a small disciplined palette. Each color carries semantic weight:

- **Default text** — neutral dark gray, readable.
- **Code** — monospace, syntax-highlighted via `prism-react-renderer` with a subtle light theme.
- **`$Chemistry` accent** — a single warm tone (deep red `#c0392b`) used for the `$` brand, active sidebar item, and the "you are here" indicator. Sparingly.
- **Working / expected** — soft green border or subtle green tint. Used for the "this is working as expected" callout and the running demo's outline when interactive.
- **Surprising / non-obvious** — yellow / amber. Used for "Surprising" callouts that flag features whose behavior violates intuition (the bond constructor, particularization preserving `instanceof`, single-letter `$<x>` props).
- **Pitfall / corner case** — a softer warning hue (warm orange, not red). Used for "Pitfall" boxes that document real footguns.
- **Failure / red** — used *only* for actual error message demos (the cases in § III.4 and § XII). Real errors. Avoids alarming the reader for non-error things.
- **Open question** — purple/violet. Distinct from caveats; used for "we don't yet know" findings.

### Shapes and chrome

- **Section headers** — large serif, low-key. Numbered (`3. The bond constructor`).
- **Demo container** — rounded card, subtle border, generous padding. The chemical mounts inside; the card is its frame.
- **Demo border state**:
  - Default — neutral border.
  - Active interaction — green-tinted border for 200ms after a click/edit (visual feedback that the demo is alive).
  - Demo-of-an-error — red-tinted border around an *intentional* error (stop 4).
- **Callout boxes** — a thin left border (3px), subtle background tint, small icon at top-left. Five callout types:
  - 💡 **Notice** — a thing to point out, low-stakes.
  - ⚠️ **Pitfall** — a real footgun.
  - 🤔 **Surprising** — feature whose behavior violates intuition.
  - 🔍 **Deep dive** — collapsible expansion for the curious.
  - 🧪 **In the Lab** — the demo / specimen this content describes.
- **Code panel** — fixed right-side, monospace, not soft-wrapped. Line numbers visible. Hover-highlight on lines (no click-to-edit; this is a viewer).
- **Sidebar** — three top-level groups (Topical / Ontology / Epistemology). Each group expandable. Active item shows the accent color.

### Animation

- **Sparingly.** A click-feedback on demo borders, a 200ms slide on sidebar collapses, a fade on tour-stop transitions. Nothing decorative.

### Typography

- **Body text** — serif, readable line length (~70ch).
- **Code** — `SF Mono`, `Fira Code`, or system monospace.
- **Headings** — sans-serif for distinction.
- **Inline code** — highlighted with a faint background tint.

## Code presentation

### Source loading

```typescript
// In a tour-stop file:
import source from './3-bond-ctor.tsx?raw';
import { Demo } from './3-bond-ctor';

export default {
  topical: 3,
  ontology: ['surprising/bond-constructor', 'entities/synthesis'],
  epistemology: ['the-lab', 'the-test-suite'],
  prerequisites: [1, 2],
  Demo,
  source,
  testCrossLink: 'tests/react/validation.test.tsx#L19-L40',
  chapter: 'topical/04-the-bond-constructor.md',
};
```

The tour-stop module declares its content; the framework component reads `source` at build time via Vite `?raw`. **The source displayed IS the source running.** No drift possible.

### Code annotation

The code panel can highlight specific lines on hover. Tour-stop content can include line references like `[L19-25]` that, when hovered or clicked in prose, scroll the code panel to and highlight those lines. This is the "look at lines 19-25" mechanism React.dev uses with `{5}` notation.

### Tabbed source views

Some catalogue sections show multiple equivalent forms (e.g., the `$()` callable's three forms in § II.7). The code panel can have tabs at the top to switch between source files for the same section's cases.

## Navigation

### Default page

The Lab opens to **§ 0.1 — What `$Chemistry` is.** A reader who lands at the root URL gets the framework's pitch first. From there, the catalogue is navigable in two modes: linear-by-section (Next button at the bottom of each entry) and direct-jump (sidebar). The sidebar mirrors the catalogue's hierarchy.

### URL routing

Each tour stop has a URL: `/topical/3-bond-constructor`, `/ontology/surprising/bond-constructor`, `/epistemology/the-lab`. Same content, three URLs depending on entry path. The active sidebar group indicates which axis the reader is navigating.

URL deep-linking is essential — a developer should be able to share a link to a specific demo.

### Page-by-page navigation

Each tour stop has previous/next buttons at the bottom. Topical stops link sequentially (0 → 1 → 2 → ...). Ontological pages don't have a "next" because they're for lookup, not reading-through. Epistemological pages have a sequence too (the-lab → the-test-suite → caveats → open-questions).

### In-page TOC

Long pages get an "On this page" sidebar (rightmost element above the code panel, or floating above the code panel). Anchors to sub-sections within a tour stop.

### Search

Top-right of the header. Searches tour-stop titles, headings, and demo source comments. Implementation: a JSON index built at compile time, fuzzy-matched in the browser. Optional in early sprints; can land later.

### Sidebar collapse

Each top-level group (Topical / Ontology / Epistemology) collapsible. Default state: Topical expanded, others collapsed.

## "Built front-to-back with `$Chemistry`" — how

This is the load-bearing constraint. The Lab is a `$Chemistry` application. This forces every framework feature to be exercised by the application that demonstrates it.

**Sidebar.** A `$Sidebar extends $Chemical` containing `$Group` chemicals containing `$TourStop` chemicals. The active stop is a reactive `$activeStop` prop on the root `$Lab` chemical; sidebar items read it to highlight.

**Content panel.** A `$ContentPanel` chemical that takes the `$activeStop` and renders the matching tour-stop file's `Demo`. This means selecting a sidebar item is a cross-chemical write (sidebar writes the root's `$activeStop`; content reads it). **The Lab's navigation IS a stop-11-style cross-chemical-write demonstration.**

**Code panel.** A `$CodePanel` chemical with three sub-chemicals: `$SyntaxView` (the highlighted code), `$LineHighlighter` (responds to hover events from prose), `$CrossLinks` (the test/chapter links). The `$LineHighlighter` is a particularization of an external syntax-highlighter library (we'll need to confirm `prism-react-renderer` integrates cleanly).

**Routing.** A custom `$Router` chemical (we won't use react-router) that listens to `popstate`, exposes `$path` reactively, drives the root `$Lab`'s `$activeStop`. Demonstrates async ctors (initial path resolution), particularization (wrapping `History` events as particles).

**Test cross-link.** Each tour-stop chemical has a `testCrossLink` prop. A `$TestLink` chemical opens an inline iframe to the test file (or links out — design decision deferred).

**Search.** If we land it, a `$Search` chemical with a `$query` reactive prop and a `$results` derived prop. Demonstrates derived state.

The reflexive nature is the *point*. A framework dev reading the Lab is reading a working `$Chemistry` application. Bugs in the framework would show up as bugs in the Lab. The Lab is therefore continuous integration-by-existence.

---

# Part 4 — The Multi-Sprint Program

The Lab as planned does not fit in one sprint. Doug asked us to plan the *program* of sprints. Here it is.

The program has **eight sprints** beyond this one, plus a parallel Libby track. Each sprint is named, scoped, and dependency-tracked.

### Sprint 28 (this sprint) — The Anatomy & The Lab Design

**Output:** This document, `tour.md` (extracted from Part 2 above), `site-architecture.md` (extracted from Part 3 above), and a `program.md` (Part 4 — this section). No code. Sign-off from Doug closes this sprint.

### Sprint 29 — The Lab's foundation

**Output:** A working Lab application with the three-pane layout, sidebar navigation, URL routing, and the first tour stop (Welcome) actually rendered. Built with `$Chemistry`. **Demonstrable at the end of the sprint** — Doug can open it in a browser.

**Stories:**
- L-29-1: project bootstrap (Vite + React + TypeScript, eat-our-own-dogfood structure)
- L-29-2: `$Lab`, `$Sidebar`, `$Group`, `$TourStop`, `$ContentPanel`, `$CodePanel` chemicals
- L-29-3: `$Router` chemical (popstate, history.pushState integration)
- L-29-4: Tour-stop file structure (the `tour-stop.tsx` shape with Vite `?raw`)
- L-29-5: Visual language base — color tokens, typography, callout components
- L-29-6: Stop 0 — Welcome / Reason for being (the only tour stop in this sprint)

### Sprint 30 — The introductory tour (stops 1–9)

**Output:** Tour stops 1 through 9 fully realized — Hello particle, Reactive props, Bond ctor, Validation errors, Composition, Polymorphism, Lifecycle, Async ctors, Render filters. Each stop has demo + code + chapter cross-link.

**Stories:** one per stop, each ~half a day. Plus the "callout components" library landing properly.

### Sprint 31 — Composition-deep (stops 10–15)

**Output:** Tour stops 10 through 15 — Two cookbooks, Cross-chemical writes, Particularization, `$()` three forms, Catalyst graph, Decorators.

### Sprint 32 — Polish (stops 16–20)

**Output:** § IX–§ XII — Reflection, Lifecycle internals, Cross-cutting helpers, Errors and Validation. Includes the error gallery (§ XII.3 — the canonical Doug-pointed-at one).

### Sprint 33 — Advanced (stops 21–25)

**Output:** Tour stops 21 through 25 — Synthesis internals, Reflection, `$promise`/`$await`, Test cross-link mechanism (real linking to test files), Caveats gallery.

### Sprint 34 — The open questions board

**Output:** Tour stop 26+ — the live AUDIT-comment board. Each open question becomes a Lab page with the source comment, the suspected fix, and an interactive demonstration of current behavior.

### Sprint 35 — Cross-cutting polish

**Output:** Search, in-page TOC, deep-linking, page-prev/next, sidebar polish, accessibility audit. The framework parts that aren't tied to specific catalogue sections.

### Sprint 36 — Documentation reflection

**Output:** Library content — every Lab tour stop has a corresponding chapter page. Cross-links bidirectional. The library is no longer "feels random"; every page corresponds to a Lab demonstration.

This is partially Libby's continuous track from sprint 29 onward, but sprint 36 is when we declare the library complete relative to the Lab.

### Parallel Libby track (sprints 29–36)

Libby writes the chapter content for each tour stop *as the tour stop lands*. By sprint 36, every Lab page has its companion library page. This is the inverse of the bench/wiki cross-linking convention: when a tour stop is built, its chapter is written; when a chapter is written, its tour stop is referenced.

### Dependency graph

```
sprint-28 (THIS — design)
    │
    ▼
sprint-29 (foundation)
    │
    ▼
sprint-30 (catalogue § 0–§ III; foundation through composition)
    │
    ▼
sprint-31 (composition-deep 10-15)
    │
    ├─▶ sprint-32 (polish 16-20) ──▶ sprint-33 (advanced 21-25)
    │                                       │
    │                                       ▼
    │                                  sprint-34 (open questions)
    │                                       │
    └────────────────────────────────────────┴──▶ sprint-35 (cross-cutting polish)
                                                    │
                                                    ▼
                                             sprint-36 (library reflection)
```

Sprints 30 → 31 must be sequential (each depends on stops from prior). Sprints 32 and 33 can be sequenced or run with overlap if we have parallel agent capacity. Sprint 35 is "the polish sprint" — happens after content is mostly in but before the program closes. Sprint 36 lags content by design — we reflect what's been built, not what's planned.

### Risk surfacing (Arthur's lens)

- **Scope creep on individual catalogue sections.** Each section is sized as ~half a day for its cases + prose. If any section blows out, the whole program slips. **Mitigation:** sprint 30's first section (§ II.1 `$Particle`) is the timing pilot; if it takes a day, we re-baseline.
- **Eat-our-own-dogfood may surface real framework bugs.** The Lab is a `$Chemistry` application. Building it will exercise paths the test suite doesn't. If we hit a framework bug, sprint timelines extend. **Mitigation:** build the framework's bug fix as part of the relevant sprint, with a note in the retro. Don't paper over.
- **The error gallery (§ XII.3) requires intentional errors.** Validation errors must be triggered visibly in the Lab without crashing the page. Need a wrapper chemical that catches errors from a child and renders the error message instead. Demonstrated by `$ErrorBoundary` style pattern. **Mitigation:** plan this in sprint 30 alongside § III.4 (the first `$check` demo) — if we can't build it cleanly, the design needs revisiting before sprint 32.
- **Performance.** A Lab page mounting many demos is a stress test. **Mitigation:** lazy-import per stop. Only the active stop's chemicals construct.
- **`prism-react-renderer` integration.** Already a dep in old app; should be straightforward but worth confirming in sprint 29.

---

# Part 5 — This Sprint's Verification Checklist

By the end of sprint-28, these artifacts exist:

- [ ] `library/chemistry/.../tour.md` — long, hierarchical tour curriculum (Part 2 above) committed to library
- [ ] `library/chemistry/.../site-architecture.md` — Lab architecture document (Part 3 above) committed to library
- [ ] `.claude/project/sprint-28/program.md` — multi-sprint program (Part 4 above)
- [ ] Doug sign-off on the program before sprint-29 begins
- [ ] Sprint-27 retro filed (carry-forward acknowledgment)
- [ ] Visual language defined enough that sprint-29 can implement it without further design discussion
- [ ] Catalogue's full Roman-numeral hierarchy (§ 0 through § XVI) populated with definitions and case lists
- [ ] Sprint retro at `reviews/retro.md`

No code lands this sprint. The sprint is design.

# Part 6 — Open questions for the team

Things to discuss before sign-off:

1. **Search — sprint 35 or earlier?** Search is a UX nicety that increases value disproportionately. Possible to land in sprint 29.
2. **The "tabbed source view" for stops with multiple equivalent forms** — does it complicate the architecture too much? Could be handled by side-by-side stops instead.
3. **Routing implementation: react-router or custom `$Router`?** The eat-our-own-dogfood constraint pushes toward custom. Cost: ~half a day. Benefit: the Lab demonstrates more `$Chemistry` features. Vote: custom.
4. **The error-message demos — a `$ErrorBoundary` chemical or an existing React boundary?** Eat-our-own-dogfood pushes toward `$ErrorBoundary`. Need to design that chemical.
5. **Should the Lab include a "playground"?** Vue and React both have one. The Lab being interactive may obviate this. My read: no playground; the Lab pages ARE the playground.
6. **Cross-linking the unit tests** — file:line URLs that open in the developer's editor? GitHub URLs? An iframe of the test file? Decision deferred to sprint 33.

---

# Part 7 — Sources (Doug asked for web research)

- [React docs — Quick Start](https://react.dev/learn) — multi-path entry (Quick Start / Tutorial / Reference / Installation), live editors via Sandpack, `<Intro>`/`<YouWillLearn>`/`<DiagramGroup>` callouts, line-highlight notation, progressive disclosure.
- [Vue.js docs — Introduction](https://vuejs.org/guide/introduction.html) — 9 top-level groups with deep nesting, tabbed Options/Composition API preferences, three learning paths (Tutorial / Guide / Examples / Playground), in-page TOC, "Pick Your Learning Path" entry hub.
- [Solid tutorial pattern (general)](https://www.solidjs.com/tutorial) — step-by-step lessons with editor + preview, navigation by lesson number, sequential.

These sources confirmed: progressive disclosure is the default, multiple entry paths are necessary, code-and-preview side-by-side is industry-standard, hierarchical navigation with collapsible sidebar is expected, and a separate playground is optional when the docs themselves are interactive enough.

The Lab adds: built-with-the-thing-it-documents (eat-our-own-dogfood) is a constraint we choose deliberately; visual semantics for "framework behaving as expected vs not" are our distinguishing concern.

---

# Sign-off

This document is the sprint-28 deliverable. It needs Doug's read and sign-off before sprint-29 begins. The sprint executes as design discussion, not code. The artifact IS the document.
