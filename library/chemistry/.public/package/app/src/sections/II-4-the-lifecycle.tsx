import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './II-4/case-1';
import Case2Demo from './II-4/case-2';

import case1Source from './II-4/case-1.tsx?raw';
import case2Source from './II-4/case-2.tsx?raw';

export function LifecycleCases() {
    return (
        <>
            <CaseShell
                caseId="data-loading / 1"
                subject="Weather card — async load with styled 3-day forecast"
                pass="forecast appears after ~1s with three days"
                fail="stays on loading or forecast never renders"
                source={case1Source}
                demo={<Case1Demo />}
            />

            <CaseShell
                caseId="data-loading / 2"
                subject="Pomodoro timer — 25-minute countdown with break mode"
                pass="timer has been started (seconds < 25:00)"
                fail="timer doesn't count down, or reset/break don't update"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'data-loading',
    cases: 2,
    Component: LifecycleCases,
};
