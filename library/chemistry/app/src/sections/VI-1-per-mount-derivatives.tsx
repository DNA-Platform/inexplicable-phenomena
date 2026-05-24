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
                caseId="reusable / 1"
                subject="Emoji reactions — three independent counters from one class"
                pass="click one emoji; the other two stay at 0"
                fail="all three change together, or only one responds"
                source={case1Source}
                demo={<Case1Demo />}
            />

            <CaseShell
                caseId="reusable / 2"
                subject="Theme switcher — toggling dark mode propagates to both cards"
                pass="dark mode has been toggled and both cards reflect the change"
                fail="only one card switches, or the font sliders bleed between cards"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'reusable',
    cases: 2,
    Component: PerMountDerivativesCases,
};
