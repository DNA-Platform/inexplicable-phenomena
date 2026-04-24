// Measures re-render locality — does bump cost scale with total tree size?
// Small scale, sequential, teardown between scenarios to avoid memory bloat.

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

class $Leaf extends $Chemical {
    $value? = 0;
    bump() { this.$value = (this.$value ?? 0) + 1; }
    view() { return React.createElement('span', { className: 'leaf' }, this.$value); }
}

class $Container extends $Chemical {
    $leaves: $Leaf[] = [];
    addLeaves(n: number) {
        for (let i = 0; i < n; i++) {
            const leaf = observe(new $Leaf());
            leaf.$value = i;
            this.$leaves.push(leaf);
        }
    }
    view() {
        return React.createElement('div', null,
            this.$leaves.map((leaf, i) =>
                React.createElement(leaf.Component as any, { key: i })
            )
        );
    }
}

new $Leaf();
new $Container();

// Measure one scenario in isolation, tear down fully afterwards.
function measureLocality(leafCount: number, bumpAt: number, bumpIterations: number) {
    const container = observe(new $Container());
    container.addLeaves(leafCount);
    const dc = document.createElement('div');
    document.body.appendChild(dc);
    const root = createRoot(dc);
    act(() => { root.render(React.createElement(container.Component as any)); });

    const target = container.$leaves[bumpAt];
    const sibling = container.$leaves[(bumpAt + 1) % leafCount];
    const targetBefore = countFor(target);
    const siblingBefore = countFor(sibling);
    const containerBefore = countFor(container);

    // Warmup: 5 bumps
    for (let i = 0; i < 5; i++) act(() => { target.bump(); });

    const t0 = performance.now();
    for (let i = 0; i < bumpIterations; i++) {
        act(() => { target.bump(); });
    }
    const t1 = performance.now();

    const perBumpMs = (t1 - t0) / bumpIterations;
    const targetRenders = countFor(target) - targetBefore;
    const siblingRenders = countFor(sibling) - siblingBefore;
    const containerRenders = countFor(container) - containerBefore;

    // Cleanup
    act(() => { root.unmount(); });
    document.body.removeChild(dc);

    return { perBumpMs, targetRenders, siblingRenders, containerRenders };
}

describe('Re-render locality', () => {
    it('bump cost stays flat as tree size grows', () => {
        const sizes = [10, 50, 100, 200];
        const results: any[] = [];
        for (const n of sizes) {
            const r = measureLocality(n, Math.floor(n / 2), 20);
            results.push({ n, ...r });
        }
        console.log('\n=== Locality results ===');
        console.log('n, per-bump-ms, target re-renders, sibling re-renders, container re-renders');
        for (const r of results) {
            console.log(`  ${String(r.n).padStart(3)}, ${r.perBumpMs.toFixed(3)}ms, ${r.targetRenders} (target), ${r.siblingRenders} (sibling), ${r.containerRenders} (container)`);
        }
        const first = results[0].perBumpMs;
        const last = results[results.length - 1].perBumpMs;
        console.log(`\n  Ratio ${results[results.length - 1].n}:${results[0].n} = ${(last / first).toFixed(2)}x`);
        console.log(`  Hypothesis: ~1x (locality works). If much greater → cascade problem.`);
    });
});
