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
export const $decorators$ = Symbol("$Chemical.decorators");
export const $molecule$ = Symbol("$Chemical.molecule");
export const $reaction$ = Symbol("$Chemical.reaction");
export const $$reaction$$ = Symbol("$Chemical.$reaction");
export const $isBound$ = Symbol("$Chemical.bound");
export const $$parent$$ = Symbol("$Chemical.parent");
export const $parent$ = Symbol("$Chemical.$parent");
export const $synthesis$ = Symbol("$Chemical.synthesis");
export const $component$ = Symbol("$Chemical.component");
export const $props$ = Symbol("$Chemical.props");
export const $lastProps$ = Symbol("$Chemical.lastProps");
export const $render$ = Symbol("$Chemical.render");
export const $createComponent$ = Symbol("$Chemical.createComponent");
export const $resolveComponent$ = Symbol("$Particle.resolveComponent");
export const $destroy$ = Symbol("$Chemical.destroy");
export const $destroyed$ = Symbol("$Chemical.destroyed");
export const $backing$ = Symbol("$Chemical.backing");

export const $catalyst$ = Symbol("$Chemical.catalyst");
export const $isCatalyst$ = Symbol("$Chemical.isCatalyst");
export const $isChemicalBase$ = Symbol("$Chemical.isChemicalBase");
export const $lifted$ = Symbol("$Particle.lifted");
export const $derivatives$ = Symbol("$Particle.derivatives");
export const $construction$ = Symbol("$Particle.construction");
export const $bondCtorRan$ = Symbol("$Chemical.bondCtorRan");
export const $renderFilters$ = Symbol("$Particle.renderFilters");
export const $particleMarker$ = Symbol("$Particle.marker");

// $Atom symbols
export const $formed$ = Symbol("$Atom.formed");
export const $formation$ = Symbol("$Atom.formation");
export const $remembered$ = Symbol("$Atom.remembered");

// $Component$ symbols
export const $transient$ = Symbol("$Component$.transient");

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
