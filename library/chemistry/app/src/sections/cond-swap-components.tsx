import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './cond-swap/case-1';
import case1Source from './cond-swap/case-1.tsx?raw';

export function CondSwapCases() {
    return (
        <CaseShell
            caseId="cond-swap / 1"
            subject="Switching views — each component preserves its state across tab changes"
            pass="the editor draft and viewer font size persist when switching between tabs"
            fail="state resets on every switch — components lose their memory"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'cond-swap',
    cases: 1,
    Component: CondSwapCases,
};
