import { type $Reference } from '../reference/Reference';
import { type $Composition } from '../writing/Composition';

// Resolve a dotted address at a composition — each key one hop of at(),
// each hop after the first standing at the previous hop's arrival.
export const path = (at: $Composition<any>, address: string): $Reference<any> | undefined => {
    const keys = address.replace(/^.*#/, '').split('.').filter(Boolean).map(Number);
    if (!keys.length) return undefined;
    let reference: $Reference<any> = at.at(keys[0]);
    for (const key of keys.slice(1)) {
        const mid = reference.read() as { at?: (index: number) => $Reference<any> };
        if (!mid?.at) return undefined;
        reference = reference.then(mid.at(key));
    }
    return reference;
};
