import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './deep-nest/case-1';
import case1Source from './deep-nest/case-1.tsx?raw';

export function DeepNestCases() {
    return (
        <CaseShell
            caseId="deep-nest / 1"
            subject="Deep propagation — a like four levels deep updates the root total"
            pass="clicking a heart increments both the card's count and the top-level total"
            fail="the root total stays at zero — events don't propagate upward through the tree"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'deep-nest',
    cases: 1,
    Component: DeepNestCases,
};
