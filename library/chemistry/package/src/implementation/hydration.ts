import { $backing$, $molecule$, $reaction$, $template$ } from './symbols';

const key = '$Chemistry.hydration';

const storage = (): Storage | undefined => typeof localStorage !== 'undefined' ? localStorage : undefined;

const held: Record<string, Record<string, unknown>> = {};

const dirty = new Set<any>();
const enrolled = new Map<string, Set<WeakRef<any>>>();
let scheduled = false;
let recalling = false;

const enroll = (pid: string, chemical: any): void => {
    let members = enrolled.get(pid);
    if (!members) enrolled.set(pid, members = new Set());
    for (const ref of members) if (ref.deref() === chemical) return;
    members.add(new WeakRef(chemical));
};

const propagate = (pid: string, writer: any): void => {
    const members = enrolled.get(pid);
    if (!members) return;
    for (const ref of members) {
        const other = ref.deref();
        if (other === undefined) { members.delete(ref); continue; }
        if (other === writer) continue;
        hydration.overwrite(other);
        other[$reaction$]?.react();
    }
};

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
    pidOf(chemical: any): string | undefined {
        const pid = chemical.$pid;
        return pid === undefined || pid === null || pid === '' ? undefined : String(pid);
    },

    formationOf(chemical: any): Record<string, unknown> {
        const names = new Set<string>(Object.keys(chemical));
        for (const property in chemical[$backing$] ?? {}) names.add(property);
        const bonds = (chemical[$molecule$]?.bonds?.size ? chemical[$molecule$] : chemical[$template$]?.[$molecule$])?.bonds;
        if (bonds) for (const bond of bonds.values()) names.add(bond.property);
        const state: Record<string, unknown> = {};
        for (const property of names) {
            if (names.has('_' + property)) continue;
            if (!writable(chemical, property)) continue;
            const value = chemical[property];
            if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) state[property] = value;
        }
        return state;
    },

    recollect(pid: string): any {
        const members = enrolled.get(pid);
        if (!members) return undefined;
        for (const ref of members) {
            const one = ref.deref();
            if (one === undefined) { members.delete(ref); continue; }
            return one;
        }
        return undefined;
    },

    changed(chemical: any): void {
        if (recalling || !chemical.persist) return;
        const pid = this.pidOf(chemical);
        if (pid === undefined) return;
        enroll(pid, chemical);
        dirty.add(chemical);
        if (scheduled) return;
        scheduled = true;
        queueMicrotask(() => {
            scheduled = false;
            const flushed: [string, any][] = [];
            for (const one of dirty) {
                const pid = hydration.pidOf(one);
                if (pid !== undefined && one.persist) {
                    held[pid] = hydration.formationOf(one);
                    flushed.push([pid, one]);
                }
            }
            dirty.clear();
            save();
            for (const [pid, one] of flushed) propagate(pid, one);
        });
    },

    overwrite(chemical: any): void {
        const pid = this.pidOf(chemical);
        if (pid === undefined) return;
        enroll(pid, chemical);
        const kept = held[pid];
        if (kept === undefined) return;
        recalling = true;
        try {
            for (const [property, value] of Object.entries(kept))
                if (writable(chemical, property)) chemical[property] = value;
        } finally {
            recalling = false;
        }
    },

    clear(chemical: any): void {
        const pid = this.pidOf(chemical);
        if (pid !== undefined) { delete held[pid]; save(); }
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
