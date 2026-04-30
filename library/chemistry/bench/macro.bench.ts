// @vitest-environment happy-dom

import { bench, describe } from 'vitest';
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { $, $Chemical } from '@/abstraction/chemical';

// ===========================================================================
// B3 — Macro benchmarks
//
// A realistic scenario: a list chemical containing N row chemicals, each row
// with its own reactive state. Operations adapted from js-framework-benchmark:
//   - create N rows
//   - update every 10th row
//   - swap two rows
//   - append a row
//   - remove a row
//   - clear
//
// Baseline: same operations in plain React with useState/useReducer.
// ===========================================================================

// --- $Chemistry version ----------------------------------------------------

class $Row extends $Chemical {
    $label = '';
    $active? = false;
    view() {
        return React.createElement('div',
            { className: this.$active ? 'row active' : 'row' },
            this.$label);
    }
}

class $List extends $Chemical {
    $rows: $Row[] = [];
    add(labels: string[]) {
        for (const label of labels) {
            const r = new $Row();
            r.$label = label;
            this.$rows.push(r);
        }
    }
    updateEvery10th() {
        for (let i = 0; i < this.$rows.length; i += 10) {
            this.$rows[i].$label = this.$rows[i].$label + '!!!';
        }
    }
    swap(i: number, j: number) {
        const tmp = this.$rows[i];
        this.$rows[i] = this.$rows[j];
        this.$rows[j] = tmp;
    }
    append(label: string) {
        const r = new $Row();
        r.$label = label;
        this.$rows.push(r);
    }
    removeAt(i: number) {
        this.$rows.splice(i, 1);
    }
    clear() {
        this.$rows = [];
    }
    view() {
        return React.createElement('div', null,
            this.$rows.map((r, i) =>
                React.createElement('div', { key: i }, r.view())
            )
        );
    }
}

// Make sure template exists
new $Row();
new $List();

function labels(n: number): string[] {
    const out: string[] = [];
    for (let i = 0; i < n; i++) out.push(`item-${i}`);
    return out;
}

describe('macro: $Chemistry list operations on N rows', () => {
    bench('create 100 rows (chemicals)', () => {
        const list = new $List();
        list.add(labels(100));
    });

    bench('create 1,000 rows (chemicals)', () => {
        const list = new $List();
        list.add(labels(1000));
    });

    bench('update every 10th of 1,000 rows', () => {
        const list = new $List();
        list.add(labels(1000));
        list.updateEvery10th();
    });

    bench('swap 2 rows in a 1,000-row list', () => {
        const list = new $List();
        list.add(labels(1000));
        list.swap(1, 998);
    });

    bench('append 100 rows one at a time to a 1,000-row list', () => {
        const list = new $List();
        list.add(labels(1000));
        for (let i = 0; i < 100; i++) list.append(`x-${i}`);
    });

    bench('clear a 1,000-row list', () => {
        const list = new $List();
        list.add(labels(1000));
        list.clear();
    });
});

// --- Plain React baseline --------------------------------------------------

describe('macro: plain React baseline (useState) — for comparison', () => {
    function PlainList({ items }: { items: string[] }) {
        const [rows, setRows] = React.useState(items);
        return React.createElement('div', null,
            rows.map((label, i) =>
                React.createElement('div', { key: i, className: 'row' }, label)
            )
        );
    }

    bench('plain React: create 100 rows (array only, no rendering)', () => {
        const items = labels(100);
        // Just exercise array creation cost for parity with chemical creation
        const sink = items.map(i => ({ label: i }));
    });

    bench('plain React: create 1,000 rows (array only)', () => {
        const items = labels(1000);
        const sink = items.map(i => ({ label: i }));
    });
});

// --- $Chemistry: render the list into a React tree -------------------------

describe('macro: $Chemistry list RENDERED via React', () => {
    bench('render 100-row list through React (container setup + render)', () => {
        const list = new $List();
        list.add(labels(100));
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = (require('react-dom/client') as any).createRoot(container);
        act(() => { root.render(React.createElement($(list) as any)); });
        root.unmount();
        document.body.removeChild(container);
    });

    bench('render 500-row list through React', () => {
        const list = new $List();
        list.add(labels(500));
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = (require('react-dom/client') as any).createRoot(container);
        act(() => { root.render(React.createElement($(list) as any)); });
        root.unmount();
        document.body.removeChild(container);
    });
});
