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
export { $Formula } from './abstraction/formula';
export { $Exception } from './abstraction/exception';
export { $exceptions } from './implementation/dev';
export { $Atom } from './abstraction/atom';

// The dollar callable
export { $ } from './abstraction/chemical';

// The block — what a bond constructor is handed for prose, and an iterator over
// what was written in it
export { $Block } from './abstraction/chemical';
export type { $Written } from './abstraction/chemical';

// Module-discovery utilities
export { $lookup, $load } from './framework/load';

// Property and view attributes
export { inert, reactive, look } from './abstraction/bond';

// Members a chemical implements, carried as symbols so they cost no name
export { cache, children, style, resolved } from './implementation/symbols';

// Styling — the resolved styled-components callable, so nothing downstream
// writes the dual-shape import again.
export { styled, select } from './abstraction/styled';
export { hydration } from './implementation/hydration';

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
    $Function, $Html, $HtmlTag, $Rep,
} from './implementation/types';
