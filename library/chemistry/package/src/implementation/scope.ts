import { $backing$, $reaction$, $rendering$, $$parent$$ } from "./symbols";
import { equivalent } from "./reconcile";

function snapshot(v: any): any {
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) return v.map(snapshot);
    if (v instanceof Map) {
        const out = new Map();
        for (const [k, val] of v) out.set(k, snapshot(val));
        return out;
    }
    if (v instanceof Set) {
        const out = new Set();
        for (const val of v) out.add(snapshot(val));
        return out;
    }
    if (v instanceof Date) return new Date(v.getTime());
    const proto = Object.getPrototypeOf(v);
    if (proto === Object.prototype || proto === null) {
        const out: any = {};
        for (const k of Object.keys(v)) out[k] = snapshot((v as any)[k]);
        return out;
    }
    return v;
}

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
                const current = chem[$backing$]?.[prop];
                if (!equivalent(current, snap)) {
                    dirty.add(chem);
                    break;
                }
            }
        }
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
        }
    }
}

export function diffuse(chemical: any): void {
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

let $currentAsker: any = null;
let $drawing = false;

export function currentAsker(): any {
    return $currentAsker;
}

export function drawing(): boolean {
    return $drawing;
}

export function withAsker<T>(asker: any, fn: () => T, draws = false): T {
    const wasAsker = $currentAsker;
    const wasDrawing = $drawing;
    $currentAsker = asker;
    if (draws) $drawing = true;
    try {
        return fn();
    } finally {
        $currentAsker = wasAsker;
        $drawing = wasDrawing;
    }
}
