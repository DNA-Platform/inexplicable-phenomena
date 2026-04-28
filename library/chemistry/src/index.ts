// =============================================================================
// @dna-platform/chemistry
//
// Component-developer entry point. The clean surface for writing chemicals
// and components. Framework-internal machinery (bonds, reactions, molecules,
// orchestrators, render-filter registry, raw symbols) lives at
// `@dna-platform/chemistry/symbolic` for framework developers and extenders.
// =============================================================================

// Core renderable classes
export { $Particle, Particle, $lift, $phaseOrder } from './abstraction/particle';
export { $Chemical, Chemical, bind } from './abstraction/chemical';
export { $Atom } from './abstraction/atom';

// The dollar callable — framework's main entry point
export { $ } from './abstraction/chemical';

// Module-discovery utilities
export { $lookup, $load } from './framework/load';

// Reactive-property decorators
export { inert, reactive } from './abstraction/bond';

// Bond-constructor validation helpers (used inside user bond ctors)
export { $check, $is } from './abstraction/chemical';

// Serialization
export { $Represent, $symbolize, $literalize } from './implementation/representation';

// Async helpers
export { $promise, $await } from './implementation/promise';

// Public types: Component<T>, Element<T>, $Component<T>, $Element<T>,
// $Phase, $Promise, $Properties, $Component, $Bound, etc.
export * from './implementation/types';
