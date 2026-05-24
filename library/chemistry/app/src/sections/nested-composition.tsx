import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './nested/case-1';
import case1Source from './nested/case-1.tsx?raw';

export function NestedCompositionCases() {
    return (
        <CaseShell
            caseId="nested / 1"
            subject="Three-level composition — liking a page updates the chapter and book totals"
            pass="clicking a heart on a page updates both the chapter and book counts"
            fail="likes stay local — parent totals don't reflect the change"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'nested',
    cases: 1,
    Component: NestedCompositionCases,
};
