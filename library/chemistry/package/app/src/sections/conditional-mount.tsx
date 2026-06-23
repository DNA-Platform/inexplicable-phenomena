import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './mount/case-1';
import case1Source from './mount/case-1.tsx?raw';

export function ConditionalMountCases() {
    return (
        <CaseShell
            caseId="mount / 1"
            subject="Conditional rendering — toggling a component on and off"
            pass="toggling on shows a counter at zero; increment it; toggle off and back on — the counter resets"
            fail="the counter survives across the toggle cycle, or the toggle has no visible effect"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'mount',
    cases: 1,
    Component: ConditionalMountCases,
};
