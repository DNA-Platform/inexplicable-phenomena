import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './form-lifecycle/case-1';
import case1Source from './form-lifecycle/case-1.tsx?raw';

export function FormLifecycleCases() {
    return (
        <CaseShell
            caseId="form-lifecycle / 1"
            subject="Stock ticker — each card initializes once, fetches once, and the board tracks children dynamically"
            pass="all cards load independently; initialization and fetch each run exactly once, even after a board refresh"
            fail="initialization runs repeatedly, data re-fetches on every render, or the board ignores changes to its children"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'form-lifecycle',
    cases: 1,
    Component: FormLifecycleCases,
};
