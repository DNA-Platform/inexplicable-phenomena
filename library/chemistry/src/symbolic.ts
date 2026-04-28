// =============================================================================
// @dna-platform/chemistry/symbolic
//
// Framework-developer entry point. Exports the symbol-keyed innards and the
// engine classes that component developers don't normally touch:
//
//   - Bond machinery: $Bond, $Reagent, $Reflection, $Molecule, $Reaction
//   - Orchestration: $Synthesis, $SynthesisContext,
//                    $Reactants, $BondParameter
//   - Validation: $ParamValidation
//   - Wrappers: $Function$, $Html$, $Include, $wrap
//   - Reactivity scope: $Scope, withScope
//   - Lift / phase order (framework lifecycle internals)
//   - Serialization implementation: $Represent
//   - Render-filter extensibility: registerFilter, applyRenderFilters
//   - Internal types: $SymbolFeature, $Particular, $MethodComponent, $Bound, $ParameterType
//   - Lifecycle and graph symbols (re-exported from implementation/symbols)
//
// Component developers should import from `@dna-platform/chemistry` (root).
// =============================================================================

// Bond machinery
export { $Bond, $Reagent, $Reflection } from './abstraction/bond';
export { $Molecule } from './abstraction/molecule';
export { $Reaction } from './abstraction/reaction';

// Orchestration + validation
export {
    $Synthesis, $SynthesisContext, $Reactants,
    $ParamValidation, $paramValidation,
    $Function$, $Html$, $Include,
    $wrap
} from './abstraction/chemical';
export type { $BondParameter } from './abstraction/chemical';

// Lifecycle internals
export { $lift, $phaseOrder, isParticle } from './abstraction/particle';

// Serialization implementation
export { $Represent } from './implementation/representation';

// Reactivity scope
export { $Scope, withScope } from './implementation/scope';

// Render-filter extensibility
export {
    registerFilter,
    applyRenderFilters
} from './abstraction/particle';
export type { $RenderFilter } from './abstraction/particle';

// Internal types
export type {
    $SymbolFeature, $Particular, $MethodComponent, $ParameterType,
    primitives, primitiveTypes, typeofTypes,
} from './implementation/types';
export type { $Bound } from './implementation/types';

// All framework-internal symbols. Framework devs use these to read/write the
// machinery directly; component devs never touch them.
export * from './implementation/symbols';
