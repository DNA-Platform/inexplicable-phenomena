import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './hydration/case-1';
import case1Source from './hydration/case-1.tsx?raw';

export function HydrationCases() {
    return (
        <CaseShell
            caseId="hydration / 1"
            subject="the hydration cache — an atomic singleton persists itself on change; using an atom means it should just appear"
            pass="change the undying atom, refresh the browser, it stands as you left it; the mortal twin resets; 'let it die' clears the record and it forgets too"
            fail="state resets on refresh while atomic, the record survives after 'let it die', or the mortal twin persists"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'hydration',
    cases: 1,
    Component: HydrationCases,
};
