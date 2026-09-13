import React, { ReactNode } from 'react';
import styledImport, { ThemeProvider } from 'styled-components';
import { $type$, $$template$$, $isChemicalBase$, $handed$, $provided$, theme, framework } from '../implementation/symbols';

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

// A MEMBER'S PREFIX IS EVERYTHING BEFORE THE PROPERTY, and it is opaque — one
// prefix names one selector, however many parts the author writes it in. So a
// selector is said ONCE for a prefix and every member sharing that prefix is
// under it, and saying two different ones for one prefix is an author error
// rather than a silent last-one-wins.
const grouped = new Map<any, Map<string, string>>();

function prefix(name: string): string {
    const mark = name.charCodeAt(0);
    const read = name.slice(mark === 36 || mark === 95 ? 1 : 0);
    const cut = read.lastIndexOf('_');
    return cut > 0 ? read.slice(0, cut) : '';
}

export function select(selector: string) {
    return function (prototype: any, member: string) {
        let named = selectors.get(prototype);
        if (!named) selectors.set(prototype, named = new Map());
        named.set(member, selector);

        if (selector.trim() === '') throw new Error(`a selector says where a declaration stands, and this one says nothing: ${member}`);

        const under = prefix(member);
        let group = grouped.get(prototype);
        if (!group) grouped.set(prototype, group = new Map());

        // A CLASS SAYS IT ONCE. A SUBCLASS MAY SAY IT AGAIN, and the whole group
        // moves with it — which is what makes a selector something a subclass can
        // override rather than a string it has to restate per property.
        const held = group.get(under);
        if (held !== undefined)
            throw new Error(held === selector
                ? `a prefix says its selector once, and "${under}" says ${selector} again at ${member}`
                : `one prefix names one selector, and "${under}" names two: ${held} and ${selector}`);
        group.set(under, selector);
        answered.clear();
    };
}

// HOW MANY LEVELS A SELECTOR OPENS. A selector that writes its own braces says
// its own nesting, so a media query may hold a descendant rule; one that writes
// none is the ordinary single level and is closed for the author. The author
// never writes a closing brace — the emit owns the closing, because it is the
// emit that knows where the declarations end.
function opened(where: string): number {
    const closes = (where.match(/\}/gu) ?? []).length;
    if (closes > 0) throw new Error(`a selector opens the levels it needs and closes none of them, and this one closes ${closes}: ${where}`);
    return (where.match(/\{/gu) ?? []).length;
}

// THE LEVELS A SELECTOR OPENS, in order — what stands between its braces. A
// selector with no braces is one level. Two selectors opening the same level
// meet in one tree, so an opening is written once however many groups share it.
type Level = { opens: Map<string, Level>; holds: [string, string][] };
const level = (): Level => ({ opens: new Map(), holds: [] });

function steps(where: string): string[] {
    opened(where);
    return where.split('{').map(one => one.trim()).filter(one => one !== '');
}

function into(of: Level, where: string): Level {
    for (const step of steps(where)) of = of.opens.get(step) ?? (of.opens.set(step, level()), of.opens.get(step)!);
    return of;
}

// A NAMED AT-RULE — @keyframes, @font-face, @page, @property — is one block that
// CSS REPLACES whole when the name is said again; a conditional one — @media,
// @supports, @container, @layer, @scope — is a group the cascade merges. The
// grammar's own distinction, and it decides whether a level may be contributed
// to by halves.
const conditional = /^@(media|supports|container|layer|scope)\b/u;
function named(step: string): boolean {
    return step.charCodeAt(0) === 64 && !conditional.test(step);
}

function split(at: string): [string, string] {
    const cut = at.indexOf('|');
    return [at.slice(0, cut), at.slice(cut + 1)];
}

// THE EMIT OWNS THE ORDER OF A RANGED LEVEL, as it owns the closing. A media
// query's place in the cascade is a fact about its bounds, not about where it
// was written or which class wrote it: plain levels first, then the ranged
// ones from the widest to the narrowest — max-width descending, then min-width
// ascending — so a narrower query has the last word. The bounds are read the
// way the browser reads them: em and rem are 16px in a media query.
const minWidth = /\(\s*min-width\s*:\s*([\d.]+)(px|em|rem)?\s*\)/u;
const maxWidth = /\(\s*max-width\s*:\s*([\d.]+)(px|em|rem)?\s*\)/u;

function width(found: RegExpExecArray | null): number | undefined {
    if (!found) return undefined;
    return parseFloat(found[1]) * (found[2] === 'em' || found[2] === 'rem' ? 16 : 1);
}

function ranged(step: string): boolean {
    return minWidth.test(step) || maxWidth.test(step);
}

function ordered(opens: Map<string, Level>): [string, Level][] {
    const plain: [string, Level][] = [];
    const bounded: { step: string; level: Level; lower: number; upper: number }[] = [];
    for (const [step, level] of opens) {
        const lower = width(minWidth.exec(step));
        const upper = width(maxWidth.exec(step));
        if (lower === undefined && upper === undefined) plain.push([step, level]);
        else bounded.push({ step, level, lower: lower ?? 0, upper: upper ?? Number.MAX_SAFE_INTEGER });
    }
    bounded.sort((a, b) => a.lower - b.lower || b.upper - a.upper);
    return [...plain, ...bounded.map(one => [one.step, one.level] as [string, Level])];
}

const answered = new Map<string, string>();

function selected(cls: any, name: string): string {
    const key = `${cls?.name} ${name}`;
    const known = answered.get(key);
    if (known !== undefined) return known;
    const found = reading(cls, name);
    answered.set(key, found);
    return found;
}

function reading(cls: any, name: string): string {
    const mark = name.charCodeAt(0);
    const read = name.slice(mark === 36 || mark === 95 ? 1 : 0);
    const cut = read.lastIndexOf(':');
    if (cut > 0) return read.slice(0, cut).trim();

    for (let at = cls?.prototype; at; at = Object.getPrototypeOf(at)) {
        const found = selectors.get(at)?.get(name);
        if (found !== undefined) return found;
    }

    const under = prefix(name);
    for (let at = cls?.prototype; at; at = Object.getPrototypeOf(at)) {
        const found = grouped.get(at)?.get(under);
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
        // A SUBCLASS THAT MOVES A GROUP CONTRIBUTES, even where the value is
        // its parent's — changing only the selector is a real override, and
        // comparing the value alone would drop it.
        if (theirs && theirs[name] === value && selected(cls, name) === selected(Object.getPrototypeOf(cls), name)) continue;
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
    const tree = level();

    for (const [at, name] of mine) {
        const [where, asked] = split(at);
        (where === '' ? tree : into(tree, where)).holds.push([asked, name]);
    }

    // A NAMED AT-RULE IS WHOLE WHEREVER IT STANDS. A subclass restating one stop
    // of an animation brings every inherited stop with it, the way a subclass
    // restating a prefix's selector moves the whole group — a block that replaces
    // rather than cascades cannot be contributed to by halves. AND SO IS THE SET
    // OF RANGED LEVELS: a class touching one emits every one the chain declares,
    // so the order the cascade needs is stated once, last, by the class that
    // knows them all — a subclass's block always follows its base's in the sheet,
    // and no hand can order across that.
    const touches = [...tree.opens.keys()].some(ranged);
    for (const one of chain(cls).slice(1))
        for (const [at, name] of per.get(one) ?? []) {
            const [where, asked] = split(at);
            const first = steps(where)[0];
            if (first === undefined) continue;
            if ((named(first) && tree.opens.has(first)) || (touches && ranged(first))) into(tree, where).holds.push([asked, name]);
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

    // The author opens; the emit closes — and closes each opening ONCE, so two
    // groups under one media query and two stops of one animation share it.
    const emit = (of: Level) => {
        for (const [asked, name] of of.holds) write(asked, name);
        for (const [step, under] of ordered(of.opens)) {
            parts[parts.length - 1] += `${step}{`;
            emit(under);
            parts[parts.length - 1] += '}';
        }
    };
    emit(tree);

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

// A CHEMICAL WHOSE THEME IS NOT THE ONE IT WAS HANDED PROVIDES IT. What it
// draws is wrapped in styled-components' own provider, so a styled chemical or
// a raw styled component beneath reads it as its theme. What is handed on is a
// face over the theme — its fields read live, its getters and its class intact
// — remade only when a named field's value changed: a write wakes what reads
// it, and an unchanged render keeps its identity, which the view diff needs.
// Handed as a function so styled-components takes it whole rather than
// spreading it over an outer theme; the nearer theme replaces the farther.
export function providing(particle: any, drawn: ReactNode): ReactNode {
    const of = particle[theme];
    if (typeof of !== 'object' || of === null || of === particle[$handed$]) return drawn;
    let held = particle[$provided$];
    const now = fields(of);
    if (held === undefined || held.of !== of || !same(held.was, now)) {
        const face = Object.create(of);
        held = { of, was: now, hand: () => face };
        particle[$provided$] = held;
    }
    return React.createElement(ThemeProvider, { theme: held.hand }, drawn);
}

// The named fields a theme is judged to have changed by: not the framework's
// own, not a $-prop, not what it holds.
function fields(of: any): any[] {
    const held: any[] = [];
    if (typeof of !== 'object' || of === null) return held;
    for (const name in of) {
        if (name === 'children' || name.charCodeAt(0) === 36 || framework.has(name)) continue;
        held.push(name, of[name]);
    }
    return held;
}

function same(a: any[], b: any[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
}
