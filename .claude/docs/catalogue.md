---
kind: index
title: $Chemistry Reference Catalogue
status: evolving
---

# `$Chemistry` Reference Catalogue

This is the framework's reference manual. It is normative, not tutorial. Each section defines what a thing *is*, the rules it obeys, the cases that exhibit it in code, and the related sections.

The catalogue presents `$Chemistry` **bottom-up** — from the foundational symbols up through reactivity, scoping, synthesis, reflection, and lifecycle internals — and ends with the implementation modules. A reader at any entry sees: what the thing is (Definition), how it behaves (Rules), what it looks like in working code (Cases), and where else to look (See also).

Each section's full page lives under [`chemistry/sections/`][sections]. The catalogue itself is an index, not the content; entries link out.

## How to read this catalogue

- **Section numbers** use Roman numerals at the top, dotted decimals below (`§ III.3`). Cite them in prose to point a reader at a specific entry.
- **Each section page** has Definition, Rules, Cases, See also at minimum. Some carry Notes (out-of-spec context).
- **Cases ARE the Lab specimens.** A case in the catalogue corresponds 1:1 to a Lab specimen file. Same source, two presentations.
- **Voice is normative.** *"`$Particle` instances carry `$cid$`, `$symbol$`, `$type$`."* Not *"You'll learn about `$cid$` next."*

## § 0. Front matter

- **[§ 0.1 What `$Chemistry` is][s-0-1]** — the framework's reason for being; the bet against *The Good Parts*.
- **[§ 0.2 Conventions][s-0-2]** — the `$` membrane, the chemistry register, how to read this catalogue.
- **[§ 0.3 The dual constructor][s-0-3]** — every `$Chemical` has two constructors. Teaser; full treatment in § III.2 / § III.3.

## § I. Foundation

- **[§ I.1 Symbols][s-I-1]** — Symbol-keyed internal slots that hide framework state. Why symbols rather than `#private`.
- **[§ I.2 The `$` membrane][s-I-2]** — three audiences, three densities, the grammar.
- **[§ I.3 Types][s-I-3]** — the TypeScript vocabulary: `$Properties<T>`, `$Component<T>`, `$Element<T>`, `I<T>`.

## § II. Primitives — `$Particle`

- **[§ II.1 The class][s-II-1]** — definition, constructor, the fields (`$cid$`, `$symbol$`, `$type$`, `$phases$`, `$molecule$`, `$reaction$`, `$template$`, `$component$`, `$derivatives$`).
- **[§ II.2 `view()`][s-II-2]** — the render contract; purity expectation; the `$rendering$` flag.
- **[§ II.3 Identity][s-II-3]** — `$cid$`, `$symbol$`, `$type$`. Round-trip via `$$createSymbol$$` / `$$parseCid$$`.
- **[§ II.4 The lifecycle][s-II-4]** — six phases (`setup`, `mount`, `render`, `layout`, `effect`, `unmount`); `next(phase)`; `$resolve` propagation.
- **[§ II.5 The `particular` constructor argument][s-II-5]** — particularization via lift-and-reparent. Original untouched.
- **[§ II.6 `isParticle(x)`][s-II-6]** — the marker check; prototype-chain vs own-property.
- **[§ II.7 The `$()` callable][s-II-7]** — class form, instance form, string form (HTML catalogue lookup).
- **[§ II.8 Render filters][s-II-8]** — the cross-cutting interception chain. `$show` / `$hide`. `registerFilter()`.
- **[§ II.9 `$lift`][s-II-9]** — per-mount derivative creation via `Object.create(parent)`. Identity stamping.
- **[§ II.10 The Component getter][s-II-10]** — lift-path on `$Particle`; template-path override on `$Chemical`.

## § III. Composition — `$Chemical`

- **[§ III.1 The class][s-III-1]** — extends `$Particle`. Adds `$synthesis`, `$catalyst`, `$$parent$$`, `$lastProps$`, `$remove$`.
- **[§ III.2 The dual constructor][s-III-2]** — class constructor (creation time) vs binding constructor (render time).
- **[§ III.3 The binding constructor][s-III-3]** — the method named after the class. The single most surprising feature in `$Chemistry`.
- **[§ III.4 `$check(arg, ...types)`][s-III-4]** — runtime parameter validation invoked from inside a binding constructor.
- **[§ III.5 `$is<T>(ctor)`][s-III-5]** — type-only helper for `$check` signatures.
- **[§ III.6 `bind(chemical, parent?)`][s-III-6]** — static binding without JSX. Programmatic composition.
- **[§ III.7 Polymorphism without props][s-III-7]** — subclass property overrides change appearance.
- **[§ III.8 The catalyst graph][s-III-8]** — `$catalyst$`, `$$parent$$`, `$parent$` setter. Composed chemicals share a reaction system.
- **[§ III.9 The HTML catalogue][s-III-9]** — the lazy-memoized `$Html$` wrapper map. The `$('tagname')` form.

## § IV. Integration — `$Atom`

- **[§ IV.1 The class][s-IV-1]** — extends `$Chemical`. Constructor returns the class template. Singleton.

## § V. Reactivity

- **[§ V.1 Reactive properties][s-V-1]** — the `$x` convention; class field syntax; get/set accessor installation.
- **[§ V.2 Scope tracking][s-V-2]** — handlers wrapped via `augment` run inside `withScope`; reads/writes recorded.
- **[§ V.3 Cross-chemical writes][s-V-3]** — fan-out symmetry between in-scope and no-scope paths.
- **[§ V.4 In-place collection mutation][s-V-4]** — Map/Set/Array methods detected via `$symbolize` snapshot diff.
- **[§ V.5 `diffuse(chemical)`][s-V-5]** — the fan-out function in `scope.ts`.
- **[§ V.6 Decorators][s-V-6]** — `@inert()` (opt-out), `@reactive()` (opt-in).

## § VI. Lexical Scoping

- **[§ VI.1 Per-mount derivatives][s-VI-1]** — two mounts produce two derivatives via `Object.create()`.
- **[§ VI.2 The `$derivatives$` registry][s-VI-2]** — owned by the parent chemical; the framework's fan-out target.
- **[§ VI.3 The ownership gate][s-VI-3]** — a write only fans out from the chemical that *owns* its `$derivatives$` set.

## § VII. Particularization

- **[§ VII.1 The pattern][s-VII-1]** — `new $Particle(particular)`. Lift methods. Stamp marker. Reparent.
- **[§ VII.2 `instanceof` preservation][s-VII-2]** — the carrier passes `instanceof OriginalType`.
- **[§ VII.3 The `I<T>` type][s-VII-3]** — `I<$Error> & I<Error>` intersection naming.
- **[§ VII.4 Reactivity machinery on particularized carriers][s-VII-4]** — every particle allocates `$Molecule` and `$Reaction`.

## § VIII. Synthesis

- **[§ VIII.1 `$Synthesis` class][s-VIII-1]** — per-chemical bond-ctor orchestrator.
- **[§ VIII.2 `$SynthesisContext`][s-VIII-2]** — per-call mutable state.
- **[§ VIII.3 `$Reactants`][s-VIII-3]** — the information-hiding wrapper passed to the bond ctor.
- **[§ VIII.4 Parameter parsing][s-VIII-4]** — regex-based parsing of the bond ctor's parameter list.
- **[§ VIII.5 JSX child handling][s-VIII-5]** — strings, arrays, nested chemicals, spread args.
- **[§ VIII.6 The catalyst graph wiring][s-VIII-6]** — how `$Synthesis` calls `$bind` on child Components.

## § IX. Reflection (property classification)

- **[§ IX.1 `$Reflection` class][s-IX-1]** — per-property classifier; decorator registries.
- **[§ IX.2 `$Reflection.isReactive(name)`][s-IX-2]** — name predicate; the `_` prefix and `constructor` exclusions.
- **[§ IX.3 `$Reflection.isSpecial(name)`][s-IX-3]** — the `$x` shape predicate; the `length >= 2` rule.

## § X. Lifecycle Internals

- **[§ X.1 The phase queue][s-X-1]** — `$phases$` Map; `next(phase)` returns a Promise resolved by `$resolve(phase)`.
- **[§ X.2 `$resolve` propagation][s-X-2]** — walks up the prototype chain.
- **[§ X.3 Async bond ctors][s-X-3]** — `async $Foo()`; `$construction` promise; `Promise.allSettled`.
- **[§ X.4 The render loop][s-X-4]** — `$apply` → `$bond` → filter chain → `view()` → augment → diff → maybe `$update$()`.

## § XI. Cross-cutting helpers

- **[§ XI.1 `$promise(executor)`][s-XI-1]** — cancellable promises with chained `then`.
- **[§ XI.2 `$await(promise)`][s-XI-2]** — synchronous read of a settled `$promise`'s `result`.
- **[§ XI.3 `$symbolize(value)`][s-XI-3]** — deterministic serialization for snapshot comparison.
- **[§ XI.4 `$literalize(symbol)`][s-XI-4]** — inverse of `$symbolize`.

## § XII. Errors and Validation

- **[§ XII.1 `$check(arg, ...types)`][s-XII-1]** — the validation entry point.
- **[§ XII.2 `$ParamValidation`][s-XII-2]** — the module-level singleton.
- **[§ XII.3 The error message format][s-XII-3]** — multi-line, with the error gallery.

## § XIII. Caveats (resolved)

- **[§ XIII.1 Cross-chemical handler fan-out][s-XIII-1]** — sprint-24. `scope.finalize` was missing derivative fan-out.
- **[§ XIII.2 Single-letter `$<x>` props were inert][s-XIII-2]** — sprint-24. `isSpecial` required `length > 2`; fixed to `>= 2`.
- **[§ XIII.3 Particle allocates reactivity machinery][s-XIII-3]** — sprint-27. Every particle now allocates `$Molecule` and `$Reaction`.
- **[§ XIII.4 Particularization preserves prototype][s-XIII-4]** — original object's prototype chain is left untouched.

## § XIV. Provisional behaviors

- **[§ XIV.1 `parseBondConstructor` regex limits][s-XIV-1]** — arrow ctors / default values / destructured params break parsing.
- **[§ XIV.2 `isViewSymbol` unreachable branch][s-XIV-2]** — the `$$Chemistry.` prefix check never matches.
- **[§ XIV.3 `$isChemicalBase$` inherited resolution][s-XIV-3]** — walk halts via inherited rather than own.
- **[§ XIV.4 `$Reagent` reachability][s-XIV-4]** — open question whether non-`$` user methods are ever wrapped.

## § XV. Implementation modules

- **[§ XV.1 `src/abstraction/particle.ts`][s-XV-1]** — particle, lift, render filters, isParticle.
- **[§ XV.2 `src/abstraction/chemical.ts`][s-XV-2]** — chemical, synthesis, $() callable, $check, bind.
- **[§ XV.3 `src/abstraction/atom.ts`][s-XV-3]** — atom singleton.
- **[§ XV.4 `src/abstraction/bond.ts`][s-XV-4]** — bond, reagent, reflection, decorators, activate.
- **[§ XV.5 `src/abstraction/molecule.ts`][s-XV-5]** — bond graph collection.
- **[§ XV.6 `src/abstraction/reaction.ts`][s-XV-6]** — per-chemical reaction unit.
- **[§ XV.7 `src/abstraction/element.ts`][s-XV-7]** — React FC type definitions.
- **[§ XV.8 `src/implementation/scope.ts`][s-XV-8]** — scope tracking, diffuse.
- **[§ XV.9 `src/implementation/symbols.ts`][s-XV-9]** — every symbol.
- **[§ XV.10 `src/implementation/types.ts`][s-XV-10]** — TypeScript vocabulary.
- **[§ XV.11 `src/implementation/augment.ts`][s-XV-11]** — handler wrapping.
- **[§ XV.12 `src/implementation/reconcile.ts`][s-XV-12]** — view diff.
- **[§ XV.13 `src/implementation/walk.ts`][s-XV-13]** — tree traversal.
- **[§ XV.14 `src/implementation/representation.ts`][s-XV-14]** — `$symbolize` / `$literalize`.
- **[§ XV.15 `src/implementation/promise.ts`][s-XV-15]** — `$promise`, `$await`.

## § XVI. Why `$Chemistry`

- **[§ XVI Why `$Chemistry`][s-XVI]** — capstone. Re-states the bet against *The Good Parts*; the four-question pitch; closes the loop on § 0.

---

## Alternate views

The catalogue is the *primary* organization. Three secondary views exist for cross-axis lookup:

- **[Ontology][ontology]** — what `$Chemistry` *is*, organized as entities / relationships / concepts / surprising.
- **[Epistemology][epistemology]** — how we *know* it works: the Lab, the test suite, caveats, open questions.
- **[Topical progression][topical]** — a narrative arc through the framework. Tutorial-shaped; complementary to the catalogue's normative voice.

Older per-class deep-dive **books** (e.g. [`$Particle` book][book-particle]) remain a *complementary* reference — they collect related sections into a long-form reading. The catalogue is the source of truth; books are supplements.

<!-- citations -->
[sections]: ./chemistry/sections/

[s-0-1]: ./chemistry/sections/00-front-matter/01-what-chemistry-is.md
[s-0-2]: ./chemistry/sections/00-front-matter/02-conventions.md
[s-0-3]: ./chemistry/sections/00-front-matter/03-the-dual-constructor.md

[s-I-1]: ./chemistry/sections/I-foundation/01-symbols.md
[s-I-2]: ./chemistry/sections/I-foundation/02-the-dollar-membrane.md
[s-I-3]: ./chemistry/sections/I-foundation/03-types.md

[s-II-1]: ./chemistry/sections/II-primitives/01-the-class.md
[s-II-2]: ./chemistry/sections/II-primitives/02-view.md
[s-II-3]: ./chemistry/sections/II-primitives/03-identity.md
[s-II-4]: ./chemistry/sections/II-primitives/04-lifecycle.md
[s-II-5]: ./chemistry/sections/II-primitives/05-particular-argument.md
[s-II-6]: ./chemistry/sections/II-primitives/06-isparticle.md
[s-II-7]: ./chemistry/sections/II-primitives/07-dollar-callable.md
[s-II-8]: ./chemistry/sections/II-primitives/08-render-filters.md
[s-II-9]: ./chemistry/sections/II-primitives/09-lift.md
[s-II-10]: ./chemistry/sections/II-primitives/10-component-getter.md

[s-III-1]: ./chemistry/sections/III-composition/01-the-class.md
[s-III-2]: ./chemistry/sections/III-composition/02-dual-constructor.md
[s-III-3]: ./chemistry/sections/III-composition/03-binding-constructor.md
[s-III-4]: ./chemistry/sections/III-composition/04-check.md
[s-III-5]: ./chemistry/sections/III-composition/05-is.md
[s-III-6]: ./chemistry/sections/III-composition/06-bind.md
[s-III-7]: ./chemistry/sections/III-composition/07-polymorphism.md
[s-III-8]: ./chemistry/sections/III-composition/08-catalyst-graph.md
[s-III-9]: ./chemistry/sections/III-composition/09-html-catalogue.md

[s-IV-1]: ./chemistry/sections/IV-integration/01-the-class.md

[s-V-1]: ./chemistry/sections/V-reactivity/01-reactive-properties.md
[s-V-2]: ./chemistry/sections/V-reactivity/02-scope-tracking.md
[s-V-3]: ./chemistry/sections/V-reactivity/03-cross-chemical-writes.md
[s-V-4]: ./chemistry/sections/V-reactivity/04-collection-mutation.md
[s-V-5]: ./chemistry/sections/V-reactivity/05-diffuse.md
[s-V-6]: ./chemistry/sections/V-reactivity/06-decorators.md

[s-VI-1]: ./chemistry/sections/VI-lexical-scoping/01-per-mount-derivatives.md
[s-VI-2]: ./chemistry/sections/VI-lexical-scoping/02-derivatives-registry.md
[s-VI-3]: ./chemistry/sections/VI-lexical-scoping/03-ownership-gate.md

[s-VII-1]: ./chemistry/sections/VII-particularization/01-the-pattern.md
[s-VII-2]: ./chemistry/sections/VII-particularization/02-instanceof-preservation.md
[s-VII-3]: ./chemistry/sections/VII-particularization/03-i-of-t.md
[s-VII-4]: ./chemistry/sections/VII-particularization/04-reactivity-on-carriers.md

[s-VIII-1]: ./chemistry/sections/VIII-synthesis/01-synthesis-class.md
[s-VIII-2]: ./chemistry/sections/VIII-synthesis/02-synthesis-context.md
[s-VIII-3]: ./chemistry/sections/VIII-synthesis/03-reactants.md
[s-VIII-4]: ./chemistry/sections/VIII-synthesis/04-parameter-parsing.md
[s-VIII-5]: ./chemistry/sections/VIII-synthesis/05-jsx-child-handling.md
[s-VIII-6]: ./chemistry/sections/VIII-synthesis/06-catalyst-wiring.md

[s-IX-1]: ./chemistry/sections/IX-reflection/01-reflection-class.md
[s-IX-2]: ./chemistry/sections/IX-reflection/02-isreactive.md
[s-IX-3]: ./chemistry/sections/IX-reflection/03-isspecial.md

[s-X-1]: ./chemistry/sections/X-lifecycle-internals/01-phase-queue.md
[s-X-2]: ./chemistry/sections/X-lifecycle-internals/02-resolve-propagation.md
[s-X-3]: ./chemistry/sections/X-lifecycle-internals/03-async-bond-ctors.md
[s-X-4]: ./chemistry/sections/X-lifecycle-internals/04-render-loop.md

[s-XI-1]: ./chemistry/sections/XI-cross-cutting/01-promise.md
[s-XI-2]: ./chemistry/sections/XI-cross-cutting/02-await.md
[s-XI-3]: ./chemistry/sections/XI-cross-cutting/03-symbolize.md
[s-XI-4]: ./chemistry/sections/XI-cross-cutting/04-literalize.md

[s-XII-1]: ./chemistry/sections/XII-errors/01-check.md
[s-XII-2]: ./chemistry/sections/XII-errors/02-param-validation.md
[s-XII-3]: ./chemistry/sections/XII-errors/03-error-message-format.md

[s-XIII-1]: ./chemistry/sections/XIII-caveats/01-cross-chemical-fanout.md
[s-XIII-2]: ./chemistry/sections/XIII-caveats/02-single-letter-props.md
[s-XIII-3]: ./chemistry/sections/XIII-caveats/03-particle-allocates-reactivity.md
[s-XIII-4]: ./chemistry/sections/XIII-caveats/04-particularization-preserves-prototype.md

[s-XIV-1]: ./chemistry/sections/XIV-provisional/01-bond-ctor-regex.md
[s-XIV-2]: ./chemistry/sections/XIV-provisional/02-isview-unreachable.md
[s-XIV-3]: ./chemistry/sections/XIV-provisional/03-ischemicalbase-inherited.md
[s-XIV-4]: ./chemistry/sections/XIV-provisional/04-reagent-reachability.md

[s-XV-1]: ./chemistry/sections/XV-implementation/01-particle-ts.md
[s-XV-2]: ./chemistry/sections/XV-implementation/02-chemical-ts.md
[s-XV-3]: ./chemistry/sections/XV-implementation/03-atom-ts.md
[s-XV-4]: ./chemistry/sections/XV-implementation/04-bond-ts.md
[s-XV-5]: ./chemistry/sections/XV-implementation/05-molecule-ts.md
[s-XV-6]: ./chemistry/sections/XV-implementation/06-reaction-ts.md
[s-XV-7]: ./chemistry/sections/XV-implementation/07-element-ts.md
[s-XV-8]: ./chemistry/sections/XV-implementation/08-scope-ts.md
[s-XV-9]: ./chemistry/sections/XV-implementation/09-symbols-ts.md
[s-XV-10]: ./chemistry/sections/XV-implementation/10-types-ts.md
[s-XV-11]: ./chemistry/sections/XV-implementation/11-augment-ts.md
[s-XV-12]: ./chemistry/sections/XV-implementation/12-reconcile-ts.md
[s-XV-13]: ./chemistry/sections/XV-implementation/13-walk-ts.md
[s-XV-14]: ./chemistry/sections/XV-implementation/14-representation-ts.md
[s-XV-15]: ./chemistry/sections/XV-implementation/15-promise-ts.md

[s-XVI]: ./chemistry/sections/XVI-why-chemistry/index.md

[ontology]: ./chemistry/ontology/index.md
[epistemology]: ./chemistry/epistemology/index.md
[topical]: ./chemistry/topical/index.md
[book-particle]: ./chemistry/books/particle/index.md
