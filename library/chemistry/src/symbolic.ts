// =============================================================================
// @dna-platform/chemistry/symbolic
//
// Framework-developer entry point. Exports the symbol-keyed innards and the
// engine classes that component developers don't normally touch:
//
//   - Bond machinery: $Bond, $Reagent, $Reflection, $Molecule, $Reaction
//   - Orchestration: $BondOrchestrator, $BondOrchestrationContext,
//                    $BondArguments, $BondParameter
//   - Validation: $ParamValidation
//   - Wrappers: $Function$, $Html$, $Include, $wrap
//   - Reactivity scope: Scope, withScope
//   - Framework extension: registerFilter, applyRenderFilters, $RenderFilter
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
    $BondOrchestrator, $BondOrchestrationContext, $BondArguments,
    $ParamValidation, $paramValidation,
    $Function$, $Html$, $Include,
    $wrap
} from './abstraction/chemical';
export type { $BondParameter } from './abstraction/chemical';

// Reactivity scope
export { Scope, withScope } from './implementation/scope';

// Render-filter extensibility
export {
    registerFilter,
    applyRenderFilters
} from './abstraction/particle';
export type { $RenderFilter } from './abstraction/particle';

// All framework-internal symbols. Framework devs use these to read/write the
// machinery directly; component devs never touch them.
export * from './implementation/symbols';
