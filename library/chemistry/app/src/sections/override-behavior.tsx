import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './override/case-1';
import case1Source from './override/case-1.tsx?raw';

export function OverrideBehaviorCases() {
    return (
        <CaseShell
            caseId="override / 1"
            subject="Subclass override — same interface, different rendering, inherited behavior"
            pass="any button has been clicked at least once"
            fail="buttons don't render, inherited behavior breaks, or counts leak between instances"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'override',
    cases: 1,
    Component: OverrideBehaviorCases,
};
