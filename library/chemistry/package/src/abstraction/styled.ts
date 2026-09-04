import styledImport from 'styled-components';
import { $type$, $$template$$, $isChemicalBase$ } from '../implementation/symbols';

// ===========================================================================
// Styled particles — a class says what it is styled as, writes plain HTML, and
// the walk renders that element through the component compiled from its CSS
// fields. Nothing is added to the tree and no bond constructor ever sees a
// styled component.
//
// Four phases, in the order they run, each reading only what the one before it
// produced: READ a class's declared fields, DECIDE which spelling of each CSS
// property stands, COMPILE one component per class, and SEAT it so the walk
// only ever reads a cached answer.
// ===========================================================================

// The one resolution of styled-components' dual shape: v6's default import is
// the callable under ESM and sits at .default under CJS. Exported so nothing
// downstream writes this again.
export const styled = ((styledImport as any).div ? styledImport : (styledImport as any).default) as typeof styledImport;

// What a class renders through, the element that component ends at, and every
// live property the whole chain reads — one spread at the element feeds every
// interpolation, including those of the components it extends.
export interface $Styled {
    component: any;
    tag?: string;
    live: { from: string; prop: string }[];
}

// ===========================================================================
// Reading — what a class declares, and where to read it from
// ===========================================================================

let names: any;

// A field is CSS when the browser says so. The platform already keeps that
// list; a hand-written roster would be a second one that can disagree.
function css(name: string): boolean {
    if (names === undefined) names = typeof document === 'undefined' ? null : document.createElement('div').style;
    return names !== null && name in names;
}

// The CSS property is the LAST underscore-separated part, so any prefix makes a
// second member for the same property under a different selector.
function property(name: string): string | undefined {
    const mark = name.charCodeAt(0);
    const read = name.slice(mark === 36 || mark === 95 ? 1 : 0);
    const named = read.slice(read.lastIndexOf(':') + 1).trim();
    const asked = named.slice(named.lastIndexOf('_') + 1);
    return asked !== '' && css(asked) ? asked : undefined;
}

const selectors = new Map<any, Map<string, string>>();

export function select(selector: string) {
    return function (prototype: any, member: string) {
        let named = selectors.get(prototype);
        if (!named) selectors.set(prototype, named = new Map());
        named.set(member, selector);
    };
}

function selected(cls: any, name: string): string {
    const mark = name.charCodeAt(0);
    const read = name.slice(mark === 36 || mark === 95 ? 1 : 0);
    const cut = read.lastIndexOf(':');
    if (cut > 0) return read.slice(0, cut).trim();

    for (let at = cls?.prototype; at; at = Object.getPrototypeOf(at)) {
        const found = selectors.get(at)?.get(name);
        if (found !== undefined) return found;
    }
    return '';
}

// $ over plain over _, which is the reactive law's own order: a prop, then a
// reactive member, then an inert one.
function tier(name: string): number {
    const mark = name.charCodeAt(0);
    return mark === 36 ? 2 : mark === 95 ? 0 : 1;
}

function kebab(name: string): string {
    return name.replace(/(?<!^)[A-Z]/gu, '-$&').toLowerCase();
}

function root(cls: any): boolean {
    return !cls?.prototype || Object.prototype.hasOwnProperty.call(cls.prototype, $isChemicalBase$);
}

// READ THE TEMPLATE, NEVER THE DERIVATIVE — a per-mount derivative owns almost
// nothing, and the declarations live on the one instance of a class that has
// its fields. Seeding an ancestor happens here, which is why compiling is done
// at component resolution and never inside a render.
const seeding = new Set<any>();

function template(cls: any): any {
    if (root(cls)) return undefined;
    if (cls[$$template$$] instanceof cls) return cls[$$template$$];
    if (seeding.has(cls)) return undefined;
    seeding.add(cls);
    try { new cls(); } catch { /* a class wanting arguments declares nothing here */ } finally { seeding.delete(cls); }
    return cls[$$template$$] instanceof cls ? cls[$$template$$] : undefined;
}

function chain(cls: any): any[] {
    const held: any[] = [];
    for (let at = cls; !root(at); at = Object.getPrototypeOf(at)) held.push(at);
    return held;
}

// A GETTER IS A VALUE READ PER RENDER, so it can never be baked — which is what
// makes `get background() { return this.theme.paper }` follow a theme. It lives
// on the prototype rather than the template, and the prototype it is declared on
// IS its class, so no diff is needed to attribute it.
function accessor(cls: any, name: string): boolean {
    for (let at = cls?.prototype; at && at !== Object.prototype; at = Object.getPrototypeOf(at))
        if (Object.getOwnPropertyDescriptor(at, name)?.get) return true;
    return false;
}

// Every class field of a whole chain lands on ONE template instance, so a
// class's own contribution is what its template holds and its parent's does not.
// Its accessors are read separately, off the prototype that declares them.
function declared(cls: any): string[] {
    const found: string[] = [];
    const mine = template(cls);
    const theirs = mine && template(Object.getPrototypeOf(cls));

    if (mine) for (const name of Object.getOwnPropertyNames(mine)) {
        const value = mine[name];
        if (typeof value !== 'string' && typeof value !== 'number') continue;
        if (!property(name)) continue;
        if (theirs && theirs[name] === value) continue;
        found.push(name);
    }

    for (const [name, held] of Object.entries(Object.getOwnPropertyDescriptors(cls.prototype ?? {})))
        if (held.get && property(name)) found.push(name);

    return found;
}

// ===========================================================================
// Deciding — one CSS property is emitted once, by the class holding its highest
// spelling, nearest class first. Deciding it here rather than letting the
// cascade sort it keeps a subclass's `_x` from beating a base's `$x` on
// position alone.
// ===========================================================================

function standing(cls: any): Map<any, Map<string, string>> {
    const best = new Map<string, { cls: any; name: string; tier: number }>();
    for (const one of chain(cls))
        for (const name of declared(one)) {
            const at = `${selected(one, name)}|${property(name)}`;
            const held = best.get(at);
            if (held && held.tier >= tier(name)) continue;
            best.set(at, { cls: one, name, tier: tier(name) });
        }

    const per = new Map<any, Map<string, string>>();
    for (const [at, one] of best) {
        let mine = per.get(one.cls);
        if (!mine) per.set(one.cls, mine = new Map());
        mine.set(at, one.name);
    }
    return per;
}

// ===========================================================================
// Compiling — one component per class, extending what stands beneath it
// ===========================================================================

function selectorOf(cls: any): any {
    return template(cls)?.selector;
}

// undefined defers to the selector; true and false are the explicit word.
function opted(cls: any): boolean {
    const mine = template(cls);
    if (!mine) return false;
    return mine.styled === undefined ? mine.selector !== undefined : !!mine.styled;
}

// The element a styled component ends at. styled(Parent) holds what it extends,
// so the chain is followed down to the tag it was rooted on.
export function tagOf(component: any): string | undefined {
    let at = component;
    while (at && typeof at !== 'string') at = at.target;
    return typeof at === 'string' ? at : undefined;
}

function build(cls: any, per: Map<any, Map<string, string>>): $Styled | null {
    if (root(cls) || !opted(cls)) return null;

    const parent = Object.getPrototypeOf(cls);
    const beneath = opted(parent) ? build(parent, per) : null;
    const selector = selectorOf(cls);

    // A class re-roots by naming its own selector; otherwise it extends what
    // stands beneath it, which is how JS inheritance becomes the CSS cascade.
    const base = beneath && selector === selectorOf(parent) ? beneath.component : selector;
    if (base === undefined) return beneath;

    const mine = per.get(cls);
    if (!mine?.size) return beneath ?? seat(base, []);

    const live = [...(beneath?.live ?? [])];
    const parts: string[] = [''];
    const values: any[] = [];
    const held = template(cls);
    const blocks = new Map<string, [string, string][]>();

    for (const [at, name] of mine) {
        const cut = at.indexOf('|');
        const where = at.slice(0, cut);
        let block = blocks.get(where);
        if (!block) blocks.set(where, block = []);
        block.push([at.slice(cut + 1), name]);
    }

    const write = (asked: string, name: string) => {
        parts[parts.length - 1] += `${kebab(asked)}:`;
        if (tier(name) === 0 && !accessor(cls, name)) {
            parts[parts.length - 1] += `${held[name]};`;
            return;
        }
        const prop = '$' + name.replace(/^[$_]/, '').replace(/[.]/g, '');
        live.push({ from: name, prop });
        values.push((given: any) => given[prop]);
        parts.push(';');
    };

    for (const [asked, name] of blocks.get('') ?? []) write(asked, name);

    for (const [where, block] of blocks) {
        if (where === '') continue;
        parts[parts.length - 1] += `${where}{`;
        for (const [asked, name] of block) write(asked, name);
        parts[parts.length - 1] += '}';
    }

    const from = typeof base === 'function' ? base : styled(base as any);
    const text = Object.assign([...parts], { raw: [...parts] });
    return seat(from(text as any, ...values), live);
}

function seat(component: any, live: $Styled['live']): $Styled {
    return { component, tag: tagOf(component), live };
}

// ===========================================================================
// The seat — compiled once per class, read from any instance of it
// ===========================================================================

const compiled = new WeakMap<any, $Styled | null>();

// Called when a class's component is resolved, which is before anything of that
// class renders — so the walk that reads this never compiles and never seeds.
export function compile(particle: any): $Styled | null {
    const cls = particle?.[$type$];
    if (!cls) return null;
    const known = compiled.get(cls);
    if (known !== undefined) return known;
    const made = build(cls, standing(cls));
    compiled.set(cls, made);
    return made;
}

// The framework's own $-props. They configure a particle and are never the
// author's, so they are the one thing a dress does not hand on.
const framework = new Set(['$look', '$show', '$hide', '$on', '$pid', '$facade']);

// The live values a compiled component's interpolations read, taken from the
// instance being drawn — and beside them WHAT THE AUTHOR GAVE IT. A dress
// forwards its own $-props with the $ stripped, the way an html chemical does,
// so `href` reaches the element it is styled as. Kept beside the compile so
// both seats ask it once.
export function given(made: $Styled, particle: any): Record<string, any> {
    const props: Record<string, any> = {};
    for (const one of made.live) props[one.prop] = particle[one.from];

    // for...in, because a reactive prop is defined on the template and reached
    // through the prototype — Object.keys would see a derivative's own slots only.
    for (const name in particle) {
        if (name.charCodeAt(0) !== 36 || framework.has(name)) continue;
        if (name in props || particle[name] === undefined) continue;
        props[name.slice(1)] = particle[name];
    }

    return props;
}

export function styledFor(particle: any): $Styled | null {
    const cls = particle?.[$type$];
    return cls ? compiled.get(cls) ?? null : null;
}
