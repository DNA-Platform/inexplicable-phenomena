// Measures granularity tradeoff: 1 chemical with many items vs many chemicals
// with one item each. Same DOM shape in both cases (50 <span> elements).

import { describe, it } from 'vitest';
import React from 'react';
import { act } from '@testing-library/react';
import { $Chemical } from '@/abstraction/chemical';
import { createRoot } from 'react-dom/client';

const renderCounts = new WeakMap<any, number>();
function observe<T extends $Chemical>(chem: T): T {
    renderCounts.set(chem, 0);
    const originalView = (chem as any).view.bind(chem);
    (chem as any).view = function () {
        renderCounts.set(chem, (renderCounts.get(chem) ?? 0) + 1);
        return originalView();
    };
    return chem;
}
function countFor(chem: any): number { return renderCounts.get(chem) ?? 0; }

// Monolithic: 1 chemical, 50-item array, renders all.
class $Monolithic extends $Chemical {
    $items: number[] = new Array(50).fill(0);
    bumpOne() {
        const next = [...this.$items];
        next[25] = next[25] + 1;
        this.$items = next;
    }
    view() {
        return React.createElement('div', null,
            this.$items.map((v, i) =>
                React.createElement('span', { key: i, className: 'cell' }, v)
            )
        );
    }
}

// Granular: 50 chemicals, each a single-field $Cell.
class $Cell extends $Chemical {
    $value? = 0;
    bump() { this.$value = (this.$value ?? 0) + 1; }
    view() { return React.createElement('span', { className: 'cell' }, this.$value); }
}

class $Grid extends $Chemical {
    $cells: $Cell[] = [];
    initCells() {
        for (let i = 0; i < 50; i++) this.$cells.push(observe(new $Cell()));
    }
    bumpOne() { this.$cells[25].bump(); }
    view() {
        return React.createElement('div', null,
            this.$cells.map((c, i) =>
                React.createElement(c.Component as any, { key: i })
            )
        );
    }
}

new $Monolithic();
new $Cell();
new $Grid();

function measure(setup: () => { target: any, bump: () => void, root: any, dc: HTMLElement }, iterations: number) {
    const s = setup();
    for (let i = 0; i < 3; i++) act(() => { s.bump(); });
    const t0 = performance.now();
    for (let i = 0; i < iterations; i++) act(() => { s.bump(); });
    const t1 = performance.now();
    act(() => { s.root.unmount(); });
    document.body.removeChild(s.dc);
    return { perBumpMs: (t1 - t0) / iterations };
}

describe('Granularity — 1 chemical w/ 50 items vs 50 chemicals', () => {
    it('compares bump cost for both shapes', () => {
        console.log('\n=== 1 chemical with 50 items, bump index 25 ===');
        const monoResult = measure(() => {
            const mono = observe(new $Monolithic());
            const dc = document.createElement('div'); document.body.appendChild(dc);
            const root = createRoot(dc);
            act(() => { root.render(React.createElement(mono.Component as any)); });
            return { target: mono, bump: () => mono.bumpOne(), root, dc };
        }, 10);
        console.log(`  per-bump: ${monoResult.perBumpMs.toFixed(3)}ms`);

        console.log('\n=== 50 chemicals, bump chemical 25 ===');
        const gridResult = measure(() => {
            const grid = observe(new $Grid());
            grid.initCells();
            const dc = document.createElement('div'); document.body.appendChild(dc);
            const root = createRoot(dc);
            act(() => { root.render(React.createElement(grid.Component as any)); });
            return { target: grid, bump: () => grid.bumpOne(), root, dc };
        }, 10);
        console.log(`  per-bump: ${gridResult.perBumpMs.toFixed(3)}ms`);

        console.log('\n=== Granularity summary ===');
        console.log(`  Monolithic (1 chemical × 50 items): ${monoResult.perBumpMs.toFixed(3)}ms per bump`);
        console.log(`  Granular   (50 chemicals × 1 item): ${gridResult.perBumpMs.toFixed(3)}ms per bump`);
        const ratio = monoResult.perBumpMs / gridResult.perBumpMs;
        console.log(`  Monolithic/Granular ratio: ${ratio.toFixed(2)}x`);
        console.log(`  >1: granular is cheaper (isolation pays off)`);
        console.log(`  <1: monolithic is cheaper (per-chemical overhead dominates)`);
    });
});
