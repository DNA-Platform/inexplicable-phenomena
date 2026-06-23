import { bench, describe } from 'vitest';
import { $symbolize } from '@/implementation/representation';
import { equivalent } from '@/implementation/reconcile';

// Head-to-head: $symbolize+strcompare vs deep-clone+equivalent.
// Question: is there a faster snapshot/diff strategy than string serialization?

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
        for (const k of Object.keys(v)) out[k] = snapshot(v[k]);
        return out;
    }
    return v; // class instance — reference only
}

// Test fixtures
const smallObj = { x: 1, y: 2, z: 3 };
const largeObj: Record<string, number> = {};
for (let i = 0; i < 100; i++) largeObj[`k${i}`] = i;

const smallArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const largeArr: number[] = [];
for (let i = 0; i < 1000; i++) largeArr.push(i);

const smallMap = new Map<string, number>([['a', 1], ['b', 2], ['c', 3]]);
const largeMap = new Map<string, number>();
for (let i = 0; i < 1000; i++) largeMap.set(`k${i}`, i);

describe('snapshot/diff head-to-head — small object (3 keys)', () => {
    bench('$symbolize + string compare', () => {
        for (let i = 0; i < 1000; i++) {
            const a = $symbolize(smallObj);
            const b = $symbolize(smallObj);
            const eq = a === b;
        }
    });

    bench('deep clone + equivalent()', () => {
        for (let i = 0; i < 1000; i++) {
            const a = snapshot(smallObj);
            const b = snapshot(smallObj);
            const eq = equivalent(a, b);
        }
    });
});

describe('snapshot/diff head-to-head — large object (100 keys)', () => {
    bench('$symbolize + string compare', () => {
        for (let i = 0; i < 100; i++) {
            const a = $symbolize(largeObj);
            const b = $symbolize(largeObj);
            const eq = a === b;
        }
    });

    bench('deep clone + equivalent()', () => {
        for (let i = 0; i < 100; i++) {
            const a = snapshot(largeObj);
            const b = snapshot(largeObj);
            const eq = equivalent(a, b);
        }
    });
});

describe('snapshot/diff head-to-head — large array (1000 items)', () => {
    bench('$symbolize + string compare', () => {
        for (let i = 0; i < 10; i++) {
            const a = $symbolize(largeArr);
            const b = $symbolize(largeArr);
            const eq = a === b;
        }
    });

    bench('deep clone + equivalent()', () => {
        for (let i = 0; i < 10; i++) {
            const a = snapshot(largeArr);
            const b = snapshot(largeArr);
            const eq = equivalent(a, b);
        }
    });
});

describe('snapshot/diff head-to-head — large Map (1000 entries)', () => {
    bench('$symbolize + string compare', () => {
        for (let i = 0; i < 10; i++) {
            const a = $symbolize(largeMap);
            const b = $symbolize(largeMap);
            const eq = a === b;
        }
    });

    bench('deep clone + equivalent()', () => {
        for (let i = 0; i < 10; i++) {
            const a = snapshot(largeMap);
            const b = snapshot(largeMap);
            const eq = equivalent(a, b);
        }
    });
});

describe('snapshot/diff — difference detection (early exit)', () => {
    const before = { ...largeObj };
    const after = { ...largeObj, k0: 999 }; // first key differs

    bench('$symbolize + string compare — different objects', () => {
        for (let i = 0; i < 100; i++) {
            const a = $symbolize(before);
            const b = $symbolize(after);
            const eq = a === b;
        }
    });

    bench('deep clone + equivalent() — different objects (early exit)', () => {
        for (let i = 0; i < 100; i++) {
            const a = snapshot(before);
            const b = snapshot(after);
            const eq = equivalent(a, b);
        }
    });
});
