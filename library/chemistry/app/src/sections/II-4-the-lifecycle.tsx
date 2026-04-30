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
                caseId="II.4 / 1"
                subject="await this.next('mount') — linear async lifecycle"
                expected="The chemical's effect() method runs: it awaits next('mount'), then simulates a data fetch (1.2s delay), then writes $items. The view reads $phase and $items reactively. You see 'waiting for mount' → 'mounted — fetching' → 'loaded' with elements appearing. No useEffect, no dependency arrays — just await."
                pass="the loading text pulses, then after ~1 second the element list appears and the phase tag reads 'loaded'"
                fail="data never appears, phase stays stuck, or the view doesn't update after the await"
                source={case1Source}
                demo={<Case1Demo />}
            />

            <CaseShell
                caseId="II.4 / 2"
                subject="Timer started on mount via async effect"
                expected="The chemical awaits next('mount'), then starts a setInterval that increments $seconds every second. The view reads $seconds and $running reactively. Start/stop/reset buttons call methods that write $running and manage the interval. Linear async: await mount → start timer."
                pass="the counter starts ticking automatically on mount; stop pauses it; start resumes; reset zeros and stops"
                fail="timer doesn't start automatically, or stop/start don't work, or reset doesn't zero"
                source={case2Source}
                demo={<Case2Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'II.4',
    cases: 2,
    Component: LifecycleCases,
};
