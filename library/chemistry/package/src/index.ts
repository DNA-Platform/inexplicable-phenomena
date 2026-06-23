// =============================================================================
// @dna-platform/chemistry
//
// Component-developer entry point. Clean surface for writing chemicals and
// components. Framework-internal machinery lives at
// `@dna-platform/chemistry/symbolic`.
// =============================================================================

// Renderable classes
export { $Particle } from './abstraction/particle';
export { $Chemical } from './abstraction/chemical';
export { $Atom } from './abstraction/atom';

// The dollar callable
export { $ } from './abstraction/chemical';

// Module-discovery utilities
export { $lookup, $load } from './framework/load';

// Reactive-property decorators
export { inert, reactive } from './abstraction/bond';

// Bond-constructor validation helpers (used inside user bond ctors)
export { $check, $is } from './abstraction/chemical';

// Serialization helpers (function form; the $Represent class is in /symbolic)
export { $symbolize, $literalize } from './implementation/representation';

// Async helpers
export { $promise, $await } from './implementation/promise';

// Public types — curated. Internal types ($SymbolFeature, $Particular,
// $MethodComponent, $Bound, $ParameterType) live in /symbolic.
export type {
    Component, Element, $Component, $Element,
} from './abstraction/element';
export type {
    I,
    Constructor, Type, Typeof, PrimitiveType, TypeofType,
    $Phase, $Promise, $Props, $Properties,
    $Function, $Html, $Rep,
} from './implementation/types';
