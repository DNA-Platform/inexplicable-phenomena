import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './dynamic/case-1';

import case1Source from './dynamic/case-1.tsx?raw';

export function DynamicCreationCases() {
    return (
        <CaseShell
            caseId="dynamic / 1"
            subject="Dynamic creation — new components appear at runtime with their own state"
            pass="clicking Add renders a new item with independent state"
            fail="items don't appear, creation throws, or multiple items share the same state"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'dynamic',
    cases: 1,
    Component: DynamicCreationCases,
};
