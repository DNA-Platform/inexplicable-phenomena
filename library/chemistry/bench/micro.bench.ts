import { bench, describe } from 'vitest';
import { $Chemical, withScope, react } from '@/abstraction/chemical';
import { $symbolize } from '@/implementation/representation';

// ===========================================================================
// B1 — Micro-benchmarks
//
// Each framework operation benchmarked against a plain-JS equivalent so we
// see the overhead factor explicitly. Run with: npm run bench
// ===========================================================================

// --- Accessor cost ---------------------------------------------------------

class $WithTen extends $Chemical {
    $a = 1; $b = 2; $c = 3; $d = 4; $e = 5;
    $f = 6; $g = 7; $h = 8; $i = 9; $j = 10;
}

const plain = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 };
const chem = new $WithTen();

describe('accessor cost — 10-field chemical', () => {
    bench('plain JS: read one property 10,000 times', () => {
        let sum = 0;
        for (let i = 0; i < 10000; i++) sum += plain.a;
    });

    bench('$Chemistry: read one reactive property 10,000 times (no scope)', () => {
        let sum = 0;
        for (let i = 0; i < 10000; i++) sum += (chem as any).$a;
    });

    bench('plain JS: write one property 10,000 times', () => {
        for (let i = 0; i < 10000; i++) plain.a = i;
    });

    bench('$Chemistry: write one reactive property 10,000 times (no scope, fires react)', () => {
        for (let i = 0; i < 10000; i++) (chem as any).$a = i;
    });
});

// --- Scope open/close ------------------------------------------------------

describe('scope open/close', () => {
    bench('withScope empty body × 10,000', () => {
        for (let i = 0; i < 10000; i++) withScope(() => {});
    });

    bench('withScope with one tracked read × 10,000', () => {
        for (let i = 0; i < 10000; i++) withScope(() => { const x = (chem as any).$a; });
    });

    bench('withScope with 10 tracked reads × 1,000', () => {
        for (let i = 0; i < 1000; i++) withScope(() => {
            const a = (chem as any).$a;
            const b = (chem as any).$b;
            const c = (chem as any).$c;
            const d = (chem as any).$d;
            const e = (chem as any).$e;
            const f = (chem as any).$f;
            const g = (chem as any).$g;
            const h = (chem as any).$h;
            const i2 = (chem as any).$i;
            const j = (chem as any).$j;
        });
    });
});

// --- $symbolize cost -------------------------------------------------------

describe('$symbolize scaling', () => {
    const prim = 42;
    const smallObj = { x: 1, y: 2, z: 3 };
    const largeObj: Record<string, number> = {};
    for (let i = 0; i < 100; i++) largeObj[`k${i}`] = i;

    const smallArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const largeArr: number[] = [];
    for (let i = 0; i < 1000; i++) largeArr.push(i);

    const smallMap = new Map<string, number>([['a', 1], ['b', 2], ['c', 3]]);
    const largeMap = new Map<string, number>();
    for (let i = 0; i < 1000; i++) largeMap.set(`k${i}`, i);

    bench('$symbolize primitive × 10,000', () => {
        for (let i = 0; i < 10000; i++) $symbolize(prim);
    });

    bench('$symbolize small plain object (3 keys) × 1,000', () => {
        for (let i = 0; i < 1000; i++) $symbolize(smallObj);
    });

    bench('$symbolize large plain object (100 keys) × 100', () => {
        for (let i = 0; i < 100; i++) $symbolize(largeObj);
    });

    bench('$symbolize small array (10 items) × 1,000', () => {
        for (let i = 0; i < 1000; i++) $symbolize(smallArr);
    });

    bench('$symbolize large array (1,000 items) × 10', () => {
        for (let i = 0; i < 10; i++) $symbolize(largeArr);
    });

    bench('$symbolize small Map (3 entries) × 1,000', () => {
        for (let i = 0; i < 1000; i++) $symbolize(smallMap);
    });

    bench('$symbolize large Map (1,000 entries) × 10', () => {
        for (let i = 0; i < 10; i++) $symbolize(largeMap);
    });
});

// --- Chemical instantiation ------------------------------------------------

describe('chemical instantiation', () => {
    class $Small extends $Chemical { $x = 1; $y = 2; $z = 3; }
    class $Large extends $Chemical {
        $a1 = 1; $a2 = 2; $a3 = 3; $a4 = 4; $a5 = 5;
        $a6 = 6; $a7 = 7; $a8 = 8; $a9 = 9; $a10 = 10;
        $a11 = 11; $a12 = 12; $a13 = 13; $a14 = 14; $a15 = 15;
        $a16 = 16; $a17 = 17; $a18 = 18; $a19 = 19; $a20 = 20;
    }

    new $Small(); // ensure template exists
    new $Large();

    bench('new $Small (3 fields) × 100', () => {
        for (let i = 0; i < 100; i++) new $Small();
    });

    bench('new $Large (20 fields) × 100', () => {
        for (let i = 0; i < 100; i++) new $Large();
    });
});
