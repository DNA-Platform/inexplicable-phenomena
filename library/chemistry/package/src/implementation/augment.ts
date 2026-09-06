import type { ReactNode, ReactElement } from 'react';
import { withScope, withAsker } from './scope';
import { $original$, $assigned$, $formula$, $facades$, $isTemplate$ } from './symbols';
import { pathOf } from './reflection';

// Asked for late, so this module names no class from the abstraction layer.
let $ask: (component: any) => any = (component) => component;
export function asking(ask: (component: any) => any): void { $ask = ask; }

// `counting` is false for the second walk of one render — the framework draws
// the view again to see whether it changed, and a walk that is a comparison
// rather than a drawing must not be read as another pass.
// THE PASS IS NOT ALLOCATED UNTIL SOMETHING IS ASSIGNED. This walk runs on every
// render of every chemical, so anything it allocates unconditionally is paid for
// by pages that use none of this. The scratch is reused because the walk is not
// re-entrant — nothing it calls renders — and `order` is handed away rather than
// shared the moment there is one.
const scratch: $Pass = { total: 0, order: undefined };

// WHAT ENCLOSES WHAT, in the walk that is drawing it — pushed and popped rather
// than rebuilt, so carrying it costs no allocation per element. It exists for one
// question, and it is the only place that question can be answered: is this thing
// already inside the facade it declares?
const standing: any[] = [];


// `counting` is false for the second walk of one render — the framework draws
// the view again to see whether it changed, and a walk that is a comparison
// rather than a drawing must not be read as another pass.
export function augment(node: ReactNode, react: () => void, asker?: any, counting = true): ReactNode {
    let pass: $Pass | undefined;
    if (asker) { scratch.total = 0; scratch.order = undefined; pass = scratch; }
    standing.length = 0;
    const drawn = augmentNode(node, react, asker, pass);
    if (asker && pass && counting) settled(asker, pass);
    return drawn;
}

function augmentNode(node: ReactNode, react: () => void, asker?: any, pass?: $Pass): ReactNode {
    if (node == null) return node;
    if (typeof node !== 'object') return node;
    if (Array.isArray(node)) {
        let modified = false;
        const result: ReactNode[] = new Array(node.length);
        for (let i = 0; i < node.length; i++) {
            const augmented = augmentNode(node[i], react, asker, pass);
            result[i] = augmented;
            if (augmented !== node[i]) modified = true;
        }
        return modified ? result : node;
    }
    const element = node as ReactElement<any>;
    const props = element.props;
    if (!props) return element;

    // ONE LOOKUP. Three of the four things this walk decides about an element ask
    // the same question of it, and asking once is also what makes them read as
    // one decision rather than three passes that happen to be adjacent.
    const chemical = (element.type as any)?.$chemical;
    const top = !!chemical && standing.length === 0;

    // The children are walked INSIDE this element, because what encloses them is
    // the question a facade has to answer.
    if (chemical) standing.push(chemical);
    const newChildren = props.children !== undefined
        ? augmentNode(props.children, react, asker, pass)
        : undefined;
    if (chemical) standing.pop();

    // NO CLOSURE PER ELEMENT. This runs on every element of every render, and a
    // helper allocated to copy props twice a page is a helper allocated a million
    // times a page. The cast is what a `let` loses across a loop body.
    let newProps: Record<string, any> | undefined;

    for (const key in props) {
        if (key === 'children') continue;
        const value = props[key];
        if (key === assignment) {
            if (!newProps) newProps = { ...props };
            (newProps as Record<string, any>)[key] = resolve(value, asker, element, pass);
            continue;
        }
        if (typeof value !== 'function' || !isEventHandlerProp(key)) continue;
        if (!newProps) newProps = { ...props };
        (newProps as Record<string, any>)[key] = wrapHandler(value as Function, react, asker);
    }

    // WHAT A VIEW WRITES AT ITS TOP BELONGS TO THE CHEMICAL WHOSE VIEW WROTE IT.
    // The synthesis parents a bond's children; a chemical written in a view had no
    // parent until it said where it belonged. A topmost chemical element — one no
    // other chemical element of this drawing encloses — that says nothing is given
    // a default: it belongs to the writer, and the assignment threads the lineage
    // on mount the way a written one does — the parent, and nothing else.
    if (top && asker && !(assignment in props) && chemical[$isTemplate$]) {
        if (!newProps) newProps = { ...props };
        (newProps as Record<string, any>)[assignment] = belonging(asker);
    }

    // A FACADE IS CHOSEN WHERE THE ELEMENT WAS WRITTEN, not where the instance
    // draws itself. By the time frame() runs the asker is pinned to the instance,
    // so a registration made on whoever wrote it could never be consulted; the
    // walk knows the writer, so the walk asks. What it resolves rides down as
    // `$facade` — `facade` is what the class DECLARES, `$facade` is what this
    // scope answered.
    // Decided once, by the outermost walk that drew it — an inner walk re-emitting
    // the same element does not get to answer again.
    if (chemical && asker && !('facade' in props)) {
        const dressed = facing(chemical, asker);
        if (dressed !== undefined) {
            if (!newProps) newProps = { ...props };
            (newProps as Record<string, any>).facade = dressed;
        }
    }

    // A formula stands for something else, and this replaces it with what it
    // symbolizes — the component only, so the text and props cross unchanged.
    // An assignment resolved above therefore reaches whatever the formula stood
    // for, which is the instance that actually draws.
    const stands = chemical ? substitute(chemical, element, asker) : undefined;

    if (stands || newProps || newChildren !== props.children) {
        let finalProps: any = props;
        if (newProps || newChildren !== props.children) {
            finalProps = newProps || { ...props };
            if (newChildren !== props.children) finalProps.children = newChildren;
        }
        if (finalProps === props) return stands ? { ...element, type: stands } : element;
        return stands ? { ...element, type: stands, props: finalProps } : { ...element, props: finalProps };
    }
    return element;
}

// The facade this chemical declares, resolved in the scope of whoever drew it.
// Answers `undefined` when it declares none or when the scope had nothing to
// say, and `null` when it is ALREADY INSIDE ONE — so an undressed chemical costs
// one call and one WeakMap hit.
function facing(chemical: any, asker: any): any {
    const declared = chemical[$facades$]?.();
    if (!declared || declared.length !== 1) return undefined;

    // SATISFACTION IS JUDGED ON WHAT WAS DECLARED, NEVER ON THE SUBSTITUTE. A
    // scope may stand something else in behind the declaration, and that stand-in
    // IS one of these by inheritance — so being already inside it satisfies the
    // declaration, and wrapping again would draw the same surround twice.
    const kind = declared[0].$chemical?.constructor;
    if (kind) for (const enclosing of standing) if (enclosing instanceof kind) return null;

    const answered = withAsker(asker, () => $ask(declared[0]));
    return answered && answered !== declared[0] ? answered : undefined;
}

function substitute(chemical: any, element: ReactElement<any>, asker?: any): any {
    const stands = chemical[$formula$];
    if (typeof stands !== 'function') return undefined;
    const replacement = stands.call(chemical, element, asker);
    return replacement && replacement !== element.type ? replacement : undefined;
}

function isEventHandlerProp(key: string): boolean {
    return key.length > 2
        && key[0] === 'o' && key[1] === 'n'
        && key[2] === key[2].toUpperCase()
        && key[2] !== key[2].toLowerCase();
}

function wrapHandler(handler: Function, _react: () => void, asker?: any): Function {
    const wrapper = function (this: any, ...args: any[]) {
        let result: any;
        // The handler runs with an asker, so `$(X)` resolves in the graph the
        // handler belongs to — but not DRAWING, so it may also configure.
        withScope(() => { result = withAsker(asker, () => handler.apply(this, args)); });
        if (result instanceof Promise) {
            result.then(
                () => withScope(() => {}),
                () => withScope(() => {})
            );
        }
        return result;
    };
    (wrapper as any)[$original$] = handler;
    return wrapper;
}

// ===========================================================================
// Assignment — a chemical saying where the one it is drawing belongs.
//
//     <Type on={() => this.type}>Letter</Type>
//
// The arrow is two artefacts in one expression. Its TYPE checks that the member
// can hold what is being assigned; its SOURCE names which member. The compiler
// reads the first and `pathOf` reads the second, and neither alone would do:
// a typed callback names nothing, and a string path checks nothing.
//
// Resolved HERE because this is the one place that knows whose view wrote it —
// `asker` is that chemical, and it is the `this` the arrow closed over. The
// instance does not exist yet, so the resolution is handed onward and the child
// completes it when it mounts.
// ===========================================================================

const assignment = 'on';

// ONE THING CAN BELONG IN MORE THAN ONE PLACE, so an assignment is one arrow or
// a list of them: `on={[() => this.form.fields, () => this.audit.watched]}`. Each
// is read and checked exactly as a single one is, and the same instance lands in
// every member named — which is the point, because they are then all holding the
// one thing rather than copies of it.
// RESOLVED ONCE PER ASKER AND PER SOURCE. A view builds a fresh arrow on every
// render, so without this the walk re-reads source that cannot have changed —
// a toString and two regexes per element per pass, which the bench measured at
// thirteen times the cost of an element with nothing to do. The source is the
// key because it is exactly what the resolution depends on: the same reading, in
// the same scope, resolves the same way.
const resolutions = new WeakMap<object, Map<string, Function>>();

function resolve(written: unknown, asker: any, element: ReactElement<any>, pass?: $Pass): unknown {
    if (written == null) return written;
    if ((written as any)[$assigned$]) return written;
    const reads = (Array.isArray(written) ? written : [written]).filter(one => typeof one === 'function') as Function[];
    if (!reads.length) return written;
    if (!asker) return written;

    const source = reads.length === 1 ? reads[0].toString() : reads.map(one => one.toString()).join(' ');
    let known = resolutions.get(asker);
    if (!known) resolutions.set(asker, known = new Map());
    const already = known.get(source);
    if (already) {
        if (pass) {
            const places = (already as any)[$assigned$] as { path: string[] }[];
            for (const place of places) {
                pass.total++;
                if (!pass.order) pass.order = new Map();
                const at = place.path.join('.');
                const order = pass.order.get(at) ?? [];
                order.push(String(element.key ?? ''));
                pass.order.set(at, order);
            }
        }
        return already;
    }

    // ONLY A CHEMICAL HAS SOMETHING TO ASSIGN. A tag draws and is gone; there is
    // no instance for a member to hold, and quietly holding nothing is worse
    // than saying so.
    const type = element.type as any;
    if (typeof type !== 'function' || !type.$chemical)
        throw new Error(
            `Only a chemical can be told where it belongs — ${drawn(type)} has no instance for a member to hold.`
        );

    const places: { receiver: any; path: string[] }[] = [];
    for (const read of reads) {
        const path = pathOf(read);
        if (!path) throw new Error(
            `An assignment names one member of the chemical that draws it — on={() => this.member}. ` +
            `This one reads ${read.toString()}, which names none.`
        );
        places.push({ receiver: asker, path });

        if (pass) {
            pass.total++;
            if (!pass.order) pass.order = new Map();
            const at = path.join('.');
            const order = pass.order.get(at) ?? [];
            order.push(String(element.key ?? ''));
            pass.order.set(at, order);
        }
    }

    const assign = (held: any) => {
        for (const place of places) into(place.receiver, place.path, held);
        fedBy(asker);
    };
    (assign as any)[$original$] = written;
    (assign as any)[$assigned$] = places;
    known.set(source, assign);
    return assign;
}

// ===========================================================================
// The two mistakes a walk can see, and it says both rather than letting either
// pass quietly. Both are read off what a view DREW, compared with what the same
// view drew last time — no state is kept on anybody's chemical.
// ===========================================================================

type $Pass = { total: number; order?: Map<string, string[]> };

const passes = new WeakMap<object, $Pass & { run: number; fed: boolean }>();

// A DRAWING THAT FOLLOWED AN ASSIGNMENT is the only kind that can be a runaway.
// One that grew because somebody pressed something did not feed itself, and must
// not be counted against the run.
// One default assignment per writer, resolved once. It names the writer as the
// receiver and holds NO member: the parent is threaded where the chemical says
// it belongs, and a parent is a fact about the tree, not a write a view wakes for.
const implied = new WeakMap<any, any>();

function belonging(asker: any): any {
    let assign = implied.get(asker);
    if (assign) return assign;
    assign = () => {};
    assign[$assigned$] = [{ receiver: asker, path: [] }];
    implied.set(asker, assign);
    return assign;
}

function fedBy(receiver: any): void {
    const held = passes.get(receiver);
    if (held) held.fed = true;
}

// A VIEW WHOSE SHAPE DEPENDS ON WHAT WAS ASSIGNED INTO IT never finishes, and it
// comes in two costumes. One GROWS: every assignment wakes the view, the view
// draws one more, and that one assigns itself too. The other FLIPS: the view
// draws something only while the member is empty, so assigning it stops it being
// drawn, which unmounts it, which empties the member, which draws it again.
//
// Neither is a nested render — each turn is its own commit — so nothing else in
// React or in this framework is watching. Both are the same fact seen twice: the
// number of things a view assigns CHANGED, and an assignment is why.
const runaway = 20;

function settled(asker: any, pass: $Pass): void {
    const last = passes.get(asker);
    // NOTHING ASSIGNED AND NOTHING REMEMBERED IS NOTHING TO DO — which is every
    // chemical on a page that uses none of this, so it is the case worth making
    // free rather than merely cheap.
    if (!last) {
        if (pass.total === 0) return;
        passes.set(asker, { total: pass.total, order: pass.order, run: 0, fed: false });
        return;
    }

    const run = pass.total !== last.total && last.fed ? last.run + 1 : 0;
    if (run > runaway)
        throw new Error(
            `A view keeps changing what it assigns because of what was assigned, and will not settle. ` +
            `A member cannot be both what a view reads and what that reading changes.`
        );

    // AND THE ORDER OF A LIST IS THE ORDER IT WAS DRAWN IN. A list is filled as
    // its members mount, and reordering keyed children does not mount them
    // again — so the page moves and the member does not. Same set, new order, is
    // exactly that, and it is a wrong answer rather than a slow one.
    for (const [at, written] of pass.order ?? []) {
        const before = last.order?.get(at);
        if (!before || before.length !== written.length) continue;
        if (written.some(key => key === '')) continue;
        if (written.join(' ') === before.join(' ')) continue;
        if ([...written].sort().join(' ') !== [...before].sort().join(' ')) continue;
        throw new Error(
            `The same drawn things were reordered, so this.${at} no longer stands in the order they are drawn. ` +
            `A member is filled as its parts mount, and reordering does not mount them again.`
        );
    }

    passes.set(asker, { total: pass.total, order: pass.order, run, fed: false });
}

function drawn(type: any): string {
    if (typeof type === 'string') return `<${type}>`;
    return type?.name ? `${type.name}` : 'it';
}

// WHAT THE MEMBER ALREADY HOLDS DECIDES. A member declared as a list collects,
// in the order the children were written; a member declared as one is assigned.
// The declared type is what the arrow was checked against, so the two agree by
// construction rather than by a flag anyone has to remember to set.
function into(receiver: any, path: string[], held: any): void {
    const target = holder(receiver, path);
    const member = path[path.length - 1];
    const standing = target[member];

    if (Array.isArray(standing)) {
        if (standing.includes(held)) return;
        target[member] = [...standing, held];
        return;
    }

    // TWO THINGS CANNOT BE THE ONE THING. A member that holds a single is
    // claimed by whoever was assigned into it, and a second claimant is an
    // author meaning a list — so it says so rather than overwriting in silence.
    const claimed = claimsOf(target);
    const by = claimed.get(member);
    if (by !== undefined && by !== held)
        throw new Error(
            `Two are assigned to the same member. It holds one, and both ${named(by)} and ${named(held)} ` +
            `were told they belong there — declare it as a list to hold them both.`
        );

    claimed.set(member, held);
    if (standing === held) return;
    target[member] = held;
}

// A chemical leaving the page takes back what it said about itself, so a member
// never stands for something that is no longer drawn — and never takes back a
// value it did not put there.
export function unassign(assign: any, held: any): void {
    const places = assign?.[$assigned$] as { receiver: any; path: string[] }[] | undefined;
    if (!places) return;
    if (implied.get(places[0]?.receiver) === assign) return;
    for (const place of places) {
        fedBy(place.receiver);
        let target: any;
        try { target = holder(place.receiver, place.path); } catch { continue; }
        const member = place.path[place.path.length - 1];
        const standing = target[member];

        if (Array.isArray(standing)) {
            if (!standing.includes(held)) continue;
            target[member] = standing.filter((one: any) => one !== held);
            continue;
        }

        const claimed = claimsOf(target);
        if (claimed.get(member) === held) claimed.delete(member);
        if (standing === held) target[member] = undefined;
    }
}

// An `on` written where nothing was drawing it was never resolved, and calling
// it would read a member rather than assign one. Saying so is the alternative to
// doing nothing quietly.
export function assigned(assign: any): boolean {
    return !!assign?.[$assigned$];
}

export function isAssignment(value: unknown): boolean {
    return typeof value === 'function' || Array.isArray(value);
}

// WHAT HOLDS THE MEMBER — the receiver for `this.one`, and whatever the path
// walks to for `this.model.fields`. A path that walks through nothing is an
// author naming something that is not there, so it is named rather than skipped.
function holder(receiver: any, path: string[]): any {
    let at = receiver;
    for (let step = 0; step < path.length - 1; step++) {
        at = at?.[path[step]];
        if (at === null || typeof at !== 'object')
            throw new Error(
                `An assignment reads this.${path.join('.')}, and nothing stands at ` +
                `this.${path.slice(0, step + 1).join('.')} to hold it.`
            );
    }
    return at;
}

// Who claimed a member that holds one. Held per target object, so it costs
// nothing until a single member is actually assigned into.
const claimed = new WeakMap<object, Map<string, any>>();

function claimsOf(target: object): Map<string, any> {
    let held = claimed.get(target);
    if (!held) claimed.set(target, held = new Map());
    return held;
}

function named(one: any): string {
    return one?.constructor?.name ?? String(one);
}
