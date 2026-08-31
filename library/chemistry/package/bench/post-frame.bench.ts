import { bench, describe } from 'vitest';
import React from 'react';
import { $, $Chemical } from '@/index';
import { augment } from '@/implementation/augment';
import { children } from '@/index';

// ===========================================================================
// B4 — The post-frame walk
//
// Everything a chemical draws passes through `augment` TWICE per render: once
// on the way out, and once again in the effect that decides whether the
// drawing changed. So its cost is paid by every page, including pages that use
// none of what it looks for.
//
// The three cases below are the three answers it can give an element: nothing
// to do, an assignment to resolve, a facade to choose. The first is the one
// that has to be free — it is what a page of ordinary chemicals is made of.
// Run with: npm run bench
// ===========================================================================

class $Leaf extends $Chemical {
    view() { return React.createElement('span', null, 'x'); }
}
const Leaf = $($Leaf);

class $Dress extends $Chemical {
    $of: any;
    view() { return React.createElement('div', null, this[children]); }
}
const Dress = $($Dress);

class $Dressed extends $Chemical {
    facade = Dress;
    view() { return React.createElement('span', null, 'x'); }
}
const Dressed = $($Dressed);

const wide = (make: (at: number) => React.ReactNode, many = 200) =>
    React.createElement('div', null, Array.from({ length: many }, (_, at) => make(at)));

// The asker is a real chemical, and the assigning tree is written in its own
// terms — an assignment names a member of whoever drew it, so `this` has to be
// the thing asking.
class $Held extends $Chemical {
    kept: $Leaf[] = [];
    plain = wide(at => React.createElement(Leaf as any, { key: at }));
    assigning = wide(at => React.createElement(Leaf as any, { key: at, on: () => this.kept }));
    dressing = wide(at => React.createElement(Dressed as any, { key: at }));
    view() { return null; }
}
const asker = ($($Held) as any).$ as $Held;
const plain = asker.plain;
const assigning = asker.assigning;
const dressing = asker.dressing;
const react = () => { };

describe('the post-frame walk — 200 elements', () => {
    // THE CASE THAT HAS TO BE FREE. Nothing here declares a facade or an
    // assignment, so the walk should allocate nothing per element and touch no
    // registry — this is the number that a page of ordinary chemicals pays.
    bench('nothing to do', () => {
        augment(plain, react, asker);
    });

    bench('every element assigns', () => {
        augment(assigning, react, asker);
    });

    bench('every element declares a facade', () => {
        augment(dressing, react, asker);
    });

    // The second walk of a render — a comparison rather than a drawing, so it
    // is deliberately not counted as a pass, and should cost the same.
    bench('nothing to do, not counting', () => {
        augment(plain, react, asker, false);
    });
});
