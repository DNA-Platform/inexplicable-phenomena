import { $backing$, $reaction$, $rendering$ } from "../symbols";
import { $symbolize } from "./helpers";

/**
 * Scope — the reactivity tracking context.
 *
 * A Scope is active during a reactive entry into chemical code: an event
 * handler invocation (via view augmentation), a reactive method call, or a
 * render cycle. While a Scope is active, every property read on a reactive
 * chemical property records a snapshot via $symbolize; every property write
 * records the target chemical.
 *
 * When the Scope finalizes (at the end of the entry), it fires
 * `chemical[$reaction$].react()` on every chemical that was written directly
 * OR whose recorded read-snapshot differs from its current serialization.
 * This catches in-place mutations of collections and nested objects, as well
 * as cross-chemical state changes that happened during the scope.
 *
 * Outside any scope, property setters fire react() immediately. This covers
 * external callbacks (setTimeout, fetch.then, websocket) that do direct
 * writes.
 */
export class Scope {
    private reads = new Map<any, Map<string, string>>();
    private writes = new Map<any, Set<string>>();

    recordRead(chemical: any, prop: string, value: any): void {
        let per = this.reads.get(chemical);
        if (!per) {
            per = new Map();
            this.reads.set(chemical, per);
        }
        if (!per.has(prop)) per.set(prop, $symbolize(value));
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
                const current = $symbolize(chem[$backing$]?.[prop]);
                if (current !== snap) {
                    dirty.add(chem);
                    break;
                }
            }
        }
        for (const chem of dirty) {
            chem[$reaction$]?.react();
        }
    }
}

let $currentScope: Scope | null = null;

export function currentScope(): Scope | null {
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
    const scope = new Scope();
    $currentScope = scope;
    try {
        return fn();
    } finally {
        $currentScope = null;
        scope.finalize();
    }
}
