import type { $SymbolFeature } from './types';

// ===========================================================================
// $Represent — serialization
// ===========================================================================

export class $Represent {
    static symbolize(value: any, ...features: $SymbolFeature[]): string {
        const mode = features.find(f => f === 'fast') ? 'fast' : 'safe';
        const closure = features.find(f => f === 'self-contained') ? 'self-contained' : 'referential';
        const replacer = $Represent.replacer(closure === 'referential');
        return mode === 'fast'
            ? JSON.stringify(value, replacer)
            : $Represent.safe(value, replacer);
    }

    static literalize<T = any>(symbolization: string): T {
        const parsed = JSON.parse(symbolization);
        if (Array.isArray(parsed) && parsed[0] === '$Symbol') {
            const [, constructorName, unique, refs] = parsed;
            const resolved = new Map<string, any>();
            for (const [key, val] of Object.entries(refs)) {
                if (Array.isArray(val)) {
                    resolved.set(key, []);
                } else if (typeof val === 'object' && val !== null) {
                    let proto = null;
                    if (constructorName && constructorName !== 'Object')
                        proto = (globalThis as any)[constructorName]?.prototype;
                    resolved.set(key, proto ? Object.create(proto) : {});
                } else {
                    resolved.set(key, val);
                }
            }
            for (const [key, val] of Object.entries(refs)) {
                const target = resolved.get(key)!;
                if (Array.isArray(val)) {
                    for (let i = 0; i < val.length; i++)
                        target[i] = $Represent.resolve(val[i], unique, resolved);
                } else if (typeof val === 'object' && val !== null) {
                    for (const k in val)
                        target[k] = $Represent.resolve((val as any)[k], unique, resolved);
                }
            }
            const keys = Object.keys(refs);
            if (keys.length === 0)
                throw new Error('Invalid serialization: empty refs object');
            return resolved.get(keys[keys.length - 1]);
        }
        return $Represent.processLiteral(parsed);
    }

    private static safe(value: any, replacer: (key: string, val: any) => any): string {
        const seen = new Map<any, string>();
        let unique: string | undefined;
        let refs: Record<string, any> | undefined;
        let counter = 0;
        let constructorName: string | undefined;
        const processed = process(value, value => replacer('_', value));
        if (refs)
            return JSON.stringify(['$Symbol', constructorName || 'Object', unique, refs]);
        return JSON.stringify(processed);

        function process(val: any, replacer: (val: any) => any): any {
            if (val === null || val === undefined || typeof val !== 'object')
                return typeof val === 'function' ? undefined : val;
            const replaced = replacer(val);
            if (val !== replaced) return replaced;
            const existing = seen.get(val);
            if (existing) return existing;
            const ctor = val?.constructor?.name;
            if (ctor && ctor !== 'Object' && ctor !== 'Array')
                constructorName = ctor;
            if (!unique)
                unique = `$r`;
            const ref = `${unique}.${counter++}`;
            seen.set(val, ref);
            if (!refs) refs = {};
            if (Array.isArray(val)) {
                refs[ref] = val.map(item => process(item, replacer));
            } else if (val instanceof Map) {
                // Iteration order is insertion order in JS. For equivalence
                // we need a deterministic order — sort by symbolized key so
                // two Maps with the same entries in different insertion order
                // produce the same serialization.
                const entries: [any, any][] = [];
                for (const [k, v] of val) entries.push([k, v]);
                entries.sort((a, b) => {
                    const ka = typeof a[0] === 'string' ? a[0] : JSON.stringify(a[0]);
                    const kb = typeof b[0] === 'string' ? b[0] : JSON.stringify(b[0]);
                    return ka < kb ? -1 : ka > kb ? 1 : 0;
                });
                refs[ref] = {
                    $Map: entries.map(([k, v]) => [process(k, replacer), process(v, replacer)])
                };
            } else if (val instanceof Set) {
                const members: any[] = [];
                for (const m of val) members.push(m);
                // Sort for deterministic ordering.
                members.sort((a, b) => {
                    const sa = typeof a === 'string' ? a : JSON.stringify(a);
                    const sb = typeof b === 'string' ? b : JSON.stringify(b);
                    return sa < sb ? -1 : sa > sb ? 1 : 0;
                });
                refs[ref] = { $Set: members.map(m => process(m, replacer)) };
            } else if (val instanceof Date) {
                refs[ref] = { $Date: val.getTime() };
            } else if (val instanceof RegExp) {
                refs[ref] = { $RegExp: val.source, flags: val.flags };
            } else {
                const obj: Record<string, any> = {};
                for (const key of Object.keys(val))
                    obj[key] = process(val[key], replacer);
                refs[ref] = obj;
            }
            return ref;
        }
    }

    private static replacer(_referential: boolean) {
        return (_key: string, value: any) => {
            if (typeof value === 'function') return undefined;
            if (typeof value === 'symbol') return undefined;
            return value;
        };
    }

    private static resolve(val: any, unique: string | undefined, resolved: Map<string, any>): any {
        if (typeof val === 'string' && unique && val.startsWith(unique))
            return resolved.get(val) ?? val;
        return $Represent.processLiteral(val);
    }

    private static processLiteral(val: any): any {
        if (val === null || val === undefined || typeof val !== 'object') return val;
        if (Array.isArray(val)) return val.map(item => $Represent.processLiteral(item));
        const result: Record<string, any> = {};
        for (const key of Object.keys(val))
            result[key] = $Represent.processLiteral(val[key]);
        return result;
    }
}

export function $symbolize(value: any, ...features: $SymbolFeature[]): string {
    return $Represent.symbolize(value, ...features);
}

export function $literalize<T = any>(symbolization: string): T {
    return $Represent.literalize(symbolization);
}
