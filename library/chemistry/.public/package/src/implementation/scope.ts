import { $backing$, $reaction$, $rendering$, $$parent$$, $dirty$, $readers$, $reads$ } from "./symbols";
import { equivalent, snapshot } from "./reconcile";

/**
 * Scope — the reactivity tracking context.
 *
 * A Scope is active during a reactive entry into chemical code: an event
 * handler invocation (via view augmentation) or a reactive method call. While
 * a Scope is active, every read of a reactive property records a snapshot and
 * every write records its chemical — except on a chemical that is drawing,
 * whose dirtiness starts after its draw.
 *
 * When the Scope finalizes (at the end of the entry), it fires
 * `chemical[$reaction$].react()` on every chemical that was written directly
 * OR whose recorded read-snapshot differs from its current value.
 * This catches in-place mutations of collections and nested objects, as well
 * as cross-chemical state changes that happened during the scope.
 *
 * Outside any scope, property setters fire react() immediately. This covers
 * external callbacks (setTimeout, fetch.then, websocket) that do direct
 * writes.
 */
export class $Scope {
    private reads = new Map<any, Map<string, any>>();
    private writes = new Map<any, Set<string>>();

    recordRead(chemical: any, prop: string, value: any): void {
        let per = this.reads.get(chemical);
        if (!per) {
            per = new Map();
            this.reads.set(chemical, per);
        }
        if (!per.has(prop)) per.set(prop, snapshot(value));
    }

    recordWrite(chemical: any, prop: string): void {
        let per = this.writes.get(chemical);
        if (!per) {
            per = new Set();
            this.writes.set(chemical, per);
        }
        per.add(prop);
    }

    finalize(): void {
        const dirty = new Set<any>();
        for (const chem of this.writes.keys()) dirty.add(chem);
        for (const [chem, perReads] of this.reads) {
            if (dirty.has(chem)) continue;
            for (const [prop, snap] of perReads) {
                const backing = chem[$backing$];
                const current = backing && prop in backing ? backing[prop] : chem[prop];
                if (!equivalent(current, snap)) {
                    dirty.add(chem);
                    break;
                }
            }
        }
        // Propagate up the composition tree: if a child chemical was written,
        // its parent may read that child's state in its view. Walk up through
        // $$parent$$ so the parent re-evaluates its view.
        for (const chem of [...dirty]) {
            let current = chem;
            let parent = current[$$parent$$];
            while (parent && parent !== current) {
                dirty.add(parent);
                current = parent;
                parent = current[$$parent$$];
            }
        }
        for (const chem of dirty) {
            chem[$reaction$]?.react();
            wakeReaders(chem);
        }
    }
}

// READERS. A chemical drawn while reading another is subscribed to it, and a write
// to that other wakes it: marked dirty, so its next render draws, and reacted — at
// once when nothing is drawing, on a microtask when something is, since a reader
// beneath the drawing chemical is visited in the same pass and one elsewhere is not.
// A reader that is itself drawing is not woken: its dirtiness starts after render,
// and its settle pass sees what changed under it.
// The reader is the chemical whose DRAW is in flight — not a reagent of another
// chemical called from inside it, whose reads are that draw's.
// A READ IS OF THE ONE READ, never of the template behind it: a derivative reads
// its template's values through its prototype, and a template write is silent
// to every derivative, shadowed or unshadowed — the standing promise.
// THE SETS ARE OWN, never reached through the prototype: a derivative reached
// its template's readers that way, and one derivative's write woke them all.
export function noteRead(read: any): void {
    const drawer = $drawer;
    if (!drawer || drawer === read) return;
    own(read, $readers$).add(drawer);
    own(drawer, $reads$).add(read);
}

function own(chemical: any, key: symbol): Set<any> {
    if (!Object.prototype.hasOwnProperty.call(chemical, key)) chemical[key] = new Set();
    return chemical[key];
}

function held(chemical: any, key: symbol): Set<any> | undefined {
    return Object.prototype.hasOwnProperty.call(chemical, key) ? chemical[key] : undefined;
}

export function forgetReads(drawer: any): void {
    const reads = held(drawer, $reads$);
    if (!reads) return;
    for (const read of reads) held(read, $readers$)?.delete(drawer);
    reads.clear();
}

export function wakeReaders(chemical: any): void {
    const readers = held(chemical, $readers$);
    if (!readers) return;
    const later = $drawing || chemical[$rendering$];
    for (const reader of readers) {
        if (reader[$rendering$]) continue;
        reader[$dirty$] = true;
        if (later) queueMicrotask(() => { if (reader[$dirty$]) reader[$reaction$]?.react(); });
        else reader[$reaction$]?.react();
    }
}

// diffuse — propagate a write upward through a chemical's composition tree.
// Parent chemicals are re-rendered so cross-chemical reads re-evaluate.
export function diffuse(chemical: any): void {
    wakeReaders(chemical);
    let current = chemical;
    let parent = current[$$parent$$];
    while (parent && parent !== current) {
        parent[$reaction$]?.react();
        current = parent;
        parent = current[$$parent$$];
    }
}

let $currentScope: $Scope | null = null;

export function currentScope(): $Scope | null {
    return $currentScope;
}

/**
 * withScope — run fn in a reactivity scope.
 *
 * If a scope is already active, this is a no-op (nested scopes propagate to
 * the outer scope). Only the outermost scope finalizes.
 */
export function withScope<T>(fn: () => T): T {
    if ($currentScope) return fn();
    const scope = new $Scope();
    $currentScope = scope;
    try {
        return fn();
    } finally {
        $currentScope = null;
        scope.finalize();
    }
}

// The asker — which chemical's code is running. Unrelated to the reactivity
// scope above; it answers "who is asking" so `$(Component)` can resolve
// against the graph the asker stands in. The framework raises it around the
// three calls it makes into user code: the bond constructor, the view, and an
// augmented handler. Outside those there is no asker, and `$` answers its
// argument.
let $currentAsker: any = null;
let $drawing = false;
let $drawer: any = null;

export function currentAsker(): any {
    return $currentAsker;
}

// Whether user code is being DRAWN — inside a bond constructor or a view.
// Configuration is invalid there and only there: a handler has an asker so it
// can resolve, but it runs after the paint, so it may also configure.
export function drawing(): boolean {
    return $drawing;
}

export function withAsker<T>(asker: any, fn: () => T, draws = false): T {
    const wasAsker = $currentAsker;
    const wasDrawing = $drawing;
    const wasDrawer = $drawer;
    $currentAsker = asker;
    if (draws) { $drawing = true; $drawer = asker; }
    try {
        return fn();
    } finally {
        $currentAsker = wasAsker;
        $drawing = wasDrawing;
        $drawer = wasDrawer;
    }
}
