import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './stress/case-1';
import case1Source from './stress/case-1.tsx?raw';

export function StressTestCases() {
    return (
        <CaseShell
            caseId="stress / 1"
            subject="Async stress — multiple reactive properties updated from separate setTimeout callbacks"
            pass="all three properties settle correctly after each wave of async updates"
            fail="total doesn't match expected, or view doesn't reflect final values"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'stress',
    cases: 1,
    Component: StressTestCases,
};
