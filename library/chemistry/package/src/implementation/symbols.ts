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

export const $catalyst$ = Symbol("$Chemical.catalyst");
export const $isCatalyst$ = Symbol("$Chemical.isCatalyst");
export const $isChemicalBase$ = Symbol("$Chemical.isChemicalBase");

// Perspectives — alternative named views onto a chemical.
// $perspective$  — the chemical's currently-active Perspective (per instance).
// $perspectives$ — the static registry array of revealed perspectives, filed
//                  on the host chemical class (own property, not inherited).
// $isPerspective$ — static marker stamped on Perspective classes so the host
//                  walk can skip them (read via hasOwnProperty; not inherited).
export const $perspective$ = Symbol("$Chemical.perspective");
export const $perspectives$ = Symbol("$Chemical.perspectives");
export const $isPerspective$ = Symbol("$Perspective.isPerspective");

// Vertical perspective — `look` walks an instance up/down its OWN prototype
// chain, rendering it through any ancestor's `view`.
// $activeView$ — the view FUNCTION this instance currently renders through
//                (undefined = render through its own most-derived class).
// $renderView$ — internal render entry: $lift calls this instead of view(),
//                so the active view is consulted without disturbing user
//                view() overrides.
export const $activeView$ = Symbol("$Particle.activeView");
export const $renderView$ = Symbol("$Particle.renderView");
// $viewLevel$ — cursor into the instance's chain of user view-levels (0 =
// most-derived). Symbol-keyed, not #private: the template render path mounts
// derivatives via Object.create(template), which never run the constructor —
// a #private field would be unbranded there and throw. Symbols ride through.
export const $viewLevel$ = Symbol("$Particle.viewLevel");
// $isViewBase$ — OWN-property marker stamped on each framework class whose
// `view` is structural (renders toString/children) rather than a semantic
// perspective: $Particle and $Chemical. `look` skips these so it bottoms out
// at the highest USER view-level. Own-property (not inherited) so user
// subclasses don't match.
export const $isViewBase$ = Symbol("$Particle.isViewBase");
export const $lifted$ = Symbol("$Particle.lifted");
export const $construction$ = Symbol("$Particle.construction");
export const $formRan$ = Symbol("$Particle.formRan");
export const $formPromise$ = Symbol("$Particle.formPromise");
export const $renderFilters$ = Symbol("$Particle.renderFilters");
export const $deriveInit$ = Symbol("$Particle.deriveInit");
export const $particleMarker$ = Symbol("$Particle.marker");
export const $devError$ = Symbol("$Particle.devError");

// $Atom symbols
export const $formed$ = Symbol("$Atom.formed");
export const $formation$ = Symbol("$Atom.formation");
export const $remembered$ = Symbol("$Atom.remembered");

// $promise symbols
export const $cancelled$ = Symbol("$promise.cancelled");

// $handler symbols — augment.ts wraps user event handlers (onClick etc.) and
// tags each wrapper with a reference to the original. reconcile.ts reads the
// tag so two wrappers of the same original compare equal across renders.
export const $handlerOriginal$ = Symbol("$handler.original");

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
