import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './method-fc/case-1';
import case1Source from './method-fc/case-1.tsx?raw';

export function MethodFcCases() {
    return (
        <CaseShell
            caseId="method-fc / 1"
            subject="Passing a method to a function component — does binding survive the handoff?"
            pass="clicking the button increments the parent's count"
            fail="the count stays at zero — method binding is lost when passed through props"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'method-fc',
    cases: 1,
    Component: MethodFcCases,
};
