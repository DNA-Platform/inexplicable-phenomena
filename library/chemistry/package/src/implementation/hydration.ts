// The hydration cache — the one store persisted chemicals live in, read whole
// and eagerly at module load so persisted things can be the first referents.
// Keyed by aid; today it is backed by localStorage, one day a server hands the
// same shape over. A chemical enrolls by being atomic; the false transition
// clears its record; the bond setter alerts changed() on every committed write.

import { $backing$, $molecule$, $template$ } from './symbols';

const key = '$Chemistry.hydration';

const storage = (): Storage | undefined => typeof localStorage !== 'undefined' ? localStorage : undefined;

const held: Record<string, Record<string, unknown>> = {};

const dirty = new Set<any>();
let scheduled = false;

const save = () => { try { storage()?.setItem(key, JSON.stringify(held)); } catch { } };

const writable = (chemical: any, property: string): boolean => {
    let at = chemical;
    while (at !== null) {
        const descriptor = Object.getOwnPropertyDescriptor(at, property);
        if (descriptor) return descriptor.writable === true || descriptor.set !== undefined;
        at = Object.getPrototypeOf(at);
    }
    return true;
};

export const hydration = {
    aidOf(chemical: any): string | undefined {
        const aid = chemical.$aid;
        return aid === undefined || aid === null || aid === '' ? undefined : String(aid);
    },

    formationOf(chemical: any): Record<string, unknown> {
        const names = new Set<string>(Object.keys(chemical));
        for (const property in chemical[$backing$] ?? {}) names.add(property);
        const bonds = (chemical[$molecule$]?.bonds?.size ? chemical[$molecule$] : chemical[$template$]?.[$molecule$])?.bonds;
        if (bonds) for (const bond of bonds.values()) names.add(bond.property);
        const state: Record<string, unknown> = {};
        for (const property of names) {
            if (!writable(chemical, property)) continue;
            const value = chemical[property];
            if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) state[property] = value;
        }
        return state;
    },

    changed(chemical: any): void {
        if (!chemical.atomic || this.aidOf(chemical) === undefined) return;
        dirty.add(chemical);
        if (scheduled) return;
        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            for (const one of dirty) {
                const aid = hydration.aidOf(one);
                if (aid !== undefined && one.atomic) held[aid] = hydration.formationOf(one);
            }
            dirty.clear();
            save();
        });
    },

    overwrite(chemical: any): void {
        const aid = this.aidOf(chemical);
        if (aid === undefined) return;
        const kept = held[aid];
        if (kept === undefined) return;
        for (const [property, value] of Object.entries(kept))
            if (writable(chemical, property)) chemical[property] = value;
    },

    clear(chemical: any): void {
        const aid = this.aidOf(chemical);
        if (aid !== undefined) { delete held[aid]; save(); }
        dirty.delete(chemical);
    },

    forget(): void {
        for (const one of Object.keys(held)) delete held[one];
        dirty.clear();
        save();
    },

    load(): void {
        for (const one of Object.keys(held)) delete held[one];
        try { Object.assign(held, JSON.parse(storage()?.getItem(key) ?? '{}')); } catch { }
    },
};

hydration.load();
