import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './VI-1/case-1';
import Case2Demo from './VI-1/case-2';

import case1Source from './VI-1/case-1.tsx?raw';
import case2Source from './VI-1/case-2.tsx?raw';

export function PerMountDerivativesCases() {
    return (
        <>
            <CaseShell
                caseId="VI.1 / 1"
                subject="Three mounts of one template — each derivative has its own state"
                expected="$Shared is mounted three times via <Shared />. The framework creates one derivative per mount site, each with its own $count. Clicking + on one mount increments only that mount's value — the others stay at 0. This is the lexical scoping promise: per-mount identity, shared prototype."
                pass="clicking + on any one counter increments only that counter; the other two stay unchanged"
                fail="all three change together, or only one of the three responds"
                source={case1Source}
                demo={<Case1Demo />}
            />

            <CaseShell
                caseId="VI.1 / 2"
                subject="Held instance mounted twice — host writes propagate to both derivatives"
                expected="$Host holds one $HeldCounter instance and mounts it twice. Each mount creates its own derivative (per-mount state). But a write to counter.$count from the host propagates to BOTH derivatives — because both inherit from the same held instance through the prototype chain. This is the complement of lexical scoping: derivative-local state diverges, but host-written shared state converges."
                pass="clicking + on one derivative increments only that one; clicking 'write counter.$count += 10 from host' increments BOTH by 10"
                fail="host write only updates one, or derivative-local clicks leak to the sibling"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'VI.1',
    cases: 2,
    Component: PerMountDerivativesCases,
};
