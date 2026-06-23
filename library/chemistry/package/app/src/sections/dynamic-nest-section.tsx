import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './dynamic-nest/case-1';
import case1Source from './dynamic-nest/case-1.tsx?raw';

export function DynamicNestCases() {
    return (
        <CaseShell
            caseId="dynamic-nest / 1"
            subject="Kanban board — three layers of components with dynamic add, move, and delete"
            pass="tasks move between lanes, the board reconstructs on each change, and each task initializes exactly once"
            fail="moved tasks don't appear in their new lane, the board ignores child changes, or tasks re-initialize on move"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'dynamic-nest',
    cases: 1,
    Component: DynamicNestCases,
};
