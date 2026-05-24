import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './prop-pass/case-1';

import case1Source from './prop-pass/case-1.tsx?raw';

export function PropPassCases() {
    return (
        <CaseShell
            caseId="prop-pass / 1"
            subject="Passing a component as a prop — rendered inside a display container"
            pass="the widget renders inside its host, and clicking the button increments the count"
            fail="the widget doesn't render, or the click handler breaks across the boundary"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'prop-pass',
    cases: 1,
    Component: PropPassCases,
};
