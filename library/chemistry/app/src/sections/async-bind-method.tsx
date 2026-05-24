import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './async-bind/case-1';
import case1Source from './async-bind/case-1.tsx?raw';

export function AsyncBindCases() {
    return (
        <CaseShell
            caseId="async-bind / 1"
            subject="Method binding survives setTimeout and Promise.then"
            pass="status updates to 'delayed ✓' or 'fetched ✓' after async callback"
            fail="status stays 'idle' — method lost its binding in the async context"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'async-bind',
    cases: 1,
    Component: AsyncBindCases,
};
