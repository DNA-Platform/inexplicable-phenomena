// Particle
export const $cid$ = Symbol("$Particle.cid");
export const $symbol$ = Symbol("$Particle.symbol");
export const $type$ = Symbol("$Particle.type");
export const $prototype$ = Symbol("$Particle.prototype");
export const $template$ = Symbol("$Particle.template");
export const $isTemplate$ = Symbol("$Particle.isTemplate");
export const $children$ = Symbol("$Particle.children");
export const $apply$ = Symbol("$Particle.apply");
export const $bond$ = Symbol("$Particle.bond");
export const $derived$ = Symbol("$Particle.derived");
export const $phase$ = Symbol("$Particle.phase");
export const $phases$ = Symbol("$Particle.phases");
export const $resolve$ = Symbol("$Particle.resolve");
export const $update$ = Symbol("$Particle.update");
export const $viewCache$ = Symbol("$Particle.viewCache");
export const $rendering$ = Symbol("$Particle.rendering");
export const $$template$$ = Symbol("$Particle.static.template");
export const $$getNextCid$$ = Symbol("$Particle.static.getNextCid");
export const $$createSymbol$$ = Symbol("$Particle.static.createSymbol");
export const $$isSymbol$$ = Symbol("$Particle.static.isSymbol");
export const $$parseCid$$ = Symbol("$Particle.static.parseCid");

// $Chemical
// Members a USER writes, carried as symbols so they cost no name in the user's
// own vocabulary. A plain name is spent only on what every chemical has.
export const cache = Symbol("$Chemical.cache");

// The children a chemical was given. A SYMBOL rather than a property, so that a view
// reaches for its BLOCK and never for the raw children it happens to have been handed.
export const children = $children$;

export const $remove$ = Symbol("$Chemical.remove");
export const $molecule$ = Symbol("$Chemical.molecule");
export const $reaction$ = Symbol("$Chemical.reaction");
export const $isBound$ = Symbol("$Chemical.bound");
export const $$parent$$ = Symbol("$Chemical.parent");
export const $parent$ = Symbol("$Chemical.$parent");
export const $synthesis$ = Symbol("$Chemical.synthesis");
export const $component$ = Symbol("$Chemical.component");
export const $props$ = Symbol("$Chemical.props");
export const $lastProps$ = Symbol("$Chemical.lastProps");
export const $resolveComponent$ = Symbol("$Particle.resolveComponent");
export const $destroy$ = Symbol("$Chemical.destroy");
export const $destroyed$ = Symbol("$Chemical.destroyed");
export const $backing$ = Symbol("$Chemical.backing");
export const $watched$ = Symbol("$Chemical.watched");

// THE FACADE A CHEMICAL IS WEARING, held on the instance rather than remade per
// render — because a facade that exists only inside an element cannot be handed
// to anybody, and the whole point of one is that callers hold IT rather than
// what it stands for.
export const $facade$ = Symbol("$Chemical.facade");

// WHAT A CLASS DECLARES, asked of the class rather than imported — so the render
// walk can read a chemical's facades without naming the abstraction layer.
export const $facades$ = Symbol("$Chemical.facades");

export const $catalyst$ = Symbol("$Chemical.catalyst");
export const $isCatalyst$ = Symbol("$Chemical.isCatalyst");
export const $isChemicalBase$ = Symbol("$Chemical.isChemicalBase");

// $renderView$ — internal render entry: $lift calls this instead of view(),
// so the drawing goes through frame() without disturbing user view() overrides.
export const $renderView$ = Symbol("$Particle.renderView");

// $views$ — the instance's view dictionary, keyed by position AND by name.
export const $views$ = Symbol("$Particle.views");

// A look is `view` with a run of `$` in front of it: `view` is 0, `$view` is 1,
// `$$view` is 2. The molecule reads this too, so no member of the series is
// ever bonded over.
export const looks = /^\$*view$/;

// $Formula — a formula stands for something else, and the framework replaces it
// with what it symbolizes.
// $cache$   — the catalogue of specimens a formula branch stands for. Held per
//             class, reached from any instance, so nothing is allocated per
//             instance and every instance of a class consults the same cache.
// $formula$ — the marker AND the resolver in one member. The render walk reads
//             it off a component's chemical: a property lookup for anything that
//             is not a formula, and the substitution itself for anything that is.
//             It is a member rather than an import so the walk needs no module.
export const $cache$ = Symbol("$Formula.cache");
export const $formula$ = Symbol("$Formula.formula");
export const $keyOf$ = Symbol("$Formula.keyOf");
export const $isFormulaBase$ = Symbol("$Formula.base");
export const $lifted$ = Symbol("$Particle.lifted");
export const $construction$ = Symbol("$Particle.construction");
export const $formRan$ = Symbol("$Particle.formRan");
export const $formPromise$ = Symbol("$Particle.formPromise");
export const $renderFilters$ = Symbol("$Particle.renderFilters");
export const $deriveInit$ = Symbol("$Particle.deriveInit");
export const $particleMarker$ = Symbol("$Particle.marker");
export const $devError$ = Symbol("$Particle.devError");
export const $devException$ = Symbol("$Particle.devException");

// The representative — `$` as an argument, and the scoping it selects.
// $registry$  — the catalogue a chemical holds as a scope. Read through the
//               prototype chain, so a per-mount derivative sees its template's.
// $reference$ — a component's own key, unique per component, so two components
//               of one class are distinct entries in a catalogue.
export const $registry$ = Symbol("$Chemical.registry");
export const $reference$ = Symbol("$Component.reference");

// $Atom symbols
export const $formed$ = Symbol("$Atom.formed");
export const $formation$ = Symbol("$Atom.formation");
export const $remembered$ = Symbol("$Atom.remembered");
export const $reinit$ = Symbol("$Atom.reinit");

// $promise symbols
export const $cancelled$ = Symbol("$promise.cancelled");

// The user's own function behind a wrapper augment.ts installed — an event
// handler, or an assignment. reconcile.ts reads it so two wrappers standing for
// one original compare equal across renders, which they never would by identity
// because a view builds its closures fresh every time.
export const $original$ = Symbol("$augment.original");

// What an assignment was resolved against: the chemical whose view wrote it, and
// the member path read out of the arrow's own source. Carried on the wrapper so
// the child can tell a resolved assignment from an arrow nobody rewrote.
export const $assigned$ = Symbol("$augment.assigned");

// $Reference
export const $ref$ = Symbol("$Referent.ref");
export const $roles$ = Symbol("$Referent.roles");
export const $role$ = Symbol("$Referent.role");

// $SubjectiveRep symbols
export const $of$ = Symbol("$ObjectiveRep.of");
export const $key$ = Symbol("$ObjectiveRep.key");
export const $name$ = Symbol("$ObjectiveRep.name");
export const $type$$ = Symbol("$ObjectiveRep.type");
export const $prototype$$ = Symbol("$ObjectiveRep.prototype");
export const $canonical$ = Symbol("$ObjectiveRep.canonical");
export const $members$ = Symbol("$ObjectiveRep.members");
export const $membersOwn$ = Symbol("$ObjectiveRep.propertiesOwn");
export const $membersMap$ = Symbol("$ObjectiveRep.propertiesMap");
export const $parameters$ = Symbol("$ObjectiveRep.parameters");
export const $constructor$ = Symbol("$ObjectiveRep.constructor");
export const $value$ = Symbol("$ObjectiveRep.value");
export const $method$ = Symbol("$ObjectiveRep.method");
export const $getter$ = Symbol("$ObjectiveRep.getter");
export const $setter$ = Symbol("$ObjectiveRep.setter");

// $ObjectiveRep symbols
export const $literal$ = Symbol("$ObjectiveRep.literal")
export const $typeof$ = Symbol("$ObjectiveRep.typeof");
export const $functionInfo$ = Symbol("$ObjectiveRep.functionInfo");
