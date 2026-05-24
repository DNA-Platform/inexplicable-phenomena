import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './rekey/case-1';

import case1Source from './rekey/case-1.tsx?raw';

export function RekeyListReorderCases() {
    return (
        <CaseShell
            caseId="rekey / 1"
            subject="List reordering — does each item keep its state through a shuffle?"
            pass="all three items remain visible and their state persists after reordering"
            fail="items lose their state on reorder, or rendering breaks"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'rekey',
    cases: 1,
    Component: RekeyListReorderCases,
};
