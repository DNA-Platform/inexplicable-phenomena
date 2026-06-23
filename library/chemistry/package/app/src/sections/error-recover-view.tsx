import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './error-recover/case-1';
import case1Source from './error-recover/case-1.tsx?raw';

export function ErrorRecoverCases() {
    return (
        <CaseShell
            caseId="error-recover / 1"
            subject="Error recovery — a rendering error is caught and the component recovers"
            pass="triggering the error shows a fallback; resetting restores normal rendering"
            fail="the app crashes without recovery, or the component's state is corrupted after the error"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'error-recover',
    cases: 1,
    Component: ErrorRecoverCases,
};
