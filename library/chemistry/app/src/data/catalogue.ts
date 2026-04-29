// The $Chemistry catalogue's structural data — 16 Roman-numeral groups and their
// subsections. The sidebar iterates over this; section pages key into this for
// metadata. Section IDs use the URL-friendly form `0.1`, `I.2`, `III.3`.
//
// The order here is the canonical reading order of the catalogue. Numbers are
// preserved as strings (Roman + decimal) to match the catalogue's prose voice.

export type Section = {
    id: string;
    title: string;
    cases: string[];
};

export type Group = {
    roman: string;
    title: string;
    sections: Section[];
};

export const catalogue: Group[] = [
    {
        roman: '0',
        title: 'Front matter',
        sections: [
            { id: '0.1', title: 'What $Chemistry is', cases: [] },
            { id: '0.2', title: 'Conventions', cases: [] },
            { id: '0.3', title: 'The dual constructor', cases: [] },
        ],
    },
    {
        roman: 'I',
        title: 'Foundation',
        sections: [
            { id: 'I.1', title: 'Symbols', cases: [
                'symbol-keyed property survives Object.create',
                '#private fails the same test',
            ] },
            { id: 'I.2', title: 'The $ membrane', cases: [
                'three audiences: consumer, author, framework dev',
                '$apply maps prop to $prop',
            ] },
            { id: 'I.3', title: 'Types', cases: [
                '$Properties<T> infers $-prefixed fields',
                'I<T> intersection for particularization',
            ] },
        ],
    },
    {
        roman: 'II',
        title: 'Primitives — $Particle',
        sections: [
            { id: 'II.1', title: 'The class', cases: [
                'minimal $Particle subclass',
                'symbol format $Chemistry.Class[cid]',
                'cid sequence',
            ] },
            { id: 'II.2', title: 'view()', cases: [
                'view returns a single element',
                'view returns an array',
                'view returns null',
            ] },
            { id: 'II.3', title: 'Identity', cases: [
                '$cid is auto-incremented and unique',
                'symbol round-trip via parseCid',
                'identity stable across re-renders',
            ] },
            { id: 'II.4', title: 'The lifecycle', cases: [
                'await next("mount")',
                'next on already-resolved phase resolves immediately',
                'next("unmount") rejects mid-lifecycle',
            ] },
            { id: 'II.5', title: 'particular constructor argument', cases: [
                'new $Particle(error) returns particularized carrier',
                'instanceof Error preserved',
                'original object untouched',
                'no-op for existing particle',
            ] },
            { id: 'II.6', title: 'isParticle(x)', cases: [
                'true for natural particle',
                'true for particularized carrier',
                'false for plain object',
            ] },
            { id: 'II.7', title: 'The $() callable', cases: [
                'class form: $($Counter)',
                'instance form: $(counter)',
                'string form: $("div")',
                'string form with override: $("div", X)',
            ] },
            { id: 'II.8', title: 'Render filters', cases: [
                '$show=false hides the view',
                '$hide=true hides the view',
                'custom registerFilter intercepts',
                'filter chain order: first non-undefined wins',
            ] },
            { id: 'II.9', title: '$lift', cases: [
                'two mounts produce two derivatives',
                'derivative inherits parent prototype',
                'parent owns $derivatives$ registry',
            ] },
            { id: 'II.10', title: 'The Component getter', cases: [
                'particle.Component uses $lift',
                'chemical template Component uses $createComponent',
                '$component caching',
            ] },
        ],
    },
    {
        roman: 'III',
        title: 'Composition — $Chemical',
        sections: [
            { id: 'III.1', title: 'The class', cases: [
                '$Chemical extends $Particle',
                'composition fields ($synthesis, $catalyst, $$parent$$)',
            ] },
            { id: 'III.2', title: 'The dual constructor', cases: [
                'class constructor runs at object creation',
                'binding constructor runs at render',
            ] },
            { id: 'III.3', title: 'The binding constructor', cases: [
                'method named after the class',
                'typed JSX children become args',
                'spread args accumulate',
                'async binding constructor awaited via next("construction")',
            ] },
            { id: 'III.4', title: '$check', cases: [
                'accepts correct type',
                'accepts subclass',
                'throws on wrong type with formatted error',
                'throws on wrong arity',
            ] },
            { id: 'III.5', title: '$is<T>', cases: [
                'type-only helper for $check signatures',
            ] },
            { id: 'III.6', title: 'bind(chemical, parent?)', cases: [
                'programmatic binding without JSX',
            ] },
            { id: 'III.7', title: 'Polymorphism without props', cases: [
                'subclass property override changes appearance',
                'parent render code unchanged',
            ] },
            { id: 'III.8', title: 'The catalyst graph', cases: [
                '$catalyst points to root',
                '$parent setter wires reaction system',
                'cross-chemical write through composition',
            ] },
            { id: 'III.9', title: 'The HTML catalogue', cases: [
                '$("div") returns memoized wrapper',
                '$("div", X) registers an override',
            ] },
        ],
    },
    {
        roman: 'IV',
        title: 'Integration — $Atom',
        sections: [
            { id: 'IV.1', title: 'The class', cases: [
                'new $Atom() returns the class template singleton',
                'singleton across multiple constructions',
            ] },
        ],
    },
    {
        roman: 'V',
        title: 'Reactivity',
        sections: [
            { id: 'V.1', title: 'Reactive properties', cases: [
                '$count = 0 reactive class field',
                'increment from event handler triggers re-render',
                'single-letter $v is reactive (sprint-24 fix)',
            ] },
            { id: 'V.2', title: 'Scope tracking', cases: [
                'event handler write inside scope batches',
                'setTimeout write outside scope fires immediately',
                'nested handler reads recorded for snapshot diff',
            ] },
            { id: 'V.3', title: 'Cross-chemical writes', cases: [
                'outer handler writes inner.$value',
                'inner DOM repaints (sprint-24 fan-out fix)',
                'sibling derivatives unaffected (ownership gate)',
            ] },
            { id: 'V.4', title: 'In-place collection mutation', cases: [
                'Map.set triggers re-render',
                'Set.add triggers re-render',
                'Array.push triggers re-render',
                'deep nested mutation detected via $symbolize',
            ] },
            { id: 'V.5', title: 'diffuse(chemical)', cases: [
                'fan-out walks own $derivatives$',
                'inherited $derivatives$ skipped (lexical scoping preserved)',
            ] },
            { id: 'V.6', title: 'Decorators', cases: [
                '@inert opt-out for $-prefixed prop',
                '@reactive opt-in for non-$ prop',
            ] },
        ],
    },
    {
        roman: 'VI',
        title: 'Lexical Scoping',
        sections: [
            { id: 'VI.1', title: 'Per-mount derivatives', cases: [
                'two mounts of one held instance',
                'each derivative has own state',
            ] },
            { id: 'VI.2', title: 'The $derivatives$ registry', cases: [
                'registry owned by parent chemical',
                'mounted derivatives added on mount',
                'derivatives removed on unmount',
            ] },
            { id: 'VI.3', title: 'The ownership gate', cases: [
                'write only fans out from owning chemical',
                'derivative-local writes do not leak to siblings',
            ] },
        ],
    },
    {
        roman: 'VII',
        title: 'Particularization',
        sections: [
            { id: 'VII.1', title: 'The pattern', cases: [
                'lift methods + reparent',
                'marker stamping',
            ] },
            { id: 'VII.2', title: 'instanceof preservation', cases: [
                'carrier instanceof Error',
                'carrier reads original.message',
            ] },
            { id: 'VII.3', title: 'The I<T> type', cases: [
                'I<$Error> & I<Error> intersection naming',
            ] },
            { id: 'VII.4', title: 'Reactivity machinery on carriers', cases: [
                'carrier allocates $Molecule and $Reaction (sprint-27)',
            ] },
        ],
    },
    {
        roman: 'VIII',
        title: 'Synthesis',
        sections: [
            { id: 'VIII.1', title: '$Synthesis class', cases: [
                'one synthesis per chemical instance',
            ] },
            { id: 'VIII.2', title: '$SynthesisContext', cases: [
                'per-call mutable state during bond ctor',
            ] },
            { id: 'VIII.3', title: '$Reactants', cases: [
                'information-hiding wrapper exposes only .values',
            ] },
            { id: 'VIII.4', title: 'Parameter parsing', cases: [
                'spread vs positional parameters',
                'regex limits on arrow ctors (provisional)',
            ] },
            { id: 'VIII.5', title: 'JSX child handling', cases: [
                'string children passed through',
                'array children handled recursively',
                'nested chemicals as bond-ctor args',
                'spread args accumulate across children',
            ] },
            { id: 'VIII.6', title: 'Catalyst graph wiring', cases: [
                '$Synthesis calls $bind on child Components',
            ] },
        ],
    },
    {
        roman: 'IX',
        title: 'Reflection',
        sections: [
            { id: 'IX.1', title: '$Reflection class', cases: [
                'per-property classifier',
            ] },
            { id: 'IX.2', title: '$Reflection.isReactive(name)', cases: [
                '_-prefix excluded',
                'constructor excluded',
                'non-$ name reactive by default',
            ] },
            { id: 'IX.3', title: '$Reflection.isSpecial(name)', cases: [
                '$x shape is special',
                '$$x and $_x are not',
                '$X (capital) is not',
            ] },
        ],
    },
    {
        roman: 'X',
        title: 'Lifecycle Internals',
        sections: [
            { id: 'X.1', title: 'The phase queue', cases: [
                'phases Map per particle',
                'next() returns Promise resolved by $resolve',
            ] },
            { id: 'X.2', title: '$resolve propagation', cases: [
                'walks up prototype chain',
                'derivative mounts resolve template mount',
            ] },
            { id: 'X.3', title: 'Async bond ctors', cases: [
                'async $Foo() creates $construction promise',
                'parent construction bundled with child',
            ] },
            { id: 'X.4', title: 'The render loop', cases: [
                '$apply, $bond, filter, view, augment, diff, update',
            ] },
        ],
    },
    {
        roman: 'XI',
        title: 'Cross-cutting helpers',
        sections: [
            { id: 'XI.1', title: '$promise(executor)', cases: [
                'cancellable mid-flight',
                'chained .then carries cancel through',
            ] },
            { id: 'XI.2', title: '$await(promise)', cases: [
                'synchronous read of settled $promise',
            ] },
            { id: 'XI.3', title: '$symbolize(value)', cases: [
                'Map content equality',
                'Map mutation detected',
                'Date round-trip',
                'cyclic-safe',
            ] },
            { id: 'XI.4', title: '$literalize(symbol)', cases: [
                'inverse of $symbolize',
            ] },
        ],
    },
    {
        roman: 'XII',
        title: 'Errors and Validation',
        sections: [
            { id: 'XII.1', title: '$check', cases: [
                'inside binding constructor',
                'returns the value when valid',
            ] },
            { id: 'XII.2', title: '$ParamValidation', cases: [
                'singleton tracks per-ctor state',
                'reset between ctor calls',
            ] },
            { id: 'XII.3', title: 'The error message format', cases: [
                'wrong type: formatted message',
                'wrong arity: too many or too few',
                'class hierarchy violation',
                'Component already created',
                'cannot parse constructor (arrow form)',
                'invalid chemical symbol passed to parseCid',
            ] },
        ],
    },
    {
        roman: 'XIII',
        title: 'Caveats (resolved)',
        sections: [
            { id: 'XIII.1', title: 'Cross-chemical handler fan-out', cases: [
                'sprint-24: scope.finalize was missing fan-out',
                'now: cross-chemical writes propagate via diffuse',
            ] },
            { id: 'XIII.2', title: 'Single-letter $<x> props were inert', cases: [
                'sprint-24: isSpecial required length > 2',
                'now: length >= 2',
            ] },
            { id: 'XIII.3', title: 'Particle allocates reactivity machinery', cases: [
                'sprint-27: every particle allocates $Molecule and $Reaction',
                'particularized carriers inherit allocation',
            ] },
            { id: 'XIII.4', title: 'Particularization preserves prototype', cases: [
                'original object prototype chain untouched',
            ] },
        ],
    },
    {
        roman: 'XIV',
        title: 'Provisional behaviors',
        sections: [
            { id: 'XIV.1', title: 'parseBondConstructor regex limits', cases: [
                'arrow ctor breaks parsing',
                'default values break parsing',
                'destructured params break parsing',
            ] },
            { id: 'XIV.2', title: 'isViewSymbol unreachable branch', cases: [
                '$$Chemistry. prefix never produced',
            ] },
            { id: 'XIV.3', title: '$isChemicalBase$ inherited resolution', cases: [
                'walk halts via inherited rather than own',
                'user methods on subclass prototype unreachable',
            ] },
            { id: 'XIV.4', title: '$Reagent reachability', cases: [
                'open: are non-$ user methods ever wrapped?',
            ] },
        ],
    },
    {
        roman: 'XV',
        title: 'Implementation modules',
        sections: [
            { id: 'XV.1', title: 'src/abstraction/particle.ts', cases: [] },
            { id: 'XV.2', title: 'src/abstraction/chemical.ts', cases: [] },
            { id: 'XV.3', title: 'src/abstraction/atom.ts', cases: [] },
            { id: 'XV.4', title: 'src/abstraction/bond.ts', cases: [] },
            { id: 'XV.5', title: 'src/abstraction/molecule.ts', cases: [] },
            { id: 'XV.6', title: 'src/abstraction/reaction.ts', cases: [] },
            { id: 'XV.7', title: 'src/abstraction/element.ts', cases: [] },
            { id: 'XV.8', title: 'src/implementation/scope.ts', cases: [] },
            { id: 'XV.9', title: 'src/implementation/symbols.ts', cases: [] },
            { id: 'XV.10', title: 'src/implementation/types.ts', cases: [] },
            { id: 'XV.11', title: 'src/implementation/augment.ts', cases: [] },
            { id: 'XV.12', title: 'src/implementation/reconcile.ts', cases: [] },
            { id: 'XV.13', title: 'src/implementation/walk.ts', cases: [] },
            { id: 'XV.14', title: 'src/implementation/representation.ts', cases: [] },
            { id: 'XV.15', title: 'src/implementation/promise.ts', cases: [] },
        ],
    },
    {
        roman: 'XVI',
        title: 'Why $Chemistry',
        sections: [
            { id: 'XVI.1', title: 'The bet against The Good Parts', cases: [] },
            { id: 'XVI.2', title: 'When to reach for it', cases: [] },
        ],
    },
];

export function findSection(id: string): { group: Group; section: Section } | undefined {
    for (const group of catalogue) {
        const section = group.sections.find(s => s.id === id);
        if (section) return { group, section };
    }
    return undefined;
}

export function neighbors(id: string): { prev?: Section; next?: Section } {
    const flat: Section[] = catalogue.flatMap(g => g.sections);
    const i = flat.findIndex(s => s.id === id);
    if (i < 0) return {};
    return { prev: flat[i - 1], next: flat[i + 1] };
}

export const defaultSectionId = '0.1';
